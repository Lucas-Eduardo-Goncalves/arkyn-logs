import { Hono } from "hono";

import { createLogChannel } from "../app/usecases/logChannel/createLogChannel";
import { listLogChannels } from "../app/usecases/logChannel/listLogChannels";
import { updateLogChannel } from "../app/usecases/logChannel/updateLogChannel";
import { RouteAdapter } from "../infra/adapters/routeAdapter";

const logChannelsRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

logChannelsRoutes.post("/", async (c) =>
  adaptRoute(c, createLogChannel.handle)
);

logChannelsRoutes.get("/", async (c) => adaptRoute(c, listLogChannels.handle));
logChannelsRoutes.put("/", async (c) => adaptRoute(c, updateLogChannel.handle));

export { logChannelsRoutes };
