import mongoose from 'mongoose';

const WistiaVideoSchema = new mongoose.Schema({
  id: Number,
  org_name: String,
  name: String,
  type: String,
  archived: Boolean,
  created: Date,
  updated: Date,
  duration: Number,
  hashed_id: String,
  description: String,
  progress: Number,
  status: String,
  urls: {
    "embed": String,
    
  },
  thumbnail: {
    url: String,
    width: Number,
    height: Number
  },
  account_id: Number
}, { timestamps: true });

let WistiaVideo;
try {
  // Try to retrieve the existing model
  WistiaVideo = mongoose.model('WistiaVideo');
} catch (error) {
  // Model doesn't exist, so create it
  WistiaVideo = mongoose.model('WistiaVideo', WistiaVideoSchema);
}

export default WistiaVideo;