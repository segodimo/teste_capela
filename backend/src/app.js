import express, { json } from 'express'
import morgan from 'morgan'

// Import routes
import cinameRoutes from './routes/cinemas'
import filmeRoutes from './routes/filmes'
import sesfRoutes from './routes/sesfs';
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/cinemas', cinameRoutes);
app.use('/api/filmes', filmeRoutes);
app.use('/api/sessoes', sesfRoutes);

export default app;