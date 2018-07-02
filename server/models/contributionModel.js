import mongoose, { Schema } from 'mongoose';


const contributionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String
  },
  location: {
    type: String
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
  },
});


export default mongoose.model('contribution', contributionSchema);