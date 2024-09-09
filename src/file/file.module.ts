import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { File } from './file.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([File])],
      resolvers: [
        {
          EntityClass: File,
          DTOClass: File,
          update: { disabled: true },
          create: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          read: { many: { withDeleted: true } },
        },
      ],
    }),
  ],
})
export class FileModule {}
