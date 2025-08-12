import {
  HiOutlineUserGroup,
  HiOutlineLink,
  HiOutlineChartBar,
  HiOutlineInformationCircle,
  HiOutlineCalculator,
  HiOutlineSearch,
  HiOutlineLogout,
} from 'react-icons/hi';
import { CiGrid41 } from 'react-icons/ci';
import { GoPeople } from 'react-icons/go';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDisconnect } from 'wagmi';

const Menu = ({ menu, home }) => {
  const navigate = useNavigate();
  const [isTeamVisible, setIsTeamVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [activeSpan, setActiveSpan] = useState('Dashboard');
const [isLoggingOut, setIsLoggingOut] = useState(false);
const { disconnect } = useDisconnect({
  onSuccess: () => {
    
    navigate('/auth');
  }
});

const handlelogout = async () => {
  if (isLoggingOut) return;
  setIsLoggingOut(true);

  try {
    await disconnect();

    setTimeout(() => {
      navigate('/auth');
      home(true)
    }, 500);
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    setIsLoggingOut(false);
  }
};

  const handleRendering = () => {
    menu(false);
    home(true);
  };

  const toggleTeamVisibility = () => {
    setIsTeamVisible(!isTeamVisible);
  };

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleActiveSpan = (spanName) => {
    setActiveSpan(spanName);
  };

  const getSpanClass = (spanName) =>
    activeSpan === spanName ? 'text-textColor3' : 'text-textColor2';

  return (
    <>
      <div className='h-auto text-white'>
        <div
          className={`py-4 px-3 border-b border-textColor2 flex items-center gap-2 cursor-pointer ${getSpanClass(
            'Dashboard'
          )}`}
        >
          <CiGrid41 className='text-xl' />
          <span onClick={() => handleActiveSpan('Dashboard')}>
            <Link to='/home' onClick={handleRendering}>
              Dashboard
            </Link>
          </span>
        </div>

        <div
          className='flex justify-between items-center py-4 px-3 border-b border-textColor2'
          onClick={() => handleActiveSpan('Team')}
        >
          <div
            className={`flex gap-2 items-center cursor-pointer ${getSpanClass(
              'Team'
            )}`}
          >
            <HiOutlineUserGroup className='text-xl' />
            <span>Team</span>
          </div>
          <div>
            <RiArrowDownSLine
              className='text-xl cursor-pointer'
              onClick={toggleTeamVisibility}
            />
          </div>
        </div>
        {isTeamVisible && (
          <div className='text-textColor2'>
            <div
              className={`pl-10 flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
                'Partners'
              )}`}
            >
              <GoPeople />
              <span onClick={() => handleActiveSpan('Partners')}>
                <Link to='/partner' onClick={handleRendering}>
                  Partners
                </Link>
              </span>
            </div>
            <div
              className={`pl-10 flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
                'Links'
              )}`}
            >
              <HiOutlineLink />
              <span onClick={() => handleActiveSpan('Links')}>
                <Link to='/links' onClick={handleRendering}>
                  Links
                </Link>
              </span>
            </div>
            <div
              className={`pl-10 flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
                'Stats'
              )}`}
            >
              <HiOutlineChartBar />
              <span onClick={() => handleActiveSpan('Stats')}>
                <Link to='/stats' onClick={handleRendering}>
                  Stats
                </Link>
              </span>
            </div>
          </div>
        )}

        <div
          className='flex items-center justify-between py-4 px-3 border-b border-textColor2'
          onClick={() => handleActiveSpan('Information')}
        >
          <div
            className={`flex items-center gap-2 cursor-pointer ${getSpanClass(
              'Information'
            )}`}
          >
            <HiOutlineInformationCircle className='text-xl' />
            <span>Information</span>
          </div>
          <div>
            <RiArrowDownSLine
              className='text-xl cursor-pointer'
              onClick={toggleInfoVisibility}
            />
          </div>
        </div>
        {isInfoVisible && (
          <div className='text-textColor2'>
            <div
              className={`pl-10 flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
                'Calculator'
              )}`}
            >
              <HiOutlineCalculator />
              <span onClick={() => handleActiveSpan('Calculator')}>
                <Link to='/calculator' onClick={handleRendering}>
                  Calculator
                </Link>
              </span>
            </div>
          </div>
        )}

        <div
          className={`flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
            'Account Search'
          )}`}
        >
          <HiOutlineSearch className='text-xl' />
          <span onClick={() => handleActiveSpan('Account Search')}>
            <Link to='/accountSearch' onClick={handleRendering}>
              The Eagles.io Account Search
            </Link>
          </span>
        </div>

        <div
          className={`flex items-center gap-2 py-4 px-3 border-b border-textColor2 cursor-pointer ${getSpanClass(
            'Log out'
          )}`}
        >
          <HiOutlineLogout className='text-xl' />
          <span onClick={() => handleActiveSpan('Log out')}>
            <p onClick={handlelogout}>Log out</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Menu;
