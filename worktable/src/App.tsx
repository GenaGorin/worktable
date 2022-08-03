import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import Day from "./components/Day";
import Task from "./components/Task";
import { day, task } from "./types/types";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./theme/theme";
import Button from "./components/ui/Button";
import CreateModal from "./components/modals/CreateModal";
import trashIcon from "../src/images/trash.svg";

const week: Array<day> = [
  {
    day: "Понедельник",
    tasks: [],
  },
  {
    day: "Вторник",
    tasks: [],
  },
  {
    day: "Среда",
    tasks: [],
  },
  {
    day: "Четверг",
    tasks: [],
  },
  {
    day: "Пятница",
    tasks: [],
  },
];

const work: Array<task> = [
  {
    id: 0,
    title: "Приготовить еду",
    description: "Купить и приготовить еду",
    time: 4,
  },
  {
    id: 1,
    title: "Убраться",
    description: "Провести уборку дома",
    time: 2,
  },
  {
    id: 2,
    title: "Поиграть",
    description: "Поиграть в доту",
    time: 6,
  },
];

const Container = styled.div`
  padding: 50px;
  h1 {
    color: #6f7577;
  }
`;

const TaskWrapper = styled.div`
  display: flex;
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const TrashWrapper = styled.div`
  margin-top: 20px;
  img {
    width: 50px;
    height: 50px;
  }
`;

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [schedule, setSchedule] = useState(week);
  const [tasks, setTasks] = useState(work);
  const [currentTask, setCurrentTask] = useState<task>();
  const [startDay, setStartDay] = useState<day | null>();
  const [showModal, setShowModal] = useState(false);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log(e);
  };
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    task: task,
    day: day | null
  ) => {
    setCurrentTask(task);
    setStartDay(day);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //console.log(e);
  };
  const drophandler = (e: any, endDay: day) => {
    e.preventDefault();

    if (!startDay) {
      setTasks(tasks.filter((task: task) => task.id !== currentTask?.id));
      setSchedule(
        schedule.map((day: day) => {
          if (day.day === endDay.day) {
            day.tasks.push(currentTask);
          }
          return day;
        })
      );
    } else {
      const newShedule = schedule.map((day: day) => {
        if (day.day === startDay.day) {
          day.tasks = day.tasks.filter(
            (task: task) => task.id !== currentTask?.id
          );
        }
        if (day.day === endDay.day) {
          day.tasks.push(currentTask);
        }
        return day;
      });
      setSchedule(newShedule);
    }
  };

  const addTask = (task: task) => {
    setTasks([...tasks, task]);
  };

  const removeHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!startDay) {
      setTasks(tasks.filter((task: task) => task.id !== currentTask?.id));
    } else {
      const newShedule = schedule.map((day: day) => {
        if (day.day === startDay.day) {
          day.tasks = day.tasks.filter(
            (task: task) => task.id !== currentTask?.id
          );
        }

        return day;
      });
      setSchedule(newShedule);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {showModal && (
        <CreateModal addTask={addTask} closeCallback={setShowModal} />
      )}
      <Container>
        <h1>Распланируйте свою неделю</h1>
        <Button
          text={"Создать задачу"}
          actionCallback={() => setShowModal(true)}
        />
        <TaskWrapper>
          {tasks.map((task: task) => (
            <Task
              key={task.id}
              day={null}
              task={task}
              dragOverHandler={dragOverHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
              drophandler={drophandler}
            />
          ))}
        </TaskWrapper>
        <DayWrapper>
          {schedule.map((day: day) => (
            <Day
              key={day.day}
              day={day}
              dragOverHandler={dragOverHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
              drophandler={drophandler}
            />
          ))}
        </DayWrapper>
        <TrashWrapper
          onDragOver={(e) => dragOverHandler(e)}
          //onDragLeave={(e) => dragLeaveHandler(e)}
          //onDragStart={(e) => dragStartHandler(e)}
          //onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => removeHandler(e)}
        >
          <img src={trashIcon} alt="remove" />
        </TrashWrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
