const express = require('express');

const router = express.Router();

const { booksController } = require('../controllers');

router.post('/acceptToBorrow', booksController.acceptToBorrow.post);
router.post('/acceptToReturn', booksController.acceptToReturn.post);

router.get(
  '/lists-borrower-AskedToBorrow',
  booksController.listsBorrowerAskedToBorrow.get,
);
router.get(
  '/lists-borrower-Borrowing',
  booksController.listsBorrowerBorrowing.get,
);
router.get(
  '/lists-owner-AskedToBorrow',
  booksController.listsOwnerAskedToBorrow.get,
);
router.get(
  '/lists-owner-AskedToReturn',
  booksController.listsOwnerAskedToReturn.get,
);
router.get('/lists-owner-CanLend', booksController.listsOwnerCanLend.get);
router.get('/lists-owner-Lent', booksController.listsOwnerLent.get);
router.get('/listsInOurRegion', booksController.listsInOurRegion.get);

router.post('/registerBook', booksController.registerBook.post);
router.post('/requestToRental', booksController.requestToRental.post);
router.post('/requestToReturn', booksController.requestToReturn.post);

export default router;
