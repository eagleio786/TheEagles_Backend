import { Link } from 'react-router-dom';
import program from '/assets/HomeImages/Coming.png';

const ComingSoon = () => {
  return (
    <div className='bg-Background w-full h-auto flex flex-col justify-center rounded-xl items-center mt-1 py-4 px-5'>
      <img src={program} className='mb-4 h-20 w-20' />
      <h1 className='text-4xl text-textColor3 text-center font-serif font-medium'>
        UpComing Programs
      </h1>
      <Link to='#' className='w-full'>
        <div className='bg-gradient-to-r from-[#5b4fc6] to-[#170e61] rounded-full flex justify-center items-center py-2 mt-6 font-medium'>
          <button className='text-lg text-white'>Go to Program</button>
        </div>
      </Link>
    </div>
  );
};
export default ComingSoon;
