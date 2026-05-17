import { AppRouter } from "./app/router/AppRouter";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
