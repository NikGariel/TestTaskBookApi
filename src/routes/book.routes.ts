import { Router } from 'express';
import bookController from '../controllers/book.controller';
import passport from 'passport';
import roleMiddleware from '../middlewares/role.middleware';
import { Role } from '../enums/role.enum';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { validateDto } from '../middlewares/validation.middleware';

const router = Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware(Role.Admin),
  validateDto(CreateBookDto),
  bookController.createBook
);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware(Role.Admin),
  validateDto(UpdateBookDto),
  bookController.updateBook
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware(Role.Admin),
  bookController.deleteBook
);

export default router;
