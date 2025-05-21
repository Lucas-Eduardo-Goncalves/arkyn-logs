import { Hono } from "hono";
import { logChannelsRoutes } from "./routes/logChannels.routes";
import { userRoutes } from "./routes/user.routes";

const app = new Hono();

app.route("/users", userRoutes);
app.route("/log-channels", logChannelsRoutes);

export default app;
