import { Controller, Get } from '@nestjs/common';
import { CommercetoolsService } from './ct.service';

@Controller('commercetools')
export class CommercetoolsController {
  constructor(private readonly commercetoolsService: CommercetoolsService) {}

  @Get('token')
  async getToken() {
    const token = await this.commercetoolsService.getToken();
    return { token };
  }

  @Get('customers')
  async getCustomers() {
    const customers = await this.commercetoolsService.fetchCustomers();
    console.log('Fetched customers:', customers);
    return customers;
  }
}

export default CommercetoolsController; // Export the controller class
