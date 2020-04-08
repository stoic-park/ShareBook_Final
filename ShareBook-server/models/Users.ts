/* eslint-disable no-param-reassign */
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
  BeforeCreate,
  BeforeFind,
} from 'sequelize-typescript';
import crypto from 'crypto';
import { Books } from './Books';

@Table
export class Users extends Model<Users> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  nickname: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  email: string | undefined;

  @AllowNull(false)
  @Column(DataType.TEXT)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  gender: string | undefined;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  region: string | undefined;

  @HasMany(() => Books)
  books!: Books[];

  @BeforeCreate
  static beforeCreateHook(user: Users, options: any): void {
    const shasum = crypto.createHmac('sha512', 'helloworld');
    shasum.update(user.password);
    user.password = shasum.digest('hex');
  }

  @BeforeFind
  static beforeFindHook(data: { where: { password: any } }): void {
    if (data.where.password) {
      const shasum = crypto.createHmac('sha512', 'helloworld');
      shasum.update(data.where.password);
      data.where.password = shasum.digest('hex');
    }
  }
}
