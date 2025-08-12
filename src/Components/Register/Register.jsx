

import { FaRegCheckCircle } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useSwitchChain, useDisconnect } from "wagmi";
import chainConfig from "../../Config/chainConfig";
import { HiMiniXMark } from "react-icons/hi2";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccountEffect } from "wagmi";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  USDTapprove,
  register,
  getTxn,
  getIdToAddress,
} from "../../Config/Contract-Methods";
import Sidebar from "./Sidebar"
import walletIcon from '../../assets/icons/connectWallet.png';
const Register = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [upline, setUpline] = useState("1");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get("route");
  let modifiedRoute = route ? route.substring(1) : "1";
  useEffect(() => {
    let modifiedRoute = route ? route.substring(1) : "1";
    setUpline(modifiedRoute);
  }, []);

  const routePattern = /\d/;
  React.useEffect(() => {
    if (routePattern.test(location.pathname)) {
      navigate(`/redirect?route=${encodeURIComponent(location.pathname)}`);
    }
  }, [location, navigate, routePattern]);

  const handleInputChange = (e) => {
    setUpline(e.target.value);
  };
  useAccountEffect({
    onConnect(data) {
      if (data.chainId != 56) {
        switchChain({ chainId: 56 });
      }
    },
    onDisconnect() { },
  });
  useEffect(() => {
    if (isConnected && chain?.id) {
      const targetChainId = chainConfig[11155111]?.id;
      if (chain.id !== targetChainId) {
        switchChain({ chainId: targetChainId });
      }
    }
  }, [chain, isConnected]);

  const handleConnectClick = () => {
    setShowSidebar(true);
  };

  const handleClick = async () => {
    getAddress();
  };
  const getAddress = async () => {
    try {
      setLoading(true);
      if (!upline) {
        console.error("❌ Upline ID is missing or invalid.");
        alert("Invalid upline ID. Please check and try again.");
        return;
      }

      const uplineaddress = await getIdToAddress(upline);
      if (!uplineaddress) {
        console.error("❌ Unable to fetch wallet address for given upline.");
        alert("Failed to get upline wallet address. Please try again.");
        return;
      }

      // Chain validation
      if (!chain || !chain.id) {
        console.error("❌ Chain information is missing.");
        alert("Switch to BSC Mainnet first.");
        return;
      }

      if (chain.id !== 56) {
        console.warn("⚠️ User is on the wrong network.");
        alert("Switch to BSC Mainnet first.");
        return;
      }

      // Approve USDT transaction
      try {
        setLoading(true);

        const approvetx = await USDTapprove("5000000000000000000");
        if (!approvetx) {
          console.error("❌ USDT Approval transaction failed to initiate.");
          alert("USDT Approval failed. Please try again.");
          return;
        }

        const receipt = await getTxn(approvetx);
        if (!receipt) {
          console.error("❌ USDT Approval transaction failed.");
          alert("USDT Approval transaction failed. Please check your wallet.");
          return;
        }

        setReceipt(receipt);
      } catch (err) {
        console.error("❌ Error during USDT approval:", err);
        alert("An error occurred during USDT approval. Please try again.");
        setLoading(false);
        return;
      }

      // Register User
      try {
        setLoading(true);
        const registerTx = await register(uplineaddress);
        if (!registerTx) {
          console.error("❌ Registration transaction failed to initiate.");
          alert("Registration failed. Please try again.");
          return;
        }

        const registerReceipt = await getTxn(registerTx);
        if (!registerReceipt) {
          console.error("❌ Registration transaction failed.");
          alert("Registration transaction failed. Please check your wallet.");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Error during registration:", err);
        alert("An error occurred during registration. Please try again.");
        setLoading(false);

        return;
      }

      navigate("/home");
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
    setLoading(false);
  };

  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      // setShowSidebar(false);
    }
  };

  useEffect(() => {
    const handlClickToAddress = () => {
      if (upline) {
        getIdToAddress(upline);
      } else {
        alert("please enter a valid address");
      }
    };
    handlClickToAddress();
  }, []);

    const { disconnect } = useDisconnect()
    useEffect(() => {
      disconnect()
    }, [])

  return (
    <>
      <div className="h-auto w-full relative overflow-hidden bg-gradient-to-tr from-[#0D0D2B] to-[#1A1A60] text-white flex justify-center gap-10 items-center md:p-6 px-2 py-6">
        <div className="md:max-w-5xl w-full flex flex-col md:flex-row justify-between gap-16 p-6 rounded-xl md:gap-x-44">

          <div className="flex-1 p-2 md:p-4 lg:p-2">
            <div className="flex justify-end">
              <div
                onClick={handleConnectClick}
                className="text-textColor3 font-bold inline-flex items-center text-xs px-2 py-2 rounded-sm bg-[#7289DA] w-[130px] overflow-x-scroll cursor-pointer"
              >
                Connect Wallet
                <img src={walletIcon} alt="Wallet Icon" className="ml-2 h-4 w-5" />  
              </div>
              {/* <div>
                  <ConnectButton
                showBalance={false}
                accountStatus="address"
                chainStatus="none"
                label="Connect"
              />
              </div> */}

            </div>
            <h1 className="text-2xl font-semibold mb-4">
              Registration <br /> in Theeagles USDT
            </h1>
            <label className="block text-gray-400 mb-2">Your upline</label>
            <input
              type="text"
              value={route ? modifiedRoute : upline}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 space-y-2">

              <div className={`flex items-center gap-2 ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}
                Wallet: connected
              </div>
              <div className={`flex items-center gap-2 ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}{" "}
                Network: Smart chain
              </div>
              <div className={`flex items-center gap-2 ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}{" "}
                Registration: available
              </div>
              <div className={`flex items-center gap-2 text-white ${receipt ? "text-green-400" : "text-red-400"}`}>
                {receipt ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}
                Balance: min 5 USDT and 0.001 BNB
              </div>
              <div className={`flex items-center gap-2 text-white ${receipt ? "text-green-400" : "text-red-400"}`}>
                {receipt ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}{" "}
                Aprove USDT
              </div>
            </div>

            <button
              className={`mt-4 px-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center ${!isConnected || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              disabled={!isConnected || loading}
              onClick={handleClick}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                "Registration"
              )}
            </button>
            <button className="flex items-center justify-center p-2 mt-2 text-gray-500 rounded-lg gap-1">
              Registration fee
              <span className="relative group">
                <BsFillQuestionCircleFill className="text-textColor3 text-sm cursor-pointer" />
                <div className="absolute left-6 -top-9 w-[185px] text-justify bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p>
                    Registration fee is charged once when enrolling on the
                    platform and is allocated to the maintenance and development
                    of theeagles ecosystem
                  </p>
                </div>
              </span>
            </button>
          </div>

          <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center gap-2 text-white">
              <MdInfo /> <h3 className="text-lg font-semibold">Information</h3>
            </div>
            <p className="text-gray-400 mt-2">
              <span className="text-white font-semibold">
                Insufficient balance for registration.
              </span>
              Registration requires <span className="text-white">5 USDT</span>{" "}
              and at least <span className="text-white">0.001 BNB</span>. Your
              wallet balance: <span className="text-red-400 font-medium">0.00 USDT</span>{" "}
              and <span className="text-red-400 font-medium">0.000 BNB</span>.
            </p>
            <button className="mt-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg">
              Read guide
            </button>
            <div className="mt-4">
              <video src="/Eagles.mp4" className="rounded-lg w-full" controls />
            </div>
            <div className="mt-4 flex items-center gap-2 text-gray-300">
              <AiOutlineMessage />
              <p>
                Need help with registration? <br /> Talk to experts in{" "}
                <span className="text-blue-400 cursor-pointer">support chat</span>.
              </p>
            </div>
          </div>
        </div>

        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </>
  );
};

export default Register;