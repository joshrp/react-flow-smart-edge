import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

const SmartEdgeDebugContext = createContext<boolean>(false);

interface SmartEdgeDebugProviderProps {
  value?: boolean;
}

export const SmartEdgeDebugProvider = ({
  value = true,
  children,
}: PropsWithChildren<SmartEdgeDebugProviderProps>) => {
  return (
    <SmartEdgeDebugContext.Provider value={value}>
      {children}
    </SmartEdgeDebugContext.Provider>
  );
};

export const useSmartEdgeDebug = (): boolean => {
  return useContext(SmartEdgeDebugContext);
};
