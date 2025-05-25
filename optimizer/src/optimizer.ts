// src/optimizer.ts

import { execDockerRunner } from "./exec.js";

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

export function optimize(
	cpu_lst: number[],
	mem_lst: number[]
): [number, number] | null {
	const heap: Array<[number, number]> = new Array<[number, number]>();
	const rows = cpu_lst.length;
	const cols = mem_lst.length;

	for (let i = 0; i < rows; i++) {
		const memIdx = binarySearchInArray(cpu_lst[i], mem_lst, 0, cols);
		if (memIdx < cols) heap.push([cpu_lst[i], mem_lst[memIdx]]);
	}
	console.log(heap);
	return [0, 0];
}
