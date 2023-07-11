import {Root, Thumb} from '@radix-ui/react-switch';

type Props = {
  onChange: () => void;
  gameRunning: boolean;
};

export const Switch = ({onChange, gameRunning}: Props) => {
  return (
    <div className='flex items-center p-4'>
      <div className={'pr-4'}>Random Mode</div>
      <Root
        disabled={gameRunning}
        onCheckedChange={onChange}
        id='mode-switcher'
        className='disabled:opacity-50 w-11 h-6 bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default'
      >
        <Thumb className='block w-5 h-5 bg-[#00ff00] rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
      </Root>
      <label className='pl-4' htmlFor='mode-switcher'>
        Drawing Mode
      </label>
    </div>
  );
};
