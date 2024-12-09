import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './httpapikey.strategy';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
