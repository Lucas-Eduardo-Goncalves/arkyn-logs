import { Hono } from "hono";

import { createLogError } from "../app/usecases/logError/createLogError";
import { listLogErrors } from "../app/usecases/logError/listLogError";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const logErrorsRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

logErrorsRoutes.post("/", async (c) => adaptRoute(c, createLogError.handle));
logErrorsRoutes.get("/", async (c) => adaptRoute(c, listLogErrors.handle));

export { logErrorsRoutes };
