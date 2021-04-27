// @ts-nocheck
    // This music has been exported by SoundBox. You can use it with
    // http://sb.bitsnbites.eu/player-small.js in your own product.

    // See http://sb.bitsnbites.eu/demo.html for an example of how to
    // use it in a demo.

    // Song data
let template = n => ({
  songData: [
    { // Instrument 0
      i: [
        0, // OSC1_WAVEFORM
        39, // OSC1_VOL
        92, // OSC1_SEMI
        0, // OSC1_XENV
        1, // OSC2_WAVEFORM
        27, // OSC2_VOL
        97, // OSC2_SEMI
        17, // OSC2_DETUNE
        230, // OSC2_XENV
        59, // NOISE_VOL
        23, // ENV_ATTACK
        8, // ENV_SUSTAIN
        17, // ENV_RELEASE
        29, // ENV_EXP_DECAY
        35, // ARP_CHORD
        3, // ARP_SPEED
        2, // LFO_WAVEFORM
        195, // LFO_AMT
        6, // LFO_FREQ
        0, // LFO_FX_FREQ
        1, // FX_FILTER
        2, // FX_FREQ
        177, // FX_RESONANCE
        66, // FX_DIST
        160, // FX_DRIVE
        0, // FX_PAN_AMT
        0, // FX_PAN_FREQ
        9, // FX_DELAY_AMT
        1 // FX_DELAY_TIME
      ],
      // Patterns
      p: [1],
      // Columns
      c: [
        {n: [n],
         f: [10,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,59]}
      ]
    },
  ],
  rowLen: 5513,   // In sample lengths
  patternLen: 32,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
});

export default [
  template(100),
  template(139),
  template(152),
  template(156),
  template(120)
];
