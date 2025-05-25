// src/Optimizer.ts

import { CostFunction } from "./CostFunction.js";
import { InputConfig } from "./types";
import { execDockerRunner } from "./exec.js";

export class Optimizer {
	private costFunction: CostFunction;
	private config: InputConfig;

	constructor(config: InputConfig) {
		this.config = config;
		this.costFunction = new CostFunction(
			this.config.unit_cpu_cost,
			this.config.unit_mem_cost
		);
	}

	private binarySearchRecursive(
		cpu: number,
		mem_lst: number[],
		low: number,
		high: number
	): number {
		if (low >= high) return low;

		const mid: number = Math.floor((low + high) / 2);
		const result = execDockerRunner(cpu, mem_lst[mid]); // docker + test 실행

		if (result) return this.binarySearchRecursive(cpu, mem_lst, low, mid);
		else return this.binarySearchRecursive(cpu, mem_lst, mid + 1, high);
	}

	run() {
		const rows = this.config.cpu_range.length;
		const cols = this.config.mem_range.length;

		for (let i = 0; i < rows; i++) {
			const memIdx = this.binarySearchRecursive(
				this.config.cpu_range[i],
				this.config.mem_range,
				0,
				cols
			);
			if (memIdx < cols)
				this.costFunction.append([
					this.config.cpu_range[i],
					this.config.mem_range[memIdx],
				]);
		}
	}
}
