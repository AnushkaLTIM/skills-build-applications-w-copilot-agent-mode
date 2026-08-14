import { useState, useEffect } from 'react'
import { getApiEndpoint, fetchPaginatedData } from '../utils/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true)
      const endpoint = getApiEndpoint('workouts')
      const { items, error: fetchError } = await fetchPaginatedData(endpoint)

      if (fetchError) {
        setError(fetchError)
        setWorkouts([])
      } else {
        setWorkouts(items)
        setError(null)
      }
      setLoading(false)
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="loading">Loading workouts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section className="component-section">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="empty-state">No workouts found</p>
      ) : (
        <div className="workouts-grid">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="workout-card">
              <h3>{workout.name || 'Workout'}</h3>
              <p><strong>Type:</strong> {workout.type || 'General'}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              {workout.intensity && (
                <p><strong>Intensity:</strong> {workout.intensity}</p>
              )}
              {workout.exercises && (
                <div className="exercises-list">
                  <strong>Exercises ({workout.exercises.length}):</strong>
                  <ul>
                    {workout.exercises.map((exercise, index) => (
                      <li key={index}>
                        {exercise.name || `Exercise ${index + 1}`}
                        {exercise.sets && ` - ${exercise.sets} sets`}
                        {exercise.reps && ` × ${exercise.reps} reps`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {workout.description && <p>{workout.description}</p>}
              {workout.createdAt && (
                <p className="created-date">
                  Created: {new Date(workout.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
