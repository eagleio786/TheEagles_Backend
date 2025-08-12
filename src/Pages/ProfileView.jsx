import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCopy, IoPersonCircleSharp, IoSettingsSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { UserPlus } from "lucide-react";
import { HiMiniXMark } from "react-icons/hi2";
import { useConnect, useDisconnect, useAccount, useSwitchChain } from "wagmi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../Components/Home/Cards";
import Program from "../Components/Home/Program";
import Members from "../Components/Home/Members";
import Contract from "../Components/Home/Contract";
import History from "../Components/Home/History";
import chainConfig from "../Config/chainConfig";
import { ApiUrl } from "../Config/config";
import { getIdToAddress, users } from "../Config/Contract-Methods";
const Home = ({ showBar, setShowBar }) => {
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState([]);
  const [referralData, setReferralData] = useState("");
  const [user, setUser] = useState({});
  const [PT, setPT] = useState("");
  const [uplinerid, setuplinerid] = useState(0);
  const [adress, setadress] = useState("");
  const { id } = useParams();

  const fetchUserAdress = async () => {
    console.log("kashif is wrokng");

    try {
      const add = await getIdToAddress(id);
      setadress(add);
      const response = await axios.get(`${ApiUrl}/user/${add}`);
      console.log("User data:", response.data);
      setUser(response.data.data);
      console.log("kashif is", add);

      if (!add) return;
      return add;
    } catch (error) {
      console.log("error whiel getting user id", error);
    }
  };
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
    console.log("kashif is a boy");
    fetchUserAdress();
    fetchUserData();
  }, [id]);
  useEffect(() => {
    // users("0x92a0220ADDCC3C07Bedee23844ce65649A2C5961").then(console.log);
    console.log("--------------------------");
  }, []);
  console.log("-------------------------- kashif", user);
  // useEffect(() => {
  const fetchUserData = async () => {
    try {
      const add = await getIdToAddress(id);
      if (!add) return;
      const result = await users(add);
      if (result?.[1]) {
        const userId = result[1];
        localStorage.setItem("id", result[1].toString());
        setUserData(result);
        const referralResponse = await axios.get(
          `${ApiUrl}/refferal/${userId}`
        );
        const result2 = await users(referralResponse.data.UplineAdress);
        // console.log("kashif testing ", referralResponse.data, result2);
        setuplinerid(Number(result2[1]));
        setReferralData(referralResponse.data.UplineAdress);
        setPT(referralResponse?.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  //   if (isConnected) fetchUserData();
  // }, [address, isConnected,id]);

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
      name: "walletconnect",
      description: "Any Wallet and browser",
      image: "/assets/AuthImages/trust.png",
    },
  ];
  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl transform animate-quickAlert">
          🔗 Link copied!
        </div>
      )}

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

        <div className="w-full px-4 pt-6 pb-5 ">
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
                  <div className="h-20 w-20 rounded-full ms-3">
                    <div className="relative flex items-center justify-center text-white h-full w-full rounded-full bg-gradient-to-r from-[#0EE6FC]  to-[#9B51E0]">
                      {user ? (
                        <>
                          <div className="h-[70px] w-[70px] rounded-full overflow-hidden bg-[#5c5c5c] flex justify-center items-center">
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                className="w-full h-full object-cover"
                                alt="Profile"
                              />
                            ) : (
                              <UserPlus />
                            )}
                            {/* <img src={user.profileImage} alt="Profile" /> */}
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <IoPersonCircleSharp className="text-8xl text-textColor3" />
                          </div>
                        </>
                      )}
                      <img
                        src="/assets/HomeImages/logo.png"
                        alt="logo"
                        className="h-7 w-7 ms-2 object-cover absolute bottom-2 -right-4 rounded-full"
                      />

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
                    <h1 className="text-2xl font-semibold font-sans capitalize">
                      {user?.name || "Username"}
                      {/* username kaa lia profile must bani honi chahiya  haa or wallet connect hons chahiya haa  */}
                    </h1>
                    {!loading && referralData ? (
                      <p className="text-lg text-textColor3 italic font-medium shadow-xl shadow-[#00000079] w-fit">
                        ID {id || "Display Soon"}
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
              </div>

              {showDetails && userData?.[1] > 1 && (
                <div className="mt-1">
                  <div className="flex gap-x-1 items-center text-sm text-textColor3">
                    {referralData ? (
                      <p>
                        {`${referralData.slice(0, 6)}...${referralData.slice(
                          -6
                        )}`}
                      </p>
                    ) : (
                      <p>No Referrer</p>
                    )}

                    <IoCopy
                      onClick={() => handleCopy(referralData?.referrer)}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-textColor3 text-sm mt-2">
                    {/* <p>
                      Joined{" "}
                      {referralData?.createdAt
                        ? new Date(referralData.createdAt).toLocaleDateString()
                        : ""}
                    </p> */}
                    <p className="px-1 flex justify-center text-textColor3 shadow-lg shadow-[#00000079] font-medium text-base bg-[#333333] bg-opacity-35 rounded-full italic">
                      Refferral ID {uplinerid}
                    </p>
                  </div>

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

          {/* Referral Link Section */}
          <div className="bg-[#1C1F2E] shadow-xl shadow-[#00000079] w-full px-3 py-3 rounded-lg mt-3 mb-5">
            <div className="flex items-center justify-between text-base mb-5">
              <h5 className="text-textColor3">My Personal link</h5>
              <p className="text-textColor3 text-base font-sans font-medium flex gap-2 items-center">
                theeagles.io/{referralData?.id}
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
          <Program preview={true} userData={userData} />
          <Members />
          <Contract />
          <History id={id} />
        </div>
      </div>
    </>
  );
};

export default Home;
