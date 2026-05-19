# Orqa Admin Dashboard

A responsive admin dashboard built with React, TypeScript, and Vite.

The project demonstrates a typical admin workflow with mock authentication, protected routes, user management, reusable UI components, error handling, toast notifications, and a responsive layout that works across desktop and mobile screens.

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
- Toast feedback after successful actions

### Profile Settings

- Editable profile information
- Preference toggles
- Simulated async save state
- Success feedback

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
- User changes are stored in memory and reset on refresh.
- Automated tests are not included yet.
