import { Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>OctoFit Tracker</h1>
        </div>
        <ul className="nav-links">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <section className="home-section">
      <div className="hero-content">
        <h2>Welcome to OctoFit Tracker</h2>
        <p>Track your activities, manage teams, and compete on the leaderboard!</p>
        <div className="home-links">
          <Link to="/activities" className="btn btn-primary">View Activities</Link>
          <Link to="/leaderboard" className="btn btn-secondary">View Leaderboard</Link>
        </div>
      </div>
    </section>
  )
}

export default App
