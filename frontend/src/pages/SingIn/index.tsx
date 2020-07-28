import React, { useRef, useCallback } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';


interface SignInFormData {
  email: string;
  password: string;
}


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha orbigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer logon, cheque as credenciais',
      });
    }
  }, [signIn, history, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a href="/rescue-password">
              Esqueci minha senha
            </a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />

    </Container>
  )
}

export default SignIn;
