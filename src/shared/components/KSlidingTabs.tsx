import { SegmentedControl } from '@mantine/core';

export default function KSlidingTabs({
  links,
  onChange,
  defaultState,
  fullWidth = false,
  color = 'gray',
  size = 'sm',
}: {
  links: string[];
  onChange: (val: string) => void;
  defaultState?: string;
  fullWidth?: boolean;
  color?: string;
  size?: 'xs' | 'sm';
}) {
  return (
    <SegmentedControl
      p={4}
      withItemsBorders={false}
      fullWidth={fullWidth}
      defaultValue={defaultState}
      color={color}
      classNames={{
        root: 'dark:bg-black/[0.2]',
      }}
      styles={{
        root: {
          flexWrap: 'wrap',
          rowGap: 8,
        },
        control: {
          marginRight: 8,
        },
        label: {
          fontWeight: 600,
          padding: size == 'sm' ? '4px 18px' : '2px 18px',
          fontSize: size == 'sm' ? 14 : 12,
        },
      }}
      data={links}
      onChange={(val) => onChange(val)}
    />
  );
}
