import { Injectable } from '@nestjs/common';

@Injectable()
export class HeartbeatService {
  getHello(): string {
    return 'I`m working!';
  }
}
