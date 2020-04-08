import { Router, Request, Response, NextFunction } from 'express';
import { History } from '../../../models/History';

module.exports = {
  get: (req: Request, res: Response) => {
    res.status(200).send('check lists i borrowed!');
  },
};
