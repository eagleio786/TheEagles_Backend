import { useWatchContractEvent } from "wagmi";
import { ContractAdress, ABI } from "./config";
export const useContractEventListener = () => {
  useWatchContractEvent({
    address: ContractAdress,
    abi: ABI,
    eventName: "FundsDistributed",
    onLogs(logs) {
      console.log("New logs!-----------------------------", logs);
    },
  });
};
