import { FaRegCircleCheck } from 'react-icons/fa6';

const Programs = () => {
  return (
    <div className='space-y-4 px-3'>
      <h1 className='text-3xl font-bold'>💡 Eagles Programs</h1>
      <h2 className='text-2xl font-bold'>How Eagles x1 works</h2>
      <p>
        All partners in your Eagles X1 program levels are the people you've
        personally invited. When partners register in the program using your
        referral link, they take spots below you.
      </p>
      <p>
        Distribution of rewards when filling each spot in a level of the program
        is as follows:
      </p>
      <p className='flex flex-col gap-y-3'>
        <span>
          • <span className='font-semibold'>The first partner</span> you invite
          is placed on the first spot below you.
        </span>
        <p> Reward of 100% goes to your personal wallet.</p>
        <span>
          • <span className='font-semibold'>The second partner</span> is placed
          on the second spot below you.
        </span>{' '}
        <p> You also get 100% reward to your personal wallet.</p>
        <span>
          {' '}
          • <span className='font-semibold'>The third partner</span> is placed
          on the third spot below you and completes the cycle.
        </span>
      </p>
      <img src='USDT image' alt='' className='h-36 w-full' />
      <p className='bg-green-100 flex p-3 rounded-lg'>
        <span className='w-20 text-green-600 mt-1'>
          <FaRegCircleCheck />{' '}
        </span>{' '}
        <span>
          <span className='font-semibold'>Eagles x1 program</span> → 3 places in
          a cycle, +200% profit from each cycle, 1 recycle = level cost. Best
          for fast profits from direct partners.
        </span>
      </p>
      <p>
        100% of the income goes to your upline partner's wallet, and a new cycle
        immediately begins for you. You can fill up the spots again by inviting
        new partners.
      </p>
      <p>
        Likewise, with your partners. Each time your partner completes the cycle
        of their level, you receive a payment to your wallet of{' '}
        <span className='font-semibold'>100%</span> of the level cost, and the
        partner opens the new cycle again. At the same time, this partner takes
        a new place under you.
      </p>
      <p>
        Thus, the same partner can occupy several places in a row in your
        levels.
      </p>

      {/* program x2 */}
      <h2 className='text-2xl font-bold'>How Eagles x2 works</h2>
      <p>
        In the Eagles x2 program, you can invite personal partners, as well as
        receive spillovers from above and below.
      </p>
      <p className='flex flex-col gap-y-3'>
        <span>
          • The partners who occupy two spots below you in the first line are
          also in the second line of your upline's level.
        </span>
        <p>Reward of 100% goes to upline's wallet.</p>
        <span>
          • By the same principle, you receive income 100% not from the first,
          but from <span className='font-semibold'>the second line</span>.
        </span>{' '}
      </p>
      <img src='USDT image' alt='' className='h-36 w-full' />
      <p className='bg-green-100 flex p-3 rounded-lg'>
        <span className='w-20 text-green-600 mt-1'>
          <FaRegCircleCheck />{' '}
        </span>{' '}
        <span>
          <span className='font-semibold'> Eagles x2 Program</span> → 6 places
          in a cycle, +300% profit from each cycle, automatic level recycle =
          level cost. Best for fast profits from partners in the 1st & 2nd
          lines.
        </span>
      </p>
      <p>
        Rewards from partners who occupy these spots instantly go to your wallet
        in the amount of 100%.
      </p>
      <p>
        When a partner completes the cycle of the level, the reward of 100% goes
        to your upline, and the new cycle begins for you.
      </p>
      <p>
        When a partner on the <span className='font-semibold'>2nd line</span>{' '}
        joins your upline, they take a place in your{' '}
        <span className='font-semibold'>1st line</span> — that is, you receive a
        spillover from above. Similarly, a spillover can come from below. When a
        partner comes to your downline on the{' '}
        <span className='font-semibold'>1st line</span>, they will take a place
        on your <span className='font-semibold'>2nd line</span>.
      </p>
      <p>
        Thus, places in the x4 levels can be occupied by people invited only by
        you, or there can be none invited by you, or mixed.
      </p>
      <p className='italic'>
        Do not forget to activate the next level after the 1st cycle so as not
        to miss payments on the previous level.
      </p>
    </div>
  );
};
export default Programs;
