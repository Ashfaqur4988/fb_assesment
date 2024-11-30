import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    required: true,
  },
  data: { type: Object, required: true },
  position: { x: Number, y: Number },
});

const EdgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
});

const flowChartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nodes: [NodeSchema],
    edges: [EdgeSchema],
  },
  { timestamps: true }
);

const Flowchart = mongoose.model("Flowchart", flowChartSchema);

export default Flowchart;
