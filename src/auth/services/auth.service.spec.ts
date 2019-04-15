import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SMSService } from '../../lib/services/sms.service';
import { ConfigService } from '../../config.service';
import { DataStorage } from '../../data.storage';

describe('AuthService', () => {
  let service: AuthService;
  const mockConfigService: Partial<ConfigService> = {
    verificationMessage: 'Your verification code is',
    errorVerificationMessage: 'Verification Error',
    successfulVerificationMessage: 'Successfully Verification',
  };
  const mockSMSService: Partial<SMSService> = {};
  mockSMSService.sendMessage = (async (to: string, message: string) => {
    return { errorCode: null } as any;
  }) as any;
  mockSMSService.sendMessageWithErrorHandling = (async (to: string, message: string) => {
    return { errorCode: null } as any;
  }) as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'SMSService',
          useValue: mockSMSService,
        },
        {
          provide: 'ConfigService',
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendingVerificationAlgorithm method', () => {
    it('should be defined', () => {
      expect(service.sendingVerificationAlgorithm).toBeDefined();
    });

    it('should run without errors with a valid phone number', async () => {
      expect(await service.sendingVerificationAlgorithm('+528112345678')).toMatchObject({
        errorCode: null,
      });
    });

    it('should run without errors and should execute the getVerificationCodeByPhoneNumber function twice', async () => {
      const mockGetVerificationCodeByPhoneNumber = jest
        .spyOn(DataStorage, 'getVerificationCodeByPhoneNumber')
        .mockReturnValue(1234);

      expect(await service.sendingVerificationAlgorithm('+526186437843')).toMatchObject({
        errorCode: null,
      });

      expect(mockGetVerificationCodeByPhoneNumber).toBeCalledTimes(2);
    });
  });

  describe('verifyPhoneNumberWithVerificationCode method', () => {
    it('should be defined', () => {
      expect(service.verifyPhoneNumberWithVerificationCode).toBeDefined();
    });

    it('should throw an error with AN INVALID phone number and verification code', async () => {
      await expect(service.verifyPhoneNumberWithVerificationCode('+528112345678', '2345')).rejects.toThrow();
    });

    it('should run without errors with A VALID phone number and verification code', async () => {
      jest.spyOn(DataStorage, 'getVerificationCodeByPhoneNumber').mockReturnValue(1234);

      expect(await service.verifyPhoneNumberWithVerificationCode('+528112345678', '1234')).toMatchObject({
        errorCode: null,
      });
    });
  });
});
