import mongoose, { Schema } from 'mongoose';


const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  rss: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  }
});


export default mongoose.model('news', newsSchema);