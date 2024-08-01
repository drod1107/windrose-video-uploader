import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  orgName: String,
  project_id: String,
  hashed_ids: [String],
  clerkUserId: String // To link Clerk user with MongoDB user
}, { timestamps: true });

let User;
try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', UserSchema);
}

export default User;