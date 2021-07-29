module.exports = {
  basePath: '/shubnigurath-static',
  assetsPrefix: '/shubnigurath-static',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.txt$/,
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

    // config.module.rules.push({
    //  test: /\.(png|jpe?g|gif)$/i,
    //  use: 'url-loader'
    // },)

    return config
  }
}
