import { badgeStatusColor } from '@constants/color';
import { rotateCharacter } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import { validation } from '@helpers/validation.helper';
import { Badge, Flex, Group, Textarea, TextInput } from '@mantine/core';
import { Button, Modal, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import dashboardService from '@services/dashboard.service';
// import productSlice from '@store/slice/product';
import { encode as base64_encode } from 'base-64';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const QrRequestStatus = [
  { value: 'approved', label: 'Approve' },
  { value: 'rejected', label: 'Reject' },
  { value: 'pending', label: 'Pending' },
];
export default function QrRequestReject({
  open,
  onClose,
  onRefresh,
  store,
}: any) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);


  const rejectForm = useForm({
    initialValues: {
      reject_reason: '',
    },
    validate: {
      reject_reason: (val: string) =>
        validation.required(val, 'Rejection reason is required'),
    },
  });

  const rejectRequest = async () => {
    setLoading(true);

    try {
      const payload = { store_id: store._id, reject_reason: rejectForm.values.reject_reason };
      await dashboardService.rejectQrRequest(payload);
      notify.succces('Success', 'QR request updated successfully');
      rejectForm.reset();
      onRefresh();
      onClose();
    } catch (err) {
      notify.genericError('Error Rejecting Request', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={() => onClose?.()}
      title={'Reject QR Request'}
      size='md'
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <form onSubmit={rejectForm.onSubmit(rejectRequest)}>
        <Flex direction='column' gap={16} mt={16}>
          <Textarea
            label='Rejection Reason'
            placeholder='Enter reason for rejection'
            {...rejectForm.getInputProps('reject_reason')}
          />
        </Flex>

        <Group justify='flex-end' mt={16}>
          <Button loading={loading} color='red' type='submit'>
            Reject
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
