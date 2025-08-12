import { FaRegFilePdf } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Platform = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-3xl font-bold'>💡 The Eagles Platforms</h1>
      <h2 className='text-2xl font-bold'> • The Eagles USDT</h2>
      <div className='text-center'>
        <img src='USDT image' alt='' className='h-36 w-full' />
        <p className='text-[#714f93] text-sm'>
          <Link to='#'>https://USDT.theeagles.io</Link>
        </p>
      </div>
      <div className='border border-[#dedddd] rounded-lg p-3 flex'>
        <p className='w-16 flex justify-center flex-col items-center text-center  hover:text-black transition-all duration-500'>
          <FaRegFilePdf />
          <span className='text-sm text-[#817d86]'>2MB</span>
        </p>
        <p className='ps-4 border-l border-[#dedddd] hover:text-[#714f93]  transition-all duration-500'>
          The PRESENTATION of THE EAGLES USDT I ENG.pdf
        </p>
      </div>
      <p>
        The Eagles USDT is the latest and most popular marketing program at the
        moment.
      </p>
    </div>
  );
};
export default Platform;
