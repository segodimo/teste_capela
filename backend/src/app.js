import express, { json } from 'express'
import morgan from 'morgan'

// Import routes
import cinameRoutes from './routes/cinemas'
import filmeRoutes from './routes/filmes'
import sessoesRoutes from './routes/sessoes';
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/cinemas', cinameRoutes);
app.use('/api/filmes', filmeRoutes);
app.use('/api/sessoes', sessoesRoutes);

export default app;