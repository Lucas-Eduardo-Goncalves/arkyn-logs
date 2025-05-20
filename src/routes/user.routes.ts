import { Hono } from "hono";
import { createUser } from "../app/usecases/user/createUser";
import { listUsers } from "../app/usecases/user/listUsers";
import { updateUser } from "../app/usecases/user/updateUser";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const userRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

userRoutes.get("/", async (c) => adaptRoute(c, listUsers.handle));
userRoutes.post("/", async (c) => await adaptRoute(c, createUser.handle));
userRoutes.put("/", async (c) => await adaptRoute(c, updateUser.handle));

export { userRoutes };
