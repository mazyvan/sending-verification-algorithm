import { Observable } from 'rxjs';
import { AppendsDefaultIDDCodeInterceptor } from './appends-default-idd-code.interceptor';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context.host';
import { Request } from 'express';

describe('AppendsDefaultIDDCodeInterceptor', () => {
  let interceptor: AppendsDefaultIDDCodeInterceptor;

  beforeEach(() => {
    interceptor = new AppendsDefaultIDDCodeInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor.intercept).toBeDefined();
  });

  it('should append +52 on phone numbers that does not have the IDD code', async () => {
    const request: Partial<Request> = { body: { phoneNumber: '6188060279' } };
    const executionContext = new ExecutionContextHost([request]);

    interceptor.intercept(executionContext, new Observable());
    expect(executionContext.switchToHttp().getRequest().body.phoneNumber).toBe('+526188060279');
  });

  it('should return the same sent body when "phoneNumber" is not present', async () => {
    const request: Partial<Request> = { body: { randomValue: 'some text' } };
    const executionContext = new ExecutionContextHost([request]);

    interceptor.intercept(executionContext, new Observable());
    expect(executionContext.switchToHttp().getRequest().body).toEqual(request.body);
  });

  it('should return "phoneNumber" exactly equals if it stats with a "+" symbol', async () => {
    const request: Partial<Request> = { body: { phoneNumber: '+526188060279' } };
    const executionContext = new ExecutionContextHost([request]);

    interceptor.intercept(executionContext, new Observable());
    expect(executionContext.switchToHttp().getRequest().body.phoneNumber).toBe('+526188060279');
  });
});
