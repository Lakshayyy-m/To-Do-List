import { useRef, useState } from "react";
import styles from "./ListPanel.module.css";
import { useSelector, useDispatch } from "react-redux";
import done from "../assets/doneButton.svg";
import { taskAction } from "../store/redux-store";
import { motion } from "framer-motion";

const ListPanel = () => {
  const [listInput, setListInput] = useState(false);
  const listName = useRef();
  const tasks = useSelector((state) => state.tasks);
  const currentList = useSelector((state) => state.currentTaskList);
  const dispatch = useDispatch();

  //changing the active list
  const changeCurrentList = (currVal) => {
    dispatch(taskAction.changeCurrentTaskList({ listName: currVal }));
  };

  //adding the new list
  const addList = () => {
    setListInput((prev) => !prev);
    setTimeout(() => {
      listName.current.focus();
    }, 700);
  };

  //confirming the list add
  const confirmListAdd = () => {
    if (listName.current.value !== "") {
      dispatch(taskAction.listAdder({ listName: listName.current.value }));
      setListInput(false);
    }
  };

  return (
    <motion.div layout className={styles.wrapper}>
      <h1 className={styles.heading}>Lists</h1>

      <motion.ul layout="position" className={styles.list}>
        <motion.li>
          <button className={styles.add} onClick={addList}>
            Add List +
          </button>
        </motion.li>
        {Object.keys(tasks).map((currVal) => {
          return (
            <motion.li
              layout
              onClick={() => changeCurrentList(currVal)}
              className={`${styles.listItem} ${
                currentList === currVal ? styles.activeList : ""
              }`}
              key={Math.random()}
            >
              {currVal}
            </motion.li>
          );
        })}
        {listInput && (
          <li className={styles.inputItem}>
            <input
              type="text"
              className={styles.listInput}
              ref={listName}
              onKeyDown={(e) => {
                e.key === "Enter" ? confirmListAdd() : "";
              }}
            />
            <button className={styles.tick} onClick={confirmListAdd}>
              <img src={done} />
            </button>
          </li>
        )}
      </motion.ul>
    </motion.div>
  );
};

export default ListPanel;
