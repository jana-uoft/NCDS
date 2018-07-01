import mongoose, { Schema } from 'mongoose';


const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
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
  },
  location: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  }
});


export default mongoose.model('event', eventSchema);