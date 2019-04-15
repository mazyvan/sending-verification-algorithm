import { Test, TestingModule } from '@nestjs/testing';
import { SMSService } from './sms.service';
import { ConfigModule } from '../../config.module';
import { ConfigService } from '../../config.service';

describe('SMSService', () => {
  let service: SMSService;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(async () => {
    const configModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    const configService = configModule.get<ConfigService>(ConfigService);

    mockConfigService = {
      twilioAccountSID: configService.testingTwilioAccountSID,
      twilioAuthToken: configService.testingTwilioAuthToken,
      twilioPhoneNumber: configService.testingTwilioPhoneNumber,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SMSService,
        {
          provide: 'ConfigService',
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SMSService>(SMSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage method', () => {
    it('should be defined', () => {
      expect(service.sendMessage).toBeDefined();
    });

    it('should send a message when passing properly the requested parameters', async () => {
      expect(await service.sendMessage('+528112345678', 'Test message')).toMatchObject({ errorCode: null });
    });

    it('should throw an exception if the number is incapable of receiving SMS messages', async () => {
      await expect(service.sendMessage('+15005550009', 'Test message')).rejects.toThrow();
    });
  });

  describe('sendMessageWithErrorHandling method', () => {
    it('should be defined', () => {
      expect(service.sendMessageWithErrorHandling).toBeDefined();
    });

    it('should send a message when passing properly the requested parameters', async () => {
      expect(await service.sendMessageWithErrorHandling('+528112345678', 'Test message')).toMatchObject({
        errorCode: null,
      });
    });

    it('should log the message to the console if there is an exception with SMS the sendMessage method', async () => {
      const fakeLogMessage = jest.spyOn(service as any, 'logMessage').mockImplementation((...args) => {
        return;
      });

      await service.sendMessageWithErrorHandling('+15005550009', 'Test message');
      expect(fakeLogMessage).toHaveBeenCalledWith('Test message');
    });

    // tslint:disable-next-line:quotemark
    it('should throw an exception if for any reason it also can not log the message', async () => {
      jest.spyOn(service as any, 'logMessage').mockImplementation((...args) => {
        throw new Error();
      });

      await expect(service.sendMessageWithErrorHandling('+15005550009', 'Test message')).rejects.toThrow();
    });
  });

  describe('logMessage method', () => {
    it('should be defined', () => {
      // tslint:disable-next-line:no-string-literal
      expect(service['logMessage']).toBeDefined();
    });

    it('should send a message when passing properly the requested parameters', async () => {
      // tslint:disable-next-line:no-string-literal
      expect(service['logMessage']('Can log to the console')).toBe(undefined);
    });
  });
});
