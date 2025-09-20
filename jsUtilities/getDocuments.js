var augmentTimeline = function(timeline){
    
    // Add demographics  ======================
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
                                    min: 13,
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
                                        { value: "man", text: "Male" },
                                        { value: "woman", text: "Female" },
                                        { value: "nb_gd", text: "Non-binary/Gender diverse" },
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
        ]
    };
    
    
    // Append demographics
    if (is_SONA) {
        timeline.unshift(demographics);
    }
    
    
    
    // Add PIS  ======================
    
    
    // Prolific
    if(is_PROLIFIC){
        var participant_info_sheet = {
            timeline: [{
                type: jsPsychInstructions,
                pages: function(){
                    return [
                        `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Participant Information Statement</h1>
      <h1 style="color:#e1310e">Research Study: Metacognition and Cognitive Performance</h1>
      Dr Kit Double (Responsible Researcher)<br>
      School of Psychology, Faculty of Science<br>
      Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au
    </div>
    <hr>
    <div style="text-align: left;">
      <h4 style="color:#e1310e">1.  What is this study about?</h2>
      We are conducting a research study about how people monitor and control their cognitive performance. This will help us understand how people adapt, monitor and respond during cognitive tasks. Taking part in this study is voluntary. <br><br>
      Please read this sheet carefully and ask questions about anything that you don&#39;t understand or want to know more about.
      <h4 style="color:#e1310e">2. Who is running the study?</h2>
      The study is being carried out by the following researchers:<br><br>
      <li>Dr Kit Double, Senior Lecturer, School of Psychology, University of Sydney</li>
      <li>Professor Damian Birney, School of Psychology, University of Sydney</li>
      <li>Associate Professor Micah Goldwater, Lecturer, School of Psychology, University of Sydney</li>
      <li>Dr Hilary Don, Research Officer, School of Psychology, University of Sydney</li>
      <li>Ms Cynthia Feng, PhD Student, School of Psychology, University of Sydney</li>
      <li>Ms Yueting Zhan, PhD Student, School of Psychology, University of Sydney</li>
      <li>Ms Mariya Bartosh, Honours Student, School of Psychology, University of Sydney</li>
      <li>Mr Anthony Mbonu, Honours Student, School of Psychology, University of Sydney</li>
      <li>Mr Riley Leckie, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Ms Imann Mian, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Mr Felix Pfeifer, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Mr Aditya Sridhar, Research Assistant, School of Psychology, University of Sydney</li>
      <br><br>
      Data from this study may form the basis of the PhD theses of Yueting Zhan and Cynthia Feng as well as the Honours theses of Mariya Bartosh and Anthony Mbonu.<br><br>
      This study is being funded by the Australian Research Council Discovery Program (DE230101223). </li>
      <div style="text-align: left;">
        <h4 style="color:#e1310e">3. What will the study involve for me?</h2>
        If you decide to take part in this study, you will be asked to complete several computerised cognitive tasks and answer a number of surveys about yourself. <br><br>
        The study will take approximately ${task_time} minutes to complete. The study will be completed online.
        <h4 style="color:#e1310e">4. Can I withdraw once I&#39;ve started?</h2>
        By participating in this study, you are providing your consent for us to collect information about you. Being in this study is completely voluntary and you do not have to take part. Your decision will not affect your current or future relationship with the researchers or anyone else at The University of Sydney.<br><br>
        You can withdraw by closing the study website on your computer. If you decide to withdraw, we will not collect any more information from you. Any information that we have already collected will be kept in our study records and may be included in the study results. If you would prefer that we remove information that we have already collected from you, please contact Dr Kit Double (kit.double@sydney.edu.au). If you do not submit a completed response you will not receive any compensation.
        <h4 style="color:#e1310e">5.  Are there any risks or costs?</h2>
        Aside from giving up your time, we do not expect that there will be any risks or costs associated with taking part in this study.
        <h4 style="color:#e1310e">6.  Are there any benefits?</h2>
        The study will take approximately ${task_time} minutes and you will receive &pound;${task_time/10} compensation for completion. If you do not submit a completed response you will not receive any compensation.
        <h4 style="color:#e1310e">7.  What will happen to information that is collected?</h2>
        By participating in this study, you are providing your consent for us to collect information about you for the purposes of this study.<br><br>
        Any information you provide us will be stored securely and we will only disclose it with your permission, unless we are required by law to release information. We are planning for the study findings to be published. You will not be individually identifiable in these publications.<br><br>
        We will keep the information we collect for this study, and we may use it in future projects.<br><br>
        By providing your consent you are allowing us to use your information in future projects. We don&#39;t know at this stage what these other projects will involve. We will seek ethical approval before using the information in these future projects.<br><br>
        We intend to submit the information from this project to a public database for research information, so that other researchers can access it and use it in their projects. Before we do so, we will take out all the identifying information so that the people we give it to won&#39;t know whose information it is. They won&#39;t know that you participated in the study and they won&#39;t be able to link you to any of the information you provided.
        <h4 style="color:#e1310e">8. Will I be told the results of the study?</h2>
        You have a right to receive feedback about the overall results of this study. To receive feedback about the overall results of the study please email Dr Kit Double (<a href="mailto:kit.double@sydney.edu.au">kit.double@sydney.edu.au</a>). This feedback will be in the form of a brief lay summary.
        <h4 style="color:#e1310e">9. What if I would like further information?</h2>
        When you have read this information, the following researcher/s will be available to discuss it with you further and answer any questions you may have: <br><br>
        <li>Dr Kit Double, Research Fellow, School of Psychology, University of Sydney. Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au </li>
        <h4 style="color:#e1310e">10.  What if I have a complaint or any concerns?</h2>
        The ethical aspects of this study have been approved by the Human Research Ethics Committee (HREC) of The University of Sydney [2022/796] according to the National Statement on Ethical Conduct in Human Research (2007). If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the University:<br><br>
        Human Ethics Manager<br>
        human.ethics@sydney.edu.au<br>
        +61 2 8627 8176<br>
        <button onclick="window.print();return false;" />Print</button>
        <h4 style="color:#e1310e; text-align: center;">This information sheet is for you to keep</h3>
      </div>
      <div style="text-align: center;"></div>
                        
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
                    ]
                },
                show_clickable_nav: true,
                button_label_next: "Start",
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
                }
            }]
        }
    };
    
    
    
    // SONA
    if(is_SONA){
        var participant_info_sheet = {
            timeline: [{
                type: jsPsychInstructions,
                pages: function(){
                    return [
                        `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Participant Information Statement</h1>
      <h1 style="color:#e1310e">Research Study: Metacognition and Cognitive Performance</h1>
      Dr Kit Double (Responsible Researcher)<br>
      School of Psychology, Faculty of Science<br>
      Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au
    </div>
    <hr>
    <div style="text-align: left;">
      <h4 style="color:#e1310e">1.  What is this study about?</h2>
      We are conducting a research study about how people monitor and control their cognitive performance. This will help us understand how people adapt, monitor and respond during cognitive tasks. Taking part in this study is voluntary. <br><br>
      Please read this sheet carefully and ask questions about anything that you don&#39;t understand or want to know more about.
      <h4 style="color:#e1310e">2. Who is running the study?</h2>
      The study is being carried out by the following researchers:<br><br>
      <li>Dr Kit Double, Senior Lecturer, School of Psychology, University of Sydney</li>
      <li>Professor Damian Birney, School of Psychology, University of Sydney</li>
      <li>Associate Professor Micah Goldwater, Lecturer, School of Psychology, University of Sydney</li>
      <li>Dr Hilary Don, Research Officer, School of Psychology, University of Sydney</li>
      <li>Ms Cynthia Feng, PhD Student, School of Psychology, University of Sydney</li>
      <li>Ms Yueting Zhan, PhD Student, School of Psychology, University of Sydney</li>
      <li>Ms Mariya Bartosh, Honours Student, School of Psychology, University of Sydney</li>
      <li>Mr Anthony Mbonu, Honours Student, School of Psychology, University of Sydney</li>
      <li>Mr Riley Leckie, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Ms Imann Mian, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Mr Felix Pfeifer, Research Assistant, School of Psychology, University of Sydney</li>
      <li>Mr Aditya Sridhar, Research Assistant, School of Psychology, University of Sydney</li>
      <br><br>
      Data from this study may form the basis of the PhD theses of Yueting Zhan and Cynthia Feng as well as the Honours theses of Mariya Bartosh and Anthony Mbonu.<br><br>
      This study is being funded by the Australian Research Council Discovery Program (DE230101223). </li>
      <div style="text-align: left;">
        <h4 style="color:#e1310e">3. What will the study involve for me?</h2>
        If you decide to take part in this study, you will be asked to complete several computerised cognitive tasks and answer a number of surveys about yourself. <br><br>
        The study will take approximately ${Math.ceil(task_time/15)*15} minutes to complete. The study will be completed online.
        <h4 style="color:#e1310e">4. Can I withdraw once I&#39;ve started?</h2>
        By participating in this study, you are providing your consent for us to collect information about you. Being in this study is completely voluntary and you do not have to take part. Your decision will not affect your current or future relationship with the researchers or anyone else at The University of Sydney.<br><br>
        You can withdraw by closing the study website on your computer. If you decide to withdraw, we will not collect any more information from you. Any information that we have already collected will be kept in our study records and may be included in the study results. If you would prefer that we remove information that we have already collected from you, please contact Dr Kit Double (kit.double@sydney.edu.au). If you do not submit a completed response you will not receive any compensation.
        <h4 style="color:#e1310e">5.  Are there any risks or costs?</h2>
        Aside from giving up your time, we do not expect that there will be any risks or costs associated with taking part in this study.
        <h4 style="color:#e1310e">6.  Are there any benefits?</h2>
        Course credit will be awarded to you after your participation, as indicated by your psychology unit of study syllabus. The study will take approximately ${Math.ceil(task_time/15)*15} minutes and you will receive ${Math.ceil(task_time/15)*0.25} course credit.<br><br>
        If you do not wish to complete this study, you may obtain course credit by doing other studies on SONA or by undertaking an alternative assignment.
        <h4 style="color:#e1310e">7.  What will happen to information that is collected?</h2>
        By participating in this study, you are providing your consent for us to collect information about you for the purposes of this study.<br><br>
        Any information you provide us will be stored securely and we will only disclose it with your permission, unless we are required by law to release information. We are planning for the study findings to be published. You will not be individually identifiable in these publications.<br><br>
        We will keep the information we collect for this study, and we may use it in future projects.<br><br>
        By providing your consent you are allowing us to use your information in future projects. We don&#39;t know at this stage what these other projects will involve. We will seek ethical approval before using the information in these future projects.<br><br>
        We intend to submit the information from this project to a public database for research information, so that other researchers can access it and use it in their projects. Before we do so, we will take out all the identifying information so that the people we give it to won&#39;t know whose information it is. They won&#39;t know that you participated in the study and they won&#39;t be able to link you to any of the information you provided.
        <h4 style="color:#e1310e">8. Will I be told the results of the study?</h2>
        You have a right to receive feedback about the overall results of this study. To receive feedback about the overall results of the study please email Dr Kit Double (<a href="mailto:kit.double@sydney.edu.au">kit.double@sydney.edu.au</a>). This feedback will be in the form of a brief lay summary.
        <h4 style="color:#e1310e">9. What if I would like further information?</h2>
        When you have read this information, the following researcher/s will be available to discuss it with you further and answer any questions you may have: <br><br>
        <li>Dr Kit Double, Research Fellow, School of Psychology, University of Sydney. Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au </li>
        <h4 style="color:#e1310e">10.  What if I have a complaint or any concerns?</h2>
        The ethical aspects of this study have been approved by the Human Research Ethics Committee (HREC) of The University of Sydney [2022/796] according to the National Statement on Ethical Conduct in Human Research (2007). If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the University:<br><br>
        Human Ethics Manager<br>
        human.ethics@sydney.edu.au<br>
        +61 2 8627 8176<br>
        <button onclick="window.print();return false;" />Print</button>
        <h4 style="color:#e1310e; text-align: center;">This information sheet is for you to keep</h3>
      </div>
      <div style="text-align: center;"></div>
                        
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
                    ]
                },
                show_clickable_nav: true,
                button_label_next: "Start",
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
                }
            }]
        }
        
    };
    
    
    
    // Append PIS
    if (participant_info_sheet !== undefined) {
        timeline.unshift(participant_info_sheet);
    }
    
    
    
    //  debug question  ======================
    const debug = {
        type: jsPsychSurveyText,
        questions: [
            {prompt: 'Did you experience any issues while completing this study?', rows: 5}
        ]
    };
    
    // Append debug
    timeline.push(debug);
    
    
    
    // Add Debrief  ======================
    
    if(is_SONA){
        var debrief_statment = {
            timeline: [{
                type: jsPsychInstructions,
                pages: [
                    `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Debrief Statement</h1>
      <h1 style="color:#e1310e">Research Study: Metacognition and Cognitive Performance</h1>
      Dr Kit Double (Responsible Researcher)<br>
      School of Psychology, Faculty of Science<br>
      Phone: +61 2 8627 8636| Email: kit.double@sydney.edu.au
    </div>
    <hr>
    <div style="text-align: left;">
      Thank you for completing the research study metacognition and cognitive performance. This study aims to understand how metacognitive self-evaluation affects cognitive performance.<br><br>
      Self-evaluation involves rating or evaluating your performance in some way. Self-evaluating while performing cognitive tasks (e.g., problem-solving tasks, memory tests) has been shown to affect performance. Generally, self-evaluation has a positive effect on cognitive performance, though this is not always the case. This research is interested in how people change their approach to problem-solving and other cognitive problems as a result of being asked to self-evaluate. <br><br>
      The study randomly assigned participants to complete a cognitive task either with or without prompting them to self-evaluate (by asking them to provide self-report ratings of their performance). We will assess how performing this self-evaluation affected cognitive performance on the task (i.e. did it improve or impair performance).<br><br>
      If you have any questions, now or at a later time, please feel free to contact Dr Kit Double (kit.double@sydney.edu.au) <br><br>
      The ethical aspects of this study have been approved by the Human Research Ethics Committee (HREC) of The University of Sydney [INSERT HREC Approval No. once obtained] according to the National Statement on Ethical Conduct in Human Research (2007).<br><br>
      If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the University:<br><br>
      Human Ethics Manager<br>
      human.ethics@sydney.edu.au<br>
      +61 2 8627 8176<br>
      <button onclick="window.print();return false;" />Print</button>
      <h4 style="color:#e1310e; text-align: center;">This debrief statement is for you to keep</h3>
    </div>
    <div style="text-align: center;"></div>
  </div>
  `
                ],
                show_clickable_nav: true,
                button_label_next: "Continue",
                allow_backward: false
            }]
        }
        
        var study_complete_notification = {
            timeline: [
                {
                    type: jsPsychInstructions,
                    pages: [
                        `You have completed the study. Please notify the experimenter now.`
                    ],
                    key_forward: 'q'
                }
            ]
        };
        
        var DEBRIEF_SONA = {
            timeline: [debrief_statment, study_complete_notification]
        }
        
        // Append debrief
        if (is_SONA) {
            timeline.push(DEBRIEF_SONA);
        }
    };
    
    
    
    
    
    
    
    // Initalise full screen   ======================
    const enter_fullscreen = {
        timeline: [
            {
                type: jsPsychFullscreen,
                message: '<p>To take part in the experiment, your browser must be in fullscreen mode. Exiting fullscreen mode will pause the experiment.<br><br>Please click the button below to enable fullscreen and continue.</p>',
                fullscreen_mode: true,
                on_finish: function(){
                    in_fullscreen = true; // update tracker
                }
            }
        ],
        conditional_function: function() {
            // Skip if in DEBUG
            if (is_DEBUG) {
                return false;
            } 
            return true;
        }
    };
    
    if(initalise_fullscreen){
        timeline.unshift(enter_fullscreen);
    }
    
    
    // Check Fullscreen  ====================== (to be manually included)
    var check_fullscreen = {
        timeline: [
            
            {type: jsPsychFullscreen,
                message: '<p>You need to be in fullscreen mode to continue the experiment! <br></br> Please click the button below to enter fullscreen mode.<br></br><p>',
                fullscreen_mode: true,
                on_finish: function(){
                    in_fullscreen = true;
                }
            }
        ],
        conditional_function: function(){
            if(in_fullscreen  | is_DEBUG){
                return false;
            } else {
                return true;
            }
        }
    };
    
    
    
    
    // Check browser compatability   ======================
    var browserCheck = {
        type: jsPsychBrowserCheck,
        inclusion_function: (data) => {
            // Accept only if browser is Chrome, Safari, or Firefox and not on mobile
            return ['chrome', 'firefox', 'safari'].includes(data.browser) && data.mobile === false;
        },
        
        exclusion_message: (data) => {
            aborted = true;
            if (data.mobile) {
                return '<p>You must use a desktop/laptop computer to participate in this experiment.</p>';
            } else if (!['chrome','firefox', 'safari'].includes(data.browser)) {
                return '<p>You must use Chrome, Safari, or Firefox as your browser to complete this experiment.</p>';
            }
        }
    };
    
    
    // Append browser check
    timeline.unshift(browserCheck);
    
    
    

    
    
    return timeline
}