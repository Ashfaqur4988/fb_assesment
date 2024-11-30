/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import { useAddLeadSource } from "../../store/useAddLeadSource";

export default function AddLeadSource({ data }) {
  const { openModal, isOpen } = useAddLeadSource();
  const handleClick = () => {
    // console.log("clicked");

    openModal();
    // console.log(isOpen);
  };

  return (
    <>
      <div
        className="border border-gray-800 w-64 h-32 flex flex-col items-center justify-center gap-4"
        onClick={handleClick}
      >
        <Plus />
        <p>{data.title}</p>
        <p>{data.subTitle}</p>
      </div>
    </>
  );
}
