import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // tslint:disable-next-line:quotemark
  it("should throw an exception if the env variables doesn't match the validation", () => {
    // tslint:disable-next-line:no-string-literal
    expect(() => service['validateInput']({ wrongValue: 'true' })).toThrow();
  });

  // tslint:disable-next-line:quotemark
  it("should throw an exception if the env variables doesn't match the validation and there is no PORT", () => {
    const savedPORT = process.env.PORT;
    process.env.PORT = '';

    // tslint:disable-next-line:no-string-literal
    expect(() => service['validateInput']({ wrongValue: 'true' })).toThrow();

    process.env.PORT = savedPORT;
  });

  describe('get methods', () => {
    it('should have all the methods required', async () => {
      expect(service.getEnv).toBeDefined();
      expect(service.isApiAuthEnabled).toBeDefined();
      expect(service.port).toBeDefined();
      expect(service.verificationMessage).toBeDefined();
      expect(service.successfulVerificationMessage).toBeDefined();
      expect(service.errorVerificationMessage).toBeDefined();
      expect(service.twilioAccountSID).toBeDefined();
      expect(service.twilioAuthToken).toBeDefined();
      expect(service.twilioPhoneNumber).toBeDefined();
      expect(service.testingTwilioAccountSID).toBeDefined();
      expect(service.testingTwilioAuthToken).toBeDefined();
      expect(service.testingTwilioPhoneNumber).toBeDefined();
    });
  });
});
