

var participant_info_paid = {
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
    </div>
  `
      ]
},
show_clickable_nav: true,
button_label_next: "Start",
allow_backward: false
}],
conditional_function: function(){
 if(typeof SONAID === 'undefined'){return true} else{ return false}
}
}






var participant_info_SONA = {
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
    </div>
  `
      ]
},
show_clickable_nav: true,
button_label_next: "Start",
allow_backward: false
}],
conditional_function: function(){
 if(typeof SONAID === 'undefined'){return false} else{ return true}
}
}



  // Legacy demographics

    var demographics = {
       timeline: [
      {type: jsPsychSurveyHtmlForm,
      preamble: "<font size = '15' color='#002080'>Basic Information</font>",
      html: '<div style = "text-align: left"><br><p><b> Age: </b><br><input name="age" type="number" min ="17" max = "100" style = "width: 8em;"required></p>' +
      '<p><b>Sex:</b></p><div><input type="radio" id="male" name="sex" value="male"unchecked><label for="male">Male</label></div><div><input type="radio" id="female" name="sex" value="female"><label for="female">Female</label></div><div><input type="radio" id="other" name="sex" value="other"><label for="other">Non binary/prefer not to say</label></div>' +
      '<p><b>Do you speak english fluently?:</b></p><div><input type="radio" id="yes" name="english" value="yes"unchecked><label for="yes">Yes</label></div><div><input type="radio" id="no" name="english" value="no"><label for="no">No</label></p></div><div></div>',
      on_finish: function(data){
        jsPsych.data.addProperties({age: data.response.age, sex: data.response.sex, english_fluent: data.response.english});
      },
      on_load: function(){
        document.querySelector('#jspsych-survey-html-form-next').disabled = true;


        $('input[type="radio"]').on("click", function(e) {
          if($("input[name=age]" ).val() == '' || $("input[type=radio][name=sex]:checked" ).val() === undefined || $( "input[type=radio][name=english]:checked" ).val() === undefined ){return} else {
            document.querySelector('#jspsych-survey-html-form-next').disabled = false;
          }
        })

        $('input[type="number"]').on("change", function(e) {
          if($("input[name=age]" ).val() == '' || $("input[type=radio][name=sex]:checked" ).val() === undefined || $( "input[type=radio][name=english]:checked" ).val() === undefined ){return} else {
            document.querySelector('#jspsych-survey-html-form-next').disabled = false;
          }
        })



      }
    }
    ],
    conditional_function: function(){
      if(typeof SCHOOLID != 'undefined') {return true} else {return false}
    }}



var DEBRIEF_SONA = {
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
  }],
  conditional_function: function(){
    if(typeof SONAID === 'undefined'){return false} else{ return true}
  }
}


  /* 
  ===============================================================
  =                SCHOOLS Project                =
  ===============================================================
  */
  


var participant_info_school = {
  timeline: [{
    type: jsPsychInstructions,
    pages: function(){
      return [
        `
  <div style="padding-left: 50px;">
    <div style="text-align: left;">
      <img style="height: 100px; float: right" src="https://usyd-meta-lab.github.io/files/usyd.ico"></img>
      <h1>Participant Information Statement</h1>
      <h1 style="color:#e1310e">Research Study: Self-Assessment and Emotional Intelligence</h1>
    </div>
    <p style="text-align: left;">Download a copy of this information <a href="PIS.pdf" target="_blank">here</a>.</p>
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
}],
conditional_function: function(){
 if(typeof SCHOOLID === 'undefined'){return false} else{ return true}
}
}



var DEBRIEF_School = {
  timeline: [{
    type: jsPsychInstructions,
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
    <hr>
    <div style="text-align: left;">
      Thank you for participating in this research study. This study aims to understand how self-assessment affects emotional intelligence.
Self-assessment involves rating or evaluating your performance in some way. Self-assessment while performing cognitive tasks (e.g., problem-solving tasks, memory tests) has been shown to impact performance.
This research is interested in whether these findings extend to situations involving tests of emotional intelligence. That is, can your emotional intelligence be improved by self-assessing your performance? To investigate this, the study required you to complete questionnaires assessing your emotional intelligence and your ability to self-assess your performance on a range of tasks. We will explore how performing this self-assessment related to your performance on the emotional intelligence task (i.e., did it improve or impair your performance?). Such research is critical in the development of interventions to improve emotional intelligence and wellbeing outcomes in young persons. We thank you for your participation in this important research.
If you have any questions, now or at a later time, please feel free to contact Dr Kit Double (kit.double@sydney.edu.au).

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
    button_label_next: "Continue",
    allow_backward: false
  }],
  conditional_function: function(){
    if(typeof SCHOOLID === 'undefined'){return false} else{ return true}
  }
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
    <li>I understand that in this study I will be required to complete an online survey where I will answer questions about myself and complete a range of [cognitive and/or wellbeing and/or emotional intelligence] questionnaires. As I complete these questionnaires, I understand I may be asked to self-assess my performance.</li>
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
  }],
  conditional_function: function(){
    if(typeof SCHOOLID === 'undefined'){return false} else{ return true}
  }
};