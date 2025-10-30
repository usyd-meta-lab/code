

loadTrials('src/content')
.then((trials) => {
  
  // Define the timeline
  if(condition == 0 | condition == 2){
    jsPsych.data.addProperties({rating_type: "CR"});
  var timeline = [
     instructions,
    cr_training_trial,
    efficacy_instructions,
    efficacy_rating,
    save_data
  ];
}

  // Define the timeline
  if(condition == 1 | condition == 3){
        jsPsych.data.addProperties({rating_type: "No_CR"});
  var timeline = [
     instructions,
    training_trial,
    efficacy_instructions,
    efficacy_rating,
    save_data
  ];
}


  // Augment timeline
  var timeline = augmentTimeline(timeline); // This adds PIS, debrief, full screen, debug question, and browser check
  
  jsPsych.run(timeline);
})
.catch((error) => {
  console.error('[timeline] Unable to initialise experiment:', error);
});
