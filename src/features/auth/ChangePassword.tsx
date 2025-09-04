import generalConstants from '@constants/general';
import { decodeErrorMessage } from '@helpers/axios.helper';
import { Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from 'src/services/auth.service';
import KBlanxerLogo from '@components/KBlanxerLogo';
import { validation } from '@helpers/validation.helper';
import { useStore } from '@store/store';
import KChangePasswordModal from '@components/KChangePasswordModal';

export default function ChangePassword() {

  const navigate = useNavigate();


  

  return (
    <div className='max-w-[440px] w-[90%] mx-auto mt-[120px]'>
     <KChangePasswordModal open={true} onClose={() => navigate('/login')} />
    </div>
  );
}
