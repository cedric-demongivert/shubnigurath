module.exports = {
  basePath: '/shubnigurath-static',
  assetsPrefix: '/shubnigurath-static',
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
