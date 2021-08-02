import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { api } from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  Steps,
  Subtitle,
  Form,
  FormTitle,
  Space,
} from './styles';

interface Params {
  user: {
    email: string;
    name: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { user } = route.params as Params;

  const handleRegister = async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert('Ops', 'Informe a senha e a confirmação');
    }
    if (password != passwordConfirm) {
      return Alert.alert('Ops', 'As senhas não são iguais');
    }

    await api
      .post('users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: 'Agora é só fazer login\ne aproveitar',
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar');
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Estamos{'\n'}quase lá</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <Space />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
