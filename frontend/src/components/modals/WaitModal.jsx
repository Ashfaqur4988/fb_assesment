import { X } from "lucide-react";
import { useState } from "react";
import { useAddBlockStore } from "../../store/useAddBlockStore";
import { useReactFlow } from "@xyflow/react";

const WaitModal = () => {
  const { setNodes, getNodes, setEdges } = useReactFlow();
  const nodes = getNodes();

  const { closeWaitModal, closeAddBlockModal } = useAddBlockStore();

  const [delay, setDelay] = useState(0);
  const [waitType, setWaitType] = useState("days");

  const handleClose = () => {
    closeWaitModal();
  };

  const handleInsert = () => {
    // console.log(delay, waitType);
    // console.log(nodes);

    const lastNode = nodes[nodes.length - 1];
    // console.log(lastNode);

    if (!delay || delay <= 0 || !waitType) {
      alert("Please enter a delay and select a wait type.");
      return;
    }

    if (lastNode && lastNode.type !== "coldEmailNode") {
      alert(
        "You can only add a new node if the previous node is of type 'coldEmailNode'."
      );
      return;
    }

    setNodes((prevNodes) => {
      const newNode = {
        id: `n${prevNodes.length + 1}`,
        data: { delay: delay, waitType: waitType },
        type: "delayNode",
        position: {
          x: prevNodes[prevNodes.length - 1]?.position.x || 0, // Handle case where no nodes exist
          y: (prevNodes[prevNodes.length - 1]?.position.y || 0) + 150,
        },
      };
      return [...prevNodes, newNode];
    });

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `e${prevEdges.length + 1}`,
        source: `n${nodes.length}`,
        target: `n${nodes.length + 1}`,
      },
    ]);

    closeWaitModal();
    closeAddBlockModal();
    // console.log(nodes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4">Wait</h2>
        <p className="text-gray-600 mb-6">Add a delay between blocks</p>

        {/* Wait For Input */}
        <div className="mb-4">
          <label
            htmlFor="wait-for"
            className="block text-gray-800 font-medium mb-2"
          >
            Wait For
          </label>
          <input
            id="wait-for"
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            min="0"
          />
        </div>

        {/* Wait Type Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="wait-type"
            className="block text-gray-800 font-medium mb-2"
          >
            Wait Type
          </label>
          <select
            id="wait-type"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            value={waitType}
            onChange={(e) => setWaitType(e.target.value)}
          >
            <option value="days">Day(s)</option>
            <option value="hours">Hour(s)</option>
            <option value="minutes">Minute(s)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg"
            onClick={handleInsert}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitModal;
