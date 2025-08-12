
import { useEffect } from "react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { HiMiniXMark } from "react-icons/hi2";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, connector } = useAccount();

  const wallets = [
    // {
    //   id: 1,
    //   name: "Trust Wallet",
    //   description: "DApp in App",
    //   image: "/assets/AuthImages/trust.png",
    //   type: "trustwallet",
    // },
    {
      id: 2,
      name: "TokenPocket",
      description: "DApp in App",
      image: "/assets/AuthImages/pocket.png",
      type: "injected",
    },
    {
      id: 3,
      name: "MetaMask",
      description: "Desktop/DApp in App",
      image: "/assets/AuthImages/Mask.png",
      type: "metamask",
    },
    {
      id: 4,
      name: "walletconnect",
      description: "Any Wallet and browser",
      image: "/assets/AuthImages/trust.png",
      type: "walletconnect",
    },
  ];

  useEffect(() => {
    if (isConnected) {
      console.log("Connected Account:", address);
      console.log("Connected via:", connector?.id);
      console.log("Connected via:", connector?.name);
    } else {
      console.log("No wallet connected.");
    }
  }, [isConnected, address]);

  // const handleConnect = (walletType) => {
  //   let connector = null;

  //   if (walletType === "metamask") {
  //     connector = connectors.find((c) => c.id === "metaMask" || c.name === "MetaMask");
  //   } else if (walletType === "walletconnect") {
  //     connector = connectors.find((c) => c.id === "walletConnect");
  //   }
  //   else {
  //     connector = connectors.find((c) => c.id === "injected");
  //   }
  //   if (connector) {
  //     connect({ connector });
  //     setShowSidebar(false);
  //   } else {
  //     alert("Wallet not supported!");
  //   }
  // };


  const handleConnect = (walletType) => {
    let connector = null;

    // Checking for specific wallet types and matching the appropriate connectors
    if (walletType === "metamask") {
      connector = connectors.find((c) => c.id === "metaMask" || c.name === "MetaMask");
    } else if (walletType === "walletconnect") {
      connector = connectors.find((c) => c.id === "walletConnect");
    } else {
      // For Trust Wallet and TokenPocket, use the "injected" connector type
      connector = connectors.find((c) => c.id === "injected" || c.name === "Injected");
    }

    if (connector) {
      connect({ connector });
      setShowSidebar(false);
    } else {
      alert("Wallet not supported!");
    }
  };



  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-gray-900 bg-opacity-50 transition-opacity duration-500 ${showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        // onClick={() => setShowSidebar(false)}
      />

      <div
        className={`fixed top-0 h-screen bg-black py-6 px-4 transition-all duration-500 ease-in-out ${showSidebar ? "right-0" : "-right-full"
          } w-full`}
      >
        <div className="flex justify-end ">
          <div className="inline-block bg-Background p-2 rounded-full shadow-2xl">
            <HiMiniXMark
              className="text-white text-3xl cursor-pointer"
              onClick={() => setShowSidebar(false)}
            />
          </div>
        </div>
        <h2 className="font-bold text-[20px] mt-10 md:m-0 md:mx-6 mb-6 mx-6">
          Connect Wallet
            {/* <ConnectButton
                          showBalance={false}
                          accountStatus="address"
                          chainStatus="none"
                          label="Connect"
                        /> */}
        </h2>

        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            onClick={() => handleConnect(wallet.type)}
            className="cursor-pointer mt-4 bg-zinc-700 mx-6 text-textColor2 rounded-xl flex items-center gap-6 py-4 px-4 hover:bg-zinc-800 transition-colors duration-300"
          >
            <div className="h-10 w-10 bg-textColor3 rounded-full flex justify-center items-center">
              <img
                src={wallet.image}
                alt={wallet.name}
                className="h-[28px] w-[28px]"
              />
            </div>
            <div>
              <h1 className="text-sm font-sm text-textColor3">{wallet.name}</h1>
              <p className="text-xs text-gray-400">{wallet.description}</p>
            </div>
          </div>
        ))}

        <p className="text-textColor2 text-center mt-6 text-sm">
          Got Questions?{" "}
          <span className="text-textColor3 font-sm ml-1">Contact Support</span>
        </p>

      </div>
    </>
  );
};

export default Sidebar;
