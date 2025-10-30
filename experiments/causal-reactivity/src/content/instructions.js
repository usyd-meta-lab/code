
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


