import { Loader, Text } from '@mantine/core';

const KLoader = ({ title }: any) => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '200px',
    }}>
    <div className="flex items-center gap-[8px]">
      <Loader size="xs" />
      <Text fw={500} size="sm">
        {title ?? 'Loading...'}
      </Text>
    </div>
  </div>
);

export default KLoader;
