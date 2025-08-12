import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCopy, IoPersonCircleSharp, IoSettingsSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { useConnect, useDisconnect, useAccount, useSwitchChain } from "wagmi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cards from "../Components/Home/Cards";
import Program from "../Components/Home/Program";
import Members from "../Components/Home/Members";
import Contract from "../Components/Home/Contract";
import History from "../Components/Home/History";
import chainConfig from "../Config/chainConfig";
import { ApiUrl } from "../Config/config";
import { users } from "../Config/Contract-Methods";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ showBar, setShowBar, user }) => {
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState([]);
  const [referralData, setReferralData] = useState(null);
  const [PT, setPT] = useState("");
  const [uplineID, setUplineID] = useState("");
  const [extUser, setextUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const userID = localStorage.getItem("id");
  // const CheckForUser = async (address) => {
  //   console.log("Funciton is working ",address);

  //   try {
  //     let boo = await isUserExists(address);
  //     setextUser(boo);
  //     if (boo === true) {
  //       navigate("/profile");
  //     } else {
  //       navigate("/register");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   CheckForUser(address);
  // }, []);
  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!address) return;

        const result = await users(address);
        if (result?.[1]) {
          const userId = result[1].toString();
          localStorage.setItem("id", userId);
          setUserData(result);

          const referralResponse = await axios.get(
            `${ApiUrl}/refferal/${userId}`
          );
          setReferralData(referralResponse?.data || null);
          setPT(referralResponse?.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) fetchUserData();
  }, [address, isConnected]);

  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (window.location.href.includes("/connect")) {
      disconnect();
      localStorage.clear();
    }
  }, []);

  // Second effect for fetching upline address after referralData updates
  useEffect(() => {
    const fetchUplineData = async () => {
      if (!referralData?.UplineAdress) return;

      try {
        const result2 = await users(referralData.UplineAdress);
        // console.log('Result from users:', result2);

        if (result2?.[1]) {
          const userId = result2[1]?.toString();
          // console.log('Upline userId:', userId);
          setUplineID(userId);
        }
      } catch (error) {
        console.error("Upline fetch error:", error);
      }
    };

    if (referralData) fetchUplineData();
  }, [referralData]);

  useEffect(() => {
    if (isConnected && chain?.id !== chainConfig[11155111]?.id) {
      switchChain({ chainId: chainConfig[11155111]?.id });
    }
  }, [chain, isConnected]);

  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      setShowBar(false);
    }
  };
  console.log("user", user);

  const wallets = [
    // {
    //   id: 1,
    //   name: "Trust Wallet",
    //   description: "DApp in App",
    //   image: "/assets/AuthImages/trust.png",
    // },
    {
      id: 2,
      name: "TokenPocket",
      description: "DApp in App",
      image: "/assets/AuthImages/pocket.png",
    },
    {
      id: 3,
      name: "MetaMask",
      description: "DApp in App",
      image: "/assets/AuthImages/Mask.png",
    },
    {
      id: 4,
      name: "Trust Wallet",
      description: "Any Wallet and browser",
      image: "/assets/AuthImages/trust.png",
    },
  ];
  // useEffect(() => {
  //   // Load profile image from localStorage
  //   const storedImage = localStorage.getItem("profilePhoto");
  //   if (storedImage) {
  //     // setProfileImage(storedImage);
  //   }
  // }, []);
  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl transform animate-quickAlert">
          🔗 Link copied!
        </div>
      )}
      <ToastContainer />
      <div className="relative overflow-hidden">
        <div
          className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 z-50 ${
            showBar ? "right-0" : "-right-full"
          }`}
        >
          <div className="flex justify-end">
            <div className="inline-block bg-Background p-2 rounded-full shadow-2xl">
              <HiMiniXMark
                className="text-white text-3xl"
                // onClick={() => setShowBar(false)}
              />
            </div>
          </div>
          {/* {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleConnect(wallet.name)}
              className="cursor-pointer mt-3 bg-zinc-900 text-textColor2 rounded-lg flex items-center gap-6 py-5 px-3"
            >
              <div className="h-16 w-16 bg-textColor3 rounded-full flex justify-center items-center">
                <img
                  src={wallet.image}
                  alt={wallet.name}
                  className="h-[48px] w-[48px]"
                />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-textColor3">
                  {wallet.name}
                </h1>
                <p className="text-xs">{wallet.description}</p>
              </div>
            </div>
          ))} */}
          <p className="text-textColor2 text-center mt-16 text-sm">
            Got a Question?{" "}
            <span className="text-textColor3 font-medium">Contact Support</span>
          </p>
        </div>

        <div className="w-full px-4 pt-6 pb-5 homebg bg-black">
          <div className="relative">
            {/* <div className="absolute inset-0 h-full opacity-10 left-20 -top-3">
              <img
                src="assets/HomeImages/eaglebg.jpg"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div> */}

            <div className="bg-eagles relative inset-0 z-10">
              <div
                className={`h-auto flex justify-between ${
                  userData?.[1] > 1 ? "" : "pb-10"
                }`}
              >
                <div className="flex gap-6">
                  <div className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[#0EE6FC]  to-[#9B51E0]">
                    <div className="relative flex items-center justify-center text-white h-full w-full rounded-full bg-Background">
                      {user?.profileImage ? (
                        <div className="h-[70px] w-[70px] rounded-full overflow-hidden bg-[#5c5c5c] flex justify-center items-center">
                          <img
                            src={user?.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div>
                          <IoPersonCircleSharp className="text-8xl text-textColor3" />
                          {/* <img
                            src="/assets/HomeImages/logo.png"
                            alt="logo"
                            className="h-7 w-7 ms-2 object-cover absolute bottom-2 -right-6 rounded-full"
                          /> */}
                        </div>
                      )}
                      {/* <Link to="/social" className="absolute -bottom-7">
                        <div className="w-28 rounded-full p-[2px] bg-gradient-to-r from-[#a67912] via-white to-white">
                          <div className="bg-[#433108] rounded-full text-xs px-2 flex items-center justify-between py-1">
                            <p className="text-slate-400">Social</p>
                            <span className="flex gap-1 items-center">
                              <FaHeart className="text-pink-400" />
                              526
                            </span>
                          </div>
                        </div>
                      </Link> */}
                    </div>
                  </div>

                  <div className="text-textColor3 ml-10">
                    <h1 className="text-3xl font-bold font-sans capitalize">
                      {user?.name || "Username"}
                      {/* username kaa lia profile must bani honi chahiya  haa or wallet connect hons chahiya haa  */}
                    </h1>
                    {!loading && userData ? (
                      <p className="font-bold bg-[#1C1F2E] rounded-full px-2 py-1 mt-2 text-white italic underline w-fit shadow-xl shadow-[#00000079]">
                        ID {userData?.[1]?.toString() || "Display Soon"}
                      </p>
                    ) : null}

                    {userData?.[1] > 1 ? (
                      <button
                        className="mt-8 text-base flex gap-2 items-center justify-center bg-Background shadow-xl shadow-[#00000079] transition-all ease-in-out text-textColor2 w-44 py-1 rounded-full"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? "Show less" : "Show more"}
                        {showDetails ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <IoSettingsSharp
                  className="text-textColor3 text-3xl mt-1 cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
              </div>

              {showDetails && userData?.[1] > 1 && (
                <div className="mt-1">
                  <div className="flex gap-x-1 items-center text-sm text-textColor3">
                    {referralData?.UplineAdress ? (
                      <p>
                        {`${referralData.UplineAdress.slice(
                          0,
                          6
                        )}...${referralData.UplineAdress.slice(-6)}`}
                      </p>
                    ) : (
                      <p>No Referrer</p>
                    )}

                    <IoCopy
                      onClick={() => handleCopy(referralData?.UplineAdress)}
                      className="cursor-pointer"
                    />
                  </div>

                  {uplineID ? (
                    <div className="flex gap-2 items-center text-textColor3 text-sm mt-2">
                      <p>Joined by</p>
                      <p className="px-1 flex justify-center text-textColor3 shadow-lg shadow-[#00000079] font-medium text-base bg-[#333333] bg-opacity-35 rounded-full italic">
                        ID {uplineID}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {referralData?.referrerId && (
                    <div className="mt-2 text-textColor3 text-sm flex items-center gap-2">
                      <span>Referred by ID:</span>
                      <span className="px-2 py-1 bg-[#333333] bg-opacity-35 rounded-full">
                        {referralData.referrerId}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#1C1F2E] shadow-xl shadow-[#00000079] w-full px-3 py-3 rounded-lg mt-3 mb-5">
            <div className="flex items-center justify-between text-base mb-5">
              <h5 className="text-textColor3 font-bold">My Personal link</h5>
              <p className="text-textColor3 text-base font-sans font-semibold italic flex gap-2 items-center">
                theeagles.io/{userData?.[1]?.toString()}
                <GoArrowUpRight className="text-lg" />
              </p>
            </div>
            <div className="text-lg flex gap-3">
              <button
                className="bg-gradient-to-r from-[#9B51E0] to-[#00F6FF] w-full text-textColor3 shadow-xl shadow-[#00000079] font-medium px-6 py-1 rounded-full"
                onClick={() =>
                  handleCopy(`theeagles.io/${userData?.[1]?.toString()}`)
                }
              >
                Copy
              </button>
              <button className="bg-gradient-to-r from-[#9B51E0] to-[#00F6FF] w-full text-textColor3 shadow-xl shadow-[#00000079] font-medium px-6 py-1 rounded-full">
                Share
              </button>
            </div>
          </div>

          {/* Additional Components */}
          <Cards PT={PT} userData={userData} />
          <Program preview={false} userData={userData} />
          <Members />
          <Contract />
          <History id={userID} />
        </div>
      </div>
    </>
  );
};

export default Home;
