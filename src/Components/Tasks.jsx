import React from "react";
import TaskList from "./TaskList";
import Input from "./Input";
import styles from './Tasks.module.css'

const Tasks = () => {
  return (
    <div className={styles.wrapper}>
      <Input />
      <TaskList />
    </div>
  );
};

export default Tasks;
