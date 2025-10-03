import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('v1/people')
@UseGuards(JwtGuard)
export class PeopleController {
  constructor(private readonly people: PeopleService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.people.create(dto);
  }

  @Get()
  async find(@Query('filter') filter?: string) {
    return this.people.find(filter ? JSON.parse(filter) : {});
  }
}
