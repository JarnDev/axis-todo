import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth)
    private authRepository: typeof Auth,

    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const auth = await this.authRepository.findOne({
      where: { login: createAuthDto.login },
    });

    if (auth) {
      throw new ForbiddenException('Login already exists!');
    }

    return this.authRepository.create(createAuthDto);
  }

  async validate(loginDto: LoginDto): Promise<any> {
    const auth = await this.authRepository.findOne({
      where: { login: loginDto.login },
    });

    if (auth && bcrypt.compareSync(loginDto.password, auth.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = auth;
      return result;
    }
    return null;
  }

  async generateToken(userId, userName) {
    const payload = { username: userName, sub: userId };
    return this.jwtService.sign(payload);
  }

  async findUserById(id: number) {
    return this.authRepository.findByPk(id);
  }
}
