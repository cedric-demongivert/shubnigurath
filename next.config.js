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

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: '@svgr/webpack'
    })

    return config
  }
}
