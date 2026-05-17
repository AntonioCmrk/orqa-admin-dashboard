import "./ErrorFallback.css";

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="error-fallback">
      <div className="error-fallback__card">
        <p className="error-fallback__eyebrow">Application Error</p>

        <h2>Something went wrong.</h2>

        <p className="error-fallback__message">
          {error.message || "Unexpected application error."}
        </p>

        <button type="button" onClick={resetError}>
          Try Again
        </button>
      </div>
    </div>
  );
}
