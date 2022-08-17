import { AppProvider } from "./context/AppProvider";
import Validator from "./utils/Validator";

const App = () => {
  return (
    <AppProvider>
      <Validator></Validator>
    </AppProvider>
  );
};

export default App;
