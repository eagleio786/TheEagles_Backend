import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Unstopable from '../Components/Support/Unstopable';
import Userfriendly from '../Components/Support/Userfriendly';
import SpecialEquip from '../Components/Support/SpecialEquip';
import Platform from '../Components/Support/Platform';
import USDTadvantage from '../Components/Support/USDTadvantage';
import Education from '../Components/Support/Education';
import Marketing from '../Components/Support/Marketing';
import Profit from '../Components/Support/Profit';
import Referral from '../Components/Support/Referral';
import FundsStorage from '../Components/Support/FundsStorage';
import Website from '../Components/Support/Website';
import Registration from '../Components/Support/Registration';
import Programs from '../Components/Support/Programs';
import Ecosystem from '../Components/Support/Ecosystem';
import EarnwithEagle from '../Components/Support/EarnwithEagle';
import Media from '../Components/Support/Media';
const Support = () => {
  return (
    <>
      <div className='bg-white pb-10'>
        <div className='h-36 w-full'>
          <img
            src='assets/SupportImages/top.svg'
            alt=''
            className='h-full w-full object-cover'
          />
        </div>
        <div className='my-6 space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>💎 What is The Eagles?</h1>
          <p className='text-[#595460] '>theeagles.io</p>
          <p className='ps-6 border-l border-[#dedddd] text-[#787779]'>
            <span className='text-[#888788] font-medium'>The Eagles</span> is a
            No.1 smart contract for starting and developing a blockchain-powered
            online business. The Eagles operates as a decentralized platform
            that connects people from all over the world and provides unlimited
            opportunities for a brand new economics since 2025.
          </p>
          <p>
            Watch the video to meet some of The Eagles community members and
            catch our vibe ⤵️
          </p>
        </div>
        <div className='flex justify-center items-center px-3'>
          <iframe
            width='560'
            height='200'
            src='https://www.youtube.com/embed/YOUR_VIDEO_ID'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <div className='my-6 space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>
            💡 What makes The Eagles stand out
          </h1>
          <h2 className='text-xl font-bold'>• 100% Decentralized</h2>
          <p>
            {' '}
            The Eagles has no owners or management. It has been deployed as a
            smart contract and from that moment runs independently. No one can
            tamper with it, even the founders and developers, since smart
            contracts are irreversible by nature.
          </p>
          <p>
            The Eagles smart contract regulates the interactions between the
            users according to the marketing programs.
          </p>
          <p className='bg-green-100 flex p-3 rounded-lg'>
            <span className='w-20 text-green-600 mt-1'>
              <FaRegCircleCheck />{' '}
            </span>{' '}
            All users are equal, and everyone has the same opportunities to
            create and develop their online business.
          </p>
          <p>
            There is no CEO or owner who can change the rules and terms of The
            Eagles ecosystem. The founders are ordinary users who follow the
            same rules and mechanics as everyone else in the community.
          </p>
        </div>
        <div className='space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>• Solid Foundation</h1>
          <div className='flex justify-center items-center'>
            <iframe
              width='560'
              height='200'
              src='https://www.youtube.com/embed/YOUR_VIDEO_ID'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className='my-6 space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>• Low Risk</h1>
          <p>
            {' '}
            All transactions are executed peer-to-peer, from one personal wallet
            to another. The platform itself does not store any funds. There is
            no need to ‘withdraw,’ since there’s nothing to withdraw. The funds
            are already on the users’ wallets.
          </p>
          <p>
            {' '}
            The Eagles has no access to the funds, and nothing can affect the
            crypto economics of the smart contract.
          </p>
          <p>
            {' '}
            Even if the website crashes or becomes blocked, it won’t stop The
            Eagles from operating. The website is merely an interface that
            facilitates the interaction between users. All the transactions are
            made on the blockchain, and they can never be compromised or
            canceled.
          </p>
          <p className='bg-[#f3f3f3] flex p-3 rounded-lg'>
            <span className='w-20 text-[#714f93] mt-1'>
              <IoMdInformationCircleOutline />
            </span>{' '}
            It makes The Eagles absolutely resistant to any interference from
            third parties, be it malefactors, authorities, or even the founders.
          </p>
        </div>
        <div className='space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>• Cross-Blockchain</h1>
          <p>So far, The Eagles operates on 1 blockchain:</p>
          <p>• Tether (USDT)</p>
          <p>
            Finally, The Eagles achieved its peak performance with{' '}
            <span className='font-semibold'>USDT stablecoin</span> on the
            Binance Smart Chain network.
          </p>
          <p>
            The basic principles of interaction between users, as well as the
            cryptoeconomics in all The Eagles blockchain, are similar. However,
            The Eagles USDT allows users to earn a stable income in USDT
            stablecoin, which is pegged to the US dollar and is therefore not
            subject to market fluctuations.
          </p>
        </div>
        <div className='my-6 space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>• Everyone has Equal Rights</h1>
          <p>
            Every participant in The Eagles is considered equal, with no
            segregation into admins, founders, or others. On top of that, the
            execution of cryptomarketing on the blockchain does not depend on
            banks, payment services, or other third parties.
          </p>
          <p>
            The Eagles founders are treated like ordinary participants. They
            have their own accounts and earn by developing their affiliate
            structures, just like everyone else.
          </p>
        </div>
        <div className='space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>• Transparent</h1>
          <p>
            {' '}
            All the transactions on the blockchain are open for anyone to check.
            You can always view them in a block explorer compatible with our
            blockchain.
          </p>
          <p>
            This transparency allows you to track both your own transactions and
            those made by any other The Eagles user.
          </p>
          <p>
            The smart contract is also open for examination, and you can always
            check its mechanics or ask someone you trust to do so.
          </p>
          <p>
            USDT smart contract address 🔗
            <span className='text-[#714f93] text-sm'>
              <Link to='#' className='underline'>
                0x5acc84a3e955Bdd76467d3348077d003f00fFB97
              </Link>
            </span>
          </p>
        </div>

        <div className='my-6 space-y-4 px-3'>
          <h1 className='text-2xl font-bold'>
            • The Most Up-to-Date Technology
          </h1>
          <p>
            The Eagles employs the most cutting-edge technology available to
            ensure users get the best experience when building their online
            business.
          </p>
          <p>
            The Eagles surpasses other methods of doing business, both online
            and offline, by eliminating counterparties and other limits. Web3
            technology connects users through their public wallet keys only,
            without requiring the disclosure of sensitive data.
          </p>
          <p className='bg-[#f3f3f3] flex p-3 rounded-lg gap-2'>
            <span className='w-20 text-[#714f93] mt-1'>
              <IoMdInformationCircleOutline />
            </span>{' '}
            The Eagles does not require authorization with names, phone numbers,
            IDs, or other private information. Users can remain completely
            anonymous and are not required to undergo the KYC procedure.
          </p>
        </div>
        <Unstopable />
        <Userfriendly />
        <SpecialEquip />
        <Platform />
        <USDTadvantage />
        <Education />
        <Marketing />
        <Profit />
        <Referral />
        <FundsStorage />
        <Website />
        <Registration />
        <Programs />
        <Ecosystem />
        <EarnwithEagle />
        <Media />
      </div>
    </>
  );
};
export default Support;
