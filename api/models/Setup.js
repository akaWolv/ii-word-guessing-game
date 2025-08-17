import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
  name: String,
  value: String,
  type: String,
  order: Number,
}, {collection: 'Setup'});

export default mongoose.models.Setup || mongoose.model('Setup', WordsSchema);