import Ethereum from '/assets/LoginImages/Ethereum.png';

const Ethereumlogin = () => {
  return (
    <>
      <div className='bg-Background h-auto w-full px-3 py-5 mt-6 rounded-lg'>
        <div className='flex justify-between text-textColor3 font-bold text-3xl'>
          <h1>Ethereum</h1>
          <img src={Ethereum} alt='' className='h-10 w-10' />
        </div>
        <div className='text-textColor2 text-sm font-medium mt-5 space-y-14'>
          <div className='leading-4'>
            <p>Advantages:</p>
            <p>The largest crypto community</p>
            <p>The second cryptocurrency by capitalization</p>
            <p>
              The opportunity to earn on the growth of cryptocurrency
              capitalization
            </p>
            <p>Reliable and stable network</p>
          </div>
          <div className='space-y-5'>
            <p>Limitation:</p>
            <p>High network commission</p>
            <p>Low transaction speed</p>
            <p>
              The cost of entry is highly depended on the price of the
              cryptocurreny
            </p>
          </div>
        </div>
        <div className='bg-gradient-to-r from-[#5b4fc6] to-[#170e61] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-textColor3 font-medium rounded-lg'>
          <button>Login Ethereum</button>
        </div>
      </div>
    </>
  );
};
export default Ethereumlogin;
