import React, { useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import { RiShare2Line } from 'react-icons/ri';

const UserTable = ({ apiData }) => {
  const [showToast, setShowToast] = useState(false);

  const allRef = apiData?.referredUsers || [];

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
      <div className='bg-Background pb-6 mb-5 overflow-hidden'>
        <div className='overflow-auto h-48'>
          <table className='min-w-[500px] table-auto'>
            <thead className='text-textColor2 sticky top-0 z-10 bg-Background'>
              <tr className='border-b border-textColor2'>
                <th className='py-3 ps-2 w-1/5 text-left'>Type</th>
                <th className='py-3 text-left w-2/5'>Date</th>
                <th className='py-3 text-left w-1/5'>ID</th>
                <th className='py-3 text-left w-1/5'>Address</th>
                <th className='py-3 text-left '>Profit</th>
              </tr>
            </thead>
            <tbody className='overflow-x-auto'>
              {allRef.slice(0, visibleRows).map((user) => (
                <tr key={user.id} className='text-textColor2 h-12'>
                  <td className='ps-3 w-1/5'>
                    <div className='h-5 w-5 rounded-full bg-[#d9d9d9]'></div>
                  </td>
                  <td className='w-1/5'>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ''}
                  </td>
                  <td className='w-1/5'>{user.id}</td>
                  <td className='w-1/5'>{user.Personal.slice(0, 8) + '...'}</td>
                  <td className='w-[180px] translate-y-1/2 grid grid-cols-2 gap-4'>
                    {user.totalUSDTReceived.$numberDecimal / 1e18}
                    <span className='flex gap-2'>
                      <IoCopy
                        className='text-textColor3 text-xl'
                        onClick={() => handleCopy(user.Personal)}
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
            className='text-textColor3 w-3/4 rounded-lg shadow-xl shadow-[#00000079]  py-3 font-medium bg-gradient-to-r from-[#01F7FF] to-[#9B51E0]'
          >
            See More
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTable;
