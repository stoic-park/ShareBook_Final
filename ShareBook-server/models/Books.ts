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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './Users';

@Table
export class Books extends Model<Books> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  publisher!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  writer!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  quelity!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  image!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  isRental!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  bookRegion!: string;

  @ForeignKey(() => Users)
  @Column
  userOwnerId!: number;

  // 관계 설정 필요

  @AllowNull(true)
  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userBorrowerId!: number;

  @BelongsTo(() => Users)
  book!: Users;
}
