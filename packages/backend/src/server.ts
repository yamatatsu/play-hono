import { serve } from "@hono/node-server";
import { showRoutes } from "hono/dev";
import { app } from "./app";

serve({ fetch: app.fetch, port: 3000 }, ({ port, address }) => {
	console.info(`Server is running on port http://${address}:${port}`);
});

showRoutes(app);
