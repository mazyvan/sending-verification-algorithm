/**
 * Removes dashes, parenthesis, and spaces to a phone number string
 *
 * @param phoneNumber string
 */
export function serializePhoneNumber(phoneNumber: string): string {
  // If we do not want to make use of the @IsPhoneNumber() decorator that validates more details like
  // non-alphabetic characters or the country code (IID code). We also need to make use of the following code:
  //
  // validate(phoneNumber); And we also need to catch the exceptions

  const phoneNumberWithIDDCode = appendsDefaultIDDCode(phoneNumber);
  return phoneNumberWithIDDCode.replace(/ |-|\(|\)/g, '');
}

/**
 * if the 'phoneNumber' parameter does not have the International direct dialing (IDD) code. This appends
 * the Mexico country code (+52)
 *
 * @param phoneNumber string
 */
export function appendsDefaultIDDCode(phoneNumber: string) {
  return phoneNumber && typeof phoneNumber === 'string' && phoneNumber.charAt(0) !== '+'
    ? `+52${phoneNumber}`
    : phoneNumber;
}

/**
 * Throw an exception if the phone number has characters different from: numbers, spaces, dashes, parenthesis or
 * the plus symbol
 *
 * @param phoneNumber string
 */
export function validate(phoneNumber: string) {
  if (!phoneNumber || typeof phoneNumber !== 'string') throw new ErrorPhoneNumberIsRequired();

  const error = phoneNumber.split('').some(digit => !/[0-9]|\+| |-|\(|\)/.test(digit));
  if (error) throw new ErrorInvalidPhoneNumberFormat();

  return true;
}

export class ErrorPhoneNumberIsRequired extends Error {
  readonly code: 'ErrorPhoneNumberIsRequired';
  readonly name: 'ErrorPhoneNumberIsRequired';
  readonly message: 'Phone number could not be empty';
}

// tslint:disable-next-line:max-classes-per-file
export class ErrorInvalidPhoneNumberFormat extends Error {
  readonly code: 'ErrorInvalidPhoneNumberFormat';
  readonly name: 'ErrorInvalidPhoneNumberFormat';
  readonly message: 'Phone number can only contain numbers, spaces, dashes, parenthesis and the plus symbol';
}
