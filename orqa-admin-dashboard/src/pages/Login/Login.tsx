import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@orqa.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__content">
        <section className="login-visual" aria-label="ORQA command center">
          <div className="login-visual__brand">
            <span className="login-visual__mark">
              <img src={logo} alt="Orqa logo" />
            </span>
            <span>ORQA Admin</span>
          </div>

          <div className="login-visual__copy">
            <p className="login-visual__eyebrow">Command access</p>
            <h1>Control the workspace from one secure command center.</h1>
            <p>
              Monitor users, permissions, and activity through a secure admin
              layer tuned for quick decisions.
            </p>
          </div>

          <div className="terminal-panel">
            <div className="terminal-panel__grid">
              <div>
                <span>Status</span>
                <strong>Online</strong>
              </div>
              <div>
                <span>Users</span>
                <strong>248</strong>
              </div>
              <div>
                <span>Alerts</span>
                <strong>03</strong>
              </div>
            </div>
            <div className="signal-stack" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        <section className="login-card" aria-labelledby="login-title">
          <div className="login-card__header">
            <p className="login-card__eyebrow">Secure gateway</p>
            <h2 id="login-title">Welcome back</h2>
            <p>Sign in with the demo operator account.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                placeholder="admin@orqa.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="password-field__toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <p className="login-form__error" role="alert" aria-live="polite">
                {error}
              </p>
            )}

            <button
              className="login-form__submit"
              type="submit"
              disabled={isSubmitting || !email || !password}
            >
              <span>
                {isSubmitting ? "Authenticating..." : "Enter dashboard"}
              </span>
            </button>
          </form>

          <p className="login-demo">
            Demo login: <strong>admin@orqa.com</strong> /{" "}
            <strong>password</strong>
          </p>
        </section>
      </div>
    </main>
  );
}
