import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KtronixController } from './ktronix.controller';
import { KtronixService } from './ktronix.service';

@Module({
  imports: [HttpModule],
  controllers: [KtronixController],
  providers: [KtronixService],
})
export class KtronixModule {}
