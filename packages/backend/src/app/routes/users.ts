import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { prisma } from "../../adapters/db/client";

export default new Hono()
	.get("/users", async (c) => {
		const users = await prisma.user.findMany();
		return c.json(users);
	})
	.get(
		"/users/:sub",
		zValidator("param", z.object({ sub: z.string() })),
		async (c) => {
			const { sub } = c.req.valid("param");
			const user = await prisma.user.findUnique({ where: { sub } });
			if (!user) {
				throw new HTTPException(404, { message: "No user found" });
			}
			return c.json(user);
		},
	);
