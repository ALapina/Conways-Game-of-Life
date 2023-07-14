import {Root, Item} from '@radix-ui/react-toggle-group';
import {Dispatch, SetStateAction} from 'react';

const toggleGroupItemStyles =
  'data-[state=on]:text-black border-r last:border-0 border-primaryGreen data-[state=on]:bg-primaryGreen py-1 px-2';

type Props = {
  onValueChange: Dispatch<SetStateAction<number>>;
};

export const ToggleGroup = ({onValueChange}: Props) => {
  return (
    <Root
      className='border-primaryGreen border'
      type='single'
      defaultValue='500'
      aria-label='Speed control'
      onValueChange={(value) => onValueChange(parseInt(value))}
    >
      <Item
        className={toggleGroupItemStyles}
        value='100'
        aria-label='Fast speed'
      >
        Fast
      </Item>
      <Item
        className={toggleGroupItemStyles}
        value='500'
        aria-label='Normal speed'
      >
        Normal
      </Item>
      <Item
        className={toggleGroupItemStyles}
        value='1000'
        aria-label='Slow speed'
      >
        Slow
      </Item>
    </Root>
  );
};
