/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'textBasic',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'posX', // needs to be unique
      defaultValue: .5,
      defaultMin: -3000,
      defaultMax: 3000
    },
    {
      key: 'posY',
      defaultValue: .5,
      defaultMin: -3000,
      defaultMax: 3000
    },
    {
      key: 'posZ',
      defaultValue: .5,
      defaultMin: -3000,
      defaultMax: 0
    },

    {
      key: 'rotX', // needs to be unique
      defaultValue: .5,
      defaultMin: -3.1415,
      defaultMax: 3.1415
    },
    {
      key: 'rotY',
      defaultValue: .5,
      defaultMin: -3.1415,
      defaultMax: 3.1415
    },
    {
      key: 'rotZ', // needs to be unique
      defaultValue: .5,
      defaultMin: -3.1415,
      defaultMax: 3.1415
    },
    {
      key: 'colorHue',
      defaultValue: 0.6
    },
    {
      key: 'colorSat',
      defaultValue: 0.5
    },
    {
      key: 'colorLight',
      defaultValue: 0.5
    },    
    {
      key: 'alpha',
      defaultValue: 1
    },
    {
      key: 'scale', // needs to be unique
      defaultValue: .5, // must be between 0 and 1
			defaultMin: 0.00001,
			defaultMax: 2000
    },
    {
      key: 'thickness',
      defaultValue: 0.4,
      defaultMin: .0001,
      defaultMax: 1
    },
    {
      key: 'bevelThickness',
			defaultValue: 0,
			defaultMin: 0,
			defaultMax: 3
    },
    {
      key: 'bevelSize',
			defaultValue: 0,
			defaultMin: 0,
			defaultMax: 3
    },
    {
      key: 'bevelSegments',
			defaultValue: 0,
			defaultMin: 1,
			defaultMax: 4
    },
    {
      key: 'text',
      defaultValue: 'text',
      type: 'string'
    },

  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    
  ]
}
