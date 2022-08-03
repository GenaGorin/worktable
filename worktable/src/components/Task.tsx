import { FC, useState } from "react";
import styled from "styled-components";
import { day, task } from "../types/types";
import HelpModal from "./modals/HelpModal";

interface TaskProp {
  task: task;
  day: day | null;
  dragOverHandler: Function;
  dragLeaveHandler: Function;
  dragStartHandler: Function;
  dragEndHandler: Function;
  drophandler: Function;
}

const TaskWrapper = styled.div`
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #6f7577;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
  margin-right: 16px;
  :hover {
    color: ${(props) => props.theme.colors.blue};
    border: 1px solid ${(props) => props.theme.colors.blue};
  }
`;

const Task: FC<TaskProp> = ({
  task,
  day,
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  drophandler,
}) => {
  const [showHelp, setShowhelp] = useState(false);

  return (
    <div>
      {showHelp && <HelpModal text={task.description} />}
      <TaskWrapper
        onMouseEnter={() => setShowhelp(true)}
        onMouseLeave={() => setShowhelp(false)}
        draggable={true}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, task, day)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        {task.title}
      </TaskWrapper>
    </div>
  );
};

export default Task;
