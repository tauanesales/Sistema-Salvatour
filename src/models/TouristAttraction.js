import mongoose from 'mongoose';

const TouristAttractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
      },
})

const TouristAttraction = mongoose.model("TouristAttraction", TouristAttractionSchema);
export default TouristAttraction;
