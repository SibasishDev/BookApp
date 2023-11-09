const Router = require("express");
const bookController = require("../controllers/book/book.Controller");

class UserRouter {
  constructor() {
    this.router = Router();
    this.core();
  }

  core() {
    this.router.post("/create-book", bookController.createBook);
    this.router.get("/get-all-books",bookController.getAllBooks);
    this.router.put("/update-book", bookController.updateBook);
    this.router.get("/get-book", bookController.getBookById);
    this.router.delete("/delete-book",  bookController.deleteBook);
  }

  getRouters() {
    return this.router;
  }
}

module.exports = UserRouter;