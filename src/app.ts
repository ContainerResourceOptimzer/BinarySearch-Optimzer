// optimizer/app.ts

import { Optimizer } from "./Optimizer.js";
import { loadConfig } from "./config.js";
import type { InputConfig } from "./types.js";

const config: InputConfig = loadConfig(process.argv.slice(2));

async function runOptimizer(config: InputConfig) {
	const optimizer: Optimizer = new Optimizer(config);

	console.log(config);
	await optimizer.run();
}

await runOptimizer(config);
