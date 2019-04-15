import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
  let controller: AuthController;
  const mockAuthService = {
    sendingVerificationAlgorithm: async (to: string) => {
      return;
    },
    verifyPhoneNumberWithVerificationCode: async (phoneNumber: string, code: string) => {
      return;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'AuthService',
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get-verification-code', () => {
    it('should be defined', () => {
      expect(controller.getVerificationCode).toBeDefined();
    });

    it('should always return true', async () => {
      const result = { success: true };

      expect(await controller.getVerificationCode({ phoneNumber: '23' })).toEqual(result);
    });
  });

  describe('verify-phone', () => {
    it('should be defined', () => {
      expect(controller.verifyPhoneNumberWithCode).toBeDefined();
    });

    it('should always return true', async () => {
      const result = { success: true };

      expect(await controller.verifyPhoneNumberWithCode({ phoneNumber: '23', verificationCode: '1234' })).toEqual(
        result,
      );
    });
  });
});
