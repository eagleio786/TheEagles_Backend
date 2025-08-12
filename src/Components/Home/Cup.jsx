import { GoTrophy } from 'react-icons/go';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Cup = () => {
  const rewards = [
    {
      id: '1',
      Icon: <GoTrophy className='text-2xl' />,
    },
    {
      id: '2',
      Icon: <GoTrophy className='text-2xl' />,
    },
    {
      id: '3',
      Icon: <GoTrophy className='text-2xl' />,
    },
    {
      id: '4',
      Icon: <GoTrophy className='text-2xl' />,
    },
    {
      id: '5',
      Icon: <GoTrophy className='text-2xl' />,
    },
    {
      id: '6',
      Icon: <GoTrophy className='text-2xl' />,
    },
  ];
  return (
    <>
      <div className='bg-Background w-full h-auto rounded-lg px-2 mt-1 pb-2'>
        <div className='flex gap-4'>
          {rewards.map((reward, index) => {
            return (
              <div
                key={index}
                className='hexagon flex items-center justify-center mt-3 text-[#7a7a7a] bg-[#b4b4b4] w-12 h-12'
              >
                {reward.Icon}
              </div>
            );
          })}
        </div>
        <p className='text-textColor3 text-lg font-medium mt-6 text-center'>
          <Link to='#' className='flex gap-2 items-center justify-center'>
            Show all
            <MdKeyboardDoubleArrowRight className='text-2xl' />
          </Link>
        </p>
      </div>
    </>
  );
};
export default Cup;
