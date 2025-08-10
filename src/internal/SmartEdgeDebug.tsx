import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

export type SmartEdgeGraphBox = {
  x: number;
  y: number;
  width: number;
  height: number;
} | null;

type SmartEdgeDebugContextValue = {
  enabled: boolean;
  graphBox: SmartEdgeGraphBox;
  setGraphBox: (next: SmartEdgeGraphBox) => void;
};

const SmartEdgeDebugContext = createContext<SmartEdgeDebugContextValue>({
  enabled: false,
  graphBox: null,
  setGraphBox: () => {},
});

interface SmartEdgeDebugProviderProps {
  value?: boolean;
}

export const SmartEdgeDebugProvider = ({
  value = true,
  children,
}: PropsWithChildren<SmartEdgeDebugProviderProps>) => {
  const [graphBox, setGraphBoxState] = useState<SmartEdgeGraphBox>(null);

  const setGraphBox = (next: SmartEdgeGraphBox) => {
    setGraphBoxState((prev) => {
      if (
        prev?.x === next?.x &&
        prev?.y === next?.y &&
        prev?.width === next?.width &&
        prev?.height === next?.height
      ) {
        return prev;
      }
      return next;
    });
  };

  const contextValue = useMemo<SmartEdgeDebugContextValue>(
    () => ({ enabled: value, graphBox, setGraphBox }),
    [value, graphBox]
  );

  return (
    <SmartEdgeDebugContext.Provider value={contextValue}>
      {children}
    </SmartEdgeDebugContext.Provider>
  );
};

export const useSmartEdgeDebug = (): SmartEdgeDebugContextValue => {
  return useContext(SmartEdgeDebugContext);
};
