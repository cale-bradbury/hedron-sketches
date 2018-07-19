/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'audioRings',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    
    {
      key: 'scale',
      title: 'Scale',
      defaultValue: 0.5,
			min: .00001,
			max:	1000
    },
    {
      key: 'shapeCount',
      defaultValue: 0.5,
			min: 1,
			max: 10
    },
    {
      key: 'pointCount',
      defaultValue: 0.5,
			min: 1,
			max: 50
    },
    {
      key: 'smoothing',
      defaultValue: 0,
			min: 0.001,
			max: .1
    },
    {
      key: 'falloff',
      defaultValue: 0,
			min: 0.001,
			max: .1
    },
    
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'randomize', // needs to be unique
      title: 'Randomize' // should be human
    },
    {
      method: 'shift', // needs to be unique
      title: 'Shape Shift' // should be human
    }
  ]
}
