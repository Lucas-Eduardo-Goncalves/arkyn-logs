import { Hono } from "hono";
import { authUser } from "../app/usecases/user/authUser";
import { createUser } from "../app/usecases/user/createUser";
import { deleteUser } from "../app/usecases/user/deleteUser";
import { listUsers } from "../app/usecases/user/listUsers";
import { updateUser } from "../app/usecases/user/updateUser";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const userRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

userRoutes.get("/", async (c) => adaptRoute(c, listUsers.handle));
userRoutes.post("/", async (c) => await adaptRoute(c, createUser.handle));
userRoutes.post("/auth", async (c) => await adaptRoute(c, authUser.handle));
userRoutes.put("/", async (c) => await adaptRoute(c, updateUser.handle));
userRoutes.delete("/", async (c) => await adaptRoute(c, deleteUser.handle));

export { userRoutes };
