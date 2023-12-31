import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.createBook);
router.post('/create', controller.createBook);
router.get('/get/:bookId', controller.readBook);
router.get('/get/', controller.readAll);
router.delete('/update/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.patch('/update/:bookId', controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;
