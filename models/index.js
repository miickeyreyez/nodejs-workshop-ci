import mongoose from 'mongoose';

const { Schema } = mongoose;

const PokemonSchema = Schema({
  url_image: String,
  type: Array,
  id: Number,
  name: [{
    japanese: String,
    chinese: String,
    english: String,
  }],
});

export default mongoose.model('Pokemon', PokemonSchema, 'pokemon');
