const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://shivanshdubey232:T68dDC2dybIF2BYS@cluster0.ysmcetd.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectToMongo;