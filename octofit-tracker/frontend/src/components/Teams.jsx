import { useState, useEffect } from 'react'
import { getApiEndpoint, fetchPaginatedData } from '../utils/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      const endpoint = getApiEndpoint('teams')
      const { items, error: fetchError } = await fetchPaginatedData(endpoint)

      if (fetchError) {
        setError(fetchError)
        setTeams([])
      } else {
        setTeams(items)
        setError(null)
      }
      setLoading(false)
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="loading">Loading teams...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section className="component-section">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="empty-state">No teams found</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team._id || team.id} className="team-card">
              <h3>{team.name}</h3>
              <p><strong>Description:</strong> {team.description || 'No description'}</p>
              <p><strong>Members:</strong> {team.members?.length || 0}</p>
              {team.members && team.members.length > 0 && (
                <div className="team-members">
                  <strong>Team Members:</strong>
                  <ul>
                    {team.members.map((member) => (
                      <li key={member._id || member.id}>
                        {member.name || member.email || 'Unknown'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {team.createdAt && (
                <p className="created-date">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
