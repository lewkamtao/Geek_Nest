import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const method = context.getArgs()[0].method;
    const path = context.getArgs()[0].route.path;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`${method} ${path}_________ ${Date.now() - now}ms`)),
      );
  }
}
