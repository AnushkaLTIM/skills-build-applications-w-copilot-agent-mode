import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    console.log('Cleared existing data');

    // Seed Users
    const users = await User.create([
      {
        name: 'Ava Thompson',
        email: 'ava@octofit.com',
        password: 'hashed_password_1',
        role: 'Athlete',
      },
      {
        name: 'Marcus Lee',
        email: 'marcus@octofit.com',
        password: 'hashed_password_2',
        role: 'Coach',
      },
      {
        name: 'Priya Shah',
        email: 'priya@octofit.com',
        password: 'hashed_password_3',
        role: 'Athlete',
      },
      {
        name: 'James Chen',
        email: 'james@octofit.com',
        password: 'hashed_password_4',
        role: 'Athlete',
      },
      {
        name: 'Sofia Rodriguez',
        email: 'sofia@octofit.com',
        password: 'hashed_password_5',
        role: 'Coach',
      },
    ]);

    console.log(`Created ${users.length} users`);

    // Seed Teams
    const teams = await Team.create([
      {
        name: 'Blue Hawks',
        members: 12,
        sport: 'Cross Country',
        members_list: [users[0]._id, users[1]._id],
      },
      {
        name: 'Red Falcons',
        members: 10,
        sport: 'Basketball',
        members_list: [users[2]._id, users[3]._id],
      },
      {
        name: 'Green Eagles',
        members: 15,
        sport: 'Soccer',
        members_list: [users[4]._id, users[0]._id],
      },
    ]);

    console.log(`Created ${teams.length} teams`);

    // Seed Activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        calories: 420,
        distance: 5.2,
        date: new Date('2024-08-10'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 45,
        calories: 310,
        date: new Date('2024-08-10'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 60,
        calories: 520,
        distance: 18.5,
        date: new Date('2024-08-11'),
      },
      {
        userId: users[3]._id,
        type: 'Swimming',
        durationMinutes: 40,
        calories: 380,
        distance: 2.0,
        date: new Date('2024-08-11'),
      },
      {
        userId: users[0]._id,
        type: 'Strength',
        durationMinutes: 50,
        calories: 350,
        date: new Date('2024-08-12'),
      },
      {
        userId: users[4]._id,
        type: 'Walking',
        durationMinutes: 30,
        calories: 150,
        distance: 2.5,
        date: new Date('2024-08-12'),
      },
    ]);

    console.log(`Created ${activities.length} activities`);

    // Seed Leaderboard
    const leaderboard = await Leaderboard.create([
      {
        userId: users[0]._id,
        rank: 1,
        name: 'Ava Thompson',
        points: 1280,
        activitiesCount: 2,
        totalCalories: 770,
      },
      {
        userId: users[2]._id,
        rank: 2,
        name: 'Priya Shah',
        points: 1215,
        activitiesCount: 1,
        totalCalories: 520,
      },
      {
        userId: users[1]._id,
        rank: 3,
        name: 'Marcus Lee',
        points: 1160,
        activitiesCount: 1,
        totalCalories: 310,
      },
      {
        userId: users[3]._id,
        rank: 4,
        name: 'James Chen',
        points: 1050,
        activitiesCount: 1,
        totalCalories: 380,
      },
      {
        userId: users[4]._id,
        rank: 5,
        name: 'Sofia Rodriguez',
        points: 890,
        activitiesCount: 1,
        totalCalories: 150,
      },
    ]);

    console.log(`Created ${leaderboard.length} leaderboard entries`);

    // Seed Workouts
    const workouts = await Workout.create([
      {
        name: 'Full Body Strength',
        description: 'Complete full body strength training session',
        difficulty: 'Intermediate',
        duration: 45,
        exercises: ['Squats', 'Bench Press', 'Deadlifts', 'Pull-ups'],
        targetMuscles: ['Chest', 'Back', 'Legs', 'Arms'],
        calories: 350,
      },
      {
        name: 'Beginner Cardio',
        description: 'Easy cardio workout for beginners',
        difficulty: 'Beginner',
        duration: 30,
        exercises: ['Jumping Jacks', 'High Knees', 'Burpees'],
        targetMuscles: ['Cardiovascular'],
        calories: 200,
      },
      {
        name: 'Advanced HIIT',
        description: 'High intensity interval training workout',
        difficulty: 'Advanced',
        duration: 20,
        exercises: ['Sprint Intervals', 'Mountain Climbers', 'Jump Squats'],
        targetMuscles: ['Full Body', 'Cardiovascular'],
        calories: 350,
      },
      {
        name: 'Core and Abs',
        description: 'Focused core strengthening workout',
        difficulty: 'Intermediate',
        duration: 25,
        exercises: ['Planks', 'Crunches', 'Russian Twists', 'Leg Raises'],
        targetMuscles: ['Abs', 'Core', 'Obliques'],
        calories: 150,
      },
      {
        name: 'Upper Body Strength',
        description: 'Upper body focused strength training',
        difficulty: 'Advanced',
        duration: 50,
        exercises: ['Bench Press', 'Rows', 'Shoulder Press', 'Pull-ups'],
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
        calories: 320,
      },
    ]);

    console.log(`Created ${workouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
