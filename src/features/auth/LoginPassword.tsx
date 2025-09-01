import generalConstants from '@constants/general';
import { decodeErrorMessage } from '@helpers/axios.helper';
import { Button, Group, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from 'src/services/auth.service';
import KBlanxerLogo from '@components/KBlanxerLogo';
import { validation } from '@helpers/validation.helper';

export default function LoginPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginForm = useForm({
    initialValues: {
      username: '',
      password: '',
      login_for: 'cell_pay',
    },
    validate: {
      login_for: (val: string) => validation.required(val),
      username: (val: string) => validation.required(val),
      password: (val: string) => validation.password(val),
    },
  });

  const onLogin = async (payload: any) => {
    setLoading(true);
    try {
      const res: any = await authService.login(payload);

      const { access_token, refresh_token, user_data } =
        generalConstants.localStorage;
      localStorage.setItem(access_token, res?.access_token);
      localStorage.setItem(refresh_token, res?.refresh_token);
      localStorage.setItem(user_data, JSON.stringify(res?.user_data));

      navigate('/dashboard');
    } catch (e) {
      const usernameError = decodeErrorMessage(e, 'username', false);
      const passwordError = decodeErrorMessage(e, 'password', false);
      const genericError = decodeErrorMessage(e);

      loginForm.setErrors({
        username: usernameError,
        password: passwordError || genericError,
      });
    }
    setLoading(false);
  };

  return (
    <div className='max-w-[440px] w-[90%] mx-auto mt-[120px]'>
      <Group justify='center'>
        <KBlanxerLogo type='light' height={56} />
      </Group>
      <form className='mt-8' onSubmit={loginForm.onSubmit(onLogin)}>
        <Select
          mt='xs'
          label='Logging In For'
          data={[
            { label: 'Cell Pay', value: 'cell_pay' },
            { label: 'Pathao', value: 'pathao' },
          ]}
          allowDeselect={false}
          {...loginForm.getInputProps('login_for')}
        />

        <TextInput
          mt='xs'
          label='Username'
          placeholder={`eg: ${loginForm.values.login_for}_rambahadur`}
          {...loginForm.getInputProps('username')}
        />

        <PasswordInput
          mt='xs'
          label='Password'
          description='Password must be atleast 6 character'
          placeholder='********'
          {...loginForm.getInputProps('password')}
        />

        <Button mt='md' loading={loading} type='submit' fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}
