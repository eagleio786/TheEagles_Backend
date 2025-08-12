import React from 'react';
import {
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaRegFileAlt,
  FaTiktok,
  FaInstagram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Social = () => {
  return (
    <div className='text-textColor3 pb-10'>
      <h2 className='text-2xl font-bold mb-8 ms-6'>Official Channels</h2>
      <div className='grid grid-cols-3 gap-x-10 px-2 gap-y-9 justify-center mb-12'>
        <Link
          to='https://www.instagram.com/theeagles786'
          className='flex flex-col items-center'
        >
          <div className='p-[2px] bg-gradient-to-r  from-[#9B51E0] to-[#00F6FF] rounded-full'>
            <div className='bg-black h-20 w-20 flex justify-center items-center rounded-full'>
              <FaInstagram className='text-textColor3 text-4xl' />
            </div>
          </div>
          <p className='text-sm mt-2 text-textColor2'>Instagram</p>
        </Link>
        <Link
          to='https://www.tiktok.com/@theeapzlwm4?_t=ZS-8tMNEoaEiv4&_r=1'
          className='flex flex-col items-center'
        >
          <div className='p-[2px] bg-gradient-to-r  from-[#9B51E0] to-[#00F6FF] rounded-full'>
            <div className='bg-black h-20 w-20 flex justify-center items-center rounded-full'>
              <FaTiktok className='text-textColor3 text-4xl' />
            </div>
          </div>
          <p className='text-sm mt-2 text-textColor2'>Tiktok</p>
        </Link>
        <Link
          to='https://x.com/theeagles727493?t=5LOE9H8FwdDMF2wUtfYy7w&s=09'
          className='flex flex-col items-center'
        >
          <div className='p-[2px] bg-gradient-to-r  from-[#9B51E0] to-[#00F6FF] rounded-full'>
            <div className='bg-black h-20 w-20 flex justify-center items-center rounded-full'>
              <FaTwitter className='text-textColor3 text-4xl' />
            </div>
          </div>
          <p className='text-sm mt-2 text-textColor2'>Twitter</p>
        </Link>
        <Link
          to='https://www.facebook.com/share/18FkUDzNLf/'
          className='flex flex-col items-center'
        >
          <div className='p-[2px] bg-gradient-to-r  from-[#9B51E0] to-[#00F6FF] rounded-full'>
            <div className='bg-black h-20 w-20 flex justify-center items-center rounded-full'>
              <FaFacebookF className='text-textColor3 text-4xl' />
            </div>
          </div>
          <p className='text-sm mt-2 text-textColor2'>Facebook</p>
        </Link>
        <Link
          to='https://www.youtube.com/@MrAmtazKallu'
          className='flex flex-col items-center'
        >
          <div className='p-[2px] bg-gradient-to-r  from-[#9B51E0] to-[#00F6FF] rounded-full'>
            <div className='bg-black h-20 w-20 flex justify-center items-center rounded-full'>
              <FaYoutube className='text-textColor3 text-4xl' />
            </div>
          </div>
          <p className='text-sm mt-2 text-textColor2'>Youtube</p>
        </Link>
      </div>
      <div className='flex flex-wrap items-center w-full px-2 text-textColor3 font-medium'>
        <div className='flex items-center gap-2 w-1/2 h-full'>
          <img
            src='/assets/LandingImages/tether.png'
            alt=''
            className='h-[18px] w-[18px]'
          />
          <p className='text-sm'>The Eagles.io USDT</p>
        </div>
        <div className='flex items-center gap-2 w-1/2 h-full'>
          <FaRegFileAlt className='text-lg' />
          <p className='text-sm'>The Eagles.io Support</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
