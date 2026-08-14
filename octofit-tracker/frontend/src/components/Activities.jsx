import { useState, useEffect } from 'react'
import { getApiEndpoint, fetchPaginatedData } from '../utils/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      const endpoint = getApiEndpoint('activities')
      const { items, error: fetchError } = await fetchPaginatedData(endpoint)

      if (fetchError) {
        setError(fetchError)
        setActivities([])
      } else {
        setActivities(items)
        setError(null)
      }
      setLoading(false)
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="loading">Loading activities...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section className="component-section">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="empty-state">No activities found</p>
      ) : (
        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="activity-card">
              <h3>{activity.type || 'Activity'}</h3>
              <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {activity.duration} minutes</p>
              <p><strong>Calories:</strong> {activity.calories}</p>
              {activity.distance && <p><strong>Distance:</strong> {activity.distance} km</p>}
              {activity.description && <p>{activity.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities
