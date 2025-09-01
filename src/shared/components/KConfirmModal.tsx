import notify from '@helpers/notification.helper';
import { Box, DefaultMantineColor, Group } from '@mantine/core';
import { Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';

interface IProps {
  open: boolean;
  onClose: any;
  title: string;

  buttonText: string;
  subtitle: string;
  highlighted?: string;
  buttonColor: DefaultMantineColor;
  note?: string;

  confirmFunction: any;
  functionParams: any[];
  onSuccess?: any;
}

export default function KConfirmModal({
  open,
  onClose,
  title,
  confirmFunction,
  functionParams,
  onSuccess,

  buttonText,
  subtitle,
  highlighted,
  buttonColor = 'custom',
  note = '',
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await confirmFunction(...functionParams);
      onSuccess?.(res);
      onClose?.();
    } catch (e) {
      notify.genericError('Error', e);
    }
    setLoading(false);
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      size='md'
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <Box>
        <Text size='sm' mb={3} fw={500}>
          {subtitle}{' '}
          <Text component='span' color='purple'>
            {highlighted}
          </Text>
        </Text>

        {!!note && (
          <Text className='mt-2 text-sm'>
            <b>Note:</b> <br /> {note}
          </Text>
        )}

        <Group justify='flex-end'>
          <Button
            color={buttonColor}
            mt='md'
            onClick={handleSubmit}
            loading={loading}>
            {buttonText}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
