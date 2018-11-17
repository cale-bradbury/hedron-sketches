/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'scrollingImage',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'x', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 1
    },
    {
      key: 'y', // needs to be unique
      defaultValue: 0, // should be human
      defaultMin: 0,
      defaultMax: 1
    }
  ],

  shots: [

  ]
}
