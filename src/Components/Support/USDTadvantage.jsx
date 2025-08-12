import { FaRegCircleCheck } from 'react-icons/fa6';

const USDTadvantage = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>The Advantages of The Eagles USDT:</h1>
      <p className='flex flex-col gap-y-3'>
        <span>• Speedy transactions</span>
        <span>• Low fees (less than $1)</span>
        <span>• A steady price pegged to the US dollar</span>
        <span>• All USDT supply is backed by USD</span>
        <span>• Tether approved</span>
      </p>
      <p>
        {' '}
        The fact that USDT equals USD makes it easier to engage new partners and
        explain the mechanics of the platform.
      </p>
      <p className='flex flex-col gap-y-3'>
        <span>1. BSC</span>
        <span>2. BEP-20</span>
        <span>3. Entry cost: 10 USDT</span>
      </p>
      <p className='bg-green-100 flex p-3 rounded-lg'>
        <span className='w-20 text-green-600 mt-1'>
          <FaRegCircleCheck />{' '}
        </span>{' '}
        2 programs available: x1, x2
      </p>
    </div>
  );
};
export default USDTadvantage;
