export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DSvLZcON.js",app:"_app/immutable/entry/app.9OJCruzg.js",imports:["_app/immutable/entry/start.DSvLZcON.js","_app/immutable/chunks/1F6vLVSW.js","_app/immutable/chunks/CY4yNBrj.js","_app/immutable/chunks/Dmc801AJ.js","_app/immutable/chunks/Co3lmfDT.js","_app/immutable/chunks/h0Q1myce.js","_app/immutable/entry/app.9OJCruzg.js","_app/immutable/chunks/Dmc801AJ.js","_app/immutable/chunks/Co3lmfDT.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CY4yNBrj.js","_app/immutable/chunks/h0Q1myce.js","_app/immutable/chunks/Dqy-rY27.js","_app/immutable/chunks/B8G3mN2j.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/health",
				pattern: /^\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/health/_server.ts.js'))
			},
			{
				id: "/pitch",
				pattern: /^\/pitch\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/reports",
				pattern: /^\/reports\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/verify",
				pattern: /^\/verify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
