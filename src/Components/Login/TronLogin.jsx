const TronLogin = () => {
  return (
    <>
      <div className='bg-Background h-auto w-full px-3 py-5 mt-6 rounded-lg'>
        <div className='flex justify-between text-textColor3 font-bold text-3xl'>
          <h1>Tron</h1>
          <img src='assets/LoginImages/tron.png' alt='' className='h-10 w-10' />
        </div>
        <div className='text-textColor2 text-sm font-medium mt-5 space-y-5'>
          <p>Entry fee 200 TRX</p>
          <p>3 programs available, x3, x4,</p>
          <p>over 4000,000 users</p>
          <p>
            The total result of the participation are more than as million
            dollars
          </p>
          <p>Advantages:</p>
          <p>Instant transaction</p>
          <p>Low network cmmission</p>
          <p>Afforable and easy start</p>
          <p>Limitation:</p>
          <p>High TRX volatillity</p>
        </div>
        <div className='bg-gradient-to-r from-[#5b4fc6] to-[#170e61] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-textColor3 font-medium rounded-lg'>
          <button>Login Tron</button>
        </div>
      </div>
    </>
  );
};
export default TronLogin;
