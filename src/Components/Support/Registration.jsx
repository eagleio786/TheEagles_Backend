import { IoMdInformationCircleOutline } from 'react-icons/io';

const Registration = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>• Registration</h1>
      <p>
        Registration is the activation of first levels in The Eagles x1 and x2
        programs in our blockchain.
      </p>
      <p className='bg-[#f3f3f3] flex p-3 rounded-lg gap-2'>
        <span className='w-6 text-[#714f93] mt-1'>
          <IoMdInformationCircleOutline />
        </span>
        <span>
          The first levels in&nbsp;
          <span className='font-semibold'>x1</span> and{' '}
          <span className='font-semibold'>x2 programs</span> are always
          activated together and cannot be accessed sparately.
        </span>
      </p>

      <p>
        All the following levels can be purchased one by one, in ascending
        order. Registration transaction is credited to the smart contract.
      </p>
      <p>
        The smart contract records your wallet number into the structure and
        redirects the funds to the personal wallet of the person that invited
        you (your upline partner).
      </p>
      <p>
        You occupy a free spot in their first level of x1 program and the first
        level of x2 program. Level 1 of x1 and Level 1 of x2 are respectively
        opened for you, and now you can invite partners through your personal
        referral link.
      </p>
      <p>
        After activation of the first levels of x1 and x2 programs, the xXx (in
        The Eagles USDT) and xGold program activation becomes available.
      </p>
      <p className='font-semibold'>
        Learn more about The Eagles USDT marketing here ⤵️
      </p>
      <div className='flex justify-center items-center'>
        <iframe
          width='560'
          height='200'
          src='https://www.youtube.com/embed/YOUR_VIDEO_ID'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default Registration;
