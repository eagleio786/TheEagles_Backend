import React from "react";
import { useQuery } from "@apollo/client";
import client from "./apolloClient";
import { GET_FUNDS_DISTRIBUTED } from "./queries";

const FundsList = () => {
  // Function to get the Unix timestamp for 24 hours ago
  const getUnixTimestamp24HrsAgo = () => {
    return Math.floor(Date.now() / 1000) - 24 * 60 * 60;
  };

  const walletAddress = "0x34cA95C8b9bc81b161600b31aD18AC460De6b01B";
  const timestamp = getUnixTimestamp24HrsAgo(); // Using the dynamic timestamp

  const { loading, error, data } = useQuery(GET_FUNDS_DISTRIBUTED, {
    client,
    variables: { walletAddress, timestamp },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to filter unique transactions and sum the amounts
  const calculateTotalEarnings = (transactions) => {
    const uniqueTransactions = new Set();
    let totalEarnings = BigInt(0);

    transactions.forEach(({ amount, trxId }) => {
      if (!uniqueTransactions.has(trxId)) {
        uniqueTransactions.add(trxId);
        totalEarnings += BigInt(amount);
      }
    });

    return totalEarnings;
  };

  // Function to format total earnings by dividing by 1e18
  const formatEarnings = (totalEarnings) => {
    const divisor = BigInt(1e18); // Convert 1e18 to BigInt
    const formattedEarnings = Number(totalEarnings) / Number(divisor); // Convert BigInt to number for division
    return formattedEarnings.toFixed(2); // Limit to 6 decimal places
  };

  const totalEarnings = calculateTotalEarnings(data.fundsDistributeds);
  const formattedEarnings = formatEarnings(totalEarnings);

  return (
    <div>
      <h2 className="text-xl font-bold">Total Earnings</h2>
      <h3 className="text-2xl font-semibold text-green-500">
        {formattedEarnings} DAI
      </h3>
    </div>
  );
};

export default FundsList;
