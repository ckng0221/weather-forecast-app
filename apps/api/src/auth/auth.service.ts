import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private serverApiKey = this.configService.get('API_KEY');
  constructor(private configService: ConfigService) {}

  validateApiKey(apiKey: string): boolean {
    if (!this.serverApiKey) {
      console.error('API Key not found in the server.');

      throw new HttpException('Internal Server Error', 500);
    }

    if (apiKey === this.serverApiKey) {
      return true;
    }
    return false;
  }
}
