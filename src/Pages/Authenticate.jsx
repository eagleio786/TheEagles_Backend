import { HiMiniXMark } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import Members from '../Components/Home/Members';
import Contract from '../Components/Home/Contract';
import History from '../Components/Home/History';
import Footer from '../Components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useConnect, useAccount, useSwitchChain, useDisconnect } from 'wagmi';
import chainConfig from '../Config/chainConfig';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Authenticate = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && chain?.id) {
      const targetChainId = chainConfig[11155111]?.id;
      if (chain.id !== targetChainId) {
        switchChain({ chainId: targetChainId });
      }
    }
  }, [chain, isConnected]);

  useEffect(() => {
    if (address && isConnected) {
      navigate('/passId');
    }
  }, [address, isConnected]);

  const handleConnectClick = () => {
    setShowSidebar(true);
  };

  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      // setShowSidebar(false);
    }
  };

  const wallets = [
    // {
    //   id: 1,
    //   name: 'Trust Wallet',
    //   description: 'DApp in App',
    //   image: '/assets/AuthImages/trust.png',
    // },
    {
      id: 2,
      name: 'TokenPocket',
      description: 'DApp in App',
      image: '/assets/AuthImages/pocket.png',
    },
    {
      id: 3,
      name: 'MetaMask',
      description: 'DApp in App',
      image: '/assets/AuthImages/Mask.png',
    },
    {
      id: 4,
      name: 'walletconnect',
      description: 'Any Wallet and browser',
      image: '/assets/AuthImages/trust.png',
    },
  ];

  const { disconnect } = useDisconnect()
  useEffect(() => {
    disconnect()
  }, [])

  return (
    <>
      <div className='relative overflow-hidden'>
        <div className='py-4'>
          <div className='flex justify-end px-3'>
            <div className='inline-block bg-Background p-2 rounded-full shadow-2xl nj'>
              <HiMiniXMark
                className='text-white text-3xl'
                onClick={() => navigate('/')}
              />
            </div>
          </div>

          <div className='bg-[#1C1F2E] mx-3 px-3 py-6 mt-5 rounded-lg'>
            <h1 className='text-textColor3 text-xl font-medium'>
              Welcome to The Eagles.io
            </h1>
            <p className='text-white text-xs mt-3'>
              Connect your wallet to start working.First Time here? Watch
              atutorial to learn more
            </p>
            <div>
              <div
                onClick={handleConnectClick}
                className='bg-gradient-to-r from-[#9B51E0] to-[#01F7FF] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-white font-medium rounded-lg'
              >
                <button className='font-bold'>
                  Connect wallet
                    {/* <ConnectButton
                                  showBalance={false}
                                  accountStatus="address"
                                  chainStatus="none"
                                  label="Connect"
                                /> */}
                  </button>
              </div>
              <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] text-white w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-6  font-medium rounded-lg'>
                <button>Connect tutorial</button>
              </div>
            </div>
          </div>

          <div className='my-8 mx-3'>
            <h1 className='text-textColor3 text-xl font-medium'>
              Account Preview
            </h1>
            <p className='text-xs text-textColor2 w-[85%] mt-3'>
              Look up any The Eagles.io USDT member account in preview mode.
              Enter ID or USDT address to Preview pr click Demo to view a random
              account
            </p>
          </div>

          <div className='bg-[#1C1F2E] px-3 mx-3 py-6 mt-5 rounded-lg'>
            <h1 className='text-textColor3 text-xl font-medium'>
              Ender ID or USDT wallet
            </h1>
            <div>
              <Link to='#'>
                <div className='bg-gradient-to-r from-[#9B51E0] to-[#01F7FF] w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-9 text-white font-medium rounded-lg '>
                  <button className='font-bold'>Example: 87381</button>
                </div>
              </Link>
              <Link to='#'>
                <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] text-white w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-6 text-balck font-medium rounded-lg'>
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

        {/* Sidebar */}
        <div
          className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 ${showSidebar ? 'right-0' : '-right-full'
            }`}
        >
          <div className='flex justify-end'>
            <div className='inline-block bg-Background p-2 rounded-full shadow-2xl'>
              <HiMiniXMark
                className='text-white text-3xl'
                // onClick={() => setShowSidebar(false)}
              />
            </div>
          </div>

          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleConnect(wallet.name)}
              className='cursor-pointer mt-3 bg-zinc-900 text-textColor2 rounded-lg flex items-center gap-6 py-5 px-3'
            >
              <div className='h-16 w-16 bg-textColor3 rounded-full flex justify-center items-center'>
                <img
                  src={wallet.image}
                  alt={wallet.name}
                  className='h-[48px] w-[48px]'
                />
              </div>
              <div>
                <h1 className='text-2xl font-medium text-textColor3'>
                  {wallet.name}
                </h1>
                <p className='text-xs'>{wallet.description}</p>
              </div>
            </div>
          ))}

          <p className='text-textColor2 text-center mt-16 text-sm'>
            Got a Question?{' '}
            <span className='text-textColor3 font-medium'>Contact Sunpport</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default Authenticate;
