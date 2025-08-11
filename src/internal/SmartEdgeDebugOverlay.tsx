import React, { memo } from "react";
import { useSmartEdgeDebug } from "./SmartEdgeDebug";

export const SmartEdgeDebugOverlay = memo(() => {
  const { enabled, graphBox } = useSmartEdgeDebug();

  if (!enabled || !graphBox) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    left: graphBox.x,
    top: graphBox.y,
    width: graphBox.width,
    height: graphBox.height,
    pointerEvents: "none",
    border: "1px solid red",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    zIndex: 1,
  };

  return <div style={style} data-testid="smart-edge-debug-overlay" />;
});
