import { Schema, model, Document, Types } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Extend Document to include Mongoose document features like _id
interface UserDocument extends User, Document {
  _id: Types.ObjectId; 
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required:true}
}, { timestamps: true });

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
