const { Router } = require("express");
const routes = Router();

const authMiddleware = require("../middlewares/auth");
const createOne = require("../views/linker/createOne");
const readMany = require("../views/linker/readMany");
const updateOne = require("../views/linker/updateOne");
const deleteOne = require("../views/linker/deleteOne");

routes.use(authMiddleware);

routes.post("/", createOne);

routes.get("/by-user", readMany);

routes.put("/:oldLabel", updateOne);

routes.delete("/:label", deleteOne);

module.exports = app => app.use("/linkers", routes);
