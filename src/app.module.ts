import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [AuthModule, ConfigModule],
  exports: [ConfigModule],
})
export class AppModule {}
