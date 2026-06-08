import mongoose, { Model, Schema } from "mongoose";

export type BookingStatus = "pending" | "accepted" | "cancelled";

export interface IBooking {
  userId: string;
  userEmail: string;
  userName: string;

  advisorName: string;
  advisorRole: string;

  service: string;
  category: string;
  municipality: string;
  projectDescription?: string;

  status: BookingStatus;

  acceptedDate?: string;
  acceptedTime?: string;
  meetingType?: "Extern möteslänk" | "Daily" | "Whereby";
  meetingUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },

    advisorName: { type: String, required: true },
    advisorRole: { type: String, required: true },

    service: { type: String, required: true },
    category: { type: String, required: true },
    municipality: { type: String, required: true },
    projectDescription: { type: String },

    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
      default: "pending",
    },

    acceptedDate: { type: String },
    acceptedTime: { type: String },
    meetingType: { type: String },
    meetingUrl: { type: String },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;