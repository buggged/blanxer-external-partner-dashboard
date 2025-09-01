import { Monitor, Smartphone } from 'lucide-react';
import KBlanxerLogo from './KBlanxerLogo';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';

export default function KOnlyDesktop({ to }: any) {
  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='w-full max-w-md space-y-8 text-center'>
        {/*  */}
        <div className='flex items-center justify-center gap-4'>
          <KBlanxerLogo height={32} />
        </div>
        {/* Icon Section */}
        <div className='relative'>
          <div className='flex items-center justify-center space-x-4'>
            <Smartphone className='w-16 h-16 text-gray-400' />
            <div className='text-4xl text-gray-300'>→</div>
            <Monitor className='w-20 h-20 text-blue-600' />
          </div>
        </div>

        {/* Main Message */}
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Desktop Required</h1>
          <p className='leading-relaxed text-gray-600'>
            This page is not available on mobile devices. Please use a laptop or
            desktop computer for the best experience.
          </p>
        </div>

        {/* Additional Info */}
        <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
          <h2 className='mb-2 font-semibold text-gray-900'>
            Why desktop only?
          </h2>
          <p className='text-sm text-gray-600'>
            This application requires a larger screen and desktop features to
            function properly. We're working on mobile support for future
            updates.
          </p>
        </div>

        <Link to={to || '/'}>
          <Button
            mt='xl'
            leftSection={<IconChevronLeft size={18} />}
            size='md'
            variant='light'>
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
