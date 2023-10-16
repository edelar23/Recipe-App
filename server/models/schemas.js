
import mongoose from 'mongoose';
const { Schema } = mongoose;

    const recipeSchema = new mongoose.Schema({
        name: String,
        ingredients: String,
        steps: String,
        entryDate: {type:Date, default: Date.now}
    });

    const Recipe_data = mongoose.model('Recipe_data', recipeSchema);
    // export modules
export default Recipe_data;

