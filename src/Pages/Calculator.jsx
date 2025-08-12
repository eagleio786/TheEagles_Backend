import React, { useState } from 'react';

const Calculator = () => {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(0);
  const [active, setActive] = useState('X1');
  const [activepara, setActivepara] = useState(
    'Basic matrix program, which is best for those who are self-reliant and prefer independent development'
  );

  const number = [
    { num: 1, value: 2.5 },
    { num: 2, value: 5 },
    { num: 3, value: 10 },
    { num: 4, value: 20 },
    { num: 5, value: 40 },
    { num: 6, value: 80 },
    { num: 7, value: 160 },
    { num: 8, value: 320 },
    { num: 9, value: 640 },
    { num: 10, value: 1280 },
    { num: 11, value: 2560 },
    { num: 12, value: 5120 },
  ];

  const handleLevel = (i) => {
    setSelected(i);
    setValue(number[i].value);
  };

  const handleValueX1 = () => {
    setActive('X1');
    setValue(i[0]);
    setActivepara(
      'Basic matrix program, which is best for those who are self-reliant and prefer independent development'
    );
  };

  const handleValueX2 = () => {
    setActive('X2');
    setValue(0);
    setActivepara(
      'More advanced program, designed for team work. Results are achieved here through direct partners, as well as through spillovers from other participants.'
    );
  };

  return (
    <div className='bg-black text-textColor3 p-2 pt-5'>
      <div className='text-center'>
        <h1 className='text-md font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent'>
          The Eagles.io Participant
        </h1>
        <h3 className='text-md'>Calculator</h3>
        <p className='my-5 w-[70%] mx-auto text-[13px] text-textColor2'>
          Calculate your potential result from participating in The Eagles.io by
          selecting levels to activate below. The results are calculations for 1
          cycle of all selected levels.
        </p>

        <div
          className={`bg-gradient-to-r w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-4 text-textColor3 font-medium rounded-lg ${active === 'X1'
            ? 'from-[#01F7FF] to-[#9B51E0]'
            : 'from-[#000000] to-[#747474]'
            }`}
          onClick={handleValueX1}
        >
          <button>x1</button>
        </div>
        <div
          className={`bg-gradient-to-r w-3/4 mx-auto flex items-center justify-center px-8 py-3 mt-4 text-textColor3 font-medium rounded-lg  ${active === 'X2'
            ? 'from-[#01F7FF] to-[#9B51E0]'
            : 'from-[#000000] to-[#747474]'
            }`}
          onClick={handleValueX2}
        >
          <button>x2</button>
        </div>
      </div>
      <div className='bg-Background text-white mt-5 py-3'>
        <div className='flex items-center px-3'>
          <h3 className='p-2 bg-[#01F7FF] rounded-full px-3'>{active}</h3>
          <h3 className='ml-5'>The Eagles.io</h3>
        </div>
        <p className='text-[13px] text-textColor2 mt-3 px-3'>{activepara}</p>
        <div className='mt-4 w-[85%] flex gap-6 flex-wrap px-3'>
          {number.map((num, i) => {
            return (
              <div
                key={i}
                className={`h-10 w-10 rounded-full flex items-center justify-center ${selected === i ? 'bg-[#a67912]' : 'bg-[#4E4E4E]'
                  }`}
                onClick={() => handleLevel(i)}
              >
                {num.num}
              </div>
            );
          })}
        </div>
        <p className='text-[13px] text-textColor2 mt-3 mb-2 px-3'>
          Cost of all selected slots
        </p>
        <hr />
        <p className='text-[13px] text-textColor2 mt-3 px-3'>
          Result of all selected
        </p>
        <h2 className='text-textColor3 text-2xl font-semibold px-3'>
          {value} USDT
        </h2>
      </div>
    </div>
  );
};
export default Calculator;