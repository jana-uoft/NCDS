import mongoose, { Schema } from 'mongoose';


const generalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  values: {
    type: Object,
    default: {}
  }
}, { collection: 'general' });


export default mongoose.model('general', generalSchema);