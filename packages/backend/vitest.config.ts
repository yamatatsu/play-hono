import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		env: {
			NODE_ENV: "development",
			DATABASE_URL: "mysql://root:root@localhost:3306/mydb",
		},
	},
});
