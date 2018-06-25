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
    type: Number,
    required: true,
    default: 0
  },
  endTime: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String
  },
  address: {
    type: String
  },
  coverImage: {
    type: String
  },
  contactName: {
    type: String
  },
  contactNumber: {
    type: String
  }
});


export default mongoose.model('event', eventSchema);