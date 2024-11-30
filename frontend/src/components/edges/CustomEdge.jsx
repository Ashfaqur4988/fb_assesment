import { BezierEdge, EdgeLabelRenderer } from "@xyflow/react";

export default function CustomEdge(props) {
  return (
    <div>
      <BezierEdge {...props} />
      <EdgeLabelRenderer></EdgeLabelRenderer>
    </div>
  );
}
