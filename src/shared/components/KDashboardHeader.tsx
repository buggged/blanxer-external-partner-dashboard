import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Switch,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import KBlanxerLogo from './KBlanxerLogo';
import {
  IconBarcode,
  IconHelp,
  IconMoon,
  IconWorldWww,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconCoin } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
// import useAuth from '@hooks/useAuth';
import { getStartingOfName } from '@helpers/general.helper';
import { useState } from 'react';

export default function KDashboardHeader({ open, onToggle }: any) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery('(max-width: 767px)', false);
  // const { doLogout, user } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <Box
        style={{
          background: 'var(--mantine-color-body)',
          borderBottom: '1px solid var(--app-shell-border-color)',
        }}
        mx='-md'
        mt='-md'>
        <Flex
          justify='space-between'
          align='center'
          h={73}
          px='md'
          wrap='nowrap'
          style={{
            minWidth: 0,
            gap: isMobile ? 8 : 0,
          }}>
          <Group gap={6} style={{ minWidth: 0, flexShrink: 0 }}>
            <Burger
              opened={open}
              onClick={onToggle}
              hiddenFrom='sm'
              size='sm'
            />
            <KBlanxerLogo height={isMobile ? 24 : 36} />
          </Group>

          <Group
            style={{
              flexShrink: 1,
              minWidth: 0,
            }}
            gap={isMobile ? 4 : undefined}>
            <Link to='/dashboard/pos'>
              <div className='relative'>
                <Button
                  size={isMobile ? 'sm' : 'md'}
                  color='custom'
                  leftSection={<IconBarcode size={isMobile ? 16 : 22} />}
                  variant='outline'>
                  POS MODE
                </Button>
                <div className='absolute top-[-12px] right-[-10px] bg-red-500 rounded-[4px]'>
                  <p className='text-[10px] font-bold py-1 px-2 text-white'>
                    BETA
                  </p>
                </div>
              </div>
            </Link>

            <Link to='/dashboard/getting-started'>
              <ActionIcon
                size={isMobile ? 'md' : 'lg'}
                color='custom'
                variant='subtle'>
                <IconHelp />
              </ActionIcon>
            </Link>

            <Menu
              opened={showMenu}
              onClose={() => setShowMenu(false)}
              closeOnItemClick={false}
              shadow='md'
              width={220}
              offset={0}
              position='bottom-end'>
              <Menu.Target>
                <UnstyledButton onClick={() => setShowMenu(true)}>
                  <Avatar
                    size={isMobile ? 'sm' : 'md'}
                    color='custom'
                    radius='xl'>
                    {getStartingOfName('Guest')}
                  </Avatar>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={(e) => e.stopPropagation()}
                  rightSection={
                    <Switch
                      checked={colorScheme === 'dark'}
                      onClick={toggleColorScheme}
                    />
                  }
                  leftSection={<IconMoon size={14} />}>
                  <div className='flex'>
                    <p>Dark Mode</p>
                  </div>
                </Menu.Item>

                <Menu.Item
                  component={Link}
                  to='/dashboard/subscription'
                  onClick={() => setShowMenu(false)}
                  leftSection={<IconCoin size={14} />}>
                  Subscription
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  onClick={() => {
                    // doLogout();
                    setShowMenu(false);
                  }}
                  color={'red'}
                  leftSection={<IconLogout size={14} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Box>
    </>
  );
}
