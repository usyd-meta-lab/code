
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
