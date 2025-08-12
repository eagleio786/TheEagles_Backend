import React, { useState } from 'react';

const Partner = () => {
  const data = [
    {
      id: 1,
      date: '2025-01-01',
      address: 1234567,
      x3: '10 USDT',
      x4: '100 USDT',
    },
    {
      id: 2,
      date: '2025-01-02',
      address: 2234567,
      x3: '20 USDT',
      x4: '200 USDT',
    },
    {
      id: 3,
      date: '2025-01-03',
      address: 3234567,
      x3: '30 USDT',
      x4: '300 USDT',
    },
    {
      id: 4,
      date: '2025-01-04',
      address: 4234567,
      x3: '40 USDT',
      x4: '400 USDT',
    },
    {
      id: 5,
      date: '2025-01-05',
      address: 5234567,
      x3: '50 USDT',
      x4: '500 USDT',
    },
    {
      id: 6,
      date: '2025-01-06',
      address: 6234567,
      x3: '60 USDT',
      x4: '600 USDT',
    },
    {
      id: 7,
      date: '2025-01-07',
      address: 7234567,
      x3: '70 USDT',
      x4: '700 USDT',
    },
  ];

  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 3);
  };

  return (
    <div className='min-h-screen'>
      <div className='bg-Background pb-6 overflow-hidden'>
        <div className='overflow-auto h-[700px]'>
          <table className='min-w-[500px] table-auto'>
            <thead className='text-textColor2 sticky top-0 z-10 bg-Background'>
              <tr className='border-b border-textColor2'>
                <th className='py-3 ps-2 w-auto text-left'>Date</th>
                <th className='py-3 text-left w-auto'>Address</th>
                <th className='py-3 text-left w-auto'>ID</th>
                <th className='py-3 text-left w-auto'>x3</th>
                <th className='py-3 text-left w-auto pe-2'>x4</th>
              </tr>
            </thead>
            <tbody className='overflow-x-auto'>
              {data.slice(0, visibleRows).map((user) => (
                <tr key={user.id} className='text-textColor2 h-12'>
                  <td className='ps-3 w-[30%]'>{user.date}</td>
                  <td className='w-1/5'>{user.address}</td>
                  <td className='w-[10%]'>{user.id}</td>
                  <td className='w-1/5'>{user.x3}</td>
                  <td className='w-2/5'>{user.x4}</td>
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
  );
};
export default Partner;
