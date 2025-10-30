
var training_trial = {
  data: function(){
    return {trialnum: trialnum}
  },
  timeline: [

    
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
