const PhoneNumbersAndVerificationCodesDataStorage: { [key: string]: number } = {};

/**
 * This file contains the data used by the application. In a real world scenario. We should consider to
 * use Redis, Mongo or a relational database to persist data after a process restart and to make this
 * project stateless.
 *
 * Note: if we set a persist and stateless storage to this file, remember to use a different configuration
 * for the tests.
 */
export class DataStorage {
  static setVerificationCodeToPhoneNumber(toSerialized: string, code: number): void {
    PhoneNumbersAndVerificationCodesDataStorage[toSerialized] = code;
  }

  static getVerificationCodeByPhoneNumber(phoneNumberSerialized: string): number {
    return PhoneNumbersAndVerificationCodesDataStorage[phoneNumberSerialized];
  }

  static deleteVerificationCodeByPhoneNumber(phoneNumberSerialized: string): void {
    delete PhoneNumbersAndVerificationCodesDataStorage[phoneNumberSerialized];
  }
}
