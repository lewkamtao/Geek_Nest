import { Module } from '@nestjs/common';
import { CosController } from './cos.controller';

@Module({
  controllers: [CosController]
})
export class CosModule {}
