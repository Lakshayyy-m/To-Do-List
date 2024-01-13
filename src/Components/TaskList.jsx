import React, { useState } from "react";
import styles from "./TaskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { taskAction } from "../store/redux-store";
import TaskDetails from "./TaskDetails";
import taskCompleteButton from "../assets/taskCompleteButton.svg";

const TaskList = () => {
  const dispatch = useDispatch();
  const [listDetailOpen, setListDetailOpen] = useState(null);
  const tasks = useSelector((state) => state.tasks[state.currentTaskList]);

  let headers;

  if (tasks.length === 0) {
    headers = "";
  } else if (tasks.length !== 0) {
    headers = (
      <li className={styles.listItem}>
        <div className={styles.completeButtonHeader }></div>
        <div className={styles.taskTitle}>Title</div>
        <div className={styles.taskDate}>Due Date</div>
      </li>
    );
  }

  const saveTask = (task) => {
    dispatch(
      taskAction.taskReplace({ oldTask: listDetailOpen, newTask: task })
    );
    setListDetailOpen(null);
  };

  const taskComplete = (task) => {
    dispatch(taskAction.taskComplete({ task }));
  };

  return (
    <motion.ul
      className={styles.wrapper}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {headers}
      {tasks.map((currVal) => {
        return (
          <motion.li
            key={currVal.id}
            layout="position"
            layoutId={currVal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.listItem} ${styles.hoverListItem}`}
            onClick={() => setListDetailOpen(currVal)}
          >
            <motion.div className={styles.completeButton}>
              <motion.img
                layout
                src={taskCompleteButton}
                onClick={(event) => {
                  event.stopPropagation();
                  return taskComplete(currVal);
                }}
              />
            </motion.div>
            <motion.div className={styles.taskTitle}>
              {currVal.title}
            </motion.div>
            <motion.div className={styles.taskDate}>{currVal.date}</motion.div>
          </motion.li>
        );
      })}
      <AnimatePresence>
        {listDetailOpen && (
          <TaskDetails task={listDetailOpen} saveTask={saveTask} />
        )}
      </AnimatePresence>
      ;
    </motion.ul>
  );
};

export default TaskList;
