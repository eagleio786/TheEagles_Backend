import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsTriangleFill } from 'react-icons/bs';
import { HiLink } from 'react-icons/hi';
import { IoCopy } from 'react-icons/io5';

const Contract = ({ ApiUrl }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalTurnover, setTotalTurnover] = useState(0);
  const [last24HoursTurnover, setLast24HoursTurnover] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`https://reffaralmoney.com/getAllUsers`).then((res) => {
      const users = res.data.data;
      setTotalUsers(users.length);

      const totalTxns = users.reduce(
        (sum, user) => sum + user.totalTransactions,
        0
      );
      const totalUsdtReceived = users.reduce(
        (sum, user) =>
          sum + parseFloat(user.totalUSDTReceived?.$numberDecimal || 0),
        0
      );

      setTotalTransactions(totalTxns);
      setTotalTurnover((totalUsdtReceived / 1e18).toFixed(2));

      const last24Hours = new Date();
      last24Hours.setDate(last24Hours.getDate() - 1);
      const last24HoursTurnover = users.reduce((sum, user) => {
        return (
          sum +
          user?.transactions
            ?.filter((txn) => new Date(txn.timestamp) >= last24Hours)
            .reduce(
              (txnSum, txn) =>
                txnSum + parseFloat(txn.amount?.$numberDecimal || 0),
              0
            )
        );
      }, 0);

      setLast24HoursTurnover((last24HoursTurnover / 1e18).toFixed(2));
    });
  }, [ApiUrl]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

  return (
    <>
      <div className='bg-[#171B26] shadow-xl shadow-[#00000079] w-full h-full rounded-lg mt-1 pb-4'>
        {showToast && (
          <div className='fixed top-5 right-5 z-50 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl animate-quickAlert'>
            🔗 Link copied!
          </div>
        )}
        <h1 className='text-textColor2 border-b border-textColor2 flex justify-between items-center px-3 py-4'>
          The Eagles USDT contract
          <span
            className='bg-[#08EDFD] h-8 w-8 flex justify-center items-center rounded-full cursor-pointer'
            onClick={toggleVisibility}
          >
            <BsTriangleFill
              className={`text-textColor3 transform transition-transform duration-300 ${isVisible ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </span>
        </h1>

        {isVisible && (
          <div>
            <div className='flex justify-between py-4 px-3 border-b border-textColor2'>
              <p className='text-textColor2'>x1/x2</p>
              <p className='flex gap-2 text-textColor3 items-center'>
                0x55...a32{' '}
                <span>
                  <IoCopy
                    onClick={() => handleCopy('theeagles.io/******')}
                    className='cursor-pointer'
                  />
                </span>
                <span>
                  <HiLink />
                </span>
              </p>
            </div>
            <div className='py-4 px-3 border-b border-textColor2'>
              <label className='text-textColor2'>Filter: </label>
              <select
                className='bg-[#08EDFD] text-white rounded px-2 py-1'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value='all'>All Time</option>
                <option value='24h'>Last 24 Hours</option>
              </select>
            </div>
            <div className='space-y-1 py-4 px-3 border-b border-textColor2'>
              <h1 className='text-textColor2'>Total Users</h1>
              <p className='text-[#08EDFD]'>{totalUsers.toLocaleString()}</p>
            </div>
            <div className='space-y-1 py-4 px-3 border-b border-textColor2'>
              <h1 className='text-textColor2'>Transactions Made</h1>
              <p className='text-[#08EDFD]'>
                {totalTransactions.toLocaleString()}
              </p>
              <p className='text-white flex'></p>
            </div>
            <div className='space-y-1 pt-4 px-3'>
              <h1 className='text-textColor2'>Turnover, USDT</h1>
              <p className='text-[#08EDFD]'>{totalTurnover}</p>
              <p className='text-white flex'>
                {filter === '24h' ? last24HoursTurnover : totalTurnover}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contract;
