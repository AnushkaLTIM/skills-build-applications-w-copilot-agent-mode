import { useState, useEffect } from 'react'
import { getApiBaseUrl, fetchPaginatedData } from '../utils/api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const endpoint = `${getApiBaseUrl()}/users`
      const { items, error: fetchError } = await fetchPaginatedData(endpoint)

      if (fetchError) {
        setError(fetchError)
        setUsers([])
      } else {
        setUsers(items)
        setError(null)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section className="component-section">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="empty-state">No users found</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id || user.id} className="user-card">
              <h3>{user.name || 'Unknown User'}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
              {user.joinDate && (
                <p><strong>Member Since:</strong> {new Date(user.joinDate).toLocaleDateString()}</p>
              )}
              {user.activityCount !== undefined && (
                <p><strong>Activities:</strong> {user.activityCount}</p>
              )}
              {user.teams && (
                <p><strong>Teams:</strong> {Array.isArray(user.teams) ? user.teams.length : 0}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
