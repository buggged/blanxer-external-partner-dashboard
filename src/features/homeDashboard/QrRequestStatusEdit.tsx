import { badgeStatusColor } from '@constants/color';
import notify from '@helpers/notification.helper';
import { Badge, Group } from '@mantine/core';
import { Button, Modal, Select, Text } from '@mantine/core';
// import productSlice from '@store/slice/product';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const QrRequestStatus = [
  { value: 'approved', label: 'Approve' },
  { value: 'rejected', label: 'Reject' },
  { value: 'pending', label: 'Pending' },
];
export default function QrRequestStatusEdit({
  open,
  onClose,
  isPos = false,
  store,
}: any) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>(
    store?.addons?.qr_request || '',
  );

  const updateOrder = async () => {
    setLoading(true);
    try {
      //   const payload = { status: newStatus, payment_status: newPStatus };
      //   await orderService.updateStatus(order_id, payload);
      //   if (['Cancelled', 'Returned'].includes(newStatus) && status != 'Draft') {
      //     dispatch(productSlice.actions.resetData());
      //   }
      notify.succces('Success', 'QR request Status updated successfully');

      onClose();
    } catch (err) {
      notify.genericError('Error updating order', err);
    }
    setLoading(false);
  };

  return (
    <Modal
      opened={open}
      onClose={() => onClose?.()}
      title={`Change QR Request Status`}
      size='md'
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <Group>
        <Text fz={13} fw={600}>
          Current Status:
        </Text>
        <Badge
          variant='light'
          color={badgeStatusColor[store?.addons?.qr_request]}>
          {store?.addons?.qr_request || 'N/A'}
        </Badge>
      </Group>

      <Select
        my='md'
        label='Order Status'
        value={newStatus}
        onChange={(e) => setNewStatus(e || '')}
        placeholder='Pick one'
        data={QrRequestStatus}
      />

      <Group justify='flex-end'>
        <Button onClick={updateOrder} loading={loading}>
          Save
        </Button>
      </Group>
    </Modal>
  );
}
