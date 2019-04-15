import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { GetVerificationCodeDTO } from './dtos/get-verification-code.dto';
import { AuthService } from './services/auth.service';
import { VerifyPhoneDTO } from './dtos/verify-phone.dto';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
// tslint:disable-next-line:max-line-length
import { GetVerificationCodeSuccessfulResponse } from './interfaces/get-verification-code-successful-response.interface';
import { VerifyPhoneSuccessfulResponse } from './interfaces/verify-phone-successful-response.interface';

// @ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiUseTags('Get Verification Code')
  @Post('get-verification-code')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The request has succeeded.' })
  @ApiBadRequestResponse({ description: 'Validation error happened.' })
  @ApiInternalServerErrorResponse({ description: 'We could not send the message.' })
  async getVerificationCode(
    @Body() getVerificationCodeDTO: GetVerificationCodeDTO,
  ): Promise<GetVerificationCodeSuccessfulResponse> {
    await this.authService.sendingVerificationAlgorithm(getVerificationCodeDTO.phoneNumber);

    return { success: true };
  }

  @ApiUseTags('Verify Phone')
  @Post('verify-phone')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The request has succeeded.' })
  @ApiBadRequestResponse({ description: 'Validation error happened.' })
  @ApiInternalServerErrorResponse({ description: 'We could not send the message.' })
  @ApiUnprocessableEntityResponse({ description: 'Phone number and verification code mismatch.' })
  async verifyPhoneNumberWithCode(@Body() verifyPhoneDTO: VerifyPhoneDTO): Promise<VerifyPhoneSuccessfulResponse> {
    await this.authService.verifyPhoneNumberWithVerificationCode(
      verifyPhoneDTO.phoneNumber,
      verifyPhoneDTO.verificationCode,
    );

    return { success: true };
  }
}
