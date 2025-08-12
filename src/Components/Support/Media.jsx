import { Link } from 'react-router-dom';

const Media = () => {
  return (
    <div className='my-6 space-y-4 px-3'>
      <h1 className='text-2xl font-bold'>💡 The Eagles Media</h1>
      <p className='flex flex-col gap-y-2 text-sm'>
        <span className='font-semibold'>
          • Instagram:{' '}
          <Link
            to='https://www.instagram.com/theeagles786'
            className='text-[#714f93] underline'
          >
            https://www.instagram.com/theeagles786
          </Link>{' '}
        </span>
        <span className='font-semibold'>
          • Youtube:{' '}
          <Link
            to='https://www.youtube.com/@MrAmtazKallu'
            className='text-[#714f93] underline'
          >
            https://www.youtube.com/@MrAmtazKallu
          </Link>
        </span>
        <span className='font-semibold'>
          • Facebook:{' '}
          <Link
            to='https://www.facebook.com/share/18FkUDzNLf/'
            className='text-[#714f93] underline'
          >
            https://www.facebook.com/share/18FkUDzNLf/
          </Link>
        </span>
        <span className='font-semibold'>
          • Tiktok:{' '}
          <Link
            to='https://www.tiktok.com/@theeapzlwm4?_t=ZS-8tMNEoaEiv4&_r=1'
            className='text-[#714f93] underline'
          >
            https://www.tiktok.com/@theeapzlwm4?_t=ZS-8tMNEoaEiv4&_r=1
          </Link>
        </span>
        <span className='font-semibold'>
          • Twitter:{' '}
          <Link
            to='https://x.com/theeagles727493?t=5LOE9H8FwdDMF2wUtfYy7w&s=09'
            className='text-[#714f93] underline'
          >
            https://x.com/theeagles727493?t=5LOE9H8FwdDMF2wUtfYy7w&s=09
          </Link>
        </span>
      </p>
      <p className='italic text-[#9c9b9c] text-center'>
        Subscribe to our news channel!
      </p>
    </div>
  );
};
export default Media;
