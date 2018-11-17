/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'overlay',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'scale', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 1,
      defaultMax: 5
    },
    {
      key: 'strength', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 1
    },
    {
      key: 'blend', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 9
    },
    {
      key: 'clip', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 2
    }
  ],

  shots: [

    {
      method: 'next', // needs to be unique
      title: 'next' // should be human
    },
    {
      method: 'prev', // needs to be unique
      title: 'prev' // should be human
    }
  ]
}
