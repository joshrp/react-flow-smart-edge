import React from "react";
import {
  edgesBezier,
  edgesStraight,
  edgesStep,
  edgesLabel,
  nodes,
  edgeTypes,
  simpleNodes,
  simpleEdgesBezier,
} from "./DummyData";
import { GraphWrapper } from "./GraphWrapper";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ReactFlowProps } from "@xyflow/react";

export default {
  title: "Smart Edge",
  component: GraphWrapper,
} as Meta;

const Template: StoryFn<ReactFlowProps> = (args) => <GraphWrapper {...args} />;

export const SmartBezier = Template.bind({});
SmartBezier.args = {
  edgeTypes,
  defaultNodes: nodes,
  defaultEdges: edgesBezier,
};

export const SmartStraight = Template.bind({});
SmartStraight.args = {
  ...SmartBezier.args,
  defaultEdges: edgesStraight,
};

export const SmartStep = Template.bind({});
SmartStep.args = {
  ...SmartBezier.args,
  defaultEdges: edgesStep,
};

export const SmartBezierWithCustomLabel = Template.bind({});
SmartBezierWithCustomLabel.args = {
  ...SmartBezier.args,
  defaultEdges: edgesLabel,
};

export const SmartBezierSimple = Template.bind({});
SmartBezierSimple.args = {
  edgeTypes,
  defaultNodes: simpleNodes,
  defaultEdges: simpleEdgesBezier,
};
