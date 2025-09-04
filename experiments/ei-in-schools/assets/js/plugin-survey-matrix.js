var jsPsychSurveyMatrix = (function (jspsych) {
  'use strict';

  var version = "2.1.0";

  const info = {
    name: "survey-matrix",
    version,
    parameters: {
      /** Array containing one or more objects with parameters for the question(s) that should be shown on the page. */
      questions: {
        type: jspsych.ParameterType.COMPLEX,
        array: true,
        nested: {
          /** Whether or not a response to this question must be given in order to continue. */
          required: {
            type: jspsych.ParameterType.BOOL,
            default: false
          },
          /** Name of the question in the trial data. If no name is given, the questions are named Q0, Q1, etc. */
          name: {
            type: jspsych.ParameterType.STRING,
            default: ""
          },
          /** Optional left/right anchors for this question, shown at the ends of the scale. */
          anchors: {
            type: jspsych.ParameterType.STRING,
            array: true,
            default: []
          }
        }
      },
      /** If true, the order of the questions in the 'questions' array will be randomized. */
      randomize_question_order: {
        type: jspsych.ParameterType.BOOL,
        default: false
      },
      /** HTML-formatted string to display at top of the page above all of the questions. */
      preamble: {
        type: jspsych.ParameterType.HTML_STRING,
        default: null
      },
      /** Array of matrix labels to display for all questions on this trial. */
      labels: {
        type: jspsych.ParameterType.STRING,
        array: true,
        default: void 0
      },
      /** Width of the matrix scales in pixels. */
      scale_width: {
        type: jspsych.ParameterType.INT,
        default: null
      },
      /** Label of the button to submit responses. */
      button_label: {
        type: jspsych.ParameterType.STRING,
        default: "Continue"
      },
      /** Setting this to true will enable browser auto-complete or auto-fill for the form. */
      autocomplete: {
        type: jspsych.ParameterType.BOOL,
        default: false
      }
    },
    data: {
      /** An object containing the response for each question. The object will have a separate key (variable) for each question, with the first question in the trial being recorded in `Q0`, the second in `Q1`, and so on. The responses are recorded as integers, representing the position selected on the matrix scale for that question. If the `name` parameter is defined for the question, then the response object will use the value of `name` as the key for each question. This will be encoded as a JSON string when data is saved using the `.json()` or `.csv()` functions. */
      response: {
        type: jspsych.ParameterType.OBJECT
      },
      /** The response time in milliseconds for the participant to make a response. The time is measured from when the questions first appear on the screen until the participant's response(s) are submitted. */
      rt: {
        type: jspsych.ParameterType.INT
      },
      /** An array with the order of questions. For example `[2,0,1]` would indicate that the first question was `trial.questions[2]` (the third item in the `questions` parameter), the second question was `trial.questions[0]`, and the final question was `trial.questions[1]`. This will be encoded as a JSON string when data is saved using the `.json()` or `.csv()` functions. */
      question_order: {
        type: jspsych.ParameterType.INT,
        array: true
      }
    },
    // prettier-ignore
    citations: {
      "apa": "de Leeuw, J. R., Gilbert, R. A., & Luchterhandt, B. (2023). jsPsych: Enabling an Open-Source Collaborative Ecosystem of Behavioral Experiments. Journal of Open Source Software, 8(85), 5351. https://doi.org/10.21105/joss.05351 ",
      "bibtex": '@article{Leeuw2023jsPsych, 	author = {de Leeuw, Joshua R. and Gilbert, Rebecca A. and Luchterhandt, Bj{\\" o}rn}, 	journal = {Journal of Open Source Software}, 	doi = {10.21105/joss.05351}, 	issn = {2475-9066}, 	number = {85}, 	year = {2023}, 	month = {may 11}, 	pages = {5351}, 	publisher = {Open Journals}, 	title = {jsPsych: Enabling an {Open}-{Source} {Collaborative} {Ecosystem} of {Behavioral} {Experiments}}, 	url = {https://joss.theoj.org/papers/10.21105/joss.05351}, 	volume = {8}, }  '
    }
  };
  class SurveyMatrixPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      if (trial.scale_width !== null) {
        var w = trial.scale_width + "px";
      } else {
        var w = "100%";
      }
      var html = "";
      html += '<style id="jspsych-survey-matrix-css">';
      html += ".jspsych-survey-matrix-opts { list-style:none; width:" + w + "; margin:auto; padding:0 0 35px; display:block; font-size: 14px; line-height:1.1em; }" +
              ".jspsych-survey-matrix-opts:before { content: ''; position:relative; top:12px; display:block; background-color:#efefef; height:4px; width:100%; }" +
              ".jspsych-survey-matrix-opts:last-of-type { border-bottom: 0; }" +
              ".jspsych-survey-matrix-opts li { display:inline-block; text-align:center; vertical-align: top; }" +
              ".jspsych-survey-matrix-opts li input[type=radio] { display:block; position:relative; top:0; left:50%; margin-left:-6px; }" +
              /* header-specific styles */
              ".jspsych-survey-matrix-header { padding: 0 0 10px; }" +
              ".jspsych-survey-matrix-header:before { display:none; }" +
              ".jspsych-survey-matrix-col-label { display:block; padding-bottom: 6px; font-weight: 600; }" +
              /* accessibility helper to hide repeated labels but keep them for screen readers */
              ".jspsych-visually-hidden { position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }" +
              /* row layout with anchors */
              ".jspsych-survey-matrix-row { display:flex; align-items:center; gap:16px; margin: 10px 0 22px; }" +
              ".jspsych-survey-matrix-anchor { width:25%; font-size:18px; line-height:1.2; display:flex; align-items:center; }" +
              ".jspsych-survey-matrix-anchor.left { justify-content:flex-end; padding-right:8px; }" +
              ".jspsych-survey-matrix-anchor.right { justify-content:flex-start; padding-left:8px; }" +
              ".jspsych-survey-matrix-row .jspsych-survey-matrix-opts { width:50%; padding:0; }";
      html += "</style>";
      if (trial.preamble !== null) {
        html += '<div id="jspsych-survey-matrix-preamble" class="jspsych-survey-matrix-preamble">' + trial.preamble + "</div>";
      }
      if (trial.autocomplete) {
        html += '<form id="jspsych-survey-matrix-form">';
      } else {
        html += '<form id="jspsych-survey-matrix-form" autocomplete="off">';
      }
      var question_order = [];
      for (var i = 0; i < trial.questions.length; i++) {
        question_order.push(i);
      }
      if (trial.randomize_question_order) {
        question_order = this.jsPsych.randomization.shuffle(question_order);
      }
      // Build a single header row with the column labels (shown once at the top)
      if (trial.questions.length > 0) {
        var header_labels = trial.labels;
        var header_width = 100 / header_labels.length;
        var header_html = '<div class="jspsych-survey-matrix-row">' +
                          '<div class="jspsych-survey-matrix-anchor left" aria-hidden="true"></div>' +
                          '<ul class="jspsych-survey-matrix-opts jspsych-survey-matrix-header" aria-hidden="false">';
        for (var hj = 0; hj < header_labels.length; hj++) {
          header_html += '<li style="width:' + header_width + '%">' +
                         '<div class="jspsych-survey-matrix-col-label">' + header_labels[hj] + '</div>' +
                         '</li>';
        }
        header_html += '</ul>' +
                       '<div class="jspsych-survey-matrix-anchor right" aria-hidden="true"></div>' +
                       '</div>';
        html += header_html;
      }
      for (var i = 0; i < trial.questions.length; i++) {
        var question = trial.questions[question_order[i]];

        var left_anchor = (question.anchors && question.anchors.length > 0) ? question.anchors[0] : "";
        var right_anchor = (question.anchors && question.anchors.length > 1) ? question.anchors[1] : "";

        html += '<div class="jspsych-survey-matrix-row">';
        html +=   '<div class="jspsych-survey-matrix-anchor left">' + left_anchor + '</div>';

        var width = 100 / trial.labels.length;
        var options_string = '<ul class="jspsych-survey-matrix-opts" data-name="' + question.name + '" data-radio-group="Q' + question_order[i] + '">';
        for (var j = 0; j < trial.labels.length; j++) {
          options_string += '<li style="width:' + width + '%"><label class="jspsych-survey-matrix-opt-label"><input type="radio" name="Q' + question_order[i] + '" value="' + j + '"';
          if (question.required) { options_string += ' required'; }
          options_string += '><span class="jspsych-visually-hidden">' + trial.labels[j] + '</span></label></li>';
        }
        options_string += '</ul>';
        html += options_string;

        html +=   '<div class="jspsych-survey-matrix-anchor right">' + right_anchor + '</div>';
        html += '</div>';
      }
      html += '<input type="submit" id="jspsych-survey-matrix-next" class="jspsych-survey-matrix jspsych-btn" value="' + trial.button_label + '"></input>';
      html += "</form>";
      display_element.innerHTML = html;
      display_element.querySelector("#jspsych-survey-matrix-form").addEventListener("submit", (e) => {
        e.preventDefault();
        var endTime = performance.now();
        var response_time = Math.round(endTime - startTime);
        var question_data = {};
        var matches = display_element.querySelectorAll(
          "#jspsych-survey-matrix-form .jspsych-survey-matrix-opts[data-name]"
        );
        for (var index = 0; index < matches.length; index++) {
          var id = matches[index].dataset["radioGroup"];
          var el = display_element.querySelector(
            'input[name="' + id + '"]:checked'
          );
          if (el === null) {
            var response = "";
          } else {
            var response = parseInt(el.value);
          }
          var obje = {};
          var dataName = matches[index].getAttribute("data-name") || "";
          var name = dataName !== "" ? dataName : id;
          obje[name] = response;
          Object.assign(question_data, obje);
        }
        var trial_data = {
          rt: response_time,
          response: question_data,
          question_order
        };
        this.jsPsych.finishTrial(trial_data);
      });
      var startTime = performance.now();
    }
    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }
    create_simulation_data(trial, simulation_options) {
      const question_data = {};
      let rt = 1e3;
      for (const q of trial.questions) {
        const name = q.name ? q.name : `Q${trial.questions.indexOf(q)}`;
        question_data[name] = this.jsPsych.randomization.randomInt(0, trial.labels.length - 1);
        rt += this.jsPsych.randomization.sampleExGaussian(1500, 400, 1 / 200, true);
      }
      const default_data = {
        response: question_data,
        rt,
        question_order: trial.randomize_question_order ? this.jsPsych.randomization.shuffle([...Array(trial.questions.length).keys()]) : [...Array(trial.questions.length).keys()]
      };
      const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
      return data;
    }
    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }
    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      this.trial(display_element, trial);
      load_callback();
      const answers = Object.entries(data.response);
      for (let i = 0; i < answers.length; i++) {
        this.jsPsych.pluginAPI.clickTarget(
          display_element.querySelector(
            `input[type="radio"][name="${answers[i][0]}"][value="${answers[i][1]}"]`
          ),
          (data.rt - 1e3) / answers.length * (i + 1)
        );
      }
      this.jsPsych.pluginAPI.clickTarget(
        display_element.querySelector("#jspsych-survey-matrix-next"),
        data.rt
      );
    }
  }

  return SurveyMatrixPlugin;

})(jsPsychModule);
