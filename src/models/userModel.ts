import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt"


interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    isCorrectPassword(password: string): Promise<boolean>; // Define the method type here
  }

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password is required"],
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined as any;
})

userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model("User", userSchema);

export default UserModel
