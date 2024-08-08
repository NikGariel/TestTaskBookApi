import { Request, Response } from 'express';
import userService from '../services/user.service';
import UserService from '../services/user.service';
import { LoginUserDto, RegisterUserDto, VerifyEmailUserDto } from '../dto/user.dto';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const data: RegisterUserDto = req.body;
      const existingUserByEmailOrUsername = await UserService.findUserByEmailOrUsername(
        req.body.email,
        req.body.username
      );

      if (existingUserByEmailOrUsername) {
        res.status(400).json({ error: 'Email or Username is already in use.' });
        return;
      }

      const user = await userService.register(data);
      res.status(201).json({
        id: user!.id,
        username: user!.username,
        email: user!.email,
        role: user!.role,
        emailVerified: user!.emailVerified,
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginUserDto = req.body;
      const token = await userService.login(data);
      res.status(200).json({ token });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(401).json({ error: error.message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const user = await userService.getMe(req.user!.id);
      res.status(200).json({
        id: user!.id,
        username: user!.username,
        email: user!.email,
        role: user!.role,
        emailVerified: user!.emailVerified,
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { role } = req.body;
      const user = await userService.updateRole(id, role);
      res.status(200).json({
        id: user!.id,
        username: user!.username,
        email: user!.email,
        role: user!.role,
        emailVerified: user!.emailVerified,
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const data: VerifyEmailUserDto = req.body;
      const user = await userService.verifyEmail(data);
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(400).json({ error: error.message });
    }
  }

  async firstAdminRole(req: Request, res: Response) {
    try {
      const user = await userService.getMe(req.user!.id);
      const updateUser = await userService.firstAdminRole(user!.id);
      res.status(200).json({
        id: updateUser.id,
        username: updateUser.username,
        email: updateUser.email,
        role: updateUser.role,
        emailVerified: updateUser.emailVerified,
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
