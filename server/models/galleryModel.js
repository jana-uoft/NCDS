import mongoose, { Schema } from 'mongoose';


const gallerySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  address: {
    type: String
  },
  images: [
    {type: String}
  ],
  coverImage: {
    type: Number,
    default: -1
  },
});


export default mongoose.model('gallery', gallerySchema);