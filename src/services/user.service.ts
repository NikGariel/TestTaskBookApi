import { LoginUserDto, RegisterUserDto, VerifyEmailUserDto } from '../dto/user.dto';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/email';
import { compare, genSalt, hash } from 'bcryptjs';
import { Role } from '../enums/role.enum';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

class UserService {
  async register(data: RegisterUserDto) {
    const hashedPassword = await hash(data.password, await genSalt());
    const user = await userModel.create({
      data: {
        ...data,
        password: hashedPassword,
        role: Role.User,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    await sendVerificationEmail(user.email, token);

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await userModel.findUnique({ where: { username: data.username } });
    if (!user || !(await compare(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    if (user.emailVerified === false) {
      throw new Error('Need verify email');
    }

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  }

  async getMe(userId: number) {
    return userModel.findUnique({ where: { id: userId } });
  }

  async updateRole(userId: number, role: number) {
    return userModel.update({
      where: { id: userId },
      data: { role },
    });
  }

  async findUserByEmailOrUsername(email: string, username: string) {
    return userModel.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async firstAdminRole(userId: number) {
    const firstAdmin = await userModel.findFirst({ where: { role: Role.Admin } });
    if (firstAdmin) {
      throw new Error('Already have at least one admin user');
    }
    return userModel.update({
      where: { id: userId },
      data: { role: Role.Admin },
    });
  }

  async verifyEmail(data: VerifyEmailUserDto) {
    const { token } = data;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      if (!decoded.userId) {
        new Error('Invalid token');
      }
      return userModel.update({
        where: { id: decoded.userId },
        data: { emailVerified: true },
      });
    } catch (error) {
      // @ts-expect-error Fix for error message type
      throw new Error('Verification failed: ' + error.message);
    }
  }
}

export default new UserService();
