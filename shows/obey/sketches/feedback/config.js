/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'fdbk',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'fade',
      defaultValue: .9,
      min: -1,
      max: 1
    },
    {
      key: 'xPos',
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'yPos',
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'hue',
      defaultValue: .5,
      min: -.1,
      max: .1
    },
    {
      key: 'saturation',
      defaultValue: .5,
      min: -.1,
      max: .1
    },
    {
      key: 'brightness',
      defaultValue: .5,
      min: -.1,
      max: .1
    },
    {
      key: 'xShift',
      title: "min distance shift",
      defaultValue: .5,
      min: -100,
      max: 100
    },
    {
      key: 'yShift',
      title: "max distance shift",
      defaultValue: .5,
      min: -100,
      max: 100
    },
    {
      key: 'anglePhase',
      defaultValue: 0,
      min: 0,
      max: 6.28318530718
    },
    {
      key: 'angleMin',
      defaultValue: .5,
      min: -.03,
      max: .03
    },
    {
      key: 'angleMax',
      defaultValue: .5,
      min: -.03,
      max: .03
    },
    {
      key: 'angleFreq',
      defaultValue: 0,
      min: 0,
      max: 100
    },
    {
      key: 'angleScale',
      title: 'mic angle mul',
      defaultValue: .5,
      min: 1,
      max: 16
    },
    {
      key: 'angleOffset',
      title: 'mic angle off',
      defaultValue: .5,
      min: 0,
      max: 2
    },


  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'panic', // needs to be unique
      title: 'panic' // should be human
    },
    {
      method: 'togglePostSave', // needs to be unique
      title: 'togglePost' // should be human
    },
    {
      method: 'debug', // needs to be unique
      title: 'debug microphone' // should be human
    },
    {
      method: 'blendLerp', // needs to be unique
      title: 'mode lerp' // should be human
    },
    {
      method: 'blendAdd', // needs to be unique
      title: 'mode add' // should be human
    },
    {
      method: 'blendScreen', // needs to be unique
      title: 'mode screen' // should be human
    },
    {
      method: 'blendDarken', // needs to be unique
      title: 'mode darken' // should be human
    },
    {
      method: 'blendMultiply', // needs to be unique
      title: 'mode multiply' // should be human
    },
    {
      method: 'blendBurn', // needs to be unique
      title: 'mode color burn' // should be human
    },
    {
      method: 'blendPin', // needs to be unique
      title: 'mode pin light' // should be human
    },
    {
      method: 'blendSaturation', // needs to be unique
      title: 'mode saturation' // should be human
    },
    {
      method: 'blendDivide', // needs to be unique
      title: 'mode divide' // should be human
    },
    {
      method: 'blendDifference', // needs to be unique
      title: 'mode difference' // should be human
    },
  ]
}
