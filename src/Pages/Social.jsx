import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import p1 from '/assets/Rewords/r1.png';
import p2 from '/assets/Rewords/r2.png';
import p3 from '/assets/Rewords/r3.png';
import p4 from '/assets/Rewords/r4.png';
import p5 from '/assets/Rewords/r5.png';
import p6 from '/assets/Rewords/prof.jpeg';
import {
  IoIosArrowDroprightCircle,
  IoMdArrowDropdownCircle,
} from 'react-icons/io';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Social = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Organized reward images into categories
  const RewordsImages = [
    {
      MainTile: 'Profit USDT',
      images: [
        { imge: p1, tilte: 'wood' },
        { imge: p2, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p4, tilte: 'Shapiher' },
        { imge: p5, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Personal Partner',
      images: [
        { imge: p1, tilte: 'wood' },
        { imge: p2, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p4, tilte: 'Shapiher' },
        { imge: p5, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Teams',
      images: [
        { imge: p1, tilte: 'wood' },
        { imge: p2, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p4, tilte: 'Shapiher' },
        { imge: p5, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Profit BND',
      images: [
        { imge: p1, tilte: 'wood' },
        { imge: p2, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p4, tilte: 'Shapiher' },
        { imge: p5, tilte: 'Nebwei' },
      ],
    },
  ];

  const handleSeeMoreClick = () => {
    navigate('/socialReward', { state: { RewordsImages } });
  };

  return (
    <Fragment>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto'>
        {/* User Profile Section */}
        <div className='flex items-center justify-center space-x-4 mb-6'>
          <div className='flex flex-col'>
            <div className='rounded-full w-16 h-16 overflow-hidden'>
              <img
                src={p1}
                alt='User Avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <h1 className='text-white text-xl font-semibold'>UserName</h1>
            <p className='text-gray-400'>1231343</p>
          </div>
        </div>

        {/* Dashboard Button */}
        <div className='mb-6 flex justify-center w-full'>
          <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300'>
            Dashboard
          </button>
        </div>

        {/* Stats Section */}
        <div className='flex justify-between text-white mb-6'>
          <div className='text-center'>
            <p className='text-gray-400'>Partner</p>
            <p className='text-lg font-semibold'>1231231</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400'>Team</p>
            <p className='text-lg font-semibold'>243</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400'>Ratio</p>
            <p className='text-lg font-semibold'>1:2</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400'>Total Profit</p>
            <p className='text-lg font-semibold'>$10,000</p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className='mt-5 bg-gray-900 w-full rounded p-4'>
          {!showAll && (
            <div className='flex justify-around'>
              {[p1, p2, p3, p4].map((img, index) => (
                <div
                  key={index}
                  className='w-16 h-16 rounded-full overflow-hidden'
                >
                  <img src={img} alt='' className='w-full h-full' />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* See More / See Less Button */}
        <div className='flex justify-center mt-4'>
          <button
            onClick={handleSeeMoreClick}
            className='text-blue-500 hover:text-blue-400 transition duration-300 flex items-center gap-2'
          >
            See More <IoIosArrowDroprightCircle />
          </button>
        </div>

        {/* Posts Section */}
        <div className='mt-5'>
          <div className='flex justify-between items-center bg-gray-900 p-2 rounded'>
            <button className='px-4 text-gray-400 border-gray-700 border-2 rounded-md hover:bg-gray-800 transition duration-300'>
              +Create New Post
            </button>
            <button>
              <IoMdArrowDropdownCircle className='text-white hover:text-gray-400 transition duration-300' />
            </button>
          </div>
          <div className='flex justify-between items-center bg-gray-900 p-2 mt-2 rounded'>
            <button className='px-4 text-gray-400 border-gray-700 border-2 rounded-md hover:bg-gray-800 transition duration-300'>
              All Post
            </button>
            <button className='px-4 text-gray-400 border-gray-700 border-2 rounded-md hover:bg-gray-800 transition duration-300'>
              Post ID 234234
            </button>
          </div>
          <div className='flex gap-6 justify-center items-start w-full mt-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
              <img src={p6} alt='' className='w-full h-full' />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-gray-200'>UserName</h1>
              <p className='text-gray-300'>11.01.2025</p>
            </div>
            <div className='flex flex-col gap-2'>
              <button className='bg-blue-600 px-2 rounded opacity-75 hover:opacity-100 transition duration-300'>
                UserName
              </button>
              <p className='text-gray-500'>11.77 UTC</p>
            </div>
            <div>
              <p>
                <BiDotsHorizontalRounded className='text-white text-2xl hover:text-gray-400 transition duration-300' />
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <p className='text-gray-200'>
              Allhumdolillah world top Id 98324189
            </p>
            <h1 className='text-gray-200'>anbjhefb jhfewob</h1>
            <p className='text-gray-400'>forsage.io/b/dcalated</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Social;
