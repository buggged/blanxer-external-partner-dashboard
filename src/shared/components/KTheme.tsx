import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface ThemProps {
  children: ReactNode;
}
//
function KTheme({ children }: ThemProps) {
  return (
    <MantineProvider
      withCssVariables
      theme={{ primaryColor: 'violet' }}
      defaultColorScheme='light'>
      <Toaster />
      {children}
    </MantineProvider>
  );
}

export default KTheme;
