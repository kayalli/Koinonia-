import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: { email: string; password: string; orgSlug: string }) {
    const org = await this.prisma.organisation.findUnique({ where: { slug: dto.orgSlug } });
    if (!org) throw new Error('Org not found');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash, orgId: org.id },
    });
    return { id: user.id, email: user.email };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException();
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException();
    const payload = { sub: user.id, email: user.email, orgId: user.orgId };
    return { accessToken: this.jwt.sign(payload) };
  }
}
