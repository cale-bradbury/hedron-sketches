/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'vaporStatues',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'rotX', // needs to be unique
      title: 'Rotation X', // should be human
      defaultValue: 0,
			defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'rotY',
      title: 'Rotation  Y',
      defaultValue: 0,
			defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'rotZ',
      title: 'Rotation  Z',
      defaultValue: 0,
			defaultMin:0,
			defaultMax:6.2831853
    },
    {
      key: 'posX',
      defaultValue: .5,
			defaultMin: -1000,
			defaultMax: 1000
    },
    {
      key: 'posY',
      defaultValue: .5,
			defaultMin: -1000,
			defaultMax: 1000
    },
    {
      key: 'posZ',
      defaultValue: .5,
			defaultMin: -1000,
			defaultMax: 1000
    },
    {
      key: 'scale',
      title: 'Scale',
      defaultValue: 0.5,
			defaultMin: .00001,
			defaultMax:	1000
    },
    {
      key: 'pScale',
      defaultValue: 0
    },
    {
      key: 'pAlpha',
      defaultValue: .3
    },
    {
      key: 'pPhase',
      defaultValue: .5
    },
    {
      key: 'pScrollX',
      defaultValue: .5
    },
    {
      key: 'pScrollY',
      defaultValue: .5
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
    },
    {
      key:'selected',
      hidden:true
    }
    
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'randomize', // needs to be unique
      title: 'Randomize' // should be human
    },
    {
      method: 'next', // needs to be unique
      title: 'next' // should be human
    },
    {
      method: 'prev', // needs to be unique
      title: 'prev' // should be human
    },
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
