import { useMantineColorScheme } from '@mantine/core';

interface IProps {
  height?: number;
  type?: 'inherit' | 'light' | 'dark';
}

export default function KBlanxerLogo({
  height = 36,
  type = 'inherit',
}: IProps) {
  const { colorScheme } = useMantineColorScheme();

  const getSvgSource = () => {
    if (type == 'inherit') {
      return colorScheme == 'dark' ? '/logo_white.svg' : '/logo_dark.svg';
    } else if (type == 'dark') {
      return '/logo_white.svg';
    }
    return '/logo_dark.svg';
  };

  return <img style={{ height }} src={getSvgSource()} alt="" />;
}
