
# Shape Categorisation Task

This experiment uses [jsPsych](https://www.jspsych.org/) to assess metacognitive processes during a categorisation task. Participants are asked to sort shapes into two categories (called **blickets** and **daxes**) and may also rate their confidence in each decision. The experiment includes both training (with feedback) and test blocks (without feedback). The task is described in <a href="https://doi.org/10.3758/s13421-014-0475-1">Little & McDaniel (2015)</a>.

This version of the task has a mindset manipulation prior to the shapes task designed to induce a relational mindset (versus two counterbalanced controls)
---

## Overview

- **Task:** Categorisation with optional confidence ratings.
- **Phases:** Training (practice) and Test.
- **Stimuli:** Image files presented as items to categorise.
- **Counterbalancing:**
  - Response options are counterbalanced (i.e., which option is designated as the "rule-match").
  - Custom sampling functions ensure that no more than two items of the same category appear consecutively in training and that test items are grouped into *seen*, *ambiguous*, and *unambiguous*.

---

## Key Parameters

### Global Experiment Settings

- **DataPipe_ID:** `vUyxuIvNMDjb`  
  *The destination for saving experiment data.*

- **SONA Information:**  
  - **sona_experiment_id:** `NA`  
  - **sona_credit_token:** `NA`

- **Prolific Information:**  
  - **Prolific_redirect:** `CHGWKNI0`  
  - **Prolific_failed_check:** `C13PIUOF`

- **Task Duration:** `12` minutes  
  *Time allocated for the experiment.*

- **Total Blocks:** `6`  
  *The number of training blocks.*

### Global Toggles & Counters

- **ratings_on:** `false`  
  *Toggle for enabling/disabling confidence ratings.*

- **trialnum:** Starts at `1`  
  *A global counter for tracking the trial number.*

- **blocknum:** Starts at `1`  
  *A global counter for tracking the block number.*

- **phase:** `null` (will be set to `"Training"` or `"Test"`)  
  *Indicates the current phase of the experiment.*

### Counterbalancing

- **Choices Array:** `["Blicket", "Daxe"]`  
  *These are the response options, counterbalanced using jsPsych.*

- **Response Mapping:** `["rule-Nomatch", "rule-match"]`  
  *Determines which response is correct based on the stimulus type.*

### Timeline Structure

1. **Instructions:**  
   - Detailed instructions are provided at the start.
   - Variations exist based on whether confidence ratings are enabled.

2. **Confidence Rating Instructions:**  
   - When enabled, participants see a slider-based instruction timeline explaining how to use the confidence rating scale.

3. **Training Block:**  
   - Contains 12 training items, repeated 6 times.
   - Feedback is provided after each response.
   - A custom sampling function shuffles the order, ensuring that no more than two items of the same category occur consecutively.

4. **Test Block:**  
   - Contains 36 items:
     - **Seen Items:** Previously seen during training.
     - **Unambiguous Test Items:** Clearly defined stimuli.
     - **Ambiguous Test Items:** Stimuli with ambiguous category cues.
   - No feedback is provided in the test block.
   - Custom sampling functions order the test items into specific groups and randomize their presentation.

5. **Final Debrief & Data Save:**  
   - A brief debug survey (optional) asks if participants encountered any issues.
   - Data is saved using jsPsychPipe (in CSV format).
   - Participants are redirected based on SONA or Prolific parameters.

---

## Running the Experiment

1. **Setup:**  
   - Open the HTML file in a modern browser (Chrome or Firefox recommended).

2. **During the Experiment:**  
   - Follow the on-screen instructions.
   - Complete the training block (with feedback) and then the test block (without feedback).
   - (If enabled) Provide confidence ratings using the slider.

3. **Data Saving & Redirect:**  
   - Upon completion, data is saved automatically.
   - Participants are redirected based on their source (SONA or Prolific).

---

## Dependencies

- **jsPsych:** Version 7.3.3 (and associated plugins)
- **jQuery:** Version 2.1.3
- **Foundation:** Version 5.5.2
- **jQuery-UI:** For slider styling
- **Custom CSS:** `custom-css.css`
- **Additional Scripts:** `info_sheets.js` (provides additional information screens and debriefing)

---

## Customization

- **Enabling Confidence Ratings:**  
  Set the global `ratings_on` variable to `true` if you want to include the confidence rating component.

- **Adjusting Block/Trial Numbers:**  
  Modify the `repetitions` parameter in the training block and adjust the timeline variables as needed.

- **Ordering Constraints:**  
  The custom sampling functions in the training and test blocks can be edited to change the order or grouping constraints (e.g., ensuring no more than two consecutive items of the same category).

- **Data Saving & Redirects:**  
  Update the SONA/Prolific parameters and redirect links as needed for your study environment.

---
