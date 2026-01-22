import mongoose, {Document, Model, Schema} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    username?: string;
    password: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen: Date;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            select: false
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        username: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            default: null,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

userSchema.index({ name: 1, username: 1 });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
