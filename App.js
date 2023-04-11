import { Provider } from "react-redux";
import { store } from "./redux/store";

import Navigation from "./Navigation";

function App() {
  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
}

export default App;
