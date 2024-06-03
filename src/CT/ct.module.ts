import { Module } from '@nestjs/common';
import { CommercetoolsController } from './ct.controller'; // Import the controller correctly
import { CommercetoolsService } from './ct.service';

@Module({
  controllers: [CommercetoolsController], // Add the controller to the module's controllers array
  providers: [CommercetoolsService],
})
export class ctModule {}
