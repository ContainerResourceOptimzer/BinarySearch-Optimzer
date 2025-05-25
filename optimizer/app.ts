// app.ts

import fs from "fs";
import type { InputConfig } from "./src/types";
import { Optimizer } from "./src/Optimizer.js";

function loadConfig(path = "../input.json"): InputConfig {
	const raw = fs.readFileSync(new URL(path, import.meta.url), "utf-8");
	return JSON.parse(raw);
}

// (여기서부터 for-loop + 이진 탐색 + run_with_k6.bash 호출 + 결과 파싱 등 구현)
function main() {
	const config: InputConfig = loadConfig();
	const optimizer: Optimizer = new Optimizer(config);

	console.log(config);
	optimizer.run();
}

main();
