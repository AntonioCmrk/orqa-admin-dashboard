# Orqa Admin Dashboard

A responsive admin dashboard built with React, TypeScript, and Vite.

The project demonstrates a typical admin workflow with mock authentication, protected routes, persisted user and profile settings, reusable UI components, error handling, toast notifications, and a responsive layout that works across desktop and mobile screens.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Context API
- Plain CSS
- Local component state and reducers

## Features

### Authentication

- Mock login flow
- Protected routes for authenticated users
- Public route guard for the login page
- Auth persistence using `localStorage`
- Wrong email/password feedback on the login form

### Dashboard

- Statistics overview cards
- Recent activity section
- Error simulation for testing the error boundary
- Graceful fallback UI with recovery action

### User Management

- Create, edit, and delete users
- Search users by name or email
- Filter users by role
- Responsive table/card-style behavior for smaller screens
- User data persistence using `localStorage`
- Toast feedback after successful actions
- Sortable table columns
- Duplicate email prevention and inline form validation

### Profile Settings

- Editable profile information
- Preference toggles
- Simulated async save state
- Profile settings persistence using `localStorage`
- Toast feedback after saving

## Getting Started

Clone the repository and enter the nested app directory:

```bash
git clone https://github.com/AntonioCmrk/orqa-admin-dashboard.git
cd orqa-admin-dashboard/orqa-admin-dashboard
npm install
npm run dev
```

The Vite dev server will print the local URL in the terminal, usually:

```txt
http://localhost:5173/
```

## Quality Checks

Run the same checks used before submission:

```bash
npm run lint
npm run test
npm run build
```

## Manual QA Checklist

- Invalid login shows a clear form error after the simulated request.
- Valid login redirects to the dashboard.
- Logged-out users cannot access protected pages.
- Logged-in users cannot access the login page.
- Users can be created, edited, deleted, searched, filtered, and sorted.
- Duplicate user emails are blocked with inline validation.
- Dashboard stats reflect the stored user list.
- The dashboard error demo shows the fallback UI and recovery action.
- Sidebar navigation works on desktop and mobile widths.

## Demo Login

The mock login accepts only one email and password:

- Email: `admin@orqa.com`
- Password: `password`

Any other email or password shows a `Wrong email or password.` message on the login form.

## Project Structure

- `src/context` contains authentication and toast providers.
- `src/app/router` contains public and protected routing.
- `src/hooks` contains reusable state and context hooks.
- `src/reducers` contains user state update logic.
- `src/components` contains reusable UI components.
- `src/pages` contains route-level screens.

## Known Limitations

- Authentication is mocked and accepts only the demo credentials.
- There is no real backend integration.
- Data is stored in browser `localStorage`, not on a backend server.
- Automated tests focus on the highest-risk flows, not full end-to-end browser coverage.

### Priorities

I prioritized authentication, protected routing, user management CRUD, responsive layout, error handling, and clean component organization.

### Challenges

The main challenge was keeping the UI responsive while maintaining a consistent custom visual style across all pages and components.

### Future Improvements

Future improvements could include connecting the dashboard to a real backend API, adding full end-to-end test coverage, expanding role-based permissions, and introducing richer audit/activity history.
