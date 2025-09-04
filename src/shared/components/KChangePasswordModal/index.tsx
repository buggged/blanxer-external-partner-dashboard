import { badgeStatusColor } from '@constants/color';
import { rotateCharacter } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import { validation } from '@helpers/validation.helper';
import { Badge, Flex, Group, PasswordInput, Textarea, TextInput } from '@mantine/core';
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
export default function KChangePasswordModal({
  open,
  onClose,
  store,
}: any) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const changePasswordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      oldPassword: (val: string) => validation.password(val),
      newPassword: (val: string) => validation.password(val),
      confirmPassword: (val: string) => validation.password(val),
    },
  });

  const changePassword = async () => {
    if (
      changePasswordForm.values.newPassword !==
      changePasswordForm.values.confirmPassword
    ) {
      notify.error('Error', 'New password and confirm password do not match');
      return;
    }
    setLoading(true);

    try {
      const payload = {
        store_id: store._id,
        oldPassword: changePasswordForm.values.oldPassword,
        newPassword: changePasswordForm.values.newPassword,
      };
      await dashboardService.changePassword(payload);
      notify.succces('Success', 'Password changed successfully');
      changePasswordForm.reset();
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
      title={'Change Password'}
      size='md'
      styles={{
        title: {
          fontWeight: 600,
        },
      }}>
      <form onSubmit={changePasswordForm.onSubmit(changePassword)}>
        <div className='flex flex-col gap-2 mb-4'>
          <PasswordInput
            label='Old Password'
            type='password'
            placeholder='Enter old password'
            {...changePasswordForm.getInputProps('oldPassword')}
          />
          <PasswordInput
            label='New Password'
            type='password'
            placeholder='Enter new password'
            {...changePasswordForm.getInputProps('newPassword')}
          />
          <PasswordInput
            label='Confirm New Password'
            type='password'
            placeholder='Re-enter new password'
            {...changePasswordForm.getInputProps('confirmPassword')}
          />
        </div>

        <Group justify='flex-end' mt={16}>
          <Button loading={loading} type='submit'>
            Change Password
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
