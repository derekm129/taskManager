"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/Icons"; 
import Modal from "../Modals/Modal";


interface Task {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
}

interface Props {
  title: string;
  tasks: Task[];
}
// TASKS
function Tasks({title, tasks = []}: Props) {
    const { theme, isLoading, openModal, modal } = useGlobalState();

    return (
    <TaskStyled theme={theme}>
      {/* Modal */}
      {modal && <Modal content={<CreateContent />} />}
        <h1>{title}</h1>
        {/* Task Grid */}
        {!isLoading ? (
        <div className="tasks grid">
            {tasks.map((task) => (
                <TaskItem 
                key={task.id} 
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
                isImportant={task.isImportant ?? false}
                />
            ))}
            {/* Create task */}
            <div className="create-task" onClick={openModal}>
                {plus}
                Add New Task
            </div>
        </div>
        ) : (
          <div className="tasks-loader w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )}
    </TaskStyled>
    );
}

// Task box
const TaskStyled = styled.main`
    padding: 2rem;
    width: 100%;
    background-color: #121212;
    border: 2px solid #1E5128;
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
     }
    
    > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

     &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      /* background-color: ${(props) => props.theme.colorPrimaryGreen}; */
      border-radius: 0.5rem;
    }
}

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`

export default Tasks;