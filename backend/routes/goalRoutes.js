const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// router.get("/", getGoals);
// router.post("/", setGoal);

// The above two requests can be condensed into below.
router.route("/").get(getGoals).post(setGoal);

// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

// The above two requests can be condensed into below.
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
