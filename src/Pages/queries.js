import { gql } from "@apollo/client";

export const GET_FUNDS_DISTRIBUTED = gql`
  query GetFundsDistributed($walletAddress: String!, $timestamp: BigInt!) {
    fundsDistributeds(where: { to: $walletAddress, timestamp_gt: $timestamp }) {
      amount
      trxId
    }
  }
`;
