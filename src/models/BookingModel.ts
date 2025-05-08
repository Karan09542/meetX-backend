import mongoose, { Document, Schema } from 'mongoose';

interface IBooking extends Document {
  activityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity', 
      required: [true, 'Activity ID is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: [true, 'User ID is required'],
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);

export default BookingModel;
