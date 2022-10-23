import worker from '../src/index';

test('GET /', async () => {
	const jsonPayload = {"method":"eth_call","params":[{"to":"0xf49630d0f5ff73bbcb246b0c5de2a0bd04d3014a","data":"0x18160ddd"},"latest"],"id":89,"jsonrpc":"2.0"}
	const req = new Request('http://localhost:8545', { method: 'GET' });
	const result = await worker.fetch(req);
	expect(result.status).toBe(200);

	const text = await result.text();
	expect(text).toBe('request method: GET');
});
