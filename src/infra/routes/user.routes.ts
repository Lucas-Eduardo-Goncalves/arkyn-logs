import { Hono } from "hono";

import { RouteAdapter } from "../adapters/routeAdapter";
import { authUser } from "../factory/user/authUserFactory";
import { createUser } from "../factory/user/createUserFactory";
import { deleteUser } from "../factory/user/deleteUserFactory";
import { listUsers } from "../factory/user/listUsersFactory";
import { updateUser } from "../factory/user/updateUserFactory";

const userRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

userRoutes.get("/", async (c) => adaptRoute(c, listUsers.handle));
userRoutes.post("/", async (c) => await adaptRoute(c, createUser.handle));
userRoutes.post("/auth", async (c) => await adaptRoute(c, authUser.handle));
userRoutes.put("/", async (c) => await adaptRoute(c, updateUser.handle));
userRoutes.delete("/", async (c) => await adaptRoute(c, deleteUser.handle));

export { userRoutes };
