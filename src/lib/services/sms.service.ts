import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import * as Twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { serializePhoneNumber } from '../scripts/phone-number-manipulation';
import { ConfigService } from '../../config.service';

@Injectable()
export class SMSService {
  private readonly twilioClient: Twilio.Twilio;
  private readonly twilioNumber: string;

  constructor(private readonly configService: ConfigService) {
    this.twilioNumber = configService.twilioPhoneNumber;
    this.twilioClient = Twilio(configService.twilioAccountSID, configService.twilioAuthToken);
  }

  /**
   * This method tries to send an SMS to the number passed for parameter. It first serialize the number using
   * the serializePhoneNumber() function
   *
   * @param to string
   * @param message string
   */
  async sendMessage(to: string, message: string): Promise<MessageInstance> {
    const toSerialized = serializePhoneNumber(to);

    return await this.twilioClient.messages.create({ from: this.twilioNumber, body: message, to: toSerialized });
  }

  /**
   * This method tries to send an SMS to the number passed for parameter. If for any reason It can't send the
   * message it will log it to the console. And if for any strange reason it also can not do that. it will throw
   * an Internal Server Error Exception
   *
   * @param to string
   * @param message string
   */
  async sendMessageWithErrorHandling(to: string, message: string): Promise<MessageInstance> {
    try {
      return await this.sendMessage(to, message);
    } catch (error) {
      try {
        this.logMessage(message);
      } catch (error) {
        throw new InternalServerErrorException('We could not send the message');
      }
    }
  }

  private logMessage(message: string) {
    Logger.log(message, 'SMSService');
  }
}
