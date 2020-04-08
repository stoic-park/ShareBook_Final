import { Request, Response, NextFunction } from 'express';
import { Users } from '../../../models/Users';
import jwt from 'jsonwebtoken';

const jwtSecret = String(process.env.JWT_SECRET);

module.exports = {
  post: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let token: string;

    try {
      await Users.findOne({
        where: {
          email: email,
          password: password,
        },
      }).then(data => {
        if (data) {
          token = jwt.sign(
            {
              id: data.id,
            },
            jwtSecret,
            {
              expiresIn: '5m',
            },
          );
          // res.cookie('data', token);
          res.setHeader('token', token);
          res.json({
            token: token,
          });
        } else {
          res.status(400).send('회원이 아닙니다');
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
