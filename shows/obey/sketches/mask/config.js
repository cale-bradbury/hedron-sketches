/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'mask',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'hue', // needs to be unique
      defaultValue: .5,
      min: -3.14159,
      max: 3.14159
    },
    {
      key: 'saturation', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 100
    },
    {
      key: 'brightness', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 100
    },
    {
      key: 'up', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'upRight', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'right', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'downRight', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'down', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'downLeft', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'left', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'upLeft', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'smoothing', // needs to be unique
      defaultValue: .5,
      min: .001,
      max: .5
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
