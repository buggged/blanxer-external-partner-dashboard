import { AppShell, Box, Drawer, Group, Loader, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import KDashboardHeader from './KDashboardHeader';
import KDashboardNavbar, { KDashboardNavbarDrawer } from './KDashboardNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function KDashboardLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(); // sidebar state
  const [openAddStore, setOpenAddStore] = useState<boolean>(false);

  return (
    <div>
      <AppShell
        layout='alt'
        // navbar={{
        //   width: 240,
        //   breakpoint: 'sm',
        //   collapsed: {
        //     mobile: true,
        //     desktop: false,
        //   },
        // }}
        styles={{
          main: { backgroundColor: 'var(--bg-color-alt)' },
        }}

        padding='md'>
        <KDashboardNavbar onClose={close} onSwitchStore={() => {}} />

   

        <AppShell.Main>
          <KDashboardHeader
            onSwitchStore={() => {}}
            open={opened}
            onToggle={open}
          />

          <Box
            style={{
              paddingTop: 16,
            }}>
            <Outlet />
          </Box>
        </AppShell.Main>
      </AppShell>

      <Drawer
        opened={!!isMobile && opened}
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
        onClose={() => close()}
        position='left'
        size={'76vw'}>
        <KDashboardNavbarDrawer onClose={close} onSwitchStore={() => {}} />
      </Drawer>
    </div>
  );
}
