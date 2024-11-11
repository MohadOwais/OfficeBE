const express = require("express");
const EmployeeController = require("../../../controller/employee");
const upload = require("../../../uploads/index");
const router = express.Router();

// router.post("/add-employee", EmployeeController.addEmployee);
// Route to add a new employee with image upload
router.post(
  "/add-employee",
  upload.single("image"),
  EmployeeController.addEmployee
);

router.get("/get-employee", EmployeeController.getEmployee);
router.delete("/delete-employee/:id", EmployeeController.deleteEmployee);
// router.put("/edit-user/:id", EmployeeController.editEmployee);

router.put(
  "/edit-user/:id",
  upload.single("image"),
  EmployeeController.editEmployee
);
module.exports = router;
