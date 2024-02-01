import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialTasks = { tasks: { Default: [] }, currentTaskList: "Default" };

const taskSlice = createSlice({
  name: "Tasks",
  initialState: initialTasks,
  reducers: {
    taskAdder(state, action) {
      state.tasks[state.currentTaskList].push(action.payload.task);
    },
    changeCurrentTaskList(state, action) {
      state.currentTaskList = action.payload.listName;
    },
    listAdder(state, action) {
      state.tasks[action.payload.listName] = [];
    },
    taskComplete(state, action) {
      state.tasks[state.currentTaskList].splice(
        [state.tasks[state.currentTaskList].indexOf(action.payload.task)],
        1
      );
    },
    taskReplace(state, action) {
      state.tasks[state.currentTaskList].splice(
        [state.tasks[state.currentTaskList].indexOf(action.payload.oldTask)],
        1,
        action.payload.newTask
      );
    },
    taskListSort(state, action) {
      state.tasks[state.currentTaskList].splice(
        action.payload.endIndex,
        0,
        state.tasks[state.currentTaskList].splice(
          action.payload.startIndex,
          1
        )[0]
      );
    },
  },
});

export const taskAction = taskSlice.actions;

const store = configureStore({
  reducer: taskSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
