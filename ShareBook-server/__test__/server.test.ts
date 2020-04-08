import request from 'supertest';
import app from '../src/main';
import { Users } from '../models/Users';
import { Books } from '../models/Books';
import { History } from '../models/History';
import 'dotenv/config'; // 이걸 불러와서 실제 로직에서 사용하는 .env가 작동함

const usersFixture = require('../__test__/fixtures/users.json');
const booksFixture = require('../__test__/fixtures/books.json');

describe('Test the root path', () => {
  test('It should response the GET method', async done => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
    done();
  });
});

describe('Bare Minimum Requirements', () => {
  let token: string;

  beforeEach(async () => {
    await Users.destroy({ where: {}, truncate: false });
    await Books.destroy({ where: {}, truncate: false });
    await Users.create(usersFixture[0]);
    await Books.create(booksFixture[0]);
  });

  beforeAll(done => {
    request(app)
      .post('/users/signin')
      .send({
        email: 'test_123@gmail.com',
        password: 'test_password',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        // console.log(token);
        done();
      });
  });

  describe('POST /user/signup', () => {
    test('should respond user info to signup data', async done => {
      const response = await request(app)
        .post('/users/signup')
        .send({
          name: 'test',
          nickname: 'test',
          email: 'test@gmail.com',
          password: 'test',
          gender: 'test',
          region: 'test',
        });
      expect(response.status).toEqual(200);
      done();
    });

    test('should respond conflict with existing user email', async done => {
      const response = await request(app)
        .post('/users/signup')
        .send({
          name: 'test_아이언맨',
          nickname: 'test_빌런',
          email: 'test_123@gmail.com',
          password: 'test_password',
          gender: 'test_남자',
          region: 'test_서울 관악구 봉천동',
        });
      expect(response.status).toEqual(409);
      done();
    });
  });

  describe('POST /user/signin', () => {
    test('should respond user id to signin data', async done => {
      const response = await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        });
      expect(response.status).toEqual(200);
      done();
    });

    test('should respond NOT FOUND with unvalid user', async done => {
      const response = await request(app)
        .post('/users/signin')
        .send({
          email: 'foo@gmail.com',
          password: '123',
        });
      expect(response.text).toEqual('회원이 아닙니다');
      done();
    });
  });

  describe('POST /books/registerBook', () => {
    test('should respond book info to registerBook data', async done => {
      const response = await request(app)
        .post('/books/registerBook')
        // .set('header', `data=${token}`)
        .set('Header', token)
        .send({
          name: 'test_book',
          publisher: 'test_pub',
          writer: 'test_writer',
          quelity: 'test_quelity',
          description: 'test_desc',
          image: 'test_image',
          isRental: '대여 가능',
          bookRegion: 'test_서울 관악구 봉천동',
          userOwnerId: 1,
        });
      expect(response.status).toEqual(200);
      done();
    });
  });

  // describe('POST /books/registerBook', () => {
  //   test('should respond book info to registerBook data', async done => {
  //     await request(app)
  //       .post('/users/signin')
  //       .send({
  //         email: 'test_123@gmail.com',
  //         password: 'test_password',
  //       })
  //       .then(res => {
  //         request(app)
  //           .post('/books/registerBook')
  //           .send({
  //             name: 'test_book',
  //             publisher: 'test_pub',
  //             writer: 'test_writer',
  //             quelity: 'test_quelity',
  //             description: 'test_desc',
  //             image: 'test_image',
  //             isRental: '대여 가능',
  //             bookRegion: 'test_서울 관악구 봉천동',
  //             userOwnerId: 1,
  //           });
  //         expect(res.status).toEqual(200);
  //         done();
  //       });
  //   });
  // });

  describe('Get /books/listInOurRegion', () => {
    test('should get book list in user region ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/listInOurRegion')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Get /books/lists-owner-Lent', () => {
    test('should get status rental in user books ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/lists-owner-Lent')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Get /books/lists-owner-CanLend', () => {
    test('should get status rental [possible] in user books ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/lists-owner-CanLend')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Get /books/lists-owner-AskedToBorrow', () => {
    test('should get status rental [request] in user books ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/lists-owner-AskedToBorrow')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Get /books/lists-owner-askedToReturn', () => {
    test('should get status rental [return request] in user books ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/lists-owner-askedToReturn')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Get /books/lists-borrower-Borrowing', () => {
    test('should get user borrowing book list ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .get('/books/lists-borrower-Borrowing')
            .then(res2 => {
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
  });

  describe('Post /books/acceptToBorrow', () => {
    test('should user accept to borrower ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .post('/books/acceptToBorrow')
            .send({
              isRental: '대여 중',
              borrowerId: 2,
            });
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('Post /books/acceptToReturn', () => {
    test('should user book return status rental ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .post('/books/acceptToReturn')
            .send({
              isRental: '대여 가능',
              borrowerId: '',
            });
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('Post /books/requestToReturn', () => {
    test('should user book return status rental [request to return] ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .post('/books/acceptToReturn')
            .send({
              isRental: '반납 요청',
            });
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('Post /books/requestToRental', () => {
    test('should user book return status rental [request] ', async done => {
      await request(app)
        .post('/users/signin')
        .send({
          email: 'test_123@gmail.com',
          password: 'test_password',
        })
        .then(res => {
          request(app)
            .post('/books/requestToRental')
            .send({
              isRental: '대여 요청',
            });
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
});
