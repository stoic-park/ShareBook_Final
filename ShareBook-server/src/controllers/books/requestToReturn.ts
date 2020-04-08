import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Books } from '../../../models/Books';

const jwtSecret = String(process.env.JWT_SECRET);

module.exports = {
  post: (req: Request, res: Response) => {
    // console.log(req.body.id);
    const bookId = req.body.id;
    // console.log(bookId);
    const token = req.headers.token;
    // console.log(token);
    const decoded: any = jwt.verify(String(token), jwtSecret);
    // console.log(decoded);
    if (decoded) {
      Books.update({ isRental: '반납 요청' }, { where: { id: bookId } })
        .then((result: any) => {
          Books.findOne({
            attributes: ['id', 'isRental'],
            where: { id: bookId },
          }).then((data: any) => res.status(200).send(data));
        })
        .catch((err: any) => {
          res.status(404).send(err.message);
        });
    } else {
      res.status(401).send('Unauthorized user');
    }
  },
};
