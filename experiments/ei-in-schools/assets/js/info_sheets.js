var demographics = {
  timeline: [
    {
      type: jsPsychSurvey,
      survey_json: {
        title: "Demographic Information",
        showQuestionNumbers: "on",
        pages: [
          {
            elements: [
              {
                type: "text",
                name: "age",
                title: "1. Age",
                inputType: "number",
                min: 17,
                max: 100,
                isRequired: true,
                width: "200px"
              },
              {
                type: "radiogroup",
                name: "sex",
                title: "2. Gender",
                isRequired: true,
                choices: [
                  { value: "man", text: "Man" },
                  { value: "woman", text: "Woman" },
                  { value: "trans_gd", text: "Trans and/or gender diverse" },
                  { value: "different_term", text: "I use a different term" },
                  { value: "prefer_not", text: "Prefer not to say" }
                ]
              },
              {
                type: "radiogroup",
                name: "english_first",
                title: "3. Is English your first language?",
                isRequired: true,
                choices: [
                  { value: "yes", text: "Yes" },
                  { value: "no", text: "No" }
                ]
              },
              {
                type: "text",
                name: "home_language",
                title: "i. What language do you speak at home?",
                visibleIf: "{english_first} = 'no'",
                isRequired: true,
                width: "20em"
              },
              {
                type: "radiogroup",
                name: "english_duration",
                title: "ii. How long have you been speaking English?",
                visibleIf: "{english_first} = 'no'",
                 isRequired: true,
                choices: [
                  { value: "<1", text: "< 1 year" },
                  { value: "2-5", text: "2-5 years" },
                  { value: "5-10", text: "5-10 years" },
                  { value: "10+", text: "+ 10 years" }
                ]
              },
              {
                type: "sliders",
                name: "english_confidence",
                title: "iii. How confident are you with your English skills?",
                visibleIf: "{english_first} = 'no'",
                isRequired: false,
                // Single-thumb slider from 0 to 100
                min: 0,
                max: 100,
                step: 1,
                value: 50,
                hideNumber: false,
                // Helper text below the slider
                description: "0 = need assistance when out; 100 = proficient and confident"
              },
              {
                type: "radiogroup",
                name: "school_year",
                title: "4. What school year are you currently in?",
                isRequired: true,
                choices: [
                  { value: "9", text: "Year 9" },
                  { value: "10", text: "Year 10" },
                  { value: "11", text: "Year 11" },
                  { value: "12", text: "Year 12" },
                  { value: "not_attending", text: "I am not currently attending school" }
                ]
              }
            ]
          }
        ]
      },
      on_finish: function(data){
        // Add key responses as top-level properties for convenience/consistency
        var r = data.response || {};
        jsPsych.data.addProperties({
          age: r.age,
          sex: r.sex,
          english_first: r.english_first,
          home_language: r.home_language,
          english_duration: r.english_duration,
          english_confidence: r.english_confidence,
          school_year: r.school_year
        });
      }
    }
  ],
  conditional_function: function(){
    if(typeof SONAID != 'undefined') {return true} else {return false}
  }}
  
  
  
  /* 
  ===============================================================
  =                SCHOOLS Project                =
  ===============================================================
  */
  
  
  
  var participant_info_school = {
    timeline: [{
      type: jsPsychInstructions,
      on_load: function(){
        document.body.style.backgroundColor = "white";
      },
      pages: function(){
        return [
          `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Participant Information Statement</h1>
      <h1 style="color:#e1310e">Research Study: Self-Assessment and Emotional Intelligence</h1>
    </div>
    <p style="text-align: left;">Download a copy of this information <a href="assets/pdf/PIS.pdf" target="_blank">here</a>.</p>
    <hr>
    <div style="text-align: left;">
      <h4 style="color:#e1310e">1.  What is this study about?</h2>
  We are conducting a research study about how people monitor and control their emotional intelligence. This study explores whether self-assessment - where you reflect on your own thoughts, feelings, and actions - can help teenagers develop emotional intelligence (EI). Emotional intelligence is the ability to understand your own emotions, manage them in healthy ways, and recognise how others are feeling. The goal of the study is to see if regularly thinking about your emotions and how you respond to situations can improve skills like emotional awareness, self-control, and empathy. It also looks at whether self-assessment could be a simple and useful tool for helping young people build emotional skills. Participation is optional.
      
      The study is being carried out by the following researchers:<br><br>
      <li>Dr Kit Double, Senior Lecturer, School of Psychology, University of Sydney</li>
      <li>Prof/ Carolyn MacCann (School of Psychology, Faculty of Science)</li>
      <li>Dr Lisa Kim (School of Psychology, Faculty of Science)</li>
      <li>Mr Riley Leckie (School of Psychology, Faculty of Science)</li>
        <h4 style="color:#e1310e">2. Who can take part in the study?</h2>
        We are seeking young persons between the ages of 15 and 18 years old.
        <h4 style="color:#e1310e">3. What will the study involve for me?</h2>
       If you decide to take part in this study, you will be asked to complete an online survey where you will answer a number of questions about yourself and complete a range of cognitive and emotional intelligence questionnaires. As you complete these questionnaires, you may be asked to self-assess your performance. The estimated time commitment is  ${Math.ceil(task_time/15)*15} minutes.
        <h4 style="color:#e1310e">4. Can I withdraw once I&#39;ve started?</h2>
        By submitting your survey, you are consenting to take part in the study. You can withdraw any time before submitting by exiting the survey. Once your responses are submitted, we won&#39;t be able to tell which one is yours. This means you cannot withdraw after submitting the survey. 
        <h4 style="color:#e1310e">5.  Are there any risks or costs?</h2>
       Aside from giving up your time, we do not expect that there will be any risks or costs associated with taking part in this study. However, if you anticipate that answering questions about emotions or your wellbeing will cause you discomfort, you are discouraged from participating in this study.
        <h4 style="color:#e1310e">6.  Are there any benefits?</h2>
       You will not receive any direct benefits from being in the study.
        <h4 style="color:#e1310e">7.  What will happen to information that is collected?</h2>
        Your information will be securely stored, and results may be published. You will not be identifiable in these publications.
Sharing research data is important for advancing knowledge and innovation. A de-identified set of the data collected in this study may be made available for use in future research. 
<h4 style="color:#e1310e">8. Will I be told the results of the study?</h2>
        You have the right to hear the results of this study. You can indicate your interest in receiving feedback by contacting Dr Kit Double at  (<a href="mailto:kit.double@sydney.edu.au">kit.double@sydney.edu.au</a>). 
        <h4 style="color:#e1310e">9. What if I would like further information?</h2>
For any questions or further discussions, please contact Dr Kit Double at (<a href="mailto:kit.double@sydney.edu.au">kit.double@sydney.edu.au</a>).
        <h4 style="color:#e1310e">10.  What if I have a complaint or any concerns?</h2>
        The ethical aspects of this study have been approved by the Human Research Ethics Committee (HREC) of The University of Sydney [2025/HE000082] according to the National Statement on Ethical Conduct in Human Research (2007). If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the University:<br><br>
        Human Ethics Manager<br>
        human.ethics@sydney.edu.au<br>
        +61 2 8627 8176<br>
        <h4 style="color:#e1310e; text-align: center;">This information sheet is for you to keep</h3>
      </div>
      <div style="text-align: center;"></div>
    </div>
  `
        ]
      },
      show_clickable_nav: true,
      button_label_next: "Start",
      allow_backward: false
    }]
  }
  
  
  
  var DEBRIEF_School = {
    timeline: [{
      type: jsPsychInstructions,
      on_load: function(){
        document.body.style.backgroundColor = "white";
      },
      pages: [
        `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Debrief Statement</h1>
      <h1 style="color:#e1310e">Research Study: Self-Assessment and Emotional Intelligence</h1>
      Dr Kit Double (Responsible Researcher)<br>
      School of Psychology, Faculty of Science<br>
      Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au
    </div>
    <p style="text-align: left;">Download a copy of this information <a href="assets/pdf/Debrief.pdf" target="_blank">here</a>.</p>
    <hr>
    <div style="text-align: left;">
    <p>Thank you for participating in this research study. This study aims to understand how self-assessment affects emotional intelligence.</p>
<p>Self-assessment involves rating or evaluating your performance in some way. Self-assessment while performing cognitive tasks (e.g., problem-solving tasks, memory tests) has been shown to impact performance.</p>
<p>This research is interested in whether these findings extend to situations involving tests of emotional intelligence. That is, can your emotional intelligence be improved by self-assessing your performance? To investigate this, the study required you to complete questionnaires assessing your emotional intelligence and your ability to self-assess your performance on a range of tasks. We will explore how performing this self-assessment related to your performance on the emotional intelligence task (i.e., did it improve or impair your performance?). Such research is critical in the development of interventions to improve emotional intelligence and wellbeing outcomes in young persons. We thank you for your participation in this important research.</p>
<p>If you have any questions, now or at a later time, please feel free to contact Dr Kit Double (kit.double@sydney.edu.au).
</p>        
<p>
The ethical aspects of this study have been approved by the Human Research Ethics Committee (GREC) of The University of Sydney [2025/HE000082] according to the National Statement on Ethical Conduct in Human Research (2023).
If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the University:
<br><br>
      Human Ethics Manager<br>
      human.ethics@sydney.edu.au<br>
      +61 2 8627 8176<br>
      <h4 style="color:#e1310e; text-align: center;">Thank you for taking part in this important research.</h3>
    </div>
    <div style="text-align: center;"></div>
  </div>
  `
      ],
         show_clickable_nav: true,
      button_label_next: "Finish",
      allow_backward: false
    }]
  }
  
  
  
  var school_consent = {
    timeline: [{
      type: jsPsychInstructions,
      pages: [
        `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Participant Consent Form</h1>
      <h1 style="color:#e1310e">Research Study: Self-Assessment and Emotional Intelligence</h1>
      Dr Kit Double (Responsible Researcher)<br>
      School of Psychology, Faculty of Science<br>
      Phone: +61 2 8627 8636 | Email: kit.double@sydney.edu.au
    </div>
    <hr>
   <div style="text-align: left; padding-left: 20px;">
        
  <ul>
    <li>The details of my involvement have been explained to me, and I have been provided with a written Participant Information Statement to keep.</li>
    <li>I understand the purpose of the study is to investigate how people monitor and control their emotional intelligence.</li>
    <li>I acknowledge that the risks and benefits of participating in this study have been explained to me to my satisfaction.</li>
    <li>I understand that in this study I will be required to complete an online survey where I will answer questions about myself and complete a range of cognitive and emotional intelligence questionnaires. As I complete these questionnaires, I understand I may be asked to self-assess my performance.</li>
    <li>I understand that if I provide consent my information may be used in future research by the present researchers or other researchers as responses to this study may be placed on online research data repositories where other researchers can access the data. No one will know which responses are mine because no personal information that could be used to identify me is being recorded.</li>
    <li>I understand that being in this study is completely voluntary.</li>
    <li>I am assured that my decision to participate will not have any impact on my relationship with the research team or the University of Sydney.</li>
    <li>I understand that I am free to withdraw from this study at any time and that I can choose to withdraw any information I have already provided (unless the data has already been de-identified or published).</li>
    <li>I have been informed that the confidentiality of the information I provide will be protected and will only be used for purposes that I have agreed to. I understand that information identifying me will only be told to others with my permission, except as required by law.</li>
    <li>I understand that the results of this study may be published, and that publications will not contain my name or any identifiable information about me.</li>
    <li>I understand that after I sign and return this consent form it will be retained by the researcher, and that I may request a copy at any time.</li>
  </ul>
        
  <p><strong>I confirm the following:</strong></p>
        
  <ul>
    <li>I consent to participate in this study</li>
    <input type="checkbox" id="consent_yes" name="consent" value="yes">
    <label for="consent_yes"> Yes </label> &nbsp;&nbsp;&nbsp;
    <input type="checkbox" id="consent_no" name="consent" value="no">
    <label for="consent_no"> No </label><br>
  </ul>
        
</div>
  `
      ],
      show_clickable_nav: true,
      button_label_next: "Continue",
      allow_backward: false,
      on_load: function() {
        // Disable Continue button initially
        const nextButton = document.querySelector('#jspsych-instructions-next');
        nextButton.disabled = true;
        nextButton.style.opacity = 0.5;
        
        const yesBox = document.getElementById('consent_yes');
        const noBox = document.getElementById('consent_no');
        
        yesBox.addEventListener('change', function() {
          if (yesBox.checked) {
            noBox.checked = false; // ensure only one is selected
            nextButton.disabled = false;
            nextButton.style.opacity = 1;
          } else {
            nextButton.disabled = true;
            nextButton.style.opacity = 0.5;
          }
        });
        
        noBox.addEventListener('change', function() {
          if (noBox.checked) {
            yesBox.checked = false;
            nextButton.disabled = true;
            nextButton.style.opacity = 0.5;
            alert("You must provide consent (Yes) to participate in this study.");
          }
        });
      },
    }]
  };


  var study_complete_notification = {
  timeline: [
    {
      type: jsPsychInstructions,
      pages: [
        `You have completed the study. Please notify the experimenter now.`
      ]
    }
  ],
  conditional_function: function(){
    if(typeof in_lab !== "undefined" && in_lab === true){
      return true
    } else{ 
      return false}
      
    }
  }