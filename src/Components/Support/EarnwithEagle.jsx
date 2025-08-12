import { IoMdInformationCircleOutline } from 'react-icons/io';

const EarnwithEagle = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>
        💡 How much can you earn with Eagles
      </h1>
      <p>
        Your income is not limited. The platform does not impose any
        restrictions on the number of incoming transactions and amounts per
        account.
      </p>
      <p>
        The only way to earn here is to invite new partners to your team.
        Successful Eagles users are professionally engaged in promoting their
        business with Eagles on the Internet.
      </p>
      <p className='bg-[#f3f3f3] flex p-3 rounded-lg'>
        <span className='w-20 text-[#714f93] mt-1'>
          <IoMdInformationCircleOutline />
        </span>{' '}
        <span>
          More than 50 Eagles members, using the most basic tools like{' '}
          <span className='font-semibold '>Youtube</span>,{' '}
          <span className='font-semibold'>Instagram</span>, or{' '}
          <span className='font-semibold'>personal blogs</span>, managed to earn
          a million dollars.
        </span>
      </p>
    </div>
  );
};
export default EarnwithEagle;
