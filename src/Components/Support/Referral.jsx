import { IoIosArrowForward } from 'react-icons/io';

const Referral = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>• Referral link</h1>
      <p>
        All personal partners whom you invite are assigned to you forever, and
        this cannot be changed, since the data is recorded in the blockchain.
      </p>
      <p>
        {' '}
        Also, your referral linkage remains{' '}
        <span className='font-semibold'>unchanged</span>, you can't change your
        upline partner.
      </p>
      <div className='border border-[#dedddd] rounded-lg py-3 px-1 text-sm flex justify-between items-center hover:border-[#714f93] hover:text-[#714f93] transition-all duration-500'>
        <p className='w-10/12'>About Personal Link</p>
        <IoIosArrowForward />
      </div>
    </div>
  );
};
export default Referral;
