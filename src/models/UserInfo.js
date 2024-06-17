import { Schema, models, model } from "mongoose";

const UserInfoSchema = new Schema({
    email: { type: String, required: true },
    streetAddress: { type: String },
    zipCode: { type: String },
    city: { type: String },
    state: { type: String },
    phone: { type: String },
    admin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);