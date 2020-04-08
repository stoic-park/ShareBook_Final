import { Router, Request, Response, NextFunction } from 'express';
import { Users } from '../../../models/Users';

// const singup = Router();

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line object-curly-newline
    const { name, nickname, email, password, gender, region } = req.body;
    try {
      await Users.findOne({
        where: {
          email,
          password,
          nickname,
        },
      }).then(data => {
        if (data) {
          res.status(409).send('이미 가입한 유저입니다');
        } else {
          Users.create({
            name,
            nickname,
            email,
            password,
            gender,
            region,
          })
            .then(result => {
              if (result) res.json(result);
            })
            .catch(error => {
              console.log(error);
              res.sendStatus(500);
            });
        }
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
