import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeResizer,
  NodeToolbar,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";
import AddLeadSource from "../nodes/AddLeadSource";
import { initialEdges, initialNodes } from "../../constants";

import "@xyflow/react/dist/style.css";
import { SequenceStartPoint } from "../nodes/SequenceStartPoint";
import AddBlock from "../nodes/AddBlock";
import { ColdEmailNode, DelayNode, LeadSourceNode } from "../nodes/InputNode";
import CustomEdge from "../edges/CustomEdge";
import { useNodeStore } from "../../store/useNodeStore";

const nodeTypes = {
  addLeadSource: AddLeadSource,
  sequenceStartPoint: SequenceStartPoint,
  addBlock: AddBlock,
  leadSourceNode: LeadSourceNode,
  coldEmailNode: ColdEmailNode,
  delayNode: DelayNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
export const WorkFLow = () => {
  const { scheduleMail, loading } = useNodeStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `e${edges.length + 1}`,
        type: "default",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));

      //   console.log("Edges State After Connect:", { edges });
    },
    [setEdges, edges]
  );

  const handleSave = () => {
    // getAllNodes(nodes);
    // getAllEdges(edges);
    if (nodes.length <= 3) return alert("Please add tasks to be scheduled");
    const nodesToBeSent = nodes.slice(3);
    // console.log(nodesToBeSent);
    scheduleMail(nodesToBeSent);
  };

  return (
    <div className="h-full w-[calc(100vw-5%)] px-4 ">
      <button
        className="bg-blue-800 h-10 w-20 text-white font-bold m-4 hover:bg-blue-500"
        onClick={handleSave}
        disabled={loading}
      >
        Save
      </button>
      {/* {console.log(nodes)} */}
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
        <Panel />
        <NodeToolbar />
        <NodeResizer />
      </ReactFlow>
    </div>
  );
};
