import { createContext, useState, ReactNode, FC, useContext } from "react";

interface ChildrenData {
  name: string;
  class: string;
  room: string;
  objects: string;
  unique: {
    label: string;
    values: string;
  };
  powers: Array<{ name: string; description: string }>;
  weaknesses: Array<{ name: string; description: string }>;
  special: Array<{ name: string; description: string }>;
  bonds: Array<{ description: string }>;
}

interface RobotData {
  name: string;
  description: string;
  class: string;
  type: string;
  personality: string;
  rank: string;
  hexagonValues: {
    durabilidade: number;
    mira: number;
    velocidade: number;
    carapaca: number;
    dano: number;
    bateria: number;
  };
  techs: any[];
  parts: any[];
}

interface AppContextType {
  childrenData: ChildrenData;
  setChildrenData: (data: ChildrenData) => void;
  robotData: RobotData;
  setRobotData: (data: RobotData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [childrenData, setChildrenData] = useState<ChildrenData>({
    name: "",
    class: "",
    room: "",
    objects: "",
    unique: { label: "Traço único", values: "" },
    powers: [],
    weaknesses: [],
    special: [],
    bonds: [],
  });

  const [robotData, setRobotData] = useState<RobotData>({
    name: "",
    description: "",
    class: "",
    type: "",
    personality: "",
    rank: "",
    hexagonValues: {
      durabilidade: 0,
      mira: 0,
      velocidade: 0,
      carapaca: 0,
      dano: 0,
      bateria: 0,
    },
    techs: [],
    parts: [],
  });

  return (
    <AppContext.Provider value={{ childrenData, setChildrenData, robotData, setRobotData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
