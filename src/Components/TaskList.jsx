import { useState } from "react";
import styles from "./TaskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { taskAction } from "../store/redux-store";
import TaskDetails from "./TaskDetails";
import taskCompleteButton from "../assets/taskCompleteButton.svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dragIcon from "../assets/dragIcon.svg";

const TaskList = () => {
  const dispatch = useDispatch();
  // state to control the dispkay of task details
  const [listDetailOpen, setListDetailOpen] = useState(null);
  // fetching the current task list from redux
  const tasks = useSelector((state) => state.tasks[state.currentTaskList]);

  // handling the display of headers for task list
  let headers;
  if (tasks.length === 0) {
    headers = "";
  } else if (tasks.length !== 0) {
    headers = (
      <li className={styles.listItem}>
        <div className={styles.completeButtonHeader}></div>
        <div className={styles.taskTitle}>Title</div>
        <div className={styles.taskDate}>Due Date</div>
        <div className={styles.dragIcon}></div>
      </li>
    );
  }

  // saving tasks permenantyl in redux
  const saveTask = (task) => {
    dispatch(
      taskAction.taskReplace({ oldTask: listDetailOpen, newTask: task })
    );
    setListDetailOpen(null);
  };

  // deleting the task on completion from redux
  const taskComplete = (task) => {
    dispatch(taskAction.taskComplete({ task }));
  };

  // handling sort on drag and drop
  const handleSortOnDrag = (startIndex, endIndex) => {
    dispatch(
      taskAction.taskListSort({
        startIndex,
        endIndex,
      })
    );
  };

  return (
    <DragDropContext
      onDragEnd={(params) =>
        handleSortOnDrag(params.source.index, params.destination.index)
      }
    >
      <AnimatePresence>
        <motion.ul
          className={styles.wrapper}
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {headers}
          <Droppable droppableId="droppable-1">
            {(provided, snapshot) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((currVal, index) => {
                    return (
                      <Draggable
                        draggableId={"Draggable - " + currVal.id}
                        key={currVal.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <motion.li
                              ref={provided.innerRef}
                              key={currVal.id}
                              layout="size"
                              layoutId={currVal.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`${styles.listItem} ${styles.hoverListItem}`}
                              {...provided.draggableProps}
                              onClick={() => {
                                setListDetailOpen(currVal);
                              }}
                            >
                              <motion.div className={styles.completeButton}>
                                <motion.img
                                  layout
                                  layoutId={"headerButton" + currVal.id}
                                  src={taskCompleteButton}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    return taskComplete(currVal);
                                  }}
                                />
                              </motion.div>
                              <motion.div
                                className={styles.taskTitle}
                                layout
                                layoutId={"headerTitle" + currVal.id}
                              >
                                {currVal.title}
                              </motion.div>
                              <motion.div
                                layout
                                layoutId={"headerDate" + currVal.id}
                                className={styles.taskDate}
                              >
                                {currVal.date}
                              </motion.div>
                              <motion.div
                                {...provided.dragHandleProps}
                                className={styles.dragIcon}
                              >
                                <img src={dragIcon} />
                              </motion.div>
                            </motion.li>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          {listDetailOpen && (
            <TaskDetails task={listDetailOpen} saveTask={saveTask} />
          )}
        </motion.ul>
      </AnimatePresence>
    </DragDropContext>
  );
};

export default TaskList;
