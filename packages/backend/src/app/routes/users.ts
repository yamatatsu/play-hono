import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export default new Hono()
	.get(
		"/users/:id",
		zValidator("param", z.object({ id: z.string() })),
		async (c) => {
			const a = c.req.valid("param");
			return c.json({ id: "123", name: "John Doe", age: 42 });
		},
	)
	.get("/users", (c) => {
		return c.json([{ id: "123", name: "John Doe", age: 42 }]);
	});
