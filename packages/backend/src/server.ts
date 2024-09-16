import { serve } from "@hono/node-server";
import { app } from "./app";

serve({ fetch: app.fetch, port: 3000 }, ({ port, address, family }) => {
	console.info(`Server is running on port http://${address}:${port}`);
});
