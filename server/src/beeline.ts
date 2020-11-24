const beeline = require('honeycomb-beeline')

export default beeline({
  writeKey: process.env.HONEYCOMB_KEY || '68afd30230260e068cf58e0971a0db09',
  dataset: process.env.APP_NAME || 'wanderlust',
  serviceName: process.env.APPSERVER_TAG || 'local',
  enabledInstrumentations: ['express', 'mysql2', 'react-dom/server'],
  sampleRate: 10,
})
