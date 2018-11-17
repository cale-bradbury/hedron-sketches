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
      defaultMin: 0,
      defaultMax: 1
    },
    {
      key: 'step', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 1,
      defaultMax: 5
    },
    {
      key: 'rotation', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 2
    },
    {
      key: 'lutY', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 2
    },
    {
      key: 'scale', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 2
    },
    {
      key: 'phase', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 2
    }
  ],

  shots: [

  ]
}
