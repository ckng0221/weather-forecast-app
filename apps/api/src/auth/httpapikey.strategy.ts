import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'header-api-key',
) {
  constructor(private authService: AuthService) {
    super({ header: 'x-api-key', prefix: '' }, false, (apiKey, done) => {
      const isValidKey = authService.validateApiKey(apiKey);
      if (!isValidKey) {
        return done(false);
      }
      return done(null, {});
    });
  }
}
