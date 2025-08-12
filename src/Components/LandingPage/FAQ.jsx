import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdQuestionMark } from 'react-icons/md';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'Why is The Eagles.io the best alternative to trading?',
      answer:
        'The Eagles.io provides an innovative platform for trading that is safe, efficient, and user-friendly.',
    },
    {
      question: 'Is The Eagles.io safe?',
      answer:
        'Yes, The Eagles.io implements advanced security measures to ensure your data and transactions are secure.',
    },
    {
      question: 'How much does it cost to participate in The Eagles.io USDT?',
      answer:
        'Participation in The Eagles.io is free; however, trading fees may apply.',
    },
    {
      question: 'What do I need to get started in The Eagles.io?',
      answer:
        'You need to sign up, verify your account, and deposit funds to start trading.',
    },
    {
      question: 'How do I start?',
      answer:
        'Sign up on the website, complete the verification process, and start exploring the platform.',
    },
  ];

  return (
    <div className='relative h-auto mt-14 flex flex-col pb-8'>
      <h1 className='text-textColor2 text-2xl ms-6 font-semibold mb-6'>
        Frequently Asked Questions
      </h1>
      <div className='relative w-full px-4'>
        <MdQuestionMark className='text-textColor2 text-[200px] absolute -top-5 left-0 -z-10 opacity-30' />
        <MdQuestionMark className='text-textColor2 text-[200px] absolute -bottom-5 right-11 rotate-180 -z-10 opacity-30' />

        <div className='bg-transparent relative z-10'>
          {faqData.map((faq, index) => (
            <div key={index} className='border-b-2 border-textColor2'>
              <div
                className='flex justify-between items-center cursor-pointer text-textColor2 text-lg py-4 pb-2 px-3'
                onClick={() => toggleFAQ(index)}
              >
                <span className='w-[85%] text-sm'>{faq.question}</span>
                <span
                  className={`text-textColor2 text-base p-2 border-2 rounded-full border-[#00F6FF]  transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                    }`}
                >
                  <IoIosArrowDown />
                </span>
              </div>
              {activeIndex === index && (
                <p className='mt-2 text-gray-400 text-xs py-2 px-3'>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
