/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'textTrippy',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'posX', // needs to be unique
      defaultValue: .5,
      min: -3000,
      max: 3000
    },
    {
      key: 'posY',
      defaultValue: .5,
      min: -3000,
      max: 3000
    },
    {
      key: 'posZ',
      defaultValue: .5,
      min: -3000,
      max: 0
    },

    {
      key: 'rotX', // needs to be unique
      defaultValue: .5,
      min: -3.1415,
      max: 3.1415
    },
    {
      key: 'rotY',
      defaultValue: .5,
      min: -3.1415,
      max: 3.1415
    },
    {
      key: 'rotZ', // needs to be unique
      defaultValue: .5,
      min: -3.1415,
      max: 3.1415
    },

    {
      key: 'xStep', // needs to be unique
      defaultValue: .5, // must be between 0 and 1
      min: -1,
      max: 1
    },
    {
      key: 'yStep',
      defaultValue: .5,
      min: -1,
      max: 1
    },
    {
      key: 'zStep',
      defaultValue: .5,
      min: -1,
      max: 1
    },

    {
      key: 'ampX', // needs to be unique
      defaultValue: 0 // must be between 0 and 1
    },
    {
      key: 'ampY',
      defaultValue: 0
    },
    {
      key: 'ampZ',
      defaultValue: .5,
      min:0,
      max:2
    },

    {
      key: 'freqX', // needs to be unique
      defaultValue: .5 // must be between 0 and 1
    },
    {
      key: 'freqY',
      defaultValue: .5
    },
    {
      key: 'freqZ',
      defaultValue: .5
    },

    {
      key: 'phaseX', // needs to be unique
      defaultValue: .5 // must be between 0 and 1
    },
    {
      key: 'phaseY',
      defaultValue: .5
    },
    {
      key: 'phaseZ',
      defaultValue: .5
    },

    {
      key: 'scaleStart', // needs to be unique
      defaultValue: .5 // must be between 0 and 1
    },

    {
      key: 'scaleEnd', // needs to be unique
      defaultValue: 1 // must be between 0 and 1
    },
    {
      key: 'rotZStep',
      defaultValue: .1,
      min: -.1,
      max: .1
    },
    {
      key: 'alphaStart',
      defaultValue: 1
    },
    {
      key: 'alphaEnd',
      defaultValue: 0
    },
    {
      key: 'colorPhase',
      defaultValue: 0.5,
      min:0,
      max: 360//6.28318530718
    },
    {
      key: 'colorFreq',
      defaultValue: 0.6
    },
    {
      key: 'colorSat',
      defaultValue: 0.5
    },
    {
      key: 'colorLight',
      defaultValue: 0.5
    },
    {
      key: 'count',
      defaultValue: 0.4
    },
    {
      key: 'thickness',
      defaultValue: 0.4,
      min: .0001,
      max: 1
    },

  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'randomize', // needs to be unique
      title: 'randomize' // should be human
    },
    {
      method: 'invertFirst', // needs to be unique
      title: 'invert first' // should be human
    },
    {
      method: 'toggleText', // needs to be unique
      title: 'toggleText' // should be human
    }
  ]
}
