// app.ts

import fs from "fs";
import type { InputConfig } from "./src/types.js";
import { optimize } from "./src/optimizer.js";

function loadConfig(path = "../input.json"): InputConfig {
	const raw = fs.readFileSync(new URL(path, import.meta.url), "utf-8");
	return JSON.parse(raw);
}

// (여기서부터 for-loop + 이진 탐색 + run_with_k6.bash 호출 + 결과 파싱 등 구현)
function main() {
	const config: InputConfig = loadConfig();

	console.log(config);
	console.log(optimize(config));
}

main();
