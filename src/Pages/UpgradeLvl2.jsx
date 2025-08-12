import { GoPeople } from 'react-icons/go';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { PiWarningCircleLight } from 'react-icons/pi';

const UpgradeLvl4 = () => {
  return (
    <>
      <div className='pt-4 pb-8'>
        <div className='h-1/2 w-1/4 mx-auto bg-[rgba(21,15,77,0.9)] rounded-full shadow-[0_0_200px_50px_rgba(21,15,77,1),0_0_300px_100px_rgba(21,15,77,1)]'></div>
        <div className='px-3 flex justify-between mt-7'>
          <h1 className='w-1/4 text-2xl text-textColor3 font-semibold'>
            Upgrade x2
          </h1>
          <div className='px-2 py-3 rounded-lg h-[160px]  shadow-lg shadow-[#5a5775e6] w-1/2 me-4 bg-textColor bg-opacity-50'>
            <div className='flex justify-between'>
              <h3 className='text-base text-textColor2'>Lvl 1</h3>
              <p className='flex gap-1 items-center text-textColor3'>
                <div className='h-3 w-3 rounded-full flex justify-center items-center'>
                  <img
                    src='/assets/LoginImages/tether.png'
                    alt=''
                    className='h-[12px] w-auto'
                  />
                </div>
                5
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col items-center my-2 gap-y-2 leading-4'>
                <div className=''>
                  <div className='h-9 w-9 rounded-full bg-[linear-gradient(135deg,_#a67912_50%,_#26a17b_50%)] shadow-xl shadow-[#a67912]'></div>
                </div>
                <div className='flex gap-x-4'>
                  <div className='h-6 w-6 rounded-full bg-[#a67912]'></div>
                  <div className='h-6 w-6 rounded-full bg-[#a67912]'></div>
                  <div className='h-6 w-6 rounded-full bg-[linear-gradient(135deg,_#a67912_50%,_#26a17b_50%)] shadow-xl shadow-[#a67912]'></div>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='flex gap-1 items-center text-textColor3'>
                  <GoPeople className='text-textColor2' />
                  22
                </p>
                <p className='flex gap-1 items-center text-textColor3'>
                  <HiOutlineArrowPath className='text-textColor2' />
                  00
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='py-7 px-3 space-y-4 border-b border-textColor2'>
          <div className='flex justify-between text-xs'>
            <h3 className='text-textColor2'>Number of places for re-cycle</h3>
            <p className='text-textColor3 flex gap-1 items-center'>
              4
              <span>
                <GoPeople />
              </span>
            </p>
          </div>
          <div className='flex justify-between text-xs'>
            <h3 className='text-textColor2'>Net reward for every cycle</h3>
            <p className='text-textColor3'>10.00000 USDT</p>
          </div>
          <div className='flex justify-between text-xs'>
            <h3 className='text-textColor2'>Level cycle profit</h3>
            <p className='text-textColor3 flex gap-1 items-center'>
              70 %
              <span className='text-green-700'>
                <HiOutlineArrowPath />
              </span>
            </p>
          </div>
          <div className='flex justify-between text-xs'>
            <h3 className='text-textColor2'>Max automatic re-cycle</h3>
            <p className='text-textColor3'>∞</p>
          </div>
        </div>
        <div className='py-7 px-3 space-y-2 border-b border-textColor2'>
          <div className='text-textColor text-sm font-medium flex justify-between'>
            <h1>Upgrade Amount</h1>
            <p>
              5 USDT (<span className='text-landingtext'>0.001 BNB</span>)
            </p>
          </div>
        </div>
        <div className='py-7 px-3 space-y-4'>
          <div className='text-sm text-textColor2 flex justify-between items-center'>
            <p>Network check (Smart chain)</p>
            <PiWarningCircleLight className='text-[16px] text-red-700' />
          </div>
          <div className='text-sm text-textColor2 flex justify-between items-center'>
            <p>Balance check 5 USDT</p>
            <div className='h-[13px] w-[13px] me-[2px] rounded-full border border-textColor2'></div>
          </div>
          <div className='text-sm text-textColor2 flex justify-between items-center'>
            <p>Approved USDT</p>
            <div className='h-[13px] w-[13px] me-[2px] rounded-full border border-textColor2'></div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] shadow-md shadow-[#53532479]  w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-12 text-textColor3 font-medium rounded-lg'>
          <button>Check Again</button>
        </div>
      </div>
    </>
  );
};

export default UpgradeLvl4;
