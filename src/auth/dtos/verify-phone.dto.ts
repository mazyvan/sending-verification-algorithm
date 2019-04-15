import { IsNotEmpty, IsPhoneNumber, IsString, IsNumberString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { serializePhoneNumber } from '../../lib/scripts/phone-number-manipulation';
import { ApiModelProperty } from '@nestjs/swagger';

export class VerifyPhoneDTO {
  @ApiModelProperty({
    example: '+52 33 1234 4321',
    description: 'The phone number to verify',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  @Transform((value: string) => serializePhoneNumber(value))
  // @IsMobilePhone(null) should we use this instead?
  phoneNumber: string;

  @ApiModelProperty({
    example: '1234',
    description: 'The code that was sent via SMS to verify the phone',
  })
  @IsNotEmpty()
  @Length(4, 4)
  @IsNumberString()
  verificationCode: string;
}
