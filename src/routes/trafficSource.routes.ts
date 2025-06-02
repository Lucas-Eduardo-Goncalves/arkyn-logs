import { Hono } from "hono";

import { createTrafficSource } from "../app/usecases/trafficSource/createTrafficSource";
import { deleteTrafficSource } from "../app/usecases/trafficSource/deleteTrafficSource";
import { listTrafficSources } from "../app/usecases/trafficSource/listTrafficSources";
import { updateTrafficSource } from "../app/usecases/trafficSource/updateTrafficSource";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const trafficSourceRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

trafficSourceRoutes.post("/", async (c) =>
  adaptRoute(c, createTrafficSource.handle)
);
trafficSourceRoutes.get("/", async (c) =>
  adaptRoute(c, listTrafficSources.handle)
);
trafficSourceRoutes.put("/", async (c) =>
  adaptRoute(c, updateTrafficSource.handle)
);
trafficSourceRoutes.delete("/", async (c) =>
  adaptRoute(c, deleteTrafficSource.handle)
);

export { trafficSourceRoutes };
