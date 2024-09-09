import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { FileToProject } from './file-to-project.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([FileToProject])],
      resolvers: [
        {
          EntityClass: FileToProject,
          DTOClass: FileToProject,
          update: { disabled: true },
          create: { many: { disabled: true } },
          read: { many: { withDeleted: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
  ],
})
export class FileToProjectModule {}
