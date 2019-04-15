/**
 * It generates a 4 digit random number
 */
export function generateA4DigitRandomVerificationCode() {
  return Math.floor(Math.random() * 9000) + 1000;
}
