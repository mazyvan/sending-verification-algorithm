import {
  serializePhoneNumber,
  appendsDefaultIDDCode,
  validate,
  ErrorPhoneNumberIsRequired,
  ErrorInvalidPhoneNumberFormat,
} from './phone-number-manipulation';

describe('Phone Number Manipulation Library', () => {
  describe('serializePhoneNumber function', () => {
    it('should be defined', () => {
      expect(serializePhoneNumber).toBeDefined();
    });

    it('should serialize the phoneNumber when it has dashes', () => {
      expect(serializePhoneNumber('+52-3345627890')).toBe('+523345627890');
      expect(serializePhoneNumber('+52-625-3456-789')).toBe('+526253456789');
      expect(serializePhoneNumber('+52-81-3456-7891')).toBe('+528134567891');
      expect(serializePhoneNumber('+1-541-754-3010')).toBe('+15417543010');
    });

    it('should serialize the phoneNumber when it has spaces', () => {
      expect(serializePhoneNumber('+52 334562789 0')).toBe('+523345627890');
      expect(serializePhoneNumber('+52 625 3456 789')).toBe('+526253456789');
      expect(serializePhoneNumber('+52 81 3456 7891')).toBe('+528134567891');
      expect(serializePhoneNumber('+1 541 754 3010')).toBe('+15417543010');
    });

    it('should serialize the phoneNumber when it has both (dashes and spaces)', () => {
      expect(serializePhoneNumber('+52 334-562789 0')).toBe('+523345627890');
      expect(serializePhoneNumber('+52-625 3456 789')).toBe('+526253456789');
      expect(serializePhoneNumber('+52 81-3456-7891')).toBe('+528134567891');
      expect(serializePhoneNumber('+1-541-754 3010')).toBe('+15417543010');
    });
  });

  describe('appendsDefaultIDDCode function', () => {
    it('should be defined', () => {
      expect(appendsDefaultIDDCode).toBeDefined();
    });

    it('should return the same value if it already has a country code', () => {
      expect(appendsDefaultIDDCode('+52-3345627890')).toBe('+52-3345627890');
      expect(appendsDefaultIDDCode('+1-541 754-3010')).toBe('+1-541 754-3010');
    });

    it('should add the IID code when the value does not have it', () => {
      expect(appendsDefaultIDDCode('334562789 0')).toBe('+52334562789 0');
      expect(appendsDefaultIDDCode('55-8676-4392')).toBe('+5255-8676-4392');
    });
  });

  describe('validate function', () => {
    it('should be defined', () => {
      expect(validate).toBeDefined();
    });

    it('should return a truthy value if the string seams like a valid phone number', () => {
      expect(validate('+52-3345627890')).toBeTruthy();
      expect(validate('+1-541 754-3010')).toBeTruthy();
      expect(validate('+1-(541) 7-54-30-10')).toBeTruthy();
      expect(validate('+1-(541) 7-54-30-10')).toBeTruthy();
    });

    // tslint:disable-next-line:quotemark
    it("should throw a ErrorPhoneNumberIsRequired exception if the value is not present or it's not a string", () => {
      expect(() => validate(undefined)).toThrow(ErrorPhoneNumberIsRequired);
      expect(() => validate(null)).toThrow(ErrorPhoneNumberIsRequired);
    });

    it('should throw a ErrorInvalidPhoneNumberFormat exception if the value has invalid characters', () => {
      expect(() => validate('+1-(541) 7-54-30-1a0')).toThrow(ErrorInvalidPhoneNumberFormat);
      expect(() => validate('abc')).toThrow(ErrorInvalidPhoneNumberFormat);
      expect(() => validate('[52]6548762987')).toThrow(ErrorInvalidPhoneNumberFormat);
    });
  });
});
