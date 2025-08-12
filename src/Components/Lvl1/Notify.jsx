import { GoArrowUpRight } from 'react-icons/go';
import bgImage from '/assets/lvl1Images/Group 2.png';

const Notify = () => {
  return (
    <>
      <div className='w-full flex justify-center'>
        <div
          className='h-[240px] w-auto bg-auto  bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className='relative mt-12  w-full'>
            <GoArrowUpRight className='text-textColor3 mt-5 text-lg ms-auto me-10 absolute -top-7 right-7' />
            <h1 className='text-lg font-semibold text-textColor3 w-1/2 mx-auto'>
              Official <span className='text-landingtext'>Notify Bot</span> for
              USDT.The Eagles.io Users
            </h1>
          </div>
          <p className='text-textColor3 w-1/2 mt-3 text-xs mx-auto text-center'>
            Here you can get notifications all the event in your account
          </p>
        </div>
      </div>
    </>
  );
};
export default Notify;
