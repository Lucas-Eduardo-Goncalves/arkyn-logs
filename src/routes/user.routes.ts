import { Hono } from "hono";
import { createUser } from "../app/usecases/user/createUser";
import { listUsers } from "../app/usecases/user/listUsers";

const userRoutes = new Hono();

userRoutes.get("/", async (c) => listUsers.handle(c));
userRoutes.post("/", async (c) => createUser.handle(c));

export { userRoutes };
