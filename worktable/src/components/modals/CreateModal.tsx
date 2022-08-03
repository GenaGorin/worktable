import React, { FC, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import closeIcon from "../../images/close.svg";
import { task } from "../../types/types";

interface SimpleModalProps {
  closeCallback: Function;
  addTask: Function;
}

const ModalContainerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContainer = styled.div`
  width: 456px;
  //height: 283px;
  padding-bottom: 16px;
  border: 1px solid #e2eef4;
  z-index: 20;
  background-color: #f8f8f8;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 26px;

  p {
    font-weight: 600;
    font-size: 20px;
  }
  img {
    cursor: pointer;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  border-top: 1px solid #e6eef1;
  padding-top: 11px;
  padding-right: 30px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    margin-left: 2rem;
    margin-top: 0.7rem;
    display: block;
    transition: all 0.3s;
    transform: translateY(0rem);
  }

  input {
    font-family: "Roboto", sans-serif;
    color: #333;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    border: none;
    width: 70%;
    display: block;
    border-bottom: 0.3rem solid transparent;
    transition: all 0.3s;
  }

  input:placeholder-shown + label {
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(-4rem);
    transform: translateY(-4rem);
  }
`;

const CreateModal: FC<SimpleModalProps> = ({ closeCallback, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");
  const [time, setTime] = useState<string | number>(0);

  const createHandler = () => {
    if (!title || !description || !time) {
      alert("Enter params");
      return false;
    }
    const task: task = {
      id: Date.now(),
      title: title,
      description: description,
      time: Number(time),
    };

    closeCallback(false);
    addTask(task);
  };

  return (
    <ModalContainerWrapper>
      <ModalContainer>
        <ModalHeader>
          <div>
            <p>Создай задачу</p>
          </div>

          <img
            src={closeIcon}
            alt="close"
            onClick={() => closeCallback(false)}
          />
        </ModalHeader>
        <InputsWrapper>
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="name"
              placeholder="title"
            />
            <label htmlFor="name">title</label>
          </div>
          <div>
            <input
              value={description}
              onChange={(e) => setDesription(e.target.value)}
              type="text"
              id="description"
              placeholder="description"
            />
            <label htmlFor="description">description</label>
          </div>
          <div>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="number"
              id="time"
              placeholder="time"
            />
            <label htmlFor="time">time</label>
          </div>
        </InputsWrapper>
        <ModalFooter>
          <Button text="Создать" actionCallback={createHandler} />
        </ModalFooter>
      </ModalContainer>
    </ModalContainerWrapper>
  );
};

export default CreateModal;
