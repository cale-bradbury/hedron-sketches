module.exports = {
	defaultTitle: 'Particles',
	params: [
		{
			key: 'pR',
			title: 'red',
			defaultValue: 0.2
		},
		{
			key: 'pG',
			title: 'green',
			defaultValue: 0.0
		},
		{
			key: 'pB',
			title: 'blue',
			defaultValue: 0.6
		},
		{	
			key: 'velocity',
			title: 'Velocity',
			defaultValue: 0.01
		},
		{
			key: 'scale', 
			title: 'Scale',
			defaultValue: .2,
			min: 0.0001,
			max:5
		},
		{
			key: 'vSpeed',
			title: 'Vertical Speed',
			defaultValue: 0.5
		}
	],
	shots: [
    {
      method: 'randomize', // needs to be unique
      title: 'Randomize' // should be human
    },
    {
      method: 'randomizePosition', // needs to be unique
      title: 'Rand Pos' // should be human
    },
    {
      method: 'randomizeVelocity', // needs to be unique
      title: 'Rand Vel' // should be human
    }
  ]
}