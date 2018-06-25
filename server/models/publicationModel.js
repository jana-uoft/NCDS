import mongoose, { Schema } from 'mongoose';


const publicationSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  images: [
    {type: String}
  ],

  coverImage: {
    type: Number,
    default: -1
  },
});


export default mongoose.model('publication', publicationSchema);