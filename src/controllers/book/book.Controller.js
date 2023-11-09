const BookValidation = require("./book.validation");
const Book = require("../../modal/book.modal");
const { successResponse } = require("../../middleware/response");

class BookController {
  constructor() {}

  createBook = async (req, res, next) => {
    try {
      const { error, value } = BookValidation.bookSchema(req.body);

      if (error) return next({ code: 400, message: error.message });

      const createProducts = await Book.create(value);

      if (!createProducts)
        return next({ code: 400, message: "Something went wrong" });

      return successResponse(
        res,
        201,
        "Book create successfully",
        createProducts
      );
    } catch (e) {
      next(e);
    }
  };

  getBookById = async (req, res, next) => {
    try {
      const { bookId } = req.body;

      if (!bookId) return next({ code: 400, message: "bookId required" });

      const searchResult = await Book.findById(bookId);

      if (!searchResult)
        return next({ code: 404, message: "Book id does not exist" });

      return successResponse(res, 200, "Book fetch successfully", searchResult);
    } catch (e) {
      next(e);
    }
  };

  updateBook = async (req, res, next) => {
    try {
      const { error, value } = await BookValidation.updateSchema(req.body);

      if (error) return next({ code: 400, message: error.message });

      const searchResult = await Book.findById(value.bookId);

      if (!searchResult)
        return next({
          code: 404,
          message: "Book does not exist in our record",
        });

      const data = {};

      if (value.title) data.title = value.title;

      if (value.author) data.author = value.author;

      if (value.summary) data.summary = value.summary;

      const update = await Book.findByIdAndUpdate(value.bookId, data, {
        new: true,
      });

      if(!update) return next({code : 400, message : "Somethibng went wrong"});

      return successResponse(res, 200, "Book updated", update);
    } catch (e) {
      next(e);
    }
  };

  getAllBooks = async (req, res, next) => {
    try {
      const searchResult = await Book.find(
        {},
        { _id: 1, title: 1, author: 1, summary: 1 }
      );

      if (!searchResult.length)
        return next({ code: 404, message: "No books found" });

      return successResponse(res, 200, "Books fetch succesfully", searchResult);
    } catch (e) {
      next(e);
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      const { bookId } = req.body;

      if (!bookId) return next({ code: 400, message: "bookId required" });

      const searchResult = await Book.findById(bookId);

      if (!searchResult)
        return next({
          code: 404,
          message: "Book does not exist in our record",
        });

      const deleteResult = await Book.deleteOne({ _id: bookId });

      if (deleteResult.deletedCount === 0)
        return next({ code: 400, message: "Something went wrong" });

      return successResponse(res, 200, "Book deleted successfully");
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new BookController();
