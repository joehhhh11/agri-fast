import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalJwtAuthGuard } from './common/guards/global-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const configService = app.get(ConfigService);

  app.useGlobalGuards(new GlobalJwtAuthGuard(reflector, jwtService, configService));

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
