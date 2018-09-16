/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'mirror',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'scale', // needs to be unique
      defaultValue: 0, // should be human
      min: 1,
      max: 5
    },
    {
      key: 'blackoutX', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: .5
    },
    {
      key: 'blackoutY', // needs to be unique
      defaultValue: 0, // should be human
      min: 0,
      max: .5
    },
  ],

  shots: [

    {
      method: 'mirrorX', // needs to be unique
      title: 'X Mirror' // should be human
    },
    {
      method: 'mirrorY', // needs to be unique
      title: 'Y Mirror' // should be human
    },
    {
      method: 'mirrorOff', // needs to be unique
      title: 'Off Mirror' // should be human
    },
  ]
}
