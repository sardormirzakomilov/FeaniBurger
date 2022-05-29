const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const AdminAuth = require("../models/admin");
const headAdmin = require("../Middleware/isheadAdmin");

router.get("/login", async (req, res, next) => {
  const checkAdmin = await AdminAuth.findOne({ adminType: "headAdmin" });
  req.session.checkAdmin = !checkAdmin;

  res.render("auth/login", {
    title: "login",
    layout: "auth",
    erLog: req.flash("erLog"),
    loginError: req.flash("loginError"),
    checkAdmin: !checkAdmin,
  });
});

router.post("/login", async (req, res, next) => {
  try {
    const { number, password } = req.body;

    const condidate = await AdminAuth.findOne({ number });

    if (condidate) {
      const are = await bcrypt.compare(password, condidate.password);
      if (are) {
        req.session.isAdmin = true;
        req.session.admin = condidate;
        req.session.checkAdmin =  condidate.adminType === "headAdmin" ? false : true;
        req.session.save((err) => {
          if (err) {
            throw new Error();
          }
          res.redirect("/admin");
        });
      } else {
        req.flash("erLog", "password error");
        res.redirect("/auth/login");
      }
    } else {
      req.flash("loginError", "Admin is not found");
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log("error bor karoci");
  }
});

router.get("/register", headAdmin, (req, res, next) => {
  res.render("auth/register", {
    title: "register",
    layout: "auth",
  });
});

router.post("/register", async (req, res, next) => {
  const { name, number, password, adminType } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const admin = new AdminAuth({
    name,
    number,
    password: hashPassword,
    adminType,
  });

  await admin.save();
  if (adminType === "headAdmin") {
    res.redirect("/auth/login");
  } else {
    res.redirect("/admin");
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
