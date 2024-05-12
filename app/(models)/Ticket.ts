import mongoose, { Schema, ConnectOptions } from "mongoose";

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
}

mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
} as CustomConnectOptions);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
