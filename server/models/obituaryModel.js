import mongoose, { Schema } from 'mongoose';

const options = {
  timestamps: true
}

const obituarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  birthDate: {
    type: Date,
    required: false,
    default: null
  },
  deathDate: {
    type: Date,
    required: false,
    default: null
  },
  expiryDate: {
    type: Date,
    required: true,
    default: Date.now
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
  }
}, options);


export default mongoose.model('obituary', obituarySchema);