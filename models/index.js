const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/forgotten-friends'

const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(connectionString, configOptions)
  .then(() => {
      console.log('mongodb connected successfully')
  })
  .catch((err) => {
      console.log(`mongodb connection error ${err}`)
  })

module.exports = {Animal: require('./Animal')}