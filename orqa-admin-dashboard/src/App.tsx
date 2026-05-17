import { AppRouter } from "./app/router/AppRouter";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
