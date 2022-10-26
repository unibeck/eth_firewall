import test, {ExecutionContext} from "ava";
import { Miniflare } from "miniflare";

test.beforeEach((t: ExecutionContext) => {
	// Create a new Miniflare environment for each test
	const mf = new Miniflare({
		// Autoload configuration from `.env`, `package.json` and `wrangler.toml`
		envPath: true,
		packagePath: true,
		wranglerConfigPath: true,
		// We don't want to rebuild our worker for each test, we're already doing
		// it once before we run all tests in package.json, so disable it here.
		// This will override the option in wrangler.toml.
		buildCommand: undefined,
		// Point Miniflare to the worker built by wrangler
		scriptPath: "dist/index.js",
		modules: true,
	});
	t.context = { mf };
});

test("GET /", async (t: ExecutionContext) => {
	// Get the Miniflare instance
	const { mf } = t.context;
	// Dispatch a fetch event to our worker
	const res = await mf.dispatchFetch("http://localhost:8787/a");
	// Check the count is "1" as this is the first time we've been to this path
	t.is(await res.text(), "1");
});

// test('GET /', async () => {
// 	const jsonPayload = {"method":"eth_call","params":[{"to":"0xf49630d0f5ff73bbcb246b0c5de2a0bd04d3014a","data":"0x18160ddd"},"latest"],"id":89,"jsonrpc":"2.0"}
// 	const req = new Request('http://localhost:8545', { method: 'GET' });
// 	const result = await worker.fetch(req);
// 	expect(result.status).toBe(200);
//
// 	const text = await result.text();
// 	expect(text).toBe('request method: GET');
// });
