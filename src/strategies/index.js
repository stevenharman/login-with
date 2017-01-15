const strategies = {
  github: require('./github'),
  reddit: require('./reddit'),
  twitter: require('./twitter'),
  test: require('./test')
}

const isConfigured = strategy => strategy.config

module.exports = (env, rootUrl) => Object.keys(strategies)
  .map(type => {
    const strategy = strategies[type]
    const callbackURL = `${rootUrl}/${type}/callback`
    strategy.config = strategy.getConfig(process.env, callbackURL)
    strategy.type = type
    return strategy
  })
  .filter(strategy => isConfigured(strategy))
