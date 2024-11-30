import { useReactFlow } from "@xyflow/react";
import { useAddLeadSource } from "../../store/useAddLeadSource";
import { useEffect } from "react";

export default function LeadsModal() {
  const { setNodes, getNodes, getEdges, setEdges } = useReactFlow();
  const edges = getEdges();
  const nodes = getNodes();
  const { closeLeadsModal, closeModal, getLeads, leads } = useAddLeadSource();

  useEffect(() => {
    getLeads(); // Fetch leads on component mount
  }, [getLeads]);

  const handleCloseLeadsModal = () => {
    closeLeadsModal();
  };

  const handleSelectedList = (e) => {
    const selectedLead = e.target.value;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `n${nodes.length + 1}`,
        data: { title: selectedLead },
        type: "leadSourceNode",
        position: { x: 420, y: 40 },
      },
    ]);

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `e${edges.length + 1}`,
        source: `n${nodes.length + 1}`,
        target: "n2",
      },
    ]);

    closeLeadsModal();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50">
      <div
        className="absolute bg-white p-6 rounded shadow-lg"
        style={{
          width: "70%",
          height: "70%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full"
          onClick={handleCloseLeadsModal}
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-2">Select Leads</h2>
        <div className="mb-4">
          <label htmlFor="lead-search" className="block text-sm font-medium">
            Search Leads
          </label>
          <select
            id="lead-search"
            className="border border-gray-400 rounded-md w-full px-3 py-2"
            onChange={handleSelectedList}
          >
            <option value="">Search or Select Leads</option>
            {/* Dynamically Render Options */}
            {leads &&
              leads.map((lead) => (
                <option key={lead._id} value={lead.keyword}>
                  {lead.keyword}
                </option>
              ))}
          </select>
        </div>

        {/* New List Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          // onClick={() => console.log("New List Button Clicked")}
        >
          New List
        </button>
      </div>
    </div>
  );
}
