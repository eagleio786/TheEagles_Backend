import React from 'react';
import p1 from '/assets/Rewords/r1.png';
import p2 from '/assets/Rewords/r2.png';
import p3 from '/assets/Rewords/r3.png';
import p4 from '/assets/Rewords/r4.png';
import p5 from '/assets/Rewords/r5.png';
import p6 from '/assets/Rewords/r6.jpeg';
import p7 from '/assets/Rewords/r7.png';
import p8 from '/assets/Rewords/r8.png';
import p9 from '/assets/Rewords/r9.png';
import p10 from '/assets/Rewords/r10.png';
import p11 from '/assets/Rewords/r11.png';
import p12 from '/assets/Rewords/r12.png';
import p13 from '/assets/Rewords/r13.png';
import p14 from '/assets/Rewords/r14.png';
import p15 from '/assets/Rewords/r15.png';

const SocialRewards = () => {
  const RewordsImages = [
    {
      MainTile: 'Profit USDT',
      images: [
        { imge: p1, tilte: 'wood' },
        { imge: p2, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p4, tilte: 'Shapiher' },
        { imge: p5, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Personal Partner',
      images: [
        { imge: p6, tilte: 'wood' },
        { imge: p7, tilte: 'silver' },
        { imge: p8, tilte: 'Gold' },
        { imge: p9, tilte: 'Shapiher' },
        { imge: p10, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Teams',
      images: [
        { imge: p11, tilte: 'wood' },
        { imge: p12, tilte: 'silver' },
        { imge: p13, tilte: 'Gold' },
        { imge: p14, tilte: 'Shapiher' },
        { imge: p15, tilte: 'Nebwei' },
      ],
    },
    {
      MainTile: 'Profit BND',
      images: [
        { imge: p4, tilte: 'wood' },
        { imge: p5, tilte: 'silver' },
        { imge: p3, tilte: 'Gold' },
        { imge: p12, tilte: 'Shapiher' },
        { imge: p15, tilte: 'Nebwei' },
      ],
    },
  ];

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto'>
      {RewordsImages.map((category, index) => (
        <div key={index} className='mb-4'>
          <h3 className='text-white font-semibold mb-2'>{category.MainTile}</h3>
          <hr className='border-gray-700 mb-3' />
          <div className='grid grid-cols-3 gap-4'>
            {category.images.map((img, imgIndex) => (
              <div key={imgIndex} className='flex flex-col items-center'>
                <div className='w-16 h-16 rounded-full overflow-hidden'>
                  <img
                    src={img.imge}
                    alt={img.tilte}
                    className='w-full h-full object-cover'
                  />
                </div>
                <h1 className='text-white text-sm mt-2'>{img.tilte}</h1>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialRewards;
