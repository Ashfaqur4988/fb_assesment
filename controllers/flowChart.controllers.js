import Flowchart from "../models/flowChart.models.js";

// Controller to get all flowcharts
export const getAllFlowcharts = async (req, res) => {
  try {
    const flowcharts = await Flowchart.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json(flowcharts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a flowchart by ID
export const getFlowchart = async (req, res) => {
  const { id } = req.params;
  try {
    const flowchart = await Flowchart.findById(id).populate("userId");
    if (!flowchart) {
      return res.status(404).json({ message: "Flowchart not found" });
    }
    res.status(200).json(flowchart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to add a new flowchart
export const addFlowchart = async (req, res) => {
  const { nodes, edges } = req.body;
  try {
    const newFlowchart = new Flowchart({
      userId: req.userId,
      nodes,
      edges,
    });
    await newFlowchart.save();
    res.status(201).json({
      message: "Flowchart created successfully",
      flowchart: newFlowchart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to edit an existing flowchart
export const editFlowchart = async (req, res) => {
  const { id } = req.params;
  const { nodes, edges } = req.body;
  try {
    const updatedFlowchart = await Flowchart.findByIdAndUpdate(
      id,
      { nodes, edges },
      { new: true } // Return the updated document
    );
    if (!updatedFlowchart) {
      return res.status(404).json({ message: "Flowchart not found" });
    }
    res.status(200).json({
      message: "Flowchart updated successfully",
      flowchart: updatedFlowchart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a flowchart
export const deleteFlowchart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFlowchart = await Flowchart.findByIdAndDelete(id);
    if (!deletedFlowchart) {
      return res.status(404).json({ message: "Flowchart not found" });
    }
    res.status(200).json({ message: "Flowchart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
