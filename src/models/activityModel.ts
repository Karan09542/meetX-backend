import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "name is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        location: {
            type: String,
            required: [true, "user id is required"],
        },
        date: {
            type: Date,
            required: [true, "date is required"],
        },
        time: {
            type: String,
            required: [true, "time is required"],
        },
        category: {
            type: String,
            required: [true, "category is required"],
            enum: ["cricket","movies", "football"]
        },
    },
    { timestamps: true }
);

const ActivityModel = mongoose.model("Activity", activitySchema);

export default ActivityModel;