import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Its Shivam Karn learning Nest JS ';
  }
}
