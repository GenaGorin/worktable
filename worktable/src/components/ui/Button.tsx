import { FC } from "react";
import styled from "styled-components";

interface ButtonProp {
  text: string;
  actionCallback: Function;
}

const Btn = styled.div`
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.blue};
  width: 100px;
  height: 40px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.white};
`;

const Button: FC<ButtonProp> = ({ text, actionCallback }) => {
  return <Btn onClick={() => actionCallback()}>{text}</Btn>;
};

export default Button;
