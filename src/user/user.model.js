import { Schema, model } from "mongoose";

const UserSchema = Schema(
    {
        name: {type: String,required: [true, "Name is required"],maxLength: [25, "Cant be overcome 25 characters"]},
        username: {type: String,required: [true, "User Name is required"],maxLength: [25, "Cant be overcome 25 characters"]},
        email: {type: String,required: [true, "Email is required"],unique: true},
        password: {type: String,required: [true, "Password is required"],minLength: 8},
        role: {type: String,required: true,enum: ["ADMIN_ROLE", "USER_ROLE"],},
        estado: {type: Boolean,default: true,},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);