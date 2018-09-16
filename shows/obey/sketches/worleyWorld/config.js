/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'worleyWorld',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'xPos', // needs to be unique
      defaultValue: .5,
      min: -.05,
      max: .05
    },
    {
      key: 'yPos',
      defaultValue: .5,
      min: -.05,
      max: .05
    },
    {
      key: 'zPos',
      defaultValue: .5,
      min: -.05,
      max: .05
    },
    {
      key: 'yRot', // needs to be unique
      defaultValue: .5,
      min: -.01,
      max: .01
    },
    {
      key: 'yLook',
      defaultValue: .5,
      min: -2,
      max: 2
    },
    {
      key: 'm0', // needs to be unique
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'm1',
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'm2',
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'm3',
      defaultValue: .5,
      min: 0,
      max: 2
    },
    {
      key: 'opacity',
      defaultValue: .5,
      min: 0,
      max: 1
    },
    {
      key: 'fov',
      defaultValue: .5,
      min: 2,
      max: 16
    },
    {
      key: 'scale',
      defaultValue: .1,
      min: .1,
      max: .8
    },
    {
      key: 'brightness',
      defaultValue: 0,
      min: .1,
      max: 1
    },
    {
      key: 'power',
      defaultValue: .5,
      min: 1,
      max: 4
    },
    {
      key: 'micSpace',
      defaultValue: 0,
      min: 0,
      max: 8
    },
    {
      key: 'micColor',
      defaultValue: .5,
      min: 0,
      max: 8
    }
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [

  ]
}
