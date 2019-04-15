import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { serializePhoneNumber } from '../../lib/scripts/phone-number-manipulation';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetVerificationCodeDTO {
  @ApiModelProperty({
    example: '+52 (33) 8572 9532',
    description: 'The phone number that you want to verify',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  @Transform((value: string) => serializePhoneNumber(value))
  // @IsMobilePhone(null) should we use this instead?
  phoneNumber: string;
}
