"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Web5 } from "@web5/api";

import protocolDefinition from "@/public/assets/protocol/campaign.protocol.json"

interface Web5ContextProps {
  web5: any;
  myDID: string | null;
}

const Web5Context = createContext<Web5ContextProps>({
  web5: null,
  myDID: null,
});

export const useWeb5 = () => {
  return useContext(Web5Context);
};

export const Web5Provider = ({ children }: { children: ReactNode }) => {
  const [web5, setWeb5] = useState<any>(null);
  const [myDID, setMyDID] = useState<string | null>(null);

  useEffect(() => {
    const connectWeb5 = async () => {
      try {
        const { web5: connectedWeb5, did: connectedDID } = await Web5.connect({
          sync: "5s",
        });

        // console.log("Plugin loaded");
        // console.log("Here's your DID", connectedDID);

        setWeb5(connectedWeb5);
        setMyDID(connectedDID);
      } catch (error) {
        console.error("Error connecting to Web5:", error);
      }
    };

    connectWeb5();
  }, []);

  return (
    <Web5Context.Provider value={{ web5, myDID }}>
      {children}
    </Web5Context.Provider>
  );
};
