const viewConfig = "@P .viewConfig",
	routingInfo = "@ROUTING_INFO",
	rootContainerWithHybrid = {
		type: "RootContainer",
		config: {
			renderingMode: "hybrid"
		},
		children: [{
			type: "HybridViewContainer",
			config: {
				routingInfo,
				name: "primary",
				contextName: "app"
			},
			children: []
		}]
	},
	rootContainerWithHybridAcTertiary = {
		type: "RootContainer",
		config: {
			renderingMode: "hybrid",
			acTertiary: !0
		},
		children: [{
			type: "HybridViewContainer",
			config: {
				routingInfo,
				name: "primary",
				contextName: "app",
				acTertiary: !0
			},
			children: []
		}]
	},
	buildSemanticUrl = (e, t, o, n, i) => {
		const r = new URLSearchParams(t);
		let a = !1;
		"true" === o && (a = !0);
		let s = null,
			l = null;
		if (e) {
			e.startsWith("/") && (e = e.substring(1));
			const t = e.split("/");
			t.length > 0 && t[0] && (s = t[0]), t.length > 1 && t[1] && (l = t[1])
		} else a = !1;
		let C = n;
		s && (C = `${C}/${s}`), l && (C = `${C}/${l}`), a && (!r.has("noPortal") && r.append("noPortal", !0), l && i && r.append("view", i));
		const c = r.toString();
		return C += c ? `?${c}` : "", C
	};
let containerCount = 0;
const loadView = (e, t, o = [], n, i, r, a) => {
		const s = ("hybrid" === a ? "hybrid_" + ++containerCount : a) || "mashup" + ++containerCount,
			l = {
				type: "RootContainer",
				config: {
					renderingMode: "portal",
					viewConfig,
					name: s
				}
			};
		window.PCore.getRuntimeParamsAPI().setRuntimeParams(n), PCore.getBootstrapUtils().loadRootComponent(e, l, o, i, r).then((() => PCore.getBootstrapUtils().updateStoreWithUiRoot(t, s)))
	},
	loadPortal = (e, t, o = [], n) => {
		const i = n || "portal" + ++containerCount,
			r = {
				type: "RootContainer",
				config: {
					viewConfig,
					renderingMode: "portal",
					skeleton: "LoadingComponent",
					name: i
				}
			};
		o.push(r.config.skeleton), PCore.getEnvironmentInfo().isPortalLoaded = !0, PCore.getBootstrapUtils().loadRootComponent(e, r, o).then((() => PCore.getBootstrapUtils().loadPortalView(t, i)))
	},
	loadComponent = (e, t, o) => PCore.getBootstrapUtils().loadComponent(t, e, o),
	loadViewByName = (e, t, o, n, i, r, a, s) => {
		const l = s || "mashup" + ++containerCount,
			C = {
				type: "RootContainer",
				config: {
					viewConfig,
					renderingMode: "view",
					name: l
				}
			};
		PCore.getBootstrapUtils().loadRootComponent(e, C, i, r, a).then((() => PCore.getBootstrapUtils().loadViewByName(t, o, n, l)))
	},
	loadMashup = (e, t = !0) => {
		const o = {
			type: "RootContainer",
			config: {
				renderingMode: "noPortal"
			},
			children: [{
				type: "ViewContainer",
				config: {
					routingInfo,
					name: "primary"
				}
			}]
		};
		if (t) {
			const t = document.getElementsByTagName(e)[0] && document.getElementsByTagName(e)[0].parentNode;
			if (t) {
				const e = document.createElement("style");
				e.setAttribute("id", "portal-less-styles"), e.innerHTML = "app-root.mashup > .case-view, app-root.mashup > .page-view { min-height: 0px !important; }", t.appendChild(e)
			}
		}
		PCore.getBootstrapUtils().loadRootComponent(e, o, [PCore.getConstants().LOAD_VIEW_STRING, "ViewContainer"]), window.parent !== window && import(`${PCore.getAssetLoader().getStaticServerUrl()}constellation-mashup-bridge.js`).then((e => {
			e.mashup.init({
				resizing: "stretch"
			})
		}))
	},
	loadCase = (e, t, o = [], n, i, r = {}) => {
		const {
			isCaseLocked: a = !1
		} = r;
		o.push(PCore.getConstants().CONTAINER_TYPE.HYBRID, PCore.getConstants().LOAD_VIEW_STRING), PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), PCore.getBootstrapUtils().getCaseApi().openCase(t, PCore.getConstants().APP.APP, PCore.getConstants().PRIMARY)))).then((() => {
			a && PCore.getPubSubUtils().publish(PCore.getEvents().getCaseEvent().CASE_LOCK_EVENT), PCore.getCoexistenceManager().getEventUtils().publishConstellationLoadedEvent()
		}))
	},
	loadPreview = (e, t, o = [], n, i) => {
		const {
			caseID: r,
			caseClass: a
		} = t;
		o.push(PCore.getConstants().CONTAINER_TYPE.HYBRID, PCore.getConstants().LOAD_VIEW_STRING), rootContainerWithHybrid.config.name = "hybrid_preview", PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), PCore.getCoexistenceManager().showCasePreview(r, a))))
	},
	createCase = (e, t, o = [], n, i) => {
		o.push(PCore.getConstants().CONTAINER_TYPE.HYBRID, PCore.getConstants().LOAD_VIEW_STRING), PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), PCore.getBootstrapUtils().getCaseApi().createCase(t, PCore.getConstants().APP.APP, PCore.getConstants().PRIMARY))))
	},
	loadAssignment = (e, t, o = [], n, i, {
		isUIkit: r,
		isReloadAssignment: a,
		caseId: s,
		acTertiary: l,
		uiKitConstellationCaseInCreateStage: C
	}) => {
		if (r) {
			const e = PCore.getEnvironmentInfo().getCoexistenceMeta();
			e.isCoexistence = !0, e.appType = PCore.getConstants().APP_TYPE.UIKIT, PCore.getEnvironmentInfo().setCoexistenceMeta(e)
		}
		if (a) PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), JSON.parse(C) && r ? PCore.getMashupApi().openCase(s, PCore.getConstants().APP.APP, {
			pageName: PCore.getConstants().VIEW_TYPE.PY_EMBEDASSIGNMENT
		}) : PCore.getBootstrapUtils().getCaseApi().openCase(s, PCore.getConstants().APP.APP, PCore.getConstants().PRIMARY)))).then((() => {
			PCore.getCoexistenceManager().getEventUtils().publishConstellationLoadedEvent()
		}));
		else if (o.push(PCore.getConstants().CONTAINER_TYPE.HYBRID, PCore.getConstants().LOAD_VIEW_STRING), r) PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), PCore.getMashupApi().openAssignment(t, PCore.getConstants().APP.APP, {
			pageName: PCore.getConstants().VIEW_TYPE.PY_EMBEDASSIGNMENT
		})))).then((() => {
			PCore.getCoexistenceManager().getEventUtils().publishConstellationLoadedEvent()
		}));
		else {
			const r = l ? rootContainerWithHybridAcTertiary : rootContainerWithHybrid;
			PCore.getBootstrapUtils().loadRootComponent(e, r, o, n, i).then((() => (PCore.getInitialiser().initCoreContainers(), PCore.getBootstrapUtils().getCaseApi().openAssignment(t, PCore.getConstants().APP.APP, PCore.getConstants().PRIMARY, {
				acTertiary: l
			})))).then((() => {
				PCore.getCoexistenceManager().getEventUtils().publishConstellationLoadedEvent()
			}))
		}
	},
	registerForDebugInfo = e => {
		PCore.getEnvironmentInfo().setPreviewMode(), e && PCore.getPubSubUtils().subscribe("fetchSuccess", (({
			debugInfo: t
		}) => {
			const o = t && t["X-Pega-App-Debug-ID"];
			e.postMessage({
				appDebugID: o
			})
		}), "fetchSuccess")
	},
	toggleTracerHeaders = e => {
		e.addEventListener("message", (async e => {
			const t = e?.data?.enableTracer;
			t ? PCore.getDebugger().enableTracer() : PCore.getDebugger().disableTracer()
		}))
	},
	initCoreConfig = e => {
		const {
			routingInfo: t,
			actionModel: o,
			serviceConfig: n,
			additionalHeaders: i,
			tokens: r,
			semanticUrl: a,
			queryParams: s,
			noPortal: l,
			timezone: C,
			noHistory: c,
			viewName: g,
			theme: p,
			fieldDefaults: d,
			restServerConfig: m,
			dynamicLoadComponents: P = !0,
			dynamicSemanticUrl: u = !0,
			enableRouting: h = !0,
			locale: f,
			environmentInfo: y,
			renderingMode: I = "FULL_PORTAL",
			remoteCaseMapping: v = {},
			envType: w
		} = e, {
			appAlias: E,
			googleMapKey: A,
			staticContentServer: b,
			appStaticContentServer: R = null,
			contextPath: S,
			messagingService: U = null,
			reAuthUrl: M = null
		} = n;
		let T = location.origin;
		const B = {};
		if (void 0 !== m && (T = m), S && (T = `${T}${S}`), E && "LAUNCHPAD" !== w && (T = `${T}/${E}`), e.restServerConfig = T, !0 === u) {
			const e = buildSemanticUrl(a, s, l, T, g);
			!c && e && history.pushState({}, "home", e)
		} else if ("HYBRID" !== I) {
			let e = window.location.href;
			e.indexOf("?") > 0 && (e = e.substring(0, e.indexOf("?")), history.pushState({}, "home", e)), B.dynamicSemanticUrl = !1
		}!0 !== P && (B.dynamicLoadComponents = !1);
		let N = null;
		if (E) {
			const e = E.indexOf("/app/");
			N = e >= 0 ? E.substring(e + 1) : E
		}
		if (Object.keys(B).length > 0 && PCore.setBehaviorOverrides(B), e.appAlias = N, p) {
			let t = "object" == typeof p ? p : null;
			if (null === t) try {
				t = JSON.parse(p)
			} catch {
				t = {}
			}
			e.theme = t
		}
		const D = {
			...t,
			domain: `${window.location.protocol}//${window.location.host}`,
			searchParams: window.location.search
		};
		e.routingInfo = D, e.initBroadcast = "true" === PCore.getEnvironmentInfo().environmentInfoObject?.pxMashupDetails?.pyIsTraditionalCoexistence, !e.noPortal || "true" !== e.noPortal && !0 !== e.noPortal || (e.renderingMode = "EMBED"), PCore.getInitialiser().init(e)
	},
	importConstellationCore = async (e, t) => {
		const {
			isDevServerMode: o,
			isSdk: n
		} = t, {
			prerequisite: i
		} = t;
		if (i && i.length > 0) {
			const t = i[0];
			let r;
			const a = Object.keys(t)[0];
			if (o) {
				const e = Object.values(t)[0];
				r = e.endsWith("/") ? `${e}prerequisite/${a}` : `${e}/prerequisite/${a}`
			} else r = e.endsWith("/") ? `${e}prerequisite/${a}` : `${e}/prerequisite/${a}`;
			if (n) {
				r = `${e?.endsWith("/")?e.slice(0,-1):e}/prerequisite/${a.startsWith("/")?a.slice(1):a}`
			}
			return import(r).then((t => {
				PCore.getAssetLoader().initServer(e, "no-appstatic");
				for (let t = 1; t < i.length; t += 1) {
					const n = i[t],
						r = Object.keys(n)[0];
					if (o) {
						const e = Object.values(n)[0];
						import(`${e}prerequisite/${r}`).then((e => {
							console.log(e)
						}))
					} else import(`${e}prerequisite/${r}`).then((e => {
						console.log(e)
					}))
				}
			}))
		}
		return null
	}, importExternals = async e => {
		const {
			isDevServerMode: t
		} = e, o = PCore.getEnvironmentInfo().getLocale();
		if ("en-US" !== o) try {
			const e = [PCore.getLocaleUtils().GENERIC_BUNDLE_KEY, PCore.getLocaleUtils().MESSAGE_BUNDLE_KEY].map((async e => {
				const t = await PCore.getAssetLoader().getSvcLocale(o, `${e}.json`);
				if (t.ok) {
					const o = await t.json();
					PCore.getLocaleUtils().setLocaleForRule(o, e)
				}
			}));
			await Promise.allSettled(e)
		} catch (e) {
			console.warn(e)
		}
		await PCore.getAssetLoader().loadAssets(e.externals, {
			isDevServerMode: t
		}), await PCore.getAssetLoader().loadAssets(e.entry, {
			isDevServerMode: t
		})
	}, importAssetsJson = async e => {
		const t = (new Date).getTime();
		return fetch(`${e}lib_asset.json?v=${t}`).then((e => e.json()))
	}, importReactRoot = async () => {
		const e = [];
		return PCore.getComponentsRegistry().getComponent("ReactRoot").modules.forEach((t => {
			e.push(t())
		})), Promise.allSettled(e)
	}, importDesignSystemComponentMap = async (e, t, o) => {
		try {
			await
			function(e, t = !0) {
				return new Promise(((o, n) => {
					const i = document.createElement("script");
					i.setAttribute("type", "text/javascript"), i.setAttribute("src", e), i.setAttribute("async", t), i.onload = o(), i.onerror = () => n(new Error("Failed to load resource from Design System")), document.body.appendChild(i)
				}))
			}(`${e}component/project/${t}/designsystems/${o}/componentsmap.js?v=${Date.now()}`)
		} catch (e) {
			console.log(e)
		}
	}, bootstrap = async (e, t) => new Promise((async (o, n) => {
		try {
			const {
				staticContentServer: n,
				appStaticContentServer: i
			} = e.serviceConfig, {
				ccV2LibId: r,
				environmentId: a,
				isAlternateDesignSystemEnabled: s,
				alternateDesignSystemName: l
			} = e, C = await importAssetsJson(n);
			await importConstellationCore(n, C), initCoreConfig(e);
			const c = async () => {
				await importReactRoot(), r && await PCore.getAssetLoader().importCustomComponentMap(r), "true" === s && "other" !== l && await importDesignSystemComponentMap(i, a, l), t && t(), o(!0)
			};
			PCore.getPubSubUtils().subscribe("component-map-loaded", c), await importExternals(C), "ReactRoot" in PCore.getComponentsRegistry().getLazyMap() && o(!0)
		} catch (e) {
			n(e)
		}
	})), loadEnvironmentInfo = async e => {
		if (e.theme?.definition && (!window.pms || "Android" !== window.pms.device.systemName)) try {
			const t = JSON.parse(e.theme.definition);
			PCore.getEnvironmentInfo().setBrandingInfo(t.Branding), PCore.getEnvironmentInfo().setTheme(t.Theme)
		} catch {
			PCore.getEnvironmentInfo().setBrandingInfo({}), PCore.getEnvironmentInfo().setTheme({})
		}
		e.keyMapping && PCore.getEnvironmentInfo().setKeyMapping(e.keyMapping), PCore.getEnvironmentInfo().setCookieComplianceMethod(e.cookieComplianceMethod ?? "none")
	}, getBootstrapConfig = async (e, t) => fetch(`${e}/api/application/v2/data_views/D_pxBootstrapConfig`, {
		method: "GET",
		headers: new Headers({
			Authorization: t
		})
	}).then((e => {
		if (e.ok) return e.json();
		throw Error("D_pxBootstrapConfig load failed.", {
			cause: e.status
		})
	})), loadRootContainer = (e, t = [], o, n) => (t.push(PCore.getConstants().CONTAINER_TYPE.HYBRID, PCore.getConstants().LOAD_VIEW_STRING), PCore.getBootstrapUtils().loadRootComponent(e, rootContainerWithHybrid, t, o, n)), bootstrapWithAuthHeader = async (e, t, o = [], n, i) => {
		const {
			restServerUrl: r,
			customRendering: a = !1,
			onPCoreReadyCallback: s,
			staticContentServerUrl: l,
			dynamicSetCookie: C = !1,
			authInfo: c = {},
			theme: g = {},
			renderingMode: p,
			locale: d
		} = e;
		let m, {
			authorizationHeader: P,
			appAlias: u
		} = e;
		if (P && 0 === Object.keys(c).length && (c.authType = "custom"), !P && c.tokenInfo) {
			const {
				tokenInfo: e
			} = c;
			P = `${e.token_type} ${e.access_token}`
		}
		u ? (u = -1 !== u.indexOf("/") ? u : `app/${u}`, m = await getBootstrapConfig(`${r}/${u}`, P)) : m = await getBootstrapConfig(`${r}`, P);
		const h = JSON.parse(m.pyConfigJSON);
		h.restServerConfig = r, h.dynamicSemanticUrl = !1, h.dynamicSetCookie = C, h.enableRouting = !1, h.serviceConfig.contextPath = "", h.serviceConfig.appAlias = u, h.additionalHeaders = {
			Authorization: P
		}, h.dynamicLoadComponents = !a, h.dynamicSemanticUrl = !a, h.noHistory = !0, h.theme = g ?? {}, h.renderingMode = p ?? h.renderingMode, h.locale = d || h.locale;
		const f = l || h.serviceConfig.staticContentServer,
			y = await importAssetsJson(f);
		if (y.isSdk ? await importConstellationCore(l, y) : (h.serviceConfig.staticContentServer = f, await importConstellationCore(f, y)), initCoreConfig(h), s && window.PCore.onPCoreReady(s), c && ["OAuth2.0", "custom"].includes(c?.authType) && PCore.getBootstrapUtils().setFetchAuthInfo(c), y.isSdk && a && await importExternals(y), !a) {
			const e = new Promise((async (e, t) => {
				try {
					const t = async () => {
						await importReactRoot(), e(!0)
					};
					PCore.getPubSubUtils().subscribe("component-map-loaded", t), await importExternals(y), "ReactRoot" in PCore.getComponentsRegistry().getLazyMap() && e(!0)
				} catch (e) {
					t(e)
				}
			}));
			await e, PCore.getInitialiser().initCoreContainers(), await loadRootContainer(t, o, n, i)
		}
	}, initConstellationCore = async e => {
		const t = await importAssetsJson(e);
		await importConstellationCore(e, t)
	}, loadDefaultPortal = (e, t = [], o) => {
		const n = PCore.getEnvironmentInfo().getDefaultPortal();
		loadPortal(e, n, t, o)
	}, isNewUnifiedBuild = () => !1, updateLocale = e => {
		PCore.getEnvironmentInfo().setLocale(e)
	};
export {
	bootstrap,
	loadView,
	loadPortal,
	loadDefaultPortal,
	loadComponent,
	loadMashup,
	loadViewByName,
	loadCase,
	createCase,
	loadAssignment,
	loadPreview,
	bootstrapWithAuthHeader,
	initConstellationCore,
	isNewUnifiedBuild,
	registerForDebugInfo,
	toggleTracerHeaders,
	loadEnvironmentInfo,
	updateLocale
};