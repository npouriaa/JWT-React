import AuthContextProvider from "./context/AuthContext";
import Routes from "./routes";
const App = () => {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

export default App;
