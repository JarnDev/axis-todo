import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeartbeatService } from './heartbeat.service';

@ApiTags('Heartbeat')
@Controller()
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Get('/heartbeat')
  @HttpCode(200)
  getHello(): string {
    return this.heartbeatService.getHello();
  }
}
