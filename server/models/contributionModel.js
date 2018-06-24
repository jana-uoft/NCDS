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
    type: Number,
    default: -1
  },
});


export default mongoose.model('contribution', contributionSchema);