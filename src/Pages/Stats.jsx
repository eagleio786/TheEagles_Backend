import React, { useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import { RiShare2Line } from 'react-icons/ri';

const Stats = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const data = [
    { id: 1, date: '2025-01-01', level: 1, wallet: '100 USDT' },
    { id: 2, date: '2025-01-02', level: 2, wallet: '200 USDT' },
    { id: 3, date: '2025-01-03', level: 3, wallet: '300 USDT' },
    { id: 4, date: '2025-01-04', level: 4, wallet: '400 USDT' },
    { id: 5, date: '2025-01-05', level: 5, wallet: '500 USDT' },
    { id: 6, date: '2025-01-06', level: 6, wallet: '600 USDT' },
    { id: 7, date: '2025-01-07', level: 7, wallet: '700 USDT' },
  ];

  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 3);
  };
  return (
    <>
      {showToast && (
        <div className='fixed top-5 right-5 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl transform animate-quickAlert'>
          🔗 Link copied!
        </div>
      )}
      <div className='min-h-screen'>
        <div className='bg-Background pb-6 overflow-hidden'>
          <div className='overflow-auto  h-[700px]'>
            <table className='min-w-[500px] table-auto'>
              <thead className='text-textColor2 sticky top-0 z-10 bg-Background'>
                <tr className='border-b border-textColor2'>
                  <th className='py-3 ps-2 w-1/5 text-left'>Type</th>
                  <th className='py-3 text-left w-2/5'>Date</th>
                  <th className='py-3 text-left w-1/5'>ID</th>
                  <th className='py-3 text-left w-1/5'>Level</th>
                  <th className='py-3 text-left '>Wallet</th>
                </tr>
              </thead>
              <tbody className='overflow-x-auto'>
                {data.slice(0, visibleRows).map((user) => (
                  <tr key={user.id} className='text-textColor2 h-12'>
                    <td className='ps-3 w-1/5'>
                      <div className='h-5 w-5 rounded-full bg-[#d9d9d9]'></div>
                    </td>
                    <td className='w-1/5'>{user.date}</td>
                    <td className='w-1/5'>{user.id}</td>
                    <td className='w-1/5'>{user.level}</td>
                    <td className='w-[180px] translate-y-1/2 grid grid-cols-2 gap-4'>
                      {user.wallet}
                      <span className='flex gap-2'>
                        <IoCopy
                          className='text-textColor3 text-xl'
                          onClick={() => handleCopy('theeagles.io/******')}
                        />
                        <RiShare2Line className='text-textColor3 text-xl rotate-45' />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex justify-center mt-2'>
            <button
              onClick={handleShowMore}
              className='text-textColor3 w-3/4 rounded-lg py-3 font-medium bg-gradient-to-r from-[#01F7FF] to-[#9B51E0]'
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Stats;
