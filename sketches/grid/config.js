/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'grid',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'posX',
      defaultValue: 0,
      min: -500,
      max: 500
    },
    {
      key: 'posY',
      defaultValue: 0,
      min: -500,
      max: 500
    },
    {
      key: 'posZ',
      defaultValue: 0,
      min: -500,
      max: 500
    },
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
      key: 'scaleX',
      title: 'Scale',
      defaultValue: 0.5,
			min: .00001,
			max:	5000
    },
    {
      key: 'scaleY',
      title: 'Scale',
      defaultValue: 0.5,
			min: .00001,
			max:	5000
    },
    {
      key: 'freqX',
      defaultValue: 0.5,
			min: 1,
			max:128
    },
    {
      key: 'freqY',
      defaultValue: 0.5,
			min: 1,
			max:128
    },
    {
      key: 'phaseX',
      defaultValue: 0,
			min: -1,
			max:1
    },
    {
      key: 'phaseY',
      defaultValue: 0,
			min: -1,
			max:1
    },
    {
      key: 'gridVisible',
      defaultValue: 0,
			min: 0,
			max:1
    },
    {
      key: 'gridFadeStart',
      defaultValue: 0,
			min: 0,
			max:.9999
    },
    {
      key: 'gridFadeEnd',
      defaultValue: 0,
			min: 0.0001,
			max:1
    },
    {
      key: 'edgeFade',
      defaultValue: 0,
			min: 0,
			max:1
    },
    {
      key: 'colorMath',
      defaultValue: 0,
			min: 0,
			max:1
    },
    {
      key: 'hue',
      defaultValue: 0,
			min: 0,
			max:1
    },
    {
      key: 'saturation',
      defaultValue: 0,
			min: 0,
			max:1
    },
    {
      key: 'brightness',
      defaultValue: 0,
			min: 0,
			max:1
    },
    
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
  ]
}
