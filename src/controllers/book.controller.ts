import { Request, Response } from 'express';
import bookService from '../services/book.service';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';

class BookController {
  async createBook(req: Request, res: Response) {
    try {
      const data: CreateBookDto = req.body;
      const book = await bookService.createBook(data);
      res.status(201).json(book);
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getBooks();
      res.status(200).json(books);
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const book = await bookService.getBookById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data: UpdateBookDto = req.body;
      const book = await bookService.updateBook(id, data);
      res.status(200).json(book);
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await bookService.deleteBook(id);
      res.status(204).send();
    } catch (error) {
      // @ts-expect-error Fix for error message type
      res.status(500).json({ error: error.message });
    }
  }
}

export default new BookController();
