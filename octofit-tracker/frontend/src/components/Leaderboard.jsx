import { useState, useEffect } from 'react'
import { getApiBaseUrl, fetchPaginatedData } from '../utils/api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true)
      const endpoint = `${getApiBaseUrl()}/leaderboard`
      const { items, error: fetchError } = await fetchPaginatedData(endpoint)

      if (fetchError) {
        setError(fetchError)
        setLeaderboard([])
      } else {
        setLeaderboard(items)
        setError(null)
      }
      setLoading(false)
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="loading">Loading leaderboard...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section className="component-section">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="empty-state">No leaderboard data available</p>
      ) : (
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Duration</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td className="rank">#{index + 1}</td>
                  <td className="user-name">
                    {entry.user?.name || entry.userId || 'Unknown'}
                  </td>
                  <td className="points">{entry.points || 0}</td>
                  <td className="activities-count">{entry.activityCount || 0}</td>
                  <td className="duration">{entry.totalDuration || 0} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
