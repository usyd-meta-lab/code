# Contingency Learning Task
A contingency learning task using a medical cover story. Can easily implement outcome and cue frequency effects. Categorical feedback is currently used (e.g. recover vs did not recover)

Currently, the task is programmed to randomly allocate particpants to an outcome density condition (high vs low). Confidence ratings can be toggled on or off.

# Contingency Learning Task (Cloveritol)

A web-based contingency learning task using a medical cover story. The task supports outcome-density and cue-density manipulations, optional confidence ratings, and a final efficacy judgment (−100 to +100).

---

## Overview
Participants observe a sequence of patients who either receive **Cloveritol** or **no treatment**, and either **recover** or **do not recover**. On each trial they:

1. **Prediction:** Decide whether the patient will recover.
2. **Confidence (optional):** Rate confidence (1–6) in their prediction.
3. **Feedback:** See whether the patient recovered.
4. **Data capture:** Trial data (stimuli, response, RT, confidence) are saved to DataPipe.

After training, participants give a **single efficacy judgment** on a slider from **−100 (worsens)** to **+100 (improves)** relative to no treatment.

---

## Files & Structure
- `index.html` — loads libraries, defines global parameters, obtains an experimental **condition** from DataPipe, sets the **contingency table** for that condition, builds the timeline, and runs the experiment.
- `assets/js/experiment.js` — defines `makeBlock()` which builds the timeline variables (**factors**) and the main training trial sequence (Prediction → optional Confidence → Feedback → Summary). Also defines the final `efficacy_rating` slider and instruction screens.
- `assets/js/global.js`, `assets/js/survey.js` — shared helpers and demographic/exit pages.
- `assets/css/custom-css.css` — custom styling.

---

## Parameters (edit in `index.html` unless noted)

### Data & platform
- **`const DataPipe_ID`** *(string)* — DataPipe project ID for saving data.
- **`const sona_experiment_id`, `const sona_credit_token`** *(strings)* — SONA integration values (optional).
- **`const Prolific_redirect`, `const Prolific_failed_check`** *(strings)* — Prolific completion codes/URLs (optional).

### Task toggles & QA
- **`const ratings_on`** *(boolean)* — if `true`, shows the 1–6 **Confidence Rating** after each prediction; if `false`, omits it.
- **`const accuracy_criterion`** *(0–1)* — accuracy threshold for manual data review flags.
- **`const task_time`** *(minutes)* — displayed on the Participant Information Sheet.

### Contingency table (set per *condition*)
The 2×2 table is encoded via **four counters** (integers) which define the number of trials in each cell:

| Variable          | Meaning                         | Example |
|-------------------|----------------------------------|---------|
| `cue_outcome`     | Cue+, Outcome+ (Cloveritol + Recovery)       | `12`    |
| `cue_noOutcome`   | Cue+, Outcome− (Cloveritol + No Recovery)    | `3`     |
| `noCue_outcome`   | Cue−, Outcome+ (No Treatment + Recovery)     | `12`    |
| `noCue_noOutcome` | Cue−, Outcome− (No Treatment + No Recovery)  | `3`     |

> These variables are set **after** the condition is retrieved and **before** calling `makeBlock()`.

---

## Task Flow (logic)
1. **Get condition** from DataPipe:
   ```js
   const condition = await jsPsychPipe.getCondition(DataPipe_ID);
   jsPsych.data.addProperties({ condition });
   ```
2. **Set the contingency table** for that condition (see next section).
3. **Build timeline variables** using `makeBlock()` in `assets/js/experiment.js`. This function reads the four counters and creates matched arrays of `cue` and `outcome`, then maps them into `factors` (e.g., `{cue: 'Cloveritol', outcome: 'Recovery'}`).
4. **Run timeline**: browser checks → info sheets → instructions → training block → efficacy instructions → efficacy slider → save & redirect.

---

## Implementing *Conditional* Contingency Tables
You can condition the contingency table on any assignment source (e.g., DataPipe, URL params). The included pattern uses DataPipe’s `getCondition` to randomise participants into **Low Outcome** vs **High Outcome** density.

### Example (from `index.html`)
```js
async function createExperiment() {
  // 1) Obtain a condition from DataPipe
  const condition = await jsPsychPipe.getCondition(DataPipe_ID);
  jsPsych.data.addProperties({ condition });

  // 2) Set the 2×2 trial counts based on condition
  if (condition == 0) {
    // Low Outcome density
    cue_outcome     = 3;  // Cue+, Outcome+
    cue_noOutcome   = 12; // Cue+, Outcome−
    noCue_outcome   = 3;  // Cue−, Outcome+
    noCue_noOutcome = 12; // Cue−, Outcome−
    jsPsych.data.addProperties({ density: 'Low Outcome' });
  } else {
    // High Outcome density
    cue_outcome     = 12;
    cue_noOutcome   = 3;
    noCue_outcome   = 12;
    noCue_noOutcome = 3;
    jsPsych.data.addProperties({ density: 'High Outcome' });
  }

  // 3) Build trials only *after* counters are set
  training_block = makeBlock();

  // 4) Run the experiment
  jsPsych.run([
    browser_check,
    enter_fullscreen,
    participant_info_paid,
    participant_info_SONA,
    demographics,
    instructions,
    training_block,
    efficacy_instructions,
    efficacy_rating,
    debug,
    save_data,
    DEBRIEF_SONA,
    data_saved,
  ]);
}
```

### Why this order matters
`makeBlock()` constructs `factors` using the **current values** of the four counters. If you set the counters **after** calling `makeBlock()`, you’ll see errors like _“Timeline variable cue not found”_ or you’ll get the wrong trial mix. The safe pattern is: **get condition → set counters → call `makeBlock()` → run**.

### Extending to more conditions
Use a `switch` to add additional cells (e.g., cue-density manipulations) or more nuanced outcome rates:
```js
switch (condition) {
  case 0: // Low Outcome density
    cue_outcome = 3; cue_noOutcome = 12; noCue_outcome = 3; noCue_noOutcome = 12;
    jsPsych.data.addProperties({ density: 'Low Outcome' });
    break;
  case 1: // High Outcome density
    cue_outcome = 12; cue_noOutcome = 3; noCue_outcome = 12; noCue_noOutcome = 3;
    jsPsych.data.addProperties({ density: 'High Outcome' });
    break;
  case 2: // High Cue density (example)
    cue_outcome = 12; cue_noOutcome = 12; noCue_outcome = 3; noCue_noOutcome = 3;
    jsPsych.data.addProperties({ cue_density: 'High' });
    break;
}

training_block = makeBlock();
```

### How the counters become trials (inside `makeBlock()`)
`makeBlock()` creates two arrays with the right **counts** and then zips them into trial objects:
```js
const cues = jsPsych.randomization.repeat(
  ['Cloveritol', 'No Treatment'],
  [cue_outcome + cue_noOutcome, noCue_outcome + noCue_noOutcome]
);

const outcomes = jsPsych.randomization.repeat(
  ['Recovery', 'No Recovery'],
  [cue_outcome + noCue_outcome, cue_noOutcome + noCue_noOutcome]
);

factors = cues.map((cue, i) => ({ cue, outcome: outcomes[i] }));
```
Because `cues` and `outcomes` have matched lengths and ordering, each trial receives the intended `(cue, outcome)` pairing.

---

## Running locally / deploying
1. **Set `DataPipe_ID`** and (optionally) SONA/Prolific constants in `index.html`.
2. Serve the folder (e.g., VSCode Live Server) or host on GitHub Pages.
3. Share the experiment link. Data will save to the configured DataPipe project.

---

## Citation
