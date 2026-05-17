import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Orqa Admin Dashboard</p>
    </footer>
  );
}
