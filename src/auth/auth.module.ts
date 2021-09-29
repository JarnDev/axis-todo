import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from '../constants';
import { authProviders } from './auth.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...authProviders],
  exports: [AuthService],
})
export class AuthModule {}
