import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganisationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { name: string; slug: string }) {
    return this.prisma.organisation.create({ data: dto });
  }
}
