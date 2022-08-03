import React, { FC } from "react";
import styled from "styled-components";

interface HelpModalProps {
  text: string;
}

const ModalWrapper = styled.div`
  position: absolute;
  margin-top: 60px;
  z-index: 12;
`;

const Trangle = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid ${(props) => props.theme.colors.blue};
  margin-left: 20px;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 20px;
  border-radius: ${(props) => props.theme.borderRadius};
  color: #fff;
  p {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 8px;
  }
`;

const HelpModal: FC<HelpModalProps> = ({ text }) => {
  return (
    <ModalWrapper>
      <Trangle />
      <Content>
        <p>{text}</p>
      </Content>
    </ModalWrapper>
  );
};

export default React.memo(HelpModal);
