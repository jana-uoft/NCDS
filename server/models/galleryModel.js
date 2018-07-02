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
    type: String,
    default: "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
  }
});


export default mongoose.model('gallery', gallerySchema);