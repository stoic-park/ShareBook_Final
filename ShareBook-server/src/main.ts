import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import * as socket from 'socket.io';
// import * as http from 'http';
import booksRoutes from './routes/books';
import historyRoutes from './routes/history';
// eslint-disable-next-line import/extensions
import usersRoutes from './routes/users';
// import chatRoutes from './routes/chat';
import { sequelize } from '../models';
import { Chat } from '../models/Chat';
import { Books } from '../models/Books';

import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const app: Application = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

sequelize.sync();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: String(process.env.AWS_BUCKET),
    metadata: (req, file, cb) => {
      cb(null, { fieldNname: file.fieldname });
    },
    key: (req, file, cb) => {
      // let extension = path.extname(file.originalname);
      console.log(file);
      cb(null, file.originalname);
    },
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('etag', false);
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server Success');
});
app.use('/books', booksRoutes);
app.use('/history', historyRoutes);
app.use('/users', usersRoutes);
// app.use('/chat', chatRoutes);

app.post('/upload', upload.single('photo'), (req: Request, res: Response) => {
  console.log('req.file: ', req.file);
  const data: any = req.file;
  res.json(data.location);
});

// 채팅기능에 접속하는 엔드포인트
app.get('/chat', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

const msgStorage: string[] = [];

const chat = io
  .of('/chat')
  .on('connection', (socket: any, res: Response, req: Request) => {
    console.log('a user connected');

    let room: string;
    let bookId: number;

    //클라이언트에서 "login" 으로 메세지가 들어올 때 작동되는 함수
    socket.on('login', (data: any) => {
      console.log('data: ', data);
      console.log(`Client logged-in:
     room: ${data.room}
     bookId: ${data.id}`); // bookId

      // data에 담긴 room, id(bookId)를 변수에 담아준다.
      room = socket.room = data.room;
      bookId = socket.bookId = data.id;

      //로그인된 유저의 토큰에서 borrowerId 를 가져온다.
      const token = req.headers.token;
      const decoded: any = jwt.verify(
        String(token),
        String(process.env.JWT_SECRET),
      );

      //Chat 테이블에서 roomname을 찾아서 이전에 채팅한 기록을 찾는다.
      Chat.findOne({
        where: {
          room,
        },
      }).then(data => {
        // 이전에 채팅한 데이터가 있으면 그 값을 roomname으로 socket.join으로 방 참가한다.
        if (data) {
          console.log(data);
          socket.join(room);
          chat.to(room).emit('login', data.room, data.message); //roomname과 message를 클라이언트에 보낸다.
        } else {
          // 이전 채팅이 없으면 새로운 채팅방을 만든다.
          Books.findOne({
            // Book 테이블에서 ownerId를 찾아온다.
            where: {
              id: bookId,
              userOwnerId: decoded.id,
            },
          })
            .then(result => {
              if (result !== null) {
                //ownerId가 있으면 Chat 테이블에 생성한다.
                Chat.create({
                  room,
                  bookId,
                  ownerId: result.userOwnerId,
                  borrowerId: decoded.id,
                }).then(result => {
                  //생성한 값으로 join(room)하고, 클라이언트에 보내준다.
                  socket.join(room);
                  chat.to(room).emit('login', result);
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    });

    // 개별 데이터(객체)를 담아줄 수 있는 저장공간(msgStorage)을 만든다.
    // const msgStorage: string[] = [];
    // 1. [ { },{ } ,{}]

    //클라이언트에서 "chat message" 로 메세지가 들어올 때 작동되는 함수
    socket.on('chat message', (data: any) => {
      console.log('message from client: ', data);
      console.log('socket.room: ', socket.room);

      //data.msg 와 함께 어떤 값을 보여줘야 할까?? 닉네임..
      const room = (socket.room = data.room);

      msgStorage.push(data.msg);

      chat.to(room).emit('chat message', data.msg);
    });

    // const msg: any = {
    //   from: {
    //     name: socket.name,
    //     userid: socket.userid,
    //   },
    //   msg: data.msg,
    // };

    //클라이언트 측에서 나가기 버튼을 누를 때 일어나는 이벤트
    socket.on('pushClosingBtn', () => {
      const stringifiedMsg = JSON.stringify(msgStorage);

      //나가는 버튼 누를 때, 메세지를 데이터베이스에 저장하는 기능
      Chat.update({ message: stringifiedMsg }, { where: { room } })
        .then(result => {
          if (result) {
            socket.disconnect();
          }
        })
        .catch(error => {
          console.log(error);
        });
      // socket.on('disconnect', ())
    });

    // 소켓의 연결을 끊는다.
    socket.on('disconnect', () => {
      console.log('user disconnected' + socket.name);
    });
  });

export default server;
