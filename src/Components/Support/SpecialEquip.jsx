import { FaRegCircleCheck } from 'react-icons/fa6';

const SpecialEquip = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>
        • No Special Equipment or Knowledge Required
      </h1>
      <p>
        All you need to interact with the platform is a smartphone, tablet, or
        computer. No special equipment is required. You also don’t need any
        special education or experience to build your online business with The
        Eagles.
      </p>
      <p className='bg-green-100 flex p-3 rounded-lg'>
        <span className='w-20 text-green-600 mt-1'>
          <FaRegCircleCheck />{' '}
        </span>{' '}
        You can learn everything you need on the go, as you create your The
        Eagles account.
      </p>
      <p>
        The Eagles is a community that grows naturally by inviting new partners,
        so the person who invited you can walk you through all the steps and
        ensure you get everything right.
      </p>
    </div>
  );
};
export default SpecialEquip;
