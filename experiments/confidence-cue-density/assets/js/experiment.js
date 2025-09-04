
makeBlock = function(){
/* 
===============================================================
=              TASK PARAMETERS              =
===============================================================
*/

  // Build exact joint counts for cue x outcome, then shuffle
  const joint = [];
  // Cloveritol + Recovery
  joint.push(
    ...Array.from({ length: cue_outcome }, () => ({ cue: "Cloveritol", outcome: "Recovery" }))
  );
  // Cloveritol + No Recovery
  joint.push(
    ...Array.from({ length: cue_noOutcome }, () => ({ cue: "Cloveritol", outcome: "No Recovery" }))
  );
  // No Treatment + Recovery
  joint.push(
    ...Array.from({ length: noCue_outcome }, () => ({ cue: "No Treatment", outcome: "Recovery" }))
  );
  // No Treatment + No Recovery
  joint.push(
    ...Array.from({ length: noCue_noOutcome }, () => ({ cue: "No Treatment", outcome: "No Recovery" }))
  );

  // Shuffle and expose timeline variables globally
  factors = jsPsych.randomization.shuffle(joint);

/* 
===============================================================
=              Checks              =
===============================================================
*/

// data: Array<Object>, rowKey: string, colKey: string
function crosstab(data, rowKey, colKey) {
  const rowLevels = [...new Set(data.map(d => d[rowKey]))];
  const colLevels = [...new Set(data.map(d => d[colKey]))];

  // init counts
  const counts = Object.fromEntries(
    rowLevels.map(r => [r, Object.fromEntries(colLevels.map(c => [c, 0]))])
  );

  // fill counts
  for (const d of data) {
    const r = d[rowKey];
    const c = d[colKey];
    if (r in counts && c in counts[r]) counts[r][c] += 1;
  }

  // pretty print with totals
  const body = rowLevels.map(r => {
    const total = colLevels.reduce((s, c) => s + counts[r][c], 0);
    return { [rowKey]: r, ...counts[r], Total: total };
  });
  const colTotals = Object.fromEntries(
    colLevels.map(c => [c, data.filter(d => d[colKey] === c).length])
  );
  const grandTotal = data.length;

  console.table([...body, { [rowKey]: "Total", ...colTotals, Total: grandTotal }]);
  return { rowLevels, colLevels, counts }; // raw counts if you need them
}

// ---- usage ----
//crosstab(factors, "cue", "outcome"); // Cross tab for printing and piloting


  /* 
===============================================================
=              TRIALS              =
===============================================================
*/

var training_trial = {
  data: function(){
    return {trialnum: trialnum}
  },
  timeline: [
    
    // Check Fullscreen
    {
      timeline: [
        
        {type: jsPsychFullscreen,
          message: '<p>You need to be in fullscreen mode to continue the experiment! <br></br> Please click the button below to enter fullscreen mode.<br></br><p>',
          fullscreen_mode: true,
          data: {type: 'Full Screen'},
          on_finish: function(){
            in_fullscreen = true;
          }
        }
      ],
      conditional_function: function(){
        if(in_fullscreen === true){
          return false;
        } else {
          return false; 
        }
      }
    },
    
    // Prediction
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: function(){
        // Cue+; Outcome+
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<img src = "assets/img/cloveritol.png" style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><p style = "font-size: 14pt;">Will the patient recover?</p>';
        // Cue+; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<img src = "assets/img/cloveritol.png"style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><p style = "font-size: 14pt;">Will the patient recover?</p>';
        // Cue-; Outcome+
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><p style = "font-size: 14pt;">Will the patient recover?</p>';
        // Cue-; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><p style = "font-size: 14pt;">Will the patient recover?</p>';
      },
      choices: ['Very unlikely', 'Very likely'],
      data: {type: 'Prediction'}
      
    },
    
    // Confidence Rating trial (conditional)
    {
      timeline: [
        {
          type: jsPsychHtmlSliderResponse,
          data: {type: "Confidence Rating"},
          stimulus: `<h3>Rate your confidence:</h3>
            <div id="conf1" class="conf" style="height:25px; width:154px; margin-top:2px; margin-left:15px;"></div>
            <div id="conf2" class="conf" style="height:25px; width:154px; margin-top:2px; margin-left:169px;"></div>
            <div id="conf3" class="conf" style="height:25px; width:154px; margin-top:2px; margin-left:323px;"></div>
            <div id="conf4" class="conf" style="height:25px; width:154px; margin-top:2px; margin-left:477px;"></div>
          <div id="conf5" class="conf" style="height:25px; width:154px; margin-top:2px; margin-left:631px;"></div>`,
          min: 1,
          max: 6,
          step: 1,
          slider_width: 800,
          require_movement: true,
          labels: ['Guessing', '', '', '', '', 'Certain'],
          button_label: "Submit",
          css_classes: ["conf_rating"],
          on_load: function() {
            
            const wrapper = document.querySelector('.conf_rating');
            
            // Reset thumb to hidden at the start of the trial
            wrapper.style.setProperty('--thumb-visibility', 'hidden');
            
            
            // Center the slider by calculating the left margin.
            const w = window.innerWidth;
            const marLeft = (w - 800) / 2 + "px";
            document.getElementById("conf1").style.left = marLeft;
            document.getElementById("conf2").style.left = marLeft;
            document.getElementById("conf3").style.left = marLeft;
            document.getElementById("conf4").style.left = marLeft;
            document.getElementById("conf5").style.left = marLeft;
            
            // Now reveal the thumb when the slider is used
            wrapper.addEventListener('pointerdown', function handleFirstClick() {
              wrapper.style.setProperty('--thumb-visibility', 'visible');
              wrapper.removeEventListener('pointerdown', handleFirstClick);
            });
            
            
          }
        }
      ],
      conditional_function: function() {
        return ratings_on === true;
      }
    },
    
    // Feedback
    {
      type: jsPsychHtmlButtonResponse,
      stimulus: function(){
        // Cue+; Outcome+
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<img src = "assets/img/cloveritol.png" style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><h2 style = "font-size: 20pt; color: green">Patient has recovered</h2>';
        // Cue+; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<img src = "assets/img/cloveritol.png"style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><h2 style = "font-size: 20pt; color: red"Patient did not recover</h2>';
        // Cue-; Outcome+
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><h2 style = "font-size: 20pt; color: green">Patient has recovered</h2>';
        // Cue-; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><h2 style = "font-size: 20pt; color: red">Patient did not recover</h2>';
      },
      choices: ['Next'],
      data: {type: 'Feedback'}
      
    },
    
    // Summary Trial
    {
      type: jsPsychCallFunction,
      data: {type: "Summary Trial"},
      func: function(data){
        
      },
      on_finish: function(data){
        
        // Data for storage
        data.rt = jsPsych.data.get().filter({type: "Prediction"}).last().values()[0].rt;
        data.response = jsPsych.data.get().filter({type: "Prediction"}).last().values()[0].response;
        if(ratings_on == true){
          data.confidence = jsPsych.data.get().filter({type: "Confidence Rating"}).last().values()[0].response;
        } else {
          data.confidence = "";
        }
        
        // Stimuli for storage
        data.cue = jsPsych.evaluateTimelineVariable('cue');
        data.outcome = jsPsych.evaluateTimelineVariable('outcome');

        trialnum++;
        
        
      }
    }
  ],
  timeline_variables: factors
}

return training_trial
}

var efficacy_rating = {
  type: jsPsychHtmlSliderResponse,
  data: { type: "Efficacy Rating" },
  min: -100,
  max: 100,
  slider_start: 0,
  step: 1,
stimulus: "<img src = 'assets/img/cloveritolvnotreat.png' style='width:300px;height:200px;'></img><h1 style = 'color: #275AC5;'>Cloveritol vs No treatment</h1><p>On a scale from -100% to 100%, rate how effective you think the treatment was compared to having no treatment at all</p><p style = 'color: grey;'>NOTE: intermediate negative values indicate the drug actually made the disease worse, whereas intermediate positive values indicate the drug was effective in treating the disease</p>",
  labels: ['-100 (effectively worsens recovery)', '0 (completely ineffective)','+100 (effectively improves recovery)'],
  css_classes: ["eff_rating"],
  on_finish: function (data) {
    jsPsych.data.addProperties({ efficacy_rating: data.response });
  }
};


/* 
===============================================================
=              INSTRUCTIONS              =
===============================================================
*/


/* ---------- Instructions: Cover Story ---------- */

var instructions = {
  type: jsPsychInstructions,
  pages: function(){
    if(ratings_on == false) return [
      '<h1>Welcome to the task!</h1>' +
      '<p>In this experiment, you are asked to imagine that you are a medical researcher studying a new illness caused by a virus in the human body.</p>' + 
      '<p>An experimental drug, Cloveritol, has been developed in the hopes of treating the disease effectively. Laboratory results of Cloveritol have been promising but the drug&#39;s efficacy and side effects have not yet been tested on patients.</p>',
      '<p>Your job is to assess the new drug while you treat patients with the disease.</p>' + 
      '<p>You will see a series of patients one by one. For each one, you are first shown whether the patient was administered Cloveritol or no treatment.</p>' +
      '<p>You will be asked to predict the patient&#39;s chances of recovery.<p>' +
      '<p>You will then observe whether the patient recovered by the end of the observation period, or whether they were still sick.</p>',
      '<p>You will have the opportunity to treat a series of patients. At the end of these trials, you will be asked to judge how effective Cloveritol is for treating this particular illness.</p>' +
      '<p>Try to use only the knowledge you have learned from the experiment to make your decisions.</p>'
      
    ]
    if(ratings_on == true) return [
      '<h1>Welcome to the task!</h1>' +
      '<p>In this experiment, you are asked to imagine that you are a medical researcher studying a new illness caused by a virus in the human body.</p>' + 
      '<p>An experimental drug, Cloveritol, has been developed in the hopes of treating the disease effectively. Laboratory results of Cloveritol have been promising but the drug&#39;s efficacy and side effects have not yet been tested on patients.</p>',
      '<p>Your job is to assess the new drug while you treat patients with the disease.</p>' + 
      '<p>You will see a series of patients one by one. For each one, you are first shown whether the patient was administered Cloveritol or no treatment.</p>' +
      '<p>You will be asked to predict the patient&#39;s chances of recovery.<p>' +
      '<p>You will then be asked to rate your confidence in your prediction on a scale ranging from "guessing" to "certain".<p>' +  
      '<p>You will then observe whether the patient recovered by the end of the observation period, or whether they were still sick.</p>',
      '<p>You will have the opportunity to treat a series of patients. At the end of these trials, you will be asked to judge how effective Cloveritol is for treating this particular illness.</p>' +
      '<p>Try to use only the knowledge you have learned from the experiment to make your decisions.</p>'
      
    ]
  },
  show_clickable_nav: true
}





/* ---------- Instructions: Judging Efficacy ---------- */

const efficacy_instructions = {
  type: jsPsychInstructions,
  pages: [
    
    /* Page 1 – Why you are making this judgment */
    `
    <h2>How effective was Cloveritol?</h2>
    <p>In this experiment you observed how patients recovered <strong>with</strong> and <strong>without</strong> the drug <em>Cloveritol</em>.</p>
    <p style="max-width:60ch; margin:0 auto; text-align:left;">
      &bull; Sometimes patients received <strong>Cloveritol</strong>.<br>
      &bull; Sometimes patients received <strong>no treatment</strong>.
    </p>
    <p>On the next screen you will see a slider labelled from &ldquo;-100&rdquo; to &ldquo;+100.&rdquo;</p>
    `,
    
    /* Page 2 – How to use the slider */
    `
    <h2>Using the slider</h2>
    <p style="max-width:60ch; margin:0 auto; text-align:left;">
      &bull; Values <strong>below 0</strong> mean you think Cloveritol made recovery <em>worse</em> compared to no treatment.<br><br>
      &bull; Values <strong>above 0</strong> mean you think Cloveritol made recovery <em>better</em> compared to no treatment.<br><br>
      &bull; If you think Cloveritol had <strong>no effect</strong>, place the slider at 0.<br><br>
      &bull; The farther you move the slider from the centre, the <em>stronger</em> the effect you are reporting.
    </p>
    `,
    
    /* Page 3 – Practical tips & reminder */
    `
    <h2>Before you continue</h2>
    <p style="max-width:60ch; margin:0 auto; text-align:left;">
      &bull; Use your mouse or trackpad to move the slider.<br>
      &bull; Base your judgment <strong>only on what you observed during this experiment</strong>.<br>
      &bull; There are no right or wrong answers &ndash; we are interested in your honest evaluation.
    </p>
    <p>When you&#39;re ready, click &ldquo;Next&rdquo; to record your judgment.</p>
    `
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Back"
};


