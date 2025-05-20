import { Hono } from "hono";
import { listUsers } from "../app/usecases/user/listUsers";

const userRoutes = new Hono();

userRoutes.get("/", async (c) => listUsers.handle(c));

export { userRoutes };
