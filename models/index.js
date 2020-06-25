const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb+srv://yousef:BVI8rBstmZkaH9s6@cluster0-lazji.mongodb.net/forgotten-friends?retryWrites=true&w=majority'

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

module.exports = {
    Animal: require('./Animal'),
    Admin: require('./Admin'),
}