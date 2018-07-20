/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'edgeBars',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'strength', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 1
    },
    {
      key: 'step', // needs to be unique
      defaultValue: 0, // should be human
      min: 1,
      max: 5
    },
    {
      key: 'rotation', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 2
    },
    {
      key: 'lutY', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 2
    },
    {
      key: 'scale', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 2
    },
    {
      key: 'phase', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: 2
    }
  ],

  shots: [

  ]
}
