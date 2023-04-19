const { Router } = require("express");
const AuthController = require("./controllers/auth");
const AuthValidator = require("./validators/auth");
const AuthorizationMiddleware = require("./middlewares/authorization");
const patientController = require("./controllers/patient");
const adminController = require("./controllers/admin");

class MainRoute {
  router;
  authValidator;
  authController;
  authorizationMiddleware;
  patientController;
  adminController;

  constructor() {
    this.authValidator = new AuthValidator();
    this.authController = new AuthController();
    this.patientController = new patientController();
    this.adminController = new adminController();

    this.authorizationMiddleware = new AuthorizationMiddleware();

    this.router = Router();
    this.setRoutes();
  }

  setRoutes() {
    //patient
    this.router.get(
      "/patient/main_patient",
      this.authorizationMiddleware.verifyUser,
      this.patientController.getAssessmentList
    );
    this.router.get(
      "/patient/assessments/:id",
      this.authorizationMiddleware.verifyUser,
      this.patientController.getFormpatient
    );
    this.router.get(
      "/patient/history",
      this.authorizationMiddleware.verifyUser,
      this.patientController.getHistory
    );

    this.router.post(
      "/patient/assessments/save",
      this.authorizationMiddleware.verifyUser,
      this.patientController.postAns
    );

    //adminx
    this.router.post(
      "/admin/main_admin",
      this.authorizationMiddleware.verifyUser,
      this.adminController.getQuestionList
    );

    // authz
    this.router.post(
      "/auth/signin",
      this.authValidator.validateSignInData,
      this.authController.signin
    );
  }
}

module.exports = MainRoute;
