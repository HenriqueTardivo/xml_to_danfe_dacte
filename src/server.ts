import "dotenv/config";
import { createApp } from "@/app";

const port = Number(process.env.PORT) || 3000;

const app = createApp();

app.listen(port, () => {
	console.log(`🚀 Server ready at http://localhost:${port}`);
	console.log(`📚 API docs at    http://localhost:${port}/docs`);
});
