import { Hourglass, Filter, Split } from "lucide-react";
import { useAddBlockStore } from "../../store/useAddBlockStore";

const ConditionModal = () => {
  const { openWaitModal } = useAddBlockStore();

  const handleOpenWaitModal = () => {
    openWaitModal();
  };

  return (
    <div className="bg-white   w-full">
      {/* Conditions Section */}
      <h2 className="text-lg font-bold my-4">Conditions</h2>
      <div className="flex gap-4 w-full items-center justify-start">
        {/* Wait Block */}
        <div
          className="flex gap-4 w-1/2 items-center p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
          onClick={handleOpenWaitModal}
        >
          <Hourglass size={32} color="blue" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-gray-800">Wait</h3>
            <p className="text-gray-600">Add a delay between blocks</p>
          </div>
        </div>

        {/* If/Else Block */}
        <div className="flex w-1/2 gap-4 items-center p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer">
          <Filter size={32} color="blue" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-gray-800">
              If/Else (Rule)
            </h3>
            <p className="text-gray-600">
              Routes leads through the sequence based on events
            </p>
          </div>
        </div>

        {/* A/B Split Block */}
        <div className="flex w-1/2 gap-4 items-center p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer">
          <Split size={32} color="blue" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-gray-800">A/B Split</h3>
            <p className="text-gray-600">
              Equally splits content into two blocks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionModal;
