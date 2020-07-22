import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <h1>Faça seu logon</h1>
        <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        <a href="/rescue-password">
          Esqueci minha senha
        </a>
      </form>

      <a href="/new-account">
        <FiLogIn />
        Criar conta
      </a>

    </Content>
    <Background />

  </Container>
)

export default SignIn;