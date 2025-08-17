import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
  text: String,
  description: String,
  category: String,
}, {collection: 'Words'});

export default mongoose.models.Word || mongoose.model('Word', WordsSchema);