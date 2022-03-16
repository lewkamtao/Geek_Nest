/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  const env = configService.get('env');

  // 全局拦截器;
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 配置文档
  const options = new DocumentBuilder()
    .setTitle('Geek API')
    .setDescription('这是个简单的文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // 监听端口
  await app.listen(port);
  console.log(
    `成功！部署环境：${env} \n在线地址：localhost:${port} \n接口文档地址：localhost:${port}/docs`,
  );
}

bootstrap();
