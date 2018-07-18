/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'models',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'rotX', // needs to be unique
      title: 'Rotation X', // should be human
      defaultValue: 0,
			min:0,
			max:6.2831853
    },
    {
      key: 'rotY',
      title: 'Rotation  Y',
      defaultValue: 0,
			min:0,
			max:6.2831853
    },
    {
      key: 'rotZ',
      title: 'Rotation  Z',
      defaultValue: 0,
			min:0,
			max:6.2831853
    },
    {
      key: 'scale',
      title: 'Scale',
      defaultValue: 0.5,
			min: .00001,
			max:	1000
    },
    {
      key: 'repeat',
      defaultValue: 0,
			min: 1,
			max: 64
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
