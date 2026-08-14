import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

export function createServer(): Express {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());

  // API Routes

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'OctoFit API is running' });
  });

  // Users endpoints
  app.get('/api/users', async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // Teams endpoints
  app.get('/api/teams', async (req: Request, res: Response) => {
    try {
      const teams = await Team.find().populate('members_list');
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  });

  app.get('/api/teams/:id', async (req: Request, res: Response) => {
    try {
      const team = await Team.findById(req.params.id).populate('members_list');
      if (!team) {
        res.status(404).json({ error: 'Team not found' });
        return;
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team' });
    }
  });

  // Activities endpoints
  app.get('/api/activities', async (req: Request, res: Response) => {
    try {
      const activities = await Activity.find().populate('userId');
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  app.get('/api/activities/:id', async (req: Request, res: Response) => {
    try {
      const activity = await Activity.findById(req.params.id).populate('userId');
      if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
        return;
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activity' });
    }
  });

  app.get('/api/activities/user/:userId', async (req: Request, res: Response) => {
    try {
      const activities = await Activity.find({ userId: req.params.userId }).populate('userId');
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  // Leaderboard endpoints
  app.get('/api/leaderboard', async (req: Request, res: Response) => {
    try {
      const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId');
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  app.get('/api/leaderboard/:id', async (req: Request, res: Response) => {
    try {
      const entry = await Leaderboard.findById(req.params.id).populate('userId');
      if (!entry) {
        res.status(404).json({ error: 'Leaderboard entry not found' });
        return;
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
  });

  // Workouts endpoints
  app.get('/api/workouts', async (req: Request, res: Response) => {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch workouts' });
    }
  });

  app.get('/api/workouts/:id', async (req: Request, res: Response) => {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        res.status(404).json({ error: 'Workout not found' });
        return;
      }
      res.json(workout);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch workout' });
    }
  });

  // Statistics endpoint
  app.get('/api/stats', async (req: Request, res: Response) => {
    try {
      const stats = {
        users: await User.countDocuments(),
        teams: await Team.countDocuments(),
        activities: await Activity.countDocuments(),
        leaderboard: await Leaderboard.countDocuments(),
        workouts: await Workout.countDocuments(),
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  });

  return app;
}

export async function startServer(): Promise<void> {
  const PORT = Number(process.env.PORT || 8000);
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  const codespaceName = process.env.CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `https://localhost:${PORT}`;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  const app = createServer();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit API running on ${apiBaseUrl}`);
    console.log(`Health check: ${apiBaseUrl}/api/health`);
  });
}
