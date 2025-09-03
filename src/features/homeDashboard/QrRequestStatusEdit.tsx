import { badgeStatusColor } from '@constants/color';
import { rotateCharacter } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import { validation } from '@helpers/validation.helper';
import { Badge, Flex, Group, TextInput } from '@mantine/core';
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
export default function QrRequestStatusEdit({
  open,
  onClose,
  isPos = false,
  store,
}: any) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const requestForm = useForm({
    initialValues: {
      username: '',
      merchantId: '',
      password: '',
    },
    validate: {
      username: (val: string) =>
        validation.required(val, 'fonepay username is required'),
      // merchantId: (val: string) =>
      //   validation.required(val, 'fonepay merchant ID is required'),
      password: (val: string) =>
        validation.required(val, 'fonepay password is required'),
    },
  });

  const updateRequest = async () => {
    setLoading(true);

    const encodedToken = rotateCharacter(
      JSON.stringify({
        u: requestForm.values.username,
        pw: requestForm.values.password,
        mi: requestForm.values.merchantId,
      }),
    );

    const base64form = base64_encode(encodedToken);

    try {
      console.log('the udpate request payload is : ', requestForm.values);
      console.log('and the base64 is : ', base64form);
      const payload = { token: base64form, store_id: store._id };
      await dashboardService.updateQrRequest(payload);

      notify.succces('Success', 'QR request Status updated successfully');
      requestForm.reset();
      onClose();
    } catch (err: { message: string } | any) {
      console.log('error from the edit form: ', err.message);
      notify.genericError('Error updating Request', err);
    }
    setLoading(false);
  };

  return (
    <Modal
      opened={open}
      onClose={() => onClose?.()}
      title={'Add fonepay detail'}
      size='md'
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <form onSubmit={requestForm.onSubmit(updateRequest)}>
        <Flex direction='column' gap={16} mt={16}>
          <TextInput
            label='Fonepay username'
            placeholder='eg: johndoe'
            {...requestForm.getInputProps('username')}
          />
          <TextInput
            label='Fonepay Merchant ID'
            placeholder='eg: 123456789'
            {...requestForm.getInputProps('merchantId')}
          />
          <TextInput
            label='Fonepay Password'
            placeholder='enter password'
            {...requestForm.getInputProps('password')}
          />
        </Flex>

        <Group justify='flex-end' mt={16}>
          <Button loading={loading} type='submit'>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
