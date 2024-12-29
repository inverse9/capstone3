const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const puraController = require("../controller/puraController");

router.get("/api/pura", puraController.getAllPura);
router.get("/api/pura/:id", puraController.getPuraById);
router.post("/api/pura", upload.single("foto"), puraController.addPura);
router.put("/api/pura/:id", upload.single("foto"), puraController.updatePura);
router.delete("/api/pura/:id", puraController.deletePura);

module.exports = router;
