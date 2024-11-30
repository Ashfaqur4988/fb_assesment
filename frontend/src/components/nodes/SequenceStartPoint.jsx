/* eslint-disable react/prop-types */
import { Handle } from "@xyflow/react";

export const SequenceStartPoint = ({ data }) => {
  return (
    <div className="border border-gray-800 w-64 h-16 flex flex-col items-center justify-center gap-4 ">
      <Handle type="target" position="top" />
      {data.title}
      <Handle type="source" position="bottom" />
    </div>
  );
};
