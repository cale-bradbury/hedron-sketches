/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'vaporColumns',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'scale',
      title: 'Scale',
      defaultValue: 0.5,
			defaultMin: .00001,
			defaultMax:	1000
    },
    {
      key: 'spread',
      title: 'spread',
      defaultValue: 0.5,
			defaultMin: .00001,
			defaultMax:	1000
    },
    {
      key: 'count',
      defaultValue: 0,
			defaultMin: 1,
			defaultMax: 64
    },
    {
      key: 'phase',
      defaultValue: 0,
			defaultMin: 0,
			defaultMax: 1
    },
    {
      key: 'zPerStep',
      defaultValue: 0,
			defaultMin: 0,
			defaultMax: -1000
    },
    {
      key: 'rotPerStep',
      defaultValue: .5,
			defaultMin: -1.5707,
			defaultMax: 1.5707
    },
    {
      key: 'normal',
      defaultValue: 0,
			defaultMin: 0,
			defaultMax: 1,
      hidden: true
    },
    {
      key: 'wireframe',
      defaultValue: 0,
			defaultMin: 0,
			defaultMax: 1,
      hidden: true
    }
    
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'wireframe', // needs to be unique
      title: 'wireframe' // should be human
    },
    {
      method: 'basic', // needs to be unique
      title: 'basic' // should be human
    },
    {
      method: 'normal', // needs to be unique
      title: 'normal' // should be human
    }
  ]
}
