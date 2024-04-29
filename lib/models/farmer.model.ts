const mongoose = require('mongoose');

// Define the schema
const farmSchema = new mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 farmCode: { type: String},
 familyName: { type: String},
 christianName: { type: String },
 phoneNumber: { type: Number}, // Optional field
 district: { type: String},
 subcounty: { type: String,},
 village: { type: String, },
 acresForCotton: { type: Number},
 yieldEstimation: { type: Number },
});

// Create the model
const Farmers = mongoose.model('Farmers', farmSchema);

// Export the model
export  default Farmers;
