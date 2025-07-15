// app.ts

import fs from "fs";
import type { InputConfig, CostNode } from "./src/types.js";
import { Optimizer } from "./src/Optimizer.js";

function loadConfig(path = "./input.json"): InputConfig {
	const raw = fs.readFileSync(new URL(path, import.meta.url), "utf-8");
	return JSON.parse(raw);
}

// (여기서부터 for-loop + 이진 탐색 + run_with_k6.bash 호출 + 결과 파싱 등 구현)
async function main() {
	const config: InputConfig = loadConfig();
	const optimizer: Optimizer = new Optimizer(config);

	console.log(config);
	await optimizer.run();

	const best: CostNode = optimizer.costFunction.pop();
	if (best)
		console.log(
			`best resource: (${best.resource[0]}, ${best.resource[1]})\ncost: ${best.cost}`
		);
}

await main();
