import { useState } from "react";
import { StatCard } from "../../components/common/StatCard";
import { mockUsers } from "../../data/mockUsers";
import { useAuth } from "../../hooks/useAuth";
import { USERS_STORAGE_KEY } from "../../hooks/useUsers";
import type { User } from "../../types/user";
import { getUserStats } from "../../utils/users";
import "./Dashboard.css";

const activities = [
  "New editor account created for the support team.",
  "Three inactive users were reviewed this morning.",
  "Admin permissions updated for workspace managers.",
  "Pending invitations are ready for follow-up.",
];

function getDashboardUsers(): User[] {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!storedUsers) {
    return mockUsers;
  }

  try {
    return JSON.parse(storedUsers) as User[];
  } catch {
    return mockUsers;
  }
}

export function Dashboard() {
  const { user } = useAuth();
  const [simulateError, setSimulateError] = useState(false);
  const userStats = getUserStats(getDashboardUsers());

  const stats = [
    {
      label: "Total Users",
      value: String(userStats.totalUsers),
      helperText: "Managed accounts",
    },
    {
      label: "Active Users",
      value: String(userStats.activeUsers),
      helperText: "Ready to work",
    },
    {
      label: "Admins",
      value: String(userStats.admins),
      helperText: "Elevated access",
    },
    {
      label: "Inactive Users",
      value: String(userStats.inactiveUsers),
      helperText: "Needs review",
    },
  ];

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
