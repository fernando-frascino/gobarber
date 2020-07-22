import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonPropts = ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FC<ButtonPropts> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
)

export default Button;
