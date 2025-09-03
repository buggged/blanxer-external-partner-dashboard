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


export default function QrRequestAccept({
  open,
  onClose,
  onRefresh,
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

  const rejectForm = useForm({
    initialValues: {
      reason: '',
    },
    validate: {
      reason: (val: string) =>
        validation.required(val, 'Rejection reason is required'),
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
      const payload = { token: base64form, store_id: store._id };
      await dashboardService.updateQrRequest(payload);

      notify.succces('Success', 'QR request updated successfully');
      requestForm.reset();
      onClose();
      onRefresh();
    } catch (err: { message: string } | any) {
      notify.genericError('Error Accepting Request', err);
    }
    setLoading(false);
  };

  const rejectRequest = async()=>{
    setLoading(true);
    const payload = { store_id: store._id };
    const response = await dashboardService.rejectQrRequest(payload);
  }

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
