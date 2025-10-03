import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './people/people.module';
import { OrganisationsModule } from './organisations/organisations.module';

@Module({
  imports: [PrismaModule, AuthModule, PeopleModule, OrganisationsModule],
})
export class AppModule {}
