import { HiMiniXMark } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import flag from '/assets/AuthImages/raceFlag.png';
import Members from '../Components/Home/Members';
import Contract from '../Components/Home/Contract';
import History from '../Components/Home/History';
import Footer from '../Components/Footer/Footer';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useAccount } from 'wagmi';
import { users } from '../Config/Contract-Methods';
import { useEffect, useState } from 'react';

const Passid = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [userId, setUserId] = useState(null);

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const WalletAddress = shortenAddress(address);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!address) return;
      try {
        const result = await users(address);
        setUserId(result[1]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, [address]);

  return (
    <>
      <div className='py-4'>
        <div className='flex justify-end px-3'>
          <div className='inline-block bg-Background p-2 rounded-full shadow-2xl'>
            <HiMiniXMark
              className='text-white text-3xl'
              onClick={() => navigate('/home')}
            />
          </div>
        </div>

        <div className='bg-[#1C1F2E] mx-3 px-3 py-6 mt-5 rounded-lg'>
          <div className='flex gap-5 items-center'>
            <div className='bg-textColor2 h-20 w-20 flex justify-center items-center rounded-full'>
              <IoPersonCircleSharp className='text-7xl text-textColor3' />
            </div>
            <h1 className='text-2xl text-textColor3'>ID {userId?.toString()}</h1>
          </div>
          <p className='text-xs text-textColor2 mt-7'>
            {WalletAddress} is a number of The Eagles.io USDT
          </p>
          <Link to='/home'>
            <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-textColor3 font-medium rounded-lg'>
              <button>Return to your account</button>
            </div>
          </Link>
        </div>

        <div className='my-8 mx-3'>
          <h1 className='text-textColor3 text-xl font-medium'>
            Account Preview
          </h1>
          <p className='text-xs text-textColor2 w-[85%] mt-3'>
            Look up any The Eagles.io USDT member account in preview mode. Enter
            ID or USDT address to Preview pr click Demo to view a random account
          </p>
        </div>

        <div className='bg-[#1C1F2E] px-3 mx-3 py-6 mt-5 rounded-lg'>
          <h1 className='text-textColor3 text-xl font-medium'>
            Ender ID or USDT wallet
          </h1>
          <div>
            <Link to='#'>
              <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-9 text-textColor3 font-medium rounded-lg'>
                <button>Example: 87381</button>
              </div>
            </Link>
            <Link to='#'>
              <div className='bg-textColor2 w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-6 text-balck font-medium rounded-lg'>
                <button>Preview</button>
              </div>
            </Link>
          </div>
        </div>

        <div className='bg-Background px-3 py-3 mt-5 rounded-lg mx-3'>
          <h1 className='text-textColor3 text-xl font-medium'>
            Don’t Know any ID?
          </h1>
          <Link to='#'>
            <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] w-1/2 flex items-center justify-center px-8 py-3 mt-6 text-textColor3 font-medium rounded-lg'>
              <button>Check Demo</button>
            </div>
          </Link>
        </div>

        <div className='px-3 mt-5'>
          <h1 className='text-textColor3 text-xl font-medium'>
            Platform recent activity
          </h1>

          <Members />
          <Contract />
        </div>
        <History />

        <div className='flex flex-col justify-center px-3 h-auto w-full'>
          <h1 className='text-textColor3 text-2xl w-3/4 font-medium mt-14'>
            Need help with using the platform
          </h1>
          <p className='text-textColor2 mt-6 text-sm w-3/4'>
            Get qualified support from The Eagles.io experts vuia online chat
          </p>

          <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] w-3/4 flex items-center justify-center px-8 py-3 mt-10 text-textColor3 font-medium rounded-lg mb-14'>
            <button>Connect support</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Passid;
