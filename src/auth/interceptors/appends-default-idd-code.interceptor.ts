import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { appendsDefaultIDDCode } from '../../lib/scripts/phone-number-manipulation';

/**
 * Intercepts the http request and if the payload has 'phoneNumber' without the International direct dialing (IDD) code
 * this appends the Mexico country code (+52)
 */
@Injectable()
export class AppendsDefaultIDDCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const phoneNumberSent: string = context.switchToHttp().getRequest().body.phoneNumber;
    context.switchToHttp().getRequest().body.phoneNumber = appendsDefaultIDDCode(phoneNumberSent);

    return call$;
  }
}
