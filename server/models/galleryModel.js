import mongoose, { Schema } from 'mongoose';


const gallerySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
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