import { Hono } from "hono";

import { RouteAdapter } from "../adapters/routeAdapter";
import { createTrafficSource } from "../factory/trafficSource/createTrafficSourceFactory";
import { deleteTrafficSource } from "../factory/trafficSource/deleteTrafficSourceFactory";
import { listTrafficSources } from "../factory/trafficSource/listTrafficSourceFactory";
import { updateTrafficSource } from "../factory/trafficSource/updateTrafficSourceFactory";

const trafficSourceRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

trafficSourceRoutes.post("/", async (c) =>
  adaptRoute(c, createTrafficSource.handle)
);
trafficSourceRoutes.get("/", async (c) =>
  adaptRoute(c, listTrafficSources.handle)
);
trafficSourceRoutes.put("/:trafficSourceId", async (c) =>
  adaptRoute(c, updateTrafficSource.handle)
);
trafficSourceRoutes.delete("/:trafficSourceId", async (c) =>
  adaptRoute(c, deleteTrafficSource.handle)
);

export { trafficSourceRoutes };
