import { useState } from "react";
import { StatCard } from "../../components/common/StatCard";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.css";

const stats = [
  { label: "Total Users", value: "248", helperText: "+12% this month" },
  { label: "Active Users", value: "196", helperText: "+8% this month" },
  { label: "Admins", value: "12", helperText: "Stable" },
  { label: "Pending Invites", value: "7", helperText: "Needs review" },
];

const activities = [
  "New editor account created for the support team.",
  "Three inactive users were reviewed this morning.",
  "Admin permissions updated for workspace managers.",
  "Pending invitations are ready for follow-up.",
];

export function Dashboard() {
  const { user } = useAuth();
  const [simulateError, setSimulateError] = useState(false);

  if (simulateError) {
    throw new Error(
      "Failed to load dashboard analytics. Please try again later.",
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Overview</p>
          <h2>Welcome back, {user?.name}</h2>
          <p>
            Monitor workspace activity, user access, and key administrative
            metrics from one place.
          </p>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h3>Error Handling Demo</h3>
          <span>Testing application robustness</span>
        </div>

        <button
          className="dashboard-error-button"
          type="button"
          onClick={() => setSimulateError(true)}
        >
          Simulate Dashboard Error
        </button>
      </section>

      <section className="dashboard-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            helperText={stat.helperText}
          />
        ))}
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h3>Recent Activity</h3>
          <span>Latest updates</span>
        </div>

        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
