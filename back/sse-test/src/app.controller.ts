import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { date: new Date() } } as MessageEvent)),
    );
  }
}
