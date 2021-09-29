import {
  Controller,
  Post,
  Logger,
  HttpCode,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Authentication } from '../interfaces/authentication.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Login')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ description: 'Required Fields', type: LoginDto })
  async login(@User() authentication: Authentication) {
    return {
      token: await this.authService.generateToken(
        authentication.id,
        authentication.name,
      ),
      token_type: 'Bearer',
    };
  }

  @ApiTags('Register')
  @Post()
  @HttpCode(200)
  @ApiBody({ description: 'Required Fields', type: CreateAuthDto })
  async create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
