// module.exports = {
//   plugins: {
//     autoprefixer: {
//       browsers: ['Android >= 4.0', 'iOS >= 8']
//     },
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
