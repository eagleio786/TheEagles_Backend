import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Menu from "../Components/DashboardMenu/Menu";

const AccountSearch = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [userData, setUserData] = useState(null);

  const users = [
    {
      id: "123",
      wallet: "0xABC...1234",
      level: "Gold",
      referral: "https://egeales.io/ref123",
      profit: "50 USDT",
    },
    {
      id: "456",
      wallet: "0xDEF...5678",
      level: "Silver",
      referral: "https://egeales.io/ref456",
      profit: "30 USDT",
    },
    {
      id: "789",
      wallet: "0xGHI...9101",
      level: "Platinum",
      referral: "https://egeales.io/ref789",
      profit: "100 USDT",
    },
  ];

  const handleSearch = () => {
    navigate(`/home/${searchId}`);
    const foundUser = users.find((user) => user.id === searchId);
    setUserData(foundUser || null);
  };
  // console.log(users);

  return (
    <div className="w-full min-h-screen text-textColor3 bg-gradient-to-r from-[#9B51E0] to-[#302408]">
      <div className="px-3 flex items-center justify-between">
        <img
          src="/assets/HomeImages/logo.png"
          alt="logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex justify-end py-4">
          <div className="inline-block bg-Background bg-opacity-20 p-2 rounded-full shadow-2xl">
            <HiMiniXMark
              className="text-white text-3xl cursor-pointer"
              onClick={() => navigate("/home")}
            />
          </div>
        </div>
      </div>

      <div className="px-4 border-b border-textColor2 pb-4">
        <h1 className="text-textColor3 text-xl font-medium">Preview ID</h1>
        <div className="flex gap-3 my-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-3/4 bg-Background bg-opacity-20 px-4 py-2 rounded-lg text-white"
            placeholder="Enter User ID"
          />
          <button
            onClick={handleSearch}
            className="font-medium w-1/4 bg-Background bg-opacity-20 px-4 py-2 rounded-lg"
          >
            Go
          </button>
        </div>

        {/* Display User Data */}
        {userData ? (
          <div className="rounded-lg awais text-textColor3 shadow-md shadow-[#1b1a1a] p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Wallet Address:</span>
                <span className="text-slate-400">{userData.wallet}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Level:</span>
                <span className="text-slate-400">{userData.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Referral Link:</span>
                <span className="text-slate-400">{userData.referral}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Profit:</span>
                <span className="text-slate-400">{userData.profit}</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="bg-gradient-to-r from-[#000000] to-[#747474] w-full mx-auto flex items-center justify-center px-8 py-3 mt-4 text-textColor3 font-medium rounded-lg">
          <button>Exit preview mode</button>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default AccountSearch;
