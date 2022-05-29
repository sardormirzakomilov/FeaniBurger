const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const Category = require("../models/categories");
const AddFood = require("../models/addfood");
const mongoose = require("mongoose");
const AdminAuth = require("../models/admin");
const headAdmin = require("../Middleware/isheadAdmin");
const upload = require("../Middleware/fileUpload");
const toDelete = require("../Middleware/toDelete");

router.get("/", auth, async (req, res, next) => {
  const categories = await Category.find();
  //   if (req.session.isAdmin) {
  //     categories.isAdmin = true
  //   }

  res.render("admin/index", {
    layout: "admin",
    title: "admin page",
    categories,
  });
});

router.post("/add/category", auth, async (req, res, next) => {
  const { name } = req.body;

  const categoryadd = new Category({
    name,
  });

  await categoryadd.save();
  res.redirect("/admin");
});

router.get("/category/:id", auth, async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  const foods = await AddFood.aggregate([
    {
      $match: {
        categoryId: mongoose.Types.ObjectId(req.params.id),
      },
    },
  ]);
  console.log(foods);

  res.render("admin/category", {
    category,
    title: category.name,
    layout: "admin",
    foods,
  });
});

router.get("/delete/:id", async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      throw new Error();
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/update/category/:id", async (req, res, next) => {
  const updateCategory = await Category.find();
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      throw new Error();
    } else {
      res.render("admin/updateCategory", {
        title: "updateCategory",
        layout: "admin",
        updateCategory,
        data,
      });
    }
  });
});

router.post("/update/category/:id", auth, async (req, res, next) => {
  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin");
});

router.get("/add-food", auth, async (req, res, next) => {
  const categories = await Category.find();
  const food = await AddFood.find();
  res.render("admin/addfood", {
    layout: "admin",
    title: "addfood page",
    categories,
    food,
  });
});

router.post("/add/foods",upload.single("img"),async (req, res, next) => {
    const { name, textarea, price, categoryId } = req.body;

    const foods = new AddFood({
      name,
      textarea,
      img: req.file.filename,
      price,
      categoryId,
    });
    console.log(req.file.filename);

    await foods.save();
    res.redirect("/admin/addfood"); 
  }
);

router.get("/foodDelete/:id", auth, async (req, res, next) => {
  await AddFood.findByIdAndDelete(req.params.id);
  res.redirect("/admin/add-food");
});

router.get("/foodUpdate/:id", auth, async (req, res, next) => {
  const categories = await Category.find();
  AddFood.findById(req.params.id, (err, data) => {
    if (err) {
      throw new Error();
    } else {
      res.render("admin/updatefood", {
        title: "foodUpdate",
        layout: "admin",
        data,
        categories,
      });
    }
  });
});

router.post(
  "/foodUpdate/:id",
  auth,
  upload.single("img"),
  async (req, res, next) => {
    const { img } = await AddFood.findById(req.params.id);
    const food = req.body;
    console.log(req.file);
    if (req.file) {
      toDelete(img);
      food.img = req.file.filename;
    }

    await AddFood.findByIdAndUpdate(req.params.id, food);
    res.redirect("/admin/add-food");
  }
);

router.get("/error", (req, res, next) => {
  res.render("error", {
    title: "Error",
    layout: "auth",
  });
});

router.get("/add/admin", headAdmin, auth, (req, res, next) => {
  res.render("auth/adminReg", {
    title: "add admin",
    layout: "admin",
  });
});

module.exports = router;
