import { FaRegFilePdf } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Education = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>💡 Education & Promotion</h1>
      <p>
        The Eagles also provides free educational and promotional materials, as
        well as onboarding courses and{' '}
        <span className='font-semibold'>24/7 support</span>.
      </p>
      <p className='flex flex-col gap-y-3'>
        <span className='font-semibold text-sm'>
          • The Eagles Academy:{' '}
          <Link to='#' className='text-[#714f93] underline'>
            https://community.theeagles.io/en/courses
          </Link>
        </span>
        <span className='font-semibold text-sm'>
          • The Eagles Community:{' '}
          <Link to='#' className='text-[#714f93] underline'>
            https://community.theeagles.io/
          </Link>
        </span>
        <span className='font-semibold text-sm'>
          • The Eagles Support:{' '}
          <Link to='#' className='text-[#714f93] underline'>
            https://support.theeagles.io/
          </Link>
        </span>{' '}
      </p>
      <div className='border border-[#dedddd] rounded-lg py-3 px-1 text-sm flex justify-between items-center'>
        <div className='flex gap-1'>
          <img
            src='assets/SupportImages/logo.png'
            alt='logo'
            className='w-10 h-auto'
          />
          <p className='w-10/12'>
            Add sticker set @theeaglesio_official on Telegram.
          </p>
        </div>
        <IoIosArrowForward />
      </div>

      <p>
        It will help to create promotional materials, promote the idea and
        philosophy of our community, and allow you to expand your team and
        attract more members.
      </p>
      <p className='italic'>
        You can find the following information in the brand book ⤵️
      </p>
      <p className='flex flex-col gap-y-3'>
        <span>• Horizontal and stacked logos</span>
        <span>• Icons with light and dark colors</span>
        <span>• Wordmark, gradients, construction</span>
        <span>• Logo use on photography</span>
        <span>• Safe space, minimum size</span>
        <span>• Logos misuse</span>
        <span>• Brand colors</span>
        <span>• Business cards</span>
        <span>• Social networks design</span>
      </p>
      <div className='text-center'>
        <img src='USDT image' alt='' className='h-36 w-full' />
        <p className='text-[#714f93] text-sm'>
          <Link to='#'>https://The Eagles.io/docs/brandBook.pdf</Link>
        </p>
      </div>
      <div className='border border-[#dedddd] rounded-lg p-3 flex'>
        <p className='w-16 flex justify-center flex-col items-center text-center  hover:text-black transition-all duration-500'>
          <FaRegFilePdf />
          <span className='text-sm text-[#817d86]'> 35MB</span>
        </p>
        <p className='ps-4 border-l border-[#dedddd] hover:text-[#714f93]  transition-all duration-500'>
          The BRANDBOOK of THE EAGLES I ENG.pdf
        </p>
      </div>
    </div>
  );
};
export default Education;
