import notify from '@helpers/notification.helper';
import { Box, Group } from '@mantine/core';
import { Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';

interface IProps {
  open: boolean;
  onClose: any;
  title: string;
  deleteFunction: any;
  functionParams: any[];
  onDelete?: any;
}

export default function KDeleteModal({
  open,
  onClose,
  title,
  deleteFunction,
  functionParams,
  onDelete,
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await deleteFunction(...functionParams);
      onDelete?.(res);
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
      title="Confirm Delete"
      size="md"
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <Box>
        <Text size="sm" mb={3} fw={500}>
          Are you sure to delete{' '}
          <Text component="span" color="purple">
            {title}?
          </Text>
        </Text>

        <Group justify="flex-end">
          <Button color="red" mt="md" onClick={handleSubmit} loading={loading}>
            Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
