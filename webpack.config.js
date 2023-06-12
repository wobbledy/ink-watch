const Dotenv = require('dotenv-webpack');

module.exports = {
  // Your existing webpack configuration...
  plugins: [
    // Other plugins...
    new Dotenv()
  ]
};