import { Hono } from "hono";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { trafficSourceRoutes } from "./routes/trafficSource.routes";
import { userRoutes } from "./routes/user.routes";

const app = new Hono();

handlersFactory();

app.route("/users", userRoutes);
app.route("/traffic-sources", trafficSourceRoutes);

export default app;
