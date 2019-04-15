import { ValidationPipe } from '@nestjs/common';
import { GetVerificationCodeDTO } from './get-verification-code.dto';

describe('Get Verification Code DTO', () => {
  let validate: (data: any) => Promise<any>;

  beforeEach(() => {
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    validate = value => validationPipe.transform(value, { type: 'body', metatype: GetVerificationCodeDTO, data: '' });
  });

  it('(validate function) should be defined', () => {
    expect(validate).toBeDefined();
  });

  it('should throw an error when the data passed to the DTO is empty', async () => {
    const valuesToCheck = {};

    await expect(validate(valuesToCheck)).rejects.toThrow();
  });

  it('should throw an error if the data has an INVALID "phoneNumber" parameter', async () => {
    await expect(validate({ phoneNumber: undefined })).rejects.toThrow();
    await expect(validate({ phoneNumber: null })).rejects.toThrow();
    await expect(validate({ phoneNumber: '1234' })).rejects.toThrow();
    await expect(validate({ phoneNumber: 'abc' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+52-6A-8764-3986' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '123456789' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+52-61-8764-3986-0' })).rejects.toThrow();
  });

  it('should works when "phoneNumber" parameter IS VALID', async () => {
    expect(await validate({ phoneNumber: '+528112345678' })).toEqual({ phoneNumber: '+528112345678' });
    expect(await validate({ phoneNumber: '+12078112345' })).toEqual({ phoneNumber: '+12078112345' });
    expect(await validate({ phoneNumber: '+1(541)7543010' })).toEqual({ phoneNumber: '+15417543010' });
  });

  it('should works when "phoneNumber" parameter IS VALID and has dashes in it', async () => {
    expect(await validate({ phoneNumber: '+52-3345627890' })).toEqual({ phoneNumber: '+523345627890' });
    expect(await validate({ phoneNumber: '+52-625-3456-789' })).toEqual({ phoneNumber: '+526253456789' });
    expect(await validate({ phoneNumber: '+52-81-3456-7891' })).toEqual({ phoneNumber: '+528134567891' });
    expect(await validate({ phoneNumber: '+1-541-754-3010' })).toEqual({ phoneNumber: '+15417543010' });
  });

  it('should works when "phoneNumber" parameter IS VALID and has spaces in it', async () => {
    // await expect(await validate({ phoneNumber: '+52-12-3456-7890' })).toEqual({ phoneNumber: '+52-12-3456-7890' });
    expect(await validate({ phoneNumber: '+52 33 4562 1234' })).toEqual({ phoneNumber: '+523345621234' });
  });
});
