import { Hono } from "hono";

import { logChannelsRoutes } from "./routes/logChannels.routes";
import { logErrorsRoutes } from "./routes/logErrors.routes";
import { userRoutes } from "./routes/user.routes";

const app = new Hono();

app.route("/users", userRoutes);
app.route("/log-channels", logChannelsRoutes);
app.route("/log-channels/:logChannelId/log-errors", logErrorsRoutes);

export default app;
