import { createContext, useState, ReactNode, FC, useContext } from "react";

export type Power = {
  name: string;
  description: string;
};

export type Weakness = {
  name: string;
  description: string;
};

export type Special = {
  name: string;
  description: string;
};

export type Unique = {
  label: string;
  values: string;
};

export interface ChildrenData {
  name?: string;
  class?: string;
  room?: string;
  objects?: string;
  unique: Unique;
  powers: Power[];
  weaknesses: Weakness[];
  special: Special[];
  bonds?: string;
}

export interface Part {
  name: string;
  type: string;
  memoryCost: number;
  location?: string;
  skill?: { name: string; description: string };
}

export interface Technique {
  name: string;
  type: string;
  battery: number;
  description: string;
}

export interface RobotData {
  name: string;
  description: string;
  class: string;
  type: string;
  personality: string;
  rank: string;
  hexagonValues: {
    durabilidade: number;
    dano: number;
    mira: number;
    velocidade: number;
    carapaca: number;
    bateria: number;
  };
  techs: Technique[]; 
  parts: Part[]; 
}


interface AppContextType {
  childrenData: ChildrenData;
  setChildrenData: React.Dispatch<React.SetStateAction<ChildrenData>>;
  robotData: RobotData;
  setRobotData: React.Dispatch<React.SetStateAction<RobotData>>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [childrenData, setChildrenData] = useState<ChildrenData>({
    name: "",
    class: "",
    room: "",
    objects: "",
    unique: { label: "Traço único", values: "" },
    powers: [] as Power[],
    weaknesses: [] as Weakness[],
    special: [] as Special[],
    bonds: ""
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
      dano: 0,
      mira: 0,
      velocidade: 0,
      carapaca: 0,
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
