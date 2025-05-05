import http from "k6/http";
import { check, sleep } from "k6";
import type { Options } from "k6/options";

export const options: Options = {
	vus: 50,
	duration: "1m",
	thresholds: {
		"http_req_duration{scenario:default}": ["p(95)<=3000"],
		http_reqs: ["count>=1000"],
		http_req_failed: ["rate<0.01"],
	},
};

const BASE_URL: string = "http://localhost:3000";

export default function (): void {
	const res = http.get(`${BASE_URL}`);
	check(res, { "status is 200": (r) => r.status === 200 });
	sleep(1);
}
