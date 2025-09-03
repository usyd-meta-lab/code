
makeBlock = function(){
/* 
===============================================================
=              TASK PARAMETERS              =
===============================================================
*/

  const cues = jsPsych.randomization.repeat(
    ["Cloveritol", "No Treatment"],
    [cue_outcome + cue_noOutcome, noCue_outcome + noCue_noOutcome]
  );

  const outcomes = jsPsych.randomization.repeat(
    ["Recovery", "No Recovery"],
    [cue_outcome + noCue_outcome, cue_noOutcome + noCue_noOutcome]
  );

  // Build and expose timeline variables globally
  factors = cues.map(function(cue, i) {
    return { cue: cue, outcome: outcomes[i] };
  });

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
          return true; 
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
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<img src = "assets/img/cloveritol.png" style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><p style = "font-size: 18pt; color: green">Patient Recovered</p>';
        // Cue+; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'Cloveritol' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<img src = "assets/img/cloveritol.png"style = "width:120px;height:200px;"></img><h1 style = "color: #275AC5">Cloveritol</h1><p style = "font-size: 18pt; color: red">No Recovery</p>';
        // Cue-; Outcome+
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><p style = "font-size: 18pt; color: green">Patient Recovered</p>';
        // Cue-; Outcome-
        if(jsPsych.evaluateTimelineVariable('cue') == 'No Treatment' & jsPsych.evaluateTimelineVariable('outcome') == 'No Recovery') return '<div style = "width:120px;height:200px;"></div><h1 style = "color: #275AC5">No Treatment</h1><p style = "font-size: 18pt; color: red">No Recovery</p>';
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
  stimulus: `
    <img src="assets/img/cloveritolvnotreat.png" style="width:300px;height:200px;">
    <h1 style="color:#275AC5;margin:8px 0 6px;">Cloveritol vs No treatment</h1>
    <p>On a scale from -100% to 100%, rate how effective you think the treatment was compared to having no treatment at all</p>
    <p style="color:grey;max-width:70ch;margin:0 auto;">
      NOTE: intermediate negative values indicate the drug actually made recovery worse,
      whereas intermediate positive values indicate the drug was effective at improving recovery
    </p>
  `,
  labels: ['-100 (worsens recovery)', '0 (ineffective)', '+100 (improves recovery)'],
  css_classes: ["eff_rating"],
  on_finish: function (data) {
    jsPsych.data.addProperties({ efficacy_rating: data.response });
  },
  on_load: function () {
    // ---------- Inject scoped CSS once ----------
    if (!document.getElementById('eff-rating-css')) {
      const style = document.createElement('style');
      style.id = 'eff-rating-css';
      style.textContent = `
        /* Theme variables (scoped to this trial via .eff_rating) */
        .eff_rating {
          --accent: #275AC5;
          --accent-soft: rgba(39, 90, 197, 0.12);
          --track: #e9ecef;
          --track-dark: #dfe3e7;
          --thumb: #ffffff;
          --shadow: rgba(0, 0, 0, 0.25);
          --neg: #d9534f;
          --pos: #28a745;
        }

        /* Layout niceties */
        .eff_rating .jspsych-html-slider-response-container {
          max-width: 780px;
          margin: 18px auto 0;
        }

        /* Value bubble above the thumb */
        .eff_rating .slider-value {
          position: relative;
          height: 0;
        }
        .eff_rating .slider-value .bubble {
          position: absolute;
          top: -36px;
          transform: translateX(-50%);
          padding: 4px 8px;
          font-size: 13px;
          line-height: 1;
          background: var(--accent);
          color: #fff;
          border-radius: 999px;
          box-shadow: 0 2px 6px var(--accent-soft);
          user-select: none;
          pointer-events: none;
          transition: opacity 120ms ease;
          opacity: 0; /* hidden until first interaction */
        }

        /* Base slider styling */
        .eff_rating input[type="range"] {
          width: 100%;
          -webkit-appearance: none;
          background: transparent;
          outline: none;
        }

        /* Track */
        .eff_rating input[type="range"]::-webkit-slider-runnable-track {
          height: 12px;
          background: linear-gradient(90deg, var(--track) 0%, var(--track) 100%);
          border-radius: 999px;
          box-shadow: inset 0 1px 0 #fff, inset 0 -1px 0 var(--track-dark);
        }
        .eff_rating input[type="range"]::-moz-range-track {
          height: 12px;
          background: var(--track);
          border-radius: 999px;
          box-shadow: inset 0 1px 0 #fff, inset 0 -1px 0 var(--track-dark);
        }

        /* Thumb (WebKit) */
        .eff_rating input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--thumb);
          border: 2px solid #fff;
          box-shadow: 0 2px 6px var(--shadow);
          margin-top: -5px; /* centers on 12px track */
          transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
        }
        /* Thumb (Firefox) */
        .eff_rating input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--thumb);
          border: 2px solid #fff;
          box-shadow: 0 2px 6px var(--shadow);
          transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
        }

        /* Hover / active feel */
        .eff_rating input[type="range"]:hover::-webkit-slider-thumb,
        .eff_rating input[type="range"]:hover::-moz-range-thumb {
          transform: scale(1.05);
        }
        .eff_rating input[type="range"]:active::-webkit-slider-thumb,
        .eff_rating input[type="range"]:active::-moz-range-thumb {
          transform: scale(1.12);
          box-shadow: 0 3px 10px var(--shadow);
        }

        /* Accessible focus ring */
        .eff_rating input[type="range"]:focus-visible::-webkit-slider-thumb,
        .eff_rating input[type="range"]:focus-visible::-moz-range-thumb {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }

        /* Hide thumb until first interaction */
        .eff_rating input[type="range"][data-thumb-hidden="1"]::-webkit-slider-thumb { opacity: 0; }
        .eff_rating input[type="range"][data-thumb-hidden="1"]::-moz-range-thumb    { opacity: 0; }

        /* Label polish */
        .eff_rating .jspsych-html-slider-response-labels {
          font-size: 13px;
          color: #444;
          margin-top: 6px;
        }
      `;
      document.head.appendChild(style);
    }

    const slider = document.getElementById('jspsych-html-slider-response-response');
    if (!slider) return;

    // Hide thumb initially
    slider.setAttribute('data-thumb-hidden', '1');

    // Insert value bubble
    const container = slider.parentElement; // .jspsych-html-slider-response-container
    const valWrap = document.createElement('div');
    valWrap.className = 'slider-value';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = '0%';
    valWrap.appendChild(bubble);
    container.insertBefore(valWrap, slider);

    // Helpers
    const min = Number(slider.min);
    const max = Number(slider.max);
    const range = max - min;

    const setTrackFill = () => {
      // Diverging track hint: subtle tint to left/right of zero
      // Compute position of zero (50%) and current value %
      const val = Number(slider.value);
      const p = ((val - min) / range) * 100;
      const zeroP = ((0 - min) / range) * 100;

      // Gradient: red to center to green, with light neutral base
      // We overlay a translucent diverging gradient on the neutral track.
      slider.style.background = `
        linear-gradient(90deg,
          rgba(217,83,79,0.18) 0%,
          rgba(217,83,79,0.18) ${zeroP}%,
          rgba(40,167,69,0.18) ${zeroP}%,
          rgba(40,167,69,0.18) 100%)
      `;

      // Thumb tint by sign (purely cosmetic)
      const isNeg = val < 0;
      const thumbColor = isNeg ? 'rgba(217,83,79,0.9)' : (val > 0 ? 'rgba(40,167,69,0.9)' : 'var(--thumb)');
      slider.style.setProperty('--thumbDynamic', thumbColor);
    };

    // Apply thumb dynamic color via inline style hook
    const setThumbColorCSS = () => {
      // Only needs to be injected once
      if (document.getElementById('eff-thumb-dynamic-css')) return;
      const s = document.createElement('style');
      s.id = 'eff-thumb-dynamic-css';
      s.textContent = `
        .eff_rating input[type="range"]::-webkit-slider-thumb { background: var(--thumbDynamic, var(--thumb)); }
        .eff_rating input[type="range"]::-moz-range-thumb    { background: var(--thumbDynamic, var(--thumb)); }
      `;
      document.head.appendChild(s);
    };
    setThumbColorCSS();

    // Position the value bubble over the thumb
    const setBubble = () => {
      const val = Number(slider.value);
      const percent = (val - min) / range; // 0..1
      bubble.textContent = `${val}`;

      // Calculate pixel position relative to slider width
      const sliderRect = slider.getBoundingClientRect();
      const x = sliderRect.left + sliderRect.width * percent;

      // Position bubble (relative to container)
      const containerRect = container.getBoundingClientRect();
      bubble.style.left = `${x - containerRect.left}px`;

      // Reveal bubble after first interaction
      if (slider.getAttribute('data-thumb-hidden') === '0') {
        bubble.style.opacity = '1';
      }
    };

    // First-render visuals
    setTrackFill();
    setBubble();

    // Reveal on first interaction + keep visuals updated
    const reveal = () => {
      slider.setAttribute('data-thumb-hidden', '0');
      setTrackFill();
      setBubble();
      slider.removeEventListener('pointerdown', reveal);
      slider.removeEventListener('keydown', reveal);
    };
    slider.addEventListener('input', () => { setTrackFill(); setBubble(); });
    slider.addEventListener('pointerdown', reveal, { once: true });
    slider.addEventListener('keydown', reveal, { once: true });

    // Recompute on resize (keeps bubble aligned)
    window.addEventListener('resize', setBubble);
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


