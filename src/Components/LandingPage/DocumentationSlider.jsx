import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { HiArrowPathRoundedSquare, HiOutlineArrowPath } from 'react-icons/hi2';
import { BsEmojiSmile } from 'react-icons/bs';
import { GoFileSymlinkFile } from 'react-icons/go';
import { TbEyeCheck } from 'react-icons/tb';
import { FaWallet } from 'react-icons/fa';

const DocumentationSlider = () => {
  const slides = [
    {
      icon: <HiOutlineArrowPath />,
      title: 'Documentation',
      subtitle:
        'No one,not even the creation of the code, can make changes to the work of The Eagles.io smart contracts',
    },
    {
      icon: <BsEmojiSmile />,
      title: 'Autonomy',
      subtitle:
        'The smart contract technologies, which are fully autonomous and do not rely on human intervention, are the foundation of the The Eagles ecosystem.',
    },
    {
      icon: <GoFileSymlinkFile />,
      title: 'Unchanging conditions',
      subtitle:
        'Since the algorithm is stored on the blockchain, nobody can alter, cancel, or interfere with your transactions—not even the original creators of the concept.',
    },
    {
      icon: <TbEyeCheck />,
      title: 'Transparency',
      subtitle:
        'Anybody can see the complete transaction history at any moment, and the smart contract code is kept in the public domain. This guarantees equitable circumstances and trustworthy data that you can trust.',
    },
    {
      icon: <FaWallet />,
      title: 'Full automation',
      subtitle:
        'Every transaction between members of the community happens straight from one wallet to another. Because The Eagles does not hold your assets, participants do not have accounts within the system from which they can withdraw money.',
    },
    {
      icon: <HiArrowPathRoundedSquare />,
      title: 'Decentralization',
      subtitle:
        'The functionality of The Eagles smart contracts cannot be altered by anybody, not even the coders.',
    },
  ];
  return (
    <>
      <div className=' mt-8'>
        <h1 className='text-textColor2 text-xl font-semibold w-4/5 mx-auto'>
          Technology of smart contracts and non-fungible token
        </h1>
        <p className='text-textColor2 text-xs mt-4 w-4/5 mx-auto'>
          Decentralized marketing is proved by the revolutionary technology of
          smart contract. The Eagles.io smart contract code is completely open.
          You can be sure of its safely and long-term performance.
        </p>

        <div className='h-auto w-4/5 mx-auto mt-7 bg-Background rounded-lg'>
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className='mySwiper h-full'
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className='px-5 py-3 text-center'>
                <div className='text-textColor2 text-4xl bg-gradient-to-b mt-3 from-[#9B51E0] to-[#00F6FF] inline-block p-3 rounded-full'>
                  {slide.icon}
                </div>
                <p className='text-lg font-medium mt-8 text-textColor3'>
                  {slide.title}
                </p>
                <p className='text-xs mt-4 mb-10 text-textColor2'>
                  {slide.subtitle}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default DocumentationSlider;
