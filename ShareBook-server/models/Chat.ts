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
// import { Users } from './Users';

@Table
export class Chat extends Model<Chat> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  room!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  bookId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  userOwnerId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  userBorrowerId!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  message!: string;

  // 관계 설정 필요
}
