import { Router } from 'express'
const router = Router();

// Controllers
import { createSesf } from '../controllers/sesfs.controller';
// import { getSesfs, createSesf, updateSesf, getOneSesf, deleteSesf } from '../controllers/Sesf.controller';

// Routes
// router.route('/').get((req, res) => res.send('SESFS SESFS SESFS SESFS'));
router.post('/', createSesf);
// router.get('/', getSesfs);
// router.put('/:id', updateSesf);
// router.delete('/:id', deleteSesf);
// router.get('/:id', getOneSesf)

export default router;