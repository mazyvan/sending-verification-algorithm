import { generateA4DigitRandomVerificationCode } from './random-verification-code';

describe('Random Verification Code Library', () => {
  it('should be defined', () => {
    expect(generateA4DigitRandomVerificationCode).toBeDefined();
  });

  it('should return a 4 digit number', () => {
    const digitCounter = (num: number) => String(Math.floor(Math.abs(num))).length;

    expect(digitCounter(generateA4DigitRandomVerificationCode())).toBe(4);
    expect(digitCounter(generateA4DigitRandomVerificationCode())).toBe(4);
    expect(String(generateA4DigitRandomVerificationCode())).toHaveLength(4);
    expect(String(generateA4DigitRandomVerificationCode())).toHaveLength(4);
  });
});
