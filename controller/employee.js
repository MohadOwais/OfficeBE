const multer = require("multer");
const path = require("path");
const Employee = require("../models/employee");
const fs = require("fs");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use original file extension
  },
});

// Initialize Multer with storage config
const upload = multer({ storage: storage });
module.exports.addEmployee = (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const img = req.file ? req.file.path : null;
  const newEmployee = new Employee({
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    img, // Save the image path to the database
  });

  // Save the new employee to the database
  newEmployee
    .save()
    .then((employee) => res.json(employee)) // Respond with the saved employee data
    .catch((err) => res.status(400).json("Error: " + err)); // Handle errors
};
exports.getEmployee = (req, res, next) => {
  Employee.find()
    .then((result) => {
      res.status(201).json({
        message: "Employee fetched successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Failed to fetch Employee",
        error: err,
      });
    });
};

module.exports.editEmployee = (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, designation, gender, course } = req.body;
  // console.log("data", req.body);
  const img = req.file ? req.file.path : null;
  Employee.findById(id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Update fields with new values or keep the existing ones
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.mobile = mobile || employee.mobile;
      employee.designation = designation || employee.designation;
      employee.gender = gender || employee.gender;
      employee.course = course || employee.course;
      if (img) employee.img = img; // Update image if new image is provided

      // Save the updated employee data
      return employee.save();
    })
    .then((updatedEmployee) => res.json(updatedEmployee)) // Respond with updated employee data
    .catch((err) => res.status(400).json("Error: " + err)); // Handle errors
};

module.exports.deleteEmployee = (req, res, next) => {
  const id = req.params.id;

  Employee.findById(id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      // Check if the employee has an image
      if (employee.img) {
        // Construct the full path to the image file in the build directory
        const imagePath = path.join(__dirname, "..", "build", employee.img);

        // Check if the file exists before attempting deletion
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error deleting image file:", err);
            } else {
              console.log("Image deleted successfully:", imagePath);
            }
          });
        } else {
          console.log("File does not exist at path:", imagePath);
        }
      } else {
        console.log("No image associated with employee.");
      }

      // Now delete the employee record
      return Employee.findByIdAndDelete(id);
    })
    .then((result) => {
      res.status(200).json({
        message: "User deleted successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.error("Failed to delete user:", err);
      res.status(500).json({
        message: "Failed to delete user",
        error: err,
      });
    });
};
