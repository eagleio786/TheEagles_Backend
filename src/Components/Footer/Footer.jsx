import {
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='flex justify-between px-3 py-4 bg-Background'>
      <div>
        <p className='text-textColor2 text-sm font-semibold'>
          &copy; 2025 All Rights Reserved
        </p>
        <p className='text-textColor3 text-base font-medium'>Documents</p>
      </div>
      <div className='text-textColor3 text-xl flex items-center gap-3'>
        <FaFacebookF />
        <FaTwitter />
        <FaYoutube />
        <FaTelegramPlane />
      </div>
    </div>
  );
};
export default Footer;
