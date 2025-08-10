import React from "react";
import { ReactFlow } from "@xyflow/react";
import type { ReactFlowProps } from "@xyflow/react";
import { SmartEdgeDebugProvider } from "../internal/SmartEdgeDebug";

const style = {
  background: "#fafafa",
  width: "100%",
  height: "500px",
};

export interface GraphWrapperProps extends ReactFlowProps {
  smartEdgeDebug?: boolean;
}

export const GraphWrapper = (args: GraphWrapperProps) => (
  <SmartEdgeDebugProvider value={args.smartEdgeDebug}>
    <div style={style}>
      <ReactFlow {...args} />
    </div>
  </SmartEdgeDebugProvider>
);
