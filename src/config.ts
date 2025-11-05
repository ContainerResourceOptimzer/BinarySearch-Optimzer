import { readFileSync } from "fs";
import path from "path";

import type { InputConfig } from "./types.js";

function parseJson(value: string | undefined): InputConfig {
	if (!value) throw new Error("Optimizer config is required");
	return JSON.parse(value);
}

export function loadConfig(args: string[]): InputConfig {
	let configPath: string | undefined;
	let inlineJson: string | undefined;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--config" || arg === "-c") {
			configPath = args[i + 1];
			i++;
			continue;
		}
		if (arg === "--config-json") {
			inlineJson = args[i + 1];
			i++;
			continue;
		}
	}

	if (inlineJson) return parseJson(inlineJson);
	if (configPath) {
		const resolved = path.resolve(configPath);
		return parseJson(readFileSync(resolved, "utf-8"));
	}
	if (process.env.OPTIMIZER_CONFIG)
		return parseJson(process.env.OPTIMIZER_CONFIG);

	throw new Error("No optimizer configuration provided");
}
