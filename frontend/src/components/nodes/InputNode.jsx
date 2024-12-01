import { Handle, useReactFlow } from "@xyflow/react";
import { HourglassIcon, MailIcon, UserPlus, Edit, Trash } from "lucide-react";

/* eslint-disable react/prop-types */
export const LeadSourceNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();
  const handleClick = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  const handleEdit = () => {
    // console.log(data);
  };
  return (
    <>
      <Handle type="target" position="top" />
      <div className="relative border border-gray-800 w-52 h-16 flex items-center justify-center gap-4">
        <div className="flex">
          <UserPlus color="red" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">Leads from</p>
          <p className="text-sm text-red-600">{data.title}</p>
        </div>
        {/* Floating Buttons */}
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            onClick={handleEdit}
          >
            <Edit size={16} />
          </button>
          <button
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            onClick={handleClick}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <Handle type="source" position="bottom" />
    </>
  );
};

export const ColdEmailNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();
  const handleClick = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  const handleEdit = () => {
    // console.log(data);
  };
  return (
    <>
      <Handle type="target" position="top" />
      <div className="relative border border-gray-800 w-52 h-24 flex items-center justify-center gap-4">
        <div className="flex">
          <MailIcon color="purple" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">Email template: </p>
          <p className="text-sm text-purple-600">{data.email}</p>
          {data.sendAs && (
            <div className="flex flex-col">
              <p className="text-sm font-bold">Send as: </p>
              <p className="text-sm text-purple-600">{data.sendAs}</p>
            </div>
          )}
        </div>
        {/* Floating Buttons */}
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            onClick={handleEdit}
          >
            <Edit size={16} />
          </button>
          <button
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            onClick={handleClick}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <Handle type="source" position="bottom" />
    </>
  );
};

export const DelayNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();
  const handleClick = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  const handleEdit = () => {
    // console.log(data);
  };
  return (
    <>
      <Handle type="target" position="top" />
      <div className="relative border border-gray-800 w-52 h-16 flex items-center justify-center gap-4">
        <div className="flex">
          <HourglassIcon color="purple" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">Delay: </p>
          <p className="text-sm text-purple-600">
            <span className="text-black">Wait:</span> {data.delay}{" "}
            {data.waitType}
          </p>
        </div>
        {/* Floating Buttons */}
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            onClick={handleEdit}
          >
            <Edit size={16} />
          </button>
          <button
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            onClick={handleClick}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <Handle type="source" position="bottom" />
    </>
  );
};
