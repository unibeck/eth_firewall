import {v4 as uuid} from 'uuid'
// import ganache from "ganache";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
};

async function handleRequest(request: Request) {
    const requestId = uuid()
    let respHeaders = {
        ...request.headers,
        ...corsHeaders,
        "request-id": requestId,
    };

    // const accounts = await provider.request({ method: "eth_accounts", params: [] });
    // console.log(accounts)


    const response = await fetch(
        new Request('http://localhost:8545', {
            ...request,
            headers: respHeaders
        })
    )

    return response
}

async function handleOptions(request: Request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    let headers = request.headers;
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        let respHeaders = {
            ...corsHeaders,
            // Allow all future content Request headers to go back to browser
            // such as Authorization (Bearer) or X-Client-Name-Version
            'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || "",
        };

        return new Response(null, {
            headers: respHeaders,
        });
    } else {
        // Handle standard OPTIONS request.
        // If you want to allow other HTTP Methods, you can do that here.
        return new Response(null, {
            headers: {
                Allow: 'GET, HEAD, POST, OPTIONS',
            },
        });
    }
}

const worker = {
    async fetch(request: Request) {
        if (request.method === 'OPTIONS') {
            // Handle CORS preflight requests
            return await handleOptions(request);
        } else if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'POST') {
            return await handleRequest(request);
        } else {
            return new Response(null, {
                status: 405,
                statusText: 'Method Not Allowed',
            });
        }
    },
}

export default worker;
