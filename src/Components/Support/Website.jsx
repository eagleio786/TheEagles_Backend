const Website = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>• Website</h1>
      <p>
        The Eagles.io website is an interface that facilitates interaction with
        the platform.
      </p>
      <p>
        The main purpose of the website is to display statistics on the flow of
        participants' funds based on the data received from the smart contract
        of the platform.
      </p>
      <p>
        Database synchronization with the blockchain occurs{' '}
        <span className='font-semibold'>every 30 seconds</span>.
      </p>
    </div>
  );
};
export default Website;
