const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connection.openUri(process.env.MONGOURI)

let userSchema = new Schema({
  userId: String,
  username: String,
  password: String
})

module.exports = mongoose.model('User', userSchema);
