import { Clock, Mail } from "lucide-react";
import { useAddBlockStore } from "../../store/useAddBlockStore";
import ConditionModal from "./ConditionsModal";
import { useReactFlow } from "@xyflow/react";

export const AddBlockModal = () => {
  const { closeAddBlockModal, openColdEmailModal } = useAddBlockStore();
  const { getNodes } = useReactFlow();
  const nodes = getNodes();
  const handleClick = () => {
    closeAddBlockModal();
  };
  const handleEmail = () => {
    // console.log("email");
    openColdEmailModal();
  };
  return (
    <>
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
            onClick={handleClick}
          >
            ✕
          </button>

          {/* Modal Content */}
          <h2 className="text-lg font-semibold mb-2">Add Blocks</h2>
          <p className="text-gray-600">
            Click on a block to configure and add it to sequence
          </p>
          <div className="  ">
            <h2 className="text-lg font-semibold">Outreach</h2>
            <div className="flex gap-4 w-full h-20 justify-between">
              <div
                className="flex gap-4 w-1/2 h-full border bg-gray-100 items-center cursor-pointer"
                onClick={handleEmail}
              >
                <div className="bg-purple-300 mx-4 rounded-lg">
                  <Mail size={32} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">Cold Email</h2>
                  <p className="text-gray-600">Send an mail to an lead</p>
                </div>
              </div>
              <div className="flex gap-4 w-1/2 h-full border bg-gray-100 items-center cursor-pointer">
                <div className="bg-purple-300 mx-4 rounded-full">
                  <Clock size={32} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">Task</h2>
                  <p className="text-gray-600">Schedule a manual task</p>
                </div>
              </div>
            </div>
          </div>
          {nodes.length > 4 && <ConditionModal />}
        </div>
      </div>
    </>
  );
};
