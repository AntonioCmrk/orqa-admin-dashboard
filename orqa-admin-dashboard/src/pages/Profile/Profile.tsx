import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import "./Profile.css";

const STORAGE_KEY = "orqa-profile-settings";

interface ProfileSettings {
  fullName: string;
  email: string;
  timezone: string;
  emailNotifications: boolean;
  weeklyReports: boolean;
  compactMode: boolean;
}

function getDefaultSettings(
  user: ReturnType<typeof useAuth>["user"],
): ProfileSettings {
  return {
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    timezone: "Europe/Zagreb",
    emailNotifications: true,
    weeklyReports: false,
    compactMode: false,
  };
}

function getStoredSettings(
  user: ReturnType<typeof useAuth>["user"],
): ProfileSettings {
  const defaultSettings = getDefaultSettings(user);
  const storedSettings = localStorage.getItem(STORAGE_KEY);

  if (!storedSettings) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...(JSON.parse(storedSettings) as Partial<ProfileSettings>),
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return defaultSettings;
  }
}

export function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const initialSettings = getStoredSettings(user);

  const [fullName, setFullName] = useState(initialSettings.fullName);
  const [email, setEmail] = useState(initialSettings.email);
  const [timezone, setTimezone] = useState(initialSettings.timezone);

  const [emailNotifications, setEmailNotifications] = useState(
    initialSettings.emailNotifications,
  );
  const [weeklyReports, setWeeklyReports] = useState(
    initialSettings.weeklyReports,
  );
  const [compactMode, setCompactMode] = useState(initialSettings.compactMode);

  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        fullName,
        email,
        timezone,
        emailNotifications,
        weeklyReports,
        compactMode,
      }),
    );

    setIsSaving(false);
    showToast("Profile settings saved successfully.");
  }

  return (
    <div className="profile-page">
      <section className="profile-page__header">
        <p className="profile-page__eyebrow">Account</p>

        <h2>Profile Settings</h2>

        <p>Manage your account information and application preferences.</p>
      </section>

      <form className="profile-form" onSubmit={handleSubmit}>
        <section className="profile-card">
          <div className="profile-card__header">
            <h3>Personal Information</h3>
            <p>Update your personal details and contact information.</p>
          </div>

          <div className="profile-form__grid">
            <label>
              <span>Full Name</span>

              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>

            <label>
              <span>Email Address</span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              <span>Timezone</span>

              <select
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
              >
                <option value="Europe/Zagreb">Europe/Zagreb</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New York</option>
              </select>
            </label>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card__header">
            <h3>Preferences</h3>
            <p>Customize how the dashboard behaves for your account.</p>
          </div>

          <div className="profile-preferences">
            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(event) =>
                  setEmailNotifications(event.target.checked)
                }
              />

              <div>
                <strong>Email Notifications</strong>
                <span>Receive important account notifications via email.</span>
              </div>
            </label>

            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={weeklyReports}
                onChange={(event) => setWeeklyReports(event.target.checked)}
              />

              <div>
                <strong>Weekly Reports</strong>
                <span>Receive a summary report every week.</span>
              </div>
            </label>

            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(event) => setCompactMode(event.target.checked)}
              />

              <div>
                <strong>Compact Mode</strong>
                <span>Reduce spacing across dashboard components.</span>
              </div>
            </label>
          </div>
        </section>

        <div className="profile-form__footer">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
