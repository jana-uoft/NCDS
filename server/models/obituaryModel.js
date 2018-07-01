import mongoose, { Schema } from 'mongoose';


const obituarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  deathDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  viewingDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  startTime: {
    type: Number
  },
  endTime: {
    type: Number
  },
  coverImage: {
    type: String,
    default: "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
  },
  contactName: {
    type: String
  },
  contactNumber: {
    type: String
  },
  location: {
    type: String
  },
  address: {
    type: String
  }
});


export default mongoose.model('obituary', obituarySchema);