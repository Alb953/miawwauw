import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const app = createApp();
const port = env.PORT;

app.listen(port, () => {
  logger.info(`Backend escuchando en http://localhost:${port}`);
});
