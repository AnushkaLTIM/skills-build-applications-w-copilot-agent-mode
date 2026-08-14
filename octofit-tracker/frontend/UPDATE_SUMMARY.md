# React 19 Frontend Update Summary

This document summarizes all the updates made to the OctoFit Tracker presentation tier.

## Files Created

### 1. **src/utils/api.js**
   - API utility module for managing endpoint construction
   - Functions:
     - `getApiBaseUrl()` - Returns base API URL with fallback support
     - `getApiEndpoint(component, path)` - Constructs full endpoint URLs
     - `fetchFromApi(endpoint, options)` - Basic fetch with error handling
     - `fetchPaginatedData(endpoint, options)` - Handles both array and paginated responses
   - Features:
     - Safe fallback to localhost if `VITE_CODESPACE_NAME` is unset
     - Automatic warning logging when fallback is used
     - Support for paginated responses (`{ data: [...], total: X }`)
     - Support for direct array responses

### 2. **src/components/Activities.jsx**
   - Displays a grid of activities fetched from the API
   - Features:
     - Async data fetching on component mount
     - Loading and error states
     - Empty state handling
     - Displays: type, date, duration, calories, distance, description

### 3. **src/components/Leaderboard.jsx**
   - Displays competitive rankings in a formatted table
   - Features:
     - Sorted leaderboard view
     - Table layout with rank, user name, points, activity count, total duration
     - Responsive table design
     - Handles pagination

### 4. **src/components/Teams.jsx**
   - Shows teams and their members
   - Features:
     - Team cards with description and member lists
     - Nested member display
     - Creation date tracking
     - Grid layout for multiple teams

### 5. **src/components/Users.jsx**
   - Displays user profiles
   - Features:
     - User cards with profile information
     - Email, bio, membership date
     - Activity count and team count display
     - Responsive grid layout

### 6. **src/components/Workouts.jsx**
   - Shows available workouts and exercises
   - Features:
     - Workout cards with type and intensity
     - Exercise lists with sets/reps
     - Duration and description
     - Creation date tracking

### 7. **.env.local.example**
   - Template for environment variable configuration
   - Documents:
     - `VITE_CODESPACE_NAME` (required)
     - `VITE_APP_NAME` (optional)
     - `VITE_API_TIMEOUT` (optional)
   - Instructions for Codespace deployment

### 8. **FRONTEND_SETUP.md**
   - Comprehensive setup and configuration guide
   - Covers:
     - Installation steps
     - Environment variables
     - API configuration
     - Running the application
     - Project structure
     - Routing information
     - Component features
     - Troubleshooting guide
     - API utilities reference

## Files Modified

### 1. **package.json**
   - **Added dependency:** `react-router-dom@^6.26.0`
   - Required for navigation and routing

### 2. **src/main.jsx**
   - **Added:** BrowserRouter wrapper around App component
   - Enables react-router-dom routing throughout the application

### 3. **src/App.jsx**
   - **Replaced:** Vite template starter with routing-based application
   - **Added:**
     - Routes for all components
     - Navigation bar with links
     - HomePage component with hero content
     - Route definitions for: home, activities, workouts, teams, users, leaderboard
   - **Imports:** All 5 main components and react-router-dom

### 4. **src/App.css**
   - **Replaced:** Starter template styles with comprehensive component styling
   - **Added styles for:**
     - App container and layout
     - Navigation bar
     - Cards (activities, teams, users, workouts)
     - Leaderboard table
     - Loading and error states
     - Empty states
     - Button styles
     - Grid layouts
     - Responsive design (mobile, tablet, desktop)
     - Dark mode support
   - **Features:**
     - Hover effects on cards
     - Smooth transitions
     - Mobile-responsive breakpoints
     - Accessibility support
     - Supports both light and dark color schemes

## Key Features Implemented

### Environment Variable Support
- Uses `import.meta.env.VITE_CODESPACE_NAME` for dynamic API URL construction
- Constructs URLs: `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`
- Safe fallback to `http://localhost:8000/api` if environment variable is not set
- Console warning when fallback is used to guide developers

### Navigation
- Six main routes: home, activities, workouts, teams, users, leaderboard
- Persistent navigation bar with links to all sections
- React Router navigation with `<Link>` components

### Data Fetching
- All components use consistent data fetching pattern
- Support for both paginated and array responses
- Error handling and user feedback
- Loading states during API calls

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet (768px) and larger screens
- Touch-friendly navigation
- Flexible grid layouts

### Accessibility
- Semantic HTML elements
- ARIA support in navigation
- Focus states on interactive elements
- Clear color contrast

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Create Environment File:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Configure Codespace Name:**
   Edit `.env.local` and set your Codespace name:
   ```
   VITE_CODESPACE_NAME=your-codespace-name
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   
   App will be available at: `http://localhost:5173`

5. **Build for Production:**
   ```bash
   npm run build
   ```

## API Endpoints

All endpoints use the pattern: `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

- `GET /api/activities/` - Fetch activities
- `GET /api/workouts/` - Fetch workouts
- `GET /api/teams/` - Fetch teams
- `GET /api/users/` - Fetch users
- `GET /api/leaderboard/` - Fetch leaderboard

## Component Data Requirements

### Activities
- `_id` or `id`
- `type`, `date`, `duration`, `calories`
- Optional: `distance`, `description`

### Leaderboard
- `_id` or `id`
- `user` (object with `name`) or `userId`
- `points`, `activityCount`, `totalDuration`

### Teams
- `_id` or `id`
- `name`, `description`, `members` (array)
- `createdAt` (ISO date string)

### Users
- `_id` or `id`
- `name`, `email`
- Optional: `bio`, `joinDate`, `activityCount`, `teams`

### Workouts
- `_id` or `id`
- `name`, `type`, `duration`
- Optional: `intensity`, `exercises` (array), `description`, `createdAt`

## Browser Support

- Modern browsers with ES2020+ support
- React 19 features enabled by default
- Requires JavaScript enabled

## Notes

- Port 8000 must be accessible from the frontend (forwarded and public in Codespace)
- CORS must be configured on the backend to allow requests from the frontend domain
- All components gracefully handle missing or incomplete data
- Empty states are shown when no data is available
- Error messages provide clear feedback on API failures
