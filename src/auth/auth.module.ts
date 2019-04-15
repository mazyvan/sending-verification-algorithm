import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { SMSService } from '../lib/services/sms.service';
import { ConfigModule } from '../config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, SMSService],
})
export class AuthModule {}
