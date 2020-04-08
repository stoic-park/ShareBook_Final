import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { Books } from '../../../models/Books';
import { History } from '../../../models/History';
import 'dotenv/config';

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
      Books.update({ isRental: '대여 중' }, { where: { id: bookId } })
        .then(() => {
          History.create({
            bookId,
            // owerStar: null,
            // owerRating: null,
            // borrowerStart: null,
            // borrowerRating: null,
          })
            .then((result: any) => {
              res.status(200).send(result);
            })
            .catch((err: any) => {
              res.status(404).send(err.message);
            });
        })
        .catch((err: any) => {
          console.error(err);
          res.status(404).send(err.message);
        });
    } else {
      res.status(401).send('Unauthorized user');
    }
  },
};
