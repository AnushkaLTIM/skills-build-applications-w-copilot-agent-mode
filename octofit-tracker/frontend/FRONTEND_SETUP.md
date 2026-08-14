# OctoFit Tracker - Frontend Setup Guide

This is the presentation tier of the OctoFit Tracker multi-tier application, built with React 19 and Vite.

## Overview

The frontend is a single-page application (SPA) that provides:
- Activity tracking and logging
- Workout management
- Team creation and management
- Competitive leaderboards
- User profiles
- Navigation via react-router-dom

## Tech Stack

- **Framework:** React 19 with Vite
- **Routing:** react-router-dom
- **Styling:** Bootstrap (optional - currently using CSS modules)
- **Environment:** Vite with support for environment variables

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file from the example:
   ```bash
   cp .env.local.example .env.local
   ```

3. **IMPORTANT:** Update `.env.local` with your Codespace name:
   ```
   VITE_CODESPACE_NAME=your-actual-codespace-name
   ```

## Environment Variables

### Required Variables

#### `VITE_CODESPACE_NAME`
- **Description:** The name of your GitHub Codespace
- **Format:** `your-codespace-name` (without URL scheme or port)
- **Usage:** Constructs API URLs like `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/`
- **Example:** `VITE_CODESPACE_NAME=copilot-agent-1`
- **Fallback:** If not defined, the app will use `http://localhost:8000/api` and log a warning

### Optional Variables

- `VITE_APP_NAME` - Display name for the application (default: "OctoFit Tracker")
- `VITE_API_TIMEOUT` - API request timeout in milliseconds (default: 5000)

## API Configuration

### API Endpoint Construction

The frontend uses the `getApiEndpoint()` utility from `src/utils/api.js` to construct API URLs:

```javascript
import { getApiEndpoint, fetchPaginatedData } from '../utils/api'

// Constructs: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
const endpoint = getApiEndpoint('activities')

// With path: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/123
const userEndpoint = getApiEndpoint('users', '123')
```

### Supported Response Formats

The API utilities handle both:

1. **Array responses:** Direct array of items
   ```json
   [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]
   ```

2. **Paginated responses:** Objects with `data` and `total` properties
   ```json
   {
     "data": [{ id: 1, name: "Item 1" }],
     "total": 100
   }
   ```

## Running the Application

### Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Project Structure

```
src/
├── App.jsx                 # Main app component with routing
├── main.jsx               # Entry point with BrowserRouter
├── index.css              # Global styles
├── App.css                # App-specific styles
├── utils/
│   └── api.js            # API utilities and helpers
├── components/
│   ├── Activities.jsx     # Activities view
│   ├── Leaderboard.jsx    # Leaderboard view
│   ├── Teams.jsx          # Teams view
│   ├── Users.jsx          # Users view
│   └── Workouts.jsx       # Workouts view
└── assets/
    └── [images and icons]
```

## Routing

The application uses react-router-dom with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Home page with quick links |
| `/activities` | Activities | View and track activities |
| `/workouts` | Workouts | View available workouts |
| `/teams` | Teams | View and manage teams |
| `/users` | Users | View user profiles |
| `/leaderboard` | Leaderboard | Competitive rankings |

## Component Features

All components follow the same pattern:
- Fetch data on mount using `useEffect`
- Display loading state while fetching
- Show error state if API call fails
- Render data in a responsive grid or table layout
- Handle both paginated and array responses

## Troubleshooting

### "VITE_CODESPACE_NAME is not defined"
- Create a `.env.local` file
- Add `VITE_CODESPACE_NAME=your-codespace-name`
- The app will fall back to localhost but show a warning

### API calls returning 404
- Verify `VITE_CODESPACE_NAME` is correct
- Ensure the backend API is running on port 8000
- Check that the API port is forwarded publicly (port 8000)

### CORS errors
- Ensure the backend has CORS enabled for `https://{VITE_CODESPACE_NAME}-8000.app.github.dev`
- Check backend CORS configuration

## API Utilities Reference

### `getApiBaseUrl()`
Returns the base API URL. Falls back to localhost if `VITE_CODESPACE_NAME` is not defined.

### `getApiEndpoint(component, path = '')`
Constructs a full API endpoint URL.
- `component`: The API resource name (e.g., 'activities', 'users')
- `path`: Optional additional path segments

### `fetchFromApi(endpoint, options = {})`
Fetch data from an API endpoint with error handling.
- Returns: `{ data, error }`

### `fetchPaginatedData(endpoint, options = {})`
Fetch data that may be paginated or in array format.
- Returns: `{ items, total, error }`
- Handles both direct arrays and `{ data: [...], total: number }` responses

## Notes

- The frontend requires the backend API to be running on port 8000
- For GitHub Codespace deployments, port 8000 must be forwarded and made public
- React 19 features like automatic batching are enabled by default
- Vite provides hot module replacement (HMR) for development
