const express = require("express");
const router = express.Router();
const {
  createTodo,
  removeTodo,
  updateTodo,
  getTodo
} = require("../controllers/listControllers");

router.get("/getTodo", getTodo);
router.post("/createTodo", createTodo);
router.delete("/removeTodo", removeTodo);
router.put("/updateTodo/:title", updateTodo);

module.exports = router;
