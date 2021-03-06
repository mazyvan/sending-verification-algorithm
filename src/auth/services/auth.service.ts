import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { serializePhoneNumber } from '../../lib/scripts/phone-number-manipulation';
import { generateA4DigitRandomVerificationCode } from '../../lib/scripts/random-verification-code';
import { SMSService } from '../../lib/services/sms.service';
import { ConfigService } from '../../config.service';
import { DataStorage } from '../../data.storage';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly SMSServiceInstance: SMSService) {}

  async sendingVerificationAlgorithm(to: string): Promise<MessageInstance> {
    const toSerialized = serializePhoneNumber(to);

    const code = !DataStorage.getVerificationCodeByPhoneNumber(toSerialized)
      ? generateA4DigitRandomVerificationCode()
      : DataStorage.getVerificationCodeByPhoneNumber(toSerialized);

    const message = `${this.configService.verificationMessage} ${code}`;

    DataStorage.setVerificationCodeToPhoneNumber(toSerialized, code);

    return await this.SMSServiceInstance.sendMessageWithErrorHandling(toSerialized, message);
  }

  async verifyPhoneNumberWithVerificationCode(phoneNumber: string, code: string): Promise<MessageInstance> {
    const codeParsed = parseInt(code, 10);
    const phoneNumberSerialized = serializePhoneNumber(phoneNumber);

    const successfulMessage = this.configService.successfulVerificationMessage;
    const errorMessage = this.configService.errorVerificationMessage;

    const codeSentToThatPhoneNumber = DataStorage.getVerificationCodeByPhoneNumber(phoneNumberSerialized);

    if (!codeSentToThatPhoneNumber || codeSentToThatPhoneNumber !== codeParsed) {
      await this.SMSServiceInstance.sendMessageWithErrorHandling(phoneNumberSerialized, errorMessage);
      throw new UnprocessableEntityException('Phone number and verification code mismatch');
    }

    const result = await this.SMSServiceInstance.sendMessageWithErrorHandling(phoneNumberSerialized, successfulMessage);

    // Only delete the phone number and code if we reach the user
    DataStorage.deleteVerificationCodeByPhoneNumber(phoneNumberSerialized);

    return result;
  }
}
