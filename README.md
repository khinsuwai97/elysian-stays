## Project Overview

Elysian Stays is a hotel/cabin management application built with React, TypeScript, and Vite. The application provides functionality for managing bookings, cabins, guests, and hotel operations with a focus on elegant UI and dark mode support.

## Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Run ESLint to check code quality
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Application Structure

The codebase follows a feature-based organization:

- `src/context/` - React Context providers for global state
  - `AuthContext.tsx` - Authentication state and mock login (localStorage-based)
  - `ThemeContext.tsx` - Dark/light theme toggle with localStorage persistence
- `src/hooks/` - Custom React hooks
  - `useData.ts` - Data fetching hooks using TanStack Query (placeholder for future API integration)
- `src/mockData/` - Mock data for cabins, bookings, settings, sales, and activities
- `src/types/` - TypeScript type definitions for domain models
- `src/ui/` - UI components organized by type
  - `components/` - Reusable components (Sidebar, StatCard, Toast, Icons, etc.)
  - `pages/` - Page-level components (Dashboard, Bookings, Cabins, Settings, etc.)
  - `AppLayout.tsx` - Main layout wrapper with Sidebar and content area

### Routing

React Router v7 handles navigation with protected routes. Key routes:

- `/` - Dashboard (protected)
- `/bookings` - Bookings list (protected)
- `/bookings/:bookingId` - Booking details (protected)
- `/checkin/:bookingId` - Check-in flow (protected)
- `/checkout/:bookingId` - Check-out flow (protected)
- `/cabins` - Cabin management (protected)
- `/users` - User management (protected)
- `/settings` - Application settings (protected)
- `/login` - Login page (public)

Authentication uses a `ProtectedRoute` component that redirects to `/login` if no user is authenticated. Users are stored in localStorage under the key `lumiereUser`.

### State Management

- **Authentication**: Context API (`AuthContext`) with localStorage persistence
- **Theme**: Context API (`ThemeContext`) with dark mode support via Tailwind CSS
- **Data Fetching**: TanStack Query (React Query) for caching and state management
- **Notifications**: react-hot-toast for user feedback

### Styling

Tailwind CSS v4 with custom color palette:

- Primary colors: `forest-*` (green shades)
- Background colors: `sand-*` (neutral/beige shades)
- Dark mode: Enabled via `dark:` prefix, toggled by adding/removing `dark` class on `<html>`

### Data Layer

Currently uses mock data (`src/mockData/index.ts`) with simulated API delays. The `useData.ts` hook provides a clean abstraction layer for future real API integration. All data fetching hooks return TanStack Query results with appropriate stale times:

- Cabins: 5 minutes
- Bookings: 2 minutes
- Settings: 10 minutes
- Sales data: 5 minutes
- Stay durations: 5 minutes
- Today's activity: 1 minute

### Key Domain Models

- `User` - Authentication user with role (admin/staff)
- `Cabin` - Property/room with capacity, pricing, and description
- `Booking` - Reservation with status (unconfirmed/checked-in/checked-out), guest info, and pricing
- `Guest` - Guest information with nationality
- `Settings` - Application configuration for booking rules and pricing

## Important Notes

- The app is currently frontend-only with mock authentication and data
- All user data persists in localStorage (keys: `lumiereUser`, `lumiereTheme`)
- The authentication has a hardcoded 1.5s delay to simulate network requests
- When integrating a real backend, replace the mock API functions in `src/hooks/useData.ts`
- TypeScript strict mode is enabled via separate app and node tsconfig files
