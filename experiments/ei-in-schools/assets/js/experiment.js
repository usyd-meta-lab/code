/* 
Overall Structure
•	141 items
•	8 tasks grouped into 4 branches, based on the four-branch model of emotional intelligence:
1.	Perceiving Emotions
2.	Using Emotions to Facilitate Thought
3.	Understanding Emotions
4.	Managing Emotions

Each branch has two tasks, so the 8 tasks together cover the model.

Branch 1: Perceiving Emotions
1.	Faces Task – judge emotions expressed in human faces.
2.	Pictures Task – judge emotions conveyed in abstract designs, landscapes, or pictures.

⸻

Branch 2: Using Emotions (Facilitating Thought)
3.	Sensations Task – identify the emotions associated with different physical sensations (e.g., colors, sounds, temperatures).
4.	Facilitation Task – evaluate which moods/emotions would best facilitate certain kinds of problem solving or reasoning.

⸻

Branch 3: Understanding Emotions
5.	Changes Task – recognize how emotions evolve and transition over time (e.g., how irritation may progress to anger).
6.	Blends Task – identify complex emotions that arise from combinations of simpler emotions.

⸻

Branch 4: Managing Emotions
7.	Emotion Management Task – evaluate the effectiveness of strategies for managing one’s own emotions.
8.	Emotional Relationships Task – evaluate strategies for managing emotions in others or in social interactions.

*/



require_response = false;

/* 
===============================================================
=              Instructions              =
===============================================================
*/


var msceit_instructions = {
    type: jsPsychInstructions,
    on_load: function(){
         document.body.style.backgroundColor = "#A3A3A3";
    },
    pages: [
    `
<div style="text-align: left; padding-left: 20px; max-width: 70ch; margin: auto;">

  <h2>Instructions</h2>

  <p>Welcome, and thank you for taking part in this study.<br>
  You are about to complete the Mayer&#8211;Salovey&#8211;Caruso Emotional Intelligence Test (MSCEIT). 
  This test is designed to measure different ways in which people understand, use, and manage emotions.</p>

  <ul>
    <li>The test is <strong>not a measure of personality or general intelligence</strong>, but rather of specific emotional abilities.</li>
    <li>There are several types of questions, such as:
      <ul>
        <li>Describing the emotions that different situations or pictures might cause.</li>
        <li>Identifying how emotions can change or blend together.</li>
        <li>Considering how emotions might help someone think or solve a problem.</li>
        <li>Judging the most effective way to regulate emotions in a scenario.</li>
      </ul>
    </li>
    <li>Some items will ask you to rate answers on a <strong>scale</strong> (e.g., how effective or how likely), while others will ask you to <strong>select the best option</strong> from a list.</li>
    <li>There are no trick questions. The aim is to record your <strong>first, honest judgment</strong>. Try not to overthink your answers.</li>
    <li>Work at a steady pace. While there is no strict time limit for most sections, the whole test usually takes about <strong>30&#8211;45 minutes</strong> to complete.</li>
  </ul>

  <p>Please answer <strong>as carefully and honestly as possible</strong>, since the value of the test depends on your genuine responses.</p>

</div>
    `
    ],
    show_clickable_nav: true,
    allow_backward: false
}





/* 
===============================================================
=              1. Perceiving Emotions              =
===============================================================
*/

// Faces Task


var likert_scale = [
  "1", 
  "2", 
  "3", 
  "4", 
  "5"
];

var faces_block = {
  timeline: [
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: function(){return "<img src = 'assets/img/" + jsPsych.evaluateTimelineVariable('face') + ".jpg'></img><p>How much is each feeling below expressed by this face? (i.e. Select a response from 1-5, where 1 = no feeling and 5 = extreme feeling)</p>"},
      labels: ["1", "2", "3", "4", "5"],
      questions: [
        {name: 'Happiness',   anchors: ['No happiness',   'Extreme happiness']},
        {name: 'Fear',       anchors: ['No fear',        'Extreme fear']},
        {name: 'Surprise',   anchors: ['No surprise',    'Extreme surprise']},
        {name: 'Disgust',    anchors: ['No disgust',     'Extreme disgust']},
        {name: 'Excitement', anchors: ['No excitement',  'Extreme excitement']},
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Faces";
        data.branch = "Perceiving Emotions";
        data.stimulus = jsPsych.evaluateTimelineVariable('face');
        
      }
    }
    
  ], 
  timeline_variables: [
    {face: 'Face1'},
    {face: 'Face2'},
    {face: 'Face3'},
    {face: 'Face4'},
  ]
}



// Pictures Task

// Helper to build a 1–5 image picker for an emotion
function emotionPicker(emotion) {
  const mk = (v) => ({
    value: String(v),
    text: String(v),
    imageLink: `assets/img/faces/${emotion}+${v}.jpg`
  });
  return {
    type: "imagepicker",
    name: emotion,
    title: emotion,
    isRequired: require_response,
    choices: [mk(1), mk(2), mk(3), mk(4), mk(5)],
    colCount: 5,
    multiSelect: false,
    showLabel: true,
    imageWidth: 60,
    imageHeight: 60
  };
}

// inject once
function ensureSurveyGreyBg(){
  if (document.getElementById('survey-grey-bg')) return;
  const s = document.createElement('style');
  s.id = 'survey-grey-bg';
  s.textContent = `
    /* Backgrounds */
    .jspsych-content,
    .jspsych-survey-container,
    .jspsych-survey-container .sd-root-modern,
    .jspsych-survey-container .sd-body { background-color:#A3A3A3 !important; }

    .jspsych-survey-container .sd-container-modern,
    .jspsych-survey-container .sd-page {
      box-shadow:none !important;
    }

    /* The white “cards” around each question */
    .jspsych-survey-container .sd-element--with-frame {
      box-shadow:none !important;
      border:1px solid rgba(0,0,0,0.08) !important;  /* or 'none' to remove line entirely */
      padding:8px 12px !important;                   /* ↓ was ~32/40 */
      border-radius:8px !important;
    }

    /* Reduce vertical padding within the question row */
    .jspsych-survey-container .sd-row__question { padding:6px 0 !important; }

    /* Tighten title/content spacing */
    .jspsych-survey-container .sd-question--title-top .sd-question__content {
      margin-top:6px !important;                     /* ↓ shrink gap under title (emotion label) */
    }
    .jspsych-survey-container .sd-question__title { margin-bottom:4px !important; }

    /* Make imagepicker itself more compact */
    .jspsych-survey-container .sd-imagepicker { min-height:auto !important; }
    .jspsych-survey-container .sd-imagepicker__item-container { padding:2px 0 !important; }
    .jspsych-survey-container .sd-imagepicker__item { margin:4px 10px !important; }
    .jspsych-survey-container .sd-imagepicker__image {
      max-height:48px !important; width:auto !important;   /* adjust to taste */
    }

    /* Optional: remove the border entirely for a flat list */
    /* .jspsych-survey-container .sd-element--with-frame { border:none !important; } */
  `;
  document.head.appendChild(s);
}
// Pictures Task with background + centered header images
var pictures_block = {
  timeline: [

    // Q1
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
         ensureSurveyGreyBg();
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q1";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Photo1.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Happiness"),
          emotionPicker("Sadness"),
          emotionPicker("Fear"),
          emotionPicker("Anger"),
          emotionPicker("Disgust")
        ]
      }
    },

    // Q2
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q2";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Photo2.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Sadness"),
          emotionPicker("Anger"),
          emotionPicker("Surprise"),
          emotionPicker("Happiness"),
          emotionPicker("Excitement")
        ]
      }
    },

    // Q3
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q3";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Photo3.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Happiness"),
          emotionPicker("Fear"),
          emotionPicker("Anger"),
          emotionPicker("Surprise"),
          emotionPicker("Disgust")
        ]
      }
    },

    // Q4
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q4";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Art1.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Sadness"),
          emotionPicker("Fear"),
          emotionPicker("Anger"),
          emotionPicker("Surprise"),
          emotionPicker("Disgust")
        ]
      }
    },

    // Q5
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q5";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Art2.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Happiness"),
          emotionPicker("Sadness"),
          emotionPicker("Fear"),
          emotionPicker("Anger"),
          emotionPicker("Disgust")
        ]
      }
    },

    // Q6
    {
      type: jsPsychSurvey,
      on_load: function(){
        document.body.style.backgroundColor = "#A3A3A3";
      },
      on_finish: function(data){
        data.task = "Pictures";
        data.branch = "Perceiving Emotions";
        data.question = "Q6";
      },
      survey_json: {
        allowHtml: true,
        elements: [
          {
            type: "html",
            html: "<div style='text-align:center;'><img src='assets/img/Art3.jpg' style='max-height:250px;'><h3>INSTRUCTIONS: How much are the feelings below expressed by this picture? (Select a response for each feeling)</h3></div>"
          },
          emotionPicker("Happiness"),
          emotionPicker("Sadness"),
          emotionPicker("Anger"),
          emotionPicker("Surprise"),
          emotionPicker("Disgust")
        ]
      }
    }

  ],
   on_timeline_finish: function(){
    // reset <body> background
    document.body.style.backgroundColor = "#A3A3A3";

    // if you injected a style override for survey background, remove it
    const s = document.getElementById('survey-grey-bg');
    if (s) s.remove();
  }
};










/* 
===============================================================
=              2. Using Emotions              =
===============================================================
*/

// Facilitation Task 

var facilitation_block = {
  timeline: [
    // Q1
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<h3>INSTRUCTIONS: Please select a response for each item.</h3><p>1. What mood(s) might be helpful to feel when creating new, exciting decorations for a birthday party?</p>",
      labels: ["1 (Not useful)", "2", "3", "4", "5 (Useful)"],
      questions: [
        {name: 'Annoyance',   anchors: ['Annoyance',   '']},
        {name: 'Boredom',       anchors: ['Boredom',        '']},
        {name: 'Joy',   anchors: ['Joy',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Facilitation";
        data.branch = "Using Emotions";
        data.question = "Q1";
        
      }
    },
    
    // Q2
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>2. What mood(s) might be helpful to feel when composing an inspiring military march?</p>",
      labels: ["1 (Not useful)", "2", "3", "4", "5 (Useful)"],
      questions: [
        {name: 'Anger',   anchors: ['Anger',   '']},
        {name: 'Excitement',       anchors: ['Excitement',        '']},
        {name: 'Frustration',   anchors: ['Frustration',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Facilitation";
        data.branch = "Using Emotions";
        data.question = "Q2";
        
      }
    },
    
    
    // Q3
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>3. What mood(s) might be helpful to feel when following a very complicated, demanding, cooking recipe?</p>",
      labels: ["1 (Not useful)", "2", "3", "4", "5 (Useful)"],
      questions: [
        {name: 'Tension',   anchors: ['Tension',   '']},
        {name: 'Sorrow',       anchors: ['Sorrow',        '']},
        {name: 'Neutral Mood',   anchors: ['Neutral Mood',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Facilitation";
        data.branch = "Using Emotions";
        data.question = "Q3";
        
      }
    },
    
    
    // Q4
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>4. What mood(s) might be helpful when figuring out what caused a fight among three young children? Each of the three children is telling a different story about how the fight started. Figuring out what happened requires attending to the details of the stories and weighing many facts.</p>",
      labels: ["1 (Not useful)", "2", "3", "4", "5 (Useful)"],
      questions: [
        {name: 'Happiness',   anchors: ['Happiness',   '']},
        {name: 'Surprise',       anchors: ['Surprise',        '']},
        {name: 'Sadness',   anchors: ['Sadness',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Facilitation";
        data.branch = "Using Emotions";
        data.question = "Q4";
        
      }
    },
    
    
    // Q5
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>5. What mood(s) might be helpful for a doctor to feel when selecting a treatment plan for a patient with a cancerous tumour? The doctor must apply several known, but conflicting principles in the treatment of the tumour.</p>",
      labels: ["1 (Not useful)", "2", "3", "4", "5 (Useful)"],
      questions: [
        {name: 'Happiness',   anchors: ['Happiness',   '']},
        {name: 'Neutral Mood',       anchors: ['Neutral Mood',        '']},
        {name: 'Anger and defiance',   anchors: ['Anger and defiance',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Facilitation";
        data.branch = "Using Emotions";
        data.question = "Q5";
        
      }
    },
  ]
  
}





// Sensations Task 

var sensations_block = {
  timeline: [
    // Q1
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<h3>INSTRUCTIONS: For each item below, you are asked to imagine feeling a certain way. Answer as best as you can, even if you are unable to imagine the feeling.</h3><p>1. Imagine feeling guilty that you forgot to visit a close friend who has a serious illness. In the middle of the day you realise you completely forgot to visit your friend at the hospital. How much is the feeling of guilt like each of the following?</p>",
      labels: ["1 (Not alike)", "2", "3", "4", "5 (Very much alike)"],
      questions: [
        {name: 'cold',   anchors: ['cold',   '']},
        {name: 'blue',       anchors: ['blue',        '']},
        {name: 'sweet',   anchors: ['sweet',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Sensations";
        data.branch = "Using Emotions";
        data.question = "Q1";
        
      }
    },
    
    // Q2
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>2. Imagine feeling content on a wonderful day, with terrific news about your job and family. How much is the feeling of contentment like each of the following sensations?</p>",
      labels: ["1 (Not alike)", "2", "3", "4", "5 (Very much alike)"],
      questions: [
        {name: 'warm',   anchors: ['warm',   '']},
        {name: 'purple',       anchors: ['purple',        '']},
        {name: 'salty',   anchors: ['salty',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Sensations";
        data.branch = "Using Emotions";
        data.question = "Q2";
        
      }
    },
    
    
    // Q3
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>3. Imagine you are feeling cold, slow and sharp. How much is that feeling like each of the following?</p>",
      labels: ["1 (Not alike)", "2", "3", "4", "5 (Very much alike)"],
      questions: [
        {name: 'challenged',   anchors: ['challenged',   '']},
        {name: 'isolated',       anchors: ['isolated',        '']},
        {name: 'surprised',   anchors: ['surprised',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Sensations";
        data.branch = "Using Emotions";
        data.question = "Q3";
        
      }
    },
    
    
    // Q4
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>4. Imagine you are feeling loud, large, delicate and bright green. How much is that feeling like each of the following?</p>",
      labels: ["1 (Not alike)", "2", "3", "4", "5 (Very much alike)"],
      questions: [
        {name: 'excited',   anchors: ['excited',   '']},
        {name: 'jealous',       anchors: ['jealous',        '']},
        {name: 'afraid',   anchors: ['afraid',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Sensations";
        data.branch = "Using Emotions";
        data.question = "Q4";
        
      }
    },
    
    
    // Q5
    {type: jsPsychSurveyMatrix,
      scale_width: 800,
      preamble: "<p>5. Imagine you are feeling closed, dark, and numb. How much is that feeling like each of the following?</p>",
      labels: ["1 (Not alike)", "2", "3", "4", "5 (Very much alike)"],
      questions: [
        {name: 'sad',   anchors: ['sad',   '']},
        {name: 'content',       anchors: ['content',        '']},
        {name: 'calm',   anchors: ['calm',    '']}
      ],
      randomize_question_order: false,
      on_finish: function(data){
        data.task = "Sensations";
        data.branch = "Using Emotions";
        data.question = "Q5";
        
      }
    },
  ]
  
}
/* 
===============================================================
=              3.	Understanding Emotions            =
===============================================================
*/

// Changes Task 

var changes_block = {
  timeline: [
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>1. Marjorie felt more and more ashamed, and began to feel worthless. She then felt ........", 
          name: 'changes_Q1', 
          options: ['overwhelmed', 'depressed', 'ashamed', 'self-conscious', 'jittery'], 
          required: false
        }, 
        {
          prompt: "2. Kenji felt content as he thought of his life, and the more he thought about the good things he had done and the joy his acts had brought to others, the more he felt .....", 
          name: 'changes_Q2', 
          options: ['surprised', 'depressed', 'acceptance', 'happiness', 'amazement'], 
          required: false
        },
        {
          prompt: "3. Natalie had never been more surprised in her life. But as she recovered from the shock of the loss and realised she could gain some advantage from the situation if she planned carefully, she became .....", 
          name: 'changes_Q3', 
          options: ['amazed', 'confused', 'denying of the situation', 'expectant', 'pensive'], 
          required: false
        }, 
        {
          prompt: "4. Nelson was saddened by the news from home, and wanted to express his sincere regret. When he heard that he had not been told right away and that matters were worse than he at first thought, he felt ......", 
          name: 'changes_Q4', 
          options: ['anger and surprise', 'sadness and anticipation', 'shock and regret', 'fear and loathing', 'anger and sorrow'], 
          required: false
        },
        {
          prompt: "5. Rashad is usually quite happy at work and things also go well for him at home. He thought that he and his co-workers were generally fairly paid and treated well.<br>Today, everyone in his unit received a modest across-the-board pay increase as part of corporate-wide adjustments in salary. Rashad felt ....", 
          name: 'changes_Q5', 
          options: ['surprised and shocked', 'peaceful and quiet', 'content and elated', 'humbled and guilty', 'proud and dominant'], 
          required: false
        }
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>6. Glenda loved Jake, who she felt belonged only to her. She began to see him as perfect for her, and close to perfection in general. She ....", 
          name: 'changes_Q6', 
          options: ['respected him', 'admired him', 'envied him', 'adored him', 'resented him'], 
          required: false
        }, 
        {
          prompt: "7. Tatiana was annoyed that a co-worker took credit for a project, and when he did it again she felt .....", 
          name: 'changes_Q7', 
          options: ['anger', 'annoyance', 'frustration', 'startled', 'depression'], 
          required: false
        },
        {
          prompt: "8. After Charlie's car was stolen, he installed a new car alarm in his new car. When his new car was also stolen, he first felt shock and surprise, and then .....", 
          name: 'changes_Q8', 
          options: ['amazement and astonishment', 'helplessness, despair and anger', 'anger and disgust', 'jealousy and envy', 'depression and contempt'], 
          required: false
        }, 
        {
          prompt: "9. When Steve discovered that several students were cheating on exams, he thought it was morally wrong. When he told the teacher, the teacher said there was nothing he could do about it.<br>Steve planned to pursue the matter with a school administrator because he felt ..... by what happened", 
          name: 'changes_Q9', 
          options: ['enlivened', 'enraged', 'disgusted', 'depressed', 'saddened'], 
          required: false
        },
        {
          prompt: "10. Matt had been hurt by one of his friends and was feeling angry. Matt told his friend how he felt, and when the friend did it again, Matt became .....", 
          name: 'changes_10', 
          options: ['angry', 'fearful', 'very annoyed', 'worried', 'enraged'], 
          required: false
        }
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>11. Theresa watched television so as to follow a hurricane's progress up the coast where her parents lived. As the hurricane moved towards her parent's house, she felt anxiety and helplessness.<br>At the last minute, however, it turned away leaving that area of the coastline unharmed. She felt .....", 
          name: 'changes_Q11', 
          options: ['relief and gratitude', 'surprise and shock', 'tense and relieved', 'anticipation and anxiety', 'anticipation and calmness'], 
          required: false
        }, 
        {
          prompt: "12. A woman who felt secure and accepted later felt depressed. What happened in between?", 
          name: 'changes_Q12', 
          options: ['she received a compliment intended for someone else', 'she discovered her husband was cheating on her', 'a friend became ill', 'a package she mailed to a friend was delivered to the wrong person', 'she was frustrated by a bad job she did on the project'], 
          required: false
        },
        {
          prompt: "13. A child who was happily anticipating his birthday later felt sad. What most likely happened in between?", 
          name: 'changes_Q13', 
          options: ['a bully insulted him and he fought back', 'two friends who he was hoping would come never made it to the party', 'he ate too much cake', 'his mother embarrassed him in front of the other children', 'his father accused him of something he didn&apos;t do'], 
          required: false
        }, 
        {
          prompt: "14. A middle-aged woman was happy and shortly after felt disapproving. What most likely happened in between?", 
          name: 'changes_Q14', 
          options: ['her son injured himself slightly at work', 'she realised she had hurt a close friend&apos;s feelings', 'her daughter-in-law was late for a family dinner', 'her husband criticised her', 'she lost a book that was important to her'], 
          required: false
        },
        {
          prompt: "15. A man was feeling rested and then felt admiration. What happened in between?", 
          name: 'changes_Q15', 
          options: ['while resting, the man solved an important problem at work', 'the man heard a story about a sports hero who set a new world record', 'his friend called to say he had just purchased a new sports car at a great price', 'a package arrived with a gift from his mother', 'his doctor called to say his checkup indicated he was healthy'], 
          required: false
        }
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>16. A woman felt anticipation and then she felt love. What happened in between?", 
          name: 'changes_Q16', 
          options: ['she gave a donation and thought about the people she would help', 'she bought a dress that was very flattering', 'she read a fan magazine about a star she found very appealing', 'her mother called to tell her that she was sending her a birthday gift that would be a surprise', 'she went on a date and discovered many things in common with an attractive man'], 
          required: false
        }, 
        {
          prompt: "17. An executive in a corporation felt displeased and then resentful. What happened in between?", 
          name: 'changes_Q17', 
          options: ['a subordinate failed to achieve his goals for the period', 'another officer in the company, who he believed to be incompetent, won a pay increase much larger than his own', 'he read a news item about people in another part of the world living in poverty and how a major charity was facing obstacles in their relief efforts', 'his wife was helping his children with their homework', 'no one seemed to like him'], 
          required: false
        },
        {
          prompt: "18. A woman felt angry and then felt guilty. What happened in between?", 
          name: 'changes_Q18', 
          options: ['she lost the phone number of a friend who was very close to her', 'she didn&apos;t finish a job as well as she hoped to because she didn&apos;t have enough time', 'she expressed anger at her friend, who she then discovered hadn &apos;t done anything to hurt her', 'she lost a close friend', 'she was angry that someone gossiped about her, and then discovered that others were saying the same thing'], 
          required: false
        }, 
        {
          prompt: "19. A man liked his friend and then despised him. What happened in between?", 
          name: 'changes_Q19', 
          options: ['his friend lost an expensive book he loaned him', 'his friend betrayed his wife', 'his friend won a raise he didn &apos;t deserve', 'his friend said he was moving away', 'the man felt he had hurt his friend and it was partially his friend &apos;s fault'], 
          required: false
        },
        {
          prompt: "20. A woman loved someone and then felt secure. What happened in between?", 
          name: 'changes_Q20', 
          options: ['she learned the other person loved her in return', 'she decided not to express her feelings', 'her love went away', 'she told the other person that she loved him', 'her love itself brought about security'], 
          required: false
        }
      ],
    }
  ]
  
};



// Blends task

var blends_block = {
  timeline: [
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Blends";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>1. A feeling of concern most likely combines the emotions of .....", 
          name: 'Q1', 
          options: ['love, anxiety, surprise, anger', 'surprise, pride, anger, fear', 'acceptance, anxiety, fear, anticipation', 'fear, joy, surprise, embarrassment', 'anxiety, caring, anticipation'], 
          required: false
        }, 
        {
          prompt: '2. Another word for "consistently anticipating pleasure" is.....',
          name: 'Q2', 
          options: ['optimism', 'happiness', 'contentment', 'joy', 'surprise'], 
          required: false
        },
        {
          prompt: "3. Acceptance, joy and warmth often combine to form .....", 
          name: 'Q3', 
          options: ['love', 'amazement', 'anticipation', 'contentment', 'acceptance'], 
          required: false
        }, 
        {
          prompt: "4. Combining the feelings of disgust and anger results in .....", 
          name: 'Q4', 
          options: ['guilt', 'rage', 'shame', 'hatred', 'contempt'], 
          required: false
        }
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>5. A sad surprise leads to .....", 
          name: 'Q5', 
          options: ['disappointment', 'amazement', 'anger', 'fear', 'regret'], 
          required: false
        }, 
        {
          prompt: "6. Sadness, guilt and regret combine to form .....", 
          name: 'Q6', 
          options: ['grief', 'annoyance', 'depression', 'remorse', 'misery'], 
          required: false
        },
        {
          prompt: "7. Relaxation, security and serenity are all parts of .....", 
          name: 'Q7', 
          options: ['love', 'fatigue', 'expectancy', 'calmness', 'anticipation'], 
          required: false
        }, 
        {
          prompt: "8. Fear, surprise and embarrassment are all part of .....", 
          name: 'Q8', 
          options: ['esteem', 'awe', 'puzzlement', 'respect', 'sympathy'], 
          required: false
        }
      ],
    },

    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Changes";
        data.branch = "Understanding Emotions";
      },
      questions: [
        {
          prompt: "<h3>INSTRUCTIONS: Select the best alternative for each of these questions</h3>9. Shame, surprise and embarrassment are all part of .....", 
          name: 'Q9', 
          options: ['jealousy', 'sadness', 'guilt', 'envy', 'humiliation'], 
          required: false
        }, 
        {
          prompt: "10. Admiration, love and anxiety are all part of .....", 
          name: 'Q10', 
          options: ['jealousy', 'sadness', 'malice', 'pride', 'worry'], 
          required: false
        },
        {
          prompt: "11. Joy, excitement and uncertainty are all part of .....", 
          name: 'Q11', 
          options: ['liveliness', 'anticipation', 'anxiety', 'calmness', 'serenity'], 
          required: false
        }, 
        {
          prompt: "12. Sadness and satisfaction are  both sometimes part of the feeling of .....", 
          name: 'Q12', 
          options: ['nostalgia', 'anxiety', 'anticipation', 'depression', 'contempt'], 
          required: false
        }
      ],
    }
  ]
  
};

/* 
===============================================================
=              4.	Managing Emotions            =
===============================================================
*/

// Emotion Management Task


var management_block = {
  timeline: [
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Management";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 1";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>Mara woke up feeling pretty well. She had slept well, felt restored, and had no particular cares or concerns. How well would each action help her preserve her mood?</h4>",
      questions: [
        {
          prompt: "Action 1: She got up and enjoyed the rest of the day", 
          name: 'management_q1_action1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 2: Mara enjoyed the feeling and decided to think about and appreciate all the things that were going well for her.", 
          name: 'management_q1_action2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Action 3: She decided it was best to ignore the feeling since it wouldn't last anyway.", 
          name: 'management_q1_action3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 4: She used the positive feeling to call her Mother, who had been depressed, and tried to cheer her up.", 
          name: 'management_q1_action4', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Management";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 2";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>Andrew works as hard, if not harder, than one of his colleagues. In fact, his ideas are usually better at getting positive results for the company. His colleague does a mediocre job but engages in office politics so as to get ahead. So, when Andrew's boss announces that the annual merit award is being given to his colleague, Andrew is very angry. How effective would each action be in helping Andrew feel better?</h4>",
      questions: [
        {
          prompt: "Action 1: Andrew sat down and thought about all the good things in his life and work", 
          name: 'management_q2_action1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 2: Andrew made a list of positive and negative traits of his colleague.", 
          name: 'management_q2_action2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Action 3: Andrew felt terrible that he felt that way, and he told himself that it wasn't right to be so upset.", 
          name: 'management_q2_action3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 4: Andrew decided to tell people just what a poor job his colleague had done, and that he did not deserve the merit award. Andrew gathered memos and notes to prove his point, so it wasn't just his word.", 
          name: 'management_q2_action4', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Management";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 3";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>Jane did not know when her bills were due, how many more bills would be arriving soon, or if she could pay them. Then her car began making strange noises and her mechanic said it would cost so much to fix it might not be worth it. Jane can’t fall asleep easily, she wakes up several times at night, and she finds herself worrying all the time. How effective would each of the following actions be in reducing her worry?</h4>",
      questions: [
        {
          prompt: "Action 1: Jane tried to work out what she owed, how much was due, and when it was due.", 
          name: 'management_q3_action1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 2: Jane learned deep relaxation techniques to calm herself down.", 
          name: 'management_q3_action2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Action 3: Jane got the name of a financial planner to help her figure out how to manage her finances properly.", 
          name: 'management_q3_action3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 4: She decided to look for a job that paid more money.", 
          name: 'management_q3_action4', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Management";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 4";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>Nothing seems to be going right for Ed. There just isn’t much in Ed’s life that he enjoys or that brings him much pleasure. Over the next year, how effective would each of the following actions be at making Ed feel better?</h4>",
      questions: [
        {
          prompt: "Action 1: Ed started to call friends he hadn’t spoken to in a while and made plans to see a few people.", 
          name: 'management_q4_action1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 2: He started to eat better, to get to bed earlier, and to exercise more.", 
          name: 'management_q4_action2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Action 3: Ed felt that he was bringing people down and decided to stay by himself more until he could work out what was bothering him. He felt he needed time alone.", 
          name: 'management_q4_action3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 4: Ed found that relaxing in front of the TV at night, with a beer or two, really helped him to feel better.", 
          name: 'management_q4_action4', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
      ],
    },
    
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Management";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 5";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>As Robert drove home from work, a tractor-trailer truck cut him off. He didn’t even have time to honk his horn. Robert quickly swerved to the right to avoid getting hit. He was furious. How effective would each of the following actions be in dealing with his anger?</h4>",
      questions: [
        {
          prompt: "Action 1: Robert taught the truck driver a lesson by cutting him off a few miles down the highway.", 
          name: 'management_q5_action1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 2: Robert just accepted that these things happen and drove home.", 
          name: 'management_q5_action2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Action 3: He yelled as loud as he could, and cursed and swore at the driver.", 
          name: 'management_q5_action3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Action 4: He vowed never to drive that way again.", 
          name: 'management_q5_action4', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
      ],
    }
  ]
}



// Emotional Relationships Task 


var relationships_block = {
  timeline: [
    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Relationships";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 1";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>John developed a close friend at work over the last year. Today, that friend completely surprised him by saying he had taken a job at another company and would be moving out of the area. He had not mentioned he was looking for other jobs. How effective would John be in maintaining a good relationship, if he chose to respond in each of the following ways?</h4>",
      questions: [
        {
          prompt: "Response 1: John felt good for him and told his friend that he was glad he got the new job. Over the next few weeks, John made arrangements to ensure they stayed in touch.", 
          name: 'Response1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Response 2: John felt sad that his friend was leaving, but he considered what happened as an indication that the friend did not much care for him. After all, the friend said nothing about his job search. Given that his friend was leaving anyway, John did not mention it, but instead went looking for other friends at work.", 
          name: 'Response2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Response 3: John was very angry that his friend hadn&apos;t said anything. John showed his disapproval by deciding to ignore his friend until the friend said something about what he had done. John thought that if his friend didn&apos;t say anything, it would confirm John&apos;s opinion that the friend was not worth talking to.", 
          name: 'Response3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }
      ],
    },

    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Relationships";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 2";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4> Roy&apos;s teacher has just called Roy&apos;s parents to say that Roy is doing poorly in school. The teacher tells Roy&apos;s parents that their son isn&apos;t paying attention, is being disruptive, and can&apos;t sit still. The particular teacher doesn&apos;t do well with active boys, and Roy&apos;s parents wonder what&apos;s really going on. Then the teacher says that their son will be held back unless he improves. The parents feel very angry. How helpful to their son is each of these reactions?</h4>",
      questions: [
        {
          prompt: "Response 1: The parents told the teacher that this was a big shock to them since this was the first time that had ever heard there was a problem. They asked to meet with the teacher and also requested if the principal could attend the meeting.", 
          name: 'Response1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Response 2: The parents said to the teacher that if she continued to threaten to have their son repeat the grade, they would take it up with the principal. They said, “If our son is left back, we will hold you personally responsible. You are the teacher and your job is to teach, not blame the student”.", 
          name: 'Response2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Response 3: Roy&apos;s parents hung up on the teacher and called the principal. They complained about the teacher&apos;s threats and asked that their son be moved to a different classroom.", 
          name: 'Response3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }
      ],
    },

    {type: jsPsychSurveyMultiChoice,
      on_finish: function(data){
        data.task = "Relationships";
        data.branch = "Managing Emotions";
        data.Scenario = "Scenario 3";
      },
      preamble: "<h3>INSTRUCTIONS: Please select an answer for every action</h3><h4>Everything is going well for Liz. While others have been complaining about work, Liz has just gotten a promotion and a decent raise. Her children all are very happy and doing well in school, her marriage is stable and very happy. Liz is starting to feel very self-important and finds herself tempted to brag about her life to her friends. How effective would each of the following responses be for maintaining her relationships?</h4>",
      questions: [
        {
          prompt: "Response 1: Since everything is so good, it&apos;s okay to feel proud of it. But Liz also realized that some people see it as bragging, or may be jealous of her and so she only talked to close friends about her feelings.", 
          name: 'Response1', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        }, 
        {
          prompt: "Response 2: Liz started to think of all the things that could possibly go wrong in the future so she could gain perspective on her life. She saw that good feelings don&apos;t always last.", 
          name: 'Response2', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
        },
        {
          prompt: "Response 3: Liz shared her feelings with her husband that night. Then she decided that the family should spend time together on the weekend and get involved in several family events just to be together.", 
          name: 'Response3', 
          options: ['Very ineffective', 'Somewhat ineffective', 'Neutral', 'Somewhat effective', 'Very effective'], 
          required: require_response,
          horizontal: true
    }
      ],
    }
  ]}