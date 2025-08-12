import { HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import USDTlogin from '../Components/Login/USDTlogin';
import Ethereumlogin from '../Components/Login/Ethereumlogin';
import TronLogin from '../Components/Login/TronLogin';

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='px-3 py-4'>
        <div className='flex justify-end'>
          <div className='inline-block bg-Background p-2 rounded-full shadow-2xl'>
            <HiMiniXMark
              className='text-white text-3xl'
              onClick={() => navigate('/')}
            />
          </div>
        </div>

        <USDTlogin />
        {/* <Ethereumlogin />
        <TronLogin /> */}
      </div>
    </>
  );
};
export default Login;
