// src/optimizer.ts

import { CostFunction } from "./CostFunction.js";
import { execDockerRunner } from "./exec.js";
import type { CostNode, InputConfig } from "./types";

function binarySearchInArray(
	cpu: number,
	mem_lst: number[],
	low: number,
	high: number
): number {
	if (low >= high) return low;

	const mid: number = Math.floor((low + high) / 2);
	const result = execDockerRunner(cpu, mem_lst[mid]); // docker + test 실행

	if (result) return binarySearchInArray(cpu, mem_lst, low, mid);
	else return binarySearchInArray(cpu, mem_lst, mid + 1, high);
}

export function optimize(config: InputConfig): CostNode | null {
	const heap = new CostFunction(config.unit_cpu_cost, config.unit_mem_cost);
	const rows = config.cpu_range.length;
	const cols = config.mem_range.length;

	for (let i = 0; i < rows; i++) {
		const memIdx = binarySearchInArray(
			config.cpu_range[i],
			config.mem_range,
			0,
			cols
		);
		if (memIdx < cols)
			heap.append([config.cpu_range[i], config.mem_range[memIdx]]);
	}
	console.log(heap);
	return heap.pop();
}
