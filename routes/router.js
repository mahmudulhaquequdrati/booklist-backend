const controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/books", controller.getBooks);
router.get("/books/:id", controller.booksById);
router.post("/books", controller.createBook);
router.put("/books/:id", controller.updateById);
router.delete("/books/:id", controller.deleteById);
module.exports = router;
