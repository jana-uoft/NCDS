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
    type: String
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


export default mongoose.model('event', eventSchema);