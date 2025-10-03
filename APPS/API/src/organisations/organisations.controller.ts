import { Controller, Post, Body } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';

@Controller('v1/organisations')
export class OrganisationsController {
  constructor(private readonly orgs: OrganisationsService) {}

  @Post()
  async create(@Body() dto: { name: string; slug: string }) {
    return this.orgs.create(dto);
  }
}
