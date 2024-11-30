import { CloudLightning, User, User2, UserPlus } from "lucide-react";
import { WorkFLow } from "../components/workflow/WorkFLow";
import { useAddLeadSource } from "../store/useAddLeadSource";
import LeadsModal from "../components/modals/LeadsModal";
import { useAddBlockStore } from "../store/useAddBlockStore";
import { AddBlockModal } from "../components/modals/AddBlockModal";
import ColdEmailModal from "../components/modals/ColdEmailModal";
import ConditionModal from "../components/modals/ConditionsModal";
import WaitModal from "../components/modals/WaitModal";

const WorkFlowPage = () => {
  const { closeModal, isOpen, showLeadsModal, openLeadsModal } =
    useAddLeadSource();

  const {
    isAddBlockModalOpen,
    isColdEmailModalOpen,
    isConditionModalOpen,
    isWaitModalOpen,
  } = useAddBlockStore();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleOpenLeadsModal = () => {
    openLeadsModal();
  };

  return (
    <div className="h-[90%] w-full flex items-start justify-center">
      <WorkFLow />
      {/* Modal */}
      {isOpen && (
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
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-lg font-semibold mb-2">Add a Source Block</h2>
            <p className="mb-4">
              Pick a block and configure any new lead that matches rules will be
              added to the sequence automatically.
            </p>
            <div>
              <h1 className="text-lg font-semibold mb-2">Sources</h1>
              <div className="flex  w-full gap-2">
                <div className="w-1/2 flex gap-2 flex-col">
                  <div className="flex w-full gap-2 items-center border border-gray-400 rounded-md p-2 cursor-pointer">
                    <span>
                      <UserPlus size={32} color="red" />
                    </span>
                    <div
                      className="flex flex-col"
                      onClick={handleOpenLeadsModal}
                    >
                      <p>Leads from list(s)</p>
                      <p className="text-xs">
                        Connect multiple lists as source for this sequence
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-2 items-center border border-gray-400 rounded-md p-2 cursor-pointer">
                    <span>
                      <User size={32} color="red" />
                    </span>
                    <div className="flex flex-col">
                      <p>Leads from list(s)</p>
                      <p className="text-xs">
                        Connect multiple lists as source for this sequence
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex gap-2 flex-col">
                  <div className="flex w-full gap-2 items-center border border-gray-400 rounded-md p-2 cursor-pointer">
                    <span>
                      <User2 size={32} color="red" />
                    </span>
                    <div className="flex flex-col">
                      <p>Segment by Events</p>
                      <p className="text-xs">
                        Connect multiple lists as source for this sequence
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-2 items-center border border-gray-400 rounded-md p-2 cursor-pointer">
                    <span>
                      <CloudLightning size={32} color="red" />
                    </span>
                    <div className="flex flex-col">
                      <p>Leads from list(s)</p>
                      <p className="text-xs">
                        Connect multiple lists as source for this sequence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads Modal */}
      {showLeadsModal && <LeadsModal />}

      {/* add block */}
      {isAddBlockModalOpen && <AddBlockModal />}

      {/* cold email modal */}
      {isColdEmailModalOpen && <ColdEmailModal />}

      {/* condition modal */}
      {isConditionModalOpen && <ConditionModal />}

      {/* wait modal */}
      {isWaitModalOpen && <WaitModal />}
    </div>
  );
};

export default WorkFlowPage;
