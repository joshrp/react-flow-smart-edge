import { BezierEdge, BaseEdge } from "@xyflow/react";
import type { ComponentType } from "react";
import { getSmartEdge } from "../getSmartEdge";
import type { GetSmartEdgeOptions } from "../getSmartEdge";
import type { EdgeProps, Node, Edge } from "@xyflow/react";

export type SmartEdgeOptions = GetSmartEdgeOptions & {
  fallback?: ComponentType<EdgeProps<Edge>>;
};

export interface SmartEdgeProps<
  EdgeType extends Edge = Edge,
  NodeType extends Node = Node,
> extends EdgeProps<EdgeType> {
  nodes: NodeType[];
  options: SmartEdgeOptions;
}

export function SmartEdge<
  EdgeType extends Edge = Edge,
  NodeType extends Node = Node,
>({ nodes, options, ...edgeProps }: SmartEdgeProps<EdgeType, NodeType>) {
  const {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    style,
    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    labelBgBorderRadius,
    markerEnd,
    markerStart,
    interactionWidth,
  } = edgeProps;

  const smartResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    options,
    nodes,
  });

  const FallbackEdge = options.fallback || BezierEdge;

  if (smartResponse instanceof Error) {
    console.error(smartResponse);
    return <FallbackEdge {...edgeProps} />;
  }

  const { edgeCenterX, edgeCenterY, svgPathString } = smartResponse;

  return (
    <BaseEdge
      path={svgPathString}
      labelX={edgeCenterX}
      labelY={edgeCenterY}
      label={label}
      labelStyle={labelStyle}
      labelShowBg={labelShowBg}
      labelBgStyle={labelBgStyle}
      labelBgPadding={labelBgPadding}
      labelBgBorderRadius={labelBgBorderRadius}
      style={style}
      markerStart={markerStart}
      markerEnd={markerEnd}
      interactionWidth={interactionWidth}
    />
  );
}

export type SmartEdgeFunction = typeof SmartEdge;
