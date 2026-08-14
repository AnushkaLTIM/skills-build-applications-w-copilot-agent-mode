import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>OctoFit Tracker</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/workouts">Workouts</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
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
