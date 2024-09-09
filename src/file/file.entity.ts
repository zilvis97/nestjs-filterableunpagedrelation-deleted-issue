import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { FileToProject } from 'src/file-to-project/file-to-project.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation as R,
} from 'typeorm';

@Entity('files')
@FilterableUnPagedRelation('toProjects', () => FileToProject, {
  disableSort: true,
  withDeleted: true,
})
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ type: 'text' })
  @FilterableField()
  name: string;

  @OneToMany(() => FileToProject, (fileToProject) => fileToProject.file, {
    cascade: true,
  })
  toProjects?: R<FileToProject>[];

  @DeleteDateColumn()
  @FilterableField(() => Date, { nullable: true })
  deletedAt?: Date | null;
}
