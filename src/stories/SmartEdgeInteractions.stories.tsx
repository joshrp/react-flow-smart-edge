import { within } from "@storybook/testing-library";
import React from "react";
import { GraphWrapper } from "./GraphWrapper";
import { SimulateDragAndDrop, wait } from "./SimulateDragAndDrop";
import { SmartBezier, SmartStraight, SmartStep } from "./SmartEdge.stories";
import type { Meta, StoryFn } from "@storybook/react-vite";
import type { ReactFlowProps } from "@xyflow/react";

export default {
  title: "Interactions",
  component: GraphWrapper,
  argTypes: {
    edgeTypes: { table: { disable: true } },
    defaultNodes: { table: { disable: true } },
    defaultEdges: { table: { disable: true } },
    smartEdgeDebug: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Enable SmartEdge debug logging",
      table: { category: "Debug" },
    },
  },
} as Meta;

const Template: StoryFn<ReactFlowProps & { smartEdgeDebug?: boolean }> = (
  args
) => <GraphWrapper {...args} />;

export const SmartBezierInteraction = Template.bind({});
SmartBezierInteraction.args = SmartBezier.args;
SmartBezierInteraction.play = async ({ canvasElement }) => {
  await wait(500);
  const canvas = within(canvasElement);
  const node4 = canvas.getByText("Node 4");
  SimulateDragAndDrop(node4, { delta: { x: -300, y: -250 } });
  const node1 = canvas.getByText("Node 1");
  SimulateDragAndDrop(node1, { delta: { x: -250, y: 300 } });
  const node6 = canvas.getByText("Node 6");
  SimulateDragAndDrop(node6, { delta: { x: 250, y: -50 } });
  const node3 = canvas.getByText("Node 3");
  SimulateDragAndDrop(node3, { delta: { x: 300, y: -100 } });
};

export const SmartStraightInteraction = Template.bind({});
SmartStraightInteraction.args = SmartStraight.args;
SmartStraightInteraction.play = SmartBezierInteraction.play;

export const SmartStepInteraction = Template.bind({});
SmartStepInteraction.args = SmartStep.args;
SmartStepInteraction.play = SmartBezierInteraction.play;
