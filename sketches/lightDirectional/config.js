/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'lightDirectional',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'targetX', // needs to be unique
      defaultValue: .5,
      defaultMin: -1,
      defaultMax: 1
    },
    {
      key: 'targetY',
      defaultValue: .5,
      defaultMin: -1,
      defaultMax: 1
    },
    {
      key: 'targetZ',
      defaultValue: .5,
      defaultMin: -1,
      defaultMax: 1
    },

    {
      key: 'hue', // needs to be unique
      defaultValue: 0,
      defaultMin: 0,
      defaultMax: 1
    },
    {
      key: 'saturation',
      defaultValue: .5,
      defaultMin: 0,
      defaultMax: 1
    },
    {
      key: 'brightness', // needs to be unique
      defaultValue: 1,
      defaultMin: 0,
      defaultMax: 1
    },

    {
      key: 'intensity', // needs to be unique
      defaultValue: .5, // must be between 0 and 1
      defaultMin: 0,
      defaultMax: 2
    }

  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    
  ]
}
