import { Router } from 'express'
const router = Router();

// Controllers
import { createCinema, getCinemas, getOneCinema, deleteCinema, updateCinema } from '../controllers/cinema.controller';

// Routes
router.post('/', createCinema);
router.get('/', getCinemas);
router.get('/:id', getOneCinema)
router.delete('/:id', deleteCinema);
router.put('/:id', updateCinema);

export default router;