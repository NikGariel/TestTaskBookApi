import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import bookModel from '../models/book.model';

class BookService {
  async createBook(data: CreateBookDto) {
    return bookModel.create({ data });
  }

  async getBooks() {
    return bookModel.findMany();
  }

  async getBookById(id: number) {
    return bookModel.findUnique({ where: { id } });
  }

  async updateBook(id: number, data: UpdateBookDto) {
    return bookModel.update({
      where: { id },
      data,
    });
  }

  async deleteBook(id: number) {
    return bookModel.delete({ where: { id } });
  }
}

export default new BookService();
