import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Books } from '../../../models/Books';
import { Users } from '../../../models/Users';
import { Op } from 'sequelize';
import 'dotenv/config';

const jwtSecret = String(process.env.JWT_SECRET);

module.exports = {
  get: async (req: Request, res: Response) => {
    // eslint-disable-next-line prefer-destructuring
    const token = req.headers.token;
    // const token = req.cookies.data;
    // console.log('token ', token);
    const decode: any = jwt.verify(String(token), jwtSecret);
    try {
      if (decode) {
        await Users.findOne({
          where: {
            id: decode.id,
          },
        }).then(data => {
          // console.log(data);
          const user: any = data;
          Books.findAll({
            where: {
              isRental: '대여 가능',
              bookRegion: `${user.region}`,
              userOwnerId: {
                [Op.notIn]: [user.id], // 자신이 올린 책은 제외
              },
            },
            include: [{ model: Users }],
          }).then(result => {
            // console.log(result);
            if (result) {
              res.json(result);
            }
          });
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};
