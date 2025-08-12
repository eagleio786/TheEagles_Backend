import React, { useState } from 'react';
import { BsFillQuestionCircleFill, BsShare } from 'react-icons/bs';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { GoArrowUp } from 'react-icons/go';

const Links = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    if (!dropDown) {
      setDropDown(true);
    } else {
      setDropDown(false);
    }
  };

  return (
    <div className='h-auto'>
      <div className='bg-Background h-96 p-3'>
        <div>
          <div className='flex items-start gap-10'>
            <div
              className='flex gap-2 text-white items-center'
              onClick={handleDropDown}
            >
              <h3 className='text-textColor2'>
                New partners by <span className='text-textColor3'>month</span>
              </h3>
              <span>{dropDown ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {dropDown && (
              <div className='bg-[#7E7E7E] w-24 rounded-lg absolute top-20 right-0 me-5'>
                <h3 className='p-3 py-2 text-lg text-textColor2'>Year</h3>
                <hr />
                <h3 className='p-3 py-2 text-lg text-textColor3'>Month</h3>
              </div>
            )}
          </div>
          <div className='flex gap-5 mt-5'>
            <button className='p-5 py-1 text-[#110958] bg-textColor2 rounded-full'>
              January
            </button>
            <button className='p-5 py-1 text-[#110958] bg-textColor2 rounded-full'>
              2025
            </button>
          </div>
        </div>
        <div>
          <ul className='mt-14 w-[85%] text-2xl p-2 text-textColor2 text-end'>
            <li className='mt-2'>4</li>
            <li className='mt-2'>2</li>
            <li className='mt-2'>1</li>
            <li className='mt-2 flex justify-between items-center'>
              <span className=' font-bold text-[#110958]'>
                --------------------{' '}
              </span>
              0
            </li>
          </ul>
        </div>
      </div>

      <div className='w-full h-auto mt-8 pb-3 px-3 flex justify-between gap-2'>
        <div className='bg-Background px-2 py-3 w-1/2 rounded-lg bg-person2'>
          <p className='text-textColor2 font-sans text-base flex gap-2 items-center'>
            Partners
            <span className='bg-[#5c5c5c] rounded-full p-1 mt-1'>
              <BsShare className='text-textColor3' />
            </span>
          </p>
          <p className='text-3xl text-textColor3'>0</p>
          <div className='w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full  bg-[#a67912] bg-opacity-20'>
            <div className='flex items-center text-textColor3 font-medium text-xl'>
              <GoArrowUp /> 0
            </div>
            <div className='gradient-circle'></div>
          </div>
        </div>
        <div className='bg-Background px-2 py-3 w-1/2 rounded-lg bg-person3'>
          <p className='text-textColor2 font-sans text-base flex gap-2 items-center'>
            Team
            <span className='bg-[#5c5c5c] rounded-full p-1 mt-1'>
              <BsShare className='text-textColor3' />
            </span>
          </p>
          <p className='text-3xl text-textColor3'>0</p>
          <div className='w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full  bg-[#a67912] bg-opacity-20'>
            <div className='flex items-center text-textColor3 font-medium text-xl'>
              <GoArrowUp /> 0
            </div>
            <div className='gradient-circle'></div>
          </div>
        </div>
      </div>

      <div className='bg-Background px-3 py-3 w-1/2 mx-auto mt-4 mb-5 rounded-lg'>
        <p className='text-textColor2 font-sans text-base flex gap-2 items-center'>
          Links Clicks
          <BsFillQuestionCircleFill className=' text-textColor3' />
        </p>
        <p className='text-3xl text-textColor3'>0</p>
        <div className='w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full  bg-[#a67912] bg-opacity-20'>
          <div className='flex items-center text-textColor3 font-medium text-xl'>
            <GoArrowUp /> 0
          </div>
          <div className='gradient-circle'></div>
        </div>
      </div>
    </div>
  );
};
export default Links;
