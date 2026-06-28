# Taskmanagement Backend

Express + MongoDB API for the Taskmanagement frontend.

## Setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

API base URL: `http://localhost:4000/api`

Demo login after seeding:

- Email: `admin@taskmanagement.local`
- Password: `Admin@12345`

## Main Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/admin/users/pending`
- `PATCH /api/admin/users/:id/approve`
- `PATCH /api/admin/users/:id/reject`
- `GET /api/users`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `GET /api/teams`
- `GET /api/notifications`
- `GET /api/reports/summary`
- `POST /api/uploads`

Protected routes require:

```txt
Authorization: Bearer <token>
```

## Account Approval Flow

Signup creates an inactive `pending` user. Pending users cannot log in.

An admin reviews requests in the frontend at `/admin/users`, then approves or rejects them. Approved users become active and can log in normally.
