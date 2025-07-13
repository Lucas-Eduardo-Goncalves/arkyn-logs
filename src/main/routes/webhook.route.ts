import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { updateWebhook } from "../factory/webhook/updateWebhook";
import { listWebhook } from "../factory/webhook/listWebhook";

const webhookRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

webhookRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listWebhook.handle)
);

webhookRoutes.put("/:trafficSourceId", async (c) =>
  adaptRoute(c, updateWebhook.handle)
);

export { webhookRoutes };
