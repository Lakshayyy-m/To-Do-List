import "./App.css";
import Header from "./Components/Header";
import styles from "./App.module.css";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import store from "./store/redux-store";


function App() {
  return (
    <Provider store={store}>
      <Header />
      <hr className={styles.horizontal} />
      <Body />
    </Provider>
  );
}

export default App;
