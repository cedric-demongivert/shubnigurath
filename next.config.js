module.exports = {
  assetsPrefix: '/',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.unidoc$/,
        use: 'raw-loader'
      }
    )

    return config
  }
}
