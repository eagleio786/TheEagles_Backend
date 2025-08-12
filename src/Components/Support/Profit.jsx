import { FaRegCircleCheck } from 'react-icons/fa6';

const Profit = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>• Profit</h1>
      <p>
        The levels of each program contain a fixed number of spots. Marketing
        profit is generated from the value of the level in which your downline
        partner occupied a spot.
      </p>
      <p>
        The Eagles marketing is built in such a way that income from one cycle
        is enough to activate the next level. As soon as all the spots in the
        level are filled, a new cycle automatically begins.
      </p>
      <p className='bg-green-100 flex p-3 rounded-lg'>
        <span className='w-20 text-green-600 mt-1'>
          <FaRegCircleCheck />{' '}
        </span>{' '}
        The number of cycles is not limited. A level activated once allows you
        to invite an unlimited number of new partners.
      </p>
    </div>
  );
};
export default Profit;
