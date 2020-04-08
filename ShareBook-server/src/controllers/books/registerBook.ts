import { Request, Response, NextFunction } from 'express';
import { Books } from '../../../models/Books';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

module.exports = {
  post: async (req: Request, res: Response) => {
    const {
      name,
      publisher,
      writer,
      quelity,
      description,
      image,
      isRental,
      bookRegion,
      userOwnerId,
      userBorrowerId,
    } = req.body;
    // const secret = process.env.JWT_SECRET;
    const token = req.headers.token;
    const decoded: any = jwt.verify(
      String(token),
      String(process.env.JWT_SECRET),
    );
    try {
      if (decoded) {
        await Books.create({
          name: name,
          publisher: publisher,
          writer: writer,
          quelity: quelity,
          description: description,
          image: image,
          isRental: '대여 가능',
          bookRegion: bookRegion,
          userOwnerId: decoded.id,
        })
          .then(result => {
            if (result) res.json(result);
          })
          .catch(error => {
            console.log(error);
            res.sendStatus(500);
          });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
