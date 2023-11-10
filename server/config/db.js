const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async()=> {
  try {
    // const conn = await mongoose.connect(process.env.MONGODB_URI);
    const conn = await mongoose.connect(${{ secrets.MONGODB_URI }});
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;