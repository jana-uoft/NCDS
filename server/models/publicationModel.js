import mongoose, { Schema } from 'mongoose';


const publicationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  images: [
    {type: String}
  ],
  coverImage: {
    type: String,
    default: "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
  }
});


export default mongoose.model('publication', publicationSchema);