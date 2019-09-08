import { Router } from 'express'
const router = Router();

// Controllers
import { createSessoes, getSessoess, getOneSessoes, deleteSessoes, updateSessoes } from '../controllers/sessoes.controller';
// import { getSessoess, createSessoes, updateSessoes, getOneSessoes, deleteSessoes } from '../controllers/Sessoes.controller';

// Routes
// router.route('/').get((req, res) => res.send('SESFS SESFS SESFS SESFS'));
router.post('/', createSessoes);
router.get('/', getSessoess);
router.get('/:id', getOneSessoes)
router.delete('/:id', deleteSessoes);
router.put('/:id', updateSessoes);

export default router;