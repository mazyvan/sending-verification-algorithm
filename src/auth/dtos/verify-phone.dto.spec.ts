import { ValidationPipe } from '@nestjs/common';
import { VerifyPhoneDTO } from './verify-phone.dto';

describe('Verify Phone DTO', () => {
  let validate: (data: any) => Promise<any>;

  beforeEach(() => {
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    validate = value => validationPipe.transform(value, { type: 'body', metatype: VerifyPhoneDTO, data: '' });
  });

  it('(validate function) should be defined', () => {
    expect(validate).toBeDefined();
  });

  it('should throw an error when the data passed to the DTO is empty', async () => {
    const valuesToCheck = {};

    await expect(validate(valuesToCheck)).rejects.toThrow();
  });

  it('should throw an error if the data has an INVALID "phoneNumber" or "verificationCode" parameter', async () => {
    await expect(validate({ phoneNumber: '+528112345678' })).rejects.toThrow();
    await expect(validate({ verificationCode: '12' })).rejects.toThrow();
    await expect(validate({ phoneNumber: null, verificationCode: '1' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+528112345678', verificationCode: '12' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+528112345678', verificationCode: '12345' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '1234', verificationCode: '12345' })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+528112345678', verificationCode: 'abc' })).rejects.toThrow();
    await expect(validate({ phoneNumber: 'abc', verificationCode: null })).rejects.toThrow();
    await expect(validate({ phoneNumber: '+52-6A-8764-3986' })).rejects.toThrow();
  });

  it('should works when "phoneNumber" and "verificationCode" parameters ARE VALID', async () => {
    expect(await validate({ phoneNumber: '+528112345678', verificationCode: '1234' })).toBeTruthy();
    expect(await validate({ phoneNumber: '+52 811 234 5678', verificationCode: '9999' })).toBeTruthy();
    expect(await validate({ phoneNumber: '+52(811)234-5678', verificationCode: '0001' })).toBeTruthy();
  });
});
