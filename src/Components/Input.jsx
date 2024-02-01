import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Input.module.css";
import done from "../assets/doneButton.svg";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../store/redux-store";
import TaskStructure from "../store/TaskStructure";

const Input = () => {
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [dateEmpty, setDateEmpty] = useState(false);
  const titleRef = useRef();
  const dateRef = useRef();
  const dispatch = useDispatch();

  const addTask = () => {
    //State reset
    setTitleEmpty(false);
    setDateEmpty(false);

    //Checking for empty fields
    if (titleRef.current.value.trim() === "") {
      setTitleEmpty(true);
      titleRef.current.focus();
      if (dateRef.current.value.trim() === "") {
        setDateEmpty(true);
        return;
      }
      return;
    }
    if (dateRef.current.value.trim() === "") {
      setDateEmpty(true);
      dateRef.current.focus();
      return;
    }

    dispatch(
      taskAction.taskAdder({
        task: new TaskStructure(
          titleRef.current.value.trim(),
          dateRef.current.value.trim(),
          "",
          [],
          Math.random()
        ),
      })
    );
    titleRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        className={`${styles["adder-description"]} ${
          titleEmpty ? styles.error : ""
        }`}
        type="text"
        placeholder={`${
          titleEmpty
            ? "Kindly enter all the details"
            : "Add a task and its due date"
        }`}
        ref={titleRef}
      />
      <input
        className={`${styles.date} ${dateEmpty ? styles.error : ""}`}
        type="date"
        placeholder="Date"
        ref={dateRef}
      />
      <button className={styles.add} onClick={addTask}>
        Add task
        <span className={styles["material-symbols-outlined"]}>
          <img src={done} />
        </span>
      </button>
    </motion.div>
  );
};

export default Input;
