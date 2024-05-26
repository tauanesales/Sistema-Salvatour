import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false   
    },
    city: {
        type: String,
        required: true   
    },
    state: {
        type: String,
        required: true   
    },
    isAdmin: {
        type: Boolean
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
