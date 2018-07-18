/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'gradientize',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'hueLow', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'satLow', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'briLow', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'hueMid', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'satMid', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'briMid', // needs to be unique
      defaultValue: .5, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'hueHigh', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'satHigh', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'briHigh', // needs to be unique
      defaultValue: 1, // should be human
      min: 0,
      max: 1
    },
  ],

  shots: [
    {
      method: 'greyscale', // needs to be unique
      title: 'greyscale' // should be human
    },
    {
      method: 'randomize', // needs to be unique
      title: 'randomize' // should be human
    },
  ]
}
