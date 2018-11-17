/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'vertHack',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'normalAmp', // needs to be unique
      defaultValue: .5,
			defaultMin:-1,
			defaultMax:1
    },
    {
      key: 'xAmp', // needs to be unique
      defaultValue: .5,
			defaultMin:-1,
			defaultMax:1
    },
    {
      key: 'yAmp', // needs to be unique
      defaultValue: .5,
			defaultMin:-1,
			defaultMax:1
    },
    {
      key: 'zAmp', // needs to be unique
      defaultValue: .5,
			defaultMin:-1,
			defaultMax:1
    },
    {
      key: 'xFreq', // needs to be unique
      defaultValue: .5,
			defaultMin:-10,
			defaultMax:10
    },
    {
      key: 'yFreq', // needs to be unique
      defaultValue: .5,
			defaultMin:-10,
			defaultMax:10
    },
    {
      key: 'zFreq', // needs to be unique
      defaultValue: .5,
			defaultMin:-10,
			defaultMax:10
    },
    {
      key: 'xPhase', // needs to be unique
      defaultValue: .5,
			defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'yPhase', // needs to be unique
      defaultValue: .5,
      defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'zPhase', // needs to be unique
      defaultValue: .5,
      defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'lutY', // needs to be unique
      defaultValue: 0,
      defaultMin:0,
      defaultMax:1.
    },
    {
      key: 'lutRotation', // needs to be unique
      defaultValue: 0,
      defaultMin:-1.,
      defaultMax:1.
    },
    {
      key: 'lutScale', // needs to be unique
      defaultValue: 0,
      defaultMin:1.,
      defaultMax:16.
    },
    
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'search', // needs to be unique
      title: 'search' // should be human
    },
    
  ]
}
