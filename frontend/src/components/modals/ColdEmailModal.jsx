import { Plus } from "lucide-react";
import { useAddBlockStore } from "../../store/useAddBlockStore";
import { useReactFlow } from "@xyflow/react";
import { useState, useEffect } from "react";

const ColdEmailModal = () => {
  const { setNodes, getNodes, setEdges } = useReactFlow();
  const nodes = getNodes();
  const {
    closeColdEmailModal,
    closeAddBlockModal,
    getEmailTemplates,
    emailTemplates,
  } = useAddBlockStore();

  useEffect(() => {
    getEmailTemplates(); // Fetch email templates on component mount
  }, [getEmailTemplates]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasColdEmailNode, setHasColdEmailNode] = useState(false);
  const [sendEmailAs, setSendEmailAs] = useState(null);

  // Check if there is any node of type 'coldEmailNode'
  useEffect(() => {
    const coldEmailExists = nodes.some((node) => node.type === "coldEmailNode");
    setHasColdEmailNode(coldEmailExists);
  }, [nodes]);

  const handleCancel = () => {
    closeColdEmailModal();
  };

  const handleSend = () => {
    // console.log(selectedOption);
    // console.log(sendEmailAs);
    const lastNode = nodes[nodes.length - 1];
    // console.log(lastNode);

    if (
      lastNode &&
      lastNode.type !== "sequenceStartPoint" &&
      lastNode.type !== "delayNode" &&
      lastNode.type !== "leadSourceNode"
    ) {
      alert(
        "You can only add a new node if the previous node is of type 'sequenceStartPoint' or 'delayNode'"
      );
      return;
    }

    setNodes((prevNodes) => {
      const newNode = {
        id: `n${prevNodes.length + 1}`,
        data: { email: selectedOption, sendAs: sendEmailAs },
        type: "coldEmailNode",
        position: {
          x: nodes[prevNodes.length - 1]?.position.x || 0,
          y:
            lastNode.type === "leadSourceNode"
              ? 350
              : nodes[prevNodes.length - 1]?.position.y + 150 || 0,
        },
      };
      return [...prevNodes, newNode];
    });

    setEdges((prevEdges) => {
      const lastRelevantNode = [...nodes]
        .reverse()
        .find(
          (node) =>
            node.type === "sequenceStartPoint" || node.type === "delayNode"
        );

      const newEdge = {
        id: `e${prevEdges.length + 1}`,
        source: lastRelevantNode.id,
        target: `n${nodes.length + 1}`,
      };

      return [...prevEdges, newEdge];
    });

    closeColdEmailModal();
    closeAddBlockModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Cold Email</h2>
        <p className="text-gray-600 text-lg mb-8">Send an email to lead</p>
        <div className="flex items-center justify-between mb-6">
          <label
            htmlFor="email-template"
            className="text-gray-800 font-medium text-lg"
          >
            Email Template
          </label>
          <button className="flex items-center text-blue-500 hover:text-blue-600 font-medium text-lg">
            <Plus className="w-5 h-5 mr-2" />
            New Template
          </button>
        </div>
        <select
          id="email-template"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value="">Select an email template</option>
          {emailTemplates &&
            emailTemplates.map((emailTemplate) => (
              <option key={emailTemplate._id} value={emailTemplate.keyword}>
                {emailTemplate.keyword}
              </option>
            ))}
        </select>

        {/* Conditionally Render the New Div */}
        {hasColdEmailNode && (
          <div className="mt-6">
            <label
              htmlFor="email-action"
              className="block text-gray-800 font-medium text-lg mb-2"
            >
              Send Email As
            </label>
            <select
              id="email-action"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 text-lg"
              onChange={(e) => {
                setSendEmailAs(e.target.value);
              }}
            >
              <option value="newEmail">New Email</option>
              <option value="followUp">Re: Follow Up</option>
            </select>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg mr-4 text-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg"
            onClick={handleSend}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColdEmailModal;
