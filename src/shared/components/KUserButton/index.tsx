import { getStartingOfName } from '@helpers/general.helper';
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
// import style from './style.module.scss';

interface IProps {
  name: string;
  role: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export function KUserButton({ name, role, icon, onClick }: IProps) {
  return (
    <UnstyledButton className={'abc'} onClick={onClick}>
      <Group>
        <Avatar color='custom' radius='xl'>
          {getStartingOfName(name)}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size='sm' lineClamp={1} fw={500}>
            {String(name).trim()}
          </Text>

          <Text
            style={{
              textTransform: 'uppercase',
            }}
            c='dimmed'
            fz={10}>
            {role}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} />}
      </Group>
    </UnstyledButton>
  );
}
