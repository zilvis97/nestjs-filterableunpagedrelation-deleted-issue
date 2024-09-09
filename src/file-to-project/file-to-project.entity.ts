import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation as R,
} from 'typeorm';

@Entity('files_to_projects')
@ObjectType()
export class FileToProject {
  @PrimaryColumn({ name: 'project_id' })
  @FilterableField(() => ID, {
    allowedComparisons: ['eq', 'in'],
    overrideFilterTypeNamePrefix: 'Id',
  })
  projectID: string;

  @PrimaryColumn({ name: 'file_id' })
  @Field(() => ID)
  fileID!: string;

  @Column({ type: 'enum', enum: ['PHOTO', 'DOCUMENT'], default: 'DOCUMENT' })
  @FilterableField()
  type: 'PHOTO' | 'DOCUMENT';

  @ManyToOne('File', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_id' })
  file: R<File>;

  @Column({ default: 0, type: 'smallint' })
  @Field(() => Int)
  version: number;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date | null;
}
