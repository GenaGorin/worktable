import { FC } from "react";
import styled from "styled-components";
import { day, task } from "../types/types";
import Task from "./Task";

interface DayProp {
  day: {
    day: string;
    tasks: Array<task>;
  };
  dragOverHandler: Function;
  dragLeaveHandler: Function;
  dragStartHandler: Function;
  dragEndHandler: Function;
  drophandler: Function;
}

const DayWrapper = styled.div`
  border: 1px solid #6f7577;
  border-radius: ${(props) => props.theme.borderRadius};
  color: #6f7577;
  width: 300px;
  height: 400px;
  //background-color: ${(props) => props.theme.colors.red};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Line = styled.div<{ width: string; color: string }>`
  border: 1px solid #6f7577;
  width: 100%;
  height: 40px;
  margin-top: 16px;
  border-radius: 10px;
  div {
    height: 100%;
    background-color: ${(props) => props.color};
    border-radius: ${(props) => props.theme.borderRadius};
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
  }
`;

const Day: FC<DayProp> = ({
  day,
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  drophandler,
}) => {
  const sum = day.tasks.reduce((sum, task) => sum + task.time, 0);

  return (
    <div>
      <DayWrapper
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        //onDragStart={(e) => dragStartHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => drophandler(e, day)}
      >
        <Title>{day.day}</Title>
        {day.tasks.map((task: task) => (
          <Task
            task={task}
            key={task.id}
            day={day}
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
            drophandler={drophandler}
          />
        ))}
      </DayWrapper>
      {sum > 0 && (
        <Line width={(sum / 24) * 100 + "%"} color={sum > 8 ? "red" : "green"}>
          <div>Загрузка {sum}/24h.</div>
        </Line>
      )}
    </div>
  );
};

export default Day;
