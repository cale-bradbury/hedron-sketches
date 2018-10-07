/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'particleFlow',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. , scale, colour
  params: [
    {
      key: 'minHue', // needs to be unique
      title: 'minHue', // should be human
      defaultValue: 0,
			min:0,
			max:1
    },
    {
      key: 'minSat', // needs to be unique
      title: 'min Sat', // should be human
      defaultValue: 1,
			min:0,
			max:1
    },
    {
      key: 'minBri',
      title: 'min Bri',
      defaultValue: .5,
			min:0,
			max:1
    },
    {
      key: 'maxHue', // needs to be unique
      title: 'maxHue', // should be human
      defaultValue: 1,
			min:0,
			max:1
    },
    {
      key: 'maxSat', // needs to be unique
      title: 'max Sat', // should be human
      defaultValue: 1,
			min:0,
			max:1
    },
    {
      key: 'maxBri',
      title: 'max Bri',
      defaultValue: .5,
			min:0,
			max:1
    },
    {
      key: 'count',
      defaultValue: .5,
			min:0,
			max:1024
    },
    {
      key: 'dampining',
      defaultValue: .5,
			min:0,
			max:1
    },
    {
      key: 'randomVelocityStrength',
      defaultValue: .5,
			min:0,
			max:1    }
  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'randomize', // needs to be unique
      title: 'Randomize' // should be human
    }
  ]
}
