/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  HasMany,
  BelongsToMany,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class History extends Model<History> {
  // 관계설정 필요

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bookId: number | undefined;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  owerStar: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  owerRating: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  borrowerStart: string | undefined;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  borrowerRating: string | undefined;
}
