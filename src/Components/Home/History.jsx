import axios from "axios";
import { useEffect, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { RiShare2Line } from "react-icons/ri";
import { ApiUrl } from "../../Config/config";
import { useNavigate } from "react-router-dom";

const History = ({ id }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [history, setHistory] = useState([]);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const userID = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/getCompleteReferralChain/${id ? id : userID}`)
      .then((res) => {
        const formattedData = res.data.data.referralChain.map((data) => {
          const totalUsdt = (parseFloat(data.totalUSDTReceived.$numberDecimal) / 1e18).toFixed(2);
          const level = "x1";
          const formattedTime = new Date(data.updatedAt).toLocaleTimeString();
          const timeInMinutesHours = formattedTime.split(":");
          const time = `${timeInMinutesHours[0]} hours`;
          return {
            id: data.id,
            icon: <IoWallet />,
            Paymentid: data.id,
            payment: `+${totalUsdt} USDT`,
            level: level,
            time: time,
          };
        });
        // setHistory(formattedData);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
   <div className="mt-7 mb-3 pb-6 bg-[#181828] shadow-xl shadow-[#00000079] rounded-xl">
  <div className="overflow-scroll h-[470px] flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-2">Coming Soon</h2>
      <p className="text-white/60 text-lg">
        We're working on something amazing for you!
      </p>
    </div>
  </div>
</div>
    </>
  );
};
export default History;
