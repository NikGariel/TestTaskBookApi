import { Router } from 'express';
import userController from '../controllers/user.controller';
import passport from 'passport';
import roleMiddleware from '../middlewares/role.middleware';
import { Role } from '../enums/role.enum';
import { validateDto } from '../middlewares/validation.middleware';
import { ChangeUserRoleDto, LoginUserDto, RegisterUserDto, VerifyEmailUserDto } from '../dto/user.dto';

const router = Router();

router.post('/register', validateDto(RegisterUserDto), userController.register);
router.post('/login', validateDto(LoginUserDto), userController.login);
router.post('/verify-email', validateDto(VerifyEmailUserDto), userController.verifyEmail);
router.get('/me', passport.authenticate('jwt', { session: false }), userController.getMe);
router.put(
  '/:id/role',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware(Role.Admin),
  validateDto(ChangeUserRoleDto),
  userController.updateRole
);
router.post('/firstAdmin', passport.authenticate('jwt', { session: false }), userController.firstAdminRole);

export default router;
