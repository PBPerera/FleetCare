// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/notificationController');
// const auth = require('../middleware/auth'); // optional: your jwt middleware


// // Public read allowed for this example. Add `auth` to protect.
// router.get('/', auth.optional, controller.getAll);
// router.get('/:id', auth.optional, controller.getById);
// router.post('/', auth.required, controller.create);
// router.put('/:id', auth.required, controller.update);
// router.delete('/:id', auth.required, controller.remove);


// module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
