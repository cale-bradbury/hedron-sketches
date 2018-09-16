module.exports = {
  defaultTitle: 'video',
  params: [
    {
      title: 'Opacity',
      key: 'opacity',
      defaultValue: 1
    },
    {
      title: 'Loops',
      key: 'loops',
      defaultValue: 0.5
    },
    {
      title: 'Aspect',
      key: 'ratio',
      defaultValue: 1.77777778,
      min: 1.33333333,
      max: 1.77777778
    },
    {
      title: 'depth',
      key: 'depth',
      defaultValue: .5,
      min: 999,
      max: -5000
    },
    {
      title: 'y',
      key: 'y',
      defaultValue: 0,
      min: 0,
      max: 1000
    },
    {
      title: 'scale',
      key: 'scale',
      defaultValue: 1,
      min: 0.0001,
      max: 2
    }
  ],
  shots: [
    {
      method: 'play', // needs to be unique
      title: 'play' // should be human
    },
    {
      method: 'pause', // needs to be unique
      title: 'pause' // should be human
    },
    {
      method: 'reset', // needs to be unique
      title: 'reset & play' // should be human
    },
    {
      method: 'stutterSet', // needs to be unique
      title: 'set' // should be human
    },
    {
      method: 'stutter', // needs to be unique
      title: 'stutter' // should be human
    }
  ]
}
