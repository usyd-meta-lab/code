

  /* ===============================================================
   RELATIONAL MINDSET
   =============================================================== */

const relational_inst = {
  type: jsPsychInstructions,
  pages: [
      `<p class="instructions"><strong>Welcome to the task!</strong><br>
    You will see a 4-word analogy with the final word missing, like this:
<br><strong>Cat : Kitten // Dog : ____</strong><br><br>
Your task is to fill in the blank with a word that best completes the analogy.
In this case, the correct answer could be <strong>"Puppy"</strong>, because just as a kitten is a young cat, a puppy is a young dog.
There may be more than one correct answer - as long as your answer fits the same relationship, it's acceptable.

    `
  ],
  show_clickable_nav: true,
  button_label_next: "Begin",
  allow_backward: false
};



const relational_mindset = {
    // Store trial and block counters with each trial's data
  data: function() {
    return { trialnum: trialnum, blocknum: blocknum };
  },
  timeline:[
        /* 1. Text Response */
    {
      type: jsPsychSurveyText,
      on_finish: function(data){
        
      // Store Data
        data.analogy = jsPsych.evaluateTimelineVariable('analogy');
        data.analogy_name = jsPsych.evaluateTimelineVariable('analogy_name');
        data.correct_response = jsPsych.evaluateTimelineVariable('correct_response');
        data.trial_type = "Summary Trial";
        data.phase = 'Mindset'; 
        data.mindset = "Relational";
        const rawResp = Object.values(data.response)[0];
        data.correct_response = data.correct_response;
        data.response = rawResp.trim().toLowerCase();
  
      // Score
      data.strict_correct  = data.response === data.correct_response;
      data.lenient_correct = isLenientMatch(data.response, data.correct_response);
      data.correct = data.strict_correct;   // maintains existing field
      trialnum++;

      },
    questions: function(){return ([
    {prompt: jsPsych.timelineVariable('analogy'), placeholder: '????', required: true, name: jsPsych.timelineVariable('analogy_name')}
  ])}
    }
  ],
  timeline_variables: [
  {analogy: 'answer:riddle // key:________', analogy_name: 'mindset1', correct_response: 'lock'},
  {analogy: 'ash:fireplace // lint:________', analogy_name: 'mindset2', correct_response: 'pocket'},
  {analogy: 'aspirin:pain // muffler:________', analogy_name: 'mindset3', correct_response: 'noise'},
  {analogy: 'baker:cake // scientist:________', analogy_name: 'mindset4', correct_response: 'discovery'},
  {analogy: 'basket:picnic // holster:________', analogy_name: 'mindset5', correct_response: 'gun'},
  {analogy: 'basketball:hoop // traveler:________', analogy_name: 'mindset6', correct_response: 'destination'},
  {analogy: 'blindness:sight // poverty:________', analogy_name: 'mindset7', correct_response: 'money'},
  {analogy: 'blizzard:snowflake // army:________', analogy_name: 'mindset8', correct_response: 'soldier'},
  {analogy: 'bracelet:wrist // moat:________', analogy_name: 'mindset9', correct_response: 'castle'},
  {analogy: 'burger:bun // book:________', analogy_name: 'mindset10', correct_response: 'cover'},
  {analogy: 'cleanser:face // absolution:________', analogy_name: 'mindset11', correct_response: 'sinner'},
  {analogy: 'eraser:pencil // amnesia:________', analogy_name: 'mindset12', correct_response: 'memory'},
  {analogy: 'father:son // inventor:________', analogy_name: 'mindset13', correct_response: 'invention'},
  {analogy: 'flock:goose // constellation:________', analogy_name: 'mindset14', correct_response: 'star'},
  {analogy: 'foresight:future // x-ray:________', analogy_name: 'mindset15', correct_response: 'bones'},
  {analogy: 'foundation:house // premise:________', analogy_name: 'mindset16', correct_response: 'argument'},
  {analogy: 'furnace:coal // stomach:________', analogy_name: 'mindset17', correct_response: 'food'},
  {analogy: 'hoof:hoofprint // introduction:________', analogy_name: 'mindset18', correct_response: 'impression'},
  {analogy: 'immunisation:disease // forewarning:________', analogy_name: 'mindset19', correct_response: 'surprise'},
  {analogy: 'jacket:zipper // wound:________', analogy_name: 'mindset20', correct_response: 'suture'},
  {analogy: 'ketchup:tomato // fuel:________', analogy_name: 'mindset21', correct_response: 'petroleum'},
  {analogy: 'kitten:cat // spark:________', analogy_name: 'mindset22', correct_response: 'flame'},
  {analogy: 'knee:kneepad // snail:________', analogy_name: 'mindset23', correct_response: 'shell'},
  {analogy: 'lambchop:lamb // chapter:________', analogy_name: 'mindset24', correct_response: 'book'},
  {analogy: 'landscaper:lawn // barber:________', analogy_name: 'mindset25', correct_response: 'hair'},
  {analogy: 'launchpad:helicopter // divingboard:________', analogy_name: 'mindset26', correct_response: 'diver'},
  {analogy: 'lawschool:lawyer // vineyard:________', analogy_name: 'mindset27', correct_response: 'wine'},
  {analogy: 'movie:screen // lightning:________', analogy_name: 'mindset28', correct_response: 'sky'},
  {analogy: 'multiplication:product // brewing:________', analogy_name: 'mindset29', correct_response: 'beer'},
  {analogy: 'nose:scent // antenna:________', analogy_name: 'mindset30', correct_response: 'signal'},
  {analogy: 'orchard:apple // neighbourhood:________', analogy_name: 'mindset31', correct_response: 'apartment'},
  {analogy: 'painting:canvas // birthmark:________', analogy_name: 'mindset32', correct_response: 'skin'},
  {analogy: 'pen:pig // reservoir:________', analogy_name: 'mindset33', correct_response: 'water'},
  {analogy: 'rectangle:perimeter // nation:________', analogy_name: 'mindset34', correct_response: 'border'},
  {analogy: 'revising:manuscript // evolving:________', analogy_name: 'mindset35', correct_response: 'species'},
  {analogy: 'saxophone:jazz // typewriter:________', analogy_name: 'mindset36', correct_response: 'poetry'},
  {analogy: 'sugar:coffee // incentive:________', analogy_name: 'mindset37', correct_response: 'deal'},
  {analogy: 'thermometer:temperature // polygraph:________', analogy_name: 'mindset38', correct_response: 'honesty'},
  {analogy: 'train:track // signal:________', analogy_name: 'mindset39', correct_response: 'wire'},
  {analogy: 'watermelon:rind // cigarette:________', analogy_name: 'mindset40', correct_response: 'butt'}
  ]
}


  /* ===============================================================
   CONTROL MINDSET(s)
   =============================================================== */


   const control_inst = {
  type: jsPsychInstructions,
  pages: [
      `<p class="instructions"><strong>Welcome to the task!</strong><br>
    You will see 4 words below, with one of them missing all but the first letter. All of the word meanings are related. Your job is to type the missing word.
    <br><br>For example: &apos;&apos;blindness, sight, e _ _ _, glasses,&apos; the correct response being &apos;&apos;eyes.&apos;&apos; 

    `
  ],
  show_clickable_nav: true,
  button_label_next: "Begin",
  allow_backward: false
};



const control_mindset1 = {
    // Store trial and block counters with each trial's data
  data: function() {
    return { trialnum: trialnum, blocknum: blocknum };
  },
  timeline:[
        /* 1. Text Response */
    {
      type: jsPsychSurveyText,
      on_finish: function(data){
   

              // Store Data
        data.analogy = jsPsych.evaluateTimelineVariable('analogy');
        data.analogy_name = jsPsych.evaluateTimelineVariable('analogy_name');
        data.correct_response = jsPsych.evaluateTimelineVariable('correct_response');
        data.trial_type = "Summary Trial";
        data.phase = 'Mindset'; 
        data.mindset = "Control";
        const rawResp = Object.values(data.response)[0];
        data.correct_response = data.correct_response;
        data.response = rawResp.trim().toLowerCase();
  
      // Score
      data.strict_correct  = data.response === data.correct_response;
      data.lenient_correct = isLenientMatch(data.response, data.correct_response);
      data.correct = data.strict_correct;   // maintains existing field
      trialnum++;


      },
    questions: function(){return ([
    {prompt: jsPsych.timelineVariable('analogy'), placeholder: '????', required: true, name: jsPsych.timelineVariable('analogy_name')}
  ])}
    }
  ],
  timeline_variables: [
{analogy: 'a _ _ _ _ _, riddle, guess, think', analogy_name: 'mindset1',  correct_response: 'answer'},
{analogy: 'ketchup, r _ _, squeeze, tomato',                           analogy_name: 'mindset2',  correct_response: 'red'},
{analogy: 'ash, f _ _ _ _ _ _ _ _, furnace, heat',                    analogy_name: 'mindset3',  correct_response: 'fireplace'},
{analogy: 'kitten, cat, p _ _ _, tail',                               analogy_name: 'mindset4',  correct_response: 'purr'},
{analogy: 'pain, a _ _ _ _ _, ache, relief',                          analogy_name: 'mindset5',  correct_response: 'aspirin'},
{analogy: 'slime, shell, s _ _ _ _, slow',                            analogy_name: 'mindset6',  correct_response: 'snail'},
{analogy: 'b _ _ _ _, cake, oven, eggs',                              analogy_name: 'mindset7',  correct_response: 'baker'},
{analogy: 'read, c _ _ _ _ _ _, character, book',                     analogy_name: 'mindset8',  correct_response: 'chapter'},
{analogy: 'picnic, basket, r _ _, park',                              analogy_name: 'mindset9',  correct_response: 'rug'},
{analogy: 'landscape, mow, l _ _ _, dirt',                            analogy_name: 'mindset10', correct_response: 'lawn'},
{analogy: 'basketball, shot, player, h _ _ _',                        analogy_name: 'mindset11', correct_response: 'hoop'},
{analogy: 'l _ _ _ _ _ _ _, helicopter, wind, crash',                 analogy_name: 'mindset12', correct_response: 'launchpad'},
{analogy: 'blindness, e _ _ _, sight, glasses',                       analogy_name: 'mindset13', correct_response: 'eyes'},
{analogy: 'degree, l _ _ _ _ _ _ _, effort, lawyer',                  analogy_name: 'mindset14', correct_response: 'lawschool'},
{analogy: 'snowflake, coat, chill, b _ _ _ _ _ _',                    analogy_name: 'mindset15', correct_response: 'blizzard'},
{analogy: 'movie, screen, p _ _ _ _ _ _, date',                       analogy_name: 'mindset16', correct_response: 'popcorn'},
{analogy: 'bracelet, c _ _ _ _, wrist, gold',                         analogy_name: 'mindset17', correct_response: 'clasp'},
{analogy: 'multiplication, p _ _ _ _ _ _, maths, memorise',           analogy_name: 'mindset18', correct_response: 'product'},
{analogy: 'burger, u _ _ _ _ _ _ _ _, bun, fast',                     analogy_name: 'mindset19', correct_response: 'unhealthy'},
{analogy: 's _ _ _ _, perfume, nose, stink',                          analogy_name: 'mindset20', correct_response: 'scent'},
{analogy: 'face, c _ _ _ _ _ _, rub, water',                          analogy_name: 'mindset21', correct_response: 'cleanser'},
{analogy: 'apple, worm, h _ _ _ _ _ _, orchard',                      analogy_name: 'mindset22', correct_response: 'harvest'},
{analogy: 'e _ _ _ _ _, pencil, school, mistake',                     analogy_name: 'mindset23', correct_response: 'eraser'},
{analogy: 'canvas, p _ _ _ _ _ _ _, interpretation, artist',          analogy_name: 'mindset24', correct_response: 'painting'},
{analogy: 'father, k _ _ _ _ _ _, authority, son',                    analogy_name: 'mindset25', correct_response: 'kindship'},
{analogy: 'p _ _, pet, pig, pink',                                    analogy_name: 'mindset26', correct_response: 'pen'},
{analogy: 'goose, f _ _ _ _, honk, flap',                             analogy_name: 'mindset27', correct_response: 'flock'},
{analogy: 'perimeter, m _ _ _ _ _ _ _ _ _, geometry, rectangle',      analogy_name: 'mindset28', correct_response: 'measurement'},
{analogy: 'predict, plans, f _ _ _ _ _, foresight',                   analogy_name: 'mindset29', correct_response: 'future'},
{analogy: 'r _ _ _ _ _ _, write, manuscript, draft',                  analogy_name: 'mindset30', correct_response: 'revising'},
{analogy: 'foundation, h _ _ _ _, scaffold, build',                   analogy_name: 'mindset31', correct_response: 'house'},
{analogy: 'saxophone, j _ _ _, performance, music',                   analogy_name: 'mindset32', correct_response: 'jazz'},
{analogy: 'c _ _ _, ironmaking, heat, furnace',                       analogy_name: 'mindset33', correct_response: 'coal'},
{analogy: 'coffee, s _ _ _ _, mug, morning',                          analogy_name: 'mindset34', correct_response: 'sugar'},
{analogy: 'introduction, s _ _ _ _ _, greeting, impression',          analogy_name: 'mindset35', correct_response: 'social'},
{analogy: 'temperature, m _ _ _ _ _ _, measure, thermometer',         analogy_name: 'mindset36', correct_response: 'mercury'},
{analogy: 'disease, m _ _ _ _ _ _, safe, immunisation',               analogy_name: 'mindset37', correct_response: 'medicine'},
{analogy: 'track, carriage, t _ _ _ _, transport',                    analogy_name: 'mindset38', correct_response: 'train'},
{analogy: 'layers, jumper, z _ _ _ _ _, close',                       analogy_name: 'mindset39', correct_response: 'zipper'},
{analogy: 'watermelon, f _ _ _ _, seeds, rind',                       analogy_name: 'mindset40', correct_response: 'flesh'}

  ]
}



const control_mindset2 = {
    // Store trial and block counters with each trial's data
  data: function() {
    return { trialnum: trialnum, blocknum: blocknum };
  },
  timeline:[
        /* 1. Text Response */
    {
      type: jsPsychSurveyText,
      on_finish: function(data){
     

         // Store Data
        data.analogy = jsPsych.evaluateTimelineVariable('analogy');
        data.analogy_name = jsPsych.evaluateTimelineVariable('analogy_name');
        data.correct_response = jsPsych.evaluateTimelineVariable('correct_response');
        data.trial_type = "Summary Trial";
        data.phase = 'Mindset'; 
        data.mindset = "Control";
        const rawResp = Object.values(data.response)[0];
        data.correct_response = data.correct_response;
        data.response = rawResp.trim().toLowerCase();
  
      // Score
      data.strict_correct  = data.response === data.correct_response;
      data.lenient_correct = isLenientMatch(data.response, data.correct_response);
      data.correct = data.strict_correct;   // maintains existing field
      trialnum++;


      },
    questions: function(){return ([
    {prompt: jsPsych.timelineVariable('analogy'), placeholder: '????', required: true, name: jsPsych.timelineVariable('analogy_name')}
  ])}
    }
  ],
  timeline_variables: [
{analogy: 'k _ _, lock, door, fit',                           analogy_name: 'mindset1',  correct_response: 'key'},
{analogy: 'petroleum, f _ _ _, energy, car',                 analogy_name: 'mindset2',  correct_response: 'fuel'},
{analogy: 'lint, pocket, c _ _ _ _ _ _, fluff',              analogy_name: 'mindset3',  correct_response: 'clothing'},
{analogy: 'spark, fire, h _ _ _, burn',                      analogy_name: 'mindset4',  correct_response: 'heat'},
{analogy: 'muffler, n _ _ _ _, backfire, explosion',         analogy_name: 'mindset5',  correct_response: 'noise'},
{analogy: 'knee, k _ _ _ _ _ _, protect, shield',            analogy_name: 'mindset6',  correct_response: 'kneepad'},
{analogy: 'scientist, d _ _ _ _ _ _ _, experiment, hypothesis', analogy_name: 'mindset7',  correct_response: 'discovery'},
{analogy: 'l _ _ _ _ _ _ _, lamb, carnivore, cook',          analogy_name: 'mindset8',  correct_response: 'lambchop'},
{analogy: 'holster, gun, c _ _ _ _ _, belt',                 analogy_name: 'mindset9',  correct_response: 'cowboy'},
{analogy: 'hair, chop, s _ _ _ _, barber',                   analogy_name: 'mindset10', correct_response: 'style'},
{analogy: 'traveler, destination, m _ _, transport',         analogy_name: 'mindset11', correct_response: 'map'},
{analogy: 'd _ _ _ _ _ _ _ _ _, diver, height, pool',        analogy_name: 'mindset12', correct_response: 'divingboard'},
{analogy: 'poverty, p _ _ _, disease, suffer',               analogy_name: 'mindset13', correct_response: 'poor'},
{analogy: 'vineyard, wine, a _ _ _ _ _ _ _ _ _, produce',    analogy_name: 'mindset14', correct_response: 'agriculture'},
{analogy: 'army, soldier, w _ _ _ _ _, war',                 analogy_name: 'mindset15', correct_response: 'wounds'},
{analogy: 'lightning, s _ _, weather, thunder',              analogy_name: 'mindset16', correct_response: 'sky'},
{analogy: 'moat, c _ _ _ _ _, drawbridge, secure',           analogy_name: 'mindset17', correct_response: 'castle'},
{analogy: 'b _ _ _ _ _ _, beer, yeast, alcohol',             analogy_name: 'mindset18', correct_response: 'brewing'},
{analogy: 'book, c _ _ _ _, read, writing',                  analogy_name: 'mindset19', correct_response: 'cover'},
{analogy: 'antenna, s _ _ _ _ _, reception, wire',           analogy_name: 'mindset20', correct_response: 'signal'},
{analogy: 'a _ _ _ _ _ _ _ _ _, sinner, confess, guilt',     analogy_name: 'mindset21', correct_response: 'absolution'},
{analogy: 'neighbourhood, a _ _ _ _ _ _ _ _, block, house',  analogy_name: 'mindset22', correct_response: 'apartment'},
{analogy: 'loss, a _ _ _ _ _, memory, mind',                 analogy_name: 'mindset23', correct_response: 'amnesia'},
{analogy: 'birthmark, s _ _ _, pigment, unique',             analogy_name: 'mindset24', correct_response: 'skin'},
{analogy: 'i _ _ _ _ _ _, new, innovation, create',          analogy_name: 'mindset25', correct_response: 'inventor'},
{analogy: 'r _ _ _ _ _ _ _ _, water, ecosystem, land',       analogy_name: 'mindset26', correct_response: 'reservoir'},
{analogy: 'constellation, s _ _ _, galaxy, space',           analogy_name: 'mindset27', correct_response: 'star'},
{analogy: 'nation, b _ _ _ _ _, territory, country',         analogy_name: 'mindset28', correct_response: 'border'},
{analogy: 'x-ray, b _ _ _, radiation, machine',              analogy_name: 'mindset29', correct_response: 'bone'},
{analogy: 'e _ _ _ _ _ _ _, adapt, genes, species',          analogy_name: 'mindset30', correct_response: 'evolving'},
{analogy: 'premise, a _ _ _ _ _ _ _, convince, language',    analogy_name: 'mindset31', correct_response: 'argument'},
{analogy: 't _ _ _ _ _ _ _, poetry, writer, tradition',      analogy_name: 'mindset32', correct_response: 'typewater'},
{analogy: 'stomach, f _ _ _, digest, enzyme',                analogy_name: 'mindset33', correct_response: 'food'},
{analogy: 'i _ _ _ _ _ _ _, deal, agreement, persuade',      analogy_name: 'mindset34', correct_response: 'incentive'},
{analogy: 'hoof, h _ _ _ _ _ _ _, horse, track',             analogy_name: 'mindset35', correct_response: 'hoofprint'},
{analogy: 'p _ _ _ _ _ _ _, honesty, liar, truth',           analogy_name: 'mindset36', correct_response: 'polygraph'},
{analogy: 'f _ _ _ _ _ _ _ _ _ _, surprise, shock, prepare', analogy_name: 'mindset37', correct_response: 'forewarning'},
{analogy: 'signal, w _ _ _, electric, current',              analogy_name: 'mindset38', correct_response: 'wire'},
{analogy: 'w _ _ _ _, suture, medic, heal',                  analogy_name: 'mindset39', correct_response: 'wound'},
{analogy: 'c _ _ _ _ _ _ _, butt, tobacco, filter',          analogy_name: 'mindset40', correct_response: 'cigarette'}

  ]
}