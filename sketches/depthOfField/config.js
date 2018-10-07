/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'bokeh',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'focus',
      defaultValue: .5,
      min: 0,
      max: 1000
    },
    {
      key: 'aperture',
      defaultValue: .5,
      min: 0,
      max: 10
    },
    {
      key: 'maxBlur',
      defaultValue: .5,
      min: 0,
      max: .1
    }


  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    
  ]
}
