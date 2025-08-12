const FundsStorage = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>• Funds storage</h1>
      <p>
        {' '}
        The Eagles smart contracts are programmed in such a way that they never
        store participants' funds, their balance is always zero. The purpose of
        the smart contract is to automatically redirect funds from incoming
        transactions to the wallets of other participants, according to
        marketing program rules.
      </p>
      <p>
        To become a The Eagles member, you need a personal{' '}
        <span className='font-semibold'>crypto wallet</span>.
      </p>
      <p>
        Only you have access to the funds. All rewards are instantly credited to
        your personal wallet. All transactions are stored in the public domain
        in a blockchain.
      </p>
      <p>
        You can easily check each transaction and see where the funds have been
        transferred.
      </p>
    </div>
  );
};
export default FundsStorage;
