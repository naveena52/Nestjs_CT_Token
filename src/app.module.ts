import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ctModule } from './CT/ct.module';

@Module({
  imports: [ctModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
