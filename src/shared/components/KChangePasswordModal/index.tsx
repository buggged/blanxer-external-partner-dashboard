import notify from '@helpers/notification.helper';
import { validation } from '@helpers/validation.helper';
import { Group, PasswordInput, TextInput } from '@mantine/core';
import { Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import authService from '@services/auth.service';
import dashboardService from '@services/dashboard.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KChangePasswordModal({ open, onClose, store }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const changePasswordForm = useForm({
    initialValues: {
      userName: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      userName: (val: string) => validation.required(val),
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
        username: changePasswordForm.values.userName,
        old_password: changePasswordForm.values.oldPassword,
        new_password: changePasswordForm.values.newPassword,
        confirm_password: changePasswordForm.values.confirmPassword,
      };

      const res = await authService.changePassword(payload);

      notify.succces('Success', 'Password changed successfully');

      changePasswordForm.reset();
      if (res?.success === true && res?.goto) {
        navigate(res.goto);
        return;
      }
      onClose();
    } catch (err) {
      notify.genericError('Error Changing Password', err);
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
          <TextInput
            label='Username'
            placeholder='Enter username'
            {...changePasswordForm.getInputProps('userName')}
          />
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
