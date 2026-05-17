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
  "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "quis nostrud exercitation ullamco laboris nisi.",
  "velit esse cillum dolore eu fugiat nulla pariatur.",
];

export function Dashboard() {
  const { user } = useAuth();

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
