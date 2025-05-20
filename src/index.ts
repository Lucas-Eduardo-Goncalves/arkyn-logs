import { Hono } from "hono";
import { ErrorHandlerAdapter } from "./infra/adapters/errorHandlerAdapter";
import { userRoutes } from "./routes/user.routes";

const app = new Hono();
const errorHandlerAdapter = new ErrorHandlerAdapter();

app.route("/users", userRoutes);
app.onError(errorHandlerAdapter.handle);

export default app;
