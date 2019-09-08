import { Router } from 'express'
const router = Router();

// Controllers
import { createFilme, getFilmes, getOneFilme, deleteFilme, updateFilme } from '../controllers/filme.controller';

// Routes
router.post('/', createFilme);
router.get('/', getFilmes);
router.get('/:id', getOneFilme)
router.delete('/:id', deleteFilme);
router.put('/:id', updateFilme);
// router.get('/sesf/:sesfid', getFilmeBySesf);

export default router;