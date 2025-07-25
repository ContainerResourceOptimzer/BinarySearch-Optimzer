// src/Optimizer.ts

import pLimit from "p-limit";

import type { InputConfig } from "./types.js";
import { CostFunction } from "./CostFunction.js";
import { execExperiment } from "./exec.js";

export class Optimizer {
	private _costFunction: CostFunction;
	private config: InputConfig;

	constructor(config: InputConfig) {
		this.config = config;
		this._costFunction = new CostFunction(
			this.config.unit_cpu_cost,
			this.config.unit_mem_cost
		);
	}

	get costFunction() {
		return this._costFunction;
	}

	private async binarySearchRow(
		cpu: number,
		mem_lst: number[]
	): Promise<number | null> {
		let low = 0;
		let high = mem_lst.length - 1;
		let best: number | null = null;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const pass = await execExperiment(cpu, mem_lst[mid]); // Runner Agent 호출 & Prometheus SLA 체크

			if (pass) {
				best = mid;
				high = mid - 1;
			} else low = mid + 1;
		}
		return best;
	}

	async run(): Promise<void> {
		const limit = pLimit(
			this.config.max_concurrency ?? this.config.cpu_range.length
		);

		const tasks = this.config.cpu_range.map((cpu) =>
			limit(async () => {
				const memIdx = await this.binarySearchRow(cpu, this.config.mem_range);
				if (memIdx !== null) {
					this._costFunction.append([cpu, this.config.mem_range[memIdx]]);
				}
			})
		);

		await Promise.all(tasks);
	}
}
