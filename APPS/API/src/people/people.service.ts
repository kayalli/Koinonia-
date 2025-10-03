import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const { household, tags, ...data } = dto;
    return this.prisma.person.create({
      data: {
        ...data,
        household: household ? { create: household } : undefined,
        tags: tags ? { create: tags.map((t: string) => ({ tag: { create: { name: t } } })) } : undefined,
      },
    });
  }

  async find(where: any) {
    return this.prisma.person.findMany({ where, include: { household: true, tags: { include: { tag: true } } } });
  }
}
