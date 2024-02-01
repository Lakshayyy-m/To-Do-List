import React, { useState, useRef } from "react";
import styles from "./TaskList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import done from "../assets/doneButton.svg";
import editButton from "../assets/editButton.svg";
import TaskStructure from "../store/TaskStructure";

const TaskDetails = ({ task, saveTask }) => {
  //state for Add Steps Input
  const [addStepInput, setAddStepInput] = useState(false);
  //state for Title and Date edit
  const [editInputs, setEditInputs] = useState(false);
  //task title edit ref
  const taskTitleRef = useRef();
  //task date edit ref
  const taskDateRef = useRef();
  //task description edit ref
  const taskDescriptionRef = useRef();
  //task steps input ref
  const addStepInputValue = useRef();
  //state for task title
  const [taskTitle, setTaskTitle] = useState(task.title);
  //state for task date
  const [taskDate, setTaskDate] = useState(task.date);
  let taskDescription = task.description;
  //state for task steps
  const [taskSteps, setTaskSteps] = useState([...task.tasks]);

  //saving details of the task on close
  const saveDetails = () => {
    saveTask(
      new TaskStructure(
        taskTitle,
        taskDate,
        taskDescriptionRef.current.value,
        taskSteps,
        task.id
      )
    );
  };

  //adding steps to the task
  const addStep = () => {
    if (addStepInputValue.current.value.trim() === "") {
      return;
    }
    setTaskSteps((prev) => {
      prev.push(addStepInputValue.current.value);
      return [...prev];
    });
    setAddStepInput(false);
  };

  // deleting steps on completion
  const removeStep = (value) => {
    setTaskSteps((prev) => {
      const finalSteps = prev.filter((current, index) => {
        return index !== value;
      });
      return [...finalSteps];
    });
  };

  // saving header details on edit
  const saveHeaderDetails = () => {
    if (
      taskTitleRef.current.value.trim() !== "" &&
      taskDateRef.current.value.trim() !== ""
    ) {
      setTaskTitle(taskTitleRef.current.value.trim());
      setTaskDate(taskDateRef.current.value.trim());
    }
    return;
  };

  return (
    <motion.div className={styles.detailsWrapper} layout>
      <AnimatePresence>
        <motion.div className={styles.taskDetails} layoutId={task.id}>
          <motion.div className={styles.left}>
            {!editInputs && (
              <motion.div
                className={styles.headerDetails}
                layout="position"
                layoutId={"headerInput" + task.id}
              >
                <motion.div
                  className={styles.taskTitle}
                  layoutId={"headerTitle" + task.id}
                  layout="position"
                >
                  {taskTitle}
                </motion.div>
                <motion.div
                  className={styles.taskDate}
                  layout="position"
                  layoutId={"headerDate" + task.id}
                >
                  {taskDate}
                </motion.div>
                <motion.button
                  layout="position"
                  layoutId={"headerButton" + task.id}
                  className={styles.editButton}
                  onClick={() => setEditInputs((prev) => !prev)}
                >
                  <img src={editButton} />
                </motion.button>
                <motion.button
                  layout
                  layoutId={"doneButton" + task.id}
                  onClick={saveDetails}
                  className={styles.detailsCloserButton}
                >
                  Save & Close
                </motion.button>
              </motion.div>
            )}
            {editInputs && (
              <motion.div
                className={styles.headerDetails}
                layout="position"
                layoutId={"headerInput" + task.id}
              >
                <motion.input
                  ref={taskTitleRef}
                  className={styles.addStepInput}
                  defaultValue={taskTitle}
                  layout="position"
                  layoutId="headerTitle"
                />
                <motion.input
                  ref={taskDateRef}
                  className={styles.addStepInput}
                  defaultValue={taskDate}
                  layout="position"
                  layoutId="headerDate"
                  type="date"
                />
                <motion.button
                  className={styles.editButton}
                  layout
                  layoutId="headerButton"
                  onClick={saveHeaderDetails}
                >
                  <img
                    src={done}
                    onClick={() => setEditInputs((prev) => !prev)}
                  />
                </motion.button>
              </motion.div>
            )}
            <motion.textarea
              className={styles.description}
              defaultValue={taskDescription}
              placeholder="Add a description..."
              ref={taskDescriptionRef}
            />
          </motion.div>
          <motion.ul
            className={styles.taskList}
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              layout="position"
              className={styles.addStep}
              onClick={() => {
                setAddStepInput((prev) => !prev);
                setTimeout(() => {
                  addStepInputValue.current.focus();
                }, 500);
              }}
            >
              Add a step
            </motion.p>
            {addStepInput && (
              <motion.li className={styles.inputItem} layout="position">
                <motion.input
                  type="text"
                  className={styles.addStepInput}
                  ref={addStepInputValue}
                  onKeyDown={(e) => {
                    e.key === "Enter" ? addStep() : "";
                  }}
                />
                <motion.button className={styles.tick} onClick={addStep}>
                  <motion.img src={done} />
                </motion.button>
              </motion.li>
            )}
            {taskSteps.map((currVal, index) => {
              return (
                <>
                  <motion.li
                    layout="position"
                    className={styles.stepItems}
                    key={Math.random()}
                    onClick={() => removeStep(index)}
                  >
                    {currVal}
                  </motion.li>
                </>
              );
            })}
          </motion.ul>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskDetails;
