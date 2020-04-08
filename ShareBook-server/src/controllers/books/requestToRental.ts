import { Request, Response, NextFunction } from 'express';
import { Books } from '../../../models/Books';
import { Users } from '../../../models/Users';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = String(process.env.JWT_SECRET);

module.exports = {
  post: async (req: Request, res: Response) => {
    const { id } = req.body;
    // console.log('req.body ', id);
    // console.log(req.body);
    const token = req.headers.token;
    const decoded: any = jwt.verify(String(token), jwtSecret);

    try {
      if (decoded) {
        // eslint-disable-next-line no-shadow
        const isRental = await Books.update(
          {
            isRental: '대여 요청',
            userBorrowerId: decoded.id,
          },
          {
            where: {
              // eslint-disable-next-line object-shorthand
              id: id, // 7처럼 직접 책 id를 넣으면 포스트맨에서 update가능, id는 가능한지 확인 필요
            },
          },
        );
        res.json(isRental);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
