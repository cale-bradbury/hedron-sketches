/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'bigO',
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
      key: 'scale',
      defaultValue: .5,
      min: .0001,
      max: 1500
    },
    {
      key: 'opacity',
      defaultValue: 1,
    },


  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
   /* {
      method: 'invertFirst', // needs to be unique
      title: 'invert first' // should be human
    }*/
  ]
}
