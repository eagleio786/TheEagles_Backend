import { Link, useLocation } from 'react-router-dom';
import USDT from '/assets/LoginImages/tether.png';

const USDTlogin = () => {
  const location = useLocation();
  const type = location.state?.type || 'login';

  return (
    <>
      <div className='bg-zinc-900 h-auto w-full px-3 py-5 mt-6 rounded-lg'>
        <div className='flex justify-between text-textColor3 font-bold text-3xl'>
          <h1>USDT</h1>
          <img src={USDT} alt='' className='h-10 w-10' />
        </div>
        <div className='text-gray-200 text-sm font-medium mt-5 space-y-5'>
          <div className='leading-4'>
            <p>Advantages:</p>
            <p>Stablecoin is pegged to the value of the dollar</p>
          </div>
          <p>Operates in compliance with U.S. Treasury standards</p>
          <p>
            USDT – Fully backed by audited USD reserves for transparency and
            trust
          </p>
          <p>Fixed profit and fall protection</p>
          <p>Instant transaction</p>
          <p>Limitations:</p>
          <p>
            Due to the stable price, it is difficult to make money on growth
          </p>
        </div>
        <Link to={type === 'register' ? '/register' : '/auth'}>
          <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-textColor3 font-medium rounded-full'>
            <button>
              {type === 'register' ? 'Registeration USDT' : 'Login USDT'}
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default USDTlogin;
