// src/CostFucntion.ts

import type { CostNode } from "./types.js";

export class CostFunction {
	private cpu_cost: number;
	private mem_cost: number;
	public heap: CostNode[];

	constructor(cpu_cost: number, mem_cost: number) {
		this.cpu_cost = cpu_cost;
		this.mem_cost = mem_cost;
		this.heap = [];
	}

	private calcCost(resource: [number, number]): number {
		return this.cpu_cost * resource[0] + this.mem_cost * resource[1];
	}

	append(resource: [number, number]): void {
		this.heap.push({ cost: this.calcCost(resource), resource: resource });
	}

	pop(): CostNode {
		this.heap.sort((a, b) => a.cost - b.cost);
		return this.heap[0];
	}
}
