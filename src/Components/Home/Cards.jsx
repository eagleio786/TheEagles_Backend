import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { BsShare } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { ApiUrl } from "../../Config/config";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import client from "../../Pages/apolloClient";
import { GET_FUNDS_DISTRIBUTED } from "../../Pages/queries";
import ProfitIcon from "../../assets/icons/profitIcon.png";
import PartnersIcon from "../../assets/icons/partnersIcon.png";
import teamIcon from "../../assets/icons/teamIcon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getIdToAddress,
  X3get24HourDirects,
  X3get24HourPayment,
  X3get24HourTeamCount,
  X3getTotalDirects,
  X3getTotalTeamCount,
  X3Users,
} from "../../Config/Contract-Methods";
const Cards = ({ PT, userData }) => {
  const [partner24hCount, setPartner24hCount] = useState(0);
  const [team24hCount, setTeam24hCount] = useState(0);
  const [total24hProfit, setTotal24hProfit] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [val, setVal] = useState(0);
  const [val24, setVal24] = useState(0);
  const [team24hCountval, setTeam24hCountval] = useState(0);
  const [totalteamCount, settotalteamCount] = useState(0);
  const [Par, setPar] = useState();
  const [Par24, setPar24] = useState();
  const [totaldirects, setTotaldirects] = useState(0);
  const totalProfit = userData?.[4]?.toString() / 1e18;
  const userId = userData[1]?.toString();
  const { address } = useAccount();
  const [searchAdress, setsearchAdress] = useState("");
  const { id } = useParams();
  const [hrdirect24, sethrdirect24] = useState(0);
  // let team24hCountval;/
  // let totaldirects;
  // let totalteamCount;
  // let address="0x31eaCE9383eE97A5cF2FD6A1B254F27683DedE1B"
  useEffect(() => {
    gettingdetails();
  }, [address]);

  const gettingdetails = async () => {
    try {
      let X3totalcount = await X3Users(address);
      setVal(Number(X3totalcount[3]) / (1e18).toFixed(2));
      let X324hrcount = await X3get24HourPayment(address);
      setVal24(Number(X324hrcount) / (1e18).toFixed(2));
      let val2 = await X3get24HourTeamCount(address);
      setTeam24hCountval(Number(val2));
      let x = await X3getTotalDirects(address);
      // totaldirects = Number(x);
      setTotaldirects(Number(x));
      let y = await X3getTotalTeamCount(address);
      settotalteamCount(Number(y));
      let data = await X3get24HourDirects(address);
      sethrdirect24(Number(data));
      console.log("kashif ali", val2);
    } catch (error) {
      console.log("error while fetching details from X3", error);
    }
  };
  const apiFun = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/refferal/${userId}`);
      setPar(response?.data?.TotalPartners);
      setPar24(response?.data?.Last24hrsPartners);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const add = await getIdToAddress(id);
      setsearchAdress(add);
      console.log(" 24 , add: ", add, "id", id);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    console.log(" 24 useeffect wprls");
    fetchUserData();
  }, [id]);
  useEffect(() => {
    axios.get(`${ApiUrl}/getCompleteReferralChain/${userId}`).then((res) => {
      const referralChain = res.data.data.referralChain;
      const last24Hours = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

      // Direct referrals within the last 24 hours
      const partner24hCountss = referralChain.filter(
        (user) =>
          user.referrer === PT.Personal &&
          new Date(user.createdAt) >= last24Hours
      ).length;
      setPartner24hCount(partner24hCountss);

      const getTotalTeamCount = (chain) => {
        let count = chain.length;
        for (let user of chain) {
          if (user.referrals && user.referrals.length > 0) {
            count += getTotalTeamCount(user.referrals);
          }
        }
        return count;
      };

      setTeamCount(getTotalTeamCount(referralChain));

      // Recursive team calculation in last 24h
      const getTeam24hCount = (chain) => {
        let count = 0;
        for (let user of chain) {
          if (new Date(user.createdAt) >= last24Hours) {
            count++;
          }
          if (user.referrals && user.referrals.length > 0) {
            count += getTeam24hCount(user.referrals);
          }
        }
        return count;
      };

      setTeam24hCount(getTeam24hCount(referralChain));

      // Total 24h Profit
      const total24hProfitss = referralChain
        .filter((user) => new Date(user.updatedAt) >= last24Hours)
        .reduce(
          (sum, user) =>
            sum + parseFloat(user.totalUSDTReceived.toString()) / 1e18,
          0
        );
      setTotal24hProfit(total24hProfitss);
    });
    apiFun();
  }, [userId, PT.Personal]);

  // Query for total earnings using GraphQL
  const grapFunction = () => {};
  const getUnixTimestamp24HrsAgo = () => {
    return Math.floor(Date.now() / 1000) - 24 * 60 * 60;
  };
  const timestamp = useMemo(() => getUnixTimestamp24HrsAgo(), []);
  const effectiveWalletAddress = useMemo(() => {
    return searchAdress || address;
  }, [searchAdress, address]);

  const { loading, error, data } = useQuery(GET_FUNDS_DISTRIBUTED, {
    client,
    variables: { walletAddress: effectiveWalletAddress, timestamp },
    fetchPolicy: "cache-first",
    skip: !effectiveWalletAddress,
  });

  const calculateTotalEarnings = (transactions) => {
    let totalEarnings = BigInt(0);

    transactions.forEach(({ amount }) => {
      totalEarnings += BigInt(amount);
    });

    return totalEarnings;
  };

  const formatEarnings = (totalEarnings) => {
    const divisor = BigInt(1e18);
    return (Number(totalEarnings) / Number(divisor)).toFixed(2);
  };

  const totalEarnings = useMemo(
    () => calculateTotalEarnings(data?.fundsDistributeds || []),
    [data]
  );
  const formattedEarnings = useMemo(
    () => formatEarnings(totalEarnings),
    [totalEarnings]
  );

  console.log("<-24->", formattedEarnings, val24,Par,hrdirect24,totaldirects,Par24);
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="mr-4 bg-[#1C1F2E] w-full rounded-lg shadow-xl bg-image shadow-[#00000079] px-2 py-3">
          <div className="flex justify-between items-center">
            <p className="text-textColor3 font-semibold text-base flex items-center gap-2">
              Total Profit
              <span className="bg-gradient-to-r from-[#9B51E0] to-[#00F6FF] rounded-full p-1">
                <img
                  src={ProfitIcon}
                  alt="profit"
                  className="h-3 w-3 object-cover"
                />
              </span>
            </p>
          </div>
          <div className="flex justify-between font-semibold text-textColor3 mt-2">
            {/* <p className="flex items-center gap-1 text-green-500">
            <div className="bg-green-500 p-1 rounded-full mr-1" >
              <GoArrowUp className="text-white" />
            </div>
            {loading ? "0" : formattedEarnings || "0"}
          </p> */}
            <p className="font-medium text-2xl">
              {totalProfit
                ? (Number(totalProfit) + Number(val)).toFixed(2)
                : 0 + val}
              $
            </p>
          </div>
        </div>
        <div className="bg-[#1C1F2E] w-full rounded-lg shadow-xl bg-image shadow-[#00000079] px-2 py-3">
          <div className="flex justify-between items-center">
            <p className="text-textColor3 font-semibold text-base flex items-center gap-2">
              Daily Profit
              <span className="bg-gradient-to-r from-[#9B51E0] to-[#00F6FF] rounded-full p-1">
                <img
                  src={ProfitIcon}
                  alt="profit"
                  className="h-3 w-3 object-cover"
                />
              </span>
            </p>
          </div>
          <div className="flex justify-between font-semibold text-textColor3 mt-2">
            <p className="flex items-center gap-1 text-green-500">
              <div className="bg-green-500 p-1 rounded-full mr-1">
                <GoArrowUp className="text-white" />
              </div>
              {loading
                ? (Number(formattedEarnings) + Number(val24)).toFixed(2)
                : (Number(formattedEarnings) + Number(val24)).toFixed(2)}
              {/* {loading ? "0" : formattedEarnings || "0"} */}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <StatCard
          icon={PartnersIcon}
          title="Partners"
          count={Par}
          team24hCountval={hrdirect24}
          totalteamCount={totaldirects}
          count24={Par24}
          bg="bg-person2"
        />
        <StatCard
          title="Team"
          icon={teamIcon}
          count={teamCount}
          count24={team24hCount}
          team24hCountval={team24hCountval}
          totalteamCount={totalteamCount}
          bg="bg-person3"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  count,
  count24,
  bg,
  icon,
  team24hCountval,
  totalteamCount,
}) => {
  return (
    <div
      className={`bg-[#171B26] px-2 shadow-xl shadow-[#00000079] py-3 w-1/2 rounded-lg ${bg}`}
    >
      <p className="text-textColor3 text-base flex items-center font-bold gap-2">
        {title}
        <span className="bg-gradient-to-r from-[#9B51E0] to-[#00F6FF] rounded-full p-1 h-6 ">
          <img
            src={icon}
            alt="profit"
            className="h-3 mt-0.5 w-4 object-cover items-center"
          />
        </span>
      </p>
      <p className="text-3xl text-textColor3 font-semibold mt-1">
        {Number(count) + Number(team24hCountval) || 0 + Number(team24hCountval)}
      </p>
      <div className="w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full bg-[#a67912] bg-opacity-20">
        <div className="flex items-center font-medium text-xl text-green-500">
          <div className="bg-green-500 p-1 rounded-full mr-2">
            <GoArrowUp className="text-white" />
          </div>
          {Number(count24) + Number(team24hCountval) ||
            0 + Number(team24hCountval)}
        </div>
        <div className="gradient-circle"></div>
      </div>
    </div>
  );
};

export default Cards;
