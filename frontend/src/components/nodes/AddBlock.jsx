import { Plus } from "lucide-react";
import { useAddBlockStore } from "../../store/useAddBlockStore";

export default function AddBlock() {
  const { openAddBlockModal } = useAddBlockStore();
  const handleClick = () => {
    // console.log(nodes);
    openAddBlockModal();
  };
  return (
    <>
      <div
        className="border border-blue-600 w-40 h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-200 cursor-pointer"
        onClick={handleClick}
      >
        <Plus color="blue" />
        <p className="text-sm font-bold">Add Block</p>
      </div>
    </>
  );
}
