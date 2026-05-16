import { AppRouter } from "./app/router/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
