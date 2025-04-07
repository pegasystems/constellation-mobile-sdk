/*! For license information please see shared/responses/cdn/LICENSE file in the repository */
var e = {
		62: (e, t, n) => {
			var r = n(969);
			Object.defineProperty(t, "reduxBatch", {
				enumerable: !0,
				get: function() {
					return r.reduxBatch
				}
			})
		},
		969: (e, t) => {
			Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.reduxBatch = function(e) {
				var t = [],
					n = void 0;

				function r() {
					t === n && (t = t.slice())
				}

				function a(e) {
					if ("function" != typeof e) throw new Error("Invalid listener, expected a function");
					var n = !0;
					return r(), t.push(e),
						function() {
							n && (r(), t.splice(t.indexOf(e), 1), n = !1)
						}
				}

				function s() {
					for (var e = t, r = 0; r < e.length; ++r) n = e, e[r]()
				}
				return function() {
					var t = e.apply(void 0, arguments),
						n = !1,
						r = !1;

					function o(e) {
						return Array.isArray(e) ? e.map((function(e) {
							return o(e)
						})) : t.dispatch(e)
					}
					return t.subscribe((function() {
						r ? n = !0 : s()
					})), Object.assign({}, t, {
						dispatch: function(e) {
							var t = r;
							t || (n = !1, r = !0);
							var a = o(e),
								i = n && !t;
							return t || (n = !1, r = !1), i && s(), a
						},
						subscribe: a
					})
				}
			}
		},
		578: (e, t, n) => {
			e.exports = n(62)
		},
		766: e => {
			e.exports = function e(t, n) {
				if (t === n) return !0;
				if (t && n && "object" == typeof t && "object" == typeof n) {
					if (t.constructor !== n.constructor) return !1;
					var r, a, s;
					if (Array.isArray(t)) {
						if ((r = t.length) != n.length) return !1;
						for (a = r; 0 != a--;)
							if (!e(t[a], n[a])) return !1;
						return !0
					}
					if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
					if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
					if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
					if ((r = (s = Object.keys(t)).length) !== Object.keys(n).length) return !1;
					for (a = r; 0 != a--;)
						if (!Object.prototype.hasOwnProperty.call(n, s[a])) return !1;
					for (a = r; 0 != a--;) {
						var o = s[a];
						if (!e(t[o], n[o])) return !1
					}
					return !0
				}
				return t != t && n != n
			}
		},
		526: (e, t, n) => {
			var r = "__lodash_hash_undefined__",
				a = 9007199254740991,
				s = "[object Arguments]",
				o = "[object Function]",
				i = "[object GeneratorFunction]",
				c = /^\[object .+?Constructor\]$/,
				d = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				l = "object" == typeof self && self && self.Object === Object && self,
				u = d || l || Function("return this")();

			function p(e, t) {
				return !!(e ? e.length : 0) && function(e, t, n) {
					if (t != t) return function(e, t, n, r) {
						var a = e.length,
							s = n + (r ? 1 : -1);
						for (; r ? s-- : ++s < a;)
							if (t(e[s], s, e)) return s;
						return -1
					}(e, f, n);
					var r = n - 1,
						a = e.length;
					for (; ++r < a;)
						if (e[r] === t) return r;
					return -1
				}(e, t, 0) > -1
			}

			function h(e, t, n) {
				for (var r = -1, a = e ? e.length : 0; ++r < a;)
					if (n(t, e[r])) return !0;
				return !1
			}

			function g(e, t) {
				for (var n = -1, r = t.length, a = e.length; ++n < r;) e[a + n] = t[n];
				return e
			}

			function f(e) {
				return e != e
			}

			function y(e, t) {
				return e.has(t)
			}
			var m, I = Array.prototype,
				E = Function.prototype,
				A = Object.prototype,
				_ = u["__core-js_shared__"],
				S = (m = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "")) ? "Symbol(src)_1." + m : "",
				C = E.toString,
				$ = A.hasOwnProperty,
				b = A.toString,
				P = RegExp("^" + C.call($).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				O = u.Symbol,
				T = A.propertyIsEnumerable,
				v = I.splice,
				N = O ? O.isConcatSpreadable : void 0,
				R = Math.max,
				D = B(u, "Map"),
				x = B(Object, "create");

			function w(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function M(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function L(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function j(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.__data__ = new L; ++t < n;) this.add(e[t])
			}

			function U(e, t) {
				for (var n, r, a = e.length; a--;)
					if ((n = e[a][0]) === (r = t) || n != n && r != r) return a;
				return -1
			}

			function F(e, t, n, r) {
				var a, s = -1,
					o = p,
					i = !0,
					c = e.length,
					d = [],
					l = t.length;
				if (!c) return d;
				n && (t = function(e, t) {
					for (var n = -1, r = e ? e.length : 0, a = Array(r); ++n < r;) a[n] = t(e[n], n, e);
					return a
				}(t, (a = n, function(e) {
					return a(e)
				}))), r ? (o = h, i = !1) : t.length >= 200 && (o = y, i = !1, t = new j(t));
				e: for (; ++s < c;) {
					var u = e[s],
						g = n ? n(u) : u;
					if (u = r || 0 !== u ? u : 0, i && g == g) {
						for (var f = l; f--;)
							if (t[f] === g) continue e;
						d.push(u)
					} else o(t, g, r) || d.push(u)
				}
				return d
			}

			function k(e, t, n, r, a) {
				var s = -1,
					o = e.length;
				for (n || (n = H), a || (a = []); ++s < o;) {
					var i = e[s];
					t > 0 && n(i) ? t > 1 ? k(i, t - 1, n, r, a) : g(a, i) : r || (a[a.length] = i)
				}
				return a
			}

			function V(e) {
				if (!Q(e) || (t = e, S && S in t)) return !1;
				var t, n = J(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? P : c;
				return n.test(function(e) {
					if (null != e) {
						try {
							return C.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function G(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function B(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return V(n) ? n : void 0
			}

			function H(e) {
				return Y(e) || function(e) {
					return X(e) && $.call(e, "callee") && (!T.call(e, "callee") || b.call(e) == s)
				}(e) || !!(N && e && e[N])
			}
			w.prototype.clear = function() {
				this.__data__ = x ? x(null) : {}
			}, w.prototype.delete = function(e) {
				return this.has(e) && delete this.__data__[e]
			}, w.prototype.get = function(e) {
				var t = this.__data__;
				if (x) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return $.call(t, e) ? t[e] : void 0
			}, w.prototype.has = function(e) {
				var t = this.__data__;
				return x ? void 0 !== t[e] : $.call(t, e)
			}, w.prototype.set = function(e, t) {
				return this.__data__[e] = x && void 0 === t ? r : t, this
			}, M.prototype.clear = function() {
				this.__data__ = []
			}, M.prototype.delete = function(e) {
				var t = this.__data__,
					n = U(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : v.call(t, n, 1), !0)
			}, M.prototype.get = function(e) {
				var t = this.__data__,
					n = U(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, M.prototype.has = function(e) {
				return U(this.__data__, e) > -1
			}, M.prototype.set = function(e, t) {
				var n = this.__data__,
					r = U(n, e);
				return r < 0 ? n.push([e, t]) : n[r][1] = t, this
			}, L.prototype.clear = function() {
				this.__data__ = {
					hash: new w,
					map: new(D || M),
					string: new w
				}
			}, L.prototype.delete = function(e) {
				return G(this, e).delete(e)
			}, L.prototype.get = function(e) {
				return G(this, e).get(e)
			}, L.prototype.has = function(e) {
				return G(this, e).has(e)
			}, L.prototype.set = function(e, t) {
				return G(this, e).set(e, t), this
			}, j.prototype.add = j.prototype.push = function(e) {
				return this.__data__.set(e, r), this
			}, j.prototype.has = function(e) {
				return this.__data__.has(e)
			};
			var W, q, z = (W = function(e, t) {
				return X(e) ? F(e, k(t, 1, X, !0)) : []
			}, q = R(void 0 === q ? W.length - 1 : q, 0), function() {
				for (var e = arguments, t = -1, n = R(e.length - q, 0), r = Array(n); ++t < n;) r[t] = e[q + t];
				t = -1;
				for (var a = Array(q + 1); ++t < q;) a[t] = e[t];
				return a[q] = r,
					function(e, t, n) {
						switch (n.length) {
							case 0:
								return e.call(t);
							case 1:
								return e.call(t, n[0]);
							case 2:
								return e.call(t, n[0], n[1]);
							case 3:
								return e.call(t, n[0], n[1], n[2])
						}
						return e.apply(t, n)
					}(W, this, a)
			});
			var Y = Array.isArray;

			function K(e) {
				return null != e && function(e) {
					return "number" == typeof e && e > -1 && e % 1 == 0 && e <= a
				}(e.length) && !J(e)
			}

			function X(e) {
				return function(e) {
					return !!e && "object" == typeof e
				}(e) && K(e)
			}

			function J(e) {
				var t = Q(e) ? b.call(e) : "";
				return t == o || t == i
			}

			function Q(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}
			e.exports = z
		},
		399: (e, t, n) => {
			var r = "__lodash_hash_undefined__",
				a = 1 / 0,
				s = "[object Function]",
				o = "[object GeneratorFunction]",
				i = "[object Symbol]",
				c = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
				d = /^\w*$/,
				l = /^\./,
				u = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
				p = /\\(\\)?/g,
				h = /^\[object .+?Constructor\]$/,
				g = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				f = "object" == typeof self && self && self.Object === Object && self,
				y = g || f || Function("return this")();
			var m, I = Array.prototype,
				E = Function.prototype,
				A = Object.prototype,
				_ = y["__core-js_shared__"],
				S = (m = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "")) ? "Symbol(src)_1." + m : "",
				C = E.toString,
				$ = A.hasOwnProperty,
				b = A.toString,
				P = RegExp("^" + C.call($).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				O = y.Symbol,
				T = I.splice,
				v = k(y, "Map"),
				N = k(Object, "create"),
				R = O ? O.prototype : void 0,
				D = R ? R.toString : void 0;

			function x(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function w(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function M(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function L(e, t) {
				for (var n, r, a = e.length; a--;)
					if ((n = e[a][0]) === (r = t) || n != n && r != r) return a;
				return -1
			}

			function j(e, t) {
				var n;
				t = function(e, t) {
					if (H(e)) return !1;
					var n = typeof e;
					if ("number" == n || "symbol" == n || "boolean" == n || null == e || q(e)) return !0;
					return d.test(e) || !c.test(e) || null != t && e in Object(t)
				}(t, e) ? [t] : H(n = t) ? n : V(n);
				for (var r = 0, a = t.length; null != e && r < a;) e = e[G(t[r++])];
				return r && r == a ? e : void 0
			}

			function U(e) {
				if (!W(e) || (t = e, S && S in t)) return !1;
				var t, n = function(e) {
					var t = W(e) ? b.call(e) : "";
					return t == s || t == o
				}(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? P : h;
				return n.test(function(e) {
					if (null != e) {
						try {
							return C.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function F(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function k(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return U(n) ? n : void 0
			}
			x.prototype.clear = function() {
				this.__data__ = N ? N(null) : {}
			}, x.prototype.delete = function(e) {
				return this.has(e) && delete this.__data__[e]
			}, x.prototype.get = function(e) {
				var t = this.__data__;
				if (N) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return $.call(t, e) ? t[e] : void 0
			}, x.prototype.has = function(e) {
				var t = this.__data__;
				return N ? void 0 !== t[e] : $.call(t, e)
			}, x.prototype.set = function(e, t) {
				return this.__data__[e] = N && void 0 === t ? r : t, this
			}, w.prototype.clear = function() {
				this.__data__ = []
			}, w.prototype.delete = function(e) {
				var t = this.__data__,
					n = L(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : T.call(t, n, 1), !0)
			}, w.prototype.get = function(e) {
				var t = this.__data__,
					n = L(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, w.prototype.has = function(e) {
				return L(this.__data__, e) > -1
			}, w.prototype.set = function(e, t) {
				var n = this.__data__,
					r = L(n, e);
				return r < 0 ? n.push([e, t]) : n[r][1] = t, this
			}, M.prototype.clear = function() {
				this.__data__ = {
					hash: new x,
					map: new(v || w),
					string: new x
				}
			}, M.prototype.delete = function(e) {
				return F(this, e).delete(e)
			}, M.prototype.get = function(e) {
				return F(this, e).get(e)
			}, M.prototype.has = function(e) {
				return F(this, e).has(e)
			}, M.prototype.set = function(e, t) {
				return F(this, e).set(e, t), this
			};
			var V = B((function(e) {
				var t;
				e = null == (t = e) ? "" : function(e) {
					if ("string" == typeof e) return e;
					if (q(e)) return D ? D.call(e) : "";
					var t = e + "";
					return "0" == t && 1 / e == -a ? "-0" : t
				}(t);
				var n = [];
				return l.test(e) && n.push(""), e.replace(u, (function(e, t, r, a) {
					n.push(r ? a.replace(p, "$1") : t || e)
				})), n
			}));

			function G(e) {
				if ("string" == typeof e || q(e)) return e;
				var t = e + "";
				return "0" == t && 1 / e == -a ? "-0" : t
			}

			function B(e, t) {
				if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
				var n = function() {
					var r = arguments,
						a = t ? t.apply(this, r) : r[0],
						s = n.cache;
					if (s.has(a)) return s.get(a);
					var o = e.apply(this, r);
					return n.cache = s.set(a, o), o
				};
				return n.cache = new(B.Cache || M), n
			}
			B.Cache = M;
			var H = Array.isArray;

			function W(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}

			function q(e) {
				return "symbol" == typeof e || function(e) {
					return !!e && "object" == typeof e
				}(e) && b.call(e) == i
			}
			e.exports = function(e, t, n) {
				var r = null == e ? void 0 : j(e, t);
				return void 0 === r ? n : r
			}
		},
		163: (e, t, n) => {
			var r = "__lodash_hash_undefined__",
				a = 1 / 0,
				s = 9007199254740991,
				o = "[object Arguments]",
				i = "[object Function]",
				c = "[object GeneratorFunction]",
				d = "[object Symbol]",
				l = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
				u = /^\w*$/,
				p = /^\./,
				h = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
				g = /\\(\\)?/g,
				f = /^\[object .+?Constructor\]$/,
				y = /^(?:0|[1-9]\d*)$/,
				m = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				I = "object" == typeof self && self && self.Object === Object && self,
				E = m || I || Function("return this")();
			var A, _ = Array.prototype,
				S = Function.prototype,
				C = Object.prototype,
				$ = E["__core-js_shared__"],
				b = (A = /[^.]+$/.exec($ && $.keys && $.keys.IE_PROTO || "")) ? "Symbol(src)_1." + A : "",
				P = S.toString,
				O = C.hasOwnProperty,
				T = C.toString,
				v = RegExp("^" + P.call(O).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				N = E.Symbol,
				R = C.propertyIsEnumerable,
				D = _.splice,
				x = H(E, "Map"),
				w = H(Object, "create"),
				M = N ? N.prototype : void 0,
				L = M ? M.toString : void 0;

			function j(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function U(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function F(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function k(e, t) {
				for (var n, r, a = e.length; a--;)
					if ((n = e[a][0]) === (r = t) || n != n && r != r) return a;
				return -1
			}

			function V(e, t) {
				return null != e && O.call(e, t)
			}

			function G(e) {
				if (!Q(e) || (t = e, b && b in t)) return !1;
				var t, n = X(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? v : f;
				return n.test(function(e) {
					if (null != e) {
						try {
							return P.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function B(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function H(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return G(n) ? n : void 0
			}

			function W(e, t, n) {
				var r;
				t = function(e, t) {
					if (K(e)) return !1;
					var n = typeof e;
					if ("number" == n || "symbol" == n || "boolean" == n || null == e || ee(e)) return !0;
					return u.test(e) || !l.test(e) || null != t && e in Object(t)
				}(t, e) ? [t] : K(r = t) ? r : q(r);
				for (var a, i = -1, c = t.length; ++i < c;) {
					var d = z(t[i]);
					if (!(a = null != e && n(e, d))) break;
					e = e[d]
				}
				return a || !!(c = e ? e.length : 0) && J(c) && function(e, t) {
					return t = null == t ? s : t, !!t && ("number" == typeof e || y.test(e)) && e > -1 && e % 1 == 0 && e < t
				}(d, c) && (K(e) || function(e) {
					return function(e) {
						return Z(e) && function(e) {
							return null != e && J(e.length) && !X(e)
						}(e)
					}(e) && O.call(e, "callee") && (!R.call(e, "callee") || T.call(e) == o)
				}(e))
			}
			j.prototype.clear = function() {
				this.__data__ = w ? w(null) : {}
			}, j.prototype.delete = function(e) {
				return this.has(e) && delete this.__data__[e]
			}, j.prototype.get = function(e) {
				var t = this.__data__;
				if (w) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return O.call(t, e) ? t[e] : void 0
			}, j.prototype.has = function(e) {
				var t = this.__data__;
				return w ? void 0 !== t[e] : O.call(t, e)
			}, j.prototype.set = function(e, t) {
				return this.__data__[e] = w && void 0 === t ? r : t, this
			}, U.prototype.clear = function() {
				this.__data__ = []
			}, U.prototype.delete = function(e) {
				var t = this.__data__,
					n = k(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : D.call(t, n, 1), !0)
			}, U.prototype.get = function(e) {
				var t = this.__data__,
					n = k(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, U.prototype.has = function(e) {
				return k(this.__data__, e) > -1
			}, U.prototype.set = function(e, t) {
				var n = this.__data__,
					r = k(n, e);
				return r < 0 ? n.push([e, t]) : n[r][1] = t, this
			}, F.prototype.clear = function() {
				this.__data__ = {
					hash: new j,
					map: new(x || U),
					string: new j
				}
			}, F.prototype.delete = function(e) {
				return B(this, e).delete(e)
			}, F.prototype.get = function(e) {
				return B(this, e).get(e)
			}, F.prototype.has = function(e) {
				return B(this, e).has(e)
			}, F.prototype.set = function(e, t) {
				return B(this, e).set(e, t), this
			};
			var q = Y((function(e) {
				var t;
				e = null == (t = e) ? "" : function(e) {
					if ("string" == typeof e) return e;
					if (ee(e)) return L ? L.call(e) : "";
					var t = e + "";
					return "0" == t && 1 / e == -a ? "-0" : t
				}(t);
				var n = [];
				return p.test(e) && n.push(""), e.replace(h, (function(e, t, r, a) {
					n.push(r ? a.replace(g, "$1") : t || e)
				})), n
			}));

			function z(e) {
				if ("string" == typeof e || ee(e)) return e;
				var t = e + "";
				return "0" == t && 1 / e == -a ? "-0" : t
			}

			function Y(e, t) {
				if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
				var n = function() {
					var r = arguments,
						a = t ? t.apply(this, r) : r[0],
						s = n.cache;
					if (s.has(a)) return s.get(a);
					var o = e.apply(this, r);
					return n.cache = s.set(a, o), o
				};
				return n.cache = new(Y.Cache || F), n
			}
			Y.Cache = F;
			var K = Array.isArray;

			function X(e) {
				var t = Q(e) ? T.call(e) : "";
				return t == i || t == c
			}

			function J(e) {
				return "number" == typeof e && e > -1 && e % 1 == 0 && e <= s
			}

			function Q(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}

			function Z(e) {
				return !!e && "object" == typeof e
			}

			function ee(e) {
				return "symbol" == typeof e || Z(e) && T.call(e) == d
			}
			e.exports = function(e, t) {
				return null != e && W(e, t, V)
			}
		},
		353: (e, t, n) => {
			e = n.nmd(e);
			var r = 9007199254740991,
				a = "[object Arguments]",
				s = "[object Function]",
				o = "[object GeneratorFunction]",
				i = "[object Map]",
				c = "[object Promise]",
				d = "[object Set]",
				l = "[object WeakMap]",
				u = "[object DataView]",
				p = /^\[object .+?Constructor\]$/,
				h = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				g = "object" == typeof self && self && self.Object === Object && self,
				f = h || g || Function("return this")(),
				y = t && !t.nodeType && t,
				m = y && e && !e.nodeType && e,
				I = m && m.exports === y;
			var E, A, _, S = Function.prototype,
				C = Object.prototype,
				$ = f["__core-js_shared__"],
				b = (E = /[^.]+$/.exec($ && $.keys && $.keys.IE_PROTO || "")) ? "Symbol(src)_1." + E : "",
				P = S.toString,
				O = C.hasOwnProperty,
				T = C.toString,
				v = RegExp("^" + P.call(O).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				N = I ? f.Buffer : void 0,
				R = C.propertyIsEnumerable,
				D = N ? N.isBuffer : void 0,
				x = (A = Object.keys, _ = Object, function(e) {
					return A(_(e))
				}),
				w = q(f, "DataView"),
				M = q(f, "Map"),
				L = q(f, "Promise"),
				j = q(f, "Set"),
				U = q(f, "WeakMap"),
				F = !R.call({
					valueOf: 1
				}, "valueOf"),
				k = Y(w),
				V = Y(M),
				G = Y(L),
				B = Y(j),
				H = Y(U);

			function W(e) {
				if (!ee(e) || function(e) {
						return !!b && b in e
					}(e)) return !1;
				var t = Z(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? v : p;
				return t.test(Y(e))
			}

			function q(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return W(n) ? n : void 0
			}
			var z = function(e) {
				return T.call(e)
			};

			function Y(e) {
				if (null != e) {
					try {
						return P.call(e)
					} catch (e) {}
					try {
						return e + ""
					} catch (e) {}
				}
				return ""
			}

			function K(e) {
				return function(e) {
					return function(e) {
						return !!e && "object" == typeof e
					}(e) && J(e)
				}(e) && O.call(e, "callee") && (!R.call(e, "callee") || T.call(e) == a)
			}(w && z(new w(new ArrayBuffer(1))) != u || M && z(new M) != i || L && z(L.resolve()) != c || j && z(new j) != d || U && z(new U) != l) && (z = function(e) {
				var t = T.call(e),
					n = "[object Object]" == t ? e.constructor : void 0,
					r = n ? Y(n) : void 0;
				if (r) switch (r) {
					case k:
						return u;
					case V:
						return i;
					case G:
						return c;
					case B:
						return d;
					case H:
						return l
				}
				return t
			});
			var X = Array.isArray;

			function J(e) {
				return null != e && function(e) {
					return "number" == typeof e && e > -1 && e % 1 == 0 && e <= r
				}(e.length) && !Z(e)
			}
			var Q = D || function() {
				return !1
			};

			function Z(e) {
				var t = ee(e) ? T.call(e) : "";
				return t == s || t == o
			}

			function ee(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}
			e.exports = function(e) {
				if (J(e) && (X(e) || "string" == typeof e || "function" == typeof e.splice || Q(e) || K(e))) return !e.length;
				var t = z(e);
				if (t == i || t == d) return !e.size;
				if (F || function(e) {
						var t = e && e.constructor;
						return e === ("function" == typeof t && t.prototype || C)
					}(e)) return !x(e).length;
				for (var n in e)
					if (O.call(e, n)) return !1;
				return !0
			}
		},
		729: (e, t, n) => {
			e = n.nmd(e);
			var r = "__lodash_hash_undefined__",
				a = 1,
				s = 2,
				o = 9007199254740991,
				i = "[object Arguments]",
				c = "[object Array]",
				d = "[object AsyncFunction]",
				l = "[object Boolean]",
				u = "[object Date]",
				p = "[object Error]",
				h = "[object Function]",
				g = "[object GeneratorFunction]",
				f = "[object Map]",
				y = "[object Number]",
				m = "[object Null]",
				I = "[object Object]",
				E = "[object Promise]",
				A = "[object Proxy]",
				_ = "[object RegExp]",
				S = "[object Set]",
				C = "[object String]",
				$ = "[object Symbol]",
				b = "[object Undefined]",
				P = "[object WeakMap]",
				O = "[object ArrayBuffer]",
				T = "[object DataView]",
				v = /^\[object .+?Constructor\]$/,
				N = /^(?:0|[1-9]\d*)$/,
				R = {};
			R["[object Float32Array]"] = R["[object Float64Array]"] = R["[object Int8Array]"] = R["[object Int16Array]"] = R["[object Int32Array]"] = R["[object Uint8Array]"] = R["[object Uint8ClampedArray]"] = R["[object Uint16Array]"] = R["[object Uint32Array]"] = !0, R[i] = R[c] = R[O] = R[l] = R[T] = R[u] = R[p] = R[h] = R[f] = R[y] = R[I] = R[_] = R[S] = R[C] = R[P] = !1;
			var D = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				x = "object" == typeof self && self && self.Object === Object && self,
				w = D || x || Function("return this")(),
				M = t && !t.nodeType && t,
				L = M && e && !e.nodeType && e,
				j = L && L.exports === M,
				U = j && D.process,
				F = function() {
					try {
						return U && U.binding && U.binding("util")
					} catch (e) {}
				}(),
				k = F && F.isTypedArray;

			function V(e, t) {
				for (var n = -1, r = null == e ? 0 : e.length; ++n < r;)
					if (t(e[n], n, e)) return !0;
				return !1
			}

			function G(e) {
				var t = -1,
					n = Array(e.size);
				return e.forEach((function(e, r) {
					n[++t] = [r, e]
				})), n
			}

			function B(e) {
				var t = -1,
					n = Array(e.size);
				return e.forEach((function(e) {
					n[++t] = e
				})), n
			}
			var H, W, q, z = Array.prototype,
				Y = Function.prototype,
				K = Object.prototype,
				X = w["__core-js_shared__"],
				J = Y.toString,
				Q = K.hasOwnProperty,
				Z = (H = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "")) ? "Symbol(src)_1." + H : "",
				ee = K.toString,
				te = RegExp("^" + J.call(Q).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				ne = j ? w.Buffer : void 0,
				re = w.Symbol,
				ae = w.Uint8Array,
				se = K.propertyIsEnumerable,
				oe = z.splice,
				ie = re ? re.toStringTag : void 0,
				ce = Object.getOwnPropertySymbols,
				de = ne ? ne.isBuffer : void 0,
				le = (W = Object.keys, q = Object, function(e) {
					return W(q(e))
				}),
				ue = Fe(w, "DataView"),
				pe = Fe(w, "Map"),
				he = Fe(w, "Promise"),
				ge = Fe(w, "Set"),
				fe = Fe(w, "WeakMap"),
				ye = Fe(Object, "create"),
				me = Be(ue),
				Ie = Be(pe),
				Ee = Be(he),
				Ae = Be(ge),
				_e = Be(fe),
				Se = re ? re.prototype : void 0,
				Ce = Se ? Se.valueOf : void 0;

			function $e(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function be(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function Pe(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function Oe(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.__data__ = new Pe; ++t < n;) this.add(e[t])
			}

			function Te(e) {
				var t = this.__data__ = new be(e);
				this.size = t.size
			}

			function ve(e, t) {
				var n = qe(e),
					r = !n && We(e),
					a = !n && !r && ze(e),
					s = !n && !r && !a && Qe(e),
					o = n || r || a || s,
					i = o ? function(e, t) {
						for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
						return r
					}(e.length, String) : [],
					c = i.length;
				for (var d in e) !t && !Q.call(e, d) || o && ("length" == d || a && ("offset" == d || "parent" == d) || s && ("buffer" == d || "byteLength" == d || "byteOffset" == d) || Ge(d, c)) || i.push(d);
				return i
			}

			function Ne(e, t) {
				for (var n = e.length; n--;)
					if (He(e[n][0], t)) return n;
				return -1
			}

			function Re(e) {
				return null == e ? void 0 === e ? b : m : ie && ie in Object(e) ? function(e) {
					var t = Q.call(e, ie),
						n = e[ie];
					try {
						e[ie] = void 0;
						var r = !0
					} catch (e) {}
					var a = ee.call(e);
					r && (t ? e[ie] = n : delete e[ie]);
					return a
				}(e) : function(e) {
					return ee.call(e)
				}(e)
			}

			function De(e) {
				return Je(e) && Re(e) == i
			}

			function xe(e, t, n, r, o) {
				return e === t || (null == e || null == t || !Je(e) && !Je(t) ? e != e && t != t : function(e, t, n, r, o, d) {
					var h = qe(e),
						g = qe(t),
						m = h ? c : Ve(e),
						E = g ? c : Ve(t),
						A = (m = m == i ? I : m) == I,
						b = (E = E == i ? I : E) == I,
						P = m == E;
					if (P && ze(e)) {
						if (!ze(t)) return !1;
						h = !0, A = !1
					}
					if (P && !A) return d || (d = new Te), h || Qe(e) ? Le(e, t, n, r, o, d) : function(e, t, n, r, o, i, c) {
						switch (n) {
							case T:
								if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
								e = e.buffer, t = t.buffer;
							case O:
								return !(e.byteLength != t.byteLength || !i(new ae(e), new ae(t)));
							case l:
							case u:
							case y:
								return He(+e, +t);
							case p:
								return e.name == t.name && e.message == t.message;
							case _:
							case C:
								return e == t + "";
							case f:
								var d = G;
							case S:
								var h = r & a;
								if (d || (d = B), e.size != t.size && !h) return !1;
								var g = c.get(e);
								if (g) return g == t;
								r |= s, c.set(e, t);
								var m = Le(d(e), d(t), r, o, i, c);
								return c.delete(e), m;
							case $:
								if (Ce) return Ce.call(e) == Ce.call(t)
						}
						return !1
					}(e, t, m, n, r, o, d);
					if (!(n & a)) {
						var v = A && Q.call(e, "__wrapped__"),
							N = b && Q.call(t, "__wrapped__");
						if (v || N) {
							var R = v ? e.value() : e,
								D = N ? t.value() : t;
							return d || (d = new Te), o(R, D, n, r, d)
						}
					}
					if (!P) return !1;
					return d || (d = new Te),
						function(e, t, n, r, s, o) {
							var i = n & a,
								c = je(e),
								d = c.length,
								l = je(t),
								u = l.length;
							if (d != u && !i) return !1;
							var p = d;
							for (; p--;) {
								var h = c[p];
								if (!(i ? h in t : Q.call(t, h))) return !1
							}
							var g = o.get(e);
							if (g && o.get(t)) return g == t;
							var f = !0;
							o.set(e, t), o.set(t, e);
							var y = i;
							for (; ++p < d;) {
								var m = e[h = c[p]],
									I = t[h];
								if (r) var E = i ? r(I, m, h, t, e, o) : r(m, I, h, e, t, o);
								if (!(void 0 === E ? m === I || s(m, I, n, r, o) : E)) {
									f = !1;
									break
								}
								y || (y = "constructor" == h)
							}
							if (f && !y) {
								var A = e.constructor,
									_ = t.constructor;
								A == _ || !("constructor" in e) || !("constructor" in t) || "function" == typeof A && A instanceof A && "function" == typeof _ && _ instanceof _ || (f = !1)
							}
							return o.delete(e), o.delete(t), f
						}(e, t, n, r, o, d)
				}(e, t, n, r, xe, o))
			}

			function we(e) {
				return !(!Xe(e) || function(e) {
					return !!Z && Z in e
				}(e)) && (Ye(e) ? te : v).test(Be(e))
			}

			function Me(e) {
				if (n = (t = e) && t.constructor, r = "function" == typeof n && n.prototype || K, t !== r) return le(e);
				var t, n, r, a = [];
				for (var s in Object(e)) Q.call(e, s) && "constructor" != s && a.push(s);
				return a
			}

			function Le(e, t, n, r, o, i) {
				var c = n & a,
					d = e.length,
					l = t.length;
				if (d != l && !(c && l > d)) return !1;
				var u = i.get(e);
				if (u && i.get(t)) return u == t;
				var p = -1,
					h = !0,
					g = n & s ? new Oe : void 0;
				for (i.set(e, t), i.set(t, e); ++p < d;) {
					var f = e[p],
						y = t[p];
					if (r) var m = c ? r(y, f, p, t, e, i) : r(f, y, p, e, t, i);
					if (void 0 !== m) {
						if (m) continue;
						h = !1;
						break
					}
					if (g) {
						if (!V(t, (function(e, t) {
								if (a = t, !g.has(a) && (f === e || o(f, e, n, r, i))) return g.push(t);
								var a
							}))) {
							h = !1;
							break
						}
					} else if (f !== y && !o(f, y, n, r, i)) {
						h = !1;
						break
					}
				}
				return i.delete(e), i.delete(t), h
			}

			function je(e) {
				return function(e, t, n) {
					var r = t(e);
					return qe(e) ? r : function(e, t) {
						for (var n = -1, r = t.length, a = e.length; ++n < r;) e[a + n] = t[n];
						return e
					}(r, n(e))
				}(e, Ze, ke)
			}

			function Ue(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function Fe(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return we(n) ? n : void 0
			}
			$e.prototype.clear = function() {
				this.__data__ = ye ? ye(null) : {}, this.size = 0
			}, $e.prototype.delete = function(e) {
				var t = this.has(e) && delete this.__data__[e];
				return this.size -= t ? 1 : 0, t
			}, $e.prototype.get = function(e) {
				var t = this.__data__;
				if (ye) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return Q.call(t, e) ? t[e] : void 0
			}, $e.prototype.has = function(e) {
				var t = this.__data__;
				return ye ? void 0 !== t[e] : Q.call(t, e)
			}, $e.prototype.set = function(e, t) {
				var n = this.__data__;
				return this.size += this.has(e) ? 0 : 1, n[e] = ye && void 0 === t ? r : t, this
			}, be.prototype.clear = function() {
				this.__data__ = [], this.size = 0
			}, be.prototype.delete = function(e) {
				var t = this.__data__,
					n = Ne(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : oe.call(t, n, 1), --this.size, !0)
			}, be.prototype.get = function(e) {
				var t = this.__data__,
					n = Ne(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, be.prototype.has = function(e) {
				return Ne(this.__data__, e) > -1
			}, be.prototype.set = function(e, t) {
				var n = this.__data__,
					r = Ne(n, e);
				return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this
			}, Pe.prototype.clear = function() {
				this.size = 0, this.__data__ = {
					hash: new $e,
					map: new(pe || be),
					string: new $e
				}
			}, Pe.prototype.delete = function(e) {
				var t = Ue(this, e).delete(e);
				return this.size -= t ? 1 : 0, t
			}, Pe.prototype.get = function(e) {
				return Ue(this, e).get(e)
			}, Pe.prototype.has = function(e) {
				return Ue(this, e).has(e)
			}, Pe.prototype.set = function(e, t) {
				var n = Ue(this, e),
					r = n.size;
				return n.set(e, t), this.size += n.size == r ? 0 : 1, this
			}, Oe.prototype.add = Oe.prototype.push = function(e) {
				return this.__data__.set(e, r), this
			}, Oe.prototype.has = function(e) {
				return this.__data__.has(e)
			}, Te.prototype.clear = function() {
				this.__data__ = new be, this.size = 0
			}, Te.prototype.delete = function(e) {
				var t = this.__data__,
					n = t.delete(e);
				return this.size = t.size, n
			}, Te.prototype.get = function(e) {
				return this.__data__.get(e)
			}, Te.prototype.has = function(e) {
				return this.__data__.has(e)
			}, Te.prototype.set = function(e, t) {
				var n = this.__data__;
				if (n instanceof be) {
					var r = n.__data__;
					if (!pe || r.length < 199) return r.push([e, t]), this.size = ++n.size, this;
					n = this.__data__ = new Pe(r)
				}
				return n.set(e, t), this.size = n.size, this
			};
			var ke = ce ? function(e) {
					return null == e ? [] : (e = Object(e), function(e, t) {
						for (var n = -1, r = null == e ? 0 : e.length, a = 0, s = []; ++n < r;) {
							var o = e[n];
							t(o, n, e) && (s[a++] = o)
						}
						return s
					}(ce(e), (function(t) {
						return se.call(e, t)
					})))
				} : function() {
					return []
				},
				Ve = Re;

			function Ge(e, t) {
				return !!(t = null == t ? o : t) && ("number" == typeof e || N.test(e)) && e > -1 && e % 1 == 0 && e < t
			}

			function Be(e) {
				if (null != e) {
					try {
						return J.call(e)
					} catch (e) {}
					try {
						return e + ""
					} catch (e) {}
				}
				return ""
			}

			function He(e, t) {
				return e === t || e != e && t != t
			}(ue && Ve(new ue(new ArrayBuffer(1))) != T || pe && Ve(new pe) != f || he && Ve(he.resolve()) != E || ge && Ve(new ge) != S || fe && Ve(new fe) != P) && (Ve = function(e) {
				var t = Re(e),
					n = t == I ? e.constructor : void 0,
					r = n ? Be(n) : "";
				if (r) switch (r) {
					case me:
						return T;
					case Ie:
						return f;
					case Ee:
						return E;
					case Ae:
						return S;
					case _e:
						return P
				}
				return t
			});
			var We = De(function() {
					return arguments
				}()) ? De : function(e) {
					return Je(e) && Q.call(e, "callee") && !se.call(e, "callee")
				},
				qe = Array.isArray;
			var ze = de || function() {
				return !1
			};

			function Ye(e) {
				if (!Xe(e)) return !1;
				var t = Re(e);
				return t == h || t == g || t == d || t == A
			}

			function Ke(e) {
				return "number" == typeof e && e > -1 && e % 1 == 0 && e <= o
			}

			function Xe(e) {
				var t = typeof e;
				return null != e && ("object" == t || "function" == t)
			}

			function Je(e) {
				return null != e && "object" == typeof e
			}
			var Qe = k ? function(e) {
				return function(t) {
					return e(t)
				}
			}(k) : function(e) {
				return Je(e) && Ke(e.length) && !!R[Re(e)]
			};

			function Ze(e) {
				return null != (t = e) && Ke(t.length) && !Ye(t) ? ve(e) : Me(e);
				var t
			}
			e.exports = function(e, t) {
				return xe(e, t)
			}
		},
		678: (e, t, n) => {
			e = n.nmd(e);
			var r = "__lodash_hash_undefined__",
				a = 9007199254740991,
				s = "[object Arguments]",
				o = "[object AsyncFunction]",
				i = "[object Function]",
				c = "[object GeneratorFunction]",
				d = "[object Null]",
				l = "[object Object]",
				u = "[object Proxy]",
				p = "[object Undefined]",
				h = /^\[object .+?Constructor\]$/,
				g = /^(?:0|[1-9]\d*)$/,
				f = {};
			f["[object Float32Array]"] = f["[object Float64Array]"] = f["[object Int8Array]"] = f["[object Int16Array]"] = f["[object Int32Array]"] = f["[object Uint8Array]"] = f["[object Uint8ClampedArray]"] = f["[object Uint16Array]"] = f["[object Uint32Array]"] = !0, f[s] = f["[object Array]"] = f["[object ArrayBuffer]"] = f["[object Boolean]"] = f["[object DataView]"] = f["[object Date]"] = f["[object Error]"] = f[i] = f["[object Map]"] = f["[object Number]"] = f[l] = f["[object RegExp]"] = f["[object Set]"] = f["[object String]"] = f["[object WeakMap]"] = !1;
			var y = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				m = "object" == typeof self && self && self.Object === Object && self,
				I = y || m || Function("return this")(),
				E = t && !t.nodeType && t,
				A = E && e && !e.nodeType && e,
				_ = A && A.exports === E,
				S = _ && y.process,
				C = function() {
					try {
						var e = A && A.require && A.require("util").types;
						return e || S && S.binding && S.binding("util")
					} catch (e) {}
				}(),
				$ = C && C.isTypedArray;
			var b, P, O, T = Array.prototype,
				v = Function.prototype,
				N = Object.prototype,
				R = I["__core-js_shared__"],
				D = v.toString,
				x = N.hasOwnProperty,
				w = (b = /[^.]+$/.exec(R && R.keys && R.keys.IE_PROTO || "")) ? "Symbol(src)_1." + b : "",
				M = N.toString,
				L = D.call(Object),
				j = RegExp("^" + D.call(x).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				U = _ ? I.Buffer : void 0,
				F = I.Symbol,
				k = I.Uint8Array,
				V = U ? U.allocUnsafe : void 0,
				G = (P = Object.getPrototypeOf, O = Object, function(e) {
					return P(O(e))
				}),
				B = Object.create,
				H = N.propertyIsEnumerable,
				W = T.splice,
				q = F ? F.toStringTag : void 0,
				z = function() {
					try {
						var e = Ee(Object, "defineProperty");
						return e({}, "", {}), e
					} catch (e) {}
				}(),
				Y = U ? U.isBuffer : void 0,
				K = Math.max,
				X = Date.now,
				J = Ee(I, "Map"),
				Q = Ee(Object, "create"),
				Z = function() {
					function e() {}
					return function(t) {
						if (!Re(t)) return {};
						if (B) return B(t);
						e.prototype = t;
						var n = new e;
						return e.prototype = void 0, n
					}
				}();

			function ee(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function te(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function ne(e) {
				var t = -1,
					n = null == e ? 0 : e.length;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function re(e) {
				var t = this.__data__ = new te(e);
				this.size = t.size
			}

			function ae(e, t) {
				var n = Pe(e),
					r = !n && be(e),
					a = !n && !r && Te(e),
					s = !n && !r && !a && xe(e),
					o = n || r || a || s,
					i = o ? function(e, t) {
						for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
						return r
					}(e.length, String) : [],
					c = i.length;
				for (var d in e) !t && !x.call(e, d) || o && ("length" == d || a && ("offset" == d || "parent" == d) || s && ("buffer" == d || "byteLength" == d || "byteOffset" == d) || Ae(d, c)) || i.push(d);
				return i
			}

			function se(e, t, n) {
				(void 0 !== n && !$e(e[t], n) || void 0 === n && !(t in e)) && ce(e, t, n)
			}

			function oe(e, t, n) {
				var r = e[t];
				x.call(e, t) && $e(r, n) && (void 0 !== n || t in e) || ce(e, t, n)
			}

			function ie(e, t) {
				for (var n = e.length; n--;)
					if ($e(e[n][0], t)) return n;
				return -1
			}

			function ce(e, t, n) {
				"__proto__" == t && z ? z(e, t, {
					configurable: !0,
					enumerable: !0,
					value: n,
					writable: !0
				}) : e[t] = n
			}
			ee.prototype.clear = function() {
				this.__data__ = Q ? Q(null) : {}, this.size = 0
			}, ee.prototype.delete = function(e) {
				var t = this.has(e) && delete this.__data__[e];
				return this.size -= t ? 1 : 0, t
			}, ee.prototype.get = function(e) {
				var t = this.__data__;
				if (Q) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return x.call(t, e) ? t[e] : void 0
			}, ee.prototype.has = function(e) {
				var t = this.__data__;
				return Q ? void 0 !== t[e] : x.call(t, e)
			}, ee.prototype.set = function(e, t) {
				var n = this.__data__;
				return this.size += this.has(e) ? 0 : 1, n[e] = Q && void 0 === t ? r : t, this
			}, te.prototype.clear = function() {
				this.__data__ = [], this.size = 0
			}, te.prototype.delete = function(e) {
				var t = this.__data__,
					n = ie(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : W.call(t, n, 1), --this.size, !0)
			}, te.prototype.get = function(e) {
				var t = this.__data__,
					n = ie(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, te.prototype.has = function(e) {
				return ie(this.__data__, e) > -1
			}, te.prototype.set = function(e, t) {
				var n = this.__data__,
					r = ie(n, e);
				return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this
			}, ne.prototype.clear = function() {
				this.size = 0, this.__data__ = {
					hash: new ee,
					map: new(J || te),
					string: new ee
				}
			}, ne.prototype.delete = function(e) {
				var t = Ie(this, e).delete(e);
				return this.size -= t ? 1 : 0, t
			}, ne.prototype.get = function(e) {
				return Ie(this, e).get(e)
			}, ne.prototype.has = function(e) {
				return Ie(this, e).has(e)
			}, ne.prototype.set = function(e, t) {
				var n = Ie(this, e),
					r = n.size;
				return n.set(e, t), this.size += n.size == r ? 0 : 1, this
			}, re.prototype.clear = function() {
				this.__data__ = new te, this.size = 0
			}, re.prototype.delete = function(e) {
				var t = this.__data__,
					n = t.delete(e);
				return this.size = t.size, n
			}, re.prototype.get = function(e) {
				return this.__data__.get(e)
			}, re.prototype.has = function(e) {
				return this.__data__.has(e)
			}, re.prototype.set = function(e, t) {
				var n = this.__data__;
				if (n instanceof te) {
					var r = n.__data__;
					if (!J || r.length < 199) return r.push([e, t]), this.size = ++n.size, this;
					n = this.__data__ = new ne(r)
				}
				return n.set(e, t), this.size = n.size, this
			};
			var de, le = function(e, t, n) {
				for (var r = -1, a = Object(e), s = n(e), o = s.length; o--;) {
					var i = s[de ? o : ++r];
					if (!1 === t(a[i], i, a)) break
				}
				return e
			};

			function ue(e) {
				return null == e ? void 0 === e ? p : d : q && q in Object(e) ? function(e) {
					var t = x.call(e, q),
						n = e[q];
					try {
						e[q] = void 0;
						var r = !0
					} catch (e) {}
					var a = M.call(e);
					r && (t ? e[q] = n : delete e[q]);
					return a
				}(e) : function(e) {
					return M.call(e)
				}(e)
			}

			function pe(e) {
				return De(e) && ue(e) == s
			}

			function he(e) {
				return !(!Re(e) || function(e) {
					return !!w && w in e
				}(e)) && (ve(e) ? j : h).test(function(e) {
					if (null != e) {
						try {
							return D.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function ge(e) {
				if (!Re(e)) return function(e) {
					var t = [];
					if (null != e)
						for (var n in Object(e)) t.push(n);
					return t
				}(e);
				var t = _e(e),
					n = [];
				for (var r in e)("constructor" != r || !t && x.call(e, r)) && n.push(r);
				return n
			}

			function fe(e, t, n, r, a) {
				e !== t && le(t, (function(s, o) {
					if (a || (a = new re), Re(s)) ! function(e, t, n, r, a, s, o) {
						var i = Se(e, n),
							c = Se(t, n),
							d = o.get(c);
						if (d) return void se(e, n, d);
						var u = s ? s(i, c, n + "", e, t, o) : void 0,
							p = void 0 === u;
						if (p) {
							var h = Pe(c),
								g = !h && Te(c),
								f = !h && !g && xe(c);
							u = c, h || g || f ? Pe(i) ? u = i : De(A = i) && Oe(A) ? u = function(e, t) {
								var n = -1,
									r = e.length;
								t || (t = Array(r));
								for (; ++n < r;) t[n] = e[n];
								return t
							}(i) : g ? (p = !1, u = function(e, t) {
								if (t) return e.slice();
								var n = e.length,
									r = V ? V(n) : new e.constructor(n);
								return e.copy(r), r
							}(c, !0)) : f ? (p = !1, y = c, m = !0 ? (I = y.buffer, E = new I.constructor(I.byteLength), new k(E).set(new k(I)), E) : y.buffer, u = new y.constructor(m, y.byteOffset, y.length)) : u = [] : function(e) {
								if (!De(e) || ue(e) != l) return !1;
								var t = G(e);
								if (null === t) return !0;
								var n = x.call(t, "constructor") && t.constructor;
								return "function" == typeof n && n instanceof n && D.call(n) == L
							}(c) || be(c) ? (u = i, be(i) ? u = function(e) {
								return function(e, t, n, r) {
									var a = !n;
									n || (n = {});
									var s = -1,
										o = t.length;
									for (; ++s < o;) {
										var i = t[s],
											c = r ? r(n[i], e[i], i, n, e) : void 0;
										void 0 === c && (c = e[i]), a ? ce(n, i, c) : oe(n, i, c)
									}
									return n
								}(e, we(e))
							}(i) : Re(i) && !ve(i) || (u = function(e) {
								return "function" != typeof e.constructor || _e(e) ? {} : Z(G(e))
							}(c))) : p = !1
						}
						var y, m, I, E;
						var A;
						p && (o.set(c, u), a(u, c, r, s, o), o.delete(c));
						se(e, n, u)
					}(e, t, o, n, fe, r, a);
					else {
						var i = r ? r(Se(e, o), s, o + "", e, t, a) : void 0;
						void 0 === i && (i = s), se(e, o, i)
					}
				}), we)
			}

			function ye(e, t) {
				return Ce(function(e, t, n) {
					return t = K(void 0 === t ? e.length - 1 : t, 0),
						function() {
							for (var r = arguments, a = -1, s = K(r.length - t, 0), o = Array(s); ++a < s;) o[a] = r[t + a];
							a = -1;
							for (var i = Array(t + 1); ++a < t;) i[a] = r[a];
							return i[t] = n(o),
								function(e, t, n) {
									switch (n.length) {
										case 0:
											return e.call(t);
										case 1:
											return e.call(t, n[0]);
										case 2:
											return e.call(t, n[0], n[1]);
										case 3:
											return e.call(t, n[0], n[1], n[2])
									}
									return e.apply(t, n)
								}(e, this, i)
						}
				}(e, t, je), e + "")
			}
			var me = z ? function(e, t) {
				return z(e, "toString", {
					configurable: !0,
					enumerable: !1,
					value: (n = t, function() {
						return n
					}),
					writable: !0
				});
				var n
			} : je;

			function Ie(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function Ee(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return he(n) ? n : void 0
			}

			function Ae(e, t) {
				var n = typeof e;
				return !!(t = null == t ? a : t) && ("number" == n || "symbol" != n && g.test(e)) && e > -1 && e % 1 == 0 && e < t
			}

			function _e(e) {
				var t = e && e.constructor;
				return e === ("function" == typeof t && t.prototype || N)
			}

			function Se(e, t) {
				if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t]
			}
			var Ce = function(e) {
				var t = 0,
					n = 0;
				return function() {
					var r = X(),
						a = 16 - (r - n);
					if (n = r, a > 0) {
						if (++t >= 800) return arguments[0]
					} else t = 0;
					return e.apply(void 0, arguments)
				}
			}(me);

			function $e(e, t) {
				return e === t || e != e && t != t
			}
			var be = pe(function() {
					return arguments
				}()) ? pe : function(e) {
					return De(e) && x.call(e, "callee") && !H.call(e, "callee")
				},
				Pe = Array.isArray;

			function Oe(e) {
				return null != e && Ne(e.length) && !ve(e)
			}
			var Te = Y || function() {
				return !1
			};

			function ve(e) {
				if (!Re(e)) return !1;
				var t = ue(e);
				return t == i || t == c || t == o || t == u
			}

			function Ne(e) {
				return "number" == typeof e && e > -1 && e % 1 == 0 && e <= a
			}

			function Re(e) {
				var t = typeof e;
				return null != e && ("object" == t || "function" == t)
			}

			function De(e) {
				return null != e && "object" == typeof e
			}
			var xe = $ ? function(e) {
				return function(t) {
					return e(t)
				}
			}($) : function(e) {
				return De(e) && Ne(e.length) && !!f[ue(e)]
			};

			function we(e) {
				return Oe(e) ? ae(e, !0) : ge(e)
			}
			var Me, Le = (Me = function(e, t, n, r) {
				fe(e, t, n, r)
			}, ye((function(e, t) {
				var n = -1,
					r = t.length,
					a = r > 1 ? t[r - 1] : void 0,
					s = r > 2 ? t[2] : void 0;
				for (a = Me.length > 3 && "function" == typeof a ? (r--, a) : void 0, s && function(e, t, n) {
						if (!Re(n)) return !1;
						var r = typeof t;
						return !!("number" == r ? Oe(n) && Ae(t, n.length) : "string" == r && t in n) && $e(n[t], e)
					}(t[0], t[1], s) && (a = r < 3 ? void 0 : a, r = 1), e = Object(e); ++n < r;) {
					var o = t[n];
					o && Me(e, o, n, a)
				}
				return e
			})));

			function je(e) {
				return e
			}
			e.exports = Le
		},
		476: (e, t, n) => {
			var r = "__lodash_hash_undefined__",
				a = 1 / 0,
				s = 9007199254740991,
				o = "[object Function]",
				i = "[object GeneratorFunction]",
				c = "[object Symbol]",
				d = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
				l = /^\w*$/,
				u = /^\./,
				p = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
				h = /\\(\\)?/g,
				g = /^\[object .+?Constructor\]$/,
				f = /^(?:0|[1-9]\d*)$/,
				y = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				m = "object" == typeof self && self && self.Object === Object && self,
				I = y || m || Function("return this")();
			var E, A = Array.prototype,
				_ = Function.prototype,
				S = Object.prototype,
				C = I["__core-js_shared__"],
				$ = (E = /[^.]+$/.exec(C && C.keys && C.keys.IE_PROTO || "")) ? "Symbol(src)_1." + E : "",
				b = _.toString,
				P = S.hasOwnProperty,
				O = S.toString,
				T = RegExp("^" + b.call(P).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				v = I.Symbol,
				N = A.splice,
				R = B(I, "Map"),
				D = B(Object, "create"),
				x = v ? v.prototype : void 0,
				w = x ? x.toString : void 0;

			function M(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function L(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function j(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function U(e, t, n) {
				var r = e[t];
				P.call(e, t) && Y(r, n) && (void 0 !== n || t in e) || (e[t] = n)
			}

			function F(e, t) {
				for (var n = e.length; n--;)
					if (Y(e[n][0], t)) return n;
				return -1
			}

			function k(e) {
				if (!X(e) || (t = e, $ && $ in t)) return !1;
				var t, n = function(e) {
					var t = X(e) ? O.call(e) : "";
					return t == o || t == i
				}(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? T : g;
				return n.test(function(e) {
					if (null != e) {
						try {
							return b.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function V(e, t, n, r) {
				if (!X(e)) return e;
				t = function(e, t) {
					if (K(e)) return !1;
					var n = typeof e;
					if ("number" == n || "symbol" == n || "boolean" == n || null == e || J(e)) return !0;
					return l.test(e) || !d.test(e) || null != t && e in Object(t)
				}(t, e) ? [t] : function(e) {
					return K(e) ? e : W(e)
				}(t);
				for (var a = -1, s = t.length, o = s - 1, i = e; null != i && ++a < s;) {
					var c = q(t[a]),
						u = n;
					if (a != o) {
						var p = i[c];
						void 0 === (u = r ? r(p, c, i) : void 0) && (u = X(p) ? p : H(t[a + 1]) ? [] : {})
					}
					U(i, c, u), i = i[c]
				}
				return e
			}

			function G(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function B(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return k(n) ? n : void 0
			}

			function H(e, t) {
				return !!(t = null == t ? s : t) && ("number" == typeof e || f.test(e)) && e > -1 && e % 1 == 0 && e < t
			}
			M.prototype.clear = function() {
				this.__data__ = D ? D(null) : {}
			}, M.prototype.delete = function(e) {
				return this.has(e) && delete this.__data__[e]
			}, M.prototype.get = function(e) {
				var t = this.__data__;
				if (D) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return P.call(t, e) ? t[e] : void 0
			}, M.prototype.has = function(e) {
				var t = this.__data__;
				return D ? void 0 !== t[e] : P.call(t, e)
			}, M.prototype.set = function(e, t) {
				return this.__data__[e] = D && void 0 === t ? r : t, this
			}, L.prototype.clear = function() {
				this.__data__ = []
			}, L.prototype.delete = function(e) {
				var t = this.__data__,
					n = F(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : N.call(t, n, 1), !0)
			}, L.prototype.get = function(e) {
				var t = this.__data__,
					n = F(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, L.prototype.has = function(e) {
				return F(this.__data__, e) > -1
			}, L.prototype.set = function(e, t) {
				var n = this.__data__,
					r = F(n, e);
				return r < 0 ? n.push([e, t]) : n[r][1] = t, this
			}, j.prototype.clear = function() {
				this.__data__ = {
					hash: new M,
					map: new(R || L),
					string: new M
				}
			}, j.prototype.delete = function(e) {
				return G(this, e).delete(e)
			}, j.prototype.get = function(e) {
				return G(this, e).get(e)
			}, j.prototype.has = function(e) {
				return G(this, e).has(e)
			}, j.prototype.set = function(e, t) {
				return G(this, e).set(e, t), this
			};
			var W = z((function(e) {
				var t;
				e = null == (t = e) ? "" : function(e) {
					if ("string" == typeof e) return e;
					if (J(e)) return w ? w.call(e) : "";
					var t = e + "";
					return "0" == t && 1 / e == -a ? "-0" : t
				}(t);
				var n = [];
				return u.test(e) && n.push(""), e.replace(p, (function(e, t, r, a) {
					n.push(r ? a.replace(h, "$1") : t || e)
				})), n
			}));

			function q(e) {
				if ("string" == typeof e || J(e)) return e;
				var t = e + "";
				return "0" == t && 1 / e == -a ? "-0" : t
			}

			function z(e, t) {
				if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
				var n = function() {
					var r = arguments,
						a = t ? t.apply(this, r) : r[0],
						s = n.cache;
					if (s.has(a)) return s.get(a);
					var o = e.apply(this, r);
					return n.cache = s.set(a, o), o
				};
				return n.cache = new(z.Cache || j), n
			}

			function Y(e, t) {
				return e === t || e != e && t != t
			}
			z.Cache = j;
			var K = Array.isArray;

			function X(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}

			function J(e) {
				return "symbol" == typeof e || function(e) {
					return !!e && "object" == typeof e
				}(e) && O.call(e) == c
			}
			e.exports = function(e, t, n) {
				return null == e ? e : V(e, t, n)
			}
		},
		748: (e, t, n) => {
			var r = "__lodash_hash_undefined__",
				a = 1 / 0,
				s = "[object Function]",
				o = "[object GeneratorFunction]",
				i = "[object Symbol]",
				c = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
				d = /^\w*$/,
				l = /^\./,
				u = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
				p = /\\(\\)?/g,
				h = /^\[object .+?Constructor\]$/,
				g = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
				f = "object" == typeof self && self && self.Object === Object && self,
				y = g || f || Function("return this")();
			var m, I = Array.prototype,
				E = Function.prototype,
				A = Object.prototype,
				_ = y["__core-js_shared__"],
				S = (m = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "")) ? "Symbol(src)_1." + m : "",
				C = E.toString,
				$ = A.hasOwnProperty,
				b = A.toString,
				P = RegExp("^" + C.call($).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
				O = y.Symbol,
				T = I.splice,
				v = V(y, "Map"),
				N = V(Object, "create"),
				R = O ? O.prototype : void 0,
				D = R ? R.toString : void 0;

			function x(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function w(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function M(e) {
				var t = -1,
					n = e ? e.length : 0;
				for (this.clear(); ++t < n;) {
					var r = e[t];
					this.set(r[0], r[1])
				}
			}

			function L(e, t) {
				for (var n, r, a = e.length; a--;)
					if ((n = e[a][0]) === (r = t) || n != n && r != r) return a;
				return -1
			}

			function j(e) {
				if (!z(e) || (t = e, S && S in t)) return !1;
				var t, n = function(e) {
					var t = z(e) ? b.call(e) : "";
					return t == s || t == o
				}(e) || function(e) {
					var t = !1;
					if (null != e && "function" != typeof e.toString) try {
						t = !!(e + "")
					} catch (e) {}
					return t
				}(e) ? P : h;
				return n.test(function(e) {
					if (null != e) {
						try {
							return C.call(e)
						} catch (e) {}
						try {
							return e + ""
						} catch (e) {}
					}
					return ""
				}(e))
			}

			function U(e, t) {
				e = function(e, t) {
					return 1 == t.length ? e : function(e, t) {
						for (var n = 0, r = (t = G(t, e) ? [t] : F(t)).length; null != e && n < r;) e = e[H(t[n++])];
						return n && n == r ? e : void 0
					}(e, function(e, t, n) {
						var r = -1,
							a = e.length;
						t < 0 && (t = -t > a ? 0 : a + t), (n = n > a ? a : n) < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
						for (var s = Array(a); ++r < a;) s[r] = e[r + t];
						return s
					}(t, 0, -1))
				}(e, t = G(t, e) ? [t] : F(t));
				var n, r, a = H((r = (n = t) ? n.length : 0) ? n[r - 1] : void 0);
				return !(null != e && $.call(e, a)) || delete e[a]
			}

			function F(e) {
				return q(e) ? e : B(e)
			}

			function k(e, t) {
				var n, r, a = e.__data__;
				return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? a["string" == typeof t ? "string" : "hash"] : a.map
			}

			function V(e, t) {
				var n = function(e, t) {
					return null == e ? void 0 : e[t]
				}(e, t);
				return j(n) ? n : void 0
			}

			function G(e, t) {
				if (q(e)) return !1;
				var n = typeof e;
				return !("number" != n && "symbol" != n && "boolean" != n && null != e && !Y(e)) || (d.test(e) || !c.test(e) || null != t && e in Object(t))
			}
			x.prototype.clear = function() {
				this.__data__ = N ? N(null) : {}
			}, x.prototype.delete = function(e) {
				return this.has(e) && delete this.__data__[e]
			}, x.prototype.get = function(e) {
				var t = this.__data__;
				if (N) {
					var n = t[e];
					return n === r ? void 0 : n
				}
				return $.call(t, e) ? t[e] : void 0
			}, x.prototype.has = function(e) {
				var t = this.__data__;
				return N ? void 0 !== t[e] : $.call(t, e)
			}, x.prototype.set = function(e, t) {
				return this.__data__[e] = N && void 0 === t ? r : t, this
			}, w.prototype.clear = function() {
				this.__data__ = []
			}, w.prototype.delete = function(e) {
				var t = this.__data__,
					n = L(t, e);
				return !(n < 0) && (n == t.length - 1 ? t.pop() : T.call(t, n, 1), !0)
			}, w.prototype.get = function(e) {
				var t = this.__data__,
					n = L(t, e);
				return n < 0 ? void 0 : t[n][1]
			}, w.prototype.has = function(e) {
				return L(this.__data__, e) > -1
			}, w.prototype.set = function(e, t) {
				var n = this.__data__,
					r = L(n, e);
				return r < 0 ? n.push([e, t]) : n[r][1] = t, this
			}, M.prototype.clear = function() {
				this.__data__ = {
					hash: new x,
					map: new(v || w),
					string: new x
				}
			}, M.prototype.delete = function(e) {
				return k(this, e).delete(e)
			}, M.prototype.get = function(e) {
				return k(this, e).get(e)
			}, M.prototype.has = function(e) {
				return k(this, e).has(e)
			}, M.prototype.set = function(e, t) {
				return k(this, e).set(e, t), this
			};
			var B = W((function(e) {
				var t;
				e = null == (t = e) ? "" : function(e) {
					if ("string" == typeof e) return e;
					if (Y(e)) return D ? D.call(e) : "";
					var t = e + "";
					return "0" == t && 1 / e == -a ? "-0" : t
				}(t);
				var n = [];
				return l.test(e) && n.push(""), e.replace(u, (function(e, t, r, a) {
					n.push(r ? a.replace(p, "$1") : t || e)
				})), n
			}));

			function H(e) {
				if ("string" == typeof e || Y(e)) return e;
				var t = e + "";
				return "0" == t && 1 / e == -a ? "-0" : t
			}

			function W(e, t) {
				if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
				var n = function() {
					var r = arguments,
						a = t ? t.apply(this, r) : r[0],
						s = n.cache;
					if (s.has(a)) return s.get(a);
					var o = e.apply(this, r);
					return n.cache = s.set(a, o), o
				};
				return n.cache = new(W.Cache || M), n
			}
			W.Cache = M;
			var q = Array.isArray;

			function z(e) {
				var t = typeof e;
				return !!e && ("object" == t || "function" == t)
			}

			function Y(e) {
				return "symbol" == typeof e || function(e) {
					return !!e && "object" == typeof e
				}(e) && b.call(e) == i
			}
			e.exports = function(e, t) {
				return null == e || U(e, t)
			}
		},
		607: e => {
			class t {
				constructor(e, t, n, r, a) {
					this.converter = c(), this.width = e, this.poly = t, this.xor_in = n, this.reflected_xor_in = d(n, e), this.xor_out = r, this.reflect = a, this.msb_mask = 1 << this.width - 1, this.mask = this.msb_mask - 1 << 1 | 1, this.crc_shift = this.width < 8 ? 8 - this.width : 0, this.shifted_xor_in = this.xor_in << this.crc_shift;
					let s = this.gen_table();
					this.table = s, 8 !== this.width || this.xor_in || this.xor_out || this.reflect || (this.calculate = function(e) {
						e = this.converter.validate_buffer(e);
						let t = 0;
						for (let n = 0; n < e.length; n++) t = s[t ^ e[n]];
						return t
					})
				}
				calculate(e) {
					let t;
					e = this.converter.validate_buffer(e);
					let {
						table: n,
						width: r,
						crc_shift: a,
						mask: s
					} = this;
					if (this.reflect) {
						t = this.reflected_xor_in;
						for (let r = 0; r < e.length; r++) {
							t = (n[255 & (t ^ e[r])] ^ t >>> 8) & s
						}
					} else {
						t = this.shifted_xor_in;
						for (let o = 0; o < e.length; o++) t = n[255 & (t >> r - 8 + a ^ e[o])] << a ^ t << 8 - a & s << a;
						t >>= a
					}
					return t ^= this.xor_out, t >>> 0
				}
				calculate_no_table(e) {
					e = this.converter.validate_buffer(e);
					let t = this.xor_in;
					for (let n = 0; n < e.length; n++) {
						let r = e[n];
						this.reflect && (r = d(r, 8));
						for (let e = 0; e < 8; e++) {
							let n = t & this.msb_mask;
							r & 128 >> e && (n ^= this.msb_mask), t <<= 1, n && (t ^= this.poly)
						}
						t &= this.mask
					}
					return this.reflect && (t = d(t, this.width)), t ^= this.xor_out, t >>> 0
				}
				gen_table() {
					let e = [];
					for (let t = 0; t < 256; t++) {
						let n = t;
						this.reflect && (n = d(n, 8)), n <<= this.width - 8 + this.crc_shift;
						for (let e = 0; e < 8; e++) 0 != (n & this.msb_mask << this.crc_shift) ? (n <<= 1, n ^= this.poly << this.crc_shift) : n <<= 1;
						this.reflect && (n = d(n >> this.crc_shift, this.width) << this.crc_shift), n = n >> this.crc_shift & this.mask, e[t] = n >>> 0
					}
					return new Int32Array(e)
				}
				print_table() {
					let e = this.table,
						t = Math.ceil(this.width / 4),
						n = t < 4 ? 4 : 3,
						r = e.length >> n,
						a = 1 << n,
						s = "";
					for (let o = 0; o < r; o++) {
						let r = "";
						for (let s = 0; s < a; s++) {
							let a = e[o << n | s];
							a = "000000000" + a.toString(16), a = a.substr(a.length - t), r += "0x" + a + ", "
						}
						s += "  " + r + "\n"
					}
					return s = "[\n" + s.slice(0, -3) + "\n]", s
				}
			}
			const n = "undefined" != typeof Buffer,
				r = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array,
				a = void 0 !== typeof BigInt && BigInt(256);
			class s {
				validate_buffer(e) {
					switch (typeof e) {
						case "number": {
							if (!Number.isSafeInteger(e) || e < 0) throw Error(`number data must be a nonnegative safe integer, not ${e}`);
							if (this.fromUInt32 && e <= 4294967295) return this.fromUInt32(e);
							const t = [];
							for (; e > 0 || t.length < 4;) t.unshift(e % 256), e = Math.floor(e / 256);
							return this.fromByteArray(t)
						}
						case "string":
							return this.fromString(e);
						case "bigint": {
							if (e < 0) throw Error(`bigint data must be nonnegative, not ${e}`);
							const t = [];
							for (; e > 0 || t.length < 4;) t.unshift(Number(e % a)), e /= a;
							return this.fromByteArray(t)
						}
						default:
							if (n && Buffer.isBuffer(e)) return e;
							if (r) {
								if (ArrayBuffer.isView(e)) return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
								if (e instanceof ArrayBuffer) return new Uint8Array(e)
							}
							throw new Error(`Unrecognized data type ${typeof e}: ${e}`)
					}
				}
			}
			class o extends s {
				fromUInt32(e) {
					const t = Buffer.alloc(4);
					return t.writeUInt32BE(e), t
				}
				fromByteArray = Buffer.from.bind(Buffer);
				fromString = Buffer.from.bind(Buffer)
			}
			class i extends s {
				fromByteArray = Uint8Array.from.bind(Uint8Array);
				fromString(e) {
					return new TextEncoder("utf-8").encode(e)
				}
			}

			function c(e = !1) {
				if (r && (e || !n)) return new i;
				if (n) return new o;
				throw Error("either need TypedArrays or Buffer")
			}

			function d(e, t) {
				let n = 0;
				for (let r = 0; r < t; r++) n = n << 1 | 1 & e, e >>= 1;
				return n
			}
			const l = {
				crc1: new t(1, 1, 0, 0, !1),
				crc6: new t(6, 47, 0, 0, !1),
				crc8: new t(8, 7, 0, 0, !1),
				crc10: new t(10, 563, 0, 0, !1),
				crc16: new t(16, 32773, 0, 0, !0),
				crc24: new t(24, 8801531, 11994318, 0, !1),
				crc32: new t(32, 79764919, 4294967295, 4294967295, !0),
				crc32c: new t(32, 517762881, 4294967295, 4294967295, !0)
			};

			function u(e) {}
			e.exports = {
				CRC: t,
				crc: function(e, n, r, a, s) {
					let o = new t(e, n, r, a, s);
					return o.calculate.bind(o)
				},
				makeBufferConverter: c,
				models: l,
				crc1: u,
				crc6: u,
				crc8: u,
				crc10: u,
				crc16: u,
				crc24: u,
				crc32: u,
				crc32c: u
			};
			for (let t in l) {
				let n = l[t];
				e.exports[t] = n.calculate.bind(n)
			}
		}
	},
	t = {};

function n(r) {
	var a = t[r];
	if (void 0 !== a) return a.exports;
	var s = t[r] = {
		id: r,
		loaded: !1,
		exports: {}
	};
	return e[r](s, s.exports, n), s.loaded = !0, s.exports
}
n.n = e => {
	var t = e && e.__esModule ? () => e.default : () => e;
	return n.d(t, {
		a: t
	}), t
}, n.d = (e, t) => {
	for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
		enumerable: !0,
		get: t[r]
	})
}, n.g = function() {
	if ("object" == typeof globalThis) return globalThis;
	try {
		return this || new Function("return this")()
	} catch (e) {
		if ("object" == typeof window) return window
	}
}(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => {
	"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
		value: "Module"
	}), Object.defineProperty(e, "__esModule", {
		value: !0
	})
}, n.nmd = e => (e.paths = [], e.children || (e.children = []), e);
var r = {};
(() => {
	n.d(r, {
		Z: () => o_
	});
	var e = {};
	n.r(e), n.d(e, {
		buildContextName: () => Ee,
		buildModalContext: () => Ce,
		buildTransientContextName: () => Ae,
		getContainerIdFromContext: () => be,
		getParentContext: () => $e,
		getParentContextName: () => Ie,
		getTargetFromContext: () => Se,
		getTransientContext: () => _e
	});
	var t = {};
	n.r(t), n.d(t, {
		getResolvedTargetName: () => Ft,
		getRoutingInfo: () => kt,
		getSemanticURLFromRoutingInfo: () => Vt
	});
	var a = {};
	n.r(a), n.d(a, {
		evaluate: () => In,
		handleChange: () => yn,
		hasDeclareExpression: () => fn,
		updateDeclareExpressions: () => mn
	});
	var s = {};
	n.r(s), n.d(s, {
		publishExpressions: () => Ea,
		publishResponse: () => Aa
	});
	var o = {};
	n.r(o), n.d(o, {
		CONTAINER_NAMES: () => $s,
		CONTAINER_TYPES: () => Cs,
		addRootContainerItem: () => to,
		areContainerItemsPresent: () => Ns,
		clearTransientData: () => so,
		closeContainerItem: () => eo,
		getActiveContainerItemContext: () => Fs,
		getActiveContainerItemIDFromRoutingInfo: () => Io,
		getActiveContainerItemName: () => Ms,
		getActiveContext: () => go,
		getChildContainerItems: () => ks,
		getChildContainers: () => Vs,
		getChildContainersContexts: () => Gs,
		getContainerAPI: () => co,
		getContainerAccessOrder: () => vs,
		getContainerData: () => Ps,
		getContainerItemData: () => Os,
		getContainerItemName: () => Ds,
		getContainerItems: () => Ts,
		getContainerLimit: () => zs,
		getContainerParentContext: () => mo,
		getContainerType: () => ws,
		getContextByTargetAndKey: () => yo,
		getDataContextName: () => Us,
		getFlowContainer: () => Eo,
		getLeastRecentlyUsedNonDirtyContainerItemID: () => Qs,
		getRootContainerName: () => ho,
		getSuggestionContexts: () => Bs,
		getTargetFromContainerItemID: () => Zs,
		getTransientItems: () => ao,
		hasContainerItems: () => qs,
		isContainerDirty: () => Js,
		isContainerInitialized: () => xs,
		isContainerItemActive: () => Ls,
		isContainerItemContextBeingUsedInOtherContainers: () => ro,
		isContainerItemExists: () => Rs,
		isContainerLimitReached: () => Ks,
		isContainerMultipleMode: () => Ws,
		isContainerSingleMode: () => Hs,
		purgeTransientData: () => oo,
		removeContainer: () => lo,
		resetContainersPayload: () => Xs,
		setContainerLimit: () => Ys,
		updateCaseContextEtag: () => po,
		updateParentLastUpdateTime: () => fo,
		updateRelatedContextEtag: () => uo
	});
	var i = {};
	n.r(i), n.d(i, {
		hasBrowserEnv: () => Ni,
		hasStandardBrowserEnv: () => Di,
		hasStandardBrowserWebWorkerEnv: () => xi,
		navigator: () => Ri,
		origin: () => wi
	});
	var c = {};
	n.r(c), n.d(c, {
		getAdditionalInfo: () => Ju,
		getDataPageKeys: () => Yu,
		getDataPageMetadata: () => Vu,
		getEmbeddedPropertyMetadata: () => Mu,
		getFieldParameters: () => Wu,
		getFieldsByClassName: () => Hu,
		getInsight: () => Bu,
		getLookUpDataPage: () => Ku,
		getLookUpDataPageInfo: () => Xu,
		getParagraph: () => qu,
		getPersonalizationMetadata: () => Gu,
		getPropertyMetadata: () => wu,
		getResolvedFieldMetadata: () => Qu,
		getSavableDataPage: () => zu,
		mergeStore: () => xu,
		resolveNavigation: () => ku,
		resolveView: () => Fu,
		updateNavigationStore: () => ju,
		updateStores: () => Uu,
		updateViewStore: () => Lu
	});
	var d = {};
	n.r(d), n.d(d, {
		dispatch: () => op,
		getActionType: () => hp,
		getContextValue: () => up,
		getDataObject: () => ip,
		getReferenceTokens: () => rp,
		getSharedDataObject: () => cp,
		getStore: () => sp,
		getValue: () => lp,
		isMergeable: () => fp,
		lookupContextValue: () => pp,
		mergeDeep: () => yp,
		removeItem: () => gp,
		replaceValue: () => Ip,
		resetStore: () => Ep,
		setStore: () => ap,
		updateValue: () => mp
	});
	var l = {};
	n.r(l), n.d(l, {
		activateContainerItem: () => Wp,
		addContainerItem: () => Up,
		addMessages: () => qp,
		addSharedData: () => nh,
		addTransientItem: () => Fp,
		addWork: () => wp,
		clearTransientData: () => Vp,
		createWork: () => Tp,
		error: () => th,
		finishAssignment: () => Jp,
		initContainers: () => Lp,
		listAction: () => ah,
		loadView: () => Dp,
		mergeData: () => Np,
		openAssignment: () => Qp,
		openWorkByHandle: () => Mp,
		postProcess: () => eh,
		purgeTransientData: () => Gp,
		removeAllTransientItems: () => Yp,
		removeContainerItem: () => zp,
		removeSharedData: () => rh,
		removeTransientItem: () => Kp,
		replaceContainerItem: () => Xp,
		resetContainers: () => jp,
		setSharedProperty: () => oh,
		setStateProperty: () => ih,
		showCasePreview: () => sh,
		showHarness: () => Rp,
		showHistory: () => Zp,
		showPage: () => xp,
		upMergeAndRemoveContainerItem: () => Hp,
		updateContainerItem: () => Bp,
		updateTransientData: () => kp
	});
	var u = {};
	n.r(u), n.d(u, {
		doesRestApiExist: () => Gf,
		getCancelTokenSource: () => Bf,
		getCaseApi: () => qf,
		getHeaderProcessor: () => Ff,
		invokeCustomRestApi: () => Vf,
		invokeRestApi: () => kf,
		isRequestCanceled: () => Hf,
		registerInterceptor: () => Wf
	});
	var p = {};
	n.r(p), n.d(p, {
		fetchViewResources: () => II,
		updateViewResources: () => mI
	});
	var h = n(729),
		g = n.n(h);
	let f, y, m;
	const I = e => {
			e && (f = e = e || {
				"base-server": "http://localhost:1080/prweb/",
				"data-end-point": "api/v1/stream/data",
				"action-end-point": "api/v1/stream/action"
			}, f.BASEURL = e.server, f.ACTIONURL = e["action-end-point"], f.DATAURL = e["data-end-point"], m = e.reAuthUrl)
		},
		E = () => m,
		A = () => f.BASEURL,
		_ = e => fetch(f.BASEURL + f.ACTIONURL, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(e)
		}),
		S = e => {
			y = e
		},
		C = () => y;
	var $ = n(607),
		b = n(748),
		P = n.n(b),
		O = n(163),
		T = n.n(O),
		v = n(399),
		N = n.n(v),
		R = n(476),
		D = n.n(R),
		x = n(678),
		w = n.n(x),
		M = n(353),
		L = n.n(M);
	const j = {
		randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
	};
	let U;
	const F = new Uint8Array(16);

	function k() {
		if (!U && (U = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !U)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
		return U(F)
	}
	const V = [];
	for (let e = 0; e < 256; ++e) V.push((e + 256).toString(16).slice(1));

	function G(e, t = 0) {
		return V[e[t + 0]] + V[e[t + 1]] + V[e[t + 2]] + V[e[t + 3]] + "-" + V[e[t + 4]] + V[e[t + 5]] + "-" + V[e[t + 6]] + V[e[t + 7]] + "-" + V[e[t + 8]] + V[e[t + 9]] + "-" + V[e[t + 10]] + V[e[t + 11]] + V[e[t + 12]] + V[e[t + 13]] + V[e[t + 14]] + V[e[t + 15]]
	}
	const B = function(e, t, n) {
			if (j.randomUUID && !t && !e) return j.randomUUID();
			const r = (e = e || {}).random || (e.rng || k)();
			if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
				n = n || 0;
				for (let e = 0; e < 16; ++e) t[n + e] = r[e];
				return t
			}
			return G(r)
		},
		H = {
			APP: {
				APP: "app",
				ROOT: "root",
				PXREQUESTOR: "pxRequestor",
				PXUSERNAME: ".pxUserName",
				OPERATORID: "OperatorID",
				USERNAME: "pxRequestor.pxUserName",
				PXUSERIDENTIFIER: ".pxUserIdentifier",
				USERIDENTIFIER: "pxRequestor.pxUserIdentifier",
				PYIMAGEINSKEY: ".pyImageInsKey",
				OPERATORID_IMG_INSKEY: "OperatorID.pyImageInsKey",
				OPERATORID_LOCALE: "OperatorID.pyUseLocale",
				APPLICATION_LABEL: "Application.pyLabel",
				APPLICATION_RULE_NAME: "Application.pyRuleName"
			},
			RESOURCE_TYPES: {
				ASSIGNMENT: "ASSIGNMENT",
				CASE: "CASE",
				DATA: "DATA",
				PAGE: "PAGE"
			},
			RESOURCE_STATUS: {
				CREATE: "CREATE",
				UPDATE: "UPDATE"
			},
			VIEW_NAMES: {
				PY_CASE_TAB: "pyCaseTab",
				DATA_OBJECT_CREATE_VIEW: "Create",
				DATA_OBJECT_EDIT_VIEW: "pyEdit"
			},
			WORK_BASKET: {
				MY_WORK_LIST: "myWorkList",
				REPORTEE: "reportee",
				WORK_QUEUE: "workQueue",
				DATA_PAGES: {
					D__PY_GET_USER_WORK_LIST_BY_USER_ID: "D_pyGetUserWorkListByUserId",
					D__WORK_BASKET: "D_WorkBasket",
					D__PY_MY_WORK_LIST: "D_pyMyWorkList"
				}
			},
			WORKLIST: "worklist",
			WAIT: "wait",
			TODO: "todo",
			STANDARD_FLOW: "Standard",
			CASE: "CASE",
			ASSIGNMENT: "ASSIGNMENT",
			FIX_BROKEN_ASSIGNMENTS: "FixBrokenAssignments",
			PAGE: "PAGE",
			PZINSKEY: ".pzInsKey",
			CREATE_DETAILS_VIEW_NAME: "pzCreateDetails",
			PREVIEW_VIEW_NAME: "pyCasePreview",
			APPSHELL_ACTIVE_CASES: "appshell-activecases",
			TRACE_ID: "x-b3-traceid",
			LOAD_VIEW_STRING: "View",
			PRIMARY: "primary",
			NEXT_ASSIGNMENT_INFO_ID: "nextAssignmentInfo.ID",
			WORKCLASS: "Work-",
			DATA_INFO: {
				DATA_INFO_CONTENT: "dataInfo.content"
			},
			CASE_INFO: {
				CASE_INFO: "caseInfo",
				CASE_INFO_CONTENT: "caseInfo.content",
				CASE_INFO_NAME: "caseInfo.name",
				CASE_INFO_ID: "caseInfo.ID",
				CASE_INFO_CLASSID: "caseInfo.content.classID",
				CASE_TYPE_ID: "caseInfo.caseTypeID",
				CASE_TYPE_NAME: "caseInfo.caseTypeName",
				CASE_INFO_PZINSKEY: "caseInfo.content.pzInsKey",
				CASE_INFO_ACTIONS: "caseInfo.availableActions",
				VIEW_NAME: "caseInfo.content.pyViewName",
				ACTION_BUTTONS: "caseInfo.actionButtons",
				ACTIVE_ACTION_ID: "caseInfo.activeActionID",
				ASSIGNMENT_LABEL: "caseInfo.assignments[0].name",
				ASSIGNMENT_ID: "caseInfo.assignments[0].ID",
				ASSIGNMENTS: "caseInfo.assignments",
				INSTRUCTIONS: "caseInfo.assignments[0].instructions",
				NAVIGATION: "caseInfo.navigation",
				STAGES: "caseInfo.stages",
				STAGEID: "caseInfo.stageID",
				CASECLASS: "caseInfo.caseClass",
				AVAILABLEACTIONS: "caseInfo.availableActions",
				AVAILABLEPROCESSES: "caseInfo.availableProcesses",
				D_CASE_ASSIGNMENTS_RESULTS: "caseInfo.assignments",
				CHILD_ASSIGNMENTS: "caseInfo.childCases",
				ASSIGNMENTACTION_ID: "caseInfo.assignments[0].actions[0].ID",
				ISINCREATESTAGE: "caseInfo.isInCreateStage",
				APPROVALFLAG: "caseInfo.content.pyApprovalResult",
				DUPLICATECASEFLAG: "caseInfo.content.pyDuplicateCaseActions",
				DUPLICATECASEID: "caseInfo.content.pyDuplicateID",
				DUPLICATECASEINSKEY: "caseInfo.content.pyDuplicateCaseReference.pzInsKey",
				HEADERS: "caseInfo.headers",
				PARENTCASEINFO: "caseInfo.parentCaseInfo",
				REMOTESYSTEMID: "caseInfo.headers.RemoteSystemID",
				CASE_RELATED_CASE_TYPES: "caseInfo.relatedCaseTypes",
				CASES: "caseInfo.cases",
				GETNEXTWORK: "caseInfo.confirmationLinks.getNextWork",
				ACTION_REFRESH_CONDITIONS: "caseInfo.assignments[0].actions[0].refreshConditions",
				IS_LOCAL_ACTION: "caseInfo.isLocalAction",
				BUSINESS_ID: "caseInfo.businessID"
			},
			ACTIONS: {
				ACTION_ID: "actionID",
				ACTIONS: "availableActions",
				DELETEAVIALACTIONS: "deleteAvailActions",
				FLOWACTION: "FlowAction",
				DATA_PAGES: {
					D_PY_ADDITIONAL_CASE_ACTIONS: "D_pyAdditionalCaseActions"
				}
			},
			PROCESS: {
				FLOWPROBLEMS: "FlowProblems"
			},
			PAGE_TYPES: {
				PAGE: "page",
				LANDINGPAGE: "landingpage",
				LISTPAGE: "listpage"
			},
			LOCAL_ACTION_TYPE: {
				CASE_WIDE: "case",
				EXPRESS: "express",
				ASSIGMENT: "Assignment",
				LOCAL_ACTION: "LocalAction"
			},
			LOCAL_ACTIONS: {
				TRANSFER_ASSIGNMENT: "pyTransferAssignment"
			},
			CONTENT: "content",
			MODAL: "modal",
			STOPMERGEACTIONS: "stopMergeActions",
			IS_CREATE_DATA_OBJECT: "isCreateDataObject",
			SUMMARY_OF_ASSIGNMENT_LAST_SUBMIT_TIME: "context_data.caseInfo.content.summary_of_assignment__.lastSubmitTime",
			SUMMARY_OF_ATTACHMENTS_LAST_REFRESH_TIME: "context_data.caseInfo.content.summary_of_attachments__.lastRefreshTime",
			CONTEXT_DATA_ASSIGNMENTID: "context_data.assignmentID",
			BANNER_VARIANT_SUCCESS: "success",
			BANNER_VARIANT_WARNING: "warning",
			BANNER_VARIANT_URGENT: "urgent",
			BANNER_VARIANT_INFO: "info",
			MESSAGES: {
				MESSAGES_TYPE_SUCCESS: "success",
				MESSAGES_TYPE_INFO: "info",
				MESSAGES_TYPE_ERROR: "error"
			},
			PUB_SUB_EVENTS: {
				EVENT_RENDER_APP: "renderApp",
				EVENT_REAUTH: "reAuth",
				EVENT_FULL_REAUTH: "fullReAuth",
				EVENT_CUSTOM_REAUTH: "customReAuth",
				EVENT_CANCEL: "cancel",
				EVENT_MINIMIZE: "minimize",
				EVENT_EXPRESS_LOCALACTION: "expressLocalActionSubmit",
				EVENT_BULKACTION: "bulkActionSubmit",
				EVENT_SHOW_CANCEL_ALERT: "showCancelAlert",
				EVENT_SHOW_DELETE_ALERT: "showDeleteAlert",
				EVENT_DASHBOARD_FILTER_CHANGE: "dashboardFilterChange",
				EVENT_DASHBOARD_FILTER_CLEAR_ALL: "dashboardFilterClearAll",
				EVENT_PROMOTED_FILTERS_CHANGE: "promotedFiltersChange",
				EVENT_LOGOFF: "Logoff",
				EVENT_TRANSIENT_ITEMS: {
					UPDATE_PROMOTED_FILTERS: "updatePromotedFilters"
				},
				UI_EVENTS: {
					SHOW_PAGE_INIT: "showPageInit",
					SHOW_PAGE_DONE: "showPageDone"
				},
				CASE_EVENTS: {
					CASE_ATTACHMENTS_UPDATED_FROM_CASEVIEW: "caseAttachmentsUpdateFromCaseview",
					CASE_FOLLOWER_UPDATED_BY_OPERATOR_FROM_CASEVIEW: "caseFollowerUpdateByOperatorFromCaseview",
					CASE_FOLLOWER_UPDATE_BY_OPERATOR_FROM_WIDGET: "caseFollowerUpdateByOperatorFromWidget",
					CASE_CREATED: "caseCreated",
					CREATE_STAGE_DONE: "caseCreatedDone",
					CREATE_STAGE_CANCELLED: "caseCancelled",
					CREATE_STAGE_SAVED: "caseSaved",
					CREATE_STAGE_DELETED: "caseDeleted",
					ASSIGNMENT_SUBMISSION: "assignmentSubmission",
					END_OF_ASSIGNMENT_PROCESSING: "endOfAssignmentProcessing",
					CLOSE_CONFIRM_VIEW: "closeConfirmView",
					CASE_OPENED: "caseOpened",
					CASE_CLOSED: "caseClosed",
					ASSIGNMENT_OPENED: "assignmentOpened",
					CASE_PREVIEW: "casePreview",
					CURRENT_ASSIGNMENT_UPDATED: "currentAssignmentUpdated",
					CASE_LOCK_EVENT: "caseLockEvent"
				},
				BOOTSTRAP_SHELL_EVENTS: {
					CONSTELLATION_LOADED: "CONSTELLATION_LOADED"
				},
				CONTAINER_EVENTS: {
					CLOSE_CONTAINER_ITEM: "CLOSE_CONTAINER_ITEM",
					CLOSE_MULTI_TYPE_PRIMARY_CONTAINER_ITEM: "CLOSE_MULTI_TYPE_PRIMARY_CONTAINER_ITEM"
				},
				DISPLAY_CASE_CREATED_TOASTER: "displayCaseCreatedToaster",
				DATA_EVENTS: {
					DATA_OBJECT_CREATED: "dataObjectCreated",
					DATA_OBJECT_DELETED: "dataObjectDeleted",
					DATA_OBJECT_UPDATED: "dataObjectUpdated"
				},
				FETCH_SUCCESS: "fetchSuccess",
				REVERSE_COEXISTENCE_EVENTS: {
					HANDLE_DISCARD: "handleDiscard",
					CHECK_IS_FORM_DIRTY: "checkIsFormDirty"
				}
			},
			CONTAINER_TYPE: {
				MULTIPLE: "multiple",
				SINGLE: "single",
				HYBRID: "HybridViewContainer"
			},
			REMOTE_SYSTEM_ID: "RemoteSystemID",
			LIST_SELECTION_MODE: {
				MULTI: "multi",
				SINGLE: "single",
				MULTI_ON_HOVER: "multi_on_hover"
			},
			SUBMISSION_FAILURE_TYPE: {
				FORM_VALIDATION_ERROR: "formValidationError"
			},
			USER_SETTINGS: {
				UTILITY_PANEL_USER_STATE_PATH: "presentation.templates.CaseView.utilityPanelExpanded",
				SUMMARY_PANEL_USER_STATE_PATH: "presentation.templates.CaseView.summaryPanelExpanded",
				ASSIGMENT_COLLAPSED_STATE_PATH: "presentation.templates.CaseView.assignmentWidgetCollapsed",
				CASE_VIEW_PATH: "presentation.templates.CaseView"
			},
			PROMISE_VALUE: {
				RESOLVE: "resolve",
				REJECT: "reject"
			},
			APP_TYPE: {
				UIKIT: "uikit",
				THEME_COSMOS: "themecosmos"
			},
			VIEW_TYPE: {
				PY_EMBEDASSIGNMENT: "pyEmbedAssignment",
				PY_DETAILS: "pyDetails"
			}
		},
		W = {
			CONTEXT: "context",
			AJAXCONTAINER: "primary",
			VIEW_CONTAINER: "ViewContainer",
			APP_SHELL: "AppShell",
			ROOT_CONTAINER: "RootContainer",
			HYBRID_VIEW_CONTAINER: "HybridViewContainer",
			MODAL_VIEW_CONTAINER: "ModalViewContainer",
			FLOW_CONTAINER: "FlowContainer",
			PREVIEW_VIEW_CONTAINER: "PreviewViewContainer",
			OBJECT_PAGE: "ObjectPage",
			CASE_CREATE_STAGE: "CaseCreateStage",
			CASE_VIEW: "CaseView",
			VIEW: "view",
			CASE_PREVIEW: "CasePreview",
			CASE_STAGES: "Stages",
			CASEMESSAGES: "caseMessages",
			SUGGESTION: "suggestion",
			PRIMARY: "primary",
			MODAL: "modal",
			PREVIEW: "preview",
			TERTIARY: "tertiary",
			DEFAULT: "default",
			ACPRIMARY: "primary",
			ACTERTIARY: "tertiary",
			PERFORM_MODE: "perform",
			CASE_VIEW_MODE_PROP: ".caseViewMode",
			REVIEW_MODE: "review",
			WORKAREA: "workarea",
			ACPRIMARY_NAME: "ACPRIMARY",
			ACTERTIARY_NAME: "ACTERTIARY",
			THREADNAMESEPARATOR: "/",
			JOINCHARACTER: "_",
			FORWARD_SLASH_STRING: "/",
			UNDERSCORE_STRING: "_",
			WORK_ID: "WORK_ID",
			EMPTY_STRING: "",
			PROPERTY_MESSAGES: "propertyMessages__",
			CONTEXT_MESSAGES: "contextMessages__",
			HTTP_MESSAGES: "httpMessages__",
			PAGE_MESSAGES: "pageMessages__",
			SUMMARY_OF_LISTS: "summary_of_lists__",
			SUMMARY_OF_GROUPS: "summary_of_groups__",
			SUMMARY_OF_MESSAGES: "summary_of_messages__",
			SUMMARY_OF_FIELD_VALUES: "summary_of_field_values__",
			SUMMARY_OF_WHEN_CONDITIONS: "summary_of_when_conditions__",
			SUMMARY_OF_ASSOCIATED_LISTS: "summary_of_associated_lists__",
			CONTEXT_DATA: "context_data",
			CONTENT: "content",
			TABLE: e => `Table[${e}]`,
			HTTP: "HTTP",
			PROPERTY: "PROPERTY",
			MESSAGES: "messages__",
			PAGE_ERRORS: "page_level_errors",
			NO_MESSAGES: "No messages existing",
			PULSE_REFERENCE: "pulse.messages",
			IS_LOADING: "isLoading",
			APPROVED: "Approved",
			REJECTED: "Rejected",
			DUPLICATE: "Duplicate",
			IGNORE: "Ignore",
			PARAGRAPH: "PARAGRAPH",
			X_ORIGIN_CHANNEL: "x-origin-channel",
			AUTHORING_PREVIEW_CONTAINER: "root/authoring-preview",
			ERROR_FIELD_IN_PAGE: "erroneousInputOutputFieldInPage",
			ERROR_IN_PAGE_IDENTIFIER: "erroneousInputOutputIdentifier",
			UI_RESOURCERS: "uiResources",
			UI_RESOURCERS_CONTEXT_DATA: "uiResources.context_data",
			ACTION_BUTTONS: "uiResources.actionButtons",
			RESOURCERS: "uiResources.resources",
			ROOT: "uiResources.root",
			CASE_INFO_IS_LOCAL_ACTION: "caseInfo.isLocalAction",
			DATA: "data",
			OPTIONS: "options",
			VIEWS: "uiResources.resources.views",
			NAVIGATIONS: "uiResources.resources.navigations",
			COMPONENTS: "uiResources.components",
			LOCALE_REFERENCES: "uiResources.localeReferences",
			STATIC_SERVER_URL: "staticServer",
			APPLICATION_DATA: "data.Application",
			REFERENCED_USERS: "referencedUsers",
			CASE_INFO_REFRESH_CONDITIONS: "caseInfo.refreshConditions",
			FIELD_LEVEL_SUCCESS: "success",
			FIELD_LEVEL_WARNING: "warning",
			FIELD_LEVEL_ERROR: "error",
			HASH_DELIMITER: "~^|^~",
			NULL_STRING: "null",
			DATA_PAGE: "DataPage",
			GET_PAGE_DATA: "getPageData",
			PROPERTY_ANNOTATION: "@P",
			ASSOCIATED_PROPERTY_ANNOTATION: "@ASSOCIATED",
			CLASS_ANNOTATION: "@CLASS",
			ASSOCIATED: "associated",
			CLASS_ID: ".classID",
			CLASSID: "classID",
			READONLY: "readonly",
			SHARED: "shared",
			RELOAD_IF_OLDER_THAN: "reloadIfOlderThan",
			RELOAD_ONCE_PER_INTERACTION: "reloadOncePerInteraction",
			PY_DETAILS: "pyDetails",
			LIST_ACTIONS: {
				INSERT: "INSERT",
				UPDATE: "UPDATE",
				DELETE: "DELETE",
				DELETE_ALL: "DELETE ALL",
				MOVE: "MOVE",
				SELECT: "SELECT",
				DESELECT: "DESELECT"
			},
			LIST_ACTIONS_TYPE: {
				SELECT_DESELECT: "SELECT_DESELECT",
				DESELECT_ALL: "DESELECT_ALL"
			},
			ENV_INFO_KEYS: {
				APPLICATION_NAME: "APPLICATION_NAME",
				APPLICATION_DESC: "APPLICATION_DESC",
				ACCESS_GROUP: "ACCESS_GROUP",
				USER_NAME: "USER_NAME",
				USER_ID: "USER_ID",
				USER_IMAGE: "USER_IMAGE",
				LOCALE: "LOCALE",
				TIMEZONE: "TIMEZONE",
				WORK_GROUP: "WORK_GROUP"
			},
			ID: "ID",
			SCALARLIST: "ScalarList",
			COREHEADERS: "coreHeaders",
			SKIPCOREHEADERS: "skipCoreHeaders",
			COREHEADER_APP_DEBUG_ID: "X-Pega-App-Debug-ID",
			COREHEADER_APP_DEBUG_LEVELS: "X-Pega-App-Debug-Levels",
			CONTEXT_DATA_MODAL_VIEW: {
				IS_MULTI_RECORD_DATA: "context_data.modalView.isMultiRecordData",
				VIEW_NAME: "context_data.modalView.viewName",
				PARENT_CONTEXT: "context_data.modalView.parentContext",
				INTERESTPAGE: "context_data.modalView.interestPage"
			},
			...H
		};
	const q = class {
			static remoteCaseMapping = {};
			static setRemoteCaseMapping = e => {
				this.remoteCaseMapping = e
			};
			static getRemoteCaseMapping = () => this.remoteCaseMapping;
			static getRemoteCase = e => this.remoteCaseMapping[e];
			static isRemoteCase = e => !!(e && this.remoteCaseMapping && this.remoteCaseMapping[e]);
			static getRemoteHeaderByContext = e => $p.getProperty(".RemoteSystemID", W.CASE_INFO.HEADERS, e);
			static getRemoteHeader = e => this.remoteCaseMapping[e]?.RemoteSystemID;
			static injectRemoteCaseHeader = (e, t, n) => {
				if (e && e.RemoteSystemID) return;
				const r = this.getRemoteHeaderByContext(n);
				r ? e.RemoteSystemID = r : t && this.isRemoteCase(t.caseTypeID) && (e.RemoteSystemID = this.getRemoteHeader(t.caseTypeID))
			}
		},
		z = /{(.*?)}/i,
		Y = /{(.*?)}/g,
		K = e => null !== e.match(z),
		X = e => (e && (e.startsWith("/") && (e = e.substring(1, e.length)), e.endsWith("/") && (e = e.substring(0, e.length - 1))), e),
		J = e => {
			const t = e[e.length - 1],
				n = e[e.length - 2];
			if ("y" !== t.toLowerCase()) return `${e}s`;
			switch (n.toLowerCase()) {
				case "a":
				case "e":
				case "i":
				case "o":
				case "u":
					return `${e}s`;
				default:
					return `${e=e.substring(0,e.length-1)}ies`
			}
		},
		Q = () => X(window.location.pathname),
		Z = (e, t, n) => {
			switch (n) {
				case "warning":
					t ? console.warn(e, t) : console.warn(e);
					break;
				case "error":
					t ? console.error(e, t) : console.error(e);
					break;
				default:
					t ? console.log(e, t) : console.error(e)
			}
		};
	const ee = new class {
			constructor() {
				this.staticRoutesList = [], this.dynamicRoutesList = [], this.reqContextName = "", this.defaultViewUrlPath = "", this.portalName = ""
			}
			init = (e, t) => {
				e && e.routes && e.routesMeta ? (this.routingInfo = e, this.appRoutes = e.routes, this.appRoutesMeta = e.routesMeta, this.reqContextName = e.reqContextName, this.reqServletPath = e.reqServletPath, this.appName = e.appName, this.appAlias = e.appAlias, this.orgName = e.orgName, this.defaultViewUrlPath = t, this._createStaticDynamicRoutesList(this.appRoutes), this.appDelimeter = e.appDelimeter, this.reqServletNameReal = e.pxReqServletNameReal, this.bDefaultPortal = e.isDefaultPortal, this.portalName = e.portalName, this.ignoreFromEndPoint = ["reactMode=dev", "reactMode=prod"]) : console.error("Routing info is not appropriate. Missing routes and routesMeta objects in routingInfo", JSON.stringify(e))
			};
			addRoutes = e => {
				e?.routes && e.routesMeta && (this.appRoutes = {
					...this.appRoutes,
					...e.routes
				}, this.appRoutesMeta = {
					...this.appRoutesMeta,
					...e.routesMeta
				}, this.routingInfo.routes = {
					...this.routingInfo.routes,
					...e.routes
				}, this.routingInfo.routesMeta = {
					...this.routingInfo.routesMeta,
					...e.routesMeta
				}, this._createStaticDynamicRoutesList(e.routes))
			};
			setDefaultRoute = e => {
				this.defaultViewUrlPath = e
			};
			_createStaticDynamicRoutesList = e => {
				Object.keys(e).forEach((e => {
					K(e) ? this.dynamicRoutesList?.push(e) : this.staticRoutesList?.push(e)
				}))
			};
			_getDynamicKeyName = e => {
				const t = e.indexOf("{") + 1,
					n = e.lastIndexOf("}");
				return e.slice(t, n)
			};
			isDefaultPortal = () => "false" != `${this.bDefaultPortal}`;
			getPortalName = () => this.portalName;
			getApplicationPath = () => X(`${this.getReqContextName()}/${this.getReqServletNameReal()}`);
			getReqServletNameReal = () => `${this.reqServletNameReal}`;
			getAppDelimeter = () => `${this.appDelimeter}`;
			getApplicationName = () => `${this.appName}`;
			getApplicationAlias = () => `${this.appAlias}`;
			getServletPath = () => `${this.reqServletPath}`;
			getOrganizationName = () => `${this.orgName}`;
			getReqContextName = () => X(this.reqContextName);
			getRoutingInfo = () => this.routingInfo;
			processUrl = (e, t) => {
				t && (e = e.toLowerCase()), e && (e = decodeURIComponent(e));
				const n = new RegExp(this.getApplicationPath(), "i");
				return e = e.replace(n, ""), X(e)
			};
			getEndPointInfo = e => {
				this.ignoreFromEndPoint?.forEach((t => {
					e.includes(t) && (e = e.substring(0, e.indexOf(t)))
				}));
				let t = this.processUrl(e, !0),
					n = this._getMatchedRouteInRoutingTable(t);
				void 0 === n && (t = this.processUrl(this.defaultViewUrlPath, !0), n = this._getMatchedRouteInRoutingTable(t) || "");
				const {
					routeKey: r,
					payload: a
				} = this.appRoutes[n], {
					reqType: s,
					endPoint: o,
					params: i
				} = this.appRoutesMeta[r].restApi, c = {
					...a
				}, {
					caseClassName: d,
					caseID: l
				} = c;
				if (q.isRemoteCase(d)) {
					const {
						RemoteClassGroup: e,
						RemoteSystemID: t
					} = q.getRemoteCase(d);
					c.caseID = l?.replace(d, e?.toUpperCase()), c.RemoteSystemID = t
				}
				const u = {
					routeKey: r,
					requestType: s,
					routeEndpoint: o,
					payload: {
						...i,
						...c
					}
				};
				return this._resolveRoute(u, this.processUrl(e, !1), n)
			};
			getSemanticURL(e, t, n) {
				return this._buildSemanticURL(e, t, n)
			}
			getResolvedSemanticURL(e, t, n = {}) {
				const r = this.getSemanticURL(e, t, n);
				let a = r;
				if (K(r)) {
					const e = r.match(Y);
					e?.forEach((e => {
						const t = this._getDynamicKeyName(e);
						n[t] && (a = a.replace(e, n[t]))
					}))
				}
				const s = $h(a),
					o = new URL(s);
				return !this.getPortalName() || o.searchParams.toString().indexOf("portal=") >= 0 || o.searchParams.append("portal", this.getPortalName()), o.toString()
			}
			_buildSemanticURL(e, t, n) {
				const {
					urlPattern: r
				} = this.appRoutesMeta[e], a = r.split("/").length, s = r.split("/"), o = Object.keys(this.appRoutes).filter((e => a === e.split("/").length)).filter((e => {
					const t = e.split("?")[0].split("/");
					return s.every(((e, n) => e.startsWith("{") || e === t[n]))
				}));
				if (1 === o.length) return this._getQueryParamsResolvedURL(o[0], n);
				if (0 === Object.keys(t).length) return "";
				const i = o.find((e => {
					const r = this.appRoutes[e].payload,
						a = {
							...n
						};
					delete a.dataViewName, delete a.dataContext;
					const s = r.dataViewKeys || r.dataContextParameters || {},
						o = Object.keys(t).every((e => t[e] === r[e]));
					return !!o && (_p.isEmpty(s) || _p.isEmpty(a) ? o : Object.keys(a).every((e => Object.prototype.hasOwnProperty.call(s, e))))
				}));
				return i ? this._getQueryParamsResolvedURL(i, n) : ""
			}
			_getQueryParamsResolvedURL(e, t, n = !1) {
				const [r, a] = e.includes("?") ? e.split("?") : [e];
				if (a) {
					const e = {};
					for (const [n, r] of Object.entries(t)) e[n.toLowerCase()] = r;
					const s = new URLSearchParams(a),
						o = {};
					for (const [r, a] of s.entries())
						if ("string" == typeof a && K(a)) {
							const s = this._getDynamicKeyName(a);
							o[r] = n ? t[s] || e[s.toLowerCase()] : t[s]
						} else "string" == typeof a && (o[r] = a);
					return `${r}?${new URLSearchParams(o).toString()}`
				}
				return r
			}
			_getQueryParamsObject(e) {
				const t = {},
					n = new URLSearchParams(e);
				for (const [e, r] of n.entries()) t[e] = r;
				return t
			}
			getRestEndPoint(e, t) {
				try {
					return this._buildRestApi(e, t)
				} catch (e) {
					return console.error(e), null
				}
			}
			_buildRestApi(e, t) {
				if (e && this.appRoutesMeta[e]) {
					const {
						reqType: n,
						body: r
					} = this.appRoutesMeta[e].restApi;
					let {
						endPoint: a
					} = this.appRoutesMeta[e].restApi;
					t && t.params && t.params.pageName && (a = `${a}&pageName=${t.params.pageName}`);
					const s = a.match(Y);
					if (s)
						for (let e = 0; e < s.length; e += 1) {
							const n = s[e].replace("{", "").replace("}", ""),
								r = new RegExp(s[e], "g");
							a = a.replace(r, t[n])
						}
					if (r) {
						let e = {};
						return Object.keys(r).forEach((n => {
							this._isSpecialInstruction(n) && (e = {
								...e,
								...this._processInstruction(n, r[n], t)
							})
						})), {
							restApi: a,
							reqType: n,
							body: e
						}
					}
					return {
						restApi: a,
						reqType: n
					}
				}
				throw new Error(`Cannot find route metadata for the routeKey: ${e}.`)
			}
			_isSpecialInstruction(e) {
				return e && e.startsWith("@")
			}
			_processInstruction(e, t, n) {
				const r = {};
				return "@COPY" === e && t.forEach((e => {
					r[e] = n[e]
				})), r
			}
			doesRestApiExist(e) {
				return !(!this.appRoutesMeta || !this.appRoutesMeta[e])
			}
			_resolveRoute = (e, t, n) => {
				const r = [],
					[a, s] = t.includes("?") ? t.split("?") : [t],
					[o, i] = n.includes("?") ? n.split("?") : [n],
					c = a.split("/"),
					d = o.split("/"),
					l = {};
				for (let e = 0; e < d.length; e += 1)
					if (r[e] = d[e], K(d[e])) {
						l[this._getDynamicKeyName(d[e])] = c[e], r[e] = c[e]
					} const u = this._getQueryParamsObject(i),
					p = this._getQueryParamsObject(s),
					h = {};
				for (const [e, t] of Object.entries(p)) h[e.toLowerCase()] = t;
				for (const e in u) K(u[e]) ? l[e] = p[e] || h[e.toLowerCase()] : l[e] = u[e];
				let g;
				s && (g = this._getQueryParamsResolvedURL(n, p, !0));
				const f = this._resolvePayload(e, l, n);
				return {
					...this._resolveRouteEndPoint(f, n),
					urlPath: g || r.join("/")
				}
			};
			_resolveRouteEndPoint = (e, t) => {
				let {
					routeEndpoint: n
				} = e;
				if (!K(n)) return e;
				const r = {};
				if (r[t] = e, void 0 !== e.payload) {
					const t = n.match(Y);
					for (let a = 0; a < t.length; a += 1) {
						const s = t[a],
							o = this._getDynamicKeyName(s);
						if (void 0 !== e.payload[o]) {
							const t = e.payload[o];
							n = n.replace(s, t)
						} else this._sendWarningAndErrorMessages(`Unable to resolve dynamic token {${o}} in routeEndpoint- ${o} is missing in payload`, r)
					}
				} else this._sendWarningAndErrorMessages("Unable to resolve dynamic token(s) in routeEndpoint- payload is missing in routing table for-", r);
				return {
					...e,
					routeEndpoint: n
				}
			};
			_resolvePayload = (e, t, n) => {
				if (void 0 === e.payload) return e;
				const r = {
					...e.payload,
					...this._resolvePayloadRecursive(e.payload, t)
				};
				return {
					...e,
					payload: r
				}
			};
			_resolvePayloadRecursive(e, t) {
				const n = {};
				for (const r in e)
					if (Object.prototype.hasOwnProperty.call(e, r)) {
						let a = e[r];
						if ("string" == typeof a && K(a)) {
							const e = a.match(Y);
							for (let n = 0; n < e.length; n += 1) {
								const r = e[n],
									s = this._getDynamicKeyName(r);
								if (void 0 !== t[s]) {
									const e = t[s];
									a = a.replace(r, e)
								} else this._sendWarningAndErrorMessages(`Unable to resolve dynamic token {${s}} in payload- {${s}} is missing in semantic url construct`)
							}
							n[r] = a
						} else "object" == typeof a && (n[r] = this._resolvePayloadRecursive(a, t))
					} return n
			}
			_getMatchedRouteInRoutingTable = e => {
				let t = this._findMatchedRouteInStaticList(e);
				return void 0 !== t ? t : (t = this._findMatchedRouteInDynamicList(e), void 0 !== t ? t : void 0)
			};
			_findMatchedRouteInStaticList = e => this.staticRoutesList?.find((t => t.toLowerCase() === e.toLowerCase()));
			_findMatchedRouteInDynamicList = e => {
				const [t, n] = e.includes("?") ? e.split("?") : [e], r = t.split("/");
				return this.dynamicRoutesList?.find((e => {
					const [t, a] = e.includes("?") ? e.split("?") : [e], s = t.split("/");
					if (s.length !== r.length) return !1;
					let o = 0;
					for (o = 0; o < s.length; o += 1) {
						const e = s[o].toLowerCase();
						if (!K(e) && e !== r[o] && J(e) !== r[o]) return !1
					}
					if (a) {
						const e = new URLSearchParams(n),
							t = new URLSearchParams(a),
							r = new Set,
							s = new Set;
						for (const t of e.keys()) r.add(t.toLowerCase());
						for (const e of t.keys()) s.add(e.toLowerCase());
						if (s.size !== r.size) return !1;
						for (const e of r)
							if (!s.has(e)) return !1
					}
					return !0
				}))
			};
			_sendWarningAndErrorMessages = (e, t) => {
				Z(e, t, "warning"), Z("Error in Generated Routing Table", null, "error"), Z("Back | Forward for this page may NOT work as intended", null, "warning"), Z("Bookmark | Refresh for this page may NOT work as intended", null, "warning")
			}
		},
		te = ee;
	const ne = class {
		constructor(e) {
			this.xrayInfo = {}, this.xRayDebugger = e
		}
		startXRay() {
			if (!this.xRayDebugger.xray) return null;
			const e = `${Date.now()+Math.random()}`;
			return this.xrayInfo[e] = {
				startTime: Date.now() / 1e3
			}, e
		}
		startXRayRestApi(e, t) {
			this.xRayDebugger.xray && (this.xrayInfo[e] = {
				...this.xrayInfo[e],
				restApisTime: {
					...this.xrayInfo[e] ? this.xrayInfo[e].restApisTime : {},
					[t]: Date.now()
				}
			})
		}
		stopXRayRestApi(e, t) {
			this.xRayDebugger.xray && (this.xrayInfo[e] = {
				...this.xrayInfo[e],
				restApisTime: {
					...this.xrayInfo[e]?.restApisTime,
					[t]: (Date.now() - this.xrayInfo[e]?.restApisTime[t]) / 1e3
				}
			})
		}
		updateXRay(e, t) {
			this.xRayDebugger.xray && (this.xrayInfo[e] = {
				...this.xrayInfo[e],
				...t
			})
		}
		stopXRay(e, t) {
			this.xRayDebugger.xray && (this.xrayInfo[e] = {
				...this.xrayInfo[e],
				totalTime: Date.now() / 1e3 - this.xrayInfo[e].startTime
			}, t().setXRayInfo(this.xrayInfo[e]), delete this.xrayInfo[e])
		}
	};
	const re = new class {
		constructor() {
			this.xray = !1, this.onXRayCallback = null, this.xrayRuntime = new ne(this), this.isPreview = !1, this.debugLevels = "vcv=1;tracer=0;log=0"
		}
		onXRay(e) {
			this.onXRayCallback = e
		}
		toggleXRay(e) {
			this.xray = e, this.xrayRuntime.xrayInfo = {}, null !== this.onXRayCallback && this.onXRayCallback(e)
		}
		enableXRay() {
			this.toggleXRay(!0)
		}
		disableXRay() {
			this.toggleXRay(!1)
		}
		toggle() {
			this.xray ? this.toggleXRay(!1) : this.toggleXRay(!0)
		}
		isXRayOn() {
			return this.xray
		}
		getXRayRuntime() {
			return this.xrayRuntime
		}
		setPreviewMode() {
			this.isPreview = !0
		}
		getPreviewMode() {
			return this.isPreview
		}
		enableTracer = () => {
			this.debugLevels = "vcv=1;tracer=1;log=0"
		};
		disableTracer = () => {
			this.debugLevels = "vcv=1;tracer=0;log=0"
		};
		getDebugLevels = () => this.debugLevels
	};
	const ae = new class {
			constructor() {
				this.environmentInfoObject = null, this.isPortalLoaded = !1, this.pageName = null, this.KeyMapping = {}, this.isAssignmentHeaderHidden = !1, this.coexistenceMeta = {
					appType: "",
					isCoexistence: !1
				}, this.brandingInfo = null, this.cookieComplianceMethod = "none"
			}
			setEnvironmentInfo(e) {
				this.environmentInfoObject = e
			}
			getOperatorName() {
				return this.environmentInfoObject?.pxOperator.pyUserName
			}
			getOperatorWorkGroup() {
				return this.environmentInfoObject?.pxOperator.pyWorkGroup
			}
			getOperatorIdentifier() {
				return this.environmentInfoObject?.pxOperator.pyUserIdentifier
			}
			getOperatorImageInsKey() {
				return this.environmentInfoObject?.pxOperator.pyImageInsKey
			}
			getApplicationLabel() {
				return this.environmentInfoObject?.pxApplication.pyLabel
			}
			getPortalName() {
				return te.getPortalName()
			}
			getApplicationName() {
				return this.environmentInfoObject?.pxApplication.pyRuleName
			}
			getUseLocale() {
				return this.environmentInfoObject?.pxLocale.pyUseLocale
			}
			getAccessGroup() {
				return this.environmentInfoObject?.pxOperator.pyAccessGroup
			}
			getTimeZone() {
				return this.environmentInfoObject?.pxLocale.pyTimeZone
			}
			getTheme() {
				return this.themeOverrides
			}
			setTheme(e) {
				return this.themeOverrides = e, this.themeOverrides
			}
			getBrandingInfo() {
				return this.brandingInfo
			}
			setBrandingInfo(e) {
				return this.brandingInfo = e, this.brandingInfo
			}
			getCookieComplianceMethod() {
				return this.cookieComplianceMethod
			}
			setCookieComplianceMethod(e) {
				this.cookieComplianceMethod = e
			}
			setLocale(e) {
				const t = e.replaceAll("-", "_").split("_").slice(0, 2);
				this.locale = t.join("-"), this.environmentInfoObject?.pxLocale && (this.environmentInfoObject.pxLocale.pyUseLocale = this.locale)
			}
			getLocale = () => this.locale;
			getEnvironmentKeys() {
				return Object.keys(W.ENV_INFO_KEYS)
			}
			getMaxAttachmentSize() {
				return this.environmentInfoObject?.pxApplication.pyMaxAttachmentSize
			}
			getDefaultOperatorDP() {
				return this.environmentInfoObject?.pxApplication.pyDefaultOperatorDP
			}
			getDocumentUrlDP() {
				return this.environmentInfoObject?.pxApplication.pyDocumentUrlDP
			}
			getCaseInstanceListDP() {
				return this.environmentInfoObject?.pxApplication.pyCaseInstanceListDP
			}
			getBaseLocale() {
				return this.environmentInfoObject?.pxApplication.pyBaseLocale || "en-US"
			}
			getRenderingMode() {
				return this.environmentInfoObject?.renderingMode
			}
			getBuiltOnAppNames() {
				return this.environmentInfoObject?.pxApplication.pyBuiltOnApplications
			}
			setPreviewMode() {
				re.setPreviewMode()
			}
			setDefaultCasePage(e) {
				this.pageName = e
			}
			getDefaultCasePage() {
				return this.pageName
			}
			disableAssignmentHeader(e) {
				this.isAssignmentHeaderHidden = e
			}
			isAssignmentHeaderDisabled() {
				return this.isAssignmentHeaderHidden
			}
			getDefaultPortal() {
				return this.environmentInfoObject?.pxOperator.pyDefaultPortal
			}
			updateFeatureMap(e) {
				const t = this.environmentInfoObject?.features;
				return this.environmentInfoObject && e && (this.environmentInfoObject?.features ? this.environmentInfoObject.features = {
					...t,
					...e
				} : this.environmentInfoObject.features = {
					...e
				}), this.getFeatureMap()
			}
			getFeatureMap() {
				return this.environmentInfoObject?.features || {}
			}
			setKeyMapping(e) {
				return this.KeyMapping = e, this.KeyMapping
			}
			getKeyMapping(e) {
				const t = this.KeyMapping[e];
				return void 0 !== t ? t : null
			}
			setCoexistenceMeta(e) {
				return e && (this.coexistenceMeta = e), this.getCoexistenceMeta()
			}
			getCoexistenceMeta() {
				return this.coexistenceMeta
			}
			isCoexistenceAppOfType(e) {
				return !(!this.coexistenceMeta.isCoexistence || this.coexistenceMeta.appType !== e)
			}
			getCaseTypeList() {
				return this.environmentInfoObject && this.environmentInfoObject?.pyCaseTypeList || []
			}
			getUserSettings() {
				return this.environmentInfoObject?.pyUserSettings || null
			}
		},
		se = "text/javascript";
	const oe = new class {
		constructor() {
			this.loaderObj = {}, this.staticServerURL = "", this.appStaticUrl = null, this.pegaOnlyUrl = !1, this.loadedAssets = {}, this.componentsConfig = null, this.appAlias = "", this.b2sJWT = null, this.ccV2LibId = ""
		}
		getTypes = {
			SCRIPT: "script",
			STYLE: "link"
		};
		getStaticServerUrl() {
			return this.staticServerURL
		}
		setCCV2LibId(e) {
			this.ccV2LibId = e
		}
		getCCV2LibId() {
			return this.ccV2LibId
		}
		async getThemeSchemaJSON() {
			const e = `${this.staticServerURL}themeOverrides.schema.json`;
			return fetch(e).then((e => e.json()))
		}
		getConstellationServiceUrl() {
			return "/" === this.staticServerURL.charAt(this.staticServerURL.length - 1) ? this.staticServerURL.substring(0, this.staticServerURL.length - 1) : this.staticServerURL
		}
		setAppAlias(e) {
			this.appAlias = e
		}
		getAppAlias() {
			return this.appAlias
		}
		async getSvcComponentsConfig(e, t = {}) {
			let n = "",
				r = 0;
			return e.forEach((e => {
				n += `${0===r?"?":"&"}field${r}=${e.field}&value${r}=${e.value}`, r += 1
			})), this.pegaOnlyUrl ? this.getSvcComponentsConfigSeparatedUrls(e, n, t) : this.getSvcComponentsConfigCombinedUrl(e, n, t)
		}
		async getSvcComponentsConfigSeparatedUrls(e, t, n) {
			const r = ae.getBuiltOnAppNames(),
				a = this.loadAndFilterPegaComponentsConfig(e, r),
				s = this.loadAndCustomerComponentsConfig(t),
				o = this.fetchSDKComponent(t),
				i = [];
			if (await Promise.all([a, s, o]).then((e => {
					const t = this.mergeComponentList(e);
					i.push(...t)
				})), n.alternateDesignSystemURL && 1 === i.length) {
				const r = await this.getSvcComponentsConfigADS(e, t, n);
				i[0].alternateDesignSystemConfig = r
			}
			return {
				data: {
					components: i
				}
			}
		}
		mergeComponentList = (e = []) => {
			const [t = [], n = [], r = []] = e, a = [...t, ...n];
			return this.appStaticUrl ? a.map((e => {
				const {
					name: t,
					type: n,
					subtype: a
				} = e, s = r.reduce(((e, r) => (t === r.name && n === r.type && a === r.subtype && (e = r), e)), {});
				return Object.keys(s).length > 0 ? {
					...e,
					alternateDesignSystemConfig: {
						...s
					}
				} : e
			})) : a
		};
		async fetchSDKComponent(e) {
			if (this.appStaticUrl && this.appStaticUrl.length > 8 && this.appStaticUrl !== this.staticServerURL) {
				const t = `${this.appStaticUrl}v102/${this.appAlias}/componentslist-ext${e}`;
				return fetch(t, {
					method: "GET",
					credentials: "include",
					headers: {
						Authorization: `Bearer ${this.b2sJWT}`
					}
				}).then((e => e.json())).then((e => e.components)).catch((() => []))
			}
			return Promise.resolve([])
		}
		async loadAndFilterPegaComponentsConfig(e, t) {
			return this.loadPegaComponentsConfig().then((() => {
				const n = [];
				return this.componentsConfig && this.componentsConfig.forEach((r => {
					let a = !0;
					e.forEach((e => {
						Array.isArray(r[e.field]) ? r[e.field].includes(e.value) || (a = !1) : r[e.field] !== e.value && (a = !1)
					})), a && this.checkForBuiltOnSupport(t, r.allowedApplications) && n.push(r)
				})), n
			}))
		}
		async loadPegaComponentsConfig() {
			let e = null;
			if (null === this.componentsConfig) {
				const t = `${this.staticServerURL}components/componentsconfig.json?v=${(new Date).getTime()}`;
				e = fetch(t, {
					method: "GET"
				}).then((e => e.json())).then((e => {
					this.componentsConfig = e
				})).catch()
			} else e = Promise.resolve();
			return e
		}
		async loadAndCustomerComponentsConfig(e) {
			let t = null;
			if (this.appStaticUrl && this.appStaticUrl.length > 8 && this.appStaticUrl !== this.staticServerURL) {
				const n = `${this.appStaticUrl}v103/${this.appAlias}/componentslist${e}`;
				t = fetch(n, {
					method: "GET",
					credentials: "include",
					headers: {
						Authorization: `Bearer ${this.b2sJWT}`
					}
				}).then((e => e.json())).then((e => e.components)).catch((() => []))
			} else t = Promise.resolve([]);
			return t
		}
		checkForBuiltOnSupport(e, t) {
			if (!e || !t || 0 === e.length || 0 === t.length) return !0;
			const n = e.split(",");
			return 0 === n.length || n.some((function(e) {
				return -1 !== t.indexOf(e)
			}))
		}
		async getSvcComponentsConfigCombinedUrl(e, t, n) {
			const r = `${this.staticServerURL}v102/${this.appAlias}/componentslist${t}`,
				a = await fetch(r, {
					method: "GET",
					credentials: "include",
					headers: {
						Authorization: `Bearer ${this.b2sJWT}`
					}
				}).then((e => e.json())).then((e => ({
					data: e
				})));
			if (n.alternateDesignSystemURL && 1 === a?.data?.components?.length) {
				const r = await this.getSvcComponentsConfigADS(e, t, n);
				a.data.components[0].alternateDesignSystemConfig = r
			}
			return a
		}
		getSvcComponentsConfigADS(e, t, n) {
			const r = `${n.alternateDesignSystemURL}${n.alternateDesignSystemURL.endsWith("/")?"":"/"}components/${e[0].value}/config-ext.json`;
			return fetch(r, {
				method: "GET"
			}).then((e => {
				if (e.ok) return e.json();
				throw new Error(e.statusText)
			})).catch((e => ({
				error: e.message
			})))
		}
		getSvcImage(e) {
			const t = `${this.appStaticUrl}v102/${this.appAlias}/image/${e}`;
			return fetch(t, {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${this.b2sJWT}`
				}
			}).then((e => e.blob())).catch()
		}
		getSvcLocale(e, t) {
			const n = `${this.appStaticUrl}v102/${this.appAlias}/locales/${e}/${t}`;
			return fetch(n, {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${this.b2sJWT}`
				}
			})
		}
		getSvcComponent(e) {
			const t = `${this.appStaticUrl}v102/${this.appAlias}/component/${e}`;
			return fetch(t, {
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${this.b2sJWT}`
				}
			}).then((e => {
				if (!e.ok) throw Error(e.statusText);
				return e
			})).then((e => e.text())).then((e => e)).catch()
		}
		async importCustomComponentMap(e) {
			fetch(`${this.appStaticUrl}v100/componentlib/componentsmap/${e}?v=${Date.now()}`, {
				headers: {
					Authorization: `Bearer ${this.b2sJWT}`
				}
			}).then((e => (e.ok || console.error("Error while fetching custom component map"), e))).then((e => e.text())).then((t => {
				this.setCCV2LibId(e);
				const n = document.createElement("script");
				n.src = window.URL.createObjectURL(new Blob([t], {
					type: se
				})), n.onload = () => console.log("Custom component lib map loaded"), n.onerror = () => console.error("Error while appending custom component map"), document.head.appendChild(n)
			})).catch((e => {
				console.error("Exception while appending custom component map : "), console.error(e)
			}))
		}
		loadSvcComponent(e) {
			return new Promise(((t, n) => {
				this.getSvcComponent(e).then((r => {
					const a = document.createElement("script");
					a.src = window.URL.createObjectURL(new Blob([r], {
						type: se
					})), a.onload = () => t(e), a.onerror = () => n(e), document.head.appendChild(a)
				})).catch((() => {
					n(e)
				}))
			}))
		}
		initServer(e, t, n) {
			console.log(`asset-loader.initServer(${e}, ${t})`), this.appStaticUrl = null, this.staticServerURL = null, this.pegaOnlyUrl = !1, this.componentsConfig = null, e && t && "no-appstatic" !== t && "no-cdn" !== t ? (this.appStaticUrl = t.endsWith("/") ? t : `${t}/`, this.staticServerURL = e.endsWith("/") ? e : `${e}/`, this.pegaOnlyUrl = !0) : e && t && "no-appstatic" === t ? (this.staticServerURL = e.endsWith("/") ? e : `${e}/`, this.appStaticUrl = this.staticServerURL, this.pegaOnlyUrl = !0) : e && t && "no-cdn" === t && (this.staticServerURL = e.endsWith("/") ? e : `${e}/`, this.appStaticUrl = this.staticServerURL), console.log(`asset-loader.initServer() staticServerURL=${this.staticServerURL}, appStaticUrl=${this.appStaticUrl}, pegaOnlyUrl=${this.pegaOnlyUrl})`), this.b2sJWT = n
		}
		register(e, t) {
			this.loaderObj[e] = t
		}
		getLoader(e) {
			let t = {};
			const n = (e, t) => new Promise(((n, r) => {
				const a = document.createElement(t);
				"script" === t ? (a.onload = () => {
					n(e)
				}, a.onerror = () => {
					r(e)
				}, a.type = se, a.charset = "UTF-8", a.async = !1, a.src = e) : (a.type = "text/css", a.rel = "stylesheet", a.href = e), document.head.appendChild(a)
			})).catch((e => {
				console.log(e)
			}));
			return t = e ? this.loaderObj[e] : n, t
		}
		loadAssets(e, t) {
			const {
				isDevServerMode: n
			} = t;
			if (!e) return Promise.resolve();
			const r = [];
			return e.forEach((e => {
				const t = Object.keys(e)[0];
				let a = n ? Object.values(e)[0] : this.getStaticServerUrl();
				a = a.endsWith("/") ? a : `${a}/`, this.loadedAssets[t] || (t.includes(".js") ? r.push(this.getLoader()(a + t, this.getTypes.SCRIPT)) : t.includes(".css") && this.getLoader()(a + t, this.getTypes.STYLE), this.loadedAssets[t] = !0)
			})), Promise.all(r)
		}
		getAssetsFromIsolations(e) {
			const t = this.b2sJWT?.split(".")[1].replace(/-/g, "+").replace(/_/g, "/") || "",
				r = decodeURIComponent(n.g.atob(t).split("").map((e => `%${`00${e.charCodeAt(0).toString(16)}`.slice(-2)}`)).join("")),
				a = JSON.parse(r),
				s = a?.tenant_id,
				{
					restApi: o,
					reqType: i
				} = Ih("getAssetsFromIsolations", {
					isolationID: s,
					assetPath: e
				}) || {},
				c = `${this.appStaticUrl}${o}`;
			return fetch(c, {
				method: i,
				credentials: "include",
				headers: {
					Authorization: `Bearer ${this.b2sJWT}`
				}
			}).then((e => e.blob()))
		}
	};
	const ie = class {
		static regex = /\{@P[^}]*\s*:\s*[^}]*\}/g;
		static subRegex = /:'[a-zA-Z0-9!@#$&()\\-`.+,/\s"]*'/;
		static keyMap = {};
		static formatLocaleKey(e) {
			let t = 0,
				n = "";
			for (; t <= e.length;) {
				const r = e.indexOf("{@P ", t);
				if (-1 === r) {
					n += e.substring(t, e.length);
					break
				}
				n += e.substring(t, r);
				const a = e.indexOf("}", t),
					s = e.substring(r, a + 1),
					[o, i] = this.getKeyAndValue(s);
				this.addKeyToMap(o, i), n += `${s.split(":")[0]}}`, t = a + 1
			}
			return n
		}
		static getKeyAndValue(e) {
			const t = e.indexOf(":"),
				n = e.indexOf("}");
			return [`${e.substring(0,t)}}`, e.substring(t + 1, n)]
		}
		static addKeyToMap(e, t) {
			this.keyMap[e] = t
		}
		static replaceWithValue(e) {
			let t = 0,
				n = "";
			for (; t <= e.length;) {
				const r = e.indexOf("{@P ", t);
				if (-1 === r) {
					n += e.substring(t, e.length);
					break
				}
				n += e.substring(t, r);
				const a = e.indexOf("}", t),
					s = e.substring(r, a + 1);
				n += this.keyMap[s], t = a + 1
			}
			return n
		}
	};
	class ce {
		GENERIC_BUNDLE_KEY = "@BASECLASS!GENERIC!PYGENERICFIELDS";
		MESSAGE_BUNDLE_KEY = "@BASECLASS!MESSAGE!PYMESSAGES";
		BASE_CLASS = "@BASECLASS";
		DATA_PAGE_LOCALECONTEXT = "datapage";
		constructor() {
			this.localeStore = {}, this.getLocaleValue = this.getLocaleValue.bind(this)
		}
		setLocaleForRule = (e, t) => {
			const n = e.LocaleContent || e;
			this.localeStore[t] = n
		};
		getLocaleForRule = (e = this.GENERIC_BUNDLE_KEY) => this.localeStore[e];
		resetLocaleStore = () => {
			this.localeStore = {}
		};
		getLocaleValue(e, t, n = this.GENERIC_BUNDLE_KEY) {
			let r = !1;
			e && "string" == typeof e && (r = e.includes("@P ")), r && (e = ie.formatLocaleKey(e)), t = t ? `${t}.fields` : "fields";
			const a = this.localeStore[n.toUpperCase()],
				s = a ? _p.getIn(a, t, {}) : {};
			return r ? ie.replaceWithValue(s[e] || e) : s[e] || e
		}
		getParagraphLocaleValue(e, t, n) {
			const r = this.localeStore[e.toUpperCase()];
			return r ? decodeURIComponent(atob(r.content).split("").map((e => `%${`00${e.charCodeAt(0).toString(16)}`.slice(-2)}`)).join("")) : PCore.getMetadataUtils().getParagraph(n, t)
		}
		static async getLocaleJsons(e) {
			const t = ae.getUseLocale(),
				n = [],
				r = PCore.getLocaleUtils().localeStore;
			if ((e = (e = e.filter((e => !r[e]))).map((e => e.toUpperCase()))).length > 0) {
				const r = e.map((e => ({
						localeRuleKey: e,
						promise: oe.getSvcLocale(t, `${e}.json`)
					}))),
					a = await Promise.allSettled(r.map((e => e.promise)));
				await Promise.all(a.map((async (e, t) => {
					if ("fulfilled" === e.status) {
						const a = r[t];
						let s;
						try {
							s = await e.value.json()
						} catch {
							s = null
						}
						s && n.push({
							localeRuleKey: a.localeRuleKey,
							jsonData: s
						})
					}
				})))
			}
			return n
		}
		async loadLocaleResources(e) {
			const t = ae.getUseLocale(),
				n = ae.getBaseLocale();
			if (ae && t && (t !== n || "en-US" !== n) && e?.length > 0) try {
				(await ce.getLocaleJsons(e)).forEach((e => {
					this.setLocaleForRule(e.jsonData, e.localeRuleKey)
				}))
			} catch (e) {
				console.warn(e)
			}
		}
		setTimezone(e) {
			this.timezone = e
		}
		getTimeZoneInUse() {
			const e = Intl.DateTimeFormat().resolvedOptions().timeZone;
			return this.timezone || e
		}
	}
	const de = new ce;
	let le;
	const ue = e => {
		if (e) {
			const t = (new DOMParser).parseFromString(e, "text/html").getElementsByTagName("pega-reference")[0].getAttribute("data-rule-id") ?? "";
			if (t) {
				const e = le.getValue(t);
				return le.registerAdditionalProps({
					[t]: `@P ${t}`
				}), e
			}
		}
	};
	const pe = class {
		static getParagraphStream(e, t) {
			return ((e, t) => {
				le = t;
				const n = e.replace(/<pega-reference(.*?)<\/pega-reference>/g, ue);
				return /^(<p>)\s*(<\/p>)$/.test(n) ? null : n
			})(e, t)
		}
	};
	const he = new class {
		constructor() {
			this.componentMap = {}, this.overrideMap = {}, this.lazyMap = {}, this.customComponentLazyMap = {}
		}
		register(e, t) {
			this.componentMap[e] = t
		}
		registerLazyMap(e, t) {
			this.lazyMap[e] = t
		}
		registerCustomComponentLazyMap(e, t) {
			this.customComponentLazyMap[e] = t
		}
		getComponent(e) {
			return this.componentMap[e]
		}
		getLazyComponent(e) {
			return this.lazyMap[e]
		}
		getCustomComponent(e) {
			return this.customComponentLazyMap[e]
		}
		mergeComponentsMap(e = {}) {
			_p.copy(e, this.componentMap)
		}
		mergeOverrideMap(e = {}) {
			_p.copy(e, this.overrideMap)
		}
		getOverrideMap() {
			return this.overrideMap
		}
		getLazyMap() {
			return this.lazyMap
		}
	};
	const ge = new class {
		constructor() {
			this.handlers = {}
		}
		registerHandler(e, t) {
			this.handlers[e] = t
		}
		getHandler(e) {
			return this.handlers[e]
		}
	};
	const fe = class {
			static handleAnnotation(e, t) {
				const n = e.indexOf(" "),
					r = -1 === n ? e : e.substring(0, n),
					a = ge.getHandler(r);
				return a ? a(e.substring(n + 1), t) : e
			}
			static trimAnnotation(e) {
				if (!_p.isString(e)) return e;
				const t = e.indexOf(" "),
					n = e.substring(0, t),
					r = e.substring(t + 1);
				return ge.getHandler(n) ? r : e
			}
			static handleComponentMapping(e, t, n) {
				const r = he.getComponent(t.type);
				if (!r || !r.mapping) return;
				const a = r.mapping(t.config);
				if (a && a["@map"]) {
					const t = a["@map"],
						{
							source: r
						} = t;
					if (!r) return;
					const s = n.getValue(r);
					if ("function" == typeof t.advanced) t.advanced(e, s);
					else {
						const n = t.inputs_map;
						e[t.output_property] = [];
						const r = e[t.output_property];
						s.forEach((e => {
							const t = {};
							Object.keys(n).forEach((r => {
								let a = n[r];
								a && 0 === a.indexOf(".") ? (a = a.substring(1), t[r] = e[a]) : t[r] = a
							})), r.push(t)
						}))
					}
				}
			}
			static getPropertyName(e) {
				if (e && _p.isString(e)) {
					const t = e.startsWith(W.PROPERTY_ANNOTATION),
						n = t ? e.indexOf(" ") : -1;
					return t ? e.substring(n + 2) : e
				}
				return e
			}
			static getLeafPropertyName(e) {
				if (_p.isString(e) && !!e?.startsWith(W.PROPERTY_ANNOTATION)) {
					const t = this.getPropertyName(e),
						n = t.split(".");
					return n.length < 2 ? t : n.pop()
				}
				return e
			}
			static isProperty(e) {
				return _p.isString(e) && !!e?.startsWith(W.PROPERTY_ANNOTATION)
			}
		},
		ye = {},
		me = new Map,
		Ie = e => {
			let t = W.EMPTY_STRING;
			return t = e && e.includes(W.FORWARD_SLASH_STRING) ? e.substring(0, e.lastIndexOf("/")) : e, t
		},
		Ee = (e, t, n = !1) => {
			let r = W.EMPTY_STRING;
			if (t && e) {
				let a = `${t}${W.FORWARD_SLASH_STRING}${e}`;
				const s = Ps(a);
				if (s || t !== W.APP.APP && t !== W.APP.ROOT)
					if (s) {
						if (n && ye[a]) return r = `${a}${W.UNDERSCORE_STRING}${ye[a]}`, r;
						ye[a] ? ye[a] += 1 : ye[a] = 1, r = `${a}${W.UNDERSCORE_STRING}${ye[a]}`
					} else r = Ee(e, Ie(t));
				else a = `${t}${W.FORWARD_SLASH_STRING}${W.PRIMARY}`, ye[a] ? ye[a] += 1 : ye[a] = 1, r = `${a}${W.UNDERSCORE_STRING}${ye[a]}`
			}
			return r
		},
		Ae = (e, t) => {
			if (e && t) {
				const n = (me[t]?.[e] ?? 0) + 1;
				return me[t] || (me[t] = {}), me[t][e] = n, `${t}${W.FORWARD_SLASH_STRING}${e}_${n}`
			}
			return ""
		},
		_e = (e, t) => {
			if (e && t) {
				const n = me[t]?.[e];
				return n ? `${t}${W.FORWARD_SLASH_STRING}${e}_${n}` : Ae(e, t)
			}
			return ""
		},
		Se = e => {
			let t = W.EMPTY_STRING;
			return e && (t = e.substring(e.lastIndexOf("/") + 1, e.lastIndexOf("_")).toLowerCase()), t
		},
		Ce = (e, t) => {
			if (null === e) return t;
			const [, n] = t.split(W.FORWARD_SLASH_STRING);
			return e + W.FORWARD_SLASH_STRING + n
		},
		$e = e => {
			const t = e.indexOf(W.FORWARD_SLASH_STRING),
				n = e.lastIndexOf(W.FORWARD_SLASH_STRING);
			return t === n ? e : e.substring(0, n)
		},
		be = e => {
			const t = e.split(W.FORWARD_SLASH_STRING);
			return 2 === t.length ? e : t[0] + W.FORWARD_SLASH_STRING + t[2]
		},
		Pe = "SET_PROPERTY",
		Oe = "REPLACE_PROPERTY",
		Te = "FIELD_CHANGE",
		ve = "LOAD_VIEW",
		Ne = "SHOW_PAGE",
		Re = "SHOW_DATA",
		De = "SHOW_INSIGHT",
		xe = "SHOW_DASHBOARD",
		we = "SET_LOADING",
		Me = "RESET_LOADING",
		Le = "SET_SHARED_PROPERTY",
		je = "CREATE_WORK",
		Ue = "OPEN_WORK_BY_HANDLE",
		Fe = "UPDATE_DOCUMENT",
		ke = "FINISH_ASSIGNMENT",
		Ve = "CANCEL_ASSIGNMENT",
		Ge = "OPEN_ASSIGNMENT",
		Be = "MERGE_DATA",
		He = "REMOVE_ITEM",
		We = "GET_DATAOBJECT_ACTIONS",
		qe = "SHOW_HISTORY",
		ze = "ERROR",
		Ye = "INIT_CONTAINERS",
		Ke = "RESET_CONTAINERS",
		Xe = "ADD_CONTAINER_ITEM",
		Je = "REMOVE_CONTAINER_ITEM",
		Qe = "ADD_TRANSIENT_ITEM",
		Ze = "UPDATE_TRANSIENT_DATA",
		et = "REMOVE_TRANSIENT_ITEM",
		tt = "REMOVE_ALL_TRANSIENT_ITEMS",
		nt = "CLEAR_TRANSIENT_DATA",
		rt = "PURGE_TRANSIENT_DATA",
		at = "ACTIVATE_CONTAINER_ITEM",
		st = "UPDATE_CONTAINER_ITEM",
		ot = "UPMERGE_AND_REMOVE_CONTAINER_ITEM",
		it = "REPLACE_CONTAINER_ITEM",
		ct = "ACTIVATE_MODAL_CONTAINER_ITEM",
		dt = "REMOVE_CONTAINER",
		lt = "ADD_SUGGESTION_CONTEXT",
		ut = "showView",
		pt = "showData",
		ht = "showInsight",
		gt = "showDashboard",
		ft = "openWorkByHandle",
		yt = "openAssignment",
		mt = "createNewWork",
		It = "SHOW_CANCEL_ALERT",
		Et = "openLocalAction",
		At = "openProcessAction",
		_t = "caseWideActions",
		St = "openBulkAction",
		Ct = "ADD_MESSAGES",
		$t = "CLEAR_MESSAGES",
		bt = "RESET_STORE",
		Pt = "FETCH_DATAPAGE",
		Ot = "ADD_SHARED_DATA",
		Tt = "REMOVE_SHARED_DATA",
		vt = "LIST_ACTION",
		Nt = "DELETE_CASE_SUMMARY",
		Rt = "ALTER_BLOCKING_ACTION_COUNT",
		Dt = "CREATE_DATA_OBJECT",
		xt = "DELETE_DATA_OBJECT",
		wt = "VIEW_DATA_OBJECT",
		Mt = "UPDATE_DATA_OBJECT",
		Lt = "OPEN_EMBEDDED_DATA_MODAL",
		jt = "SUBMIT_EMBEDDED_DATA_MODAL",
		Ut = "FILL_FORM_WITH_AI",
		Ft = (e, t) => {
			if (!e || !t) return null;
			let n, r = W.EMPTY_STRING;
			return t && (r = `${t}${W.FORWARD_SLASH_STRING}${e}`, n = Ps(r), n || t.includes("/") ? n || (r = Ft(e, Ie(t))) : r = `${t}${W.FORWARD_SLASH_STRING}${e}`), r
		},
		kt = (e, t) => {
			const n = Ft(e, t);
			return n && Ps(n) ? Ps(n) : {}
		},
		Vt = (e, t) => te.getSemanticURL(ut, {
			page: e
		}, t);
	const Gt = new class {
		error = e => {
			console.error(e)
		}
	};
	class Bt {
		constructor(e, t, n) {
			this._grammar = e, this._state = "expectOperand", this._tree = null, this._exprStr = t || "", this._endState = n || {}
		}
		static _setParent(e, t) {
			Object.defineProperty(e, "_parent", {
				value: t,
				writable: !0
			})
		}
		_addToken(e) {
			const t = Jt[this._state],
				n = this._exprStr;
			if (this._exprStr += e.element, t.subHandler) {
				this._subParser || this._startSubExpression(n);
				const t = this._subParser._addToken(e);
				t && (this._endSubExpression(), this._state = t)
			} else {
				if (!t.operatorTypes[e.tokenType]) {
					if (this._endState[e.tokenType]) return this._endState[e.tokenType];
					throw new Error(`Token ${e.element} (${e.tokenType}) unexpected in expression: ${this._exprStr}`)
				} {
					const n = t.operatorTypes[e.tokenType],
						r = Xt[e.tokenType];
					r && r.call(this, e), n.toState && (this._state = n.toState)
				}
			}
			return !1
		}
		addTokens(e) {
			e.forEach(this._addToken, this)
		}
		buildAst() {
			return this._subParser && this._endSubExpression(), this._state = "complete", this._position ? this._tree : null
		}
		_startSubExpression(e) {
			const {
				endStates: t
			} = Jt[this._state];
			this._subParser = new Bt(this._grammar, e, t)
		}
		_endSubExpression() {
			Jt[this._state].subHandler.call(this, this._subParser.buildAst()), this._subParser = null
		}
		setPositionInAST(e) {
			this._position ? (this._position.right = e, Bt._setParent(e, this._position)) : this._tree = e, this._position = e
		}
	}
	const Ht = Bt,
		Wt = "identifier",
		qt = {
			operatorType: "binaryOperator",
			precedence: 1,
			evaluate: (e, t) => e && t
		},
		zt = {
			operatorType: "binaryOperator",
			precedence: 1,
			evaluate: (e, t) => e || t
		},
		Yt = {
			">": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e > t
			},
			">=": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e >= t
			},
			"<": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e < t
			},
			"<=": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e <= t
			},
			"==": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e === t
			},
			"!=": {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e !== t
			},
			"!": {
				operatorType: "unaryOperator",
				precedence: 999,
				evaluate: e => {
					let {
						value: t
					} = e;
					return "true" !== t && "false" !== t || (t = "true" === t), !t
				}
			},
			"(": {
				operatorType: "openParenthesis"
			},
			")": {
				operatorType: "closeParenthesis"
			},
			"&&": qt,
			AND: qt,
			and: qt,
			"||": zt,
			OR: zt,
			or: zt,
			CONTAINS: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e.includes(t)
			},
			NOT_CONTAINS: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => !e.includes(t)
			},
			STARTS_WITH: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e.startsWith(t)
			},
			NOT_STARTS_WITH: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => !e.startsWith(t)
			},
			ENDS_WITH: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => e.endsWith(t)
			},
			NOT_ENDS_WITH: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => !e.endsWith(t)
			},
			IS_NULL: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: e => !e
			},
			IS_NOT_NULL: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: e => !!e
			},
			IS_IN_LIST: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => t.split(",").includes(e)
			},
			IS_NOT_IN_LIST: {
				operatorType: "binaryOperator",
				precedence: 2,
				evaluate: (e, t) => !t.split(",").includes(e)
			}
		},
		Kt = {
			BinaryExpression: function(e) {
				const t = [];
				let n = "";
				return t[0] = this.evaluateAST(e.left), e.left.operationType === Wt && this._context && (n = this._context.getFieldMetadata(e.left.value.substring(1))?.type ?? ""), t[1] = e.right ? this.evaluateAST(e.right, n) : "", this._grammar[e.operator].evaluate(t[0], t[1])
			},
			identifier: function(e) {
				return this._localDataObject ? this._localDataObject[e.value.substring(1)] : this._context.getValue(e.value) ?? ""
			},
			literal: function(e, t) {
				return !(void 0 === t || "" === t || "True-False" === t) || "true" !== e.value && "false" !== e.value ? e.value : "true" === e.value
			},
			UnaryExpression: function(e) {
				return this._grammar[e.operator].evaluate(e.right)
			}
		},
		Xt = {
			unaryOperator: function(e) {
				this.setPositionInAST({
					operationType: "UnaryExpression",
					operator: e.value
				})
			},
			binaryOperator: function(e) {
				const {
					precedence: t
				} = this._grammar[e.value];
				let n = this._position._parent;
				for (; n && n.operator && this._grammar[n.operator].precedence >= t;) this._position = n, n = n._parent;
				const r = {
					operationType: "BinaryExpression",
					operator: e.value,
					left: this._position
				};
				Ht._setParent(this._position, r), this._position = n, this.setPositionInAST(r)
			},
			identifier: function(e) {
				const t = {
					operationType: Wt,
					value: e.value
				};
				this.setPositionInAST(t)
			},
			literal: function(e) {
				this.setPositionInAST({
					operationType: "literal",
					value: e.value
				})
			},
			subExpression: function(e) {
				this.setPositionInAST(e)
			}
		},
		Jt = {
			expectOperand: {
				operatorTypes: {
					literal: {
						toState: "expectBinOp"
					},
					identifier: {
						toState: Wt
					},
					unaryOperator: {},
					openParenthesis: {
						toState: "subExpression"
					}
				}
			},
			expectBinOp: {
				operatorTypes: {
					binaryOperator: {
						toState: "expectOperand"
					}
				}
			},
			identifier: {
				operatorTypes: {
					binaryOperator: {
						toState: "expectOperand"
					}
				}
			},
			subExpression: {
				subHandler: Xt.subExpression,
				endStates: {
					closeParenthesis: "expectBinOp"
				}
			}
		},
		Qt = ["binaryOperator", "unaryOperator", "openParenthesis"],
		Zt = /^\s*$/,
		en = /^[a-zA-Z_.$][(0-9)a-zA-Z0-9_.$]*$/,
		tn = /\\\\/,
		nn = ["'(?:(?:\\\\')|[^'])*'", '"(?:(?:\\\\")|[^"])*"', "\\s+", "\\btrue\\b", "\\bfalse\\b"],
		rn = ["[a-zA-Z_.\\$][(0-9)a-zA-Z0-9_.\\$]*", "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}|[0-9]{4}-[0-9]{2}-[0-9]{2}", "(?:(?:[0-9]*\\.[0-9]+)|[0-9]+)"],
		an = /^-?(?:(?:[0-9]*\.[0-9]+)|[0-9]+)$/;
	class sn {
		constructor(e) {
			this._grammar = e
		}
		static _isNegative(e) {
			return Qt.some((t => t === e[e.length - 1].tokenType))
		}
		static _isWhitespace(e) {
			return !!e.match(Zt)
		}
		static _createWordboundary(e) {
			return (e = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).match(en) && (e = `\\b${e}\\b`), e
		}
		static _unquote(e) {
			const [t] = e, n = new RegExp(`\\\\${t}`, "g");
			return e.substr(1, e.length - 2).replace(n, t).replace(tn, "\\")
		}
		_getSplitRegex() {
			if (!this._splitRegex) {
				const e = Object.keys(this._grammar).sort(((e, t) => t.length - e.length)).map((e => sn._createWordboundary(e)), this);
				this._splitRegex = new RegExp(`(${[nn.join("|"),e.join("|"),rn.join("|")].join("|")})`)
			}
			return this._splitRegex
		}
		_splitExpression(e) {
			const t = this._getSplitRegex();
			return e.split(t).filter((e => e))
		}
		_createToken(e) {
			const t = {
				tokenType: "literal",
				value: e,
				element: e
			};
			return '"' === e[0] || "'" === e[0] ? t.value = sn._unquote(e) : e.match(an) ? t.value = parseFloat(e) : "true" === e || "false" === e ? t.value = "true" === e : this._grammar[e] ? t.tokenType = this._grammar[e].operatorType : e.match(en) && (t.tokenType = "identifier"), t
		}
		_getTokens(e) {
			const t = [];
			let n = !1;
			for (let r = 0; r < e.length; r += 1) sn._isWhitespace(e[r]) ? t.length && (t[t.length - 1].element += e[r]) : "-" === e[r] && sn._isNegative(t) ? n = !0 : (n && (e[r] = `-${e[r]}`, n = !1), t.push(this._createToken(e[r])));
			return t
		}
		tokenize(e) {
			const t = this._splitExpression(e);
			return this._getTokens(t)
		}
	}
	const on = sn;
	const cn = class {
			constructor(e, t) {
				this._grammar = {
					...Yt
				}, this._expression = e, this._ast = null, this._context = {}, this._localDataObject = t
			}
			buildAST() {
				const e = new on(this._grammar).tokenize(this._expression),
					t = new Ht(this._grammar);
				return t.addTokens(e), this._ast = t.buildAst(), this
			}
			evaluate(e) {
				return this._context = e, this.evaluateAST(this._ast)
			}
			evaluateAST(e, t) {
				return Kt[e.operationType].call(this, e, t)
			}
		},
		dn = (e, t) => {
			const n = e.replace(/[a-zA-Z0-9_)"'\s]=[a-zA-Z0-9_("'\s]/, (e => e.replace("=", "==")));
			return new cn(n, t)
		},
		ln = e => !e || e.buildAST(),
		un = (e, t) => !e || e.evaluate(t),
		pn = (e, t, n) => {
			const r = dn(e, t),
				a = ln(r);
			return un(a, n)
		};
	const hn = class {
			static handleExpression(e, t, n, r) {
				const a = this.getContext(e, r);
				_({
					actionObject: {
						action: "decexp",
						params: {
							source: e,
							value: t,
							targets: n
						},
						context: a
					}
				}).then((e => e.json())).then((e => {
					this.updateState(e, r)
				})).catch((e => window.console.log(e)))
			}
			static getContext(e, t) {
				const n = e.substring(0, e.indexOf("."));
				return {
					name: n,
					class: $p.getProperyValue(`${n}.pxObjClass`, null, t) || $p.getProperyValue(`${n}.pyClassName`, null, t)
				}
			}
			static updateState(e, t) {
				Object.keys(e).forEach((n => op({
					type: Pe,
					payload: {
						context: t,
						reference: n,
						value: e[n]
					}
				})))
			}
		},
		gn = {},
		fn = (e, t) => gn[t] && Object.prototype.hasOwnProperty.call(gn[t], e),
		yn = e => {
			const {
				context: t
			} = e;
			fn(e.reference, t) && hn.handleExpression(e.reference, e.value, gn[t][e.reference], t)
		},
		mn = (e = {}) => {
			_p.copy(e, gn)
		},
		In = (e, t, n) => pn(e, t, n?.pConnect.getPConnect());
	const En = new class {
			constructor() {
				this._dataSourceMap = {}
			}
			hasContextName(e) {
				return e in this._dataSourceMap
			}
			addContextName(e, t) {
				t && Object.keys(t).length > 0 ? this._dataSourceMap[e] = t : this._dataSourceMap[e] = {}
			}
			getContextObjectByName(e) {
				return e in this._dataSourceMap ? this._dataSourceMap[e] : null
			}
			deleteContextName(e) {
				this.hasContextName(e) && delete this._dataSourceMap[e]
			}
			addOrUpdatePropertyInContext(e, t, n) {
				if (this.hasContextName(e)) {
					const r = this.getContextObjectByName(e);
					if (Array.isArray(n)) r[t] = n;
					else {
						const e = r[t];
						r[t] = [...new Set([...e, n])]
					}
				} else {
					const r = {};
					Array.isArray(n) ? r[t] = n : r[t] = [n], this.addContextName(e, r)
				}
			}
			deletePropertyInContext(e, t) {
				if (this.hasContextName(e)) {
					const n = this.getContextObjectByName(e);
					t in n && delete n[t]
				}
			}
			getPropertyFromContext(e, t) {
				if (this.hasContextName(e)) {
					const n = this.getContextObjectByName(e);
					if (t in n) return n[t]
				}
				return []
			}
			getDependencies(e, t) {
				const n = this.getPropertyFromContext(e, t),
					r = new Set(n);
				return n.forEach((e => {
					r.add(e)
				})), [...r]
			}
		},
		An = e => {
			if (e) {
				const {
					stageID: t,
					stages: n = []
				} = e, r = n.length;
				for (let e = 0; e < r; e += 1) {
					if (n[e].ID === t) return "create" === n[e].transitionType && "active" === n[e].visited_status
				}
			}
			return !1
		},
		_n = (e, t) => {
			if (e && t) {
				const n = _p.getIn(t, ["assignments", "0", "assigneeInfo"], {}),
					{
						ID: r,
						type: a
					} = n;
				return "worklist" === a?.toLowerCase() && r === e
			}
			return !1
		},
		Sn = e => {
			const {
				activeActionID: t,
				availableActions: n
			} = e || {};
			if (t && n) {
				const e = n.find((e => e.ID === t));
				return Boolean(e)
			}
			return !1
		},
		Cn = (e, t) => {
			const n = $p.getProperyValue(H.CASE_INFO.ACTIVE_ACTION_ID, t, e),
				r = $p.getProperyValue(H.CASE_INFO.AVAILABLEACTIONS, t, e);
			let a = !1;
			if (r && n) {
				const e = r.find((e => e.ID === n));
				e && (a = e.type.toLowerCase() === H.LOCAL_ACTION_TYPE.CASE_WIDE.toLowerCase())
			}
			if (e && !r) {
				const t = ip(e);
				a = t?.context_data?.actionType === W.CASE
			}
			return a
		},
		$n = e => up(null, W.CASE_VIEW_MODE_PROP, e) === W.PERFORM_MODE && (e.includes(W.WORKAREA) || e.includes(W.MODAL)),
		bn = e => {
			const t = e?.parentCaseInfo?.ID;
			return Boolean(e && t)
		},
		Pn = (e, t, n) => {
			let r;
			const a = e?.find((e => e.ID === t))?.actions,
				s = a?.filter((e => e.ID === W.FIX_BROKEN_ASSIGNMENTS)) || [];
			return r = n && s?.length > 0 ? s[0].ID : n || ((e, t) => {
				if (!Array.isArray(e) || !t) throw new Error("Invalid parameters passed to getAssignmentActionID API");
				return e.find((e => e.ID === t))?.actions?.[0]?.ID
			})(e, t), r
		},
		On = (e, t, n) => {
			let r, a, s, o, i, c, d;
			const l = ip(e);
			return n?.isTriggeredFromDifferentContext ? (r = l.caseInfo.assignments[0].ID, a = l.caseInfo.ID, s = l.caseInfo.assignments, o = l.caseInfo.activeActionID, i = l.caseInfo.availableActions, c = l.caseInfo, d = l.caseInfo.businessID) : (r = t.getValue(H.CASE_INFO.ASSIGNMENT_ID), a = t.getValue(H.CASE_INFO.CASE_INFO_ID), s = t.getValue(H.CASE_INFO.ASSIGNMENTS), o = t.getValue(H.CASE_INFO.ACTIVE_ACTION_ID), i = t.getValue(H.CASE_INFO.AVAILABLEACTIONS), c = t.getValue(H.CASE_INFO.CASE_INFO), d = t.getValue(H.CASE_INFO.BUSINESS_ID)), {
				assignmentID: r,
				caseID: a,
				assignments: s,
				localActionID: o,
				caseActions: i,
				caseInfo: c,
				businessID: d
			}
		};
	const Tn = new class {
		constructor() {
			this.contextArray = {}, this.pauseDuration = 2e3, this.waitingToPutUpIndicator = !1
		}
		getLoadingContext(e) {
			let t = null;
			return e && (({
				context: t
			} = e), t || (t = e.containerItemID), t || (t = e.contextName)), t
		}
		enableLoadingIndicator(e, t = !0) {
			const n = this.getLoadingContext(e);
			n && (this.addToContextArray(n), this.waitingToPutUpIndicator || (this.waitingToPutUpIndicator = !0, this.pauseBeforeShowing(n).then((e => {
				t && void 0 !== this.contextArray[e] && this.contextArray[e] > 0 && op({
					type: we,
					payload: {
						context: e
					}
				})
			}))))
		}
		pauseBeforeShowing = e => new Promise((t => setTimeout((() => t(e)), this.pauseDuration)));
		disableLoadingIndicator(e, t = !0) {
			const n = this.getLoadingContext(e);
			n && (this.waitingToPutUpIndicator = !1, this.removeFromContextArray(n), t && void 0 !== this.contextArray[n] && 0 === this.contextArray[n] && op({
				type: Me,
				payload: {
					context: n
				}
			}))
		}
		addToContextArray = e => {
			void 0 === this.contextArray[e] && (this.contextArray[e] = 0), this.contextArray[e] += 1
		};
		removeFromContextArray = e => {
			void 0 !== this.contextArray[e] && this.contextArray[e] > 0 && (this.contextArray[e] -= 1)
		}
	};
	const vn = new class {
			constructor() {
				this.counterActionMgrId = 0, this.actionMgrActions = []
			}
			getNextActionMgrId() {
				return this.counterActionMgrId += 1, this.counterActionMgrId.toString()
			}
			register(e, t, n, r, a = "unknown", s, o = !0) {
				if (void 0 !== this.actionMgrActions[e]) return null;
				const i = {
					actionType: a,
					promise: t,
					resolve: n,
					reject: r,
					actionPayload: s
				};
				return this.actionMgrActions[e] = i, o && Tn.enableLoadingIndicator(i.actionPayload), e
			}
			actionManagerPromise = (e, t = null) => {
				let n, r;
				null === t && (t = this.getNextActionMgrId());
				const a = new Promise(((e, t) => {
					n = e, r = t
				}));
				return this.register(t, a, n, r, e), {
					actionMgrID: t,
					promise: a
				}
			};
			resolveActionByID(e, t, n = !0) {
				const r = this.actionMgrActions[e];
				let a = e;
				return r ? (setTimeout((() => {
					r.resolve(t)
				}), 0), Tn.disableLoadingIndicator(r.actionPayload, n)) : a = null, a
			}
			rejectActionByID(e, t = !0, n) {
				const r = this.actionMgrActions[e];
				let a = e;
				return r ? (r.reject(n), Tn.disableLoadingIndicator(r.actionPayload, t)) : a = null, a
			}
		},
		Nn = {
			REFRESH_DATA: "REFRESH_DATA",
			WHENS: "WHENS",
			DECLARE_EXPRESSIONS: "DECLARE_EXPRESSIONS"
		},
		Rn = e => ({
			type: Nn.REFRESH_DATA,
			payload: e
		}),
		Dn = {},
		xn = (e, t, n, r, a) => {
			if (!(e && n && t)) return;
			const s = a.actionMgrID || vn.getNextActionMgrId(),
				o = {
					ID: e,
					actionID: t,
					context: n,
					caseWideAction: r,
					options: {
						...a,
						actionMgrID: s
					}
				};
			a.isFillFormWithAI ? op((e => ({
				type: Ut,
				payload: e
			}))(o)) : op(Rn(o))
		},
		wn = (e, t, n, r, a) => {
			if (!(e && n && t)) return;
			r && (r = _p.convertPageRefToClipboardPageNotation(r));
			op(Rn({
				ID: e,
				viewID: t,
				context: n,
				options: a,
				caseViewAction: !0,
				interestPage: r
			}))
		},
		Mn = (e, t, n) => {
			Dn[t] || (Dn[t] = {}), Dn[t][e] || (Dn[t][e] = {
				pageReference: n
			})
		},
		Ln = (e, t) => {
			const n = {
				pageName: (r = t.substring(t.lastIndexOf(" ") + 1)).substring(0, r.lastIndexOf(".")),
				propertyName: r.substring(r.lastIndexOf(".") + 1)
			};
			var r;
			const a = wu(n.propertyName, e.getValue(W.CLASS_ID, n.pageName));
			return !!a?.isDeclarativeTarget
		},
		jn = e => {
			let t = !1;
			if (e.isWhenExist()) t = !0;
			else {
				const n = e.getRawMetadata().config?.value;
				if (n) {
					const r = wu(fe.getLeafPropertyName(n), $p.resolveClassID(n, e.getPageReference(), e.getContextName()));
					t = !!r?.isDeclarativeTarget, !t && r?.datasource?.parameters && (t = ((e, t) => {
						let n = !1;
						if (t && Array.isArray(t)) {
							const r = t => {
								const r = t.value;
								return r.startsWith("@P") && (n = Ln(e, r)), n
							};
							t.some(r)
						} else if (t && "object" == typeof t)
							for (const r in t)
								if (t[r].startsWith("@P") && (n = Ln(e, t[r]), n)) break;
						return n
					})(e, r?.datasource?.parameters))
				}
			}
			t && Mn(e.getCurrentView(), e.getContextName(), e.getPageReference())
		},
		Un = (e, t, n) => {
			const r = Cn(e, t),
				a = $p.getProperyValue(H.CASE_INFO.ACTIVE_ACTION_ID, t, e) ? $p.getProperyValue(H.CASE_INFO.ACTIVE_ACTION_ID, t, e) : $p.getProperyValue(H.CASE_INFO.ASSIGNMENTACTION_ID, t, e);
			let s;
			s = r ? $p.getProperyValue(H.CASE_INFO.CASE_INFO_ID, t, e) : $p.getProperyValue(H.CASE_INFO.ASSIGNMENT_ID, t, e) ? $p.getProperyValue(H.CASE_INFO.ASSIGNMENT_ID, t, e) : $p.getProperyValue(H.CONTEXT_DATA_ASSIGNMENTID, t, e), xn(s, a, e, r, n)
		},
		Fn = e => {
			const {
				context: t,
				pageReference: n
			} = e, r = (e => Dn[e] && Object.keys(Dn[e]).length > 0 && $n(e))(t);
			if (!r) return;
			if ($p.getProperyValue(W.CONTEXT_DATA_MODAL_VIEW.IS_MULTI_RECORD_DATA, n, t)) {
				const e = $p.getProperyValue(H.CASE_INFO.CASE_INFO_ID, n, t),
					r = $p.getProperyValue(W.CONTEXT_DATA_MODAL_VIEW.VIEW_NAME, n, t),
					a = $p.getProperyValue(W.CONTEXT_DATA_MODAL_VIEW.INTERESTPAGE, n, t);
				wn(e, r, t, a, {})
			} else Un(t, n, {})
		},
		kn = (e, t) => (e?.options?.refreshFor && (t += `?refreshFor=${e?.options?.refreshFor}`), e?.options?.isFillFormWithAI && (t += "?fillFormWithAI=true"), t);
	const Vn = class {
		static formatPageReference(e) {
			const t = e?.split(".").map((e => {
				if (e.includes("[")) {
					const t = e.indexOf("["),
						n = e.indexOf("]"),
						r = e.substring(t + 1, n),
						a = Number(r) + 1;
					return `${e.substring(0,t)}(${a})${e.substring(n+1)}`
				}
				return e
			}));
			return t.join(".")
		}
		static getFieldLabel(e) {
			let t = e.getConfigProps().label;
			if (!t && "function" == typeof e.getInheritedProps) {
				const n = e.getInheritedProps();
				(n.showLabel ?? 1) && (t = n.label)
			}
			return t
		}
	};
	class Gn {
		constructor(e, t) {
			this.type = e, this.name = t, this.parent = null, this.children = [], this.eventSubscribers = [], this.value = "", this.previousValue = "|~#-old-#~|", this.references = new Map
		}
		addReference(e, t) {
			this.references.set(e, t)
		}
		getReference(e) {
			return this.references.get(e)
		}
		getNode(e, t) {
			return this.children.find((n => n.type === e && n.name === t))
		}
		addNode(e, t) {
			let n = this.getNode(e, t);
			return n || (n = new Gn(e, t), n.parent = this, this.children.push(n)), n
		}
		addEventListener(e) {
			this.eventSubscribers.push(e)
		}
		triggerEvent(e) {
			this.eventSubscribers.forEach((t => {
				t(e)
			})), this.parent && this.parent.triggerEvent(e)
		}
		setPreviousDefaultValue() {
			"|~#-old-#~|" === this.previousValue && (this.previousValue = this.value)
		}
	}
	const Bn = Gn,
		Hn = e => {
			if ((e?.split(".") ?? []).length < 3) return [e];
			let t, n = e?.split("]")[0]?.split(".")?.pop();
			return n = `${n}]`, e = e?.split(n)[0], e = e?.substring(0, e.length - 1), [n, t] = n.split("["), t = t?.split("]")[0], [e, n, t]
		};
	const Wn = new class {
			constructor() {
				this.rootNodes = {}
			}
			_isContextNodeExist(e) {
				return Object.keys(this.rootNodes).includes(e)
			}
			addContextNode(e) {
				if (!this._isContextNodeExist(e)) {
					const t = new Bn("CONTEXT", e);
					this.rootNodes[e] = t
				}
				return this.rootNodes[e]
			}
			getContextNode(e) {
				return this.rootNodes[e]
			}
			addPageNode(e, t) {
				return this.addContextNode(e).addNode("PAGE", t)
			}
			_addParentViewNode(e, t, n) {
				const r = this.addContextNode(e).addNode("PAGE", t);
				let a = r.getReference(n);
				return a || (a = r.addNode("VIEW", n), r.addReference(n, a)), a
			}
			addViewNode(e, t, n, r) {
				const a = this.addContextNode(e).addNode("PAGE", t);
				let s = null;
				if (r && n !== r) {
					s = this._addParentViewNode(e, t, r).addNode("VIEW", n)
				} else s = a.addNode("VIEW", n);
				return a.addReference(n, s), s
			}
			getViewNode(e, t, n) {
				return this.getContextNode(e)?.getNode("PAGE", t)?.getReference(n)
			}
			addPageListNode(e, t, n, r) {
				r.startsWith(".") && (r = r.substring(1));
				const a = this.addContextNode(e),
					s = a.addNode("PAGE", t)?.getReference(n)?.addNode("PAGELIST", r);
				return s && a.addReference(`${t}.${r}`, s), s
			}
			getPageListNode(e, t, n, r) {
				return this.getContextNode(e)?.getNode("PAGE", t)?.getReference(n)?.getNode("PAGELIST", r)
			}
			getFieldNode(e, t, n, r) {
				return this.getViewNode(e, t, n)?.getNode("FIELD", r)
			}
			addFieldNode(e, t, n, r, a) {
				const s = this.addContextNode(e),
					[o] = Hn(t);
				let i = s.addNode("PAGE", o)?.getReference(n);
				i || (i = this.addViewNode(e, t, n));
				const c = i.addNode("FIELD", `${t}${r}`);
				if (c) {
					const e = `${o}${r}`,
						n = `${t}${r}`;
					s.addReference(e, c), s.addReference(n, c), c.value = a, c.setPreviousDefaultValue()
				}
				return c
			}
			removeContextTreeNode(e) {
				delete this.rootNodes[e]
			}
			onViewMutate(e, t, n, r) {
				this.getViewNode(e, t, n)?.addEventListener(r)
			}
			mutateField(e, t, n, r) {
				const a = this.getContextNode(e),
					[s, o, i] = Hn(t);
				n.startsWith(".") && (n = n.substring(1)), o && this.mutatePageList(e, s, o, {
					...r,
					rowIndex: i
				}), a?.getReference(`${t}.${n}`)?.triggerEvent(r)
			}
			onPageListMutate(e, t, n, r, a) {
				this.getPageListNode(e, t, n, r)?.addEventListener(a)
			}
			mutatePageList(e, t, n, r) {
				const a = this.getContextNode(e);
				a?.getReference(`${t}.${n}`)?.triggerEvent(r)
			}
			getFieldsList(e) {
				const t = this.getContextNode(e);
				return t?.references
			}
			getFieldReferencePreviousValue(e, t) {
				return this.getContextNode(e)?.references?.get(t)?.value
			}
			updateFieldNodeValue(e, t, n) {
				const r = this.getContextNode(e)?.references?.get(t);
				r && (r.previousValue = r.value, void 0 === r.value && (r.previousValue = n), r.value = n)
			}
		},
		qn = {
			CONTENT_FIELDS_PATH: [W.CONTEXT_DATA, W.CASE_INFO.CASE_INFO, W.CONTENT],
			FIELD_MESSAGES_PATH: [W.CONTEXT_DATA, W.CASE_INFO.CASE_INFO, W.CONTENT, W.SUMMARY_OF_MESSAGES, W.PROPERTY_MESSAGES],
			PAGE_MESSAGES_PATH: [W.CONTEXT_DATA, W.SUMMARY_OF_MESSAGES, W.PAGE_MESSAGES],
			HTTP_MESSAGES_PATH: [W.CONTEXT_DATA, W.SUMMARY_OF_MESSAGES, W.HTTP_MESSAGES],
			CASE_MESSAGE_PATH: [W.CASEMESSAGES]
		},
		zn = (e = "", t = "", n, r) => {
			let a, s = [];
			null !== e && (a = (e => e?.startsWith(".") ? e.substring(1).split(".") : e.split("."))(e));
			const o = t && t.startsWith(".") ? t.substr(1) : t;
			if (n === W.PROPERTY && e || e) {
				s = [W.CONTEXT_DATA, ...o.split(".")];
				for (let e = 0; e < a.length - 1; e += 1) s.push(a[e]);
				s.push(W.SUMMARY_OF_MESSAGES, W.PROPERTY_MESSAGES, a[a.length - 1])
			} else n === H.PAGE ? s = [...qn.PAGE_MESSAGES_PATH] : n === W.HTTP ? s = [...qn.HTTP_MESSAGES_PATH] : n === W.CASEMESSAGES ? s = [...qn.CASE_MESSAGE_PATH] : r && (s = [W.CONTEXT_DATA, ...o.split(".")]);
			return s.filter(Boolean)
		},
		Yn = (e, t, n) => {
			const r = {
					content: {}
				},
				a = `${t}[${n}]`;
			return e?.content[a] && (r.content = {
				[a]: e.content[a]
			}), r
		},
		Kn = (e, t, n, r, a, s, o = {}) => {
			const i = ((e, t, n) => t < n ? e.filter((e => parseInt(e.match(/\d+/)[0], 10) > t && parseInt(e.match(/\d+/)[0], 10) <= n)) : e.filter((e => parseInt(e.match(/\d+/)[0], 10) < t && parseInt(e.match(/\d+/)[0], 10) >= n)))(n, r, a),
				c = r > a ? "up" : "down";
			i && i?.length > 0 && i?.forEach((n => {
				const r = parseInt(n.match(/\d+/)[0], 10),
					a = `${s}[${r}]`;
				o[`${s}[${r+("up"===c?1:-1)}]`] = _p.getIn(e[t], [W.CONTEXT_DATA, ...a.split(".")]), _p.deleteIn(e[t], [W.CONTEXT_DATA, ...a.split(".")])
			}));
			const d = Object.keys(o);
			d.length > 0 && d.forEach((n => {
				_p.setIn(e[t], [W.CONTEXT_DATA, ...n.split(".")], o[n])
			}))
		},
		Xn = (e, t, n, r, a) => {
			const s = _p.deepClone(_p.getIn(e, [`${t}`])),
				o = _p.getIn(s, [W.CONTEXT_DATA, W.CASE_INFO.CASE_INFO]);
			if (!o) return;
			const i = n.substring(0, n.lastIndexOf(".")),
				c = n.substring(n.lastIndexOf(".") + 1),
				d = ((e, t, n) => {
					const r = _p.getIn(e, [W.CONTEXT_DATA, ...n.split(".")]);
					return Object.keys(r).filter((e => e.includes(`${t}[`)))
				})(s, c, i);
			if (0 === d.length) return;
			if (Yn(o, c, r).content[`${c}[${r}]`]) {
				const o = {},
					i = `${n}[${r}]`,
					c = _p.getIn(s, [W.CONTEXT_DATA, ...i.split(".")]);
				o[`${n}[${a}]`] = c, _p.deleteIn(e[t], [W.CONTEXT_DATA, ...i.split(".")]), Kn(e, t, d, r, a, n, o)
			} else Kn(e, t, d, r, a, n)
		},
		Jn = e => {
			const {
				type: t,
				property: n,
				category: r,
				context: a,
				pageReference: s
			} = e;
			let o;
			n && (o = n.slice(1));
			const i = ip(a);
			let c = [];
			const d = _p.getIn(i, zn(o, s, r));
			return t && "all" !== t ? (d && Array.isArray(d) && d.length > 0 && (c = d.filter((e => e.type === t))), t === H.MESSAGES.MESSAGES_TYPE_ERROR && c.length > 0 && n && Wn.mutateField(a, s, n, {
				messages: [...c],
				type: H.MESSAGES.MESSAGES_TYPE_ERROR,
				fieldName: n
			}), c) : d
		},
		Qn = e => {
			const {
				property: t,
				pageReference: n,
				category: r,
				context: a,
				type: s,
				isListEntry: o,
				clearContextMessages: i,
				deletingIndex: c
			} = e, d = {
				context: a,
				type: s
			};
			t && !o ? (Wn.mutateField(a, n, t, {
				type: $t,
				fieldName: t
			}), d.property = t, d.pageReference = n) : o ? (d.pageReference = n, d.isListEntry = o, d.deletingIndex = c) : d.category = r, op(i ? {
				type: $t,
				payload: {
					stateObj: e.stateObj,
					context: a
				}
			} : {
				type: $t,
				payload: d
			})
		},
		Zn = e => {
			const {
				messages: t,
				property: n,
				pageReference: r,
				category: a,
				context: s
			} = e, o = {
				messages: t,
				context: s
			};
			n ? (o.property = n, o.pageReference = r) : o.category = a, op({
				type: Ct,
				payload: o
			})
		},
		er = (e, t, n) => {
			for (const r of Object.keys(e)) {
				if (t.push(r), r === W.SUMMARY_OF_MESSAGES) n.push([...t]);
				else {
					"object" === typeof e[r] && er(e[r], t, n)
				}
				t.pop()
			}
			return n
		},
		tr = (e, t) => {
			let n = Jn({
				context: W.APP.ROOT,
				category: "HTTP"
			});
			if (e) {
				const e = Jn({
					context: t,
					category: "HTTP"
				});
				n ? e && (n = n.concat(Jn({
					context: t,
					category: "HTTP"
				}))) : n = Jn({
					context: t,
					category: "HTTP"
				})
			}
			return n
		},
		nr = e => {
			let t = null;
			t = Vs(e)[0] ? Ms(Vs(e)[0]) : e, t && Qn({
				context: t,
				stateObj: ip(t),
				clearContextMessages: !0
			})
		},
		rr = {
			addMessages: Zn,
			getValidationErrorMessages: e => {
				const t = ip(e),
					n = [],
					r = _p.getIn(t, [...qn.CONTENT_FIELDS_PATH]) || {};
				return er(r, [], []).forEach((e => {
					const t = _p.getIn(r, [...e, W.PROPERTY_MESSAGES]);
					t && Object.keys(t).forEach((e => {
						t[e].length && t[e][0].type === W.MESSAGES.MESSAGES_TYPE_ERROR && (t[e][0].fieldLabel ? n.push({
							label: `${t[e][0].fieldLabel}:`,
							description: t[e][0].message
						}) : n.push(t[e][0].message))
					}))
				})), n
			},
			getMessages: Jn,
			clearMessages: Qn,
			getRootContainerHttpMessages: tr,
			clearContextMessagesInActiveWorkArea: nr
		},
		ar = rr;
	const sr = class {
		static execute(e, t, n, r) {
			const a = {};
			Object.prototype.hasOwnProperty.call(n, "nonFormProperties") && (n.nonFormProperties.forEach((e => {
				a[e] = n[e], delete n[e]
			})), delete n.nonFormProperties);
			const s = {
					instruction: "INSERT",
					content: {
						..._p.unflatten(n)
					}
				},
				o = JSON.parse(JSON.stringify(s));
			delete o.content.classID;
			return {
				instruction: {
					target: _p.buildInstructionPageReference(r, e),
					content: {
						...o.content
					},
					listIndex: t,
					instruction: "INSERT"
				},
				actionPayload: s,
				displayPropertPayload: a
			}
		}
	};
	const or = class {
		static execute(e, t, n, r, a, s) {
			const o = {
					instruction: "UPDATE",
					content: {
						..._p.unflatten(r)
					}
				},
				i = {
					content: {
						...o.content
					},
					target: _p.buildInstructionPageReference(a, t),
					listIndex: n,
					instruction: "UPDATE"
				};
			return s || op(ah({
				...o,
				listIndex: n - 1,
				context: e,
				referenceList: `${a}${t}`
			})), i
		}
	};
	const ir = class {
		static execute(e, t, n) {
			return {
				target: _p.buildInstructionPageReference(n, e),
				listIndex: t,
				instruction: "DELETE"
			}
		}
	};
	const cr = class {
		static getDeleteAllInstruction(e, t) {
			return {
				instruction: "DELETE ALL",
				target: _p.buildInstructionPageReference(e, t)
			}
		}
		static execute(e, t, n, r) {
			r || op(ah({
				instruction: "DESELECT_ALL",
				context: e,
				referenceList: `${n}${t}`
			}))
		}
	};
	const dr = class {
		static execute(e, t, n, r) {
			return {
				target: _p.buildInstructionPageReference(r, e),
				listMoveToIndex: n,
				listIndex: t,
				instruction: "MOVE"
			}
		}
	};
	const lr = class {
		static execute(e, t, n, r) {
			return {
				content: {
					...{
						..._p.unflatten(n)
					}
				},
				target: _p.buildInstructionPageReference(r, t),
				instruction: "REPLACE"
			}
		}
	};
	const ur = class {
		static execute(e, t) {
			return {
				target: _p.buildInstructionPageReference(t, e),
				instruction: "DELETE"
			}
		}
	};
	const pr = class {
		constructor(e) {
			this.next = null, this.automatic = !1, this.instruction = e, this.previous = null, this.childrenStateMachines = []
		}
	};
	const hr = class {
			constructor(e, t, n) {
				this.target = e, this.pageReference = t, this.contextName = n, this.root = null, this.current = null, this.changeList = {}, this.targetPageReference = t + e, this.children = [], this.visibility = !0
			}
			addChild(e) {
				null === this.current && this.insertNode({}), this.current.childrenStateMachines.push(e)
			}
			insertNode(e) {
				const t = new pr(e);
				null === this.root && (this.root = t), null !== this.current && (t.previous = this.current, this.current.next = t), this.current = t
			}
			buildChildSumbitPageInstructions(e, t) {
				let n = [];
				return e.childrenStateMachines.forEach((e => {
					e.visibility && (n = n.concat(e.buildSubmitPageInstructions(t)))
				})), n
			}
			buildSubmitPageInstructions(e = !1) {
				let t = this.root,
					n = [];
				for (; t;) !t.instruction.instruction || e && t.automatic || n.push(t.instruction), n = [...n, ...this.buildChildSumbitPageInstructions(t, e)], t = t.next;
				return n
			}
			initPageInstructions(e, t, n) {
				const r = e.getValue(this.target) || [];
				t ? r.forEach(((e, r) => {
					t.forEach((t => {
						const a = Br(t),
							s = {};
						let o = !0;
						n && (s[Br(n)] = B(), o = !1);
						const i = {
							[a]: e[a],
							...s
						};
						this.update(i, r + 1, o, {
							isDefault: !0
						})
					}))
				})) : r.forEach(((e, t) => {
					if (n && !e[Br(n)]) {
						const e = {};
						e[Br(n)] = B(), this.update(e, t + 1, !1, {
							isDefault: !0
						})
					}
				}))
			}
			getChangeList() {
				return this.changeList
			}
			initChangeList(e) {
				this.changeList[this.targetPageReference] = this.changeList[this.targetPageReference] || [], this.changeList[this.targetPageReference][e] = this.changeList[this.targetPageReference][e] || {}
			}
			update(e, t, n, r) {
				const a = or.execute(this.contextName, this.target, t, e, this.pageReference, n),
					{
						isDefault: s = !1,
						skipPageinstruction: o
					} = r;
				if (!o) {
					if (this.initChangeList(t - 1), !s) {
						const n = this.changeList?.[this.targetPageReference]?.[t - 1].content;
						this.changeList[this.targetPageReference][t - 1] = yp(_p.deepClone(n), e, r)
					}
					if (this.current?.automatic !== s || this.current?.instruction?.listIndex !== t || "UPDATE" !== this.current?.instruction.instruction) this.insertNode(a), s && (this.current.automatic = !0);
					else {
						const t = this.current.instruction.content;
						this.current.instruction.content = yp(_p.deepClone(t), _p.unflatten(e), r)
					}
				}
			}
			delete(e, t) {
				const n = ir.execute(this.target, e, this.pageReference);
				this.changeList[this.targetPageReference]?.splice(e - 1, 1), this.insertNode(n), t || op(ah({
					instruction: "DELETE",
					listIndex: e - 1,
					context: this.contextName,
					referenceList: `${this.pageReference}${this.target}`
				}))
			}
			insert(e, t, n, r) {
				const {
					instruction: a,
					actionPayload: s = {
						content: {}
					},
					displayPropertPayload: o = {}
				} = sr.execute(this.target, t, e, this.pageReference), {
					isDefault: i = !1
				} = r;
				if (this.initChangeList(t - 1), !i) {
					const n = this.changeList?.[this.targetPageReference]?.[t - 1].content;
					this.changeList[this.targetPageReference][t - 1] = yp(_p.deepClone(n), e, r)
				}
				this.insertNode(a), n || (s.content = {
					...s.content,
					...o
				}, op(ah({
					...s,
					listIndex: t - 1,
					context: this.contextName,
					referenceList: `${this.pageReference}${this.target}`
				}))), i && (this.current.automatic = !0)
			}
			replacePage(e) {
				const t = lr.execute(this.contextName, this.target, e, this.pageReference);
				this.insertNode(t)
			}
			deletePage() {
				const e = ur.execute(this.target, this.pageReference);
				this.insertNode(e)
			}
			move(e, t) {
				const n = this.changeList[this.targetPageReference]?.splice(e - 1, 1);
				this.changeList[this.targetPageReference]?.splice(t - 1, 0, n[0]);
				const r = dr.execute(this.target, e, t, this.pageReference);
				this.insertNode(r), op(ah({
					listIndex: e - 1,
					listMoveToIndex: t - 1,
					context: this.contextName,
					referenceList: `${this.pageReference}${this.target}`,
					instruction: "MOVE"
				}))
			}
			deleteAll(e) {
				const t = cr.getDeleteAllInstruction(this.pageReference, this.target);
				this.changeList[this.targetPageReference] = [], this.insertNode(t), cr.execute(this.contextName, this.target, this.pageReference, e)
			}
			updatePage(e) {
				const t = this.current.instruction.content;
				this.current.instruction.content = yp(_p.deepClone(t), e)
			}
		},
		gr = {},
		fr = {},
		yr = {},
		mr = (e, t, n) => {
			const r = e.getContextName();
			gr[r] || (gr[r] = {}), gr[r][t] || (gr[r][t] = {
				content: []
			}), fr[r] || (fr[r] = [], yr[r] = []), Fr.isStateMachineExist(r, n, t) || Fr.setStateMachine(r, t, n, new hr(t, n, r))
		},
		Ir = e => Vn.formatPageReference(e),
		Er = (e, t) => {
			const n = fr[e],
				r = yr[e],
				a = Br(t),
				s = a?.substring(0, a.indexOf("["));
			r?.indexOf(s) < 0 && yr[e].push(s), n?.indexOf(a) < 0 && fr[e].push(a)
		},
		Ar = e => {
			delete fr[e]
		},
		_r = e => Fr.buildPageInstructionsByContext(e),
		Sr = e => Fr.buildPageInstructionsByContext(e, !0),
		Cr = e => {
			Fr.clearStateMachines(e), delete gr[e]
		},
		$r = (e, t, n, r) => {
			let [, a] = t.split(`${e}[${r}]`);
			"" !== a && void 0 !== a && (a = a.startsWith(".") ? a.substring(1) : a, Object.keys(n).forEach((e => {
				n[`${a}.${e}`] = n[e], delete n[e]
			})))
		},
		br = (e, t, n, r, a) => {
			const {
				skipStateUpdate: s = !1
			} = a, o = n.getContextName(), i = n.getReferenceList(), c = r || n.getPageReference(), d = Ir(i);
			mr(n, d, c), Er(o, `${i}[${t}]`), $r(i, c, e, t);
			const l = {
				instruction: W.LIST_ACTIONS.INSERT,
				content: {
					..._p.unflatten(e)
				}
			};
			delete JSON.parse(JSON.stringify(l)).content.classID;
			Fr.getStateMachine(o, c, d).insert(e, t + 1, s, {})
		},
		Pr = (e, t, n = 0, r = {}) => {
			const {
				skipStateUpdate: a = !0,
				pageRef: s
			} = r, o = t.getContextName();
			let i = t.getReferenceList();
			const c = s || t.getPageReference();
			i || (i = ((e, t) => {
				const n = e.indexOf(H.CONTENT) + H.CONTENT.length,
					r = e.lastIndexOf(`[${t}]`);
				return e.substring(n, r)
			})(c, n));
			const d = Ir(i);
			mr(t, d, c), Er(o, `${i}[${n}]`), $r(i, c, e, n);
			Fr.getStateMachine(o, c, d).update(e, n + 1, a, r)
		},
		Or = (e, t) => {
			const [, n] = e.split("."), r = t?.split(".").pop();
			return n === r
		},
		Tr = (e, t, n) => {
			const r = {};
			return Object.values(e).forEach((e => {
				if (Or(e, n)) {
					let n = _p.getPropertyName(e);
					if (n = n.substr(n.indexOf(".") + 1).split("."), n.length > 1) {
						let e = _p.getIn(t, n) ?? "";
						if (!e) {
							const r = `!P!${n.join(":")}`;
							e = _p.getIn(t, r) ?? ""
						}
						_p.setIn(r, n, e)
					} else {
						const e = _p.getIn(t, n) ?? "";
						r[n[n.length - 1]] = e
					}
				}
			})), r
		},
		vr = (e, t, n, r, a) => {
			const s = e.getValue(t) || {};
			n && Object.keys(s).length > 0 && e.clearErrorMessages({
				property: r ? a : e.getStateProps().value
			})
		},
		Nr = (e, t, n) => new Promise((r => {
			const {
				skipPageInstructions: a = !1
			} = n, {
				selectionMode: s,
				selectionList: o,
				required: i
			} = t.getConfigProps(), c = s === W.LIST_SELECTION_MODE.MULTI, d = t.getContextName();
			let l = t.getPageReference(),
				u = ((e, t, n) => e ? n.substring(1) : t.substring(t.lastIndexOf(".") + 1))(c, l, o);
			const p = t.getRawMetadata();
			let h = null;
			const g = (e => e.config.dataRelationshipContext && "SimpleTableSelect" === e.type && "single" === e.config?.selectionMode)(p);
			g && (u = p.config.dataRelationshipContext, h = l.concat(".").concat(u), l = h);
			const f = ((e, t, n) => e ? `${t}${n}` : t)(c, l, o),
				y = ((e, t, n, r) => t ? e.getFieldMetadata(`${n}`) : e.getCurrentPageFieldMetadata(r))(t, c, u, h),
				{
					datasource: {
						parameters: m = {}
					}
				} = y,
				I = {
					...m
				};
			if (((e, t, n) => {
					t?.descriptors?.length && !n && t.descriptors.forEach((t => {
						let n = _p.getPropertyName(t);
						n = n.substr(n.indexOf(".") + 1).split("."), e[n.join(".")] = t
					}))
				})(I, y, c), c) {
				let n = o;
				n = Ir(n);
				const r = t.getValue(f) || [];
				mr(t, n, l);
				const s = [];
				let i = r.length;
				e.forEach((e => {
					const t = Tr(m, e, u),
						o = {};
					if (Object.prototype.hasOwnProperty.call(e, "displayProperty")) {
						const t = e.displayProperty;
						o[t] = e[t]
					}
					const c = Object.entries(t);
					let p = r.findIndex((e => c.every((([t, n]) => e[t] === n))));
					if (-1 === p ? (p = i, e.$selected && (i += 1)) : i = i ? i - 1 : 0, !a) {
						const r = Fr.getStateMachine(d, l, n);
						e.$selected ? r.insert(t, p + 1, !0, {}) : r.delete(p + 1, !0)
					}
					s.push({
						instruction: e.$selected ? W.LIST_ACTIONS.SELECT : W.LIST_ACTIONS.DESELECT,
						listIndex: p,
						content: {
							...t,
							...o
						}
					})
				})), op(ah({
					instruction: W.LIST_ACTIONS_TYPE.SELECT_DESELECT,
					context: d,
					referenceList: `${l}.${u}`,
					actions: s
				}))
			} else {
				const n = Tr(I, e[0], u),
					r = (e => e.length > 1 ? e.pop() : "")(l.split(/\[\d+\]/gm));
				Object.keys(n).forEach((e => {
					t.getActionsApi().updateFieldValue(`.${e}`, n[`${e}`], g ? {
						contextPageReference: l
					} : {})
				})), t.getActionsApi().triggerFieldChange(r, n)
			}
			vr(t, f, i, c, u), r()
		})),
		Rr = e => {
			if (!e) return !1;
			const t = Sr(e);
			return Array.isArray(t) && t.length > 0
		};
	const Dr = (e, t, n) => {
			const {
				skipStateUpdate: r = !1
			} = n, a = e.getPageReference(), s = Ir(t);
			mr(e, t, a);
			Fr.getStateMachine(e.getContextName(), a, s).deleteAll(r)
		},
		xr = e => ({
			insert: (t, n, r, a = {}) => br(t, n, e, r, a),
			update: (t, n, r) => Pr(t, e, n, r),
			updateProperty: (t, n, r) => ((e, t, n, r) => {
				const a = n.getPageReference(),
					{
						stateMachineTarget: s
					} = Fr.getStateMachineObjByPath(`${a}${e}`, n.getContextName(), !0);
				if (!s) {
					let e = a.substring(0, a.lastIndexOf("["));
					const t = e.substring(e.lastIndexOf("."));
					e = e.substring(0, e.lastIndexOf(".")), e && t && mr(n, t, e)
				}
				Fr.executeStateMachine(n.getContextName(), `${a}${e}`, t, !0, r)
			})(t, n, e, r),
			deleteEntry: (t, n) => ((e, t, n) => {
				const r = t.getContextName(),
					a = t.getReferenceList(),
					s = n || t.getPageReference(),
					o = `${s+a}[${e}]`,
					i = Ir(a);
				Qn({
					type: H.MESSAGES.MESSAGES_TYPE_ERROR,
					pageReference: o,
					context: r,
					isListEntry: !0,
					deletingIndex: e
				}), mr(t, i, s), Er(r, `${a}[${e}]`), Fr.getStateMachine(r, s, i).delete(e + 1);
				const c = Fr.getUnConnectedStateMachines(r) || {};
				Object.keys(c).forEach((t => {
					t.includes(`${s}${i}[${e}]`) && (c[t] = null)
				}))
			})(t, e, n),
			reorder: (t, n) => ((e, t, n) => {
				const r = n.getContextName(),
					a = n.getReferenceList(),
					s = n.getPageReference(),
					o = Ir(a);
				mr(n, o, s), Er(r, `${a}[${t}]`), Fr.getStateMachine(r, s, o).move(e + 1, t + 1)
			})(t, n, e),
			setSelectedRows: (t, n = {}) => Nr(t, e, n),
			getSelectedRows: (t = !1) => ((e, t) => {
				const {
					selectionMode: n,
					selectionList: r
				} = t.getConfigProps(), a = [];
				let s = t.getPageReference();
				const o = n === W.LIST_SELECTION_MODE.MULTI;
				let i = o ? r.substring(1) : s.substring(s.lastIndexOf(".") + 1);
				const c = t.getRawMetadata();
				let d = null;
				c.config.dataRelationshipContext && "SimpleTableSelect" === c.type && "single" === c.config?.selectionMode && (i = c.config.dataRelationshipContext, d = s.concat(".").concat(i), s = d);
				const l = o ? `${s}${r}` : s;
				let u = t.getValue(l) || [];
				if (Array.isArray(u) || (u = [u]), e) return Promise.resolve(u);
				const {
					datasource: {
						parameters: p = {}
					} = {}
				} = o ? t.getFieldMetadata(`${i}`) : t.getCurrentPageFieldMetadata(d);
				return u.forEach((e => {
					const t = Object.values(p).reduce(((t, n) => {
						const r = n.substring(n.lastIndexOf(".") + 1);
						return Or(n, i) && e[r] ? `${t}${e[r]}` : t
					}), "");
					t.trim() && a.push(t.trim())
				})), Promise.resolve(a)
			})(t, e),
			clearSelectedRows: () => function(e) {
				const {
					selectionList: t,
					required: n
				} = e.getConfigProps(), r = e.getContextName(), a = e.getPageReference(), s = t, o = `${a}${t}`;
				return new Promise((t => {
					let i = s;
					i = Ir(i), mr(e, i, a), Fr.getStateMachine(r, a, i).deleteAll(), vr(e, o, n, !0, s), t()
				}))
			}(e),
			setVisibility: t => ((e, t = !0) => {
				const n = e.getContextName(),
					{
						selectionMode: r,
						selectionList: a,
						renderMode: s,
						referenceList: o
					} = e.getComponentConfig();
				let i;
				if (r === W.LIST_SELECTION_MODE.MULTI && a ? i = a : "Editable" === s && o && (i = e.getStateProps().referenceList), i) {
					i = Ir(i);
					const r = Fr.getStateMachine(n, "", `${e.getPageReference()}${i}`);
					r && (r.visibility = t)
				}
			})(e, t),
			initDefaultPageInstructions: (t, n, r) => ((e, t, n, r) => {
				const a = e.getContextName(),
					s = e.getPageReference(),
					o = Ir(t);
				mr(e, o, s), Fr.getStateMachine(a, s, o).initPageInstructions(e, n, r)
			})(e, t, n, r),
			deleteAll: (t, n = {}) => Dr(e, t, n),
			replacePage: (t, n) => ((e, t, n) => {
				const r = e.getPageReference(),
					a = e.getContextName();
				mr(e, t, r), Er(a, _p.buildInstructionPageReference(r, t)), Fr.getStateMachine(a, r, t).replacePage(n)
			})(e, t, n),
			deletePage: t => ((e, t) => {
				const n = e.getPageReference(),
					r = e.getContextName();
				mr(e, t, n), Er(r, _p.buildInstructionPageReference(n, t)), Fr.getStateMachine(r, n, t).deletePage()
			})(e, t)
		});
	const wr = new class {
		constructor() {
			this.fieldDefaults = {}
		}
		updateFieldDefaults(e) {
			e && (Object.keys(this.fieldDefaults).length ? _p.mergeDeep(e, this.fieldDefaults) : _p.copy(e, this.fieldDefaults))
		}
		setFieldDefault(e, t, n) {
			e && t && (this.fieldDefaults[e] = this.fieldDefaults[e] || {}, this.fieldDefaults[e][t] = n)
		}
		getDefaultsforType(e) {
			return this.fieldDefaults[e]
		}
	};
	class Mr {
		constructor() {
			this.validators = {}
		}
		register(e, t) {
			this.validators[e] = t
		}
		getValidator(e) {
			return this.validators[e]
		}
		validateRequired(e, t, n, r, a, s) {
			const o = s.getConfigProps();
			let i = null;
			if (!("true" !== o.required && !0 !== o.required)) {
				let c = r;
				switch (e) {
					case "radiobuttons":
						c = o.value;
						break;
					case "attachment": {
						const e = s.getPageReference().replace(H.CASE_INFO.CASE_INFO_CONTENT, "").replace(H.DATA_INFO.DATA_INFO_CONTENT, "");
						c = (lp(`.attachmentsList${e}.${t.replace(".","")}`, "context_data", a) || []).filter((e => !e.delete)), 0 === c?.length && (c = "");
						break
					}
					case "checkbox":
						c && "false" !== c || (c = "");
						break;
					default:
						"string" == typeof c && (c = c.trim())
				}
				i = this.getValidator("required")(c), Mr.messageDispatcher(t, n, a, i, Vn.getFieldLabel(s))
			}
			return i
		}
		validateType(e, t, n, r, a, s) {
			const o = s.getConfigProps();
			let i = null;
			const c = {
				pageReference: s.getPageReference(),
				context: a,
				property: t,
				target: s.getTarget()
			};
			let d = wr.getDefaultsforType(s.getComponentName())?.["client-validations"];
			!1 !== d && this.getValidator(e) && (i = this.getValidator(e)(r, c), "" !== r && Mr.messageDispatcher(t, n, a, i, o.label));
			const l = o.validationType;
			return d = l && wr.getDefaultsforType(l)?.["client-validations"], !1 !== d && l && this.getValidator(l) && (i = this.getValidator(l)(r, c), Mr.messageDispatcher(t, n, a, i, o.label)), i
		}
		validate(e, t, n, r) {
			const a = r.getContextName();
			let s = null;
			if (!r.getConfigProps().disabled && !r.getConfigProps().readOnly) {
				const o = r.getPageReference();
				r.skipRequiredValidation() || (s = this.validateRequired(e, t, o, n, a, r)), s || (s = this.validateType(e, t, o, n, a, r))
			}
			return {
				message: s
			}
		}
		static messageDispatcher(e, t, n, r, a) {
			if (r) {
				const s = [];
				s.push({
					type: H.MESSAGES.MESSAGES_TYPE_ERROR,
					fieldLabel: a,
					message: r
				}), Zn({
					messages: s,
					property: e,
					pageReference: t,
					context: n
				})
			}
		}
		isValidatorExist(e) {
			return !!e.validatetype
		}
	}
	const Lr = new Mr;
	class jr {
		static getChanges(e) {
			return {
				...ua(e)
			}
		}
		static getPageInstructions(e) {
			return {
				pageInstructions: _r(e)
			}
		}
		static isStateModified(e) {
			return fa(e) || Rr(e) || !!ha(e)
		}
		static isFormValid(e) {
			return ta(e)
		}
		static clearChangedProperties(e) {
			return Cr(e), Ar(e), ma(e)
		}
		static getEditableFields(e) {
			return na(e)
		}
		static setCustomValidator(e, t) {
			Lr.register(e, t)
		}
		static isPropertyEditable(e, t) {
			return jr.getEditableFields(e).some((e => e.name === t))
		}
	}
	const Ur = jr;
	const Fr = new class {
			constructor() {
				this.states = {}, this.unConnectedStates = {}
			}
			getStateMachine(e, t, n) {
				return this.states?.[e]?.[`${t}${n}`] || this.unConnectedStates?.[e]?.[`${t}${n}`]
			}
			isStateMachineExist(e, t, n) {
				return !!this.states?.[e]?.[`${t}${n}`] || !!this.unConnectedStates?.[e]?.[`${t}${n}`]
			}
			getUnConnectedStateMachines(e) {
				return this.unConnectedStates?.[e]
			}
			setStateMachine(e, t, n, r) {
				const a = `${n}${t}`,
					{
						stateMachine: s
					} = this.getStateMachineObjByPath(a, e, !0);
				if (s && s.targetPageReference !== r.targetPageReference) return s.addChild(r), this.unConnectedStates[e] || (this.unConnectedStates[e] = {}), this.unConnectedStates[e][a] || (this.unConnectedStates[e][a] = {}), void(this.unConnectedStates[e][a] = r);
				this.states[e] || (this.states[e] = {}), this.states[e][a] || (this.states[e][a] = {}), this.states[e][a] = r
			}
			buildPageInstructionsByContext(e, t) {
				const n = this.getStateMachinesByContext(e) || {},
					r = [];
				return Object.keys(n).sort().forEach((e => {
					const a = n[e];
					if (a.visibility) {
						const e = a.buildSubmitPageInstructions(t);
						r.push(...e)
					}
				})), r
			}
			buildClientChangeList(e) {
				const t = this.getStateMachinesByContext(e) || {};
				let n = {};
				const r = {};
				return Object.keys(t).forEach((e => {
					const r = t[e].getChangeList();
					n = {
						...n,
						...r
					}
				})), _p.flatten(n, "", r), r
			}
			getStateMachinesByContext(e) {
				return this.states?.[e]
			}
			clearStateMachines(e) {
				this.states[e] = {}, this.unConnectedStates[e] = {}
			}
			setStateMachineEmpty(e, t) {
				this.getStateMachine(e, t, "").root = null;
				const n = this.getUnConnectedStateMachines(e) || {};
				Object.keys(n).forEach((e => {
					e.includes(t) && delete n[e]
				}))
			}
			removeStateMachine(e, t) {
				delete this.states[e]?.[t]
			}
			getStateMachineObjByPath(e, t, n) {
				const r = /\[\d+\]$/gm;
				let a = null;
				for (; e && !this.isStateMachineExist(t, "", e);) a = null, n && e.endsWith("]") ? (a = e.match(r), a = a[a.length - 1].substring(1, a[a.length - 1].length - 1), [e] = e.split(r)) : e = e.substring(0, e.lastIndexOf("."));
				return e ? {
					stateMachineTarget: e,
					stateMachine: this.getStateMachine(t, "", e),
					index: a
				} : {}
			}
			executeStateMachine(e, t, n, r = !0, a = {}) {
				const {
					stateMachineTarget: s,
					index: o
				} = this.getStateMachineObjByPath(t, e, r);
				if (!s) return !1;
				let [, i] = t.split(s);
				if (!i) return !1;
				null !== o && ([, i] = i.split(/^\[\d+\]/gm));
				const c = {
						[Br(i)]: n
					},
					d = this.getStateMachine(e, "", s);
				return null !== o ? d.update(c, Number(o) + 1, a.skipStateUpdate ?? !0, a) : d.updatePage(_p.unflatten(c)), !0
			}
			registerForServerChanges() {
				tp.registerForListChanges(((e, t, n) => {
					t.indexOf(".classID") < 0 && Ur.isPropertyEditable(e, t) && this.executeStateMachine(e, t, n)
				}))
			}
			unRegisterForServerChanges() {
				tp.unRegisterForListChanges()
			}
		},
		kr = {},
		Vr = {},
		Gr = {},
		Br = e => e.startsWith(".") ? e.substring(1) : e,
		Hr = (e = "", t = "") => `${Br(t)}${e?".":""}${Br(e)}`,
		Wr = e => {
			delete kr[e], delete Vr[e], delete Gr[e]
		},
		qr = (e, t, n) => {
			if (kr[e]) {
				const r = kr[e].fieldOrder[t];
				((e, t, n, r) => {
					n && r && n.getStateProps().visibility !== r.getStateProps().visibility && (Gr[e] || (Gr[e] = {}), Gr[e][t] || (Gr[e][t] = {}), Gr[e][t][r.getStateProps().visibility] = r, Gr[e][t][n.getStateProps().visibility] || (Gr[e][t][n.getStateProps().visibility] = n))
				})(e, t, r, n), r && !r.getConfigProps().readOnly && n.getConfigProps().readOnly || (kr[e].fieldOrder[t] = n, r?.isMounted && (kr[e].fieldOrder[t].isMounted = r?.isMounted)), kr[e].fieldOrder[t].isError = r?.isError || !1
			} else kr[e] = {
				fieldOrder: {
					[t]: n
				}
			}, kr[e].fieldOrder[t].isError = !1
		},
		zr = (e, t, n) => {
			let r = t;
			return Gr[e]?.[n] && Object.keys(Gr[e][n]).length && Object.keys(Gr[e][n]).forEach((a => {
				const s = Gr[e][n][a]?.getConfigProps();
				if (s.visibility || !Object.hasOwn(s, "visibility")) {
					const s = Gr[e][n][a];
					s.isMounted = t.isMounted, r = s
				}
			})), r
		},
		Yr = (e, t, n) => {
			const r = Br(t);
			qr(e, r, n)
		},
		Kr = (e, t, n) => {
			if (kr[e]) {
				const r = Br(Hr(t, n)),
					a = zr(e, kr[e].fieldOrder[r], r);
				a && (a.isError = !1, Gr[e]?.[r] && Object.keys(Gr[e][r]).forEach((t => {
					Gr[e][r][t].isError = !1
				})))
			}
		},
		Xr = () => kr,
		Jr = e => {
			const t = e.isExpressionExist(),
				n = e.getConfigProps().visibility,
				r = t && !1 !== n,
				a = !t && (void 0 === n || "true" === n || !0 === n);
			return e.isMounted && (r || a)
		},
		Qr = (e, t) => {
			const n = e.isExpressionExist(),
				r = t.visibility,
				a = n && !1 !== r,
				s = !n && (void 0 === r || "true" === r || !0 === r);
			return e.isMounted && (a || s)
		},
		Zr = e => {
			const t = e.readOnly;
			return !0 === t || "true" === t
		},
		ea = (e, t = {}) => {
			const n = [];
			let r = [];
			const a = [],
				s = Xr(),
				{
					ignoreFieldsInsideList: o = !0
				} = t;
			if (s[e])
				for (const t in s[e].fieldOrder)
					if (Object.hasOwn(s[e].fieldOrder, t)) {
						const a = zr(e, s[e].fieldOrder[t], t),
							i = Jr(a),
							c = a.isInsideList(),
							d = a.getStateProps()?.value || a.getStateProps()?.selectionList;
						if (i && a.isEditable() && !Zr(a.getConfigProps())) {
							const {
								attachmentPageInstructionEnabled: s = !1
							} = PCore.getEnvironmentInfo().environmentInfoObject?.features?.form || {}, i = a.getPageReference().replace(H.CASE_INFO.CASE_INFO_CONTENT, "").replace(H.DATA_INFO.DATA_INFO_CONTENT, ""), l = "Attachment" === a.getMetadata().type && s && "" !== i;
							if ("Attachment" !== a.getMetadata().type || l) {
								if (!l && (!c || c && !o) && !Array.isArray(a.getValue(t))) {
									Fr.executeStateMachine(e, t, a.getValue(d)) || n.push(t)
								}
							} else {
								let n = (PCore.getStoreValue(`.attachmentsList.${d.replace(".","")}`, "context_data", e) || []).filter((e => `${a.options.pageReference}.${e.label}` === t));
								n = _p.buildAttachmentsFormData(n), n.length > 0 && (r = [...r, ...n])
							}
						}
					} if (Vr[e])
				for (const t in Vr[e].fieldOrder) Object.hasOwn(Vr[e].fieldOrder, t) && a.push(t);
			return {
				formInputs: n,
				attachments: r,
				formPageFields: a
			}
		},
		ta = e => {
			const t = Xr();
			let n, r = !0;
			if (t[e])
				for (const a in t[e].fieldOrder)
					if (Object.hasOwn(t[e].fieldOrder, a)) {
						const s = zr(e, t[e].fieldOrder[a], a);
						let o = "value",
							i = s.getStateProps()[o];
						if (!i) {
							const e = s.getComponentConfig();
							"multi" === e.selectionMode ? o = "selectionList" : "Editable" === e.renderMode && (o = "referenceList"), i = s.getStateProps()[o]
						}
						const c = Jr(s),
							d = s.getConfigProps();
						!c || Zr(d) || d.disabled || (s.isError = !1, s.getValidationApi().validate(s.getValue(i))), !n && s.isError && c && (n = a), r && s.isError && c && (r = !1)
					} return r
		},
		na = e => {
			const t = [],
				n = Xr();
			if (n[e])
				for (const r in n[e].fieldOrder)
					if (Object.hasOwn(n[e].fieldOrder, r)) {
						const a = zr(e, n[e].fieldOrder[r], r),
							s = a.getConfigProps();
						if (Qr(a, s) && !Zr(s) && !s?.disabled && "Attachment" !== a.getMetadata()?.type && "multirecordlist" !== a.getMetadata()?.config?.type) {
							const e = s?.label || s?.caption,
								n = a.getComponentName().toLowerCase();
							t.push({
								name: r,
								label: e,
								type: n,
								fieldC11nEnv: a
							})
						}
					} return t
		};
	const ra = class {
		static getPropertyName(e) {
			return fe.getPropertyName(e)
		}
		static isProperty(e) {
			return fe.isProperty(e)
		}
		static getLeafPropertyName(e) {
			return fe.getLeafPropertyName(e)
		}
		static isPropertyInternal(e) {
			return e.startsWith("px") || e.startsWith("pz")
		}
	};
	const aa = class {
		static isPageInstruction(e) {
			return e && e.includes("[") && e.includes("]")
		}
	};
	class sa {
		constructor() {
			this.refreshMap = {}, this.propChangeRefreshMap = {}
		}
		static initializeRefreshCache(e, t, n, r, a) {
			void 0 === e[t] && (e[t] = {}), e[t][n] = [{
				uniqueHash: r,
				callback: a
			}]
		}
		registerForRefresh(e, t, n, r, a) {
			const s = r.split("/").join(W.HASH_DELIMITER),
				o = _p.getHashedString(s);
			if ("PROP_CHANGE" === e)
				if (this.propChangeRefreshMap?.[a]?.[n]) {
					!this.propChangeRefreshMap[a][n].some((e => e.uniqueHash === o)) && this.propChangeRefreshMap[a][n].push({
						uniqueHash: o,
						callback: t
					})
				} else sa.initializeRefreshCache(this.propChangeRefreshMap, a, n, o, t);
			else if (this.refreshMap?.[a]?.[`${e}-${n}`]) {
				!this.refreshMap[a][`${e}-${n}`].some((e => e.uniqueHash === o)) && this.refreshMap[a][`${e}-${n}`].push({
					uniqueHash: o,
					callback: t
				})
			} else sa.initializeRefreshCache(this.refreshMap, a, `${e}-${n}`, o, t)
		}
		triggerRefreshForType(e, t, n) {
			"PROP_CHANGE" === e ? this.propChangeRefreshMap?.[n]?.[t] && this.propChangeRefreshMap[n][t].forEach((e => e.callback())) : this.refreshMap?.[n]?.[`${e}-${t}`] && this.refreshMap[n][`${e}-${t}`].forEach((e => e.callback()))
		}
		deRegisterForRefresh(e) {
			delete this.propChangeRefreshMap[e], delete this.refreshMap[e]
		}
	}
	const oa = new sa,
		{
			APP: ia
		} = W;
	let ca = {},
		da = {};
	const la = "You will lose unsaved changes. Do you want to continue?",
		ua = (e = ia.APP, t, n) => {
			let r = [],
				a = [];
			t || (r = (e => {
				const t = Xr(),
					n = [];
				if (t[e])
					for (const r in t[e].fieldOrder) !Object.prototype.hasOwnProperty.call(t[e].fieldOrder, r) || !1 !== t[e].fieldOrder[r].getConfigProps().visibility && !1 !== t[e].fieldOrder[r].isMounted || n.push(r);
				return n
			})(e)), n || (a = (e => {
				const t = Xr(),
					n = [];
				if (t[e])
					for (const r in t[e].fieldOrder) Object.prototype.hasOwnProperty.call(t[e].fieldOrder, r) && !0 === t[e].fieldOrder[r].getConfigProps().readOnly && n.push(r);
				return n
			})(e));
			const s = {},
				o = ca[e] || {};
			return Object.keys(o).forEach((e => {
				!Object.prototype.hasOwnProperty.call(o, e) || r.includes(e) || a.includes(e) || _p.buildObject(e, s, o[e].value)
			})), s
		},
		pa = e => {
			const {
				context: t
			} = e, n = e.reference.startsWith(".") ? e.reference.substr(1) : e.reference;
			delete ca[t]?.[n]
		},
		ha = e => da[e],
		ga = e => {
			const {
				payload: t
			} = e, {
				context: n,
				initialValue: r = "",
				isStrictTracking: a
			} = t, s = t.reference.startsWith(".") ? t.reference.substr(1) : t.reference;
			ca[n] = ca[n] || {};
			ca[n][s] ? ca[n][s].previousValue = lp(t.reference, null, n) : (ca[n][s] = {
				initialValue: r || lp(t.reference, null, n)
			}, ca[n][s].previousValue = ca[n][s].initialValue), ca[n][s].value = t.value, a && ca[n][s].value === ca[n][s].initialValue && pa(t)
		},
		fa = e => {
			const t = Sr(e) || {};
			return ca[e] && Object.keys(ca[e]).some((t => ca[e][t].initialValue !== ca[e][t].value)) || Object.keys(t).length > 0
		},
		ya = (e, t) => {
			if (!e || !t) return !1;
			const n = ca[e] && ca[e][t];
			return !!n && n.previousValue !== n.value
		},
		ma = e => {
			e && ca[e] ? ca[e] = {} : "all" === e && (ca = {}, da = {}), da[e] && (da[e] = !1)
		},
		Ia = e => e => t => {
			const {
				type: n,
				payload: r = {}
			} = t || {};
			if (n === Te && (yn(r), (e => {
					const t = _p.getPropertyName(e.propertyName),
						{
							context: n,
							pageReference: r,
							value: a
						} = e,
						s = r ? `${r}.${t}` : t;
					tp.triggerCascade(n, s, a);
					const o = En.getDependencies(n, s),
						i = tp.getResetDependencies(n, s),
						c = {
							context: n,
							datapages: {}
						};
					[...o, ...i].forEach((e => {
						const t = _p.getPropertyNameFromDependency(e);
						if ("multiRecord" === e.mode) {
							const e = t.split("."),
								r = `.${e.pop()}`,
								a = e.join(".");
							Fr.getStateMachine(n, a, r).deleteAll(r)
						} else aa.isPageInstruction(t) && Fr.executeStateMachine(n, t, ""), op({
							type: Pe,
							payload: {
								reference: t,
								value: "",
								context: n,
								isArrayDeepMerge: !0,
								isImplicit: !0
							}
						})
					})), o.forEach((t => {
						let a = r;
						t.startsWith(r) || (a = "");
						const s = t.replace(`${a}`, "").split(".").filter((e => !!e));
						s.pop();
						const o = s.join("."),
							i = lp(`.${o}`, a, n)?.classID || e.classID,
							d = wu(t.split(".").pop(), i),
							{
								datasource: l
							} = d,
							u = {};
						let p = [];
						l.parameters.forEach((e => {
							e?.value ? (u[e.name] = ra.isProperty(e.value) ? lp(`.${_p.getFullPropertyReference([o,_p.getPropertyName(e.value)])}`, a, n) : e.value, void 0 === u[e.name] || null === u[e.name] || "" === u[e.name] ? (u[e.name] = "", p.push(W.NULL_STRING)) : p.push(u[e.name])) : (u[e.name] = "", p.push(W.NULL_STRING))
						})), p = l.name.concat(W.UNDERSCORE_STRING, _p.getHashedString(p.join(W.HASH_DELIMITER)));
						const {
							name: h
						} = l, g = Vu(h);
						c.datapages[p] = {
							mode: l.mode,
							propertyName: t,
							name: l.name,
							dataViewParameters: u,
							refreshStrategy: g?.refreshStrategy
						}
					})), o.length && op({
						type: Pt,
						payload: c
					})
				})(r), (ya(r.context, r.reference) || Rr(r.context)) && Fn(r), oa.triggerRefreshForType("PROP_CHANGE", r.reference, r.context)), n === vt) {
				const {
					context: e,
					referenceList: t
				} = r;
				Fn({
					context: e,
					pageReference: t
				})
			}
			if (n === Pe || n === Oe) {
				const {
					reference: e,
					isImplicit: n,
					context: a,
					skipDirtyValidation: s = !1
				} = r;
				Wn.updateFieldNodeValue(a, e, r.value), aa.isPageInstruction(e) || s ? s || (da[`${a}`] = !0) : ga(t), (r.removePropertyFromChangedList || n) && pa(r)
			}
			if (n === nt || n === rt) {
				const {
					transientItemID: e,
					data: t
				} = r;
				_p.iterateLeafNodes(t, (t => {
					pa({
						context: e,
						value: "",
						reference: t.join(".")
					})
				}))
			}
			if (n && [st, Je, it, tt].includes(n)) {
				ma(r.context), tp.purgeResetDependencies(r.context), (e => {
					e && Dn[e] && delete Dn[e]
				})(r.context);
				(r.childContainersContexts || []).forEach((e => {
					ma(e)
				}));
				(r.transientItems || []).forEach((e => {
					ma(e)
				}))
			}
			e(t)
		},
		Ea = (e, t) => {
			e.DeclareExpressions && mn({
				[t.context]: e.DeclareExpressions
			})
		},
		Aa = (e, t, n = !1) => {
			const r = _p.getIn(e, W.RESOURCERS);
			r && ((e => {
				e && Uu(e)
			})(r), Ea(r, t)), n || bh({
				...e,
				options: t
			})
		},
		_a = "component-loader",
		Sa = {},
		Ca = async (e, t) => {
			const n = oe.getLoader(),
				r = t || oe.staticServerURL;
			if (!e || window.PCore && !1 === window.PCore.getBehaviorOverride("dynamicLoadComponents")) return Promise.resolve();
			if (oe.getLoader(_a)) return oe.getLoader(_a)(e, r);
			const a = [];
			return e.forEach((e => {
				if (Sa[e]) return;
				const t = he.getComponent(e);
				if (!t) {
					const t = `${oe.getConstellationServiceUrl()}/v860/${oe.getAppAlias()}/component/${e}.js`;
					return void a.push(n(t, oe.getTypes.SCRIPT))
				}(t.scripts || []).forEach((e => {
					const t = e.startsWith("http") ? e : r + e;
					a.push(n(t, oe.getTypes.SCRIPT))
				}));
				(t.styles || []).forEach((e => {
					a.push(n(r + e, oe.getTypes.STYLE))
				})), Sa[e] = !0
			})), Promise.all(a)
		};
	class $a {
		static actionsTargetMap = new Map;
		static getTargetViewContainerName = e => {
			if (e) {
				const t = e.toLowerCase();
				let n = "primary";
				return this.actionsTargetMap.has(t) && (n = this.actionsTargetMap.get(t)), n
			}
			return ""
		};
		static buildActionTargetMap = e => {
			e && Object.keys(e).forEach((t => {
				const n = e[t];
				n && n.actions && n.actions.forEach((e => {
					this.actionsTargetMap.set(e.toLowerCase(), t)
				}))
			}))
		}
	}
	const ba = $a;
	const Pa = class {
		constructor(e, t, n, r) {
			this.eventType = e, this.callback = n, this.contextName = r, this.id = t
		}
	};
	const Oa = new class {
		constructor() {
			this.subscribers = {}
		}
		publish(e, t) {
			this.subscribers[e]?.forEach((e => {
				e.callback(t)
			}))
		}
		unsubscribe(e, t, n) {
			const r = this.subscribers[e] || [];
			let a = 0,
				s = -1;
			r.forEach((e => {
				e.id === t && e.contextName === n && (s = a), a += 1
			})), r.splice(s, 1)
		}
		unsubscribeAllWithEventType(e) {
			this.subscribers[e] = []
		}
		subscribe(e, t, n, r, a) {
			this.subscribers[e] = this.subscribers[e] || [];
			let s = !1;
			if (a && this.subscribers[e].forEach((e => {
					s = e.id === t && e.contextName === r
				})), !s) {
				const a = new Pa(e, t, n, r);
				this.subscribers[e].push(a)
			}
		}
		clearContext(e) {
			const t = this.subscribers;
			Object.keys(t).forEach((t => {
				const n = this.subscribers[t],
					r = [];
				n.forEach((t => {
					t.contextName !== e && r.push(t)
				})), this.subscribers[t] = r
			}))
		}
	};
	const Ta = class {
			static subscribe(e, t, n, r = !1, a = "app") {
				Oa.subscribe(e, n, t, a, r)
			}
			static subscribeOnce(e, t, n) {
				this.subscribe(e, t, n, !0)
			}
			static publish(e, t) {
				Oa.publish(e, t)
			}
			static unsubscribe(e, t, n = "app") {
				Oa.unsubscribe(e, t, n)
			}
			static unsubscribeAllWithEventType(e) {
				Oa.unsubscribeAllWithEventType(e)
			}
			static cleanContextSubscribers(e) {
				Oa.clearContext(e)
			}
		},
		va = e => {
			Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.ASSIGNMENT_SUBMISSION, e)
		},
		Na = {
			CASE_INFO: `${W.DATA}.${W.CASE_INFO.CASE_INFO}`,
			CASE_CLASS_NAME: `${W.DATA}.${W.CASE_INFO.CASE_TYPE_ID}`,
			NEXT_ASSIGNMENT_INFO_ID: `${W.DATA}.${W.NEXT_ASSIGNMENT_INFO_ID}`,
			ASSIGNMENTS: `${W.DATA}.${W.CASE_INFO.ASSIGNMENTS}`,
			CASE_INFO_ID: `${W.DATA}.${W.CASE_INFO.CASE_INFO_ID}`,
			CASE_FIRST_FLOW_ACTION_NAME: `${W.DATA}.${W.CASE_INFO.ASSIGNMENTACTION_ID}`,
			CASE_FIRST_ASSIGNMENT_ID: `${W.DATA}.${W.CASE_INFO.ASSIGNMENT_ID}`
		},
		Ra = (e, t) => {
			const {
				vcName: n,
				containerName: r
			} = t;
			return r || n || ba.getTargetViewContainerName(e)
		},
		Da = e => {
			const t = e.lastIndexOf(W.FORWARD_SLASH_STRING) + 1,
				n = e.lastIndexOf(W.UNDERSCORE_STRING);
			return e.substring(t, n)
		},
		xa = e => e === $s.WORKAREA,
		wa = e => e === $s.MODAL,
		Ma = e => e === ze,
		La = e => e && e.find((e => e.type === ze)),
		ja = e => _p.getIn(e, Na.CASE_INFO, {}),
		Ua = e => e ? e.split(" ").pop() : void 0,
		Fa = e => _p.getIn(e, Na.CASE_CLASS_NAME, W.EMPTY_STRING),
		ka = e => {
			const t = ja(e);
			return An(t) && _n(ae.getOperatorIdentifier(), t)
		},
		Va = e => _p.getIn(e, Na.CASE_INFO_ID, W.EMPTY_STRING),
		Ga = e => _p.getIn(e, Na.CASE_FIRST_ASSIGNMENT_ID, W.EMPTY_STRING),
		Ba = (e, t) => {
			const {
				removeActionPayload: n,
				target: r
			} = t;
			if (n && n.containerItemID) {
				const {
					containerItemID: t,
					context: a
				} = n;
				e.push(eh(zp, {
					containerItemID: t,
					context: a || Us(t),
					target: r
				}))
			}
		},
		Ha = e => {
			const t = sp();
			if (!e) return !1;
			const n = Ie(e),
				r = Zs(n),
				a = Zs(e);
			if (!r || !a) return !1;
			const s = Os(r, n),
				o = Os(a, e);
			if (!s || !o) return !1;
			const {
				key: i
			} = s || {};
			let {
				key: c
			} = o || {};
			return c || (c = t.getState().data?.[e]?.caseInfo?.ID), i && c && i === c
		},
		Wa = (e, t, n = {}) => {
			const {
				skipFlowNameUpdate: r
			} = n, a = Va(t);
			_p.setIn(e, "key", a);
			const s = An(ja(t));
			if (!r && (e => {
					const t = _p.getIn(e, Na.ASSIGNMENTS, []);
					return t && t.length > 0
				})(t)) {
				const n = Ga(t),
					[, r] = n.split("!");
				(e => {
					Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CURRENT_ASSIGNMENT_UPDATED, e)
				})({
					assignmentID: n,
					isInCreateStage: s
				}), _p.setIn(e, "flowName", r)
			}
		},
		qa = (e, t) => {
			const {
				attachmentsExist: n
			} = t;
			n && _p.setIn(e, H.SUMMARY_OF_ATTACHMENTS_LAST_REFRESH_TIME, (new Date).toLocaleString()), _p.setIn(e, H.SUMMARY_OF_ASSIGNMENT_LAST_SUBMIT_TIME, (new Date).toLocaleString())
		},
		za = (e, t, n) => {
			let r = W.PROMISE_VALUE.RESOLVE;
			return La(e) ? (r = W.PROMISE_VALUE.REJECT, n ? vn.rejectActionByID(t, !0, n) : vn.rejectActionByID(t)) : vn.resolveActionByID(t), r
		},
		Ya = e => {
			const t = ae.getCaseTypeList();
			return "true" === t.filter((t => t.pyWorkTypeImplementationClassName === e))?.[0]?.pyIsTraditionalUICase
		},
		Ka = () => "true" === ae?.environmentInfoObject?.pxMashupDetails?.pyLaunchCaseInModal,
		{
			RESOURCE_TYPES: Xa
		} = H,
		Ja = {
			PAGE: "page",
			FORM: "form"
		},
		Qa = {
			[Xa.CASE]: [mt, ft, yt],
			[Xa.PAGE]: [ut, ht],
			[Xa.DATA]: [pt]
		},
		Za = (e, t, n = {}) => {
			if (!e) return {};
			const r = {
					etag: e.etag
				},
				{
					RemoteSystemID: a
				} = n;
			return e[H.REMOTE_SYSTEM_ID] || e[H.REMOTE_SYSTEM_ID.toLowerCase()] || a ? r.RemoteSystemID = e[H.REMOTE_SYSTEM_ID] || e[H.REMOTE_SYSTEM_ID.toLowerCase()] || a : q.isRemoteCase(t) && (r.RemoteSystemID = q.getRemoteHeader(t)), r
		},
		es = (e, t = {}) => {
			const {
				onlyChangedData: n = !1,
				nonEmptyAndChangedData: r = !1,
				skipUUID: a = !0
			} = t;
			let s = {};
			s = ((e, t = {}) => {
				const n = {},
					r = ip(e),
					{
						ignoreFieldsInsideList: a = !0
					} = t;
				if (r && r.caseInfo && r.caseInfo.content) {
					const {
						formInputs: t,
						attachments: s,
						formPageFields: o
					} = ea(e, {
						ignoreFieldsInsideList: a
					});
					s && s.length > 0 && _p.buildObject("caseInfo.attachments", n, s), o && o.length > 0 && o.forEach((e => {
						let t = _p.getIn(r, e);
						"object" == typeof t && (t = _p.deepClone(t), delete t?.classID), _p.buildObject(e, n, t)
					})), t && t.length > 0 ? t.forEach((e => {
						_p.buildObject(e, n, _p.getIn(r, e))
					})) : _p.buildObject("caseInfo.content", n, {})
				}
				if (r && r.dataInfo && r.dataInfo.content) {
					const {
						formInputs: t
					} = ea(e, {
						ignoreFieldsInsideList: a
					});
					t && t.length > 0 && t.forEach((e => {
						_p.buildObject(e, n, _p.getIn(r, e))
					}))
				}
				return n
			})(e), n && delete s?.caseInfo?.content;
			const o = ua(e, !1);
			r && Object.entries(s?.caseInfo?.content).forEach((([t, n]) => {
				const r = ip(e),
					a = N()(r, H.CASE_INFO.CASE_INFO_CLASSID),
					o = wu(t, a);
				("True-False" === o?.type && !n || "" === n) && delete s.caseInfo.content[t]
			}));
			const i = w()(o, s);
			let c = {},
				d = !1;
			i && i.caseInfo && (c = {
				...i.caseInfo
			}, i.caseInfo.attachments && (d = !0));
			const l = [..._r(e)];
			a && l.forEach((e => {
				delete e.content?.EmbedListUUID__
			})), c.pageInstructions = l;
			return (fr[e] || []).forEach((e => {
				if (c && c.content) {
					const t = e?.replace(W.CASE_INFO.CASE_INFO_CONTENT, "");
					_p.deleteIn(c.content, (e => {
						if (!e) return "";
						const t = e.split(".");
						let n, r = "";
						for (n of t)
							if (n) {
								if (n.includes("[") && n.includes("]")) return r += `['${n.substring(0,n.lastIndexOf("["))}']`, r;
								r += `['${n}']`
							} return r
					})(t))
				}
			})), i && i.dataInfo ? {
				...i.dataInfo,
				pageInstructions: c.pageInstructions
			} : {
				content: c,
				attachmentsExist: d
			}
		},
		ts = (e, t) => {
			let n, r, a = {};
			const s = _p.getIn(e, W.UI_RESOURCERS),
				o = _p.getIn(e, "confirmationNote");
			s ? (n = _p.getIn(e, W.UI_RESOURCERS_CONTEXT_DATA), r = _p.getIn(e, W.ROOT), a = _p.getIn(e, W.ACTION_BUTTONS)) : o && (r = {});
			const {
				data: i = {},
				Errors: c,
				semanticURL: d,
				key: l,
				flowName: u
			} = e, p = _p.getIn(e, "nextAssignmentInfo", null), h = _p.getIn(e, "nextAssignmentInfo.context", ""), g = _p.getIn(e, "confirmationLinks", null), {
				isInCreateStage: f,
				openCaseViewAfterCreate: y,
				debugInfo: m
			} = t;
			return {
				data: {
					...i,
					key: l,
					flowName: u,
					coreHeaders: m && {
						debugInfo: {
							[W.COREHEADER_APP_DEBUG_ID]: m.debugId
						}
					},
					caseInfo: {
						...i.caseInfo,
						actionButtons: a,
						headers: t.headers
					},
					[W.CONTEXT_DATA]: f ? {
						...i[W.CONTEXT_DATA],
						...n,
						openCaseViewAfterCreate: y,
						errors: c
					} : {
						...i[W.CONTEXT_DATA],
						...n,
						errors: c
					}
				},
				semanticURL: d,
				nextAssignmentInfo: p,
				assignmentContext: h,
				confirmationLinks: g,
				key: l,
				root: r,
				...t
			}
		},
		ns = async (e, t, n, r = !1, a = !1) => {
			const s = _p.getIn(e, W.LOCALE_REFERENCES);
			await de.loadLocaleResources(s);
			const o = _p.getIn(e, W.COMPONENTS);
			if (o) try {
				await Ca(o)
			} catch (e) {
				console.error(e)
			}
			const i = {
				actionConfig: t,
				...n
			};
			r ? bh({
				...e,
				options: i,
				directUrlUpdation: !0
			}) : Aa(e, i, a)
		}, rs = (e = "") => {
			const t = e.indexOf(" "),
				n = e.indexOf("!");
			return e.substring(t + 1, n)
		}, as = e => {
			if (e) {
				const [, t] = e.split("!");
				return {
					key: rs(e),
					flowName: t
				}
			}
			return {}
		}, ss = (e, t) => {
			const n = [],
				r = [];
			return e.forEach((e => {
				((e, t, n, r) => {
					switch (!0) {
						case Boolean(e[W.ERROR_IN_PAGE_IDENTIFIER] && e[W.ERROR_FIELD_IN_PAGE]): {
							const a = `${e[W.ERROR_FIELD_IN_PAGE]}`.replace(/(\(\d+\))/g, (e => `[${parseInt(e.substring(1,e.length-1),10)-1}]`)),
								s = `${a}${e[W.ERROR_IN_PAGE_IDENTIFIER]}`,
								o = _p.deepClone(e);
							o[W.ERROR_FIELD_IN_PAGE] = a, t.includes(s.slice(1)) || t.includes(s.substring(s.indexOf(".") + 1, s.indexOf("["))) ? r.push(o) : n.push(e);
							break
						}
						case Boolean(e[W.ERROR_IN_PAGE_IDENTIFIER] && !e[W.ERROR_FIELD_IN_PAGE]): {
							const a = e[W.ERROR_IN_PAGE_IDENTIFIER].slice(1);
							t.includes(a) ? r.push(e) : n.push(e);
							break
						}
						default:
							n.push(e)
					}
				})(e, t, n, r)
			})), {
				fieldErrors: r,
				pageErrors: n
			}
		}, os = e => {
			const {
				payload: t
			} = e, {
				err: n,
				context: r,
				actionMgrID: a
			} = t, s = n && n.response ? n.response.data : "", o = (e => {
				const t = Xr(),
					n = [];
				if (t[e])
					for (const r in t[e].fieldOrder) Object.hasOwn(t[e].fieldOrder, r) && !1 !== t[e].fieldOrder[r].getConfigProps().visibility && n.push(r.substring(r.indexOf("content") + 8));
				return n
			})(r);
			return a && vn.rejectActionByID(a), eh(th, "Error action triggered", s, r, o)
		}, is = (e, t) => Hs(e) && qs(e) ? eh(Xp, t) : eh(Up, t), cs = (e, t, n = W.APP.APP, r = {}) => {
			let a = null;
			const {
				buildNew: s = !0
			} = r;
			return Hs(e) ? a = qs(e) ? Ms(e) : Ee(t, n) : Ws(e) && (qs(e) && !s ? a = Fs(e) : qs(e) && !s || (a = Ee(t, n))), a
		}, ds = e => e && e.type === Xe, ls = e => {
			let t = !1;
			const n = Gs(e);
			for (let e = 0; e < n.length; e += 1) {
				const r = n[e];
				if (r && fa(r)) {
					t = !0;
					break
				}
			}
			return t
		}, us = (e, t = {}) => {
			let n = !1,
				r = !1,
				a = {},
				s = !0,
				o = !1,
				i = !1;
			const {
				showConfirmDialogForMaxDocumentLimitReached: c = !1,
				dirtyMessage: d,
				skipChildDirtyState: l = !1
			} = t;
			if (Hs(e)) {
				const t = Ms(e),
					r = Us(t);
				fa(r) && (n = !0), l || n || (n = ls(t))
			} else if (Ws(e) && Ks(e)) {
				let t = Qs(e);
				t || (t = Ms(e), r = !0), a.containerItemID = t, a.context = Us(t)
			}
			if (n) {
				const e = d || la;
				o = window.confirm(de.getLocaleValue(e, "Messages"))
			}
			if (!o && n && (a = {}, s = !1), r) {
				const e = de.getLocaleValue("You have reached maximum limit of pending changes. Please commit/cancel one or more changes to continue.", "Messages");
				c ? i = window.confirm(e) : (window.alert(e), s = !1)
			}
			return !i && r && (a = {}, s = !1), {
				continueExecution: s,
				removeActionPayload: a
			}
		}, ps = (e, t) => {
			let n = !1;
			const r = ae.isCoexistenceAppOfType(W.APP_TYPE.UIKIT),
				{
					insKey: a,
					isParallelCall: s,
					skipFlowNameCheck: o
				} = t;
			if (!a) return {};
			const [, i] = a.split("!") || "", c = o ? a : rs(a), d = Ds(e, c);
			let l = {},
				u = !1;
			if (d && !r && (n = !0, l = Os(e, d), !o)) {
				let e = l?.flowName;
				const t = Da(d),
					r = ks(d);
				if (r.length) {
					const n = Ft(t, r[0]);
					e = Os(n, r[0])?.flowName
				} else n = e === i;
				(e !== i || s) && (u = !0)
			}
			return {
				activate: n,
				activateContainerActionPayload: {
					target: e,
					isParallelAssignment: u,
					containerItemID: d,
					semanticURL: l.semanticURL,
					insKey: a
				}
			}
		}, hs = (e, t, n) => e === Xa.PAGE ? ((e, t = {}) => {
			let n = !1;
			const {
				semanticURL: r
			} = t, a = Ds(e, r);
			return a && (n = !0), {
				activate: n,
				activateContainerActionPayload: {
					target: e,
					containerItemID: a,
					semanticURL: r
				}
			}
		})(t, n) : e === Xa.ASSIGNMENT ? ps(t, n) : e === Xa.CASE ? ps(t, {
			...n,
			skipFlowNameCheck: !0
		}) : {}, gs = (e = []) => {
			qs(`${W.APP.APP}/${W.PREVIEW}`) && e.push(eh(jp, Xs({
				context: H.APP.APP,
				name: W.PREVIEW
			})))
		}, fs = e => {
			let t;
			for (const n of Object.keys(Qa))
				if (Qa[n].includes(e)) {
					t = n;
					break
				} return t
		}, ys = (e, t) => {
			const {
				data: n = {},
				context: r,
				caseViewMode: a
			} = e, s = {
				data: {
					...n
				},
				caseViewMode: a,
				context: Ie(r)
			};
			_p.deleteIn(s.data, "shared"), _p.setIn(s.data, ["context_data", "caseViewMode"], a), t.push({
				type: Nt,
				payload: {
					context: s.context
				}
			}), t.push(eh(Np, s))
		}, ms = e => {
			if (Array.isArray(e) && e.length > 0) {
				const t = (e => {
						const t = e[0];
						for (const t of e)
							if ("other" === t?.payload?.nextAssignmentInfo?.context || "remote" === t?.payload?.nextAssignmentInfo?.context) return t;
						return t
					})(e),
					n = _p.getIn(t, ["payload", "assignmentContext"]);
				if ("other" === n || "remote" === n) {
					const r = _p.getIn(t, ["payload", "nextAssignmentInfo", "ID"]);
					if (t?.payload?.isProcessAction) {
						const n = {
								acName: _p.getIn(t, ["payload", "target"]),
								caseID: t.payload.data.caseInfo.ID,
								containerItemID: _p.getIn(t, ["payload", "context"]),
								context: _p.getIn(t, ["payload", "context"])
							},
							r = {
								type: Ve,
								payload: {
									...n
								}
							};
						e.push(r), e = e.filter((e => delete e?.payload?.data?.caseMessages)), op(e), e = e.filter((e => e.type !== Ve))
					}
					const a = ((e, t, n) => ({
						assignmentID: e,
						vcName: W.PRIMARY,
						targetContainerName: _p.getIn(t, ["payload", "target"]),
						context: _p.getIn(t, ["payload", "context"]),
						..."other" === n && {
							isChild: !0
						},
						isProcessAction: t?.payload?.isProcessAction,
						..."remote" === n && {
							isRemote: !0
						},
						..."remote" === n && {
							remoteClassName: t.payload.nextAssignmentInfo.className
						}
					}))(r, t, n);
					Hs(a.targetContainerName) || t?.payload?.containerName !== W.WORKAREA || (a.isMultiDoc = !0, e = []);
					const s = {
						type: Ge,
						payload: {
							...a
						}
					};
					e.push(s), op(e)
				} else op(e)
			}
		}, Is = (e, t) => w()(e, t, (function(e, t) {
			if (Array.isArray(e)) return e.concat(t)
		})), Es = e => {
			let t = {},
				n = mo(e);
			for (; n;) {
				const e = es(n);
				t = Is(e.content, t), n = mo(n)
			}
			return t
		};
	const As = new class {
		getCoreheaders(e) {
			const t = `${H.APP.APP}${W.FORWARD_SLASH_STRING}${W.PRIMARY}`,
				n = Ms(t),
				r = Us(n),
				a = $p.getProperty(W.COREHEADERS, "", r);
			if (a && e in a) return a[e]
		}
	};
	const _s = class {
			static createContainerPConnect(e, t, n, r = !1) {
				const {
					accessedOrder: a,
					items: s
				} = e;
				if (a && s) {
					const e = a[a.length - 1];
					if (s[e]?.view && Object.keys(s[e].view).length > 0) {
						const a = s[e],
							o = e.substring(0, e.lastIndexOf("_")),
							{
								view: i,
								context: c
							} = a,
							{
								viewName: d,
								viewContext: l
							} = this.processRootViewDetails(i, a, t);
						if (!d) return null;
						return yu({
							meta: i,
							options: {
								context: c,
								pageReference: l || t,
								containerName: n,
								containerItemID: e,
								parentPageReference: t,
								hasForm: r || n === $s.WORKAREA || n === $s.MODAL || d === W.CREATE_DETAILS_VIEW_NAME,
								target: o
							}
						}).getPConnect
					}
				}
				return null
			}
			static processRootViewDetails(e, t, n) {
				const {
					config: {
						context: r,
						name: a
					} = {}
				} = e, {
					context: s
				} = t;
				let o = a,
					i = r;
				const c = ra.isProperty(a),
					d = ra.isProperty(r);
				if (d) {
					const e = ra.getPropertyName(r);
					i = lp(`.${e}`, e.startsWith(".") ? n : "", s)
				}
				if (i || (i = n), c) {
					const e = ra.getPropertyName(a);
					o = lp(`.${e}`, i, s)
				}
				return c && d && "" !== o && (o = a, i = r), {
					viewName: o,
					viewContext: i
				}
			}
			static addFlowContainerItem(e) {
				const t = e.getContainerManager(),
					n = e.getContextName();
				let r, a;
				if ("review" !== e.getValue("context_data.caseViewMode")) {
					const e = n.substring(0, n.lastIndexOf("_")),
						t = Ms(e),
						s = Os(e, t);
					s && ({
						key: r,
						flowName: a
					} = s)
				}
				t.addContainerItem({
					semanticURL: "",
					key: r,
					flowName: a,
					caseViewMode: "perform",
					resourceType: "ASSIGNMENT",
					data: e.getDataObject(n)
				})
			}
		},
		Ss = {
			defaultLimit: 16
		},
		Cs = {
			SINGLE: "single",
			MULTIPLE: "multiple"
		},
		$s = {
			PRIMARY: "primary",
			WORKAREA: "workarea",
			MODAL: "modal",
			PREVIEW: "preview"
		},
		bs = () => sp()?.getState()?.containers,
		Ps = e => e ? sp().getState().containers[e] : (Gt.error("getContainerData: target is the required parameter"), null),
		Os = (e, t) => {
			if (!e || !t) return null;
			const n = bs()[e];
			return n && n.items && n.items[t] || null
		},
		Ts = e => e ? sp().getState().containers[e]?.items || {} : (Gt.error("getContainerItems: target is the required parameter"), null),
		vs = e => e ? sp().getState().containers[e]?.accessedOrder || [] : (Gt.error("getContainerAccessOrder: target is the required parameter"), []),
		Ns = e => e ? vs(e)?.length > 0 || !1 : (Gt.error("areContainerItemsPresent: target is the required parameter"), !1),
		Rs = (e, t, n) => {
			if (!e || !t) return Gt.error("isContainerItemExists: target and key are required parameters"), !1;
			const r = bs()[e],
				a = r && r.items || null,
				s = n || ((e, t) => e === t);
			if (t && a)
				for (const e in a)
					if (s(t, a[e].key)) return !0;
			return !1
		},
		Ds = (e, t, n) => {
			if (!e || !t) return Gt.error("getContainerItemName: target and key are required parameters"), null;
			const r = bs()[e],
				a = r && r.items || null,
				s = n || ((e, t) => e?.toLowerCase() === t?.toLowerCase());
			if (t && a)
				for (const e in a)
					if (s(t, a[e].key)) return e;
			return null
		},
		xs = (e, t) => {
			if (!e || !t) return Gt.error("isContainerInitialized: context and name are required parameters"), !1;
			const n = bs();
			return n && Object.prototype.hasOwnProperty.call(n, `${e}/${t}`)
		},
		ws = (e, t) => {
			if (!e || !t) return Gt.error("getContainerType: context and name are required parameters"), null;
			const n = bs()[`${e}/${t}`];
			return n && n.type
		},
		Ms = e => {
			if (!e) return Gt.error("getActiveContainerItemName: target is the required parameter"), null;
			let t = null;
			const n = bs();
			if (n && n[e]) {
				const r = n[e],
					{
						accessedOrder: a
					} = r;
				t = a && a.length > 0 ? a[a.length - 1] : null
			}
			return t
		},
		Ls = (e, t, n) => {
			if (!e || !t) return Gt.error("isContainerItemActive: target and key are required parameters"), !1;
			const r = Ds(e, t, n);
			return !!r && r === Ms(e)
		},
		js = (e, t) => {
			let n = null;
			const r = bs();
			for (const a in r)
				if (Object.prototype.hasOwnProperty.call(r, a) && r[a].items) {
					const s = r[a].items[e];
					if (n = s ? s[t] : null, n) break
				} return n
		},
		Us = e => e ? js(e, "context") : (Gt.error("getDataContextName: containerItemName is required parameters"), null),
		Fs = e => {
			if (!e) return Gt.error("getActiveContainerItemContext: target is required parameters"), null;
			let t = null;
			const n = bs();
			if (n && n[e]) {
				const r = n[e],
					{
						accessedOrder: a
					} = r,
					s = a && a.length > 0 ? a[a.length - 1] : null;
				t = Us(s)
			}
			return t
		},
		ks = e => {
			if (!e) return Gt.error("getChildContainerItems: containerItemName is required parameters"), [];
			const t = e.endsWith("/") ? e : `${e}/`;
			let n = [],
				r = !1;
			const a = bs(),
				s = n => {
					const a = [];
					return Object.keys(n).forEach((n => {
						n.startsWith(t) && n !== t && a.push(n), n === e && (r = !0)
					})), a
				};
			for (const e in a)
				if (Object.prototype.hasOwnProperty.call(a, e) && a[e].items) {
					const t = s(a[e].items);
					t && t.length > 0 && (n = n.concat(t)), n = n.sort()
				} return r ? n : []
		},
		Vs = e => {
			if (!e) return Gt.error("getChildContainers: containerItemName is required parameters"), [];
			const t = [],
				n = bs();
			for (const r in n) Object.prototype.hasOwnProperty.call(n, r) && r.startsWith(e) && r !== e && t.push(r);
			return t
		},
		Gs = e => {
			if (!e) return Gt.error("getChildContainersContexts: parentContainerItemID is required parameters"), [];
			const t = [],
				n = bs();
			for (const r in n)
				if (Object.prototype.hasOwnProperty.call(n, r) && r.startsWith(e) && r !== e) {
					(vs(r) || []).forEach((n => {
						Us(n) !== e && t.push(Us(n))
					}))
				} return t
		},
		Bs = e => {
			const t = [...Gs(e), e],
				n = [],
				r = sp().getState().data || {};
			return t.forEach((e => {
				Object.prototype.hasOwnProperty.call(r, `${e}/${W.SUGGESTION}`) && n.push(`${e}/${W.SUGGESTION}`)
			})), n
		},
		Hs = e => e ? e && Ps(e) && Ps(e).type === Cs.SINGLE : (Gt.error("isContainerSingleMode: target is required parameters"), null),
		Ws = e => e ? e && Ps(e) && Ps(e).type === Cs.MULTIPLE : (Gt.error("isContainerMultipleMode: target is required parameters"), null),
		qs = e => e ? Ps(e) && Ps(e).items && Object.keys(Ps(e)?.items).length > 0 || !1 : (Gt.error("hasContainerItems: target is required parameters"), !1),
		zs = e => e && Ss[e] ? Ss[e] : Ss.defaultLimit,
		Ys = (e, t = Ss.defaultLimit) => {
			e ? Ss[e] = t : Gt.error("setContainerLimit: target is required parameter")
		},
		Ks = e => {
			if (!e) return Gt.error("isContainerLimitReached: target is required parameter"), !1;
			let t = !1;
			const n = Ps(e),
				{
					items: r = {}
				} = n,
				a = Object.keys(r),
				s = zs(e);
			return a && a.length > 0 && a.length >= s && (t = !0), t
		},
		Xs = e => {
			if (!e || !e.name || !e.context) return Gt.error("resetContainersPayload: containerInfo object should contain name and context"), null;
			const t = e?.name,
				n = Ps(`${e?.context}/${t}`),
				r = Array.isArray(n?.accessedOrder) && n?.accessedOrder.map((e => n?.items[`${e}`]?.context)) || [],
				a = Vs(`${W.APP.APP}/${W.PREVIEW}`),
				s = Gs(`${W.APP.APP}/${W.PREVIEW}`);
			return {
				context: e?.context,
				name: t,
				containerItems: [...r, ...s],
				childContainers: a
			}
		},
		Js = e => {
			if (!e) return Gt.error("isContainerDirty: containerItemID is the required parameter"), !1;
			const t = Us(e);
			return fa(t) || ls(e)
		},
		Qs = e => {
			if (!e) return Gt.error("getLeastRecentlyUsedNonDirtyContainerItemID: target is required parameter"), null;
			let t;
			const n = Ps(e),
				{
					accessedOrder: r = []
				} = n;
			for (let e = 0; e < r.length; e += 1) {
				const n = r[e];
				if (!Js(n)) {
					t = n;
					break
				}
			}
			return t
		},
		Zs = e => {
			if (!e) return Gt.error("getTargetFromContainerItemID: containerItemID is the required parameter"), null;
			const {
				containers: t
			} = sp().getState();
			for (const n in t)
				if (t[n]?.accessedOrder?.includes(e)) return n;
			const n = e.lastIndexOf(W.UNDERSCORE_STRING);
			return e.substring(0, n)
		},
		eo = (e, t = {}) => {
			if (!e) return Gt.error("closeContainerItem: containerItemID is the required parameter"), Promise.reject(new Error("closeContainerItem: containerItemID is the required parameter"));
			const n = Zs(e),
				r = Us(e),
				{
					skipDirtyCheck: a
				} = t;
			let s = !0,
				o = [];
			if (Js(e) && !a && (s = window.confirm(de.getLocaleValue(la, "Messages"))), s) {
				const {
					accessedOrder: t = [],
					items: a = {},
					type: s
				} = Ps(n);
				o = t.filter((t => t !== e));
				const i = o[o.length - 1],
					c = a[i] || {},
					{
						semanticURL: d = W.FORWARD_SLASH_STRING,
						context: l
					} = c;
				o.length > 0 && d && d !== W.FORWARD_SLASH_STRING ? bh({
					directUrlUpdation: !0,
					semanticURL: d,
					options: {
						containerItemID: i,
						context: l
					}
				}) : bh({
					directUrlUpdation: !0,
					semanticURL: W.FORWARD_SLASH_STRING,
					options: {}
				});
				op(zp({
					containerItemID: e,
					context: r,
					target: n,
					containerInfo: {
						newAccessedOrder: o,
						containerType: s
					}
				}))
			}
			return Promise.resolve({
				newAccessedOrder: o
			})
		},
		to = (e, t, n, r) => {
			const a = "root",
				s = Ee(t, a, !0),
				o = Ft(t, a),
				i = {
					data: n,
					context: r ? "app" : s
				},
				c = [Up({
					root: e,
					containerItemID: s,
					context: r ? "app" : s,
					target: o,
					containerName: t
				})];
			c.push(Np(i)), op(c)
		},
		no = (e, t, n) => {
			let r = vs(e);
			r = r.filter((e => e !== t));
			let a = !1;
			for (let e = 0; e < r.length; e += 1) {
				if (Us(r[e]) === n) {
					a = !0;
					break
				}
			}
			return a
		},
		ro = e => {
			if (!e) return Gt.error("isContainerItemContextBeingUsedInOtherContainers: containerItemID is the required parameter"), !1;
			const t = bs(),
				n = Us(e),
				r = Object.keys(t);
			let a = !1;
			for (let t = 0; t < r.length && (a = no(r[t], e, n), !a); t += 1);
			return a
		},
		ao = e => {
			Array.isArray(e) || (e = [e]);
			const t = bs() || {};
			return e.map((e => {
				const n = Zs(e);
				return _p.getIn(t, [n, "items", e, "transientItems"]) || []
			})).flat()
		},
		so = e => {
			const t = _p.deepClone(sp().getState().data[e]);
			_p.iterateLeafNodes(t, (e => {
				"classID" !== e[e.length - 1] && _p.setIn(t, e, "")
			})), op(Vp({
				transientItemID: e,
				data: t
			}))
		},
		oo = e => {
			const t = _p.deepClone(sp().getState().data[e]);
			_p.iterateLeafNodes(t, (e => _p.setIn(t, e, ""))), op(Gp({
				transientItemID: e,
				data: t
			}))
		};
	class io {
		static addContainerItems(e) {
			this.items = e
		}
		static getContainerItems() {
			return this.items
		}
		static deleteContainerItem(e) {
			const t = this?.items?.indexOf(e);
			void 0 !== t && -1 !== t && this.items.splice(t, 1)
		}
	}
	const co = () => io,
		lo = e => {
			const t = {
				containerName: e
			};
			t.childContainers = Vs(e), op({
				type: dt,
				payload: t
			})
		},
		uo = (e, t) => {
			const n = ks(e),
				{
					key: r
				} = Os(Zs(e), e),
				a = [];
			n.forEach((e => {
				const {
					key: n
				} = Os(Zs(e), e);
				if (n === r) {
					const n = {
						data: {
							caseInfo: {
								headers: {
									etag: t
								}
							}
						},
						target: Zs(e),
						context: e
					};
					a.push({
						type: Be,
						payload: n
					})
				}
			})), a.length && op(a)
		},
		po = (e, t) => {
			const n = [],
				r = {
					data: {
						caseInfo: {
							headers: {
								etag: t
							}
						}
					},
					target: Zs(e),
					context: e
				};
			n.push({
				type: Be,
				payload: r
			}), n.length && op(n)
		},
		ho = () => ae.isPortalLoaded ? "app" : "root",
		go = () => As,
		fo = (e, t) => {
			const n = {
				data: {
					caseInfo: {
						lastUpdateTime: t
					}
				},
				target: Zs(e),
				context: e
			};
			op({
				type: Be,
				payload: n
			})
		},
		yo = (e, t) => {
			const n = Ds(e, t),
				r = Ds(`${n}/workarea`, t);
			return Us(r)
		},
		mo = e => e ? js(e, "parentContext") : (Gt.error("getContainerParentContext: containerItemName is required parameters"), null),
		Io = e => {
			const {
				accessedOrder: t
			} = e;
			return t && t.length > 0 ? t[t.length - 1] : ""
		},
		Eo = () => _s;
	const Ao = class {
		constructor(e) {
			this.c11nEnv = e
		}
		validate(e, t) {
			if (!t && !(t = this.c11nEnv.getStateProps().value)) {
				const e = this.c11nEnv.getComponentConfig();
				"multi" === e.selectionMode ? t = this.c11nEnv.getStateProps().selectionList : "Editable" === e.renderMode && (t = this.c11nEnv.getStateProps().referenceList)
			}
			const n = Lr.validate(this.c11nEnv.getComponentName().toLowerCase(), t, e, this.c11nEnv);
			return n?.message ? {
				status: !1,
				message: n?.message
			} : {
				status: !0
			}
		}
	};

	function _o(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}
	const {
		toString: So
	} = Object.prototype, {
		getPrototypeOf: Co
	} = Object, $o = (bo = Object.create(null), e => {
		const t = So.call(e);
		return bo[t] || (bo[t] = t.slice(8, -1).toLowerCase())
	});
	var bo;
	const Po = e => (e = e.toLowerCase(), t => $o(t) === e),
		Oo = e => t => typeof t === e,
		{
			isArray: To
		} = Array,
		vo = Oo("undefined");
	const No = Po("ArrayBuffer");
	const Ro = Oo("string"),
		Do = Oo("function"),
		xo = Oo("number"),
		wo = e => null !== e && "object" == typeof e,
		Mo = e => {
			if ("object" !== $o(e)) return !1;
			const t = Co(e);
			return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e)
		},
		Lo = Po("Date"),
		jo = Po("File"),
		Uo = Po("Blob"),
		Fo = Po("FileList"),
		ko = Po("URLSearchParams"),
		[Vo, Go, Bo, Ho] = ["ReadableStream", "Request", "Response", "Headers"].map(Po);

	function Wo(e, t, {
		allOwnKeys: n = !1
	} = {}) {
		if (null == e) return;
		let r, a;
		if ("object" != typeof e && (e = [e]), To(e))
			for (r = 0, a = e.length; r < a; r++) t.call(null, e[r], r, e);
		else {
			const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
				s = a.length;
			let o;
			for (r = 0; r < s; r++) o = a[r], t.call(null, e[o], o, e)
		}
	}

	function qo(e, t) {
		t = t.toLowerCase();
		const n = Object.keys(e);
		let r, a = n.length;
		for (; a-- > 0;)
			if (r = n[a], t === r.toLowerCase()) return r;
		return null
	}
	const zo = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global,
		Yo = e => !vo(e) && e !== zo;
	const Ko = (Xo = "undefined" != typeof Uint8Array && Co(Uint8Array), e => Xo && e instanceof Xo);
	var Xo;
	const Jo = Po("HTMLFormElement"),
		Qo = (({
			hasOwnProperty: e
		}) => (t, n) => e.call(t, n))(Object.prototype),
		Zo = Po("RegExp"),
		ei = (e, t) => {
			const n = Object.getOwnPropertyDescriptors(e),
				r = {};
			Wo(n, ((n, a) => {
				let s;
				!1 !== (s = t(n, a, e)) && (r[a] = s || n)
			})), Object.defineProperties(e, r)
		},
		ti = "abcdefghijklmnopqrstuvwxyz",
		ni = "0123456789",
		ri = {
			DIGIT: ni,
			ALPHA: ti,
			ALPHA_DIGIT: ti + ti.toUpperCase() + ni
		};
	const ai = Po("AsyncFunction"),
		si = (oi = "function" == typeof setImmediate, ii = Do(zo.postMessage), oi ? setImmediate : ii ? (ci = `axios@${Math.random()}`, di = [], zo.addEventListener("message", (({
			source: e,
			data: t
		}) => {
			e === zo && t === ci && di.length && di.shift()()
		}), !1), e => {
			di.push(e), zo.postMessage(ci, "*")
		}) : e => setTimeout(e));
	var oi, ii, ci, di;
	const li = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(zo) : "undefined" != typeof process && process.nextTick || si,
		ui = {
			isArray: To,
			isArrayBuffer: No,
			isBuffer: function(e) {
				return null !== e && !vo(e) && null !== e.constructor && !vo(e.constructor) && Do(e.constructor.isBuffer) && e.constructor.isBuffer(e)
			},
			isFormData: e => {
				let t;
				return e && ("function" == typeof FormData && e instanceof FormData || Do(e.append) && ("formdata" === (t = $o(e)) || "object" === t && Do(e.toString) && "[object FormData]" === e.toString()))
			},
			isArrayBufferView: function(e) {
				let t;
				return t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && No(e.buffer), t
			},
			isString: Ro,
			isNumber: xo,
			isBoolean: e => !0 === e || !1 === e,
			isObject: wo,
			isPlainObject: Mo,
			isReadableStream: Vo,
			isRequest: Go,
			isResponse: Bo,
			isHeaders: Ho,
			isUndefined: vo,
			isDate: Lo,
			isFile: jo,
			isBlob: Uo,
			isRegExp: Zo,
			isFunction: Do,
			isStream: e => wo(e) && Do(e.pipe),
			isURLSearchParams: ko,
			isTypedArray: Ko,
			isFileList: Fo,
			forEach: Wo,
			merge: function e() {
				const {
					caseless: t
				} = Yo(this) && this || {}, n = {}, r = (r, a) => {
					const s = t && qo(n, a) || a;
					Mo(n[s]) && Mo(r) ? n[s] = e(n[s], r) : Mo(r) ? n[s] = e({}, r) : To(r) ? n[s] = r.slice() : n[s] = r
				};
				for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && Wo(arguments[e], r);
				return n
			},
			extend: (e, t, n, {
				allOwnKeys: r
			} = {}) => (Wo(t, ((t, r) => {
				n && Do(t) ? e[r] = _o(t, n) : e[r] = t
			}), {
				allOwnKeys: r
			}), e),
			trim: e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
			stripBOM: e => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
			inherits: (e, t, n, r) => {
				e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
					value: t.prototype
				}), n && Object.assign(e.prototype, n)
			},
			toFlatObject: (e, t, n, r) => {
				let a, s, o;
				const i = {};
				if (t = t || {}, null == e) return t;
				do {
					for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0;) o = a[s], r && !r(o, e, t) || i[o] || (t[o] = e[o], i[o] = !0);
					e = !1 !== n && Co(e)
				} while (e && (!n || n(e, t)) && e !== Object.prototype);
				return t
			},
			kindOf: $o,
			kindOfTest: Po,
			endsWith: (e, t, n) => {
				e = String(e), (void 0 === n || n > e.length) && (n = e.length), n -= t.length;
				const r = e.indexOf(t, n);
				return -1 !== r && r === n
			},
			toArray: e => {
				if (!e) return null;
				if (To(e)) return e;
				let t = e.length;
				if (!xo(t)) return null;
				const n = new Array(t);
				for (; t-- > 0;) n[t] = e[t];
				return n
			},
			forEachEntry: (e, t) => {
				const n = (e && e[Symbol.iterator]).call(e);
				let r;
				for (;
					(r = n.next()) && !r.done;) {
					const n = r.value;
					t.call(e, n[0], n[1])
				}
			},
			matchAll: (e, t) => {
				let n;
				const r = [];
				for (; null !== (n = e.exec(t));) r.push(n);
				return r
			},
			isHTMLForm: Jo,
			hasOwnProperty: Qo,
			hasOwnProp: Qo,
			reduceDescriptors: ei,
			freezeMethods: e => {
				ei(e, ((t, n) => {
					if (Do(e) && -1 !== ["arguments", "caller", "callee"].indexOf(n)) return !1;
					const r = e[n];
					Do(r) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set || (t.set = () => {
						throw Error("Can not rewrite read-only method '" + n + "'")
					}))
				}))
			},
			toObjectSet: (e, t) => {
				const n = {},
					r = e => {
						e.forEach((e => {
							n[e] = !0
						}))
					};
				return To(e) ? r(e) : r(String(e).split(t)), n
			},
			toCamelCase: e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function(e, t, n) {
				return t.toUpperCase() + n
			})),
			noop: () => {},
			toFiniteNumber: (e, t) => null != e && Number.isFinite(e = +e) ? e : t,
			findKey: qo,
			global: zo,
			isContextDefined: Yo,
			ALPHABET: ri,
			generateString: (e = 16, t = ri.ALPHA_DIGIT) => {
				let n = "";
				const {
					length: r
				} = t;
				for (; e--;) n += t[Math.random() * r | 0];
				return n
			},
			isSpecCompliantForm: function(e) {
				return !!(e && Do(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator])
			},
			toJSONObject: e => {
				const t = new Array(10),
					n = (e, r) => {
						if (wo(e)) {
							if (t.indexOf(e) >= 0) return;
							if (!("toJSON" in e)) {
								t[r] = e;
								const a = To(e) ? [] : {};
								return Wo(e, ((e, t) => {
									const s = n(e, r + 1);
									!vo(s) && (a[t] = s)
								})), t[r] = void 0, a
							}
						}
						return e
					};
				return n(e, 0)
			},
			isAsyncFn: ai,
			isThenable: e => e && (wo(e) || Do(e)) && Do(e.then) && Do(e.catch),
			setImmediate: si,
			asap: li
		};

	function pi(e, t, n, r, a) {
		Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), a && (this.response = a, this.status = a.status ? a.status : null)
	}
	ui.inherits(pi, Error, {
		toJSON: function() {
			return {
				message: this.message,
				name: this.name,
				description: this.description,
				number: this.number,
				fileName: this.fileName,
				lineNumber: this.lineNumber,
				columnNumber: this.columnNumber,
				stack: this.stack,
				config: ui.toJSONObject(this.config),
				code: this.code,
				status: this.status
			}
		}
	});
	const hi = pi.prototype,
		gi = {};
	["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e => {
		gi[e] = {
			value: e
		}
	})), Object.defineProperties(pi, gi), Object.defineProperty(hi, "isAxiosError", {
		value: !0
	}), pi.from = (e, t, n, r, a, s) => {
		const o = Object.create(hi);
		return ui.toFlatObject(e, o, (function(e) {
			return e !== Error.prototype
		}), (e => "isAxiosError" !== e)), pi.call(o, e.message, t, n, r, a), o.cause = e, o.name = e.name, s && Object.assign(o, s), o
	};
	const fi = pi;

	function yi(e) {
		return ui.isPlainObject(e) || ui.isArray(e)
	}

	function mi(e) {
		return ui.endsWith(e, "[]") ? e.slice(0, -2) : e
	}

	function Ii(e, t, n) {
		return e ? e.concat(t).map((function(e, t) {
			return e = mi(e), !n && t ? "[" + e + "]" : e
		})).join(n ? "." : "") : t
	}
	const Ei = ui.toFlatObject(ui, {}, null, (function(e) {
		return /^is[A-Z]/.test(e)
	}));
	const Ai = function(e, t, n) {
		if (!ui.isObject(e)) throw new TypeError("target must be an object");
		t = t || new FormData;
		const r = (n = ui.toFlatObject(n, {
				metaTokens: !0,
				dots: !1,
				indexes: !1
			}, !1, (function(e, t) {
				return !ui.isUndefined(t[e])
			}))).metaTokens,
			a = n.visitor || d,
			s = n.dots,
			o = n.indexes,
			i = (n.Blob || "undefined" != typeof Blob && Blob) && ui.isSpecCompliantForm(t);
		if (!ui.isFunction(a)) throw new TypeError("visitor must be a function");

		function c(e) {
			if (null === e) return "";
			if (ui.isDate(e)) return e.toISOString();
			if (!i && ui.isBlob(e)) throw new fi("Blob is not supported. Use a Buffer instead.");
			return ui.isArrayBuffer(e) || ui.isTypedArray(e) ? i && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e
		}

		function d(e, n, a) {
			let i = e;
			if (e && !a && "object" == typeof e)
				if (ui.endsWith(n, "{}")) n = r ? n : n.slice(0, -2), e = JSON.stringify(e);
				else if (ui.isArray(e) && function(e) {
					return ui.isArray(e) && !e.some(yi)
				}(e) || (ui.isFileList(e) || ui.endsWith(n, "[]")) && (i = ui.toArray(e))) return n = mi(n), i.forEach((function(e, r) {
				!ui.isUndefined(e) && null !== e && t.append(!0 === o ? Ii([n], r, s) : null === o ? n : n + "[]", c(e))
			})), !1;
			return !!yi(e) || (t.append(Ii(a, n, s), c(e)), !1)
		}
		const l = [],
			u = Object.assign(Ei, {
				defaultVisitor: d,
				convertValue: c,
				isVisitable: yi
			});
		if (!ui.isObject(e)) throw new TypeError("data must be an object");
		return function e(n, r) {
			if (!ui.isUndefined(n)) {
				if (-1 !== l.indexOf(n)) throw Error("Circular reference detected in " + r.join("."));
				l.push(n), ui.forEach(n, (function(n, s) {
					!0 === (!(ui.isUndefined(n) || null === n) && a.call(t, n, ui.isString(s) ? s.trim() : s, r, u)) && e(n, r ? r.concat(s) : [s])
				})), l.pop()
			}
		}(e), t
	};

	function _i(e) {
		const t = {
			"!": "%21",
			"'": "%27",
			"(": "%28",
			")": "%29",
			"~": "%7E",
			"%20": "+",
			"%00": "\0"
		};
		return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, (function(e) {
			return t[e]
		}))
	}

	function Si(e, t) {
		this._pairs = [], e && Ai(e, this, t)
	}
	const Ci = Si.prototype;
	Ci.append = function(e, t) {
		this._pairs.push([e, t])
	}, Ci.toString = function(e) {
		const t = e ? function(t) {
			return e.call(this, t, _i)
		} : _i;
		return this._pairs.map((function(e) {
			return t(e[0]) + "=" + t(e[1])
		}), "").join("&")
	};
	const $i = Si;

	function bi(e) {
		return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
	}

	function Pi(e, t, n) {
		if (!t) return e;
		const r = n && n.encode || bi;
		ui.isFunction(n) && (n = {
			serialize: n
		});
		const a = n && n.serialize;
		let s;
		if (s = a ? a(t, n) : ui.isURLSearchParams(t) ? t.toString() : new $i(t, n).toString(r), s) {
			const t = e.indexOf("#"); - 1 !== t && (e = e.slice(0, t)), e += (-1 === e.indexOf("?") ? "?" : "&") + s
		}
		return e
	}
	const Oi = class {
			constructor() {
				this.handlers = []
			}
			use(e, t, n) {
				return this.handlers.push({
					fulfilled: e,
					rejected: t,
					synchronous: !!n && n.synchronous,
					runWhen: n ? n.runWhen : null
				}), this.handlers.length - 1
			}
			eject(e) {
				this.handlers[e] && (this.handlers[e] = null)
			}
			clear() {
				this.handlers && (this.handlers = [])
			}
			forEach(e) {
				ui.forEach(this.handlers, (function(t) {
					null !== t && e(t)
				}))
			}
		},
		Ti = {
			silentJSONParsing: !0,
			forcedJSONParsing: !0,
			clarifyTimeoutError: !1
		},
		vi = {
			isBrowser: !0,
			classes: {
				URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : $i,
				FormData: "undefined" != typeof FormData ? FormData : null,
				Blob: "undefined" != typeof Blob ? Blob : null
			},
			protocols: ["http", "https", "file", "blob", "url", "data"]
		},
		Ni = "undefined" != typeof window && "undefined" != typeof document,
		Ri = "object" == typeof navigator && navigator || void 0,
		Di = Ni && (!Ri || ["ReactNative", "NativeScript", "NS"].indexOf(Ri.product) < 0),
		xi = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
		wi = Ni && window.location.href || "http://localhost",
		Mi = {
			...i,
			...vi
		};
	const Li = function(e) {
		function t(e, n, r, a) {
			let s = e[a++];
			if ("__proto__" === s) return !0;
			const o = Number.isFinite(+s),
				i = a >= e.length;
			if (s = !s && ui.isArray(r) ? r.length : s, i) return ui.hasOwnProp(r, s) ? r[s] = [r[s], n] : r[s] = n, !o;
			r[s] && ui.isObject(r[s]) || (r[s] = []);
			return t(e, n, r[s], a) && ui.isArray(r[s]) && (r[s] = function(e) {
				const t = {},
					n = Object.keys(e);
				let r;
				const a = n.length;
				let s;
				for (r = 0; r < a; r++) s = n[r], t[s] = e[s];
				return t
			}(r[s])), !o
		}
		if (ui.isFormData(e) && ui.isFunction(e.entries)) {
			const n = {};
			return ui.forEachEntry(e, ((e, r) => {
				t(function(e) {
					return ui.matchAll(/\w+|\[(\w*)]/g, e).map((e => "[]" === e[0] ? "" : e[1] || e[0]))
				}(e), r, n, 0)
			})), n
		}
		return null
	};
	const ji = {
		transitional: Ti,
		adapter: ["xhr", "http", "fetch"],
		transformRequest: [function(e, t) {
			const n = t.getContentType() || "",
				r = n.indexOf("application/json") > -1,
				a = ui.isObject(e);
			a && ui.isHTMLForm(e) && (e = new FormData(e));
			if (ui.isFormData(e)) return r ? JSON.stringify(Li(e)) : e;
			if (ui.isArrayBuffer(e) || ui.isBuffer(e) || ui.isStream(e) || ui.isFile(e) || ui.isBlob(e) || ui.isReadableStream(e)) return e;
			if (ui.isArrayBufferView(e)) return e.buffer;
			if (ui.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
			let s;
			if (a) {
				if (n.indexOf("application/x-www-form-urlencoded") > -1) return function(e, t) {
					return Ai(e, new Mi.classes.URLSearchParams, Object.assign({
						visitor: function(e, t, n, r) {
							return Mi.isNode && ui.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments)
						}
					}, t))
				}(e, this.formSerializer).toString();
				if ((s = ui.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
					const t = this.env && this.env.FormData;
					return Ai(s ? {
						"files[]": e
					} : e, t && new t, this.formSerializer)
				}
			}
			return a || r ? (t.setContentType("application/json", !1), function(e, t, n) {
				if (ui.isString(e)) try {
					return (t || JSON.parse)(e), ui.trim(e)
				} catch (e) {
					if ("SyntaxError" !== e.name) throw e
				}
				return (n || JSON.stringify)(e)
			}(e)) : e
		}],
		transformResponse: [function(e) {
			const t = this.transitional || ji.transitional,
				n = t && t.forcedJSONParsing,
				r = "json" === this.responseType;
			if (ui.isResponse(e) || ui.isReadableStream(e)) return e;
			if (e && ui.isString(e) && (n && !this.responseType || r)) {
				const n = !(t && t.silentJSONParsing) && r;
				try {
					return JSON.parse(e)
				} catch (e) {
					if (n) {
						if ("SyntaxError" === e.name) throw fi.from(e, fi.ERR_BAD_RESPONSE, this, null, this.response);
						throw e
					}
				}
			}
			return e
		}],
		timeout: 0,
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
		maxContentLength: -1,
		maxBodyLength: -1,
		env: {
			FormData: Mi.classes.FormData,
			Blob: Mi.classes.Blob
		},
		validateStatus: function(e) {
			return e >= 200 && e < 300
		},
		headers: {
			common: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": void 0
			}
		}
	};
	ui.forEach(["delete", "get", "head", "post", "put", "patch"], (e => {
		ji.headers[e] = {}
	}));
	const Ui = ji,
		Fi = ui.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
		ki = Symbol("internals");

	function Vi(e) {
		return e && String(e).trim().toLowerCase()
	}

	function Gi(e) {
		return !1 === e || null == e ? e : ui.isArray(e) ? e.map(Gi) : String(e)
	}

	function Bi(e, t, n, r, a) {
		return ui.isFunction(r) ? r.call(this, t, n) : (a && (t = n), ui.isString(t) ? ui.isString(r) ? -1 !== t.indexOf(r) : ui.isRegExp(r) ? r.test(t) : void 0 : void 0)
	}
	class Hi {
		constructor(e) {
			e && this.set(e)
		}
		set(e, t, n) {
			const r = this;

			function a(e, t, n) {
				const a = Vi(t);
				if (!a) throw new Error("header name must be a non-empty string");
				const s = ui.findKey(r, a);
				(!s || void 0 === r[s] || !0 === n || void 0 === n && !1 !== r[s]) && (r[s || t] = Gi(e))
			}
			const s = (e, t) => ui.forEach(e, ((e, n) => a(e, n, t)));
			if (ui.isPlainObject(e) || e instanceof this.constructor) s(e, t);
			else if (ui.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())) s((e => {
				const t = {};
				let n, r, a;
				return e && e.split("\n").forEach((function(e) {
					a = e.indexOf(":"), n = e.substring(0, a).trim().toLowerCase(), r = e.substring(a + 1).trim(), !n || t[n] && Fi[n] || ("set-cookie" === n ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
				})), t
			})(e), t);
			else if (ui.isHeaders(e))
				for (const [t, r] of e.entries()) a(r, t, n);
			else null != e && a(t, e, n);
			return this
		}
		get(e, t) {
			if (e = Vi(e)) {
				const n = ui.findKey(this, e);
				if (n) {
					const e = this[n];
					if (!t) return e;
					if (!0 === t) return function(e) {
						const t = Object.create(null),
							n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
						let r;
						for (; r = n.exec(e);) t[r[1]] = r[2];
						return t
					}(e);
					if (ui.isFunction(t)) return t.call(this, e, n);
					if (ui.isRegExp(t)) return t.exec(e);
					throw new TypeError("parser must be boolean|regexp|function")
				}
			}
		}
		has(e, t) {
			if (e = Vi(e)) {
				const n = ui.findKey(this, e);
				return !(!n || void 0 === this[n] || t && !Bi(0, this[n], n, t))
			}
			return !1
		}
		delete(e, t) {
			const n = this;
			let r = !1;

			function a(e) {
				if (e = Vi(e)) {
					const a = ui.findKey(n, e);
					!a || t && !Bi(0, n[a], a, t) || (delete n[a], r = !0)
				}
			}
			return ui.isArray(e) ? e.forEach(a) : a(e), r
		}
		clear(e) {
			const t = Object.keys(this);
			let n = t.length,
				r = !1;
			for (; n--;) {
				const a = t[n];
				e && !Bi(0, this[a], a, e, !0) || (delete this[a], r = !0)
			}
			return r
		}
		normalize(e) {
			const t = this,
				n = {};
			return ui.forEach(this, ((r, a) => {
				const s = ui.findKey(n, a);
				if (s) return t[s] = Gi(r), void delete t[a];
				const o = e ? function(e) {
					return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ((e, t, n) => t.toUpperCase() + n))
				}(a) : String(a).trim();
				o !== a && delete t[a], t[o] = Gi(r), n[o] = !0
			})), this
		}
		concat(...e) {
			return this.constructor.concat(this, ...e)
		}
		toJSON(e) {
			const t = Object.create(null);
			return ui.forEach(this, ((n, r) => {
				null != n && !1 !== n && (t[r] = e && ui.isArray(n) ? n.join(", ") : n)
			})), t
		} [Symbol.iterator]() {
			return Object.entries(this.toJSON())[Symbol.iterator]()
		}
		toString() {
			return Object.entries(this.toJSON()).map((([e, t]) => e + ": " + t)).join("\n")
		}
		get[Symbol.toStringTag]() {
			return "AxiosHeaders"
		}
		static from(e) {
			return e instanceof this ? e : new this(e)
		}
		static concat(e, ...t) {
			const n = new this(e);
			return t.forEach((e => n.set(e))), n
		}
		static accessor(e) {
			const t = (this[ki] = this[ki] = {
					accessors: {}
				}).accessors,
				n = this.prototype;

			function r(e) {
				const r = Vi(e);
				t[r] || (! function(e, t) {
					const n = ui.toCamelCase(" " + t);
					["get", "set", "has"].forEach((r => {
						Object.defineProperty(e, r + n, {
							value: function(e, n, a) {
								return this[r].call(this, t, e, n, a)
							},
							configurable: !0
						})
					}))
				}(n, e), t[r] = !0)
			}
			return ui.isArray(e) ? e.forEach(r) : r(e), this
		}
	}
	Hi.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), ui.reduceDescriptors(Hi.prototype, (({
		value: e
	}, t) => {
		let n = t[0].toUpperCase() + t.slice(1);
		return {
			get: () => e,
			set(e) {
				this[n] = e
			}
		}
	})), ui.freezeMethods(Hi);
	const Wi = Hi;

	function qi(e, t) {
		const n = this || Ui,
			r = t || n,
			a = Wi.from(r.headers);
		let s = r.data;
		return ui.forEach(e, (function(e) {
			s = e.call(n, s, a.normalize(), t ? t.status : void 0)
		})), a.normalize(), s
	}

	function zi(e) {
		return !(!e || !e.__CANCEL__)
	}

	function Yi(e, t, n) {
		fi.call(this, null == e ? "canceled" : e, fi.ERR_CANCELED, t, n), this.name = "CanceledError"
	}
	ui.inherits(Yi, fi, {
		__CANCEL__: !0
	});
	const Ki = Yi;

	function Xi(e, t, n) {
		const r = n.config.validateStatus;
		n.status && r && !r(n.status) ? t(new fi("Request failed with status code " + n.status, [fi.ERR_BAD_REQUEST, fi.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n)) : e(n)
	}
	const Ji = function(e, t) {
		e = e || 10;
		const n = new Array(e),
			r = new Array(e);
		let a, s = 0,
			o = 0;
		return t = void 0 !== t ? t : 1e3,
			function(i) {
				const c = Date.now(),
					d = r[o];
				a || (a = c), n[s] = i, r[s] = c;
				let l = o,
					u = 0;
				for (; l !== s;) u += n[l++], l %= e;
				if (s = (s + 1) % e, s === o && (o = (o + 1) % e), c - a < t) return;
				const p = d && c - d;
				return p ? Math.round(1e3 * u / p) : void 0
			}
	};
	const Qi = function(e, t) {
			let n, r, a = 0,
				s = 1e3 / t;
			const o = (t, s = Date.now()) => {
				a = s, n = null, r && (clearTimeout(r), r = null), e.apply(null, t)
			};
			return [(...e) => {
				const t = Date.now(),
					i = t - a;
				i >= s ? o(e, t) : (n = e, r || (r = setTimeout((() => {
					r = null, o(n)
				}), s - i)))
			}, () => n && o(n)]
		},
		Zi = (e, t, n = 3) => {
			let r = 0;
			const a = Ji(50, 250);
			return Qi((n => {
				const s = n.loaded,
					o = n.lengthComputable ? n.total : void 0,
					i = s - r,
					c = a(i);
				r = s;
				e({
					loaded: s,
					total: o,
					progress: o ? s / o : void 0,
					bytes: i,
					rate: c || void 0,
					estimated: c && o && s <= o ? (o - s) / c : void 0,
					event: n,
					lengthComputable: null != o,
					[t ? "download" : "upload"]: !0
				})
			}), n)
		},
		ec = (e, t) => {
			const n = null != e;
			return [r => t[0]({
				lengthComputable: n,
				total: e,
				loaded: r
			}), t[1]]
		},
		tc = e => (...t) => ui.asap((() => e(...t))),
		nc = Mi.hasStandardBrowserEnv ? ((e, t) => n => (n = new URL(n, Mi.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Mi.origin), Mi.navigator && /(msie|trident)/i.test(Mi.navigator.userAgent)) : () => !0,
		rc = Mi.hasStandardBrowserEnv ? {
			write(e, t, n, r, a, s) {
				const o = [e + "=" + encodeURIComponent(t)];
				ui.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), ui.isString(r) && o.push("path=" + r), ui.isString(a) && o.push("domain=" + a), !0 === s && o.push("secure"), document.cookie = o.join("; ")
			},
			read(e) {
				const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
				return t ? decodeURIComponent(t[3]) : null
			},
			remove(e) {
				this.write(e, "", Date.now() - 864e5)
			}
		} : {
			write() {},
			read: () => null,
			remove() {}
		};

	function ac(e, t) {
		return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t) ? function(e, t) {
			return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
		}(e, t) : t
	}
	const sc = e => e instanceof Wi ? {
		...e
	} : e;

	function oc(e, t) {
		t = t || {};
		const n = {};

		function r(e, t, n, r) {
			return ui.isPlainObject(e) && ui.isPlainObject(t) ? ui.merge.call({
				caseless: r
			}, e, t) : ui.isPlainObject(t) ? ui.merge({}, t) : ui.isArray(t) ? t.slice() : t
		}

		function a(e, t, n, a) {
			return ui.isUndefined(t) ? ui.isUndefined(e) ? void 0 : r(void 0, e, 0, a) : r(e, t, 0, a)
		}

		function s(e, t) {
			if (!ui.isUndefined(t)) return r(void 0, t)
		}

		function o(e, t) {
			return ui.isUndefined(t) ? ui.isUndefined(e) ? void 0 : r(void 0, e) : r(void 0, t)
		}

		function i(n, a, s) {
			return s in t ? r(n, a) : s in e ? r(void 0, n) : void 0
		}
		const c = {
			url: s,
			method: s,
			data: s,
			baseURL: o,
			transformRequest: o,
			transformResponse: o,
			paramsSerializer: o,
			timeout: o,
			timeoutMessage: o,
			withCredentials: o,
			withXSRFToken: o,
			adapter: o,
			responseType: o,
			xsrfCookieName: o,
			xsrfHeaderName: o,
			onUploadProgress: o,
			onDownloadProgress: o,
			decompress: o,
			maxContentLength: o,
			maxBodyLength: o,
			beforeRedirect: o,
			transport: o,
			httpAgent: o,
			httpsAgent: o,
			cancelToken: o,
			socketPath: o,
			responseEncoding: o,
			validateStatus: i,
			headers: (e, t, n) => a(sc(e), sc(t), 0, !0)
		};
		return ui.forEach(Object.keys(Object.assign({}, e, t)), (function(r) {
			const s = c[r] || a,
				o = s(e[r], t[r], r);
			ui.isUndefined(o) && s !== i || (n[r] = o)
		})), n
	}
	const ic = e => {
			const t = oc({}, e);
			let n, {
				data: r,
				withXSRFToken: a,
				xsrfHeaderName: s,
				xsrfCookieName: o,
				headers: i,
				auth: c
			} = t;
			if (t.headers = i = Wi.from(i), t.url = Pi(ac(t.baseURL, t.url), e.params, e.paramsSerializer), c && i.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))), ui.isFormData(r))
				if (Mi.hasStandardBrowserEnv || Mi.hasStandardBrowserWebWorkerEnv) i.setContentType(void 0);
				else if (!1 !== (n = i.getContentType())) {
				const [e, ...t] = n ? n.split(";").map((e => e.trim())).filter(Boolean) : [];
				i.setContentType([e || "multipart/form-data", ...t].join("; "))
			}
			if (Mi.hasStandardBrowserEnv && (a && ui.isFunction(a) && (a = a(t)), a || !1 !== a && nc(t.url))) {
				const e = s && o && rc.read(o);
				e && i.set(s, e)
			}
			return t
		},
		cc = "undefined" != typeof XMLHttpRequest && function(e) {
			return new Promise((function(t, n) {
				const r = ic(e);
				let a = r.data;
				const s = Wi.from(r.headers).normalize();
				let o, i, c, d, l, {
					responseType: u,
					onUploadProgress: p,
					onDownloadProgress: h
				} = r;

				function g() {
					d && d(), l && l(), r.cancelToken && r.cancelToken.unsubscribe(o), r.signal && r.signal.removeEventListener("abort", o)
				}
				let f = new XMLHttpRequest;

				function y() {
					if (!f) return;
					const r = Wi.from("getAllResponseHeaders" in f && f.getAllResponseHeaders());
					Xi((function(e) {
						t(e), g()
					}), (function(e) {
						n(e), g()
					}), {
						data: u && "text" !== u && "json" !== u ? f.response : f.responseText,
						status: f.status,
						statusText: f.statusText,
						headers: r,
						config: e,
						request: f
					}), f = null
				}
				f.open(r.method.toUpperCase(), r.url, !0), f.timeout = r.timeout, "onloadend" in f ? f.onloadend = y : f.onreadystatechange = function() {
					f && 4 === f.readyState && (0 !== f.status || f.responseURL && 0 === f.responseURL.indexOf("file:")) && setTimeout(y)
				}, f.onabort = function() {
					f && (n(new fi("Request aborted", fi.ECONNABORTED, e, f)), f = null)
				}, f.onerror = function() {
					n(new fi("Network Error", fi.ERR_NETWORK, e, f)), f = null
				}, f.ontimeout = function() {
					let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
					const a = r.transitional || Ti;
					r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new fi(t, a.clarifyTimeoutError ? fi.ETIMEDOUT : fi.ECONNABORTED, e, f)), f = null
				}, void 0 === a && s.setContentType(null), "setRequestHeader" in f && ui.forEach(s.toJSON(), (function(e, t) {
					f.setRequestHeader(t, e)
				})), ui.isUndefined(r.withCredentials) || (f.withCredentials = !!r.withCredentials), u && "json" !== u && (f.responseType = r.responseType), h && ([c, l] = Zi(h, !0), f.addEventListener("progress", c)), p && f.upload && ([i, d] = Zi(p), f.upload.addEventListener("progress", i), f.upload.addEventListener("loadend", d)), (r.cancelToken || r.signal) && (o = t => {
					f && (n(!t || t.type ? new Ki(null, e, f) : t), f.abort(), f = null)
				}, r.cancelToken && r.cancelToken.subscribe(o), r.signal && (r.signal.aborted ? o() : r.signal.addEventListener("abort", o)));
				const m = function(e) {
					const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
					return t && t[1] || ""
				}(r.url);
				m && -1 === Mi.protocols.indexOf(m) ? n(new fi("Unsupported protocol " + m + ":", fi.ERR_BAD_REQUEST, e)) : f.send(a || null)
			}))
		},
		dc = (e, t) => {
			const {
				length: n
			} = e = e ? e.filter(Boolean) : [];
			if (t || n) {
				let n, r = new AbortController;
				const a = function(e) {
					if (!n) {
						n = !0, o();
						const t = e instanceof Error ? e : this.reason;
						r.abort(t instanceof fi ? t : new Ki(t instanceof Error ? t.message : t))
					}
				};
				let s = t && setTimeout((() => {
					s = null, a(new fi(`timeout ${t} of ms exceeded`, fi.ETIMEDOUT))
				}), t);
				const o = () => {
					e && (s && clearTimeout(s), s = null, e.forEach((e => {
						e.unsubscribe ? e.unsubscribe(a) : e.removeEventListener("abort", a)
					})), e = null)
				};
				e.forEach((e => e.addEventListener("abort", a)));
				const {
					signal: i
				} = r;
				return i.unsubscribe = () => ui.asap(o), i
			}
		},
		lc = function*(e, t) {
			let n = e.byteLength;
			if (!t || n < t) return void(yield e);
			let r, a = 0;
			for (; a < n;) r = a + t, yield e.slice(a, r), a = r
		},
		uc = async function*(e) {
			if (e[Symbol.asyncIterator]) return void(yield* e);
			const t = e.getReader();
			try {
				for (;;) {
					const {
						done: e,
						value: n
					} = await t.read();
					if (e) break;
					yield n
				}
			} finally {
				await t.cancel()
			}
		}, pc = (e, t, n, r) => {
			const a = async function*(e, t) {
				for await (const n of uc(e)) yield* lc(n, t)
			}(e, t);
			let s, o = 0,
				i = e => {
					s || (s = !0, r && r(e))
				};
			return new ReadableStream({
				async pull(e) {
					try {
						const {
							done: t,
							value: r
						} = await a.next();
						if (t) return i(), void e.close();
						let s = r.byteLength;
						if (n) {
							let e = o += s;
							n(e)
						}
						e.enqueue(new Uint8Array(r))
					} catch (e) {
						throw i(e), e
					}
				},
				cancel: e => (i(e), a.return())
			}, {
				highWaterMark: 2
			})
		}, hc = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response, gc = hc && "function" == typeof ReadableStream, fc = hc && ("function" == typeof TextEncoder ? (yc = new TextEncoder, e => yc.encode(e)) : async e => new Uint8Array(await new Response(e).arrayBuffer()));
	var yc;
	const mc = (e, ...t) => {
			try {
				return !!e(...t)
			} catch (e) {
				return !1
			}
		},
		Ic = gc && mc((() => {
			let e = !1;
			const t = new Request(Mi.origin, {
				body: new ReadableStream,
				method: "POST",
				get duplex() {
					return e = !0, "half"
				}
			}).headers.has("Content-Type");
			return e && !t
		})),
		Ec = gc && mc((() => ui.isReadableStream(new Response("").body))),
		Ac = {
			stream: Ec && (e => e.body)
		};
	var _c;
	hc && (_c = new Response, ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e => {
		!Ac[e] && (Ac[e] = ui.isFunction(_c[e]) ? t => t[e]() : (t, n) => {
			throw new fi(`Response type '${e}' is not supported`, fi.ERR_NOT_SUPPORT, n)
		})
	})));
	const Sc = async (e, t) => {
		const n = ui.toFiniteNumber(e.getContentLength());
		return null == n ? (async e => {
			if (null == e) return 0;
			if (ui.isBlob(e)) return e.size;
			if (ui.isSpecCompliantForm(e)) {
				const t = new Request(Mi.origin, {
					method: "POST",
					body: e
				});
				return (await t.arrayBuffer()).byteLength
			}
			return ui.isArrayBufferView(e) || ui.isArrayBuffer(e) ? e.byteLength : (ui.isURLSearchParams(e) && (e += ""), ui.isString(e) ? (await fc(e)).byteLength : void 0)
		})(t) : n
	}, Cc = hc && (async e => {
		let {
			url: t,
			method: n,
			data: r,
			signal: a,
			cancelToken: s,
			timeout: o,
			onDownloadProgress: i,
			onUploadProgress: c,
			responseType: d,
			headers: l,
			withCredentials: u = "same-origin",
			fetchOptions: p
		} = ic(e);
		d = d ? (d + "").toLowerCase() : "text";
		let h, g = dc([a, s && s.toAbortSignal()], o);
		const f = g && g.unsubscribe && (() => {
			g.unsubscribe()
		});
		let y;
		try {
			if (c && Ic && "get" !== n && "head" !== n && 0 !== (y = await Sc(l, r))) {
				let e, n = new Request(t, {
					method: "POST",
					body: r,
					duplex: "half"
				});
				if (ui.isFormData(r) && (e = n.headers.get("content-type")) && l.setContentType(e), n.body) {
					const [e, t] = ec(y, Zi(tc(c)));
					r = pc(n.body, 65536, e, t)
				}
			}
			ui.isString(u) || (u = u ? "include" : "omit");
			const a = "credentials" in Request.prototype;
			h = new Request(t, {
				...p,
				signal: g,
				method: n.toUpperCase(),
				headers: l.normalize().toJSON(),
				body: r,
				duplex: "half",
				credentials: a ? u : void 0
			});
			let s = await fetch(h);
			const o = Ec && ("stream" === d || "response" === d);
			if (Ec && (i || o && f)) {
				const e = {};
				["status", "statusText", "headers"].forEach((t => {
					e[t] = s[t]
				}));
				const t = ui.toFiniteNumber(s.headers.get("content-length")),
					[n, r] = i && ec(t, Zi(tc(i), !0)) || [];
				s = new Response(pc(s.body, 65536, n, (() => {
					r && r(), f && f()
				})), e)
			}
			d = d || "text";
			let m = await Ac[ui.findKey(Ac, d) || "text"](s, e);
			return !o && f && f(), await new Promise(((t, n) => {
				Xi(t, n, {
					data: m,
					headers: Wi.from(s.headers),
					status: s.status,
					statusText: s.statusText,
					config: e,
					request: h
				})
			}))
		} catch (t) {
			if (f && f(), t && "TypeError" === t.name && /fetch/i.test(t.message)) throw Object.assign(new fi("Network Error", fi.ERR_NETWORK, e, h), {
				cause: t.cause || t
			});
			throw fi.from(t, t && t.code, e, h)
		}
	}), $c = {
		http: null,
		xhr: cc,
		fetch: Cc
	};
	ui.forEach($c, ((e, t) => {
		if (e) {
			try {
				Object.defineProperty(e, "name", {
					value: t
				})
			} catch (e) {}
			Object.defineProperty(e, "adapterName", {
				value: t
			})
		}
	}));
	const bc = e => `- ${e}`,
		Pc = e => ui.isFunction(e) || null === e || !1 === e,
		Oc = e => {
			e = ui.isArray(e) ? e : [e];
			const {
				length: t
			} = e;
			let n, r;
			const a = {};
			for (let s = 0; s < t; s++) {
				let t;
				if (n = e[s], r = n, !Pc(n) && (r = $c[(t = String(n)).toLowerCase()], void 0 === r)) throw new fi(`Unknown adapter '${t}'`);
				if (r) break;
				a[t || "#" + s] = r
			}
			if (!r) {
				const e = Object.entries(a).map((([e, t]) => `adapter ${e} ` + (!1 === t ? "is not supported by the environment" : "is not available in the build")));
				let n = t ? e.length > 1 ? "since :\n" + e.map(bc).join("\n") : " " + bc(e[0]) : "as no adapter specified";
				throw new fi("There is no suitable adapter to dispatch the request " + n, "ERR_NOT_SUPPORT")
			}
			return r
		};

	function Tc(e) {
		if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Ki(null, e)
	}

	function vc(e) {
		Tc(e), e.headers = Wi.from(e.headers), e.data = qi.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1);
		return Oc(e.adapter || Ui.adapter)(e).then((function(t) {
			return Tc(e), t.data = qi.call(e, e.transformResponse, t), t.headers = Wi.from(t.headers), t
		}), (function(t) {
			return zi(t) || (Tc(e), t && t.response && (t.response.data = qi.call(e, e.transformResponse, t.response), t.response.headers = Wi.from(t.response.headers))), Promise.reject(t)
		}))
	}
	const Nc = "1.7.9",
		Rc = {};
	["object", "boolean", "number", "function", "string", "symbol"].forEach(((e, t) => {
		Rc[e] = function(n) {
			return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
		}
	}));
	const Dc = {};
	Rc.transitional = function(e, t, n) {
		function r(e, t) {
			return "[Axios v1.7.9] Transitional option '" + e + "'" + t + (n ? ". " + n : "")
		}
		return (n, a, s) => {
			if (!1 === e) throw new fi(r(a, " has been removed" + (t ? " in " + t : "")), fi.ERR_DEPRECATED);
			return t && !Dc[a] && (Dc[a] = !0, console.warn(r(a, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, a, s)
		}
	}, Rc.spelling = function(e) {
		return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0)
	};
	const xc = {
			assertOptions: function(e, t, n) {
				if ("object" != typeof e) throw new fi("options must be an object", fi.ERR_BAD_OPTION_VALUE);
				const r = Object.keys(e);
				let a = r.length;
				for (; a-- > 0;) {
					const s = r[a],
						o = t[s];
					if (o) {
						const t = e[s],
							n = void 0 === t || o(t, s, e);
						if (!0 !== n) throw new fi("option " + s + " must be " + n, fi.ERR_BAD_OPTION_VALUE)
					} else if (!0 !== n) throw new fi("Unknown option " + s, fi.ERR_BAD_OPTION)
				}
			},
			validators: Rc
		},
		wc = xc.validators;
	class Mc {
		constructor(e) {
			this.defaults = e, this.interceptors = {
				request: new Oi,
				response: new Oi
			}
		}
		async request(e, t) {
			try {
				return await this._request(e, t)
			} catch (e) {
				if (e instanceof Error) {
					let t = {};
					Error.captureStackTrace ? Error.captureStackTrace(t) : t = new Error;
					const n = t.stack ? t.stack.replace(/^.+\n/, "") : "";
					try {
						e.stack ? n && !String(e.stack).endsWith(n.replace(/^.+\n.+\n/, "")) && (e.stack += "\n" + n) : e.stack = n
					} catch (e) {}
				}
				throw e
			}
		}
		_request(e, t) {
			"string" == typeof e ? (t = t || {}).url = e : t = e || {}, t = oc(this.defaults, t);
			const {
				transitional: n,
				paramsSerializer: r,
				headers: a
			} = t;
			void 0 !== n && xc.assertOptions(n, {
				silentJSONParsing: wc.transitional(wc.boolean),
				forcedJSONParsing: wc.transitional(wc.boolean),
				clarifyTimeoutError: wc.transitional(wc.boolean)
			}, !1), null != r && (ui.isFunction(r) ? t.paramsSerializer = {
				serialize: r
			} : xc.assertOptions(r, {
				encode: wc.function,
				serialize: wc.function
			}, !0)), xc.assertOptions(t, {
				baseUrl: wc.spelling("baseURL"),
				withXsrfToken: wc.spelling("withXSRFToken")
			}, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
			let s = a && ui.merge(a.common, a[t.method]);
			a && ui.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e => {
				delete a[e]
			})), t.headers = Wi.concat(s, a);
			const o = [];
			let i = !0;
			this.interceptors.request.forEach((function(e) {
				"function" == typeof e.runWhen && !1 === e.runWhen(t) || (i = i && e.synchronous, o.unshift(e.fulfilled, e.rejected))
			}));
			const c = [];
			let d;
			this.interceptors.response.forEach((function(e) {
				c.push(e.fulfilled, e.rejected)
			}));
			let l, u = 0;
			if (!i) {
				const e = [vc.bind(this), void 0];
				for (e.unshift.apply(e, o), e.push.apply(e, c), l = e.length, d = Promise.resolve(t); u < l;) d = d.then(e[u++], e[u++]);
				return d
			}
			l = o.length;
			let p = t;
			for (u = 0; u < l;) {
				const e = o[u++],
					t = o[u++];
				try {
					p = e(p)
				} catch (e) {
					t.call(this, e);
					break
				}
			}
			try {
				d = vc.call(this, p)
			} catch (e) {
				return Promise.reject(e)
			}
			for (u = 0, l = c.length; u < l;) d = d.then(c[u++], c[u++]);
			return d
		}
		getUri(e) {
			return Pi(ac((e = oc(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer)
		}
	}
	ui.forEach(["delete", "get", "head", "options"], (function(e) {
		Mc.prototype[e] = function(t, n) {
			return this.request(oc(n || {}, {
				method: e,
				url: t,
				data: (n || {}).data
			}))
		}
	})), ui.forEach(["post", "put", "patch"], (function(e) {
		function t(t) {
			return function(n, r, a) {
				return this.request(oc(a || {}, {
					method: e,
					headers: t ? {
						"Content-Type": "multipart/form-data"
					} : {},
					url: n,
					data: r
				}))
			}
		}
		Mc.prototype[e] = t(), Mc.prototype[e + "Form"] = t(!0)
	}));
	const Lc = Mc;
	class jc {
		constructor(e) {
			if ("function" != typeof e) throw new TypeError("executor must be a function.");
			let t;
			this.promise = new Promise((function(e) {
				t = e
			}));
			const n = this;
			this.promise.then((e => {
				if (!n._listeners) return;
				let t = n._listeners.length;
				for (; t-- > 0;) n._listeners[t](e);
				n._listeners = null
			})), this.promise.then = e => {
				let t;
				const r = new Promise((e => {
					n.subscribe(e), t = e
				})).then(e);
				return r.cancel = function() {
					n.unsubscribe(t)
				}, r
			}, e((function(e, r, a) {
				n.reason || (n.reason = new Ki(e, r, a), t(n.reason))
			}))
		}
		throwIfRequested() {
			if (this.reason) throw this.reason
		}
		subscribe(e) {
			this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
		}
		unsubscribe(e) {
			if (!this._listeners) return;
			const t = this._listeners.indexOf(e); - 1 !== t && this._listeners.splice(t, 1)
		}
		toAbortSignal() {
			const e = new AbortController,
				t = t => {
					e.abort(t)
				};
			return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal
		}
		static source() {
			let e;
			return {
				token: new jc((function(t) {
					e = t
				})),
				cancel: e
			}
		}
	}
	const Uc = jc;
	const Fc = {
		Continue: 100,
		SwitchingProtocols: 101,
		Processing: 102,
		EarlyHints: 103,
		Ok: 200,
		Created: 201,
		Accepted: 202,
		NonAuthoritativeInformation: 203,
		NoContent: 204,
		ResetContent: 205,
		PartialContent: 206,
		MultiStatus: 207,
		AlreadyReported: 208,
		ImUsed: 226,
		MultipleChoices: 300,
		MovedPermanently: 301,
		Found: 302,
		SeeOther: 303,
		NotModified: 304,
		UseProxy: 305,
		Unused: 306,
		TemporaryRedirect: 307,
		PermanentRedirect: 308,
		BadRequest: 400,
		Unauthorized: 401,
		PaymentRequired: 402,
		Forbidden: 403,
		NotFound: 404,
		MethodNotAllowed: 405,
		NotAcceptable: 406,
		ProxyAuthenticationRequired: 407,
		RequestTimeout: 408,
		Conflict: 409,
		Gone: 410,
		LengthRequired: 411,
		PreconditionFailed: 412,
		PayloadTooLarge: 413,
		UriTooLong: 414,
		UnsupportedMediaType: 415,
		RangeNotSatisfiable: 416,
		ExpectationFailed: 417,
		ImATeapot: 418,
		MisdirectedRequest: 421,
		UnprocessableEntity: 422,
		Locked: 423,
		FailedDependency: 424,
		TooEarly: 425,
		UpgradeRequired: 426,
		PreconditionRequired: 428,
		TooManyRequests: 429,
		RequestHeaderFieldsTooLarge: 431,
		UnavailableForLegalReasons: 451,
		InternalServerError: 500,
		NotImplemented: 501,
		BadGateway: 502,
		ServiceUnavailable: 503,
		GatewayTimeout: 504,
		HttpVersionNotSupported: 505,
		VariantAlsoNegotiates: 506,
		InsufficientStorage: 507,
		LoopDetected: 508,
		NotExtended: 510,
		NetworkAuthenticationRequired: 511
	};
	Object.entries(Fc).forEach((([e, t]) => {
		Fc[t] = e
	}));
	const kc = Fc;
	const Vc = function e(t) {
		const n = new Lc(t),
			r = _o(Lc.prototype.request, n);
		return ui.extend(r, Lc.prototype, n, {
			allOwnKeys: !0
		}), ui.extend(r, n, null, {
			allOwnKeys: !0
		}), r.create = function(n) {
			return e(oc(t, n))
		}, r
	}(Ui);
	Vc.Axios = Lc, Vc.CanceledError = Ki, Vc.CancelToken = Uc, Vc.isCancel = zi, Vc.VERSION = Nc, Vc.toFormData = Ai, Vc.AxiosError = fi, Vc.Cancel = Vc.CanceledError, Vc.all = function(e) {
		return Promise.all(e)
	}, Vc.spread = function(e) {
		return function(t) {
			return e.apply(null, t)
		}
	}, Vc.isAxiosError = function(e) {
		return ui.isObject(e) && !0 === e.isAxiosError
	}, Vc.mergeConfig = oc, Vc.AxiosHeaders = Wi, Vc.formToJSON = e => Li(ui.isHTMLForm(e) ? new FormData(e) : e), Vc.getAdapter = Oc, Vc.HttpStatusCode = kc, Vc.default = Vc;
	const Gc = Vc;
	var Bc = function(e, t) {
		return Bc = Object.setPrototypeOf || {
			__proto__: []
		}
		instanceof Array && function(e, t) {
			e.__proto__ = t
		} || function(e, t) {
			for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
		}, Bc(e, t)
	};

	function Hc(e, t) {
		if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

		function n() {
			this.constructor = e
		}
		Bc(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
	}

	function Wc(e, t, n, r) {
		return new(n || (n = Promise))((function(a, s) {
			function o(e) {
				try {
					c(r.next(e))
				} catch (e) {
					s(e)
				}
			}

			function i(e) {
				try {
					c(r.throw(e))
				} catch (e) {
					s(e)
				}
			}

			function c(e) {
				var t;
				e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
					e(t)
				}))).then(o, i)
			}
			c((r = r.apply(e, t || [])).next())
		}))
	}

	function qc(e, t) {
		var n, r, a, s, o = {
			label: 0,
			sent: function() {
				if (1 & a[0]) throw a[1];
				return a[1]
			},
			trys: [],
			ops: []
		};
		return s = {
			next: i(0),
			throw: i(1),
			return: i(2)
		}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
			return this
		}), s;

		function i(s) {
			return function(i) {
				return function(s) {
					if (n) throw new TypeError("Generator is already executing.");
					for (; o;) try {
						if (n = 1, r && (a = 2 & s[0] ? r.return : s[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) && !(a = a.call(r, s[1])).done) return a;
						switch (r = 0, a && (s = [2 & s[0], a.value]), s[0]) {
							case 0:
							case 1:
								a = s;
								break;
							case 4:
								return o.label++, {
									value: s[1],
									done: !1
								};
							case 5:
								o.label++, r = s[1], s = [0];
								continue;
							case 7:
								s = o.ops.pop(), o.trys.pop();
								continue;
							default:
								if (!(a = o.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
									o = 0;
									continue
								}
								if (3 === s[0] && (!a || s[1] > a[0] && s[1] < a[3])) {
									o.label = s[1];
									break
								}
								if (6 === s[0] && o.label < a[1]) {
									o.label = a[1], a = s;
									break
								}
								if (a && o.label < a[2]) {
									o.label = a[2], o.ops.push(s);
									break
								}
								a[2] && o.ops.pop(), o.trys.pop();
								continue
						}
						s = t.call(e, o)
					} catch (e) {
						s = [6, e], r = 0
					} finally {
						n = a = 0
					}
					if (5 & s[0]) throw s[1];
					return {
						value: s[0] ? s[1] : void 0,
						done: !0
					}
				}([s, i])
			}
		}
	}
	Object.create;

	function zc(e) {
		var t = "function" == typeof Symbol && Symbol.iterator,
			n = t && e[t],
			r = 0;
		if (n) return n.call(e);
		if (e && "number" == typeof e.length) return {
			next: function() {
				return e && r >= e.length && (e = void 0), {
					value: e && e[r++],
					done: !e
				}
			}
		};
		throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
	}

	function Yc(e, t) {
		var n = "function" == typeof Symbol && e[Symbol.iterator];
		if (!n) return e;
		var r, a, s = n.call(e),
			o = [];
		try {
			for (;
				(void 0 === t || t-- > 0) && !(r = s.next()).done;) o.push(r.value)
		} catch (e) {
			a = {
				error: e
			}
		} finally {
			try {
				r && !r.done && (n = s.return) && n.call(s)
			} finally {
				if (a) throw a.error
			}
		}
		return o
	}

	function Kc(e, t) {
		for (var n = 0, r = t.length, a = e.length; n < r; n++, a++) e[a] = t[n];
		return e
	}

	function Xc(e) {
		return this instanceof Xc ? (this.v = e, this) : new Xc(e)
	}

	function Jc(e, t, n) {
		if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
		var r, a = n.apply(e, t || []),
			s = [];
		return r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
			return this
		}, r;

		function o(e) {
			a[e] && (r[e] = function(t) {
				return new Promise((function(n, r) {
					s.push([e, t, n, r]) > 1 || i(e, t)
				}))
			})
		}

		function i(e, t) {
			try {
				(n = a[e](t)).value instanceof Xc ? Promise.resolve(n.value.v).then(c, d) : l(s[0][2], n)
			} catch (e) {
				l(s[0][3], e)
			}
			var n
		}

		function c(e) {
			i("next", e)
		}

		function d(e) {
			i("throw", e)
		}

		function l(e, t) {
			e(t), s.shift(), s.length && i(s[0][0], s[0][1])
		}
	}

	function Qc(e) {
		if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
		var t, n = e[Symbol.asyncIterator];
		return n ? n.call(e) : (e = zc(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
			return this
		}, t);

		function r(n) {
			t[n] = e[n] && function(t) {
				return new Promise((function(r, a) {
					(function(e, t, n, r) {
						Promise.resolve(r).then((function(t) {
							e({
								value: t,
								done: n
							})
						}), t)
					})(r, a, (t = e[n](t)).done, t.value)
				}))
			}
		}
	}
	Object.create;
	var Zc = function(e) {
		return e && "number" == typeof e.length && "function" != typeof e
	};

	function ed(e) {
		return "function" == typeof e
	}

	function td(e) {
		return ed(null == e ? void 0 : e.then)
	}

	function nd(e) {
		var t = e((function(e) {
			Error.call(e), e.stack = (new Error).stack
		}));
		return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
	}
	var rd = nd((function(e) {
		return function(t) {
			e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(e, t) {
				return t + 1 + ") " + e.toString()
			})).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t
		}
	}));

	function ad(e, t) {
		if (e) {
			var n = e.indexOf(t);
			0 <= n && e.splice(n, 1)
		}
	}
	var sd = function() {
			function e(e) {
				this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null
			}
			return e.prototype.unsubscribe = function() {
				var e, t, n, r, a;
				if (!this.closed) {
					this.closed = !0;
					var s = this._parentage;
					if (s)
						if (this._parentage = null, Array.isArray(s)) try {
							for (var o = zc(s), i = o.next(); !i.done; i = o.next()) {
								i.value.remove(this)
							}
						} catch (t) {
							e = {
								error: t
							}
						} finally {
							try {
								i && !i.done && (t = o.return) && t.call(o)
							} finally {
								if (e) throw e.error
							}
						} else s.remove(this);
					var c = this.initialTeardown;
					if (ed(c)) try {
						c()
					} catch (e) {
						a = e instanceof rd ? e.errors : [e]
					}
					var d = this._finalizers;
					if (d) {
						this._finalizers = null;
						try {
							for (var l = zc(d), u = l.next(); !u.done; u = l.next()) {
								var p = u.value;
								try {
									cd(p)
								} catch (e) {
									a = null != a ? a : [], e instanceof rd ? a = Kc(Kc([], Yc(a)), Yc(e.errors)) : a.push(e)
								}
							}
						} catch (e) {
							n = {
								error: e
							}
						} finally {
							try {
								u && !u.done && (r = l.return) && r.call(l)
							} finally {
								if (n) throw n.error
							}
						}
					}
					if (a) throw new rd(a)
				}
			}, e.prototype.add = function(t) {
				var n;
				if (t && t !== this)
					if (this.closed) cd(t);
					else {
						if (t instanceof e) {
							if (t.closed || t._hasParent(this)) return;
							t._addParent(this)
						}(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
					}
			}, e.prototype._hasParent = function(e) {
				var t = this._parentage;
				return t === e || Array.isArray(t) && t.includes(e)
			}, e.prototype._addParent = function(e) {
				var t = this._parentage;
				this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e
			}, e.prototype._removeParent = function(e) {
				var t = this._parentage;
				t === e ? this._parentage = null : Array.isArray(t) && ad(t, e)
			}, e.prototype.remove = function(t) {
				var n = this._finalizers;
				n && ad(n, t), t instanceof e && t._removeParent(this)
			}, e.EMPTY = function() {
				var t = new e;
				return t.closed = !0, t
			}(), e
		}(),
		od = sd.EMPTY;

	function id(e) {
		return e instanceof sd || e && "closed" in e && ed(e.remove) && ed(e.add) && ed(e.unsubscribe)
	}

	function cd(e) {
		ed(e) ? e() : e.unsubscribe()
	}
	var dd = {
			onUnhandledError: null,
			onStoppedNotification: null,
			Promise: void 0,
			useDeprecatedSynchronousErrorHandling: !1,
			useDeprecatedNextContext: !1
		},
		ld = {
			setTimeout: function(e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				var a = ld.delegate;
				return (null == a ? void 0 : a.setTimeout) ? a.setTimeout.apply(a, Kc([e, t], Yc(n))) : setTimeout.apply(void 0, Kc([e, t], Yc(n)))
			},
			clearTimeout: function(e) {
				var t = ld.delegate;
				return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e)
			},
			delegate: void 0
		};

	function ud(e) {
		ld.setTimeout((function() {
			var t = dd.onUnhandledError;
			if (!t) throw e;
			t(e)
		}))
	}

	function pd() {}
	var hd = gd("C", void 0, void 0);

	function gd(e, t, n) {
		return {
			kind: e,
			value: t,
			error: n
		}
	}
	var fd = null;

	function yd(e) {
		if (dd.useDeprecatedSynchronousErrorHandling) {
			var t = !fd;
			if (t && (fd = {
					errorThrown: !1,
					error: null
				}), e(), t) {
				var n = fd,
					r = n.errorThrown,
					a = n.error;
				if (fd = null, r) throw a
			}
		} else e()
	}
	var md = function(e) {
			function t(t) {
				var n = e.call(this) || this;
				return n.isStopped = !1, t ? (n.destination = t, id(t) && t.add(n)) : n.destination = $d, n
			}
			return Hc(t, e), t.create = function(e, t, n) {
				return new _d(e, t, n)
			}, t.prototype.next = function(e) {
				this.isStopped ? Cd(function(e) {
					return gd("N", e, void 0)
				}(e), this) : this._next(e)
			}, t.prototype.error = function(e) {
				this.isStopped ? Cd(gd("E", void 0, e), this) : (this.isStopped = !0, this._error(e))
			}, t.prototype.complete = function() {
				this.isStopped ? Cd(hd, this) : (this.isStopped = !0, this._complete())
			}, t.prototype.unsubscribe = function() {
				this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null)
			}, t.prototype._next = function(e) {
				this.destination.next(e)
			}, t.prototype._error = function(e) {
				try {
					this.destination.error(e)
				} finally {
					this.unsubscribe()
				}
			}, t.prototype._complete = function() {
				try {
					this.destination.complete()
				} finally {
					this.unsubscribe()
				}
			}, t
		}(sd),
		Id = Function.prototype.bind;

	function Ed(e, t) {
		return Id.call(e, t)
	}
	var Ad = function() {
			function e(e) {
				this.partialObserver = e
			}
			return e.prototype.next = function(e) {
				var t = this.partialObserver;
				if (t.next) try {
					t.next(e)
				} catch (e) {
					Sd(e)
				}
			}, e.prototype.error = function(e) {
				var t = this.partialObserver;
				if (t.error) try {
					t.error(e)
				} catch (e) {
					Sd(e)
				} else Sd(e)
			}, e.prototype.complete = function() {
				var e = this.partialObserver;
				if (e.complete) try {
					e.complete()
				} catch (e) {
					Sd(e)
				}
			}, e
		}(),
		_d = function(e) {
			function t(t, n, r) {
				var a, s, o = e.call(this) || this;
				ed(t) || !t ? a = {
					next: null != t ? t : void 0,
					error: null != n ? n : void 0,
					complete: null != r ? r : void 0
				} : o && dd.useDeprecatedNextContext ? ((s = Object.create(t)).unsubscribe = function() {
					return o.unsubscribe()
				}, a = {
					next: t.next && Ed(t.next, s),
					error: t.error && Ed(t.error, s),
					complete: t.complete && Ed(t.complete, s)
				}) : a = t;
				return o.destination = new Ad(a), o
			}
			return Hc(t, e), t
		}(md);

	function Sd(e) {
		var t;
		dd.useDeprecatedSynchronousErrorHandling ? (t = e, dd.useDeprecatedSynchronousErrorHandling && fd && (fd.errorThrown = !0, fd.error = t)) : ud(e)
	}

	function Cd(e, t) {
		var n = dd.onStoppedNotification;
		n && ld.setTimeout((function() {
			return n(e, t)
		}))
	}
	var $d = {
			closed: !0,
			next: pd,
			error: function(e) {
				throw e
			},
			complete: pd
		},
		bd = "function" == typeof Symbol && Symbol.observable || "@@observable";

	function Pd(e) {
		return e
	}

	function Od(e) {
		return 0 === e.length ? Pd : 1 === e.length ? e[0] : function(t) {
			return e.reduce((function(e, t) {
				return t(e)
			}), t)
		}
	}
	var Td = function() {
		function e(e) {
			e && (this._subscribe = e)
		}
		return e.prototype.lift = function(t) {
			var n = new e;
			return n.source = this, n.operator = t, n
		}, e.prototype.subscribe = function(e, t, n) {
			var r, a = this,
				s = (r = e) && r instanceof md || function(e) {
					return e && ed(e.next) && ed(e.error) && ed(e.complete)
				}(r) && id(r) ? e : new _d(e, t, n);
			return yd((function() {
				var e = a,
					t = e.operator,
					n = e.source;
				s.add(t ? t.call(s, n) : n ? a._subscribe(s) : a._trySubscribe(s))
			})), s
		}, e.prototype._trySubscribe = function(e) {
			try {
				return this._subscribe(e)
			} catch (t) {
				e.error(t)
			}
		}, e.prototype.forEach = function(e, t) {
			var n = this;
			return new(t = vd(t))((function(t, r) {
				var a = new _d({
					next: function(t) {
						try {
							e(t)
						} catch (e) {
							r(e), a.unsubscribe()
						}
					},
					error: r,
					complete: t
				});
				n.subscribe(a)
			}))
		}, e.prototype._subscribe = function(e) {
			var t;
			return null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)
		}, e.prototype[bd] = function() {
			return this
		}, e.prototype.pipe = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return Od(e)(this)
		}, e.prototype.toPromise = function(e) {
			var t = this;
			return new(e = vd(e))((function(e, n) {
				var r;
				t.subscribe((function(e) {
					return r = e
				}), (function(e) {
					return n(e)
				}), (function() {
					return e(r)
				}))
			}))
		}, e.create = function(t) {
			return new e(t)
		}, e
	}();

	function vd(e) {
		var t;
		return null !== (t = null != e ? e : dd.Promise) && void 0 !== t ? t : Promise
	}

	function Nd(e) {
		return ed(e[bd])
	}

	function Rd(e) {
		return Symbol.asyncIterator && ed(null == e ? void 0 : e[Symbol.asyncIterator])
	}

	function Dd(e) {
		return new TypeError("You provided " + (null !== e && "object" == typeof e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
	}
	var xd = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";

	function wd(e) {
		return ed(null == e ? void 0 : e[xd])
	}

	function Md(e) {
		return Jc(this, arguments, (function() {
			var t, n, r;
			return qc(this, (function(a) {
				switch (a.label) {
					case 0:
						t = e.getReader(), a.label = 1;
					case 1:
						a.trys.push([1, , 9, 10]), a.label = 2;
					case 2:
						return [4, Xc(t.read())];
					case 3:
						return n = a.sent(), r = n.value, n.done ? [4, Xc(void 0)] : [3, 5];
					case 4:
						return [2, a.sent()];
					case 5:
						return [4, Xc(r)];
					case 6:
						return [4, a.sent()];
					case 7:
						return a.sent(), [3, 2];
					case 8:
						return [3, 10];
					case 9:
						return t.releaseLock(), [7];
					case 10:
						return [2]
				}
			}))
		}))
	}

	function Ld(e) {
		return ed(null == e ? void 0 : e.getReader)
	}

	function jd(e) {
		if (e instanceof Td) return e;
		if (null != e) {
			if (Nd(e)) return a = e, new Td((function(e) {
				var t = a[bd]();
				if (ed(t.subscribe)) return t.subscribe(e);
				throw new TypeError("Provided object does not correctly implement Symbol.observable")
			}));
			if (Zc(e)) return r = e, new Td((function(e) {
				for (var t = 0; t < r.length && !e.closed; t++) e.next(r[t]);
				e.complete()
			}));
			if (td(e)) return n = e, new Td((function(e) {
				n.then((function(t) {
					e.closed || (e.next(t), e.complete())
				}), (function(t) {
					return e.error(t)
				})).then(null, ud)
			}));
			if (Rd(e)) return Ud(e);
			if (wd(e)) return t = e, new Td((function(e) {
				var n, r;
				try {
					for (var a = zc(t), s = a.next(); !s.done; s = a.next()) {
						var o = s.value;
						if (e.next(o), e.closed) return
					}
				} catch (e) {
					n = {
						error: e
					}
				} finally {
					try {
						s && !s.done && (r = a.return) && r.call(a)
					} finally {
						if (n) throw n.error
					}
				}
				e.complete()
			}));
			if (Ld(e)) return Ud(Md(e))
		}
		var t, n, r, a;
		throw Dd(e)
	}

	function Ud(e) {
		return new Td((function(t) {
			(function(e, t) {
				var n, r, a, s;
				return Wc(this, void 0, void 0, (function() {
					var o, i;
					return qc(this, (function(c) {
						switch (c.label) {
							case 0:
								c.trys.push([0, 5, 6, 11]), n = Qc(e), c.label = 1;
							case 1:
								return [4, n.next()];
							case 2:
								if ((r = c.sent()).done) return [3, 4];
								if (o = r.value, t.next(o), t.closed) return [2];
								c.label = 3;
							case 3:
								return [3, 1];
							case 4:
								return [3, 11];
							case 5:
								return i = c.sent(), a = {
									error: i
								}, [3, 11];
							case 6:
								return c.trys.push([6, , 9, 10]), r && !r.done && (s = n.return) ? [4, s.call(n)] : [3, 8];
							case 7:
								c.sent(), c.label = 8;
							case 8:
								return [3, 10];
							case 9:
								if (a) throw a.error;
								return [7];
							case 10:
								return [7];
							case 11:
								return t.complete(), [2]
						}
					}))
				}))
			})(e, t).catch((function(e) {
				return t.error(e)
			}))
		}))
	}

	function Fd(e, t, n, r, a) {
		void 0 === r && (r = 0), void 0 === a && (a = !1);
		var s = t.schedule((function() {
			n(), a ? e.add(this.schedule(null, r)) : this.unsubscribe()
		}), r);
		if (e.add(s), !a) return s
	}

	function kd(e) {
		return function(t) {
			if (function(e) {
					return ed(null == e ? void 0 : e.lift)
				}(t)) return t.lift((function(t) {
				try {
					return e(t, this)
				} catch (e) {
					this.error(e)
				}
			}));
			throw new TypeError("Unable to lift unknown Observable type")
		}
	}

	function Vd(e, t, n, r, a) {
		return new Gd(e, t, n, r, a)
	}
	var Gd = function(e) {
		function t(t, n, r, a, s, o) {
			var i = e.call(this, t) || this;
			return i.onFinalize = s, i.shouldUnsubscribe = o, i._next = n ? function(e) {
				try {
					n(e)
				} catch (e) {
					t.error(e)
				}
			} : e.prototype._next, i._error = a ? function(e) {
				try {
					a(e)
				} catch (e) {
					t.error(e)
				} finally {
					this.unsubscribe()
				}
			} : e.prototype._error, i._complete = r ? function() {
				try {
					r()
				} catch (e) {
					t.error(e)
				} finally {
					this.unsubscribe()
				}
			} : e.prototype._complete, i
		}
		return Hc(t, e), t.prototype.unsubscribe = function() {
			var t;
			if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
				var n = this.closed;
				e.prototype.unsubscribe.call(this), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
			}
		}, t
	}(md);

	function Bd(e, t) {
		return void 0 === t && (t = 0), kd((function(n, r) {
			n.subscribe(Vd(r, (function(n) {
				return Fd(r, e, (function() {
					return r.next(n)
				}), t)
			}), (function() {
				return Fd(r, e, (function() {
					return r.complete()
				}), t)
			}), (function(n) {
				return Fd(r, e, (function() {
					return r.error(n)
				}), t)
			})))
		}))
	}

	function Hd(e, t) {
		return void 0 === t && (t = 0), kd((function(n, r) {
			r.add(e.schedule((function() {
				return n.subscribe(r)
			}), t))
		}))
	}

	function Wd(e, t) {
		if (!e) throw new Error("Iterable cannot be null");
		return new Td((function(n) {
			Fd(n, t, (function() {
				var r = e[Symbol.asyncIterator]();
				Fd(n, t, (function() {
					r.next().then((function(e) {
						e.done ? n.complete() : n.next(e.value)
					}))
				}), 0, !0)
			}))
		}))
	}

	function qd(e, t) {
		if (null != e) {
			if (Nd(e)) return function(e, t) {
				return jd(e).pipe(Hd(t), Bd(t))
			}(e, t);
			if (Zc(e)) return function(e, t) {
				return new Td((function(n) {
					var r = 0;
					return t.schedule((function() {
						r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
					}))
				}))
			}(e, t);
			if (td(e)) return function(e, t) {
				return jd(e).pipe(Hd(t), Bd(t))
			}(e, t);
			if (Rd(e)) return Wd(e, t);
			if (wd(e)) return function(e, t) {
				return new Td((function(n) {
					var r;
					return Fd(n, t, (function() {
							r = e[xd](), Fd(n, t, (function() {
								var e, t, a;
								try {
									t = (e = r.next()).value, a = e.done
								} catch (e) {
									return void n.error(e)
								}
								a ? n.complete() : n.next(t)
							}), 0, !0)
						})),
						function() {
							return ed(null == r ? void 0 : r.return) && r.return()
						}
				}))
			}(e, t);
			if (Ld(e)) return function(e, t) {
				return Wd(Md(e), t)
			}(e, t)
		}
		throw Dd(e)
	}

	function zd(e, t) {
		return t ? qd(e, t) : jd(e)
	}

	function Yd(e, t, n) {
		var r = ed(e) || t || n ? {
			next: e,
			error: t,
			complete: n
		} : e;
		return r ? kd((function(e, t) {
			var n;
			null === (n = r.subscribe) || void 0 === n || n.call(r);
			var a = !0;
			e.subscribe(Vd(t, (function(e) {
				var n;
				null === (n = r.next) || void 0 === n || n.call(r, e), t.next(e)
			}), (function() {
				var e;
				a = !1, null === (e = r.complete) || void 0 === e || e.call(r), t.complete()
			}), (function(e) {
				var n;
				a = !1, null === (n = r.error) || void 0 === n || n.call(r, e), t.error(e)
			}), (function() {
				var e, t;
				a && (null === (e = r.unsubscribe) || void 0 === e || e.call(r)), null === (t = r.finalize) || void 0 === t || t.call(r)
			})))
		})) : Pd
	}
	class Kd {
		constructor(e, t = !0) {
			this.config = e, t ? (this.ssKeyConfig = e, this.reloadConfig()) : this.updateConfig(e, !1)
		}
		static init(e, t = !0) {
			return new Kd(e, t)
		}
		updateConfig(e, t = !0) {
			t ? window.sessionStorage.setItem(this.ssKeyConfig, JSON.stringify(this.config)) : Cl(e)
		}
		reloadConfig(e = !0) {
			if (e) {
				const e = window.sessionStorage.getItem(this.ssKeyConfig);
				this.config = e ? JSON.parse(e) : null
			} else this.config = $l()
		}
		async buildAuthorizeUrl(e) {
			e = e || window.btoa(location.origin);
			let {
				sessionIndex: t
			} = this.config;
			const {
				password: n
			} = this.config, r = this.config.clientId ? this.config.clientId : this.config.client_id, a = this.config.redirectUri ? this.config.redirectUri : this.config.redirect_uri, s = this.config.authorizeUri ? this.config.authorizeUri : this.config.endPoints.authorize, o = this.config.authService ? this.config.authService : this.config.authentication_service || "pega", i = this.config.appAlias ? this.config.appAlias : te.getApplicationAlias(), c = this.config.userIdentifier ? this.config.userIdentifier : this.config.user_identifier;
			t = t || this.config.tokenInfo.session_index;
			const d = t ? `&session_index=${t}` : `${c}` ? `&UserIdentifier=${c}` : `${n}` ? `&Password=${window.atob(n)}` : "",
				l = new Uint8Array(64);
			window.crypto?.getRandomValues(l), this.config.codeVerifier = this.base64UrlSafeEncode(l), this.updateConfig(this.config, !1);
			const u = i ? `+app.alias.${i.replace(/^app\//,"")}` : "";
			return this.getCodeChallenge(this.config.codeVerifier)?.then((t => `${s}?client_id=${r}&response_type=code&redirect_uri=${a}&scope=openid${u}&state=${e}&code_challenge=${t}&code_challenge_method=S256&authentication_service=${o}&enable_psyncId=true${d}`))?.catch((() => null))
		}
		getTokenAndFinish = e => {
			window.removeEventListener("message", this.authMessageHandler, !1), this.getToken(e, !1).then((() => {})).catch((e => {
				console.log(e)
			}))
		};
		authMessageHandler = e => {
			if (e.origin !== this.getRedirectUriOrigin()) return;
			if (!e.data || !e.data.type || "PegaAuth" !== e.data.type) return;
			const t = e.data.code.toString();
			this.getTokenAndFinish(t)
		};
		getRedirectUriOrigin = () => {
			let {
				redirectUri: e
			} = this.config;
			e = e || this.config.redirect_uri;
			const t = e.indexOf("//"),
				n = -1 !== t ? e.indexOf("/", t + 2) : -1;
			return -1 !== n ? e.substring(0, n) : e
		};
		getToken(e, t) {
			this.reloadConfig(t);
			const n = this.config.clientId ? this.config.clientId : this.config.client_id,
				r = this.config.clientSecret ? this.config.clientSecret : this.config.client_secret,
				a = this.config.redirectUri ? this.config.redirectUri : this.config.redirect_uri,
				s = this.config.tokenUri ? this.config.tokenUri : this.config.endPoints.token,
				{
					codeVerifier: o
				} = this.config,
				i = window.location.search,
				c = new URLSearchParams(i),
				d = e || c.get("code"),
				l = new URLSearchParams;
			return l.append("client_id", n), r && l.append("client_secret", r), l.append("grant_type", "authorization_code"), l.append("code", d), l.append("redirect_uri", a), l.append("code_verifier", o), yl(s, {
				method: "POST",
				headers: new Headers({
					"content-type": "application/x-www-form-urlencoded"
				}),
				body: l.toString()
			}).then((e => e.data)).then((e => {
				e.eA = Date.now() + 1e3 * e.expires_in;
				let n = !1;
				if (this.config.codeVerifier && (delete this.config.codeVerifier, n = !0), e.session_index && (this.config.session_index = e.session_index, n = !0), n) {
					this.updateConfig(this.config, t), Sl({
						tokenInfo: e
					}), _l({
						Authorization: `${e?.token_type} ${e?.access_token}`
					});
					const {
						onTokenRetrieval: n
					} = this.config;
					n && "function" == typeof n && n(e), window.postMessage("oAuthSuccess")
				}
				return e
			})).catch((() => null))
		}
		sha256Hash(e) {
			return window.crypto?.subtle?.digest("SHA-256", (new TextEncoder).encode(e))
		}
		encode64(e) {
			return window.btoa(new Uint8Array(e).reduce(((e, t) => e + String.fromCharCode(t)), ""))
		}
		base64UrlSafeEncode(e) {
			return this.encode64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
		}
		getCodeChallenge(e) {
			return this.sha256Hash(e)?.then((e => this.base64UrlSafeEncode(e))).catch((e => {
				console.log(e)
			})).finally((() => null))
		}
	}
	const Xd = Kd,
		Jd = async () => new Promise(((e, t) => {
			const n = bl();
			if (!n?.tokenInfo) return void t(new Error("Missing token information."));
			const {
				access_token: r,
				refresh_token: a = null
			} = n.tokenInfo, {
				revoke: s
			} = n.endPoints, {
				client_id: o,
				client_secret: i
			} = n, c = {
				"content-type": "application/x-www-form-urlencoded"
			};
			i && (c.authorization = `Basic ${window.btoa(`${o}:${i}`)}`);
			const d = ["access_token"];
			a && d.push("refresh_token"), d.forEach((async e => {
				const t = new URLSearchParams;
				i || t.append("client_id", o), t.append("token", "access_token" === e ? r : a), t.append("token_type_hint", e), await fetch(s, {
					method: "POST",
					headers: new Headers(c),
					body: t.toString()
				})
			})), _l({
				Authorization: null
			}), Sl({
				tokenInfo: null
			}), e()
		})), Qd = async e => {
			const t = {};
			if ("OAuth2.0" === e?.authType) {
				const n = new Xd(e, !1);
				t.reauthUrl = await n.buildAuthorizeUrl(), t.redirectOrigin = n.getRedirectUriOrigin(), window.addEventListener("message", n.authMessageHandler, !1)
			} else t.reauthUrl = A() + (E() ? `${E()}` : "/?reAuth=true");
			return t
		}, Zd = (e, t) => {
			Qd(t).then((t => {
				const n = {
					openReauthMessageModal: !0,
					reAutheticationURL: t.reauthUrl,
					url: e,
					redirectOrigin: t.redirectOrigin
				};
				Ta.publish(H.PUB_SUB_EVENTS.EVENT_REAUTH, n)
			}))
		}, el = e => {
			let t = "",
				n = {},
				r = {},
				a = !0;
			if ("OAuth2.0" === e?.authType) {
				t = e.endPoints.token;
				const s = new URLSearchParams;
				(!e.tokenInfo.refresh_token || e.tokenInfo.refresh_token && e.tokenInfo.refresh_token.length <= 0) && (a = !1), s.append("client_id", e.client_id), s.append("grant_type", "refresh_token"), s.append("refresh_token", e.tokenInfo.refresh_token), n = {
					method: "POST",
					body: s.toString(),
					headers: {
						"content-type": "application/x-www-form-urlencoded"
					}
				}, r = {
					success: (t, n) => {
						const {
							data: r
						} = t, a = {
							access_token: r?.access_token,
							refresh_token: r?.refresh_token
						};
						Sl({
							tokenInfo: {
								...e.tokenInfo,
								...a
							}
						}), _l({
							Authorization: `${r?.token_type} ${r?.access_token}`
						}), n.headers = {
							...n.headers,
							Authorization: `${r?.token_type} ${r?.access_token}`
						};
						const {
							onTokenRetrieval: s
						} = e;
						s && "function" == typeof s && s(r)
					},
					failure: t => {
						if (e.popupReauth) return Zd(t, e);
						Ta.publish(H.PUB_SUB_EVENTS.EVENT_FULL_REAUTH, e)
					}
				}
			} else t = `${A()}/updateSession`, n = {
				method: "GET",
				headers: {}
			}, r = {
				failure: Zd
			};
			return {
				url: t,
				config: n,
				callback: r,
				isRefreshTokenPresent: a
			}
		}, tl = (e, t) => "OAuth2.0" === t?.authType ? e?.includes(t.endPoints.token) : e?.includes("updateSession"), nl = e => {
			const {
				config: t
			} = e, n = t.headers && t.headers.context;
			return t.data && (t.body = t.data), {
				url: t.url,
				config: t,
				context: n
			}
		}, rl = (e, t, n) => {
			const {
				config: r
			} = e, {
				url: a,
				config: s,
				callback: o,
				isRefreshTokenPresent: i
			} = el(n), c = r.headers && r.headers.context;
			r.data && (r.body = r.data);
			const d = ml(r.url, r, c, t);
			return i ? yl(a, s).then((e => (t.setUpdateSessionStatus(!1), o?.success?.(e, r), Ta.publish("updateSession", {
				updateStatus: "success"
			}), d.then((e => Promise.resolve(e))).catch((e => Promise.reject(e)))))).catch((e => e && e.config && tl(e.config.url, n) ? (o?.failure?.(r.url, n), d) : Promise.reject(e))) : (o?.failure?.(r.url, n), d)
		}, al = (e, t, n, r) => {
			if (e.config && tl(e.config.url, n)) return Promise.reject(e);
			if (e.response && e.response.status && 401 === e.response.status && !t.getUpdateSessionStatus()) {
				if (Ta.unsubscribeAllWithEventType(cl), t.setUpdateSessionStatus(!0), "custom" === n?.authType) {
					Ta.publish(H.PUB_SUB_EVENTS.EVENT_CUSTOM_REAUTH);
					const {
						url: n,
						config: r,
						context: a
					} = nl(e);
					return ml(n, r, a, t)
				}
				return rl(e, t, n)
			}
			if (e.response && e.response.status && 401 === e.response.status && t.getUpdateSessionStatus()) {
				const {
					url: t,
					config: n,
					context: r
				} = nl(e);
				return yl(t, n, r)
			}
			if (e.response && e.response.status && 422 !== e.response.status && e.config.headers.context && e.response.data && !r) {
				const t = e.response.data.errorDetails && e.response.data.errorDetails.map((t => ((e, t) => t[H.TRACE_ID] ? {
					type: "error",
					message: e.localizedValue || e.message,
					correlationID: t[H.TRACE_ID]
				} : {
					type: "error",
					message: e.localizedValue || e.message
				})(t, e.response.headers)));
				let n = e.config.headers.context;
				return n && n.includes("/workarea") && !n.includes("/modal") && (n = n.substring(0, n.lastIndexOf("/workarea"))), Zn({
					messages: t,
					category: "HTTP",
					context: n
				}), Promise.reject(e)
			}
			return Promise.reject(e)
		};
	const sl = class {
		constructor() {
			this.updateSessionInProgress = !1
		}
		getUpdateSessionStatus = () => this.updateSessionInProgress;
		setUpdateSessionStatus = e => {
			this.updateSessionInProgress = e
		}
	};
	const ol = new class {
			constructor() {
				this.externalHeaders = {}, this.defaultHeaders = {}, this.SPECIAL_CHARS = {
					SLASH: "/"
				}
			}
			registerHeader(e, t) {
				return !this.defaultHeaders[e] && (this.externalHeaders[e] = t, !0)
			}
			unRegisterHeader(e) {
				this.externalHeaders[e] && delete this.externalHeaders[e]
			}
			getRegisteredHeaders() {
				return this.externalHeaders
			}
			setDefaultHeaders(e) {
				this.defaultHeaders = {
					...this.defaultHeaders,
					...e
				}
			}
			getDefaultHeaders() {
				return this.defaultHeaders
			}
			addDebugHeaders(e = {}) {
				return {
					[W.COREHEADER_APP_DEBUG_ID]: e.debugId,
					[W.COREHEADER_APP_DEBUG_LEVELS]: re.getDebugLevels()
				}
			}
			getCoreHeadersFromContext(e) {
				if (["root", "app"].includes(e) || !e) return;
				const t = $p.getProperty(W.COREHEADERS, "", e);
				return t ? {
					...t,
					debugInfo: re.getPreviewMode() && {
						...t.debugInfo,
						[W.COREHEADER_APP_DEBUG_LEVELS]: re.getDebugLevels()
					}
				} : (e = e.substr(0, e.lastIndexOf(this.SPECIAL_CHARS.SLASH)), this.getCoreHeadersFromContext(e))
			}
			processCoreHeaders(e, t, n) {
				const r = this.getCoreHeadersFromContext(n);
				if (r) {
					const t = Object.keys(e);
					if (t.includes(W.SKIPCOREHEADERS)) return void delete e[W.SKIPCOREHEADERS];
					const n = Object.assign({}, ...Object.values(r));
					Object.keys({
						...n
					}).forEach((r => {
						t.includes(r) || (e[r] = n[r])
					}))
				}
			}
			injectCoreAdditionalHeaders(e, t, n, r) {
				r?.includeRemoteSystemIdIfPresent && q.injectRemoteCaseHeader(e, t, n), this.processCoreHeaders(e, t, n)
			}
		},
		il = ol,
		cl = "updateSession",
		dl = {},
		ll = new sl;
	let ul = {},
		pl = {},
		hl = {},
		gl = "";
	const fl = e => {
			ul = e
		},
		yl = (e, t, n = "root", r = {}) => {
			const {
				doNotMergeHttpMessagesForStatusCode: a = null,
				cancelContext: s = n,
				includeRemoteSystemIdIfPresent: o = !0
			} = r;
			gl = a, null === e && window.console.error("Error: url passed to Service Broker fetch is null (or) undefined");
			const {
				body: i,
				signal: c,
				withoutDefaultHeaders: d = !1,
				...l
			} = t, {
				Authorization: u,
				...p
			} = t.headers || {};
			d || il.injectCoreAdditionalHeaders(p, t.body, n, {
				includeRemoteSystemIdIfPresent: o
			}), s && dl[s] >= 0 ? dl[s] += dl[s] : s && void 0 === dl[s] && (dl[s] = 1);
			let h = d ? {
				...p
			} : {
				...il.getDefaultHeaders(),
				...il.getRegisteredHeaders(),
				...p,
				context: n
			};
			return e && tl(e, pl) && ll.getUpdateSessionStatus() || !ll.getUpdateSessionStatus() ? (tl(e, pl) && "OAuth2.0" === pl?.authType && (h = {
				...p
			}), zd(Gc({
				context: n,
				...l,
				url: e,
				data: i,
				...c && void 0 === c.aborted && {
					cancelToken: c
				},
				...c && void 0 !== c.aborted && {
					signal: c
				},
				headers: h
			})).pipe(Yd((() => {
				const e = il.getCoreHeadersFromContext(h.context);
				e && (e => {
					Ta.publish(W.PUB_SUB_EVENTS.FETCH_SUCCESS, e)
				})({
					...e
				})
			}))).toPromise()) : ml(e, t, n, ll)
		},
		ml = (e, t, n, r) => new Promise(((a, s) => {
			Ta.subscribe(cl, (o => {
				r.setUpdateSessionStatus(!o.updateStatus), "success" === o.updateStatus ? yl(e, t, n).then((e => a(e))).catch((e => s(e))) : s(o.updateStatus.error)
			}), cl)
		})),
		Il = e => {
			dl[e] > 0 && (dl[e] -= dl[e], 0 === dl[e] && delete dl[e])
		};
	Gc.interceptors.request.use((e => (ul.request && (e = ul.request(e)), e)), (e => Promise.reject(e))), Gc.interceptors.response.use((e => {
		if (202 === e.status && e.config.headers.context && e.data?.caseInfo?.errorMessage) {
			const t = [{
				type: "error",
				message: e.data.caseInfo.errorMessage
			}];
			let n = e.config.headers.context;
			return n && n.includes("/workarea") && (n = n.substring(0, n.lastIndexOf("/workarea"))), Zn({
				messages: t,
				category: "HTTP",
				context: n
			}), Promise.reject(e)
		}
		return e.config.headers && e.config.headers.context && (e.config.skipClearErrorMessages || (Jn({
			type: "error",
			category: "HTTP",
			context: e.config.headers.context
		}).length > 0 && Qn({
			type: "error",
			category: "HTTP",
			context: e.config.headers.context
		}), Jn({
			type: "error",
			category: e.config.headers.context === W.APP.APP ? "PAGE" : "",
			context: e.config.headers.context
		}).length > 0 && Qn({
			type: "error",
			category: "PAGE",
			context: e.config.headers.context
		})), Il(e.config.headers.context)), ul.response && (e = ul.response(e)), e
	}), (e => (e.config && e.config.headers && e.config.headers.context && Il(e.config.headers.context), !e.response || !e.response.status || 401 !== e.response.status || e.config && tl(e.config.url, pl) || Ta.subscribe(cl, (e => {
		ll.setUpdateSessionStatus(!e.updateStatus)
	}), cl), al(e, ll, pl, e.response && e.response.status && e.response.status === Number(gl) ? gl : null))));
	const El = () => Gc.CancelToken.source(),
		Al = e => Gc.isCancel(e),
		_l = e => {
			il.setDefaultHeaders(e)
		},
		Sl = e => {
			pl = {
				...pl,
				...e
			}
		},
		Cl = e => {
			hl = {
				...hl,
				...e
			}
		},
		$l = () => ({
			...hl
		}),
		bl = () => ({
			...pl
		}),
		Pl = "OPEN_PROCESS_ACTION",
		Ol = "OPEN_ASSIGNMENT",
		Tl = "DELETE_CASE_IN_CREATE_STAGE",
		vl = "SAVE_AND_CLOSE",
		Nl = e => ({
			type: vl,
			payload: e
		});
	const Rl = class {
		static getSavableDataPage(e) {
			return zu(e)
		}
		static getLookUpDataPage(e) {
			return Ku(e)
		}
		static getLookUpDataPageInfo(e) {
			return Xu(e)
		}
		static getDataPageKeys(e) {
			return Yu(e)
		}
	};
	const Dl = class {
		constructor(e) {
			this.c11nEnv = e
		}
		containerManagerPromise = e => {
			const t = vn.getNextActionMgrId();
			let n, r;
			const a = new Promise(((e, t) => {
				n = e, r = t
			}));
			return vn.register(t, a, n, r, e), {
				actionMgrID: t,
				promise: a
			}
		};
		initializeContainers(e) {
			const t = Ye,
				n = this.c11nEnv,
				r = {
					context: n.getContextName(),
					name: n.getContainerName(),
					type: W.CONTAINER_TYPE.SINGLE
				},
				{
					actionMgrID: a,
					promise: s
				} = this.containerManagerPromise(t),
				o = {
					...r,
					...e,
					actionMgrID: a
				};
			return op(Lp(o)), s
		}
		addContainerItem(e) {
			const t = Xe,
				n = this.c11nEnv,
				r = n.getMetadata(),
				{
					children: a
				} = r;
			let s;
			a && ([s] = a);
			const o = n.getContextName(),
				i = n.getContainerName(),
				c = Ee(i, o, e?.containerType === W.CONTAINER_TYPE.SINGLE),
				d = Ft(i, o),
				l = {
					root: {
						...s,
						config: {
							...s?.config,
							context: s?.config?.context || n.getPageReference?.()
						}
					},
					containerItemID: c,
					context: c,
					target: d,
					containerName: i
				};
			e = JSON.parse(JSON.stringify(e)), [W.WORKAREA].includes(i) && delete e.data.coreHeaders;
			const {
				actionMgrID: u,
				promise: p
			} = this.containerManagerPromise(t), h = {
				...l,
				...e,
				actionMgrID: u
			};
			return op(Up(h)), p
		}
		updateContainerItem(e) {
			if (!e?.containerItemID) return Promise.reject(new Error("updateContainerItem : containerItemID is required in containerInfo object"));
			const t = st,
				n = {
					context: Us(e.containerItemID),
					target: Zs(e.containerItemID)
				},
				{
					actionMgrID: r,
					promise: a
				} = this.containerManagerPromise(t),
				s = {
					...n,
					...e,
					actionMgrID: r
				};
			return op(Bp(s)), a
		}
		activateContainerItem(e) {
			if (!e?.containerItemID) return Promise.reject(new Error("activateContainerItem : containerItemID is required in containerInfo object"));
			const t = at,
				n = {
					target: Zs(e.containerItemID)
				},
				{
					actionMgrID: r,
					promise: a
				} = this.containerManagerPromise(t),
				s = {
					...n,
					...e,
					actionMgrID: r
				};
			return op(Wp(s)), a
		}
		removeContainerItem(e) {
			if (!e?.containerItemID) return Promise.reject(new Error("removeContainerItem : containerItemID is required in containerInfo object"));
			const t = Je,
				n = {
					context: Us(e.containerItemID),
					target: Zs(e.containerItemID)
				},
				{
					actionMgrID: r,
					promise: a
				} = this.containerManagerPromise(t),
				s = {
					...n,
					...e,
					actionMgrID: r
				};
			return op(zp(s)), a
		}
		resetContainers(e) {
			if (!e?.context || !e?.name) return Promise.reject(new Error("resetContainers : context and name are required in containerInfo object"));
			const t = Ke,
				n = Xs(e),
				{
					actionMgrID: r,
					promise: a
				} = this.containerManagerPromise(t),
				s = {
					...n,
					...e,
					actionMgrID: r
				};
			return op(jp(s)), a
		}
		addTransientItem(e) {
			const {
				id: t,
				data: n
			} = e, r = this.c11nEnv.getContextName(), a = _e(t, r), s = ao(r);
			return a && s.includes(a) || op(Fp({
				transientItemID: a,
				contextName: r,
				target: Zs(r),
				data: n
			})), a
		}
		updateTransientData(e) {
			const {
				transientItemID: t,
				data: n
			} = e, r = this.c11nEnv.getContextName();
			if (t) {
				if (!ao(r).includes(t)) return;
				op(kp({
					transientItemID: t,
					data: n
				}))
			}
		}
		removeTransientItem(e) {
			const t = this.c11nEnv.getContextName(),
				{
					target: n = this.c11nEnv.getTarget(),
					containerItemID: r,
					transientItemID: a
				} = e;
			if (a && r) {
				if (!ao(t).includes(a)) return;
				op(Kp({
					target: n,
					containerItemID: r,
					transientItemID: a
				}))
			}
		}
		createContainerPConnect(e, t, n, r = !1) {
			_s.createContainerPConnect(e, t, n, r)
		}
		hasContainerItems() {
			const e = this.c11nEnv.getContextName(),
				t = this.c11nEnv.getContainerName();
			return qs(`${e}/${t}`)
		}
		isContainerInitialized() {
			const e = this.c11nEnv.getContextName(),
				t = this.c11nEnv.getContainerName();
			return xs(e, t)
		}
	};
	var xl = function(e, t) {
		return e === t || "function" == typeof t && e === t.toString()
	};

	function wl() {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		var n, r, a = e.length;
		return n = 1 === a ? function(t) {
			return xl(t.type, e[0])
		} : function(t) {
			for (var n = 0; n < a; n++)
				if (xl(t.type, e[n])) return !0;
			return !1
		}, kd((function(e, t) {
			var a = 0;
			e.subscribe(Vd(t, (function(e) {
				return n.call(r, e, a++) && t.next(e)
			})))
		}))
	}

	function Ml(e, t) {
		return kd((function(n, r) {
			var a = null,
				s = 0,
				o = !1,
				i = function() {
					return o && !a && r.complete()
				};
			n.subscribe(Vd(r, (function(n) {
				null == a || a.unsubscribe();
				var o = 0,
					c = s++;
				jd(e(n, c)).subscribe(a = Vd(r, (function(e) {
					return r.next(t ? t(n, e, c, o++) : e)
				}), (function() {
					a = null, i()
				})))
			}), (function() {
				o = !0, i()
			})))
		}))
	}

	function Ll(e, t) {
		return kd((function(n, r) {
			var a = 0;
			n.subscribe(Vd(r, (function(n) {
				r.next(e.call(t, n, a++))
			})))
		}))
	}

	function jl(e, t, n) {
		return void 0 === n && (n = 1 / 0), ed(t) ? jl((function(n, r) {
			return Ll((function(e, a) {
				return t(n, e, r, a)
			}))(jd(e(n, r)))
		}), n) : ("number" == typeof t && (n = t), kd((function(t, r) {
			return function(e, t, n, r, a, s, o, i) {
				var c = [],
					d = 0,
					l = 0,
					u = !1,
					p = function() {
						!u || c.length || d || t.complete()
					},
					h = function(e) {
						return d < r ? g(e) : c.push(e)
					},
					g = function(e) {
						s && t.next(e), d++;
						var i = !1;
						jd(n(e, l++)).subscribe(Vd(t, (function(e) {
							null == a || a(e), s ? h(e) : t.next(e)
						}), (function() {
							i = !0
						}), void 0, (function() {
							if (i) try {
								d--;
								for (var e = function() {
										var e = c.shift();
										o ? Fd(t, o, (function() {
											return g(e)
										})) : g(e)
									}; c.length && d < r;) e();
								p()
							} catch (e) {
								t.error(e)
							}
						})))
					};
				return e.subscribe(Vd(t, h, (function() {
						u = !0, p()
					}))),
					function() {
						null == i || i()
					}
			}(t, r, e, n)
		})))
	}

	function Ul(e) {
		return e && ed(e.schedule)
	}

	function Fl(e) {
		return e[e.length - 1]
	}

	function kl(e) {
		return Ul(Fl(e)) ? e.pop() : void 0
	}

	function Vl() {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		return zd(e, kl(e))
	}

	function Gl(e) {
		return kd((function(t, n) {
			var r, a = null,
				s = !1;
			a = t.subscribe(Vd(n, void 0, void 0, (function(o) {
				r = jd(e(o, Gl(e)(t))), a ? (a.unsubscribe(), a = null, r.subscribe(n)) : s = !0
			}))), s && (a.unsubscribe(), a = null, r.subscribe(n))
		}))
	}
	var Bl = new Td((function(e) {
		return e.complete()
	}));

	function Hl(e) {
		return e ? function(e) {
			return new Td((function(t) {
				return e.schedule((function() {
					return t.complete()
				}))
			}))
		}(e) : Bl
	}
	var Wl = n(766),
		ql = n.n(Wl);
	const zl = (e, t, n) => Gl((r => ("ERR_CANCELED" !== r?.code && console.error(e, r), Vl(th(e, r, t, null, n))))),
		Yl = (e, t) => n => new Td((r => {
			let a = {},
				s = 0;
			return n.pipe(jl((n => {
				const r = Date.now();
				let o;
				return o = t || ql(), o && o(n, a) && r - s < e ? Hl() : (a = n, s = r, Vl(n))
			}))).subscribe(r)
		})),
		Kl = e => {
			const {
				dataPageID: t,
				context: n,
				headers: r,
				containerItemID: a
			} = e, s = {
				data_view_ID: t
			}, {
				restApi: o,
				reqType: i
			} = Eh("createDataObject", s), c = es(a);
			return zd(yl(o, {
				method: i,
				headers: r,
				body: {
					data: c.content
				}
			}, a)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e
			}))), zl("Error ocurred during ajax call at createDataObject Epic", n))
		},
		Xl = e => {
			const {
				dataLookUp: t,
				context: n,
				headers: r,
				viewName: a,
				requestPayload: s
			} = e, o = {
				data_view_ID: t,
				view_ID: a
			}, {
				restApi: i,
				reqType: c
			} = Eh("readDataObject", o);
			return zd(yl(i, {
				method: c,
				headers: r,
				body: {
					dataViewParameters: s
				}
			}, n)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e
			}))), zl("Error ocurred during ajax call at getDataObjectView Epic", n))
		},
		Jl = e => {
			const {
				dataPageID: t,
				context: n,
				headers: r,
				containerItemID: a,
				key: s
			} = e, o = {
				data_view_ID: t
			}, {
				restApi: i,
				reqType: c
			} = Eh("updateDataObject", o), d = es(a);
			return zd(yl(i, {
				method: c,
				headers: r,
				body: {
					data: {
						...d.content,
						...s
					},
					pageInstructions: d.pageInstructions || []
				}
			}, a)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e
			}))), zl("Error ocurred during ajax call at updateDataObject Epic", n))
		};
	const Ql = class {
		static isCaseActive(e, t) {
			if (!e || !t) return !1;
			const n = Ps(t);
			if (n) {
				const r = Ms(t),
					{
						items: a = {}
					} = n;
				return a[r] && a[r].key === e
			}
			return !1
		}
		static getCaseEditMetadata = (e, t) => {
			const n = {
					caseID: e,
					viewID: "pyEdit"
				},
				{
					restApi: r,
					reqType: a
				} = Eh("loadView", n);
			return yl(r, {
				method: a
			}, t)
		};
		static getCaseEditLock = (e, t) => {
			const n = {
					caseID: e,
					actionID: "pyUpdateCaseDetails"
				},
				{
					restApi: r,
					reqType: a
				} = Eh(_t, n);
			return yl(`${r}?viewType=page`, {
				method: a
			}, t)
		};
		static updateCaseEditFieldsData = (e, t, n, r) => {
			const a = {
					caseID: e,
					actionID: "pyUpdateCaseDetails"
				},
				{
					restApi: s
				} = Eh(_t, a),
				o = t[e];
			return yl(`${s}?viewType=form`, {
				method: "PATCH",
				body: {
					content: {
						...o
					}
				},
				headers: {
					"if-match": n
				}
			}, r)
		};
		static getCaseMessages = e => ip(e)?.caseMessages;
		static getCaseViewMode = e => sp().getState()?.data[e]?.context_data?.caseViewMode
	};
	const Zl = new class {
		MISSING_CONTEXT_PARAM = "context is required parameter";
		INVALID_CONTEXT_DETAILS = "Invalid Context";
		INVALID_CONTEXT_OPERATION = "Invalid Operation on Given Context";
		schedulePendingActionOnCompletion(e, t) {
			const n = [],
				r = t.context_data?.blocking_action_counter ?? 0,
				a = t.context_data?.deferred_action_queue ? [...t.context_data.deferred_action_queue] : [];
			let s = t.context_data?.is_deferred_action_in_progress ?? !1;
			if (r <= 0) {
				if (s) n.push({
					type: Be,
					payload: {
						context: e,
						data: {
							context_data: {
								is_deferred_action_in_progress: !1
							}
						}
					}
				});
				else {
					if (!(a.length > 0)) return;
					{
						const t = a.shift();
						s = !s, n.push({
							type: Be,
							payload: {
								context: e,
								data: {
									context_data: {
										deferred_action_queue: a,
										blocking_action_counter: r,
										is_deferred_action_in_progress: s
									}
								}
							}
						}), n.push(t)
					}
				}
				op(n)
			}
		}
		executeOrQueueDeferredAction(e) {
			if (!e?.payload?.context) return Promise.reject(new Error("Action Context is Mandatory Field."));
			const t = ip(e?.payload?.context);
			if (t) {
				const n = [],
					r = t.context_data?.blocking_action_counter ?? 0,
					a = t.context_data?.deferred_action_queue ? [...t.context_data.deferred_action_queue] : [];
				let s = t.context_data?.is_deferred_action_in_progress ?? !1;
				return a.length <= 0 && !s && (r <= 0 ? (n.push(e), s = !s) : a.push(e), n.unshift({
					type: Be,
					payload: {
						context: e.payload.context,
						data: {
							context_data: {
								deferred_action_queue: a,
								blocking_action_counter: r,
								is_deferred_action_in_progress: s
							}
						}
					}
				}), op(n)), Promise.resolve()
			}
			return Promise.reject(new Error(this.INVALID_CONTEXT_DETAILS))
		}
		handleDeferredActionCompletion(e) {
			if (!e) return Promise.reject(new Error(this.MISSING_CONTEXT_PARAM));
			const t = ip(e);
			return t && !0 === t.context_data?.is_deferred_action_in_progress ? (op({
				type: Be,
				payload: {
					context: e,
					data: {
						context_data: {
							is_deferred_action_in_progress: !1
						}
					}
				}
			}), this.schedulePendingActionOnCompletion(e, t), Promise.resolve()) : Promise.reject(new Error(this.INVALID_CONTEXT_DETAILS))
		}
		registerBlockingAction(e) {
			if (!e) return Promise.reject(new Error(this.MISSING_CONTEXT_PARAM));
			return ip(e) ? (op({
				type: Rt,
				payload: {
					context: e,
					isInitiateBlockingAction: !0
				}
			}), Promise.resolve()) : Promise.reject(new Error(this.INVALID_CONTEXT_DETAILS))
		}
		deRegisterBlockingAction(e) {
			if (!e) return Promise.reject(new Error(this.MISSING_CONTEXT_PARAM));
			const t = {
				...ip(e)
			};
			return t.context_data = {
				...t.context_data
			}, t && t.context_data?.blocking_action_counter > 0 ? (op({
				type: Rt,
				payload: {
					context: e,
					isInitiateBlockingAction: !1
				}
			}), t.context_data.blocking_action_counter -= 1, this.schedulePendingActionOnCompletion(e, t), Promise.resolve()) : Promise.reject(new Error(this.INVALID_CONTEXT_OPERATION))
		}
		cancelDeferredActionsOnError(e) {
			if (!e) return;
			const t = ip(e);
			if (t) {
				const n = {
					...t
				};
				n.context_data = {
					...n.context_data
				}, n.context_data?.deferred_action_queue && _p.rejectPendingActions(n.context_data.deferred_action_queue) && (n.context_data.deferred_action_queue = []), n.context_data?.blocking_action_counter && (n.context_data.blocking_action_counter = 0), n.context_data?.is_deferred_action_in_progress && (n.context_data.is_deferred_action_in_progress = !1), op({
					type: Be,
					payload: {
						context: e,
						data: {
							...n
						}
					}
				}), Tn.disableLoadingIndicator({
					context: e
				})
			}
		}
		isDeferredActionInProgress(e) {
			if (!e) return Promise.reject(new Error(this.MISSING_CONTEXT_PARAM));
			const t = ip(e);
			return !(!t || !0 !== t.context_data?.is_deferred_action_in_progress)
		}
	};
	const eu = class {
		constructor(e) {
			this.c11nEnv = e
		}
		MSG_CLASSNAME_REQUIRED = "className is required parameter";
		MSG_CLASSNAME_STRING = "className must be a string";
		MSG_DATAVIEWID_REQUIRED = "dataViewID is required parameter";
		MSG_DATAVIEWID_STRING = "dataViewID must be a string";
		MSG_CONTAINERITEMID_REQUIRED = "containerItemID is required parameter";
		MSG_CONTAINERITEMID_STRING = "containerItemID must be a string";
		MSG_PAGENAME_REQUIRED = "pageName is required parameter";
		MSG_PAGENAME_STRING = "pageName must be string";
		MSG_INSIGHTID_REQUIRED = "insightID is required parameter";
		MSG_DASHBOARDID_REQUIRED = "DashboardID is required parameter";
		MSG_ACTIVE_SUGGESTION_UNATTENDED = "You must accept or decline autofilled fields.";
		shouldDeleteCaseInCreateStage = (e, t, n) => !e && t || n;
		getSaveActionPayload = (e, t = !1) => {
			const n = e,
				r = n && n.includes(W.MODAL),
				a = this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID),
				s = this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENT_ID),
				o = this.c11nEnv.getValue(H.CASE_INFO.ACTIVE_ACTION_ID) ? this.c11nEnv.getValue(H.CASE_INFO.ACTIVE_ACTION_ID) : this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENTACTION_ID),
				i = this.c11nEnv.getContainerName(),
				c = this.c11nEnv.getValue(H.CASE_INFO.CASE_TYPE_ID),
				d = t ? void 0 : ta(this.c11nEnv.getContextName()),
				l = this.c11nEnv.getValue("isProcessAction", "isProcessAction");
			return Pp.buildActionObject({
				context: n,
				containerItemID: e,
				assignmentID: s,
				actionID: o,
				caseID: a,
				containerName: i,
				caseType: c,
				isModalAction: r,
				isFormValid: d,
				isProcessAction: l,
				saveOnly: t
			}, this.c11nEnv)
		};
		actionsApiPromise = (e, t, n = !0) => {
			let r, a, s = null;
			s = t && null !== t.actionMgrID ? t.actionMgrID : vn.getNextActionMgrId();
			const o = new Promise(((e, t) => {
				r = e, a = t
			}));
			return vn.register(s, o, r, a, e, t, n), {
				actionMgrID: s,
				promise: o
			}
		};
		showDataObjectCreateView(e, t = H.VIEW_NAMES.DATA_OBJECT_CREATE_VIEW) {
			const n = Pp.buildActionObject({
					viewName: t,
					className: e
				}, this.c11nEnv),
				r = Ne,
				{
					promise: a
				} = this.actionsApiPromise(r, n);
			return op({
				type: r,
				payload: {
					...n,
					containerName: H.MODAL,
					skipSemanticUrl: !0,
					isCreateDataObject: !0
				}
			}), a
		}
		cancelDataObject(e) {
			if (!e) return Promise.reject(new Error("containerItemId is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = e;
			if (!fa(t)) {
				return new Dl(this.c11nEnv).removeContainerItem({
					containerItemID: e,
					skipReleaseLockRequest: !0
				})
			}
			const n = It,
				r = Pp.buildActionObject({
					containerItemID: e,
					context: t
				}, this.c11nEnv),
				a = t && t.includes(W.MODAL);
			op({
				type: n,
				payload: {
					...r,
					isModalAction: a,
					isDataObject: !0,
					skipReleaseLockRequest: !0
				}
			});
			const {
				promise: s
			} = this.actionsApiPromise(n, r);
			return s
		}
		createDataObject(e) {
			if (!e) return Promise.reject(new Error("containerItemID is required parameter"));
			const {
				data: t
			} = sp().getState(), n = t[e]?.dataInfo?.content?.classID;
			if (!n) return Promise.reject(new Error("Data object class not found"));
			const r = Rl.getSavableDataPage(n),
				a = Dt,
				s = e && e.includes(W.MODAL),
				o = Pp.buildActionObject({
					containerItemID: e,
					dataPageID: r
				}, this.c11nEnv),
				{
					promise: i
				} = this.actionsApiPromise(a, o);
			return op({
				type: "CREATE_DATA_OBJECT",
				payload: {
					...o,
					isModalAction: s,
					isFormValid: ta(e)
				}
			}), i
		}
		deleteDataObject(e, t) {
			if (!e) return Promise.reject(new Error("className is required parameter"));
			if (!t) return Promise.reject(new Error("keys is required parameter"));
			const n = xt,
				r = Rl.getSavableDataPage(e),
				a = Rl.getDataPageKeys(r),
				s = {};
			for (const e of a) s[e.keyName] = e.isAlternateKeyStorage ? t[e.linkedField] : t[e.keyName];
			const o = Pp.buildActionObject({
					dataViewName: r,
					dataViewParameters: s
				}, this.c11nEnv),
				{
					promise: i
				} = this.actionsApiPromise(n, o);
			return op({
				type: "DELETE_DATA_OBJECT",
				payload: {
					...o
				}
			}), i
		}
		getDataObjectView(e, t, n = {
			viewName: ""
		}) {
			const r = {};
			if (!e) return Promise.reject(new Error(this.MSG_CLASSNAME_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CLASSNAME_STRING));
			if (!t) return Promise.reject(new TypeError("keyProperties is required parameter"));
			if ("object" != typeof t) return Promise.reject(new TypeError("keyProperties must be a object"));
			const a = wt,
				s = Rl.getLookUpDataPage(e),
				o = Rl.getDataPageKeys(s);
			for (const e of o) r[e.keyName] = e.isAlternateKeyStorage ? t[e.linkedField] : t[e.keyName];
			const i = Pp.buildActionObject({
					dataLookUp: s,
					requestPayload: r,
					viewName: n.viewName || H.VIEW_NAMES.DATA_OBJECT_EDIT_VIEW,
					containerName: W.MODAL,
					keyProperties: t
				}, this.c11nEnv),
				{
					promise: c
				} = this.actionsApiPromise(a, i);
			return op({
				type: "VIEW_DATA_OBJECT",
				payload: {
					...i
				}
			}), c
		}
		updateDataObject(e, t) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if (!t) return Promise.reject(new Error("keys is required parameter"));
			const {
				data: n
			} = sp().getState(), r = n[e]?.dataInfo?.content?.classID;
			if (!r) return Promise.reject(new Error("Data object class not found"));
			const a = Rl.getSavableDataPage(r);
			Rl.getDataPageKeys(a).forEach((e => {
				e.isAlternateKeyStorage && (e.keyName === e.linkedField || Object.keys(t).includes(e.linkedField)) ? e.keyName = t[e.linkedField] : e.isAlternateKeyStorage && Object.keys(t).includes(e.keyName) && e.keyName !== e.linkedField ? (t[e.linkedField] = t[e.keyName], delete t[e.keyName]) : e.keyName = t[e.keyName]
			}));
			const s = Mt,
				o = e && e.includes(W.MODAL),
				i = Pp.buildActionObject({
					containerItemID: e,
					dataPageID: a,
					key: t
				}, this.c11nEnv),
				{
					promise: c
				} = this.actionsApiPromise(s, i);
			return op({
				type: "UPDATE_DATA_OBJECT",
				payload: {
					...i,
					isModalAction: o,
					isFormValid: ta(e)
				}
			}), c
		}
		createWork(e, t = {
			flowType: "",
			containerName: "",
			openCaseViewAfterCreate: !1,
			modalOptions: {
				dockable: !1
			},
			startingFields: Object,
			channelName: ""
		}) {
			if (!e) return Promise.reject(new Error(this.MSG_CLASSNAME_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CLASSNAME_STRING));
			if (window.pms && window.pms.plugins && window.pms.plugins.c11n && window.pms.plugins.c11n.createWork) return window.pms.plugins.c11n.createWork(e, "pyStartCase");
			const {
				dockable: n = !1
			} = t?.modalOptions || {}, r = je, a = Pp.buildActionObject({
				class: e,
				flowType: "pyStartCase",
				containerName: W.PRIMARY,
				openCaseViewAfterCreate: !0,
				...t,
				modalOptions: {
					isDockable: n
				}
			}, this.c11nEnv), {
				promise: s
			} = this.actionsApiPromise(r, a);
			if (t.channelName && (a.headers = a.headers || {}, a.headers[W.X_ORIGIN_CHANNEL] = t.channelName), q.isRemoteCase(e)) {
				const {
					RemoteClassName: t,
					RemoteSystemID: n
				} = q.getRemoteCase(e);
				a.class = t, a.headers = a.headers || {}, a.headers.RemoteSystemID = n
			}
			return re.getPreviewMode() && (a.debugInfo = {
				debugId: _p.generateUniqueID()
			}), op({
				type: r,
				payload: {
					...a
				}
			}), s
		}
		getDataObjectActions(e, t) {
			if (!e) return Promise.reject(new Error(this.MSG_DATAVIEWID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_DATAVIEWID_STRING));
			const n = We,
				r = Pp.buildActionObject({
					dataViewID: e,
					dataViewParameters: t
				}, this.c11nEnv),
				{
					promise: a
				} = this.actionsApiPromise(n, r);
			return op({
				type: n,
				payload: {
					...r
				}
			}), a
		}
		openWorkByHandle(e, t, n = {}) {
			if (!e) return Promise.reject(new Error("workID is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError("workID must be a string"));
			if (!t) return Promise.reject(new Error(this.MSG_CLASSNAME_REQUIRED));
			if ("string" != typeof t) return Promise.reject(new TypeError(this.MSG_CLASSNAME_STRING));
			if (window.pms && window.pms.plugins && window.pms.plugins.c11n && window.pms.plugins.c11n.openWorkByHandle) return window.pms.plugins.c11n.openWorkByHandle(e, t);
			const r = {
					insKey: e,
					acTargetName: n.targetContainer || W.PRIMARY,
					containerName: n.targetContainer || W.PRIMARY
				},
				a = Ue,
				s = Pp.buildActionObject(r, this.c11nEnv),
				{
					promise: o
				} = this.actionsApiPromise(a, s);
			if (n.channelName && (s.headers = s.headers || {}, s.headers[W.X_ORIGIN_CHANNEL] = n.channelName), s.className = t, q.isRemoteCase(t)) {
				const {
					RemoteSystemID: e
				} = q.getRemoteCase(t);
				s.headers = s.headers || {}, s.headers.RemoteSystemID = e, s.isRemoteCase = !0, s.remoteCaseClass = t
			}
			return re.getPreviewMode() && ![W.WORKAREA].includes(n.targetContainer) && (s.debugInfo = {
				debugId: _p.generateUniqueID()
			}), op({
				type: a,
				payload: {
					...n,
					...s
				}
			}), o
		}
		openAssignment(e, t, n = {
			containerName: "",
			channelName: "",
			isActionFromToDoList: void 0,
			isChild: void 0,
			context: void 0,
			viewType: void 0,
			skipBrowserSemanticUrlUpdate: void 0
		}) {
			if (!e) return Promise.reject(new Error("assignmentID is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError("assignmentID must be a string"));
			if (!t) return Promise.reject(new Error(this.MSG_CLASSNAME_REQUIRED));
			if ("string" != typeof t) return Promise.reject(new TypeError(this.MSG_CLASSNAME_STRING));
			if (window.pms && window.pms.plugins && window.pms.plugins.c11n && window.pms.plugins.c11n.openAssignment) return window.pms.plugins.c11n.openAssignment(e, t);
			const r = {
				assignmentID: e,
				doDeleteCaseSummary: !0,
				containerName: n.containerName,
				isActionFromToDoList: n.isActionFromToDoList,
				isChild: !1
			};
			n.isChild && (r.containerName = W.PRIMARY, r.isChild = n.isChild);
			const a = Ol,
				s = Pp.buildActionObject(r, this.c11nEnv),
				{
					promise: o
				} = this.actionsApiPromise(a, s);
			if (n.channelName && (s.headers = s.headers || {}, s.headers[W.X_ORIGIN_CHANNEL] = n.channelName), q.isRemoteCase(t)) {
				const {
					RemoteSystemID: e
				} = q.getRemoteCase(t);
				s.headers = s.headers || {}, s.headers.RemoteSystemID = e
			}
			s.className = t, s.activeItemCaseViewMode = this.c11nEnv.getValue("context_data.caseViewMode"), re.getPreviewMode() && ![W.WORKAREA].includes(n.containerName) && (s.debugInfo = {
				debugId: _p.generateUniqueID()
			});
			const i = {
				context: s.context || n.context,
				containerName: s.containerName || n.containerName,
				targetContainerName: s.containerName || n.containerName,
				viewType: s.viewType || n.viewType,
				skipBrowserSemanticUrlUpdate: n.skipBrowserSemanticUrlUpdate
			};
			return op({
				type: a,
				payload: {
					...s,
					...i
				}
			}), o
		}
		finishAssignment(e, t = {
			outcomeID: ""
		}) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const n = Us(e);
			let r = n;
			if (n?.includes("/workarea") && (r = n.substring(0, r.lastIndexOf("/workarea"))), (e => {
					const t = Xr();
					if (t[e])
						for (const n in t[e].fieldOrder)
							if (Object.hasOwn(t[e].fieldOrder, n) && t[e].fieldOrder[n].getConfigProps().hasSuggestions) return !0;
					return !1
				})(n)) {
				const e = [{
					type: "error",
					message: de.getLocaleValue(this.MSG_ACTIVE_SUGGESTION_UNATTENDED, "Messages")
				}];
				return Zn({
					messages: e,
					context: r,
					category: H.PAGE
				}), Promise.reject({
					type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
				})
			}
			const a = ke,
				s = t?.isTriggeredFromDifferentContext,
				{
					caseID: o,
					assignments: i,
					localActionID: c,
					caseActions: d,
					caseInfo: l,
					businessID: u
				} = On(e, this.c11nEnv, {
					isTriggeredFromDifferentContext: s
				}),
				p = An(l);
			let h, g = !1;
			if (d) {
				const e = d.find((e => e.ID === c));
				g = "Case" === e?.type
			} else h = ip(n);
			let {
				assignmentID: f
			} = On(e, this.c11nEnv, {
				isTriggeredFromDifferentContext: s
			});
			h?.context_data?.actionType && (g = h.context_data.actionType === W.CASE, f = f || h.context_data.assignmentID);
			const y = Pn(i, f, c),
				[m, I] = o.split(" "),
				E = {
					class: m,
					actionID: y,
					assignmentID: f,
					caseID: o,
					workID: I,
					containerName: this.c11nEnv.getContainerName(),
					containerItemID: e,
					isCaseWideAction: g,
					doDeleteCaseSummary: !0,
					isInCreateStage: p,
					businessID: u
				};
			e?.includes(W.MODAL) && (E.containerName = W.MODAL, E.isModalAction = !0), E.outcome = t.outcomeID, l?.isLocalAction && (E.viewType = Ja.FORM);
			const A = Pp.buildActionObject(E, this.c11nEnv),
				{
					promise: _
				} = this.actionsApiPromise(a, A),
				S = this.c11nEnv.getValue("isProcessAction", "isProcessAction");
			return A.isProcessAction = S, Zl.executeOrQueueDeferredAction({
				type: a,
				payload: {
					...A,
					context: n
				}
			}), _
		}
		getNextWork() {
			const e = Ol,
				t = Pp.buildActionObject({
					containerName: W.PRIMARY,
					isGetNextWork: !0
				}, this.c11nEnv),
				{
					promise: n
				} = this.actionsApiPromise(e, t);
			return op({
				type: e,
				payload: {
					...t
				}
			}), n
		}
		openStage(e) {
			if (!e) return Promise.reject(new Error("stageID is required parameter for openStage"));
			const t = Ol,
				n = this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID),
				r = this.c11nEnv.getCaseSummary().headers,
				a = Pp.buildActionObject({
					containerName: this.c11nEnv.getContainerName(),
					isOpenStage: !0,
					stageID: e
				}, this.c11nEnv),
				{
					promise: s
				} = this.actionsApiPromise(t, a),
				o = {
					type: t,
					payload: {
						...a,
						caseID: n,
						headers: r
					}
				};
			return op(o), s
		}
		submitBulkAction(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = "SUBMIT_BULK_ACTION",
				n = this.c11nEnv.getValue(H.CASE_INFO.CASES),
				r = this.c11nEnv.getValue(H.CASE_INFO.ACTIVE_ACTION_ID),
				a = {
					containerName: this.c11nEnv.getContainerName(),
					containerItemID: e,
					isCaseWideAction: !0,
					doDeleteCaseSummary: !0,
					isInCreateStage: !1
				};
			e && e.includes(W.MODAL) && (a.containerName = W.MODAL, a.isModalAction = !0);
			const s = Pp.buildActionObject(a, this.c11nEnv),
				{
					promise: o
				} = this.actionsApiPromise(t, s),
				i = Us(e);
			return op({
				type: t,
				payload: {
					...s,
					context: i,
					cases: n,
					actionID: r,
					isFormValid: ta(i),
					classID: this.c11nEnv.getCurrentClassID()
				}
			}), o
		}
		openBulkAction(e, t) {
			if (!e) return Promise.reject(new Error("actionID is required parameter for openBulkAction"));
			if ("string" != typeof e) return Promise.reject(new TypeError("actionID must be a string openBulkAction"));
			const {
				selectedList: n
			} = t, r = t.type, a = {
				selectedList: n,
				vcName: t.target,
				actionName: t?.name,
				actionID: e,
				doDeleteCaseSummary: !0,
				localActionType: r,
				...t
			}, s = "OPEN_BULK_ACTION", o = Pp.buildActionObject(a, this.c11nEnv), {
				promise: i
			} = this.actionsApiPromise(s, o);
			return op({
				type: s,
				payload: {
					...o
				}
			}), i
		}
		cancelBulkAction(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = Je,
				n = {
					containerItemID: e,
					context: e,
					skipReleaseLockRequest: !0,
					target: `${W.APP.APP}/${W.MODAL}`,
					caseViewMode: W.PERFORM_MODE,
					deleteContext: !0
				};
			op({
				type: t,
				payload: n
			});
			const {
				promise: r
			} = this.actionsApiPromise(t, n);
			return r
		}
		approveCase(e) {
			return e ? "string" != typeof e ? Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING)) : (op({
				type: Pe,
				payload: {
					reference: H.CASE_INFO.APPROVALFLAG,
					value: W.APPROVED,
					context: e
				}
			}), this.finishAssignment(e)) : Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED))
		}
		rejectCase(e) {
			return e ? "string" != typeof e ? Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING)) : (op({
				type: Pe,
				payload: {
					reference: H.CASE_INFO.APPROVALFLAG,
					value: W.REJECTED,
					context: e
				}
			}), this.finishAssignment(e)) : Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED))
		}
		resolveDuplicateCase(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const [, t] = this.c11nEnv.getValue(H.CASE_INFO.DUPLICATECASEINSKEY).split(" "), n = {
				type: Pe,
				payload: {
					reference: H.CASE_INFO.DUPLICATECASEFLAG,
					value: W.DUPLICATE,
					context: e
				}
			}, r = {
				type: Pe,
				payload: {
					reference: H.CASE_INFO.DUPLICATECASEID,
					value: t,
					context: e
				}
			};
			return op([n, r]), this.finishAssignment(e)
		}
		ignoreDuplicateCase(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = {
					type: Pe,
					payload: {
						reference: H.CASE_INFO.DUPLICATECASEFLAG,
						value: W.IGNORE,
						context: e
					}
				},
				n = {
					type: Pe,
					payload: {
						reference: H.CASE_INFO.DUPLICATECASEID,
						value: "",
						context: e
					}
				},
				r = {
					type: Pe,
					payload: {
						reference: H.CASE_INFO.DUPLICATECASEINSKEY,
						value: "",
						context: e
					}
				};
			return op([t, n, r]), this.finishAssignment(e)
		}
		openLocalAction(e, t) {
			if (!e) return Promise.reject(new Error("actionID is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError("actionID must be a string"));
			const n = t.assignKey || this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENT_ID),
				r = t.caseID || this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID),
				a = t.type,
				s = {
					caseID: r,
					assignmentID: n,
					vcName: t.target,
					actionName: t?.name,
					assignKey: n,
					actionID: e,
					doDeleteCaseSummary: !0,
					localActionType: a,
					...t
				},
				o = "OPEN_LOCAL_ACTION",
				i = Pp.buildActionObject(s, this.c11nEnv),
				c = this.c11nEnv.getContextName(),
				{
					promise: d
				} = this.actionsApiPromise(o, i),
				l = Vs(c)[0];
			let u, p = !1;
			if (!l) return u = c, op({
				type: o,
				payload: {
					...i,
					contextName: c,
					continueExecution: p
				}
			}), d;
			u = Ms(l);
			const h = Ps(l);
			if (h?.accessedOrder.forEach((e => {
					r === h.items[e].key && (p = !0, u = h.items[e].context)
				})), !p || "review" === Ql.getCaseViewMode(u)) return op({
				type: o,
				payload: {
					...i,
					contextName: c,
					continueExecution: p
				}
			}), d;
			const g = u,
				f = g && -1 !== g.indexOf(W.MODAL),
				y = t.assignKey || this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENT_ID),
				m = ip(u),
				I = m?.caseInfo?.assignments ? m.caseInfo.assignments[0]?.actions[0]?.ID : void 0,
				E = this.c11nEnv.getContainerName(),
				A = this.c11nEnv.getValue(H.CASE_INFO.CASE_TYPE_ID),
				_ = this.c11nEnv.getValue("isProcessAction", "isProcessAction"),
				S = Pp.buildActionObject({
					context: g,
					containerItemID: u,
					assignmentID: y,
					actionID: I,
					caseID: r,
					containerName: E,
					caseType: A,
					isModalAction: f,
					isFormValid: !0,
					isProcessAction: _
				}, this.c11nEnv);
			S.context = u;
			const C = Us(u),
				$ = this.c11nEnv.getCaseSummary(),
				b = An($),
				P = Pp.buildActionObject({
					caseID: r,
					containerItemID: u,
					cancelContext: C
				}, this.c11nEnv);
			let O = {};
			return f ? (P.acTargetName = W.MODAL, P.isInCreateStage = b, P.isModalAction = f, O = {
				...P
			}) : O = {
				...P,
				acName: Ft(this.c11nEnv.getContainerName(), P.context)
			}, op({
				type: o,
				payload: {
					...i,
					contextName: c,
					saveActionPayload: S,
					cancelActionPayload: O,
					continueExecution: p
				}
			}), d
		}
		openProcessAction(e, t) {
			if (!e) return Promise.reject(new Error("actionID is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError("actionID must be a string"));
			const n = this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENT_ID) || t.assignKey,
				r = this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID) || t.caseID,
				a = t.type,
				s = {
					caseID: r,
					assignmentID: n,
					vcName: t.target,
					actionName: t?.name,
					assignKey: n,
					actionID: e,
					doDeleteCaseSummary: !0,
					processActionType: a,
					isProcessAction: !0,
					...t
				},
				o = Pl,
				i = Pp.buildActionObject(s, this.c11nEnv),
				{
					promise: c
				} = this.actionsApiPromise(o, i);
			return op({
				type: o,
				payload: {
					...i
				}
			}), c
		}
		navigateToStep(e, t) {
			if (!e) return Promise.reject(new Error("stepID is required parameter"));
			if ("string" != typeof e) return Promise.reject(new TypeError("stepID must be a string"));
			if (!t) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof t) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const n = "NAVIGATE_TO_STEP",
				r = this.c11nEnv.getValue(H.NEXT_ASSIGNMENT_INFO_ID) ? this.c11nEnv.getValue(H.NEXT_ASSIGNMENT_INFO_ID) : this.c11nEnv.getValue(H.CASE_INFO.ASSIGNMENT_ID),
				a = An(this.c11nEnv.getCaseSummary()),
				s = {
					ID: r,
					stepID: e,
					acTargetName: this.c11nEnv.getContainerName(),
					targetContainerName: this.c11nEnv.getContainerName(),
					containerItemID: t,
					doDeleteCaseSummary: !0,
					isInCreateStage: a
				};
			t && t.includes(W.MODAL) && (s.acTargetName = W.MODAL);
			const o = Pp.buildActionObject(s, this.c11nEnv),
				{
					promise: i
				} = this.actionsApiPromise(n, o),
				c = Us(t);
			return op({
				type: n,
				payload: {
					...o,
					containerItemID: t,
					context: c
				}
			}), i
		}
		cancelAssignment(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const {
				CASE_INFO: t
			} = H, n = Ve, r = Us(e), a = e && e.includes(W.MODAL), s = this.c11nEnv.getCaseSummary(), o = An(s), i = this.c11nEnv.getValue(t.CASE_INFO_ID), c = Pp.buildActionObject({
				caseID: i,
				containerItemID: e,
				context: r
			}, this.c11nEnv);
			let d = {};
			a ? (c.acTargetName = W.MODAL, c.isInCreateStage = o, c.isModalAction = a, d = {
				...c
			}) : d = {
				...c,
				acName: Ft(this.c11nEnv.getContainerName(), c.context)
			};
			const {
				promise: l
			} = this.actionsApiPromise(n, c);
			return op({
				type: n,
				payload: d
			}), l
		}
		cancelLocalAction(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const {
				CASE_INFO: t
			} = H, n = e, r = It, a = e && e.includes(W.MODAL), s = this.c11nEnv.getValue(t.CASE_INFO_ID), o = Pp.buildActionObject({
				caseID: s,
				containerItemID: e,
				context: n
			}, this.c11nEnv);
			if (!fa(n)) {
				return new Dl(this.c11nEnv).removeContainerItem({
					containerItemID: e
				})
			}
			op({
				type: r,
				payload: {
					...o,
					isModalAction: a
				}
			});
			const {
				promise: i
			} = this.actionsApiPromise(r, o);
			return i
		}
		cancelCreateStageAssignment(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const {
				CASE_INFO: t
			} = H, n = It, r = e, a = r && r.includes(W.MODAL), s = this.c11nEnv.getCaseSummary(), o = An(s), i = this.c11nEnv.getValue(t.CASE_INFO_ID), c = Pp.buildActionObject({
				caseID: i,
				containerItemID: e,
				context: r
			}, this.c11nEnv), d = this.c11nEnv.getValue("isProcessAction", "isProcessAction"), l = ae.isCoexistenceAppOfType(W.APP_TYPE.UIKIT);
			if (c.isProcessAction = d, o && (a || l) && !Sn(s)) {
				const t = this.c11nEnv.getValue("caseInfo.isFirstAssignment"),
					o = fa(r);
				if (this.shouldDeleteCaseInCreateStage(o, t, l)) return this.deleteCaseInCreateStage(e);
				op({
					type: n,
					payload: {
						...c,
						isModalAction: a,
						isChildCase: bn(s)
					}
				})
			}
			const {
				promise: u
			} = this.actionsApiPromise(n, c);
			return u
		}
		saveAssignment(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = vl,
				n = this.getSaveActionPayload(e, !0),
				{
					promise: r
				} = this.actionsApiPromise(t, n);
			return op(Nl(n)), r
		}
		saveAndClose(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = vl,
				n = this.getSaveActionPayload(e),
				{
					promise: r
				} = this.actionsApiPromise(t, n);
			return op(Nl(n)), r
		}
		deleteCaseInCreateStage(e, t = !1) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const n = Tl,
				r = e,
				a = r && r.includes(W.MODAL),
				s = this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID),
				o = this.c11nEnv.getValue(H.CASE_INFO.CASE_TYPE_ID),
				i = Pp.buildActionObject({
					caseID: s,
					caseType: o,
					containerItemID: e,
					context: r,
					ignoreCaseDeletion: t
				}, this.c11nEnv),
				c = this.c11nEnv.getValue("isProcessAction", "isProcessAction"),
				d = this.c11nEnv.getValue(H.CASE_INFO.PARENTCASEINFO);
			i.isProcessAction = c, i.parentCaseInfo = d;
			const l = `${W.APP.APP}/${$s.PRIMARY}`,
				u = cs(l, $s.PRIMARY);
			i.parentContext = u, a && (i.targetName = W.MODAL, i.containerName = $s.MODAL, i.isModalAction = a), op((e => ({
				type: Tl,
				payload: e
			}))(i));
			const {
				promise: p
			} = this.actionsApiPromise(n, i);
			return p
		}
		getRecents(e) {
			if (!e) return Promise.reject(new Error("maxResultsToFetch is required parameter"));
			if ("number" != typeof e) return Promise.reject(new TypeError("maxResultsToFetch must be number"));
			let {
				restApi: t
			} = te.getRestEndPoint("getRecents");
			t = `${t}?maxResultsToFetch=${e}`;
			const n = A() + t;
			return yl(n, {
				method: "GET",
				headers: {}
			})
		}
		updateRecents(e, t, n, r) {
			const {
				restApi: a
			} = te.getRestEndPoint("updateRecents"), s = A() + a;
			return yl(s, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: {
					pyLabel: n,
					pyID: t,
					classID: e,
					ID: r
				}
			})
		}
		logout() {
			const {
				restApi: e
			} = te.getRestEndPoint("Logout"), t = A() + e;
			return yl(t, {
				method: "GET",
				headers: {}
			})
		}
		invoke(e, t = {}) {
			const n = {
				method: t.method || "GET",
				body: t.body
			};
			return yl(e, n, this.c11nEnv.getContextName())
		}
		showCasePreview(e, t = {}) {
			this.loadView(e, "pyCasePreview", {
				container: $s.PREVIEW,
				containerName: $s.PREVIEW,
				context: H.APP.APP,
				...t
			})
		}
		showDataPreview(e, t, n = {}) {
			return e ? "string" != typeof e ? Promise.reject(new TypeError("dataContext must be string")) : t ? "object" != typeof t ? Promise.reject(new TypeError("dataContextParameters must be an object")) : this.showData("pyDataPreview", e, t, {
				container: $s.PREVIEW,
				containerName: $s.PREVIEW,
				context: H.APP.APP,
				...n,
				skipSemanticUrl: !0
			}) : Promise.reject(new Error("dataContextParameters is required parameter")) : Promise.reject(new Error("dataContext is required parameter"))
		}
		loadView(e, t, n) {
			let r = Pp.buildActionObject({
				caseId: e,
				viewName: t,
				caseClassName: this.c11nEnv.getValue(H.CASE_INFO.CASE_TYPE_ID),
				RemoteSystemID: q.getRemoteHeaderByContext(this.c11nEnv.getContextName())
			}, this.c11nEnv);
			n && (r = {
				...r,
				...n
			});
			const a = ve,
				{
					promise: s
				} = this.actionsApiPromise(a, r, !1);
			return op({
				type: a,
				payload: {
					...r
				}
			}), s
		}
		showPage(e, t, n = {
			containerName: "",
			skipSemanticUrl: ""
		}) {
			if (!e) return Promise.reject(new Error(this.MSG_PAGENAME_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_PAGENAME_STRING));
			if (!t) return Promise.reject(new Error(this.MSG_CLASSNAME_REQUIRED));
			if ("string" != typeof t) return Promise.reject(new TypeError(this.MSG_CLASSNAME_STRING));
			const r = Pp.buildActionObject({
					viewName: e,
					className: t
				}, this.c11nEnv),
				a = Ne,
				{
					promise: s
				} = this.actionsApiPromise(a, r);
			return re.getPreviewMode() && (r.debugInfo = {
				debugId: _p.generateUniqueID()
			}), op({
				type: a,
				payload: {
					...r,
					containerName: n.containerName || this.c11nEnv.getContainerName(),
					skipSemanticUrl: n.skipSemanticUrl
				}
			}), s
		}
		showInsight(e, t = {}) {
			if (!e) return Promise.reject(new Error(this.MSG_INSIGHTID_REQUIRED));
			const n = Pp.buildActionObject({}, this.c11nEnv),
				r = De,
				{
					promise: a
				} = this.actionsApiPromise(r, n);
			return op({
				type: r,
				payload: {
					...n,
					containerName: this.c11nEnv.getContainerName(),
					skipSemanticUrl: t.skipSemanticUrl || !1,
					insightID: e
				}
			}), a
		}
		showDashboard(e, t = {}) {
			if (!e) return Promise.reject(new Error(this.MSG_DASHBOARDID_REQUIRED));
			const n = Pp.buildActionObject({}, this.c11nEnv),
				r = xe,
				{
					promise: a
				} = this.actionsApiPromise(r, n);
			return op({
				type: r,
				payload: {
					...n,
					containerName: this.c11nEnv.getContainerName(),
					skipSemanticUrl: t.skipSemanticUrl || !1,
					dashboardID: e
				}
			}), a
		}
		showData(e, t, n, r = {
			containerName: "",
			skipSemanticUrl: !1
		}) {
			if (!e) return Promise.reject(new Error(this.MSG_PAGENAME_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_PAGENAME_STRING));
			if (!t) return Promise.reject(new Error("dataContext is required parameter"));
			if ("string" != typeof t) return Promise.reject(new TypeError("dataContext must be string"));
			const a = Pp.buildActionObject({
					pageName: e,
					dataContext: t,
					dataContextParameters: n
				}, this.c11nEnv),
				s = Re,
				{
					promise: o
				} = this.actionsApiPromise(s, a);
			return op({
				type: s,
				payload: {
					...a,
					...r,
					skipSemanticUrl: Boolean(r.skipSemanticUrl)
				}
			}), o
		}
		changeHandler(e, t) {
			Pp.changeHandler(e, t)
		}
		eventHandler(e, t) {
			Pp.eventHandler(e, t)
		}
		triggerFieldChange(e, t, n = !1) {
			const r = this.c11nEnv.getContextName(),
				a = this.c11nEnv.getPageReference(),
				s = $p.getContextPath(a, e);
			n || this.c11nEnv.getValidationApi().validate(t), this.c11nEnv.isInsideList() && this.c11nEnv.getListActions().updateProperty(e, t);
			let o = this.c11nEnv.getValue(W.CLASS_ID);
			const i = e ? e.split(".").filter((e => !!e)) : [];
			i.length > 1 && (i.pop(), o = lp(`.${i.join(".")}.classID`, a, r)), e = _p.trimDotForProperty(e), op({
				type: Te,
				payload: {
					reference: s,
					value: t,
					context: r,
					pageReference: this.c11nEnv.getPageReference(),
					propertyName: e || this.c11nEnv.getComponentConfig().value,
					classID: o
				}
			})
		}
		updateFieldValue(e, t, n = {}) {
			const {
				removePropertyFromChangedList: r = !1,
				isArrayDeepMerge: a = !0,
				contextPageReference: s = "",
				isListEntry: o = !1,
				skipDirtyValidation: i = !1
			} = n, c = this.c11nEnv.getContextName();
			let d = this.c11nEnv.getPageReference();
			const l = s?.startsWith(d) ? s.replace(d, "") : s;
			d = s || d;
			const u = $p.getContextPath(d, e);
			let p = !1;
			this.c11nEnv.isInsideList() && this.c11nEnv.getListActions().updateProperty(l ? `${l}${e}` : e, t, {
				isArrayDeepMerge: a
			}), this.c11nEnv.isBulkAction() && (p = !0), e || (e = this.c11nEnv.getStateProps().value), Qn({
				type: H.MESSAGES.MESSAGES_TYPE_ERROR,
				property: e,
				pageReference: d,
				context: c,
				isListEntry: o
			}), op({
				type: Pe,
				payload: {
					reference: u,
					value: t,
					context: c,
					isArrayDeepMerge: a,
					skipDirtyValidation: i,
					...p && {
						isStrictTracking: p
					},
					...r && {
						removePropertyFromChangedList: r
					}
				}
			})
		}
		activateModalContainerItem(e) {
			const t = ct,
				{
					context: n
				} = e,
				r = n && n.includes(W.MODAL),
				a = Pp.buildActionObject({
					...e,
					containerName: this.c11nEnv.getContainerName(),
					containerItemID: n
				}, this.c11nEnv);
			r && (a.containerName = W.MODAL, a.isModalAction = r), op({
				type: t,
				payload: a
			});
			const {
				promise: s
			} = this.actionsApiPromise(t, a);
			return s
		}
		refreshCaseView(e, t, n, r = {}) {
			const {
				promise: a,
				actionMgrID: s
			} = this.actionsApiPromise("REFRESH_DATA"), {
				autoDetectRefresh: o,
				propertyName: i,
				preserveClientChanges: c,
				classID: d
			} = r, l = {
				actionMgrID: s,
				caseViewAction: !0,
				preserveClientChanges: c,
				propertyName: i,
				classID: d
			};
			r.refreshFor && (l.refreshFor = r?.refreshFor);
			const u = this.c11nEnv.getContextName(),
				p = this.c11nEnv.getPageReference();
			return !this.c11nEnv.getValue(W.CONTEXT_DATA_MODAL_VIEW.IS_MULTI_RECORD_DATA) && o && (((e, t) => $n(e) && !Cn(e, t))(u, p) || Cn(u, p)) ? Un(u, n, l) : wn(e, t, u, n, l), a
		}
		openEmbeddedDataModal(e, t, n, r, a) {
			const s = Lt,
				o = t.getCaseInfo().getKey(),
				i = `${t.getPageReference().replace(H.CASE_INFO.CASE_INFO_CONTENT,"")}${n}[${r}]`,
				c = {
					targetProperty: n,
					index: r,
					viewID: e,
					ID: o,
					actionType: a,
					interestPage: _p.convertPageRefToClipboardPageNotation(i)
				},
				d = Pp.buildActionObject(c, this.c11nEnv),
				{
					promise: l
				} = this.actionsApiPromise(s, d);
			return op({
				type: s,
				payload: {
					...d,
					containerName: H.MODAL,
					skipSemanticUrl: !0
				}
			}), l
		}
		submitEmbeddedDataModal(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = jt,
				n = this.c11nEnv.getPageReference().replace(H.CASE_INFO.CASE_INFO_CONTENT, ""),
				r = Us(e),
				a = {
					containerItemID: e,
					containerName: this.c11nEnv.getContainerName(),
					doDeleteCaseSummary: !0,
					isInCreateStage: !1,
					ID: this.c11nEnv.getValue(H.CASE_INFO.CASE_INFO_ID),
					viewID: this.c11nEnv.getValue(W.CONTEXT_DATA_MODAL_VIEW.VIEW_NAME),
					isFormValid: ta(r),
					interestPage: _p.convertPageRefToClipboardPageNotation(n),
					parentContext: this.c11nEnv.getValue(W.CONTEXT_DATA_MODAL_VIEW.PARENT_CONTEXT),
					isModalAction: !1,
					target: this.c11nEnv.getTarget()
				};
			e && e.includes(W.MODAL) && (a.containerName = W.MODAL, a.isModalAction = !0);
			const s = Pp.buildActionObject(a, this.c11nEnv),
				{
					promise: o
				} = this.actionsApiPromise(t, s);
			if (fa(r)) {
				const [e, t, n] = Hn(this.c11nEnv.getPageReference());
				Wn.mutatePageList(this.c11nEnv.getValue(W.CONTEXT_DATA_MODAL_VIEW.PARENT_CONTEXT), e, t, {
					type: $t,
					rowIndex: n
				}), op({
					type: $t,
					payload: {
						pageReference: this.c11nEnv.getPageReference(),
						context: this.c11nEnv.getValue(W.CONTEXT_DATA_MODAL_VIEW.PARENT_CONTEXT),
						isListEntry: !0
					}
				})
			}
			return op({
				type: t,
				payload: {
					...s,
					context: r
				}
			}), o
		}
		fillFormWithAI(e) {
			if (!e) return Promise.reject(new Error(this.MSG_CONTAINERITEMID_REQUIRED));
			if ("string" != typeof e) return Promise.reject(new TypeError(this.MSG_CONTAINERITEMID_STRING));
			const t = Us(e),
				n = this.c11nEnv.getPageReference(),
				{
					promise: r,
					actionMgrID: a
				} = this.actionsApiPromise(Ut);
			return Un(t, n, {
				actionMgrID: a,
				isFillFormWithAI: !0,
				preserveClientChanges: !1
			}), r
		}
	};
	const tu = class {
			constructor(e) {
				this.c11nEnv = e
			}
			getCaseStages(e, t) {
				const n = {
						caseID: e
					},
					{
						restApi: r,
						reqType: a
					} = Eh("getCaseStages", n);
				return yl(r, {
					method: a
				}, t).then((e => e.data.stages))
			}
			getCaseTypeName() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_TYPE_NAME)
			}
			getName() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_NAME)
			}
			getClassName() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_TYPE_ID)
			}
			getAvailableProcesses() {
				return this.c11nEnv.getValue(W.CASE_INFO.AVAILABLEPROCESSES)
			}
			getKey() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_ID)
			}
			getID() {
				const e = this.getKey();
				if (e) {
					const [, t] = e.split(" ");
					return t || e
				}
			}
			getAssignmentID() {
				return this.c11nEnv.getValue(W.CASE_INFO.ASSIGNMENT_ID)
			}
			getActions() {
				return this.c11nEnv.getValue(W.CASE_INFO.ACTION_BUTTONS)
			}
			getActiveFlowActionID() {
				return this.c11nEnv.getValue(W.CASE_INFO.ACTIVE_ACTION_ID) || this.c11nEnv.getValue(W.CASE_INFO.ASSIGNMENTACTION_ID)
			}
			getParentCaseInfo() {
				return this.c11nEnv.getValue(W.CASE_INFO.PARENTCASEINFO)
			}
			isPerform() {
				return this.c11nEnv.getValue(`${W.CONTEXT_DATA}${W.CASE_VIEW_MODE_PROP}`) === W.PERFORM_MODE
			}
			isReview() {
				return this.c11nEnv.getValue(`${W.CONTEXT_DATA}${W.CASE_VIEW_MODE_PROP}`) === W.REVIEW_MODE
			}
			isAssignmentInCreateStage() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO);
				return An(e)
			}
			isLocalAction() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO);
				return Sn(e)
			}
			getCurrentAssignmentViewName() {
				let e = null,
					t = !1;
				if (this.c11nEnv.getValue("context_data.caseViewMode") === W.PERFORM_MODE) {
					if (this.isLocalAction()) return e;
					if (this.isAssignmentInCreateStage()) t = !0;
					else {
						const t = this.c11nEnv.getTarget(),
							n = this.c11nEnv.getContextName(),
							r = Os(t, n),
							{
								config: a
							} = t && n ? r && r.view : this.c11nEnv.getMetadata();
						e = a?.type === W.VIEW ? a?.name : null
					}(e && e.startsWith(W.PROPERTY_ANNOTATION) || t) && (e = this.c11nEnv.getValue(W.CASE_INFO.VIEW_NAME))
				}
				return e
			}
			getActionRefreshConditions() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.ACTIVE_ACTION_ID),
					t = Ie(this.c11nEnv.getContextName());
				let n;
				t && (n = ip(t));
				const r = n?.caseInfo?.availableActions,
					a = ip(this.c11nEnv.getContextName()),
					s = a?.caseInfo?.refreshConditions;
				if (e) {
					if (r) {
						const t = r.find((t => t.ID === e));
						return t ? t.refreshConditions : s
					}
					return s
				}
				return this.c11nEnv.getValue(W.CASE_INFO.ACTION_REFRESH_CONDITIONS)
			}
			getBusinessID() {
				return this.c11nEnv.getValue(W.CASE_INFO.BUSINESS_ID)
			}
			getAssignments() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO)?.assignments
			}
			getChildAssignments() {
				return this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO)?.childCases?.[0]?.assignments
			}
			isCaseWideLocalAction = () => {
				const e = this.c11nEnv.getValue(W.CASE_INFO.ACTIVE_ACTION_ID),
					t = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_ACTIONS);
				if (t && e) {
					const n = t.find((t => t.ID === e));
					return "Case" === n?.type
				}
				return !1
			};
			getAllAssignments() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_ACTIONS),
					t = this.c11nEnv.getValue(W.CASE_INFO.ASSIGNMENT_LABEL),
					n = this.c11nEnv.getValue(W.CASE_INFO.D_CASE_ASSIGNMENTS_RESULTS) || [],
					r = this.getChildAssignments() || [];
				let a = JSON.parse(JSON.stringify(r));
				a = a.map((e => (e.isChild = !0, e)));
				const s = [...n, ...a];
				let o = JSON.parse(JSON.stringify(s));
				return e && !this.isPerform() && (o = o.map((e => (e.name = this.getActiveCaseActionName() || e?.name || t, e)))), o
			}
			getActiveCaseActionName() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_ACTIONS),
					t = this.c11nEnv.getValue(W.CASE_INFO.ACTIVE_ACTION_ID),
					n = e.find((e => e.ID === t));
				return n?.name || ""
			}
			getFirstCaseActionName() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.CASE_INFO_ACTIONS);
				return e[0]?.name || ""
			}
			hasAssignments() {
				const e = this.c11nEnv.getValue(W.CASE_INFO.D_CASE_ASSIGNMENTS_RESULTS),
					t = this.getChildAssignments();
				return !!(e || t || this.isCaseWideLocalAction())
			}
			hasMessages = () => !!this.c11nEnv.getValue("caseMessages");
			hasGetNextWorkLinks() {
				return !!this.c11nEnv.getValue(W.CASE_INFO.GETNEXTWORK)
			}
		},
		{
			RESOURCE_TYPES: nu
		} = H;
	const ru = class {
		static openCase(e, t, n, r = {}) {
			const a = {
					insKey: e,
					acTargetName: n,
					actionMgrID: vn.getNextActionMgrId(),
					context: t,
					...r
				},
				s = Ue;
			r && r.channelName && (a.headers = {}, a.headers[W.X_ORIGIN_CHANNEL] = r.channelName);
			const {
				promise: o
			} = vn.actionManagerPromise(s, a.actionMgrID);
			return op({
				type: s,
				payload: a
			}), o
		}
		static openAssignment(e, t, n, r = {}) {
			const a = {
					assignmentID: e,
					vcName: n,
					doDeleteCaseSummary: !0,
					actionMgrID: vn.getNextActionMgrId(),
					context: t,
					...r
				},
				s = Ge;
			r && r.channelName && (a.headers = {}, a.headers[W.X_ORIGIN_CHANNEL] = r.channelName);
			const {
				promise: o
			} = vn.actionManagerPromise(s, a.actionMgrID);
			return op({
				type: s,
				payload: {
					...a
				}
			}), o
		}
		static createCase(e, t, n, r = {}) {
			const a = je,
				s = {
					class: e,
					acTargetName: n,
					actionMgrID: vn.getNextActionMgrId(),
					context: t,
					...r
				};
			r && r.channelName && (s.headers = {}, s.headers[W.X_ORIGIN_CHANNEL] = r.channelName);
			const {
				promise: o
			} = vn.actionManagerPromise(a, s.actionMgrID);
			return op({
				type: a,
				payload: {
					...s
				}
			}), o
		}
		static getNextWork(e, t, n = {}) {
			const r = Ge,
				a = {
					isGetNextWork: !0,
					vcName: t,
					doDeleteCaseSummary: !0,
					actionMgrID: vn.getNextActionMgrId(),
					context: e,
					...n
				},
				{
					promise: s
				} = vn.actionManagerPromise(r, a.actionMgrID);
			return op({
				type: r,
				payload: {
					...a
				}
			}), s
		}
		static getOpenedCaseItems(e) {
			const t = [],
				n = Ps(e);
			if (n) {
				const {
					items: r = {}
				} = n, a = Object.keys(r), s = Ms(e);
				a.forEach((n => {
					if (r[n] && (r[n].resourceType === nu.CASE || r[n].resourceType === nu.ASSIGNMENT)) {
						const {
							key: a = "",
							context: o
						} = r[n], i = r[n], c = a.substring(a.indexOf(" ") + 1), d = lp(".caseTypeID", "caseInfo", o), l = s === n;
						t.push({
							...i,
							key: a,
							workID: a,
							caseID: c,
							className: d,
							context: o,
							containerItemID: n,
							target: e,
							active: l
						})
					}
				}))
			}
			return t
		}
		static getCaseDetails = e => {
			const t = {
					caseID: e
				},
				{
					restApi: n,
					reqType: r
				} = Eh(ft, t);
			return yl(n, {
				method: r
			})
		};
		static getCaseBulkActions = e => {
			const {
				restApi: t,
				reqType: n
			} = Eh("getBulkActions"), r = e.map((e => ({
				ID: e
			}))), a = r.length, s = a / 5, o = {}, i = [];
			for (let e = 0; e < a; e += s) o.cases = r.slice(e, e + s), o.cases.length && i.push(yl(t, {
				method: n,
				body: o
			}));
			return Promise.all(i).then((e => {
				let t = [];
				for (let n = 0; n < e.length; n += 1) 0 !== n ? t.length && (t = t.filter((t => e[n].data.availableActions.some((e => t.ID === e.ID))))) : t = e[n].data.availableActions;
				return t
			}))
		}
	};
	class au {
		constructor(e) {
			au._instance = this, this.context = `${e}/${W.SUGGESTION}`, sp().getState().data?.[this.context] || op({
				type: lt,
				payload: {
					context: this.context,
					data: {}
				}
			})
		}
		getField(e) {
			return lp(e, "", this.context)
		}
		setField(e, t) {
			op({
				type: Pe,
				payload: {
					reference: e,
					value: t,
					context: this.context
				}
			})
		}
		removeField(e) {
			op({
				type: He,
				payload: {
					reference: e,
					context: this.context
				}
			})
		}
		setState(e) {
			op(Np({
				context: this.context,
				data: e,
				isArrayDeepMerge: !0
			}))
		}
	}
	const su = au;
	const ou = class {
		static getSharedState(e) {
			const t = 0 === e.indexOf(".") ? e.substring(1) : e,
				n = cp();
			return n ? _p.getIn(n, t) : null
		}
		static setSharedState(e, t) {
			e && op(oh({
				key: e,
				value: t
			}))
		}
		static updateState(e, t, n, r = {}) {
			const {
				isArrayDeepMerge: a = !0,
				pageReference: s
			} = r;
			if (!e || !t) return;
			op(ih({
				context: e,
				reference: s ? `${s}.${t}` : t,
				value: n,
				isArrayDeepMerge: a
			}))
		}
		static getSuggestionsContext(e) {
			return new su(e)
		}
	};
	const iu = class {
		constructor(e, t, n) {
			this.meta = e, this.datasource = t, this.index = 0, this.options = n, this.datasourceObj = $p.getProperyValue(t, n.pageReference, n.context)
		}
		hasNext() {
			return this.index < this.datasourceObj.length
		}
		next() {
			if (!this.hasNext()) throw new Error("No Children");
			const e = $p.getContextPath(this.datasource, this.index);
			return this.index += 1, yu({
				meta: this.meta,
				options: {
					...this.options,
					pageReference: e
				}
			})
		}
		resetIndex() {
			this.index = 0
		}
	};
	class cu {
		constructor(e, t) {
			this.children = e, this.index = 0, this.options = t
		}
		hasNext() {
			return this.index < this.children.length
		}
		next() {
			if (!this.hasNext()) throw new Error("No Children");
			const e = this.children[this.index];
			return this.index += 1, yu({
				meta: e,
				options: this.options
			})
		}
		resetIndex() {
			this.index = 0
		}
	}
	const du = (e, t) => {
		const n = !!e.repeat;
		if (!!e["repeat-self"]) return new iu(e, e.context || "", t);
		if (n) {
			const n = pp(`${t.context}.${W.SUMMARY_OF_LISTS}`, e.pageReference, t.context);
			return new iu(e.children[0], n || e.context, t)
		}
		return e.children ? new cu(e.children, t) : void 0
	};
	class lu {
		static allowedComponetsForBulkProcessing = {
			Currency: !0,
			TextInput: !0,
			Phone: !0,
			Percentage: !0,
			Email: !0,
			Integer: !0,
			Decimal: !0,
			URL: !0,
			SemanticLink: !0,
			Checkbox: !0,
			RadioButtons: !0,
			DateTime: !0,
			Date: !0,
			Time: !0,
			Text: !0,
			TextArea: !0,
			RichText: !0,
			Dropdown: !0,
			Search: !0,
			Location: !0,
			Attachment: !0,
			AutoComplete: !0,
			MultiSelect: !0,
			UserReference: !0,
			Region: !0,
			TextContent: !0,
			View: {
				Forms: !0,
				DefaultForm: !0,
				OneColumn: !0,
				TwoColumn: !0,
				ThreeColumn: !0
			}
		};
		static getItemView(e, t) {
			const n = [];
			if (e && ["portal", "view"].includes(t)) {
				const {
					accessedOrder: t,
					items: r
				} = e;
				if (t && r) {
					const e = t[t.length - 1];
					r[e] && r[e].view && Object.keys(r[e].view).length > 0 && n.push(r[e])
				}
			}
			return n
		}
		static getDependentProperties = e => {
			let t = [];
			return e._rawConfig?.config?.parameters ? t = Object.values(e._rawConfig?.config?.parameters || {}) : e.getFieldMetadata(e.getStateProps()?.value)?.datasource?.parameters && (t = (e.getFieldMetadata(e.getStateProps()?.value)?.datasource?.parameters || []).map((e => e?.value))), t.filter((e => ra.isProperty(e))).map((e => ra.getPropertyName(e)))
		}
	}
	const uu = new lu;
	let pu;
	Object.freeze(uu);
	const hu = (e, t, n) => {
			e && (Object.keys(e).forEach((r => {
				if ("children" !== r) {
					const a = e[r],
						s = fe.trimAnnotation(a);
					if ("string" != typeof s && "string" != typeof a || !(_p.isPropertyRef(s) || a.startsWith("@W ") || a.startsWith("@E ") || a.startsWith("@ATTACHMENT "))) {
						if (Array.isArray(s)) s.forEach(((e, n) => {
							const a = {
								parentStateObj: t,
								parentKey: r,
								isObjHasValue: !!t[r]
							};
							t[r] = t[r] || [], t[r][n] = Object.create({}), hu(e, t[r][n], a)
						}));
						else if (s && "object" == typeof s && "exp" !== s.type) {
							const e = {
								parentStateObj: t,
								parentKey: r,
								isObjHasValue: !!t[r]
							};
							t[r] = t[r] || {}, hu(s, t[r], e)
						}
					} else n && n.parentKey && (n.isObjHasValue = !0), t[r] = s
				}
			})), n && !n.isObjHasValue && delete n.parentStateObj[n.parentKey])
		},
		gu = (e, t) => {
			e._inheritedProps = e._inheritedProps || [], e.inheritedProps = [...e._inheritedProps, ..._p.deepClone(t.inheritedProps)]
		};
	class fu {
		constructor(e) {
			const {
				meta: t,
				isRoot: n,
				options: r = {},
				useCustomContext: a
			} = e;
			this.meta = t, this._isRoot = n, this.options = r, this.useCustomContext = a, this._rawConfig = t?.config, this._isExpressionExist = !1, this._isWhenExist = !1, this._isValidatorExist = !1, this._pageReference = "", this._referenceContext = "", this._contextName = "", this._stateProps = {}, this._actions = {}, this._children = "", this._additionalRegisteredProps = {}, this._caseInfo = null, this.viewName = r.viewName, this.parentViewName = r.viewName ?? "", this._referenceList = r.referenceList || "", this._isInsideList = r.isInsideList || !1, this._inheritedConfig = {}, this._localeRuleName = r.localeReference, this._containerTarget = r.target, this.xrayInfo = {}, this._readOnly = t?.config?.readOnly || r.readOnly, this._hasSuggestions = !1, this._actionsApi = null, this._classID = null, r.inheritedConfig && (this._inheritedConfig = _p.deepClone(r.inheritedConfig)), t?.config?.inheritedProps && gu(this._inheritedConfig, t?.config), hu(this._rawConfig, this._stateProps), this._isState = !_p.isObjectEmpty(this._stateProps), this._rawConfig && this._rawConfig.config && (this._isExpressionExist = _p.isExpressionExist(this._rawConfig.config), this._isWhenExist = _p.isWhenExist(this._rawConfig.config), this._isValidatorExist = Lr.isValidatorExist(this._rawConfig.config)), this._isRoot ? this._contextName = H.APP.APP : this._contextName = this.meta?.config?.contextName || this.options.context, this._type = this.meta?.type;
			let s = this.options.pageReference;
			if (s && (s = fe.handleAnnotation(this.options.pageReference, this)), this._pageReference = $p.getContextPath(s || this.options.parentPageReference, this._pageReference), this._pageReference || (this._pageReference = ""), "reference" === this._type && (this._rawConfig = t), "reference" === this._type && _p.isWhenExist({
					visibility: this.meta?.config.visibility
				}) && Mn(this.viewName, this._contextName, this._pageReference), "reference" !== this._type && t && (this._rawConfig = $p.resolveReference(t, this)), this._rawConfig) {
				const e = this.getRawConfigProps();
				e && (this._localeRuleName = fe.trimAnnotation(e.localeReference) || r.localeReference, this._isExpressionExist = _p.isExpressionExist(e), this._isWhenExist = _p.isWhenExist(e), this._isValidatorExist = Lr.isValidatorExist(e)), this._children = this._rawConfig.children, this.options.hasForm && this._rawConfig.config && (Object.hasOwn(this._rawConfig.config, "value") || this._rawConfig.config.selectionList || "Editable" === this._rawConfig.config.renderMode && this._rawConfig.config.referenceList) && (!this._rawConfig.config.readOnly || "true" !== this._rawConfig.config.readOnly) && Yr(this._contextName, this.getFullReference(), this), this._rawConfig?.type?.toLowerCase() === W.VIEW && this._rawConfig.name && (this.viewName = fe.handleAnnotation(this._rawConfig.name, this)), this.options.hasForm && jn(this)
			}
			this.updateContextTree()
		}
		updateContextTree() {
			if (this._rawConfig && this._rawConfig.config && Object.hasOwn(this._rawConfig.config, "value") && this.isEditable() && !this.isReadOnly() && this.isVisible() && "DISPLAY_ONLY" !== this._inheritedConfig.displayMode && "DISPLAY_ONLY" !== this._rawConfig.config?.displayMode) {
				const e = fe.trimAnnotation(this._rawConfig.config.value);
				Wn.addFieldNode(this._contextName, this._pageReference, this.viewName ?? "", e, this.getValue(e))
			}
			this._rawConfig?.type?.toLowerCase() === W.VIEW && this._rawConfig.name && this.viewName && Wn.addViewNode(this._contextName, this._pageReference, this.viewName, this.parentViewName), "deferload" === this._rawConfig?.type?.toLowerCase() && this._rawConfig.config?.name && Wn.addViewNode(this._contextName, this._pageReference, this._rawConfig.config.name, this.viewName ?? ""), this._rawConfig?.config?.referenceList && Wn.addPageListNode(this._contextName, this._pageReference, this.viewName ?? "", fe.trimAnnotation(this._rawConfig.config.referenceList))
		}
		setXRayInfo(e) {
			_p.mergeDeep(e, this.xrayInfo)
		}
		getXRayInfo() {
			return this.xrayInfo
		}
		getStateProps() {
			return this._stateProps
		}
		setStateProps(e) {
			_p.mergeDeep(e, this._stateProps)
		}
		getMetadata() {
			return this._rawConfig
		}
		getCaseInfo() {
			return this._caseInfo || (this._caseInfo = new tu(this)), this._caseInfo
		}
		getListActions() {
			return xr(this)
		}
		getReferenceList() {
			return this._referenceList
		}
		isInsideList() {
			return this._isInsideList || /\[\d+\]/g.test(this.getPageReference())
		}
		getRawMetadata() {
			return this.getMetadata()
		}
		setReferenceList(e) {
			this._referenceList = e
		}
		getComponentConfig() {
			return this.getMetadata()?.config || {}
		}
		isExpressionExist() {
			return this._isExpressionExist
		}
		isWhenExist() {
			return this._isWhenExist
		}
		isConditionExist() {
			return this.isExpressionExist() || this.isWhenExist()
		}
		isBoundToState() {
			return this._isState
		}
		getPageReference() {
			return this._pageReference
		}
		getPropertyName() {
			const e = this.getComponentConfig();
			let t = "value";
			return "multi" === e.selectionMode ? t = "selectionList" : "Editable" === e.renderMode && (t = "referenceList"), this.getComponentConfig()[t]
		}
		getFullReference() {
			const e = this.getPageReference(),
				t = this.getPropertyName();
			return $p.getContextPath(e, t)
		}
		getContextName() {
			return this._contextName
		}
		getContainerName() {
			const {
				acTargetName: e = "primary",
				type: t,
				name: n
			} = this.getComponentConfig();
			return "view" !== t?.toLowerCase() && n ? n : this.options.containerName || e
		}
		getTarget() {
			return this._containerTarget
		}
		getCurrentView() {
			return this.viewName
		}
		populateSuggestionProps(e = {}) {
			if (this._rawConfig?.config && Object.hasOwn(this._rawConfig.config, "value") && this.getStateProps()?.value && this.options.hasForm) {
				const t = d?.getStore()?.getState()?.data[`${this.getContextName()}/${W.SUGGESTION}`],
					n = this.getStateProps()?.value,
					r = $p.getContextPath(this.getPageReference(), n),
					a = t ? ou.getSuggestionsContext(this.getContextName()).getField(r) : void 0;
				this._hasSuggestions = !!a, e.hasSuggestions = this._hasSuggestions, this._stateProps.hasSuggestions = this._hasSuggestions
			}
		}
		getConfigProps(e = {}) {
			const t = {
				...wr.getDefaultsforType(this._type),
				readOnly: this._readOnly,
				...this._rawConfig && this._rawConfig.config,
				...this._additionalRegisteredProps,
				...this._inheritedConfig
			};
			return this.populateSuggestionProps(t), this.resolveConfigProps(t, e), _p.resolveStringBooleans(e)
		}
		getRawConfigProps() {
			const e = {
				...wr.getDefaultsforType(this._type),
				...this._rawConfig.config,
				...this._additionalRegisteredProps,
				...this._inheritedConfig
			};
			return this.populateSuggestionProps(e), e
		}
		resolveConfigProps(e, t = {}) {
			return e && ($p.resolveProps(e, t, this), fe.handleComponentMapping(t, {
				type: this.getComponentName(),
				config: e
			}, this)), t
		}
		registerAdditionalProps(e = {}) {
			return Object.assign(this._additionalRegisteredProps, e), hu(e, this._stateProps), this.resolveConfigProps(this._additionalRegisteredProps)
		}
		deRegisterAdditionalProps(e = []) {
			return e.forEach((e => {
				delete this._additionalRegisteredProps[e]
			})), !0
		}
		populateAdditionalProps(e) {
			const t = this.getComponentName(),
				n = this.getComponentConfig(),
				r = t === W.ROOT_CONTAINER && "portal" !== e.renderingMode;
			if (t === W.MODAL_VIEW_CONTAINER || t === W.CASE_CREATE_STAGE) {
				const t = Ms(`${W.APP.APP}/${this.getContainerName()}`),
					n = Jn({
						context: t,
						category: H.PAGE
					});
				e.pageMessages = n, this._stateProps.pageMessages = e.pageMessages
			}
			const a = this._rawConfig?.config;
			if (this.options.hasForm && a && (Object.hasOwn(a, "value") || a.selectionList || "Editable" === a.renderMode && a.referenceList) && (!a.readOnly || "true" !== a.readOnly) && Yr(this._contextName, this.getFullReference(), this), this.isEditable()) {
				let {
					value: t
				} = this.getStateProps();
				void 0 === t && "multi" === this.getComponentConfig()?.selectionMode ? t = this.getStateProps().selectionList : !t && "Editable" === this.getComponentConfig()?.renderMode && this.getStateProps().referenceList && (t = this.getStateProps().referenceList);
				const n = Jn({
						property: t,
						pageReference: this.getPageReference(),
						context: this.getContextName(),
						type: H.MESSAGES.MESSAGES_TYPE_ERROR
					}),
					r = Jn({
						property: t,
						pageReference: this.getPageReference(),
						context: this.getContextName(),
						type: H.MESSAGES.MESSAGES_TYPE_INFO
					});
				if (n && n[0]) {
					const t = n.map((e => de.getLocaleValue(e.message, "Messages")));
					e.validatemessage = t.join(". "), e.status = W.FIELD_LEVEL_ERROR, this._stateProps.validatemessage = e.validatemessage, this._stateProps.status = e.status
				}
				r && r[0] && (e.infoMessage = r[0].message, e.status = W.FIELD_LEVEL_WARNING, this._stateProps.infoMessage = e.infoMessage, this._stateProps.status = e.status)
			}
			if (t === W.ROOT_CONTAINER) {
				const t = tr(r, Ms(`${W.APP.APP}/${this.getContainerName()}`));
				e.httpMessages = t, this._stateProps.httpMessages = e.httpMessages
			}
			if (t === W.ROOT_CONTAINER) {
				const t = Jn({
					context: W.APP.ROOT,
					category: "PAGE"
				});
				e.pageMessages = t, this._stateProps.pageMessages = e.pageMessages
			}
			if (t === W.HYBRID_VIEW_CONTAINER) {
				const t = Jn({
					context: W.APP.APP,
					category: W.HTTP
				});
				e.httpMessages = t, this._stateProps.httpMessages = t
			}
			if (t === W.APP_SHELL && e.portalDocMode === W.CONTAINER_TYPE.MULTIPLE && (e.activeCases = ru.getOpenedCaseItems(`${H.APP.APP}/${W.PRIMARY}`), this._stateProps.activeCases = e.activeCases), t === W.APP_SHELL) {
				const t = Jn({
					context: W.APP.APP,
					category: "PAGE"
				});
				e.pageMessages = t, this._stateProps.pageMessages = e.pageMessages
			}
			if (e.value && t === W.SCALARLIST && (this._stateProps.value = e.value), t === W.APP_SHELL || t === W.MODAL_VIEW_CONTAINER || t === W.CASE_CREATE_STAGE || n.template === W.CASE_PREVIEW) {
				let t = Jn({
					context: W.APP.APP,
					category: "HTTP"
				});
				const n = Jn({
					context: Ms(`${W.APP.APP}/${this.getContainerName()}`),
					category: "HTTP"
				});
				t ? n && (t = t.concat(Jn({
					context: Ms(`${W.APP.APP}/${this.getContainerName()}`),
					category: "HTTP"
				}))) : t = Jn({
					context: Ms(`${W.APP.APP}/${this.getContainerName()}`),
					category: "HTTP"
				}), e.httpMessages = t ? t.map((e => e.message)) : t, this._stateProps.httpMessages = e.httpMessages, t?.map((t => {
					t.errorDetails && (e.errorDetails = e.errorDetails ? e.errorDetails.push(...t.errorDetails) : t.errorDetails, this._stateProps.errorDetails = e.errorDetails), t.correlationID && (e.correlationID = t.correlationID)
				}))
			}
			if (t === W.VIEW_CONTAINER || t === W.FLOW_CONTAINER || t === W.MODAL_VIEW_CONTAINER || t === W.PREVIEW_VIEW_CONTAINER || t === W.ROOT_CONTAINER) {
				if (e.routingInfo = kt(this.getContainerName(), this._contextName), t === W.ROOT_CONTAINER && (e.rootConfig = lu.getItemView(e.routingInfo, e.renderingMode), this._stateProps.rootConfig = e.rootConfig), this._stateProps.routingInfo = e.routingInfo, t === W.FLOW_CONTAINER) {
					const t = Jn({
							context: this.getContextName(),
							category: W.CASEMESSAGES
						}),
						n = this.getContextName();
					e.caseMessages = t, this._stateProps.caseMessages = e.caseMessages, e.caseViewMode = this.getValue("context_data.caseViewMode"), this._stateProps.caseViewMode = e.caseViewMode;
					const r = Vs(n)[0];
					if (r) {
						const t = Ms(r);
						e.lastUpdateTime = d?.getStore()?.getState()?.data?.[t]?.caseInfo?.lastUpdateTime, this._stateProps.lastUpdateTime = d?.getStore()?.getState()?.data?.[t]?.caseInfo?.lastUpdateTime;
						const n = Jn({
							context: t,
							category: H.PAGE
						});
						e.pageMessages = n, this._stateProps.pageMessages = e.pageMessages
					}
				}
				if (e.loadingInfo = this.getLoadingStatus(this.getContextName()), e.assignmentNames = this.getCaseInfo().getAssignments()?.map((e => e.name)), e.childAssignmentNames = this.getCaseInfo().getChildAssignments()?.map((e => e.name)), t === W.MODAL_VIEW_CONTAINER) {
					const t = e.routingInfo?.accessedOrder || [],
						n = t[t.length - 1];
					n && (e.loadingInfo = this.getLoadingStatus(n))
				}
				this._stateProps.loadingInfo = e.loadingInfo, this._stateProps.assignmentNames = e.assignmentNames, this._stateProps.childAssignmentNames = e.childAssignmentNames
			} else n.template === W.CASE_VIEW || n.template === W.CASE_PREVIEW || n.template === W.OBJECT_PAGE ? (e.caseInfo = this.getCaseSummary(), this._stateProps.caseInfo = e.caseInfo) : t === W.CASE_STAGES && (e.stages = this.getCaseStages(), e.stageID = this.getStageID(), this._stateProps.stages = e.stages, this._stateProps.stageID = e.stageID);
			this.populateFieldMetadata(e)
		}
		populateFieldMetadata(e) {
			const {
				value: t,
				datasource: n,
				listType: r
			} = this.getComponentConfig();
			let a = "",
				s = "";
			if (r === W.ASSOCIATED ? (a = n, s = W.ASSOCIATED_PROPERTY_ANNOTATION) : (a = t, s = W.PROPERTY_ANNOTATION), a && "string" == typeof a && a.includes(s)) {
				const t = fe.getPropertyName(a),
					n = this.getFieldMetadata(t);
				n && (e.fieldMetadata = n, (e.fieldMetadata.isDeclarativeTarget || ra.isPropertyInternal(t) || !e.datasource && (e.fieldMetadata.isClassKey || e.fieldMetadata.isSpecial) && e.listType !== W.ASSOCIATED) && (e.readOnly = !0, this._stateProps.readOnly = e.readOnly, e.fieldMetadata.isDeclarativeTarget && this.registerAdditionalProps({
					readOnly: !0
				})))
			}
		}
		resolvePropertyMetadata(e, t) {
			if (!e) return e;
			const n = Ju(`${this._pageReference}.${t}`, this._contextName);
			return (n || null === n) && (e.additionalInformation = n), e
		}
		getFieldMetadata(e) {
			if (!e) return null;
			const t = e.split(".");
			if (t.length < 2) {
				let t = this.getValue(W.CLASS_ID);
				return !t && this._rawConfig && this._rawConfig.config && this._rawConfig.config.ruleClass && (t = this._rawConfig.config.ruleClass), this.resolvePropertyMetadata(wu(e, t), e)
			}
			return this.resolvePropertyMetadata(wu(t.pop(), this.getValue(`.${t.join(".")}${W.CLASS_ID}`)), e)
		}
		getCurrentPageFieldMetadata(e = null) {
			let t = this.getPageReference().split(".");
			null !== e && (t = e.split("."));
			const n = t.pop();
			return this.resolvePropertyMetadata(wu(n, this.getValue(`${t.join(".")}${W.CLASS_ID}`)))
		}
		getCurrentClassID() {
			return this._classID ?? this.getValue(W.CLASS_ID)
		}
		getCaseSummary() {
			const e = {
				...this.getDataObject()[H.CASE_INFO.CASE_INFO]
			};
			return e.CaseID = e.CaseID || this.getValue(H.CASE_INFO.CASE_INFO_PZINSKEY), {
				...e,
				isCaseWideAction: () => Cn(this.getContextName(), this.getPageReference())
			}
		}
		getReferencedUser(e) {
			const t = this.getValue("referencedUsers");
			if (Array.isArray(t)) {
				const n = t.find((t => t.UserID === e));
				if (n) return {
					userId: n.UserID,
					UserName: n.UserName
				}
			}
			return t && t[e] ? t[e] : null
		}
		getCaseStages() {
			return this.getDataObject()[H.CASE_INFO.CASE_INFO].stages
		}
		getStageID() {
			return this.getDataObject()[H.CASE_INFO.CASE_INFO].stageID
		}
		getActions() {
			return this._actions
		}
		isRoot() {
			return this._isRoot
		}
		resolveContextProps(e) {
			const {
				value: t
			} = this.getStateProps();
			t && (e.error = this.getContextDataValue(`${this.getPageReference()+t}.error`), e.validatemessage = this.getContextDataValue(`${this.getPageReference()+t}.validatemessage`))
		}
		isValidatorExist() {
			return !!this._isValidatorExist
		}
		getValidationApi() {
			return new Ao(this)
		}
		isEditable() {
			return this._rawConfig && this._rawConfig.config && !(this._inheritedConfig && this._inheritedConfig.readOnly) && (Object.hasOwn(this._rawConfig.config, "value") || this._rawConfig.config.selectionList || "Editable" === this._rawConfig.config.renderMode && this._rawConfig.config.referenceList) && !("string" == typeof this._rawConfig.config?.value && this._rawConfig.config.value.includes("@FILTERED_LIST")) && !(Object.hasOwn(this._rawConfig.config, "readOnly") && ("true" === this._rawConfig.config.readOnly || !0 === this._rawConfig.config.readOnly)) && !(Object.hasOwn(this._rawConfig.config, "disabled") && !0 === this._rawConfig.config.disabled)
		}
		isVisible() {
			return !Object.hasOwn(this._rawConfig?.config, "visibility") || "string" != typeof this._rawConfig?.config?.visibility || fe.handleAnnotation(this._rawConfig?.config?.visibility, this)
		}
		isReadOnly() {
			return void 0 !== this._readOnly && ("true" === this._readOnly || !0 === this._readOnly || fe.handleAnnotation(this._readOnly, this))
		}
		hasChildren() {
			return !!this._children
		}
		getComputedVisibility() {
			const e = "reference" === this._type && !!this.getReferencedView() ? this.getReferencedViewPConnect().getPConnect() : this;
			if (!1 === this.getConfigProps().visibility) return !1;
			const t = e.getConfigProps(),
				n = {
					includeTypes: ["Group", "Region", "View"],
					excludeTemplates: ["ListView", "SimpleTable", "StudioTable"]
				};
			let r = n.includeTypes.includes(e._type) && !n.excludeTemplates.includes(t.template);
			if (!!t.highlightedData && t.highlightedData.length && t.showHighlightedData && (r = !1), !r) return !0;
			const a = e.getChildren();
			return !!a && a.some((e => e.getPConnect().getComputedVisibility()))
		}
		getChildrenIterato() {
			return this._children.setContext(this.getPageReference()), this._children
		}
		setAction(e, t) {
			this._actions[e] = t
		}
		getComponentName() {
			return this._rawConfig && this._rawConfig.type
		}
		isComponentRefreshable() {
			return this._rawConfig && this._rawConfig.isRefreshable
		}
		getDataObject(e) {
			return ip(e || this.getContextName())
		}
		getImagePath(e) {
			return `${oe.getConstellationServiceUrl()}/v860/${oe.getAppAlias()}/image/${e}?org=${te.getOrganizationName()}`
		}
		skipRequiredValidation() {
			return this.options.isBulkAction
		}
		isBulkAction() {
			return this.options.isBulkAction
		}
		getChildren() {
			if (this._children && this._children.length) {
				const e = du(this._rawConfig, {
						pageReference: this._pageReference,
						context: this._contextName,
						localeReference: this._localeRuleName,
						hasForm: this.options.hasForm,
						isBulkAction: this.options.isBulkAction,
						containerName: this.getContainerName(),
						containerItemName: this.options.containerItemName,
						viewName: this.viewName,
						inheritedConfig: this._inheritedConfig,
						target: this._containerTarget,
						readOnly: this._readOnly
					}),
					t = [];
				for (; e?.hasNext();) {
					const n = e.next();
					if (this.isBulkAction()) {
						const e = n.getPConnect().getComponentName(),
							{
								template: t
							} = n.getPConnect().getConfigProps();
						if (!0 !== lu.allowedComponetsForBulkProcessing[e] && !0 !== lu.allowedComponetsForBulkProcessing[e]?.[t]) continue
					}
					t.push(n)
				}
				return e?.resetIndex(), t
			}
			return null
		}
		setInheritedProp(e, t) {
			this._inheritedConfig[e] = t
		}
		getLocaleRuleName() {
			return this._localeRuleName
		}
		getLocalizedValue(e, t, n) {
			const r = n || this.getLocaleRuleName();
			return de.getLocaleValue(e, t, r)
		}
		getLocalizedParagraphValue(e) {
			const t = this.getLocaleRuleNameFromKeys(this.getCurrentClassID(), W.PARAGRAPH, e);
			return de.getParagraphLocaleValue(t, this.getCurrentClassID(), e)
		}
		getLocaleRuleNameFromKeys(e, t, n) {
			return `${e}!${t}!${n}`
		}
		getValue(e, t) {
			return this.useCustomContext ? (e = e.startsWith?.(".") ? e.substring(1) : e, e.split?.(".").reduce(((e, t) => e?.[t] ?? void 0), this.useCustomContext)) : this._hasSuggestions && this.getStateProps()?.value === e ? $p.getProperyValue(e, this.getPageReference(), `${this._contextName}/${W.SUGGESTION}`) : $p.getProperyValue(e, t || this.getPageReference(), this._contextName)
		}
		setInheritedConfig(e) {
			if (!e) return;
			const {
				readOnly: t,
				displayMode: n,
				referenceType: r,
				hideLabel: a
			} = e;
			a && (this._inheritedConfig.hideLabel = a), r && (this._inheritedConfig.referenceType = r), n && (this._inheritedConfig.displayMode = n), (this._inheritedConfig.readOnly || t) && (this._inheritedConfig.readOnly = t), e.inheritedProps && (e.inheritedProps?.forEach((e => {
				"required" === e.prop && (this._inheritedConfig[e.prop] = e.value)
			})), gu(this._inheritedConfig, e))
		}
		getInheritedProps() {
			const e = {},
				t = {};
			return this._inheritedConfig.inheritedProps?.forEach((e => {
				t[e.prop] = e.value
			})), $p.resolveProps(t, e, this), e
		}
		setValue(e, t, n, r = !1, a = {}) {
			let s, o;
			const {
				isArrayDeepMerge: i
			} = a;
			this.isInsideList() && this.getListActions().updateProperty(e, t), this.isBulkAction() && (s = !0, t || (o = !0)), op({
				type: "SET_PROPERTY",
				payload: {
					reference: `${this.getPageReference()}${e}`,
					value: t,
					initialValue: n,
					isImplicit: r,
					context: this.getContextName(),
					...void 0 !== i && {
						isArrayDeepMerge: i
					},
					...s && {
						isStrictTracking: s
					},
					...o && {
						removePropertyFromChangedList: o
					}
				}
			})
		}
		updateDirtyCheckChangeList(e, t) {
			(({
				value: e,
				context: t,
				reference: n
			}) => {
				if (aa.isPageInstruction(n)) return;
				const r = n?.startsWith(".") ? n?.substr(1) : n;
				ca[t] = ca[t] || {}, ca[t][r] || (ca[t][r] = {
					initialValue: lp(r, null, t)
				}), ca[t][r].value = e
			})({
				reference: `${this.getPageReference()}${e}`,
				value: t,
				context: this.getContextName()
			})
		}
		getContextDataValue(e, t) {
			return up(t || this.getPageReference(), e, this._contextName)
		}
		updateState(e) {
			const t = this._pageReference.indexOf(W.CASE_INFO.CASE_INFO_CONTENT),
				n = this._pageReference.indexOf(".");
			let r = W.CASE_INFO.CASE_INFO_CONTENT;
			0 !== t && (r = n > 0 ? this._pageReference.substring(n) : this._pageReference), op(Np({
				context: this._contextName,
				data: e,
				rootPageReference: r
			}))
		}
		replaceState(e, t, n = {}) {
			const {
				skipDirtyValidation: r = !1
			} = n;
			op({
				type: "REPLACE_PROPERTY",
				payload: {
					reference: `${this.getPageReference()}${e}`,
					value: t,
					context: this.getContextName(),
					skipDirtyValidation: r
				}
			})
		}
		reportError(e, t, n) {
			op(th(e, t || {}, n))
		}
		getComponent() {
			return pu({
				getPConnect: () => this
			})
		}
		createComponent(e, t, n, r) {
			let a = this._pageReference;
			if (t) {
				const e = pp(`${this.getPageReference()}.${W.SUMMARY_OF_LISTS}`, t, this._contextName);
				a = $p.getContextPath(e || t, n) || t
			} else if (r && r.pageReference) {
				let e = r.pageReference;
				e = fe.handleAnnotation(e, this), a = $p.getContextPath(this._pageReference, e) || ""
			}
			return pu(yu({
				meta: e,
				options: {
					containerName: this.getContainerName(),
					hasForm: this.options.hasForm,
					...e.options,
					pageReference: a,
					context: this._contextName,
					target: this._containerTarget,
					readOnly: this._readOnly || this._inheritedConfig?.readOnly,
					viewName: this.viewName
				}
			}), r)
		}
		getReferencedView() {
			if (this.meta) return $p.resolveReference(this.resolveConfigProps(this.meta), this)
		}
		_resolvePageRef(e) {
			return this.getPageReference().includes(e) ? this.getPageReference() : `${this.getPageReference()}${e}`
		}
		getReferencedViewPConnect(e = !1) {
			const t = {
				...this.getComponentConfig()
			};
			return delete t?.name, delete t?.type, yu({
				meta: this.getReferencedView(),
				options: {
					...e ? this.options : void 0,
					...t,
					context: this.getContextName(),
					pageReference: t.context ? this._resolvePageRef(t.context) : this.getPageReference(),
					viewName: this.viewName
				}
			})
		}
		getContainerManager() {
			return new Dl(this)
		}
		getActionsApi() {
			return this._actionsApi || (this._actionsApi = new eu(this)), this._actionsApi
		}
		getActionManager() {
			return vn
		}
		getGoogleMapsAPIKey() {
			return C()
		}
		getServerURL() {
			return A()
		}
		getLoadingStatus(e) {
			let t = null;
			return e ? (t = ip(e), t = t ? t.context_data : null) : t = this.getDataObject().context_data, !!t && (!!t.isLoading && t.isLoading)
		}
		clearErrorMessages(e) {
			e?.property ? Qn({
				type: "error",
				property: e.property,
				pageReference: this.getPageReference(),
				context: this.getContextName()
			}) : e?.context ? Qn({
				type: "error",
				...e
			}) : (Qn({
				type: "error",
				...e,
				context: W.APP.APP
			}), Qn({
				type: "error",
				...e,
				context: Ms(`${W.APP.APP}/${this.getContainerName()}`)
			}))
		}
		resolveDatasourceReference(e) {
			return pp(`${this.getPageReference()}.${W.SUMMARY_OF_LISTS}`, e, this.getContextName()) || e
		}
		removeFormField() {
			this._rawConfig && this.options.hasForm && this._rawConfig.config && (Object.hasOwn(this._rawConfig.config, "value") || Object.hasOwn(this._rawConfig.config, "readonlyContextList") || this._rawConfig.config.selectionList || "Editable" === this._rawConfig.config.renderMode && this._rawConfig.config.referenceList) && ((e, t, n) => {
				if (kr[e]) {
					const r = Hr(t, n);
					kr[e].fieldOrder[r] && (kr[e].fieldOrder[r].isMounted = !1)
				}
			})(this.getContextName(), fe.trimAnnotation(this.getPropertyName()), this.getPageReference())
		}
		addFormField() {
			this._rawConfig && this.options.hasForm && this._rawConfig.config && (Object.hasOwn(this._rawConfig.config, "value") || this._rawConfig.config.selectionList || "Editable" === this._rawConfig.config.renderMode && this._rawConfig.config.referenceList) && this._type !== W.SCALARLIST && ((e, t, n) => {
				if (kr[e]) {
					const r = Hr(t, n);
					kr[e].fieldOrder[r] && (kr[e].fieldOrder[r].isMounted = !0)
				}
			})(this.getContextName(), fe.trimAnnotation(this.getPropertyName()), this.getPageReference())
		}
		setPageValue(e, t, n) {
			delete e?.classID, this.setValue(t, e, void 0, void 0, {
				isArrayDeepMerge: !1
			}), ((e, t, n) => {
				const r = Br(t);
				Vr[e] ? Vr[e].fieldOrder[r] = n : Vr[e] = {
					fieldOrder: {
						[r]: n
					}
				}
			})(this.getContextName(), `${this.getPageReference()}${t}`, this), n && ((e, t, n) => {
				const r = (e, t) => {
					Object.entries(e).forEach((([e, a]) => {
						if (Array.isArray(a)) {
							const r = PCore.createPConnect({
								options: {
									pageReference: n.getPageReference(),
									context: n.getContextName(),
									referenceList: `${t}.${e}`
								}
							}).getPConnect();
							Dr(r, `${t}.${e}`, {
								skipStateUpdate: !0
							});
							for (let e = 0; e < a.length; e++) br(a[e], e, r, void 0, {})
						} else "object" == typeof a && r(a, `${t}.${e}`)
					}))
				};
				r(e, t)
			})(e, t, this)
		}
		acceptSuggestion(e) {
			if (this.getStateProps()?.value && this.options.hasForm && this._hasSuggestions) {
				const t = ou.getSuggestionsContext(this.getContextName()),
					n = this.getStateProps()?.value || e,
					r = $p.getContextPath(this.getPageReference(), n),
					a = t.getField(r);
				this._hasSuggestions = !1, this.getActionsApi().updateFieldValue(n, a), this.getActionsApi().triggerFieldChange(n, a), t.removeField(r)
			}
		}
		ignoreSuggestion(e) {
			if (this.getStateProps()?.value && this.options.hasForm && this._hasSuggestions) {
				const t = this.getStateProps()?.value || e,
					n = $p.getContextPath(this.getPageReference(), t);
				this._hasSuggestions = !1, ou.getSuggestionsContext(this.getContextName()).removeField(n)
			}
		}
	}

	function yu(e) {
		const t = new fu(e);
		return {
			getPConnect: () => t
		}
	}

	function mu(e) {
		pu = e
	}
	ge.registerHandler("@L", ((e, t) => t.getLocalizedValue(e))), ge.registerHandler("@P", ((e, t) => t.getValue(e))), ge.registerHandler("@E", ((e, t) => {
		try {
			const n = dn(e),
				r = ln(n);
			return un(r, t)
		} catch (e) {}
		return !0
	})), ge.registerHandler("@W", ((e, t) => {
		const n = t.getContextDataValue(`.${W.SUMMARY_OF_WHEN_CONDITIONS}.${e}`);
		return !0 === n || "true" === n
	})), ge.registerHandler("@ASSOCIATED", ((e, t) => {
		let n = {};
		const r = [];
		let a = "",
			s = "";
		const o = t.getPageReference();
		if (e.startsWith(".")) {
			a = `${o}.${e.substring(1)}`;
			const r = e ? e.split(".").filter((e => !!e)) : [];
			r.length > 1 && (r.pop(), s = r.join(".")), n = t.getFieldMetadata(e.substring(1))
		} else n = t.getFieldMetadata(e), a = e;
		const i = n?.datasource?.tableType,
			c = n?.datasource?.mode === W.READONLY,
			d = n?.datasource?.name || "",
			l = t.getComponentConfig();
		if (l && l.deferDatasource) return l.datasourceMetadata = `@FIELD_META ${e}`, t.setStateProps({
			datasourceMetadata: l.datasourceMetadata
		}), i !== W.DATA_PAGE ? n?.datasource?.records : null;
		if (i !== W.DATA_PAGE) return n?.datasource?.records;
		const u = fe.getPropertyName(n?.datasource?.propertyForDisplayText),
			p = fe.getPropertyName(n?.datasource?.propertyForValue),
			h = Array.isArray(n?.datasource?.parameters) ? n?.datasource?.parameters : [],
			g = t.getContextName(),
			f = [];
		if (h.forEach((e => {
				if (fe.isProperty(e?.value)) {
					let t = lp(`.${_p.getFullPropertyReference([s,fe.getPropertyName(e.value)])}`, o, g);
					f.push(_p.getFullPropertyReference([o, s, fe.getPropertyName(e?.value)])), null != t && "" !== t || (t = W.NULL_STRING), r.push(t)
				} else r.push(e?.value || W.NULL_STRING)
			})), g) {
			const e = En.getContextObjectByName(g) || {};
			f.forEach((t => {
				if (t in e) {
					const n = e[t];
					e[t] = [...new Set([...n, a])]
				} else e[t] = [a]
			})), En.addContextName(g, e)
		}
		const y = function(e, t, n, r) {
			let a = "",
				s = n;
			if (t.join(W.HASH_DELIMITER) && (a = _p.getHashedString(t.join(W.HASH_DELIMITER)), s = n + W.UNDERSCORE_STRING + a), r) {
				const e = cp(),
					t = e ? e[n]?.[s] : {};
				return Array.isArray(t?.pxResults) ? t.pxResults : []
			}
			const o = e.getDataObject(),
				i = (o?.[n] || {})[s] || {};
			return Array.isArray(i?.pxResults) ? i.pxResults : []
		}(t, r, d, c);
		return y.map((e => ({
			key: e[p] || e[`.${p}`],
			value: e[u] || e[`.${u}`]
		})))
	})), ge.registerHandler("@ROUTING_INFO", ((e, t) => kt(t.getContainerName(), t.getContextName()))), ge.registerHandler("@ENV", ((e, t) => {
		switch (e) {
			case W.ENV_INFO_KEYS.APPLICATION_NAME:
				return ae.getApplicationName();
			case W.ENV_INFO_KEYS.ACCESS_GROUP:
				return ae.getAccessGroup();
			case W.ENV_INFO_KEYS.USER_NAME:
				return ae.getOperatorName();
			case W.ENV_INFO_KEYS.USER_ID:
				return ae.getOperatorIdentifier();
			case W.ENV_INFO_KEYS.APPLICATION_DESC:
				return t.getLocalizedValue(ae.getApplicationLabel() || "");
			case W.ENV_INFO_KEYS.USER_IMAGE:
				return ae.getOperatorImageInsKey();
			case W.ENV_INFO_KEYS.LOCALE:
				return ae.getUseLocale();
			case W.ENV_INFO_KEYS.TIMEZONE:
				return ae.getTimeZone();
			case W.ENV_INFO_KEYS.WORK_GROUP:
				return ae.getOperatorWorkGroup();
			default:
				return e
		}
	})), ge.registerHandler("@DATASOURCE", ((e, t) => {
		const n = t.getValue(e) || [],
			r = t.getComponentConfig(),
			a = Object.keys(r).find((t => r[t]?.source?.includes(e)));
		if (a) {
			const {
				fields: e,
				copyAll: t
			} = r[a], s = [];
			return n.forEach((n => {
				const r = {};
				t ? Object.keys(n).forEach((e => {
					const t = fe.getPropertyName(e);
					r[t] = n[t]
				})) : Object.keys(e).forEach((t => {
					const a = fe.getPropertyName(e[t]);
					r[t] = n[a]
				})), s.push(r)
			})), s
		}
		return []
	})), ge.registerHandler("@FIELD_META", ((e, t) => {
		let n, r = {};
		if (r = e.startsWith(".") ? t.getFieldMetadata(e.substring(1)) : t.getFieldMetadata(e), r && r.datasource && r.datasource.parameters) {
			let a = "";
			const s = e.split(".").filter((e => !!e));
			if (s.length > 1 && (s.pop(), a = `.${s.join(".")}`), Array.isArray(r.datasource.parameters)) {
				const e = [];
				r.datasource.parameters.forEach((n => {
					const r = {},
						{
							name: s,
							value: o
						} = n;
					r.name = s, "string" == typeof o && o.startsWith("@P") ? r.value = `@P ${a}${o.substring(3)}` : r.value = o, e.push(t.resolveConfigProps(r))
				})), n = e
			} else n = t.resolveConfigProps(r.datasource.parameters);
			r = {
				...r,
				datasource: {
					...r.datasource,
					parameters: n
				}
			}
		}
		return r
	})), ge.registerHandler("@USER", ((e, t) => {
		const n = t.getValue(e),
			r = t.getReferencedUser(n);
		return {
			userId: n,
			userName: r ? r.UserName : null
		}
	})), ge.registerHandler("@ACTIVE_CASES", ((e, t) => ru.getOpenedCaseItems(`${t.getContextName()}/${t.getContainerName()}`))), ge.registerHandler("@LR", (e => e)), ge.registerHandler("@CASE", ((e, t) => e === W.ID ? t.getCaseInfo().getKey() : e)), ge.registerHandler("@SHARED", (e => ou.getSharedState(e))), ge.registerHandler("@PARAGRAPH", ((e, t) => {
		const n = t.getLocalizedParagraphValue(e);
		return n ? pe.getParagraphStream(n, t) : null
	})), ge.registerHandler("@FILTERED_LIST", ((e, t) => {
		const n = e.substring(1, e.indexOf("[")),
			r = e.substring(e.indexOf("]") + 2),
			a = e.substring(e.indexOf("[") + 1, e.indexOf("]")),
			{
				useCustomContext: s
			} = t;
		let o;
		return _p.isEmpty(s) ? o = t.getValue(`.${n}`) : (o = s, o = _p.getIn(o, n)), o && r.length > 0 ? (a && (o = o.filter((e => pn(a, e)))), o.map((e => _p.getIn(e, r)))) : null
	})), ge.registerHandler("@ADDRESS", ((e, t) => {
		const n = t.getValue(e)?.pyCountry;
		return n ? `pyAddressForm_${n}` : "pyAddressForm"
	})), ge.registerHandler("@DATATYPE", ((e, t) => t.getValue(e)));
	const Iu = "downloadAttachment",
		Eu = {},
		Au = e => {
			const t = El();
			return Eu[e] = t, t
		},
		_u = e => {
			let t = "document-doc";
			if (!e) return t;
			if (e.startsWith("audio")) t = "audio";
			else if (e.startsWith("video")) t = "video";
			else if (e.startsWith("image")) t = "picture";
			else if (e.includes("pdf")) t = "document-pdf";
			else {
				const [, n] = e.split("/"), r = e => e.some((e => n.includes(e)));
				r(["excel", "spreadsheet"]) ? t = "document-xls" : r(["zip", "compressed", "gzip", "rar", "tar"]) && (t = "document-compress")
			}
			return t
		},
		Su = e => {
			let t, n;
			return t = e.pyCategoryLabel ? `${e.pyCategoryLabel},` : e.pyCategoryName ? `${e.pyCategoryName},` : e.Category, n = e.pxCreateOpName ? e.pxCreateOpName : e.pxCreateOperator ? e.pxCreateOperator : e.CreateUser?.Name || "", {
				props: {
					meta: `${t} ${n}`,
					name: e.pyAttachName ? e.pyAttachName : e.FileName,
					icon: _u(e.pyMimeFileExtension || e.MimeType)
				},
				responseProps: {
					fileName: e.pyAttachName ? e.pyAttachName : e.FileName,
					name: e.pyFileName ? e.pyFileName : e.FileName?.split(".")[0],
					category: e.pyCategoryName ? e.pyCategoryName : e.Category,
					extension: e.pyAttachName ? e.pyAttachName?.split(".").pop() : e.FileExtension,
					ID: e.pzInsKey ? e.pzInsKey : e.ID,
					mimeType: e.pyMimeFileExtension ? e.pyMimeFileExtension : e.MimeType,
					attachmentURL: e.pyAttachmentLink ? e.pyAttachmentLink : e.AttachmentURL,
					createUser: n,
					createDateTime: e.pxCreatedDateTime ? e.pxCreatedDateTime : e.CreateDateTime,
					responseType: e.responseType ?? (e.ID ? "binary" : null)
				}
			}
		},
		Cu = {
			uploadAttachment: (e, t, n, r) => {
				const a = new FormData;
				a.append("appendUniqueIdToFileName", !0), a.append("file", e);
				const {
					restApi: s,
					reqType: o
				} = Eh("uploadAttachment", {});
				return yl(s, {
					method: o,
					headers: {
						"Content-Type": "multipart/form-data"
					},
					body: a,
					onUploadProgress: t,
					signal: Au(e.ID).token
				}, r).then((t => ({
					type: "File",
					category: e.category || "File",
					ID: t.data.ID,
					clientFileID: e.ID
				}))).catch(n ? n(Al, e) : e => {
					throw e.isHandled = !1, e
				}).finally((() => delete Eu[e.ID]))
			},
			linkAttachmentsToCase: (e, t, n, r) => {
				const a = {};
				if ("File" === n) {
					const [e] = t, {
						clientFileID: n
					} = e;
					delete e.clientFileID, a.signal = Au(n).token
				}
				const {
					restApi: s,
					reqType: o
				} = Eh("linkCaseAttachment", {
					caseID: e
				});
				return yl(s, {
					...a,
					body: {
						attachments: t
					},
					method: o
				}, r)
			},
			getCaseAttachments: (e, t, n = !1) => {
				const {
					restApi: r,
					reqType: a
				} = Eh("getCaseAttachments", {
					caseID: e,
					includeThumbnail: n
				});
				return yl(r, {
					method: a
				}, t).then((e => e.data.attachments))
			},
			getAttachmentCategories: (e, t, n) => {
				const {
					restApi: r,
					reqType: a
				} = Eh("getAttachmentCategories", {
					caseID: e,
					type: t
				});
				return yl(r, {
					method: a
				}, n).then((e => e.data))
			},
			downloadAttachment: (e, t, n) => {
				const {
					restApi: r,
					reqType: a
				} = Eh(Iu, {
					attachmentID: e
				});
				return yl(r, {
					method: a,
					..."binary" === n && {
						responseType: "arraybuffer"
					}
				}, t)
			},
			editAttachment: (e, t, n) => {
				const {
					restApi: r,
					reqType: a
				} = Eh("editAttachment", {
					attachmentID: e
				});
				return yl(r, {
					method: a,
					body: {
						...t
					}
				}, n)
			},
			deleteAttachment: (e, t) => {
				const {
					restApi: n,
					reqType: r
				} = Eh("deleteAttachment", {
					attachmentID: e
				});
				return yl(n, {
					method: r
				}, t)
			},
			downloadDocument: (e, t) => {
				const {
					restApi: n,
					reqType: r
				} = Eh("downloadDocument", {
					documentID: e
				});
				return yl(n, {
					method: r
				}, t)
			},
			deleteDocument: (e, t, n) => {
				const {
					restApi: r,
					reqType: a
				} = Eh("deleteDocument", {
					caseID: e,
					documentID: t
				});
				return yl(r, {
					method: a
				}, n)
			},
			getDocumentURL: e => {
				const t = PCore.getEnvironmentInfo().getDocumentUrlDP() || "D_pxGetDocumentURL";
				return PCore.getDataPageUtils().getPageDataAsync(t, e.getContextName(), {}, {
					invalidateCache: !0
				}).catch((t => {
					e.reportError(": Error ocurred during ajax call getDocumentURL API : ", t.response)
				}))
			},
			cancelRequest: e => {
				Eu[e] && (Eu[e].cancel(), delete Eu[e])
			},
			buildFilePropsFromResponse: Su,
			getAttachmentURL: e => {
				const {
					restApi: t
				} = Eh(Iu, {
					attachmentID: e
				});
				return t
			},
			prepareAttachmentData: e => {
				let t = [];
				if (e && Object.hasOwn(e, "pyCount") && e.pyCount > 0) t = e?.pxResults?.filter((e => !!e.pzInsKey)).map((e => Su(e))) || [];
				else if (e && "object" == typeof e) {
					let n;
					n = Array.isArray(e) ? e : [e], t = n?.filter((e => !!e.ID)).map((e => Su(e)))
				} else t = [];
				return {
					hasUploadedFiles: t.length > 0,
					categoryName: e?.pyCategoryName || "",
					attachments: t
				}
			}
		};
	ge.registerHandler("@ATTACHMENT", ((e, t) => {
		const n = t.getValue(e);
		return Cu.prepareAttachmentData(n)
	}));
	const $u = {},
		bu = {},
		Pu = {},
		Ou = {},
		Tu = {},
		vu = {},
		Nu = {},
		Ru = {},
		Du = {},
		xu = (e = {}, t = {}) => {
			0 !== Object.keys(t).length ? Object.keys(e).forEach((n => {
				const r = e[n],
					a = t[n];
				if (a) {
					const e = Array.isArray(a) ? a : [a];
					(Array.isArray(r) ? r : [r]).forEach((t => {
						const n = e.findIndex((e => e.classID === t.classID));
						if (-1 === n) e.push(t);
						else {
							const r = {
									isDeclarativeTarget: !1
								},
								a = {
									...e[n],
									...r,
									...t
								};
							e[n] = a
						}
					})), t[n] = 1 === e.length ? e[0] : e
				} else t[n] = r
			})) : _p.copy(e, t)
		},
		wu = (e, t = "") => {
			if (!e) return null;
			const n = Ou[e];
			if (!n) return null;
			if (!t) return Array.isArray(n) ? [...n] : n;
			let r;
			return r = Array.isArray(n) ? n.find((e => e.classID.toLowerCase() === t.toLowerCase())) : n.classID.toLowerCase() === t.toLowerCase() || ("Page" === n.type || "Page List" === n.type) && n?.pageClass.toLowerCase() === t.toLowerCase() ? n : null, r
		},
		Mu = (e, t, n, r = []) => {
			if (!t || !e) return null;
			if (!e.includes(".")) {
				let a;
				const s = wu(e, t);
				return r.length && (a = r.join(".")), {
					...s,
					embeddedType: n,
					category: a
				}
			}
			const [a, ...s] = e.split("."), o = wu(a, t);
			return o && r.push(o.label), Mu(s.join("."), o?.pageClass, o?.type, r)
		},
		Lu = e => {
			xu(e, bu)
		},
		ju = e => {
			xu(e, Pu)
		},
		Uu = e => {
			if (e.views && xu(e.views, bu), e.navigations && xu(e.navigations, Pu), e.personalizations && xu(e.personalizations, vu), e.insights && xu(e.insights, Nu), e.paragraphs && xu(e.paragraphs, $u), e.dataTypes && xu(e.dataTypes, Ru), e.datapages && xu(e.datapages, Du), e.fields) {
				Object.keys(e.fields).forEach((t => {
					const n = e.fields[t];
					if (Array.isArray(n)) {
						if (e.datapages && n.forEach((t => {
								t.datasource && "DataPage" === t.datasource.tableType && (t.datasource.mode = e.datapages[t.datasource.name].mode)
							})), 1 === n.length) {
							const [r] = n;
							e.fields[t] = r
						}
					} else e.datapages && n.datasource && "DataPage" === n.datasource.tableType && (n.datasource.mode = e.datapages[n.datasource.name].mode)
				}));
				const {
					datapages: t = {}
				} = e;
				Object.keys(t).forEach((e => {
					Tu[e] = t[e]
				}))
			}
			xu(e.fields, Ou)
		},
		Fu = e => bu[e],
		ku = e => Pu[e],
		Vu = e => e in Tu ? Tu[e] : null,
		Gu = e => e in vu ? vu[e] : null,
		Bu = e => e in Nu ? Nu[e] : null,
		Hu = e => {
			const t = {};
			return Object.keys(Ou).forEach((n => {
				const r = Ou[n];
				let a;
				Array.isArray(r) ? a = r.find((t => e === t.classID)) : e === r.classID && (a = r), a && (t[n] = _p.deepClone(a))
			})), t
		},
		Wu = (e, t) => {
			const n = wu(e, t)?.datasource?.parameters;
			return n ? _p.deepClone(n) : null
		},
		qu = (e, t) => {
			let n = null;
			const r = $u[e];
			return r && (Array.isArray(r) ? n = r.find((e => e.classID === t)) : r.classID === t && (n = r)), n ? _p.deepClone(n).content : null
		},
		zu = e => {
			if (e in Ru) {
				const {
					savableDataPage: t
				} = Ru[e];
				return t
			}
			return null
		},
		Yu = e => {
			const t = [];
			let n = [];
			if (e in Du) {
				const r = Du[e].classID,
					{
						isAlternateKeyStorage: a
					} = Du[e];
				return a ? Du[e].parameters.forEach((e => t.push({
					keyName: e.name,
					isAlternateKeyStorage: a,
					linkedField: e.linkedField
				}))) : (n = Ru[r].classKeys, n.forEach((e => t.push({
					keyName: e,
					isAlternateKeyStorage: a
				})))), t
			}
			return null
		},
		Ku = e => {
			if (e in Ru) {
				const {
					lookupDataPage: t
				} = Ru[e];
				return t
			}
			return null
		},
		Xu = e => {
			if (Object.prototype.hasOwnProperty.call(Ru, e)) {
				const {
					lookupDataPageInfo: t
				} = Ru[e];
				return t
			}
			return null
		},
		Ju = (e, t) => {
			const n = e.split("."),
				r = n.pop(),
				a = new fu({
					options: {
						pageReference: `${n.join(".")}`,
						context: t
					}
				}),
				s = wu(r, a.getCurrentClassID())?.additionalInformation;
			if (!s?.includes("@PARAGRAPH")) return s;
			const o = fe.trimAnnotation(s),
				i = a.getCurrentClassID(),
				c = a.getLocaleRuleNameFromKeys(i, W.PARAGRAPH, o),
				d = de.getParagraphLocaleValue(c, i, o);
			return d ? pe.getParagraphStream(d, a) : null
		},
		Qu = (e, t) => {
			const n = e.split("."),
				r = n.pop(),
				a = new fu({
					options: {
						pageReference: `${n.join(".")}`,
						context: t
					}
				}),
				s = wu(r, a.getCurrentClassID()),
				o = {};
			return a._classID = a.getCurrentClassID(), a.resolveConfigProps(s, o), o
		};
	const Zu = new class {
		constructor() {
			this.components = {}
		}
		_checkComponent(e, t) {
			return !!this.components[t]?.[e]
		}
		start(e, t, n, r, a) {
			const s = {
				viewName: e,
				pageReference: n,
				contextName: r,
				isInProgress: !0,
				active: !0,
				caseKey: t
			};
			this.components[r] = this.components[r] || {}, this.components[r][a] = s
		}
		stop(e, t) {
			this._checkComponent(e, t) && (this.components[t][e].isInProgress = !1)
		}
		remove(e, t) {
			this._checkComponent(e, t) && delete this.components[t][e]
		}
		removeContext(e) {
			delete this.components[e]
		}
		enableCascade(e) {
			this.components[e] && Object.values(this.components[e]).forEach((e => {
				e.isInProgress && (e.cascade = !0)
			}))
		}
		activate(e, t) {
			this._checkComponent(e, t) && (this.components[t][e].active = !0)
		}
		deactivate(e, t) {
			this._checkComponent(e, t) && (this.components[t][e].active = !1)
		}
		refreshActiveComponents(e) {
			e && this.components[e] && Object.keys(this.components[e]).forEach((t => {
				this.refreshComponent(t, e)
			}))
		}
		refreshComponent(e, t) {
			if (!this._checkComponent(e, t)) return;
			const n = this.components[t][e];
			if (n.active && n.cascade) {
				const {
					caseKey: e,
					viewName: r,
					pageReference: a
				} = n;
				wn(e, r, t, a, {})
			}
		}
	};
	class ep {
		constructor() {
			this.name = "CascadeManager", this.cascadeSubscribers = {}, this.cascadeResetSubscribers = {}, this.listChangeSubscribers = []
		}
		registerResetDependencies(e, t, n, r, a, s = "singleRecord") {
			if (!e || !n || !r?.length > 0) return;
			const o = n.startsWith(".") ? `${t}.${n.substring(1)}` : n,
				i = this.cascadeResetSubscribers[e] || {},
				c = this._handlePageReference(t, n, a);
			r.forEach((e => {
				if (!e) return;
				let t = e.startsWith(".") ? e.substring(1) : e;
				if (t = _p.getFullPropertyReference([c, t]), t in i) {
					const e = i[t];
					e.find((e => e.propertyName === o)) || e.push({
						propertyName: o,
						mode: s
					})
				} else i[t] = [{
					propertyName: o,
					mode: s
				}]
			})), Object.keys(i).length > 0 && (this.cascadeResetSubscribers[e] = i)
		}
		deregisterResetDependencies(e, t, n, r, a) {
			if (!e || !n || !r?.length > 0) return;
			const s = n.startsWith(".") ? `${t}.${n.substring(1)}` : n,
				o = this.cascadeResetSubscribers[e] || {},
				i = this._handlePageReference(t, n, a);
			r.forEach((e => {
				if (e) {
					let t = e.startsWith(".") ? e.substring(1) : e;
					if (t = _p.getFullPropertyReference([i, t]), t in o) {
						const e = o[t];
						_p.removeExistingDependentProperty(e, s)
					}
				}
			})), Object.keys(o).length > 0 && (this.cascadeResetSubscribers[e] = o)
		}
		getResetDependencies(e, t) {
			return this.cascadeResetSubscribers[e]?.[t] || []
		}
		purgeResetDependencies(e) {
			e && this.cascadeResetSubscribers[e] && delete this.cascadeResetSubscribers[e]
		}
		registerFields(e, t, n = [], r, a) {
			this.cascadeSubscribers[e] = this.cascadeSubscribers[e] || {}, n.forEach((n => {
				this.cascadeSubscribers[e][`${t}${n}`] = this.cascadeSubscribers[e][`${t}${n}`] || {};
				const s = this.cascadeSubscribers[e][`${t}${n}`];
				if (!s[a]) {
					s[a] = r;
					const o = lp(n, t, e);
					s.previousValue = "object" == typeof o ? null : o
				}
			}))
		}
		registerListField(e, t, n, r, a) {
			const s = ep._getFieldsForList(e, t, n);
			s.length > 0 && (this.registerFields(e, t, s, r, a), Zu.enableCascade(e))
		}
		unRegisterListField(e, t, n, r) {
			const a = ep._getFieldsForList(e, t, n);
			a.length > 0 && this.unRegisterFields(e, t, a, r)
		}
		static _getFieldsForList(e, t, n) {
			const r = [],
				a = wu(n, lp("classID", t, e));
			return a && a.datasource && a.datasource.parameters && Object.values(a.datasource.parameters).forEach((e => {
				if (fe.isProperty(e)) {
					const t = fe.trimAnnotation(e);
					r.push(t)
				}
			})), r
		}
		unRegisterFields(e, t, n = [], r) {
			this.cascadeSubscribers[e] && n.forEach((n => {
				if (!this.cascadeSubscribers[e][`${t}${n}`]) return;
				const a = this.cascadeSubscribers[e][`${t}${n}`];
				a[r] && delete a[r]
			}))
		}
		triggerCascade(e, t, n, r) {
			let a = !1;
			this.cascadeSubscribers[e] && this.cascadeSubscribers[e][t] && (Object.keys(this.cascadeSubscribers[e][t]).forEach((s => {
				const o = this.cascadeSubscribers[e][t];
				"previousValue" !== s && o.previousValue !== n && (a = !0, r ? r.add(o[s]) : o[s](t, n))
			})), a && (this.cascadeSubscribers[e][t].previousValue = n))
		}
		purgeCascadeFields(e) {
			delete this.cascadeSubscribers[e]
		}
		handleServerChanges(e, t, n = W.CASE_INFO.CASE_INFO_CONTENT) {
			if (!e || !t) return;
			const r = new Set,
				a = _p.getIn(e, n);
			a && 0 !== Object.keys(a).length && (this._handleCascadeObject(a, t, n, r), r.forEach((e => {
				e()
			})))
		}
		_handleCascadeObject(e, t, n, r) {
			if ("object" != typeof e) return this.triggerCascade(t, n, e, r), void this._triggerListChanges(t, n, e);
			const a = Object.keys(e);
			for (let s = 0, o = a.length; s < o; s++) {
				const o = a[s],
					i = `${n}.${o}`;
				this._handleCascadeObject(e[o], t, i, r)
			}
		}
		_handlePageReference(e, t, n) {
			let r = e;
			if ("Page" === n && t.startsWith(".") && t.match(/[.]/g).length > 1) {
				r = `${e}${t.substring(0,t.lastIndexOf("."))}`
			}
			return r
		}
		registerForListChanges(e = (() => {})) {
			this.listChangeSubscribers.push(e)
		}
		_triggerListChanges(e, t, n) {
			if (0 === this.listChangeSubscribers.length || !/[a-zA-Z]+\.(\d+)\./g.test(t)) return;
			t = t.replace(/\.(\d+)/g, "[$1]");
			const r = Wn.getFieldReferencePreviousValue(e, t);
			void 0 !== r && r !== n && this.listChangeSubscribers.forEach((r => {
				r(e, t, n)
			}))
		}
		unRegisterForListChanges() {
			this.listChangeSubscribers = []
		}
	}
	const tp = new ep;
	let np = null;
	const rp = e => e.split(/\.(?![^[]+\])|\[|\]/g).filter(Boolean),
		ap = e => {
			np = e
		},
		sp = () => np,
		op = e => {
			e && (sp()?.dispatch(e), "MERGE_DATA" === e.type && tp.handleServerChanges(e.payload.data, e.payload.context, e.payload.rootPageReference))
		},
		ip = e => sp().getState().data?.[e],
		cp = () => sp().getState().data[W.SHARED],
		dp = (e, t, n) => {
			if (!(r = e) || r.startsWith('"') || r.startsWith("'")) return (e => e && e.trim().substring(1, e.length - 1))(e);
			var r;
			const a = e.startsWith(".") ? t + e : e,
				s = rp(a);
			return _p.getIn(n, s)
		},
		lp = (e, t, n) => dp(e, t, ip(n)),
		up = (e, t, n) => dp(t, e ? `${W.CONTEXT_DATA}.${e}` : `${W.CONTEXT_DATA}`, ip(n)),
		pp = (e, t, n) => ((e, t, n) => {
			const r = rp(`${t}.${n}`);
			return _p.getIn(e, r)
		})(ip(n), `${W.CONTEXT_DATA}.${e}`, t),
		hp = e => {
			const {
				context: t
			} = e;
			if (sp().getState().data[t]) return Fe;
			const {
				action: n
			} = e;
			return ["createWork", "showHarness", "openAssignment", "openWorkByHandle", "initRouting"].includes(n) ? Xe : Fe
		},
		gp = (e, t) => {
			const n = rp(t);
			return _p.deleteIn(e, n)
		},
		fp = e => !Array.isArray(e) && "object" == typeof e,
		yp = (e, t, n = {}) => {
			const {
				isArrayDeepMerge: r
			} = n;
			Array.isArray(e) && !t && (t = []);
			const a = (e, t) => {
				if (fp(e) && null !== t && "string" != typeof t && "number" != typeof t && "boolean" != typeof t) return w()(e, t, a);
				if (Array.isArray(e) && null !== t && Array.isArray(t)) {
					if (r) return w()(e, t, a);
					{
						const n = t.length;
						if (void 0 === r && n === e.length) return w()(e, t, a)
					}
				}
				return "" === t && e && "object" == typeof e ? e : t
			};
			return a(e, t)
		},
		mp = (e, t, n, r = {}) => {
			const {
				isArrayDeepMerge: a = !0
			} = r, s = rp(t);
			if ("object" == typeof n) {
				const t = yp(_p.getIn(e, s), n, {
					isArrayDeepMerge: a
				});
				return _p.setIn(e, s, t)
			}
			return _p.setIn(e, s, n)
		},
		Ip = (e, t, n) => {
			const r = rp(t);
			return _p.setIn(e, r, n)
		},
		Ep = () => {
			const e = bt,
				{
					promise: t,
					actionMgrID: n
				} = vn.actionManagerPromise(e);
			return op({
				type: e,
				payload: {
					actionMgrID: n
				}
			}), t
		};
	class Ap {
		static mergeDeep(e, t) {
			return w()(t, e)
		}
		static hasIn(e, t) {
			return T()(e, t)
		}
		static getIn(e, t, n) {
			return N()(e, t, n)
		}
		static setIn(e, t, n) {
			return D()(e, t, n)
		}
		static deleteIn(e, t) {
			return P()(e, t)
		}
		static isObjectEmpty(e) {
			return !e || 0 === Object.entries(e).length
		}
		static isEmpty(e) {
			return L()(e)
		}
		static deepClone(e = {}) {
			return JSON.parse(JSON.stringify(e))
		}
		static copy(e, t) {
			Object.keys(e).forEach((n => {
				t[n] = e[n]
			}))
		}
		static isPropertyRef(e) {
			if (!e || -1 === e.indexOf(".")) return !1;
			let t = 0;
			const n = e.length;
			for (; t < n; t += 1)
				if (" @#$%=!<>/\\".includes(e[t])) return !1;
			return !0
		}
		static isWhenExist(e) {
			const t = ["visibility", "disabled", "readOnly", "required"];
			let n = !1;
			for (const r in e) t.includes(r) && "string" == typeof e[r] && e[r]?.startsWith("@W ") && (n = !0);
			return n
		}
		static isExpressionExist(e) {
			const t = ["disabled", "visibility", "readOnly", "required"];
			let n = !1;
			for (const r in e) t.includes(r) && "string" == typeof e[r] && e[r]?.startsWith("@E ") && (n = !0);
			return n
		}
		static buildDataObject(e, t) {
			let n = {};
			const r = n;
			if (t.indexOf(".") > 0) {
				t.split(".").forEach((e => {
					if (-1 !== e.indexOf("[")) {
						const [t] = e.split("[");
						n[t] = [], n = n[t], e = e.substring(e.indexOf("[") + 1, e.lastIndexOf("]"))
					}
					n[e] = {}, n = n[e]
				}))
			} else n[t] = {}, n = n[t];
			return Object.keys(e).forEach((t => {
				let r = t;
				t.startsWith(".") && (r = t.substring(1)), n[r] = e[t]
			})), r
		}
		static buildObject = (e, t, n) => {
			if (void 0 === n) return;
			const r = e.split(".");
			let a = 0;
			for (; a < r.length - 1; a += 1) {
				const e = r[a];
				e?.toString().length && !t[e] && (t[e] = {}), t[e] && (t = t[e])
			}
			"object" == typeof n ? (t[r[a]] || (t[r[a]] = Array.isArray(n) ? [] : {}), yp(t[r[a]], n, {
				isArrayDeepMerge: !0
			})) : t[r[a]] = n
		};
		static getHashedString(e) {
			return (0, $.crc32)(e).toString(16)
		}
		static getPropertyName(e) {
			if (e) {
				const t = e.startsWith("@P"),
					n = t ? e.indexOf(" ") : -1;
				return t ? e.substring(n + 2) : e
			}
			return e
		}
		static getPropertyNameFromDependency(e) {
			return "string" == typeof e ? e : e.propertyName
		}
		static isValidJson(e) {
			try {
				return JSON.parse(e)
			} catch (e) {
				return console.error("not a Valid JSON", e), !1
			}
		}
		static isEqual(e, t) {
			return g()(e, t)
		}
		static isContains(e, t) {
			const n = Object.keys(e);
			for (let r = 0; r < n.length; r++)
				if (e[n[r]] && Ap.isEqual(e[n[r]], t)) return !0;
			return !1
		}
		static removeExistingDependentProperty(e, t) {
			const n = e.findIndex((e => e.propertyName === t));
			n >= 0 && e.splice(n, 1)
		}
		static getFullPropertyReference(e) {
			return Array.isArray(e) ? e.filter((e => !!e)).join(".") : null
		}
		static iterateLeafNodes(e, t) {
			const n = (e, r = []) => {
				Object.entries(e).forEach((([a, s]) => {
					r.push(Array.isArray(e) ? Number(a) : a), Array.isArray(s) ? s.forEach(((e, t) => {
						r.push(t), n(e, r), r.pop()
					})) : "object" == typeof s ? n(s, r) : t(r.slice(), s), r.pop()
				}))
			};
			n(e)
		}
		static resolveStringBooleans(e) {
			const t = ["required", "readOnly", "visibility"];
			return Object.keys(e).forEach((n => {
				t.includes(n) && "string" == typeof e[n] && (e[n] = "true" === e[n])
			})), e
		}
		static generateUniqueID() {
			return B()
		}
		static unflatten(e) {
			const t = {};
			return Object.entries(e).forEach((([e, n]) => {
				const r = e.split(".");
				let a;
				r.reduce(((e, t, s) => (a = e[t] ? e[t] : Number.isNaN(Number(r[s + 1])) ? r.length - 1 === s ? n : {} : [], e[t] = a, e[t])), t)
			})), t
		}
		static flatten(e, t = "", n) {
			Array.isArray(e) ? e.forEach(((e, r) => {
				Ap.flatten(e, `${t}[${r}]`, n)
			})) : "object" == typeof e && null !== e ? Object.keys(e).forEach((r => {
				const a = t ? `${t}.${r}` : r;
				Ap.flatten(e[r], a, n)
			})) : n[t] = e
		}
		static buildInstructionPageReference(e, t) {
			const n = `${e}${t}`.replace(W.CASE_INFO.CASE_INFO_CONTENT, "").replace(W.DATA_INFO.DATA_INFO_CONTENT, "");
			return Vn.formatPageReference(n)
		}
		static buildAttachmentsFormData(e = []) {
			return e.map((e => {
				if (e.delete) {
					let t = "";
					return t = e.responseProps.ID ? e.responseProps.ID : e.responseProps.pzInsKey, {
						type: "File",
						attachmentFieldName: e.label,
						delete: !0,
						pzInsKey: t
					}
				}
				return {
					type: "File",
					attachmentFieldName: e.label,
					category: e.category,
					ID: e.handle,
					clientFileID: e.ID
				}
			}))
		}
		static convertPageRefToClipboardPageNotation(e) {
			return e.replace(/\[\d+\]/g, (e => e.replace(/\d+/g, (e => parseInt(e, 10) + 1)).replace("[", "(").replace("]", ")")))
		}
		static convertClipboardPageToPageRefNotation(e) {
			return e.replace(/\(\d+\)/g, (e => e.replace(/\d+/g, (e => parseInt(e, 10) - 1)).replace("(", "[").replace(")", "]")))
		}
		static isString(e) {
			return "string" == typeof e
		}
		static rejectPendingActions(e) {
			return e.forEach((e => e.payload.actionMgrID && vn.rejectActionByID(e.payload.actionMgrID))), !0
		}
		static trimDotForProperty(e) {
			return "string" == typeof e && e.startsWith(".") ? e.substring(1) : e
		}
	}
	const _p = Ap,
		Sp = W.SUMMARY_OF_LISTS,
		Cp = W.SUMMARY_OF_WHEN_CONDITIONS;
	const $p = class {
		static updateData(e) {
			Object.keys(e).forEach((t => {
				op(Np({
					context: t,
					data: e[t]
				}))
			}))
		}
		static updateContextData(e) {
			Object.keys(e).forEach((t => {
				op(Np({
					context: t,
					data: e[t]
				}))
			}))
		}
		static resolveWhen(e, t) {
			return !!t.getContextDataValue(`.${Cp}.${e}`)
		}
		static resolveFieldValue(e, t) {
			return t.getLocalizedValue(e)
		}
		static resolveNavigation(e, t) {
			return ku([this.resolveName(e, t)])
		}
		static resolveView(e, t, n = "") {
			const r = Fu([this.resolveName(e, t)]);
			let a = [];
			return Array.isArray(r) && r.length > 0 ? (t && (n || (n = t.getValue(W.CLASS_ID)), a = r.filter((e => e[W.CLASSID] === n))), 0 === a.length ? r[0] : a[0]) : r
		}
		static resolveName(e, t) {
			return e?.startsWith("param.") ? (e = e.substring(6), t.getContextDataValue(`.$parameters.${e}`)) : (e?.startsWith("@") && (e = fe.handleAnnotation(e, t)), e)
		}
		static getContextPath(e, t) {
			return ("number" == typeof t || t) && ("number" == typeof(t = fe.trimAnnotation(t)) || "string" == typeof t) ? "number" == typeof t && parseInt(t, 10) === t ? `${e}[${t}]` : t.startsWith(".") ? e + t : t : e
		}
		static getRuleClass(e, t, n) {
			let r;
			return t ? r = t.startsWith(W.CLASS_ANNOTATION) ? t.split(W.CLASS_ANNOTATION)[1].trim() : this.resolveClassID(t, e.getPageReference(), e.getContextName()) : n.authorContext && (r = n.ruleClass), r
		}
		static resolveReference(e, t) {
			const {
				type: n
			} = e;
			let r;
			if ("reference" === n) {
				const {
					config: n
				} = e, a = n.type, {
					ref: s,
					name: o,
					context: i
				} = n, c = this.getRuleClass(t, i, n);
				return "navigation" === a ? r = this.resolveNavigation(s || o, t) : "view" === a ? r = this.resolveView(s || o, t, c || "") : "widget" === a && (r = {
					type: "Widget",
					config: {
						name: o,
						ruleClass: c
					}
				}), r
			}
			return e
		}
		static resolvePropertyReference(e, t, n) {
			return lp(t, e, n)
		}
		static getProperty(e, t, n) {
			let r = this.resolvePropertyReference(t, e, n);
			if (null == r || 0 === r.length) {
				const a = pp(`${t}.${Sp}`, e, n);
				a && (r = this.resolvePropertyReference(t, a, n))
			}
			return r
		}
		static getProperyValue(e, t, n) {
			return e = fe.trimAnnotation(e), this.getProperty(e, t, n)
		}
		static _handlePropString(e, t, n, r) {
			n.startsWith("@") ? e[t] = fe.handleAnnotation(n, r) : e[t] = n
		}
		static _resolveProps(e, t) {
			e && Object.keys(e).forEach((n => {
				const r = e[n];
				"string" == typeof r ? this._handlePropString(e, n, r, t) : Array.isArray(r) ? r.forEach((n => {
					this._resolveProps("object" == typeof n ? n : e[n], t)
				})) : "object" == typeof r && this._resolveProps(e[n], t)
			}))
		}
		static resolveProps(e, t, n) {
			return e && t ? (_p.mergeDeep(e, t), this._resolveProps(t, n), t) : t
		}
		static resolveClassID(e, t, n) {
			const r = fe.trimAnnotation(e);
			let a;
			for (a = r.startsWith(".") ? `${t}${r}` : `${r}`; a;) {
				const e = lp(W.CLASS_ID, a, n);
				if (e) return e;
				a = a.substring(0, a.lastIndexOf("."))
			}
			return null
		}
	};
	const bp = new class {
		constructor() {
			this.actionHandlers = {}
		}
		getHandler(e) {
			return this.actionHandlers[e]
		}
		registerHandler(e, t) {
			this.actionHandlers[e] = t
		}
	};
	const Pp = class {
			static #e = [];
			static #t = !1;
			static getActionHandlers = (e, t, n) => {
				const r = [];
				return {
					mouseenter: "hover",
					change: "onChange",
					blur: "onBlur"
				} [n] !== t || e.forEach((e => {
					const t = bp.getHandler(e.action),
						{
							config: n
						} = e;
					r.push({
						handler: t,
						config: n
					})
				})), r
			};
			static isEditable = e => {
				const {
					tagName: t
				} = e;
				return "INPUT" === t || "TEXTAREA" === t || "SELECT" === t || "DATETIME" === t
			};
			static isNonKeyInput = e => {
				const {
					tagName: t,
					type: n
				} = e;
				return "SELECT" === t || "checkbox" === n || "radio" === n
			};
			static #n = (e, t, n) => {
				for (let r = 0; r < e.length; r++) {
					const a = e[r],
						s = {
							actionHandler: a.handler,
							component: t,
							eventType: n,
							config: a.config
						};
					this.#e.push(s)
				}
			};
			static buildActionObject = (e, t) => {
				const n = {
					...e
				};
				return n.context = t.getContextName(), n.pageReference = t.getPageReference(), n.actionMgrID = vn.getNextActionMgrId(), n
			};
			static #r = e => {
				const t = e.actionHandler,
					n = e.component,
					{
						config: r
					} = e,
					a = {};
				$p.resolveProps(r, a, n), t && (t(e.eventType, a, n), this.#a())
			};
			static #a = () => {
				if (!this.#t) {
					if (0 === this.#e.length) return;
					const e = this.#e.shift();
					this.#r(e), e.config && "true" === e.config.parallel && this.#e.length > 0 && this.#a()
				}
			};
			static #s = () => {
				this.#a()
			};
			static #o = (e, t, n) => {
				this.#n(e, t, n), this.#s()
			};
			static getFullRef = e => {
				const t = e.getPageReference(),
					n = e.getComponentConfig().value;
				return $p.getContextPath(t, n)
			};
			static #i(e, t) {
				const n = e.getComponentConfig().behaviours || [];
				for (let r = 0; r < n.length; r += 1) {
					const {
						behaviour: a,
						actions: s
					} = n[r];
					if (s) {
						const n = this.getActionHandlers(s, a, t);
						n && n.length > 0 && this.#o(n, e, t)
					}
				}
			}
			static changeHandler = (e, t) => {
				const n = e.getStateProps().value,
					r = e.getContextName();
				if (Qn({
						type: H.MESSAGES.MESSAGES_TYPE_ERROR,
						property: n,
						pageReference: e.getPageReference(),
						context: r
					}), t instanceof Event || t.nativeEvent instanceof Event || null !== t.value && void 0 === t.prop) {
					let {
						target: n
					} = t;
					null === n && t && t.auxiliaryTarget && (n = t.auxiliaryTarget);
					const a = void 0 === n ? t.value : "value" in n ? n.value : n.innerText,
						s = this.getFullRef(e);
					op({
						type: Pe,
						payload: {
							reference: s,
							value: a,
							context: r
						}
					}), void 0 !== n && this.isEditable(n) && !this.isNonKeyInput(n) || op({
						type: Te,
						payload: {
							reference: s,
							pageReference: e.getPageReference(),
							value: a,
							context: r,
							propertyName: e.getComponentConfig().value,
							classID: e.getValue(W.CLASS_ID)
						}
					})
				} else {
					const n = e.getPageReference(),
						a = e.getStateProps();
					for (const e of Object.keys(t)) {
						const s = a[e],
							o = t[e];
						op({
							type: Pe,
							payload: {
								reference: $p.getContextPath(n, s),
								value: o,
								context: r
							}
						}), op({
							type: Te,
							payload: {
								reference: $p.getContextPath(n, s),
								value: o,
								context: r
							}
						})
					}
				}
			};
			static blurHandler = (e, t) => {
				let {
					target: n
				} = t;
				null === n && t && t.auxiliaryTarget && (n = t.auxiliaryTarget);
				const {
					value: r,
					validationValue: a
				} = n, s = this.getFullRef(e), o = e.getContextName();
				n.clearMessages && Qn({
					type: H.MESSAGES.MESSAGES_TYPE_ERROR,
					property: e.getStateProps().value,
					pageReference: e.getPageReference(),
					context: o
				}), this.isEditable(n) && (e.getValidationApi().validate("validationValue" in n ? a : r), e.isInsideList() && e.getListActions().updateProperty(e.getStateProps().value, r), !this.isNonKeyInput(n) && op({
					type: Te,
					payload: {
						reference: s,
						pageReference: e.getPageReference(),
						value: r,
						context: o,
						propertyName: e.getComponentConfig().value,
						classID: e.getValue(W.CLASS_ID)
					}
				}))
			};
			static eventHandler = (e, t) => {
				const {
					type: n
				} = t;
				switch (n) {
					case "change":
						this.changeHandler(e, t);
						break;
					case "blur":
						this.blurHandler(e, t)
				}
				n && this.#i(e, n)
			};
			static pause = () => {
				this.#t = !0
			};
			static resume = () => {
				this.#t = !1, this.#a()
			};
			static isQueueEmpty = () => 0 === this.#e.length;
			static clearQueue = () => {
				this.#e = []
			};
			static getActionsQueue = () => this.#e;
			static EVENTS_MAP = {
				click: "onClick",
				change: "onChange",
				hover: "onMouseEnter",
				blur: "onBlur"
			}
		},
		Op = "CREATE_WORK",
		Tp = e => ({
			type: Op,
			payload: e
		});
	const vp = (e, t) => {
			const n = [];
			for (const r in e)
				if ("object" == typeof e[r] && r.includes("[")) {
					const a = r.substring(0, r.indexOf("[")),
						s = r.substring(r.indexOf("[") + 1, r.indexOf("]"));
					t[a].splice(s, 1, e[r]), n.push(a)
				} else "object" == typeof e[r] ? (t[r] || (t[r] = Array.isArray(e[r]) ? [] : {}), vp(e[r], t[r])) : t[r] = e[r];
			for (const r in t)(Array.isArray(t[r]) && !n.includes(r) || !Array.isArray(t[r]) && !Object.hasOwnProperty.call(e, r)) && delete t[r]
		},
		Np = (e, t = {}) => {
			const {
				serverPrecedenceFields: n = []
			} = t, {
				context: r,
				data: a,
				isArrayDeepMerge: s,
				preserveClientChanges: o = !1
			} = e, i = ua(r, !0);
			((e, t = {}) => {
				const n = Fr.buildClientChangeList(e) || {};
				Object.keys(n).forEach((e => {
					_p.buildObject(e, t, n[e])
				}))
			})(r, i);
			const c = ip(r);
			let d = {};
			c && void 0 !== c && (d = JSON.parse(JSON.stringify(c)), vp(i, d)),
				function(e, t) {
					const n = _p.getIn(e, W.REFERENCED_USERS);
					let r;
					if (void 0 !== n) {
						if (!Array.isArray(n) && "object" == typeof n) return r = _p.getIn(t, W.REFERENCED_USERS, {}), void _p.setIn(e, W.REFERENCED_USERS, {
							...r,
							...n
						});
						r = _p.getIn(t, W.REFERENCED_USERS, []);
						const a = new Map;
						for (const e of [...r, ...n])
							if (a.has(e.UserID)) {
								const t = a.get(e.UserID);
								a.set(e.UserID, {
									...t,
									...e
								})
							} else a.set(e.UserID, e);
						n.length = 0;
						for (const e of a.values()) n.push(e)
					}
				}(a, c);
			const l = {
				caseInfo: {
					content: {
						...d?.caseInfo?.content
					}
				}
			};
			let u = a;
			return o ? (n.forEach((e => {
				_p.deleteIn(l, `caseInfo.content.${e}`)
			})), u = yp(a, l, {
				isArrayDeepMerge: !s
			})) : ((e, t) => {
				const n = ca[e] || {};
				Object.keys(n).forEach((e => {
					_p.hasIn(t, e) && (n[e].value = _p.getIn(t, e))
				}));
				let r = Fr.getStateMachinesByContext(e) || {};
				r = {
					...r,
					...Fr.getUnConnectedStateMachines(e) || {}
				}, Object.keys(r).forEach((n => {
					if (_p.hasIn(t, n)) {
						const r = _p.getIn(t, n);
						r && Array.isArray(r) && 0 === r.length && Fr.setStateMachineEmpty(e, n)
					}
				}))
			})(r, a), {
				type: Be,
				payload: {
					...e,
					data: u
				}
			}
		},
		Rp = e => ({
			type: "SHOW_HARNESS",
			payload: e
		}),
		Dp = e => ({
			type: ve,
			payload: e
		}),
		xp = e => ({
			type: Ne,
			payload: e
		}),
		wp = e => ({
			type: "ADD_WORK",
			payload: e
		}),
		Mp = e => ({
			type: Ue,
			payload: e
		}),
		Lp = e => ({
			type: Ye,
			payload: e
		}),
		jp = e => ({
			type: Ke,
			payload: e
		}),
		Up = e => ({
			type: Xe,
			payload: e
		}),
		Fp = e => ({
			type: Qe,
			payload: e
		}),
		kp = e => ({
			type: Ze,
			payload: e
		}),
		Vp = e => ({
			type: nt,
			payload: e
		}),
		Gp = e => ({
			type: rt,
			payload: e
		}),
		Bp = e => {
			const {
				containerItemID: t
			} = e;
			return e.suggestionContexts = Bs(t), {
				type: st,
				payload: e
			}
		},
		Hp = e => ({
			type: ot,
			payload: e
		}),
		Wp = e => ({
			type: at,
			payload: e
		}),
		qp = e => ({
			type: Ct,
			payload: e
		}),
		zp = e => {
			const {
				context: t,
				containerItemID: n
			} = e;
			let r = t;
			return r || (r = Us(n)), e.context = r, e.deleteContext = !ro(n), e.childContainers = Vs(n), e.childContainersContexts = Gs(n), e.transientItems = ao([...e.childContainersContexts, n]), e.suggestionContexts = Bs(n), n === t && (e.caseID = lp(W.CASE_INFO.CASE_INFO_ID, "", t), e.RemoteSystemID = lp(W.CASE_INFO.REMOTESYSTEMID, "", t)), {
				type: Je,
				payload: e
			}
		},
		Yp = e => {
			const {
				containerItemID: t
			} = e;
			return e.transientItems = ao([...Gs(t), t]), {
				type: tt,
				payload: e
			}
		},
		Kp = e => {
			const {
				transientItemID: t
			} = e;
			return e.transientItems = [t], {
				type: et,
				payload: e
			}
		},
		Xp = e => {
			const {
				context: t,
				containerItemID: n
			} = e;
			let r = t;
			return r || (r = Us(n)), e.context = r, e.childContainers = Vs(n), e.childContainersContexts = Gs(n), e.transientItems = ao([...e.childContainersContexts, n]), e.suggestionContexts = Bs(n), n === t && (e.caseID = lp(W.CASE_INFO.CASE_INFO_ID, "", t), e.RemoteSystemID = lp(W.CASE_INFO.REMOTESYSTEMID, "", t)), {
				type: it,
				payload: e
			}
		},
		Jp = e => ({
			type: ke,
			payload: e
		}),
		Qp = e => ({
			type: Ge,
			payload: e
		}),
		Zp = e => ({
			type: qe,
			payload: e
		}),
		eh = (e, ...t) => (Pp.resume(), e(...t)),
		th = (e, t, n, r, a) => ({
			type: ze,
			payload: {
				msg: e,
				err: t,
				context: n,
				formFields: r,
				actionMgrID: a
			}
		}),
		nh = e => ({
			type: Ot,
			payload: e
		}),
		rh = e => ({
			type: Tt,
			payload: e
		}),
		ah = e => ({
			type: vt,
			payload: e
		}),
		sh = e => ({
			type: "SHOW_CASE_PREVIEW",
			payload: e
		}),
		oh = e => ({
			type: Le,
			payload: e
		}),
		ih = e => ({
			type: Pe,
			payload: e
		}),
		ch = "add",
		dh = "replace",
		lh = ["portal", "noPortal", "preview", "debug", "devtool"];
	let uh = "",
		ph = "Home",
		hh = "",
		gh = !0;
	const fh = e => (gh = e, gh),
		yh = () => gh,
		mh = (e, t, n) => te.getSemanticURL(e, t, n),
		Ih = (e, t) => te.getRestEndPoint(e, t),
		Eh = (e, t) => {
			let n = A();
			const r = Ih(e, t);
			return r ? (r?.restApi?.startsWith("/") || (r.restApi = `/${r.restApi}`), n.endsWith("/") && (n = n.substring(0, n.length - 1)), r.restApi = n + r.restApi, r) : {}
		},
		Ah = (e, t, n = void 0) => {
			const {
				root: r,
				resources: a
			} = e, {
				views: s
			} = a, {
				config: o
			} = r, i = ch;
			let c = "";
			if (n) c = n;
			else {
				const e = s[o.name];
				let t = e;
				Array.isArray(e) && e.length > 0 && ([t] = e);
				c = t.config.urlPath
			}
			const d = c.match(Y);
			if (d) {
				const e = _p.getIn(t, o.context);
				c = c.replace(d[0], e.pyID)
			}
			return c.startsWith("/") && (c = c.substring(1, c.length)), {
				pxURLPath: c,
				historyAction: i
			}
		},
		_h = (e, t, n) => {
			let r, a;
			r = X(t) ? `${e}/${t}` : e;
			const s = X(n.pxURLPath);
			s && (r = `${r}/${s}`);
			try {
				a = new URL(r).searchParams, r = r.includes("?") ? r.split("?")[0] : r
			} catch (e) {
				return console.log("Invalid url", e), ""
			}
			const o = r.split("/"),
				i = o[o.length - 1],
				c = new URLSearchParams(window.location.search);
			if (i.toLowerCase() !== ph.toLowerCase() || c.has("noPortal") || (r = `${e}/${t}`), !te.isDefaultPortal()) {
				const e = te.getPortalName();
				c.has("portal") ? c.set("portal", e) : c.append("portal", e)
			}
			return a = ((e, t) => {
				for (const [n, r] of t.entries()) !e.has(n) && lh.includes(n) && e.append(n, r);
				return e
			})(a, c), a.toString() && (r += `?${a.toString()}`), r
		},
		Sh = (e, t = !1, {
			urlPathObjParam: n,
			infoParam: r,
			optionsParam: a
		}) => {
			let s, o, i;
			if (!1 === window.PCore.getBehaviorOverride("dynamicSemanticUrl")) return;
			if (t) s = n, o = r, i = a;
			else {
				const {
					uiResources: t,
					data: r
				} = e;
				({
					options: i
				} = e), s = n && n.pxURLPath && K(n.pxURLPath) ? Ah(t, r, n.pxURLPath) : n || Ah(t, r), o = te.getEndPointInfo(s.pxURLPath), s.pxURLPath = o.urlPath
			}
			const c = _h(uh, te.getApplicationPath(), s),
				{
					title: d
				} = ((e, t, n) => {
					if (e = (e => {
							let t = e.split(" ");
							return t = t.map((e => e.charAt(0).toUpperCase() + e.slice(1))), t.join(" ")
						})(e = e && "" !== e ? e : te.getApplicationName()), n === `${uh}/${t}/`) return {
						title: e
					};
					const r = new URL(n).pathname.replace(`${t}/`, ""),
						a = r.split("/");
					return /\d/.test(r) ? {
						title: `${e} - ${a[a.length-1]}`
					} : {
						title: `${e} - ${a[0]}`
					}
				})(hh, te.getApplicationPath(), c),
				l = ((e, t) => (void 0 !== e && (e.options = t), {
					stateObj: e
				}))(o, {
					...i,
					title: d
				});
			s.historyAction === ch ? ((e, t, n) => {
				try {
					window.history.pushState(e, t, n), window.scrollTo(0, 0)
				} catch (e) {
					throw new Error("Error- Unable to Add to Browser History")
				}
			})(l, d, c) : s.historyAction === dh && ((e, t, n) => {
				try {
					window.history.replaceState(e, t, n)
				} catch (e) {
					throw new Error("Error- Unable to Replace Browser History")
				}
			})(l, d, c)
		},
		Ch = e => {
			let t = null;
			e.directUrlUpdation && (t = {
				historyAction: ch,
				pxURLPath: ""
			}, t.pxURLPath = e.semanticURL), Sh(e, !1, {
				urlPathObjParam: t,
				infoParam: null,
				optionsParam: null
			})
		},
		$h = e => {
			const t = {
				pxURLPath: e
			};
			return _h(uh, te.getApplicationPath(), t)
		},
		bh = e => {
			const {
				uiResources: t
			} = e;
			yh() && (e.directUrlUpdation || (e => {
				if (e && e.root) {
					const {
						root: t
					} = e, {
						resources: n
					} = e, {
						views: r
					} = n, a = t.config, s = a.type, o = a.name;
					if ("VIEW" === s.toUpperCase()) {
						const e = r[o];
						let t = e;
						Array.isArray(e) && e.length > 0 && ([t] = e);
						const n = t.config;
						if (n.type) {
							const e = n.type;
							return !(!n.urlPath || "PAGE" !== e.toUpperCase())
						}
					}
					return !1
				}
				return !1
			})(t)) && Ch(e)
		},
		Ph = e => {
			const t = {
				routeEndpoint: e.routeEndpoint,
				requestType: e.requestType,
				payload: e.payload,
				routeKey: e.routeKey,
				options: null
			};
			return e.options && (t.options = e.options), t
		},
		Oh = e => {
			const t = (e => e.state ? e.state.stateObj : null)(e);
			t && op(l.showHistory(Ph(t)))
		},
		Th = () => te.getApplicationPath() !== Q(),
		vh = e => {
			const {
				acName: t,
				context: n,
				defaultViewLabel: r
			} = e, a = (e => {
				const t = te.getRoutingInfo(),
					n = e.split(" ").join(""),
					r = e.split(" ").join("-").toLowerCase(),
					a = (e => {
						const t = e.replace(/(?=[A-Z][a-z])/g, "-").toLowerCase();
						return t.startsWith("-") ? t.substring(1) : t
					})(e);
				return t.routes[n] ? n : t.routes[r] ? r : t.routes[a] ? a : e
			})(r);
			(e => {
				ph = e
			})(a), te.setDefaultRoute(a);
			const s = Ee(t, n),
				o = Ft(t, n),
				i = {
					historyAction: dh,
					pxURLPath: ""
				};
			let c;
			const d = {
				acName: o,
				context: s,
				actionConfig: {
					context: s
				}
			};
			if (Th()) {
				const e = (e => {
					if (e.indexOf("?") > 0) {
						const [t, n] = e.split("?"), r = new URLSearchParams(n), a = new Map;
						for (const [e, t] of r) "portal" !== e && "noPortal" !== e && "debug" !== e && a.set(e, t);
						const s = new URLSearchParams(a).toString();
						return s ? `${t}?${s}` : t
					}
					return e
				})(X(window.location.pathname + window.location.search));
				c = te.getEndPointInfo(e), i.pxURLPath = c.urlPath, void 0 !== c.payload?.pageClass && (c.payload.pageClass = sp()?.getState()?.data?.app?.pyPortal?.classID);
				const t = "showHistory",
					n = {
						routeEndpoint: c.routeEndpoint,
						requestType: c.requestType,
						payload: c.payload,
						options: d,
						routeKey: c.routeKey
					};
				op(l[t](Ph(n)))
			} else c = te.getEndPointInfo(ph), i.pxURLPath = "";
			Sh(null, !0, {
				urlPathObjParam: i,
				infoParam: c,
				optionsParam: d
			})
		},
		Nh = (e, t = !1) => {
			var n;
			uh = e.domain, !1 === t && yh() && (n = Oh, window.addEventListener("popstate", (e => n(e))), window.onbeforeunload = () => null), te.init(e, ph)
		},
		Rh = e => {
			(e => {
				window.document.title = e
			})(e)
		};

	function Dh(e) {
		return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `
	}
	var xh = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")(),
		wh = () => Math.random().toString(36).substring(7).split("").join("."),
		Mh = {
			INIT: `@@redux/INIT${wh()}`,
			REPLACE: `@@redux/REPLACE${wh()}`,
			PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${wh()}`
		};

	function Lh(e) {
		if ("object" != typeof e || null === e) return !1;
		let t = e;
		for (; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
		return Object.getPrototypeOf(e) === t || null === Object.getPrototypeOf(e)
	}

	function jh(e, t, n) {
		if ("function" != typeof e) throw new Error(Dh(2));
		if ("function" == typeof t && "function" == typeof n || "function" == typeof n && "function" == typeof arguments[3]) throw new Error(Dh(0));
		if ("function" == typeof t && void 0 === n && (n = t, t = void 0), void 0 !== n) {
			if ("function" != typeof n) throw new Error(Dh(1));
			return n(jh)(e, t)
		}
		let r = e,
			a = t,
			s = new Map,
			o = s,
			i = 0,
			c = !1;

		function d() {
			o === s && (o = new Map, s.forEach(((e, t) => {
				o.set(t, e)
			})))
		}

		function l() {
			if (c) throw new Error(Dh(3));
			return a
		}

		function u(e) {
			if ("function" != typeof e) throw new Error(Dh(4));
			if (c) throw new Error(Dh(5));
			let t = !0;
			d();
			const n = i++;
			return o.set(n, e),
				function() {
					if (t) {
						if (c) throw new Error(Dh(6));
						t = !1, d(), o.delete(n), s = null
					}
				}
		}

		function p(e) {
			if (!Lh(e)) throw new Error(Dh(7));
			if (void 0 === e.type) throw new Error(Dh(8));
			if ("string" != typeof e.type) throw new Error(Dh(17));
			if (c) throw new Error(Dh(9));
			try {
				c = !0, a = r(a, e)
			} finally {
				c = !1
			}
			return (s = o).forEach((e => {
				e()
			})), e
		}
		p({
			type: Mh.INIT
		});
		return {
			dispatch: p,
			subscribe: u,
			getState: l,
			replaceReducer: function(e) {
				if ("function" != typeof e) throw new Error(Dh(10));
				r = e, p({
					type: Mh.REPLACE
				})
			},
			[xh]: function() {
				const e = u;
				return {
					subscribe(t) {
						if ("object" != typeof t || null === t) throw new Error(Dh(11));

						function n() {
							const e = t;
							e.next && e.next(l())
						}
						n();
						return {
							unsubscribe: e(n)
						}
					},
					[xh]() {
						return this
					}
				}
			}
		}
	}

	function Uh(e) {
		const t = Object.keys(e),
			n = {};
		for (let r = 0; r < t.length; r++) {
			const a = t[r];
			0, "function" == typeof e[a] && (n[a] = e[a])
		}
		const r = Object.keys(n);
		let a;
		try {
			! function(e) {
				Object.keys(e).forEach((t => {
					const n = e[t];
					if (void 0 === n(void 0, {
							type: Mh.INIT
						})) throw new Error(Dh(12));
					if (void 0 === n(void 0, {
							type: Mh.PROBE_UNKNOWN_ACTION()
						})) throw new Error(Dh(13))
				}))
			}(n)
		} catch (e) {
			a = e
		}
		return function(e = {}, t) {
			if (a) throw a;
			let s = !1;
			const o = {};
			for (let a = 0; a < r.length; a++) {
				const i = r[a],
					c = n[i],
					d = e[i],
					l = c(d, t);
				if (void 0 === l) {
					t && t.type;
					throw new Error(Dh(14))
				}
				o[i] = l, s = s || l !== d
			}
			return s = s || r.length !== Object.keys(e).length, s ? o : e
		}
	}

	function Fh(...e) {
		return 0 === e.length ? e => e : 1 === e.length ? e[0] : e.reduce(((e, t) => (...n) => e(t(...n))))
	}
	var kh = function(e) {
			function t(t, n) {
				return e.call(this) || this
			}
			return Hc(t, e), t.prototype.schedule = function(e, t) {
				return void 0 === t && (t = 0), this
			}, t
		}(sd),
		Vh = {
			setInterval: function(e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				var a = Vh.delegate;
				return (null == a ? void 0 : a.setInterval) ? a.setInterval.apply(a, Kc([e, t], Yc(n))) : setInterval.apply(void 0, Kc([e, t], Yc(n)))
			},
			clearInterval: function(e) {
				var t = Vh.delegate;
				return ((null == t ? void 0 : t.clearInterval) || clearInterval)(e)
			},
			delegate: void 0
		},
		Gh = function(e) {
			function t(t, n) {
				var r = e.call(this, t, n) || this;
				return r.scheduler = t, r.work = n, r.pending = !1, r
			}
			return Hc(t, e), t.prototype.schedule = function(e, t) {
				var n;
				if (void 0 === t && (t = 0), this.closed) return this;
				this.state = e;
				var r = this.id,
					a = this.scheduler;
				return null != r && (this.id = this.recycleAsyncId(a, r, t)), this.pending = !0, this.delay = t, this.id = null !== (n = this.id) && void 0 !== n ? n : this.requestAsyncId(a, this.id, t), this
			}, t.prototype.requestAsyncId = function(e, t, n) {
				return void 0 === n && (n = 0), Vh.setInterval(e.flush.bind(e, this), n)
			}, t.prototype.recycleAsyncId = function(e, t, n) {
				if (void 0 === n && (n = 0), null != n && this.delay === n && !1 === this.pending) return t;
				null != t && Vh.clearInterval(t)
			}, t.prototype.execute = function(e, t) {
				if (this.closed) return new Error("executing a cancelled action");
				this.pending = !1;
				var n = this._execute(e, t);
				if (n) return n;
				!1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
			}, t.prototype._execute = function(e, t) {
				var n, r = !1;
				try {
					this.work(e)
				} catch (e) {
					r = !0, n = e || new Error("Scheduled action threw falsy error")
				}
				if (r) return this.unsubscribe(), n
			}, t.prototype.unsubscribe = function() {
				if (!this.closed) {
					var t = this.id,
						n = this.scheduler,
						r = n.actions;
					this.work = this.state = this.scheduler = null, this.pending = !1, ad(r, this), null != t && (this.id = this.recycleAsyncId(n, t, null)), this.delay = null, e.prototype.unsubscribe.call(this)
				}
			}, t
		}(kh),
		Bh = function(e) {
			function t(t, n) {
				var r = e.call(this, t, n) || this;
				return r.scheduler = t, r.work = n, r
			}
			return Hc(t, e), t.prototype.schedule = function(t, n) {
				return void 0 === n && (n = 0), n > 0 ? e.prototype.schedule.call(this, t, n) : (this.delay = n, this.state = t, this.scheduler.flush(this), this)
			}, t.prototype.execute = function(t, n) {
				return n > 0 || this.closed ? e.prototype.execute.call(this, t, n) : this._execute(t, n)
			}, t.prototype.requestAsyncId = function(t, n, r) {
				return void 0 === r && (r = 0), null != r && r > 0 || null == r && this.delay > 0 ? e.prototype.requestAsyncId.call(this, t, n, r) : (t.flush(this), 0)
			}, t
		}(Gh),
		Hh = {
			now: function() {
				return (Hh.delegate || Date).now()
			},
			delegate: void 0
		},
		Wh = function() {
			function e(t, n) {
				void 0 === n && (n = e.now), this.schedulerActionCtor = t, this.now = n
			}
			return e.prototype.schedule = function(e, t, n) {
				return void 0 === t && (t = 0), new this.schedulerActionCtor(this, e).schedule(n, t)
			}, e.now = Hh.now, e
		}(),
		qh = function(e) {
			function t(t, n) {
				void 0 === n && (n = Wh.now);
				var r = e.call(this, t, n) || this;
				return r.actions = [], r._active = !1, r
			}
			return Hc(t, e), t.prototype.flush = function(e) {
				var t = this.actions;
				if (this._active) t.push(e);
				else {
					var n;
					this._active = !0;
					do {
						if (n = e.execute(e.state, e.delay)) break
					} while (e = t.shift());
					if (this._active = !1, n) {
						for (; e = t.shift();) e.unsubscribe();
						throw n
					}
				}
			}, t
		}(Wh),
		zh = new(function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return Hc(t, e), t
		}(qh))(Bh),
		Yh = nd((function(e) {
			return function() {
				e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
			}
		})),
		Kh = function(e) {
			function t() {
				var t = e.call(this) || this;
				return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t
			}
			return Hc(t, e), t.prototype.lift = function(e) {
				var t = new Xh(this, this);
				return t.operator = e, t
			}, t.prototype._throwIfClosed = function() {
				if (this.closed) throw new Yh
			}, t.prototype.next = function(e) {
				var t = this;
				yd((function() {
					var n, r;
					if (t._throwIfClosed(), !t.isStopped) {
						t.currentObservers || (t.currentObservers = Array.from(t.observers));
						try {
							for (var a = zc(t.currentObservers), s = a.next(); !s.done; s = a.next()) {
								s.value.next(e)
							}
						} catch (e) {
							n = {
								error: e
							}
						} finally {
							try {
								s && !s.done && (r = a.return) && r.call(a)
							} finally {
								if (n) throw n.error
							}
						}
					}
				}))
			}, t.prototype.error = function(e) {
				var t = this;
				yd((function() {
					if (t._throwIfClosed(), !t.isStopped) {
						t.hasError = t.isStopped = !0, t.thrownError = e;
						for (var n = t.observers; n.length;) n.shift().error(e)
					}
				}))
			}, t.prototype.complete = function() {
				var e = this;
				yd((function() {
					if (e._throwIfClosed(), !e.isStopped) {
						e.isStopped = !0;
						for (var t = e.observers; t.length;) t.shift().complete()
					}
				}))
			}, t.prototype.unsubscribe = function() {
				this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
			}, Object.defineProperty(t.prototype, "observed", {
				get: function() {
					var e;
					return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0
				},
				enumerable: !1,
				configurable: !0
			}), t.prototype._trySubscribe = function(t) {
				return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t)
			}, t.prototype._subscribe = function(e) {
				return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e)
			}, t.prototype._innerSubscribe = function(e) {
				var t = this,
					n = this,
					r = n.hasError,
					a = n.isStopped,
					s = n.observers;
				return r || a ? od : (this.currentObservers = null, s.push(e), new sd((function() {
					t.currentObservers = null, ad(s, e)
				})))
			}, t.prototype._checkFinalizedStatuses = function(e) {
				var t = this,
					n = t.hasError,
					r = t.thrownError,
					a = t.isStopped;
				n ? e.error(r) : a && e.complete()
			}, t.prototype.asObservable = function() {
				var e = new Td;
				return e.source = this, e
			}, t.create = function(e, t) {
				return new Xh(e, t)
			}, t
		}(Td),
		Xh = function(e) {
			function t(t, n) {
				var r = e.call(this) || this;
				return r.destination = t, r.source = n, r
			}
			return Hc(t, e), t.prototype.next = function(e) {
				var t, n;
				null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === n || n.call(t, e)
			}, t.prototype.error = function(e) {
				var t, n;
				null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === n || n.call(t, e)
			}, t.prototype.complete = function() {
				var e, t;
				null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e)
			}, t.prototype._subscribe = function(e) {
				var t, n;
				return null !== (n = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== n ? n : od
			}, t
		}(Kh),
		Jh = function(e) {
			function t(t, n) {
				var r = e.call(this, (function(e) {
					var t = r.__notifier.subscribe(e);
					return t && !t.closed && e.next(r.value), t
				})) || this;
				return r.__notifier = new Kh, r.value = n, t.subscribe((function(e) {
					e !== r.value && (r.value = e, r.__notifier.next(e))
				})), r
			}
			return Hc(t, e), t
		}(Td);
	var Qh = n(578),
		Zh = Symbol.for("immer-nothing"),
		eg = Symbol.for("immer-draftable"),
		tg = Symbol.for("immer-state");

	function ng(e, ...t) {
		throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)
	}
	var rg = Object.getPrototypeOf;

	function ag(e) {
		return !!e && !!e[tg]
	}

	function sg(e) {
		return !!e && (ig(e) || Array.isArray(e) || !!e[eg] || !!e.constructor?.[eg] || pg(e) || hg(e))
	}
	var og = Object.prototype.constructor.toString();

	function ig(e) {
		if (!e || "object" != typeof e) return !1;
		const t = rg(e);
		if (null === t) return !0;
		const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
		return n === Object || "function" == typeof n && Function.toString.call(n) === og
	}

	function cg(e, t) {
		0 === dg(e) ? Reflect.ownKeys(e).forEach((n => {
			t(n, e[n], e)
		})) : e.forEach(((n, r) => t(r, n, e)))
	}

	function dg(e) {
		const t = e[tg];
		return t ? t.type_ : Array.isArray(e) ? 1 : pg(e) ? 2 : hg(e) ? 3 : 0
	}

	function lg(e, t) {
		return 2 === dg(e) ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t)
	}

	function ug(e, t, n) {
		const r = dg(e);
		2 === r ? e.set(t, n) : 3 === r ? e.add(n) : e[t] = n
	}

	function pg(e) {
		return e instanceof Map
	}

	function hg(e) {
		return e instanceof Set
	}

	function gg(e) {
		return e.copy_ || e.base_
	}

	function fg(e, t) {
		if (pg(e)) return new Map(e);
		if (hg(e)) return new Set(e);
		if (Array.isArray(e)) return Array.prototype.slice.call(e);
		const n = ig(e);
		if (!0 === t || "class_only" === t && !n) {
			const t = Object.getOwnPropertyDescriptors(e);
			delete t[tg];
			let n = Reflect.ownKeys(t);
			for (let r = 0; r < n.length; r++) {
				const a = n[r],
					s = t[a];
				!1 === s.writable && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (t[a] = {
					configurable: !0,
					writable: !0,
					enumerable: s.enumerable,
					value: e[a]
				})
			}
			return Object.create(rg(e), t)
		} {
			const t = rg(e);
			if (null !== t && n) return {
				...e
			};
			const r = Object.create(t);
			return Object.assign(r, e)
		}
	}

	function yg(e, t = !1) {
		return Ig(e) || ag(e) || !sg(e) || (dg(e) > 1 && (e.set = e.add = e.clear = e.delete = mg), Object.freeze(e), t && Object.entries(e).forEach((([e, t]) => yg(t, !0)))), e
	}

	function mg() {
		ng(2)
	}

	function Ig(e) {
		return Object.isFrozen(e)
	}
	var Eg, Ag = {};

	function _g(e) {
		const t = Ag[e];
		return t || ng(0), t
	}

	function Sg() {
		return Eg
	}

	function Cg(e, t) {
		t && (_g("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t)
	}

	function $g(e) {
		bg(e), e.drafts_.forEach(Og), e.drafts_ = null
	}

	function bg(e) {
		e === Eg && (Eg = e.parent_)
	}

	function Pg(e) {
		return Eg = {
			drafts_: [],
			parent_: Eg,
			immer_: e,
			canAutoFreeze_: !0,
			unfinalizedDrafts_: 0
		}
	}

	function Og(e) {
		const t = e[tg];
		0 === t.type_ || 1 === t.type_ ? t.revoke_() : t.revoked_ = !0
	}

	function Tg(e, t) {
		t.unfinalizedDrafts_ = t.drafts_.length;
		const n = t.drafts_[0];
		return void 0 !== e && e !== n ? (n[tg].modified_ && ($g(t), ng(4)), sg(e) && (e = vg(t, e), t.parent_ || Rg(t, e)), t.patches_ && _g("Patches").generateReplacementPatches_(n[tg].base_, e, t.patches_, t.inversePatches_)) : e = vg(t, n, []), $g(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Zh ? e : void 0
	}

	function vg(e, t, n) {
		if (Ig(t)) return t;
		const r = t[tg];
		if (!r) return cg(t, ((a, s) => Ng(e, r, t, a, s, n))), t;
		if (r.scope_ !== e) return t;
		if (!r.modified_) return Rg(e, r.base_, !0), r.base_;
		if (!r.finalized_) {
			r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
			const t = r.copy_;
			let a = t,
				s = !1;
			3 === r.type_ && (a = new Set(t), t.clear(), s = !0), cg(a, ((a, o) => Ng(e, r, t, a, o, n, s))), Rg(e, t, !1), n && e.patches_ && _g("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_)
		}
		return r.copy_
	}

	function Ng(e, t, n, r, a, s, o) {
		if (ag(a)) {
			const o = vg(e, a, s && t && 3 !== t.type_ && !lg(t.assigned_, r) ? s.concat(r) : void 0);
			if (ug(n, r, o), !ag(o)) return;
			e.canAutoFreeze_ = !1
		} else o && n.add(a);
		if (sg(a) && !Ig(a)) {
			if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
			vg(e, a), t && t.scope_.parent_ || "symbol" == typeof r || !Object.prototype.propertyIsEnumerable.call(n, r) || Rg(e, a)
		}
	}

	function Rg(e, t, n = !1) {
		!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && yg(t, n)
	}
	var Dg = {
			get(e, t) {
				if (t === tg) return e;
				const n = gg(e);
				if (!lg(n, t)) return function(e, t, n) {
					const r = Mg(t, n);
					return r ? "value" in r ? r.value : r.get?.call(e.draft_) : void 0
				}(e, n, t);
				const r = n[t];
				return e.finalized_ || !sg(r) ? r : r === wg(e.base_, t) ? (jg(e), e.copy_[t] = Ug(r, e)) : r
			},
			has: (e, t) => t in gg(e),
			ownKeys: e => Reflect.ownKeys(gg(e)),
			set(e, t, n) {
				const r = Mg(gg(e), t);
				if (r?.set) return r.set.call(e.draft_, n), !0;
				if (!e.modified_) {
					const r = wg(gg(e), t),
						o = r?.[tg];
					if (o && o.base_ === n) return e.copy_[t] = n, e.assigned_[t] = !1, !0;
					if (((a = n) === (s = r) ? 0 !== a || 1 / a == 1 / s : a != a && s != s) && (void 0 !== n || lg(e.base_, t))) return !0;
					jg(e), Lg(e)
				}
				var a, s;
				return e.copy_[t] === n && (void 0 !== n || t in e.copy_) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0
			},
			deleteProperty: (e, t) => (void 0 !== wg(e.base_, t) || t in e.base_ ? (e.assigned_[t] = !1, jg(e), Lg(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0),
			getOwnPropertyDescriptor(e, t) {
				const n = gg(e),
					r = Reflect.getOwnPropertyDescriptor(n, t);
				return r ? {
					writable: !0,
					configurable: 1 !== e.type_ || "length" !== t,
					enumerable: r.enumerable,
					value: n[t]
				} : r
			},
			defineProperty() {
				ng(11)
			},
			getPrototypeOf: e => rg(e.base_),
			setPrototypeOf() {
				ng(12)
			}
		},
		xg = {};

	function wg(e, t) {
		const n = e[tg];
		return (n ? gg(n) : e)[t]
	}

	function Mg(e, t) {
		if (!(t in e)) return;
		let n = rg(e);
		for (; n;) {
			const e = Object.getOwnPropertyDescriptor(n, t);
			if (e) return e;
			n = rg(n)
		}
	}

	function Lg(e) {
		e.modified_ || (e.modified_ = !0, e.parent_ && Lg(e.parent_))
	}

	function jg(e) {
		e.copy_ || (e.copy_ = fg(e.base_, e.scope_.immer_.useStrictShallowCopy_))
	}
	cg(Dg, ((e, t) => {
		xg[e] = function() {
			return arguments[0] = arguments[0][0], t.apply(this, arguments)
		}
	})), xg.deleteProperty = function(e, t) {
		return xg.set.call(this, e, t, void 0)
	}, xg.set = function(e, t, n) {
		return Dg.set.call(this, e[0], t, n, e[0])
	};

	function Ug(e, t) {
		const n = pg(e) ? _g("MapSet").proxyMap_(e, t) : hg(e) ? _g("MapSet").proxySet_(e, t) : function(e, t) {
			const n = Array.isArray(e),
				r = {
					type_: n ? 1 : 0,
					scope_: t ? t.scope_ : Sg(),
					modified_: !1,
					finalized_: !1,
					assigned_: {},
					parent_: t,
					base_: e,
					draft_: null,
					copy_: null,
					revoke_: null,
					isManual_: !1
				};
			let a = r,
				s = Dg;
			n && (a = [r], s = xg);
			const {
				revoke: o,
				proxy: i
			} = Proxy.revocable(a, s);
			return r.draft_ = i, r.revoke_ = o, i
		}(e, t);
		return (t ? t.scope_ : Sg()).drafts_.push(n), n
	}

	function Fg(e) {
		if (!sg(e) || Ig(e)) return e;
		const t = e[tg];
		let n;
		if (t) {
			if (!t.modified_) return t.base_;
			t.finalized_ = !0, n = fg(e, t.scope_.immer_.useStrictShallowCopy_)
		} else n = fg(e, !0);
		return cg(n, ((e, t) => {
			ug(n, e, Fg(t))
		})), t && (t.finalized_ = !1), n
	}
	var kg = new class {
			constructor(e) {
				this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (e, t, n) => {
					if ("function" == typeof e && "function" != typeof t) {
						const n = t;
						t = e;
						const r = this;
						return function(e = n, ...a) {
							return r.produce(e, (e => t.call(this, e, ...a)))
						}
					}
					let r;
					if ("function" != typeof t && ng(6), void 0 !== n && "function" != typeof n && ng(7), sg(e)) {
						const a = Pg(this),
							s = Ug(e, void 0);
						let o = !0;
						try {
							r = t(s), o = !1
						} finally {
							o ? $g(a) : bg(a)
						}
						return Cg(a, n), Tg(r, a)
					}
					if (!e || "object" != typeof e) {
						if (r = t(e), void 0 === r && (r = e), r === Zh && (r = void 0), this.autoFreeze_ && yg(r, !0), n) {
							const t = [],
								a = [];
							_g("Patches").generateReplacementPatches_(e, r, t, a), n(t, a)
						}
						return r
					}
					ng(1)
				}, this.produceWithPatches = (e, t) => {
					if ("function" == typeof e) return (t, ...n) => this.produceWithPatches(t, (t => e(t, ...n)));
					let n, r;
					return [this.produce(e, t, ((e, t) => {
						n = e, r = t
					})), n, r]
				}, "boolean" == typeof e?.autoFreeze && this.setAutoFreeze(e.autoFreeze), "boolean" == typeof e?.useStrictShallowCopy && this.setUseStrictShallowCopy(e.useStrictShallowCopy)
			}
			createDraft(e) {
				sg(e) || ng(8), ag(e) && (e = function(e) {
					ag(e) || ng(10);
					return Fg(e)
				}(e));
				const t = Pg(this),
					n = Ug(e, void 0);
				return n[tg].isManual_ = !0, bg(t), n
			}
			finishDraft(e, t) {
				const n = e && e[tg];
				n && n.isManual_ || ng(9);
				const {
					scope_: r
				} = n;
				return Cg(r, t), Tg(void 0, r)
			}
			setAutoFreeze(e) {
				this.autoFreeze_ = e
			}
			setUseStrictShallowCopy(e) {
				this.useStrictShallowCopy_ = e
			}
			applyPatches(e, t) {
				let n;
				for (n = t.length - 1; n >= 0; n--) {
					const r = t[n];
					if (0 === r.path.length && "replace" === r.op) {
						e = r.value;
						break
					}
				}
				n > -1 && (t = t.slice(n + 1));
				const r = _g("Patches").applyPatches_;
				return ag(e) ? r(e, t) : this.produce(e, (e => r(e, t)))
			}
		},
		Vg = kg.produce;
	kg.produceWithPatches.bind(kg), kg.setAutoFreeze.bind(kg), kg.setUseStrictShallowCopy.bind(kg), kg.applyPatches.bind(kg), kg.createDraft.bind(kg), kg.finishDraft.bind(kg);
	const Gg = {
		getData: (e, t, n, r = {}) => ((e, t, n, r = {}) => {
			const a = {
					dataViewName: e
				},
				{
					skipClearErrorMessages: s,
					signal: o,
					doNotMergeMessagesForStatusCode: i
				} = r,
				{
					restApi: c,
					reqType: d
				} = Eh("getListData", a);
			return yl(c, {
				method: d,
				body: t,
				...o && {
					signal: o
				},
				...s && {
					skipClearErrorMessages: s
				}
			}, n, i)
		})(e, t, n, r),
		getListCount: (e, t, n) => {
			const r = {
					dataViewName: e
				},
				{
					restApi: a,
					reqType: s
				} = Eh("getListDataCount", r);
			return yl(a, {
				method: s,
				body: t
			}, n)
		},
		getDataViewMetadata: (e, t, n) => {
			const r = {
					dataViewName: e
				},
				a = !!n,
				s = a ? "postDataViewMetadata" : "getDataViewMetadata",
				{
					restApi: o,
					reqType: i
				} = Eh(s, r);
			return yl(o, a ? {
				method: i,
				body: {
					associationFilter: n
				}
			} : {
				method: i
			}, t)
		},
		getDataObjectView: (e, t, n, r, a = {}) => {
			const {
				skipClearErrorMessages: s,
				signal: o,
				doNotMergeMessagesForStatusCode: i
			} = a, c = {
				data_view_ID: e,
				view_ID: t
			}, d = {
				dataViewParameters: n
			}, {
				restApi: l,
				reqType: u
			} = Eh("readDataObject", c);
			return yl(l, {
				method: u,
				body: d,
				...o && {
					signal: o
				},
				...s && {
					skipClearErrorMessages: s
				}
			}, r, i)
		},
		getCaseEditMetadata: (e, t) => Ql.getCaseEditMetadata(e, t),
		getCaseEditLock: (e, t) => Ql.getCaseEditLock(e, t),
		updateCaseEditFieldsData: (e, t, n, r) => Ql.updateCaseEditFieldsData(e, t, n, r),
		moveListRecords: (e, t) => {
			const {
				sourceID: n,
				destinationID: r,
				context: a,
				listClass: s,
				viewName: o,
				viewClassName: i
			} = e, c = {
				viewName: o,
				viewClassName: i
			}, {
				restApi: d,
				reqType: l
			} = Eh("moveListRecords", c);
			return yl(d, {
				method: l,
				body: {
					content: {
						sourceID: n,
						destinationID: r,
						context: a,
						listClass: s
					}
				}
			}, t)
		},
		isTimeElapsed: (e, t, n = "") => {
			if (t) {
				if (e && n === W.RELOAD_IF_OLDER_THAN) return new Date(e).setSeconds(t) < Date.now();
				if (e && n === W.RELOAD_ONCE_PER_INTERACTION) return !0
			}
			return !0
		},
		getAppCacheKey: e => void 0 !== Vs("root").find((e => e.includes("authoring-preview"))) ? `${W.AUTHORING_PREVIEW_CONTAINER}-${e}` : `${oe.getAppAlias()}-${e}`
	};
	const Bg = class {
		constructor(e, t, n) {
			this.filter = e, this.messageHandler = t, this.contextName = n
		}
	};
	const Hg = class {
		constructor() {
			this.users = {}, this.connected = !1, this.connectionsCount = 1
		}
		_handleUserPresence({
			message: e
		}) {
			const {
				state: t,
				updateById: n
			} = e, r = this.users[n];
			r && (r.state = t, Object.keys(r.subscribers).forEach((e => {
				r.subscribers[e]?.callback({
					state: r.state
				})
			})))
		}
		_getAutoGenId() {
			return this.connectionsCount += 1, `${Date.now()}_${this.connectionsCount}`
		}
		subscribe(e, t, n) {
			const r = this._getAutoGenId(),
				a = this.users[e];
			if (a) return a.subscribers[r] = {
				callback: t,
				contextName: n
			}, r;
			this.users[e] = {
				subscribers: {
					[r]: {
						callback: t,
						contextName: n
					}
				}
			};
			const s = {
				matcher: "PRESENCE",
				criteria: {
					userId: e
				}
			};
			return Xg.subscribe(s, this._handleUserPresence.bind(this)), r
		}
		unsubscribe(e, t) {
			const n = {
				matcher: "PRESENCE",
				unsubscribeUsers: {
					users: [e]
				}
			};
			this.users[e] && this.users[e].subscribers && (delete this.users[e].subscribers[t], 0 === Object.keys(this.users[e].subscribers).length && (delete this.users[e], Xg.publishMessage(n)))
		}
		getUserState(e) {
			return this.users[e] && this.users[e].state
		}
		clearContext(e) {
			Object.keys(this.users).forEach((t => {
				Object.keys(this.users[t].subscribers).forEach((n => {
					this.users[t].subscribers[n].contextName === e && this.unsubscribe(t, n)
				}))
			}))
		}
	};
	var Wg = n(526),
		qg = n.n(Wg);
	const zg = class {
		constructor(e, t) {
			this.atomicSubscribers = {}, this.connectionsCount = 1, this.connected = !1, this.matcher = e, this.criteria = t
		}
		_handleAtomicMessage({
			message: e
		}) {
			Object.keys(this.atomicSubscribers).forEach((t => {
				const n = this.atomicSubscribers[t],
					r = Object.keys(n.criteria),
					a = Object.keys(e);
				0 === qg()(r, a).length && n.callback(e)
			}))
		}
		_getAutoGenId() {
			return this.connectionsCount += 1, `${Date.now()}_${this.connectionsCount}`
		}
		subscribe(e, t) {
			if (!this.connected) {
				const e = {
					matcher: this.matcher,
					criteria: this.criteria
				};
				Xg.subscribe(e, this._handleAtomicMessage.bind(this)), this.connected = !0
			}
			const n = this._getAutoGenId();
			return this.atomicSubscribers[n] = {
				criteria: e,
				callback: t
			}, n
		}
		unsubscribe(e) {
			delete this.atomicSubscribers[e]
		}
	};
	const Yg = new class {
		constructor() {
			this.subscriptions = {}
		}
		getOrCreateSubscription(e) {
			if (!this.subscriptions[e]) {
				const t = {
					caseId: e
				};
				this.subscriptions[e] = new zg("CASE", t)
			}
			return this.subscriptions[e]
		}
	};
	class Kg {
		static subscribers = {};
		static connectionsCount = 0;
		static webSocket = null;
		static connectionConfig = null;
		static inProgressSubscriptions = [];
		static inProgressMessages = [];
		static isServiceAlive = null;
		static serviceAliveHandler = null;
		static userPresence = new Hg;
		static refreshB2SOffset = 10;
		static initConnection(e) {
			if (!e) return;
			const {
				messagingService: t
			} = e;
			if (!t || t && t.length <= 6) return;
			const n = oe.b2sJWT;
			if (!n || n.length < 4) return;
			this.webSocket && (this.cleanSocketListeners(), this.webSocket.close());
			const r = t.endsWith("/") ? t + "ws" : t + "/ws";
			try {
				console.log(`MS : ${Date.now()}`);
				const e = new WebSocket(`${r}`);
				this.webSocket = e, e.addEventListener("open", this.handleOnOpen.bind(this)), e.addEventListener("message", this.handleOnMessage.bind(this)), e.addEventListener("error", this.handleOnError.bind(this)), e.addEventListener("close", this.handleOnClose.bind(this))
			} catch (e) {
				console.log(`MS catch : ${Date.now()}`), console.log(e)
			}
		}
		static handleOnError(e) {
			this.getTokenExpiryTime() <= 0 && (clearInterval(this.reInitInterval), this.reInitInterval = null), console.log("web socket connection error event: ", e)
		}
		static handleOnClose(e) {
			null !== this.serviceAliveHandler && (clearTimeout(this.serviceAliveHandler), this.serviceAliveHandler = null), e && 4001 === e.code || this.connectionConfig?.disableReInit || this.reInitInterval || this.getTokenExpiryTime() <= 0 || this.reInitialization()
		}
		static handleOnOpen() {
			if (clearInterval(this.reInitInterval), this.reInitInterval = null, null !== this.webSocket && 1 === this.webSocket.readyState) {
				const e = oe.b2sJWT;
				if (!e || e.length < 4) return;
				this.publishMessage({
					token: e
				})
			}
		}
		static handleOnMessage(e) {
			if (null !== e && "ALIVE" === e.data) null === this.isServiceAlive && this.checkLiveliness(8e3), this.isServiceAlive = !0;
			else {
				let t = null;
				try {
					t = JSON.parse(e.data)
				} catch (t) {
					console.error("Invalid data recieved from messaging service", e.data)
				}
				if (t && t.msgId && this.webSocket.send(`{"ack":"${t.msgId}"}`), t && t.filter) {
					const {
						matcher: e,
						criteria: n
					} = t.filter;
					delete n.environmentID, Object.keys(this.subscribers).forEach((r => {
						const a = this.subscribers[r];
						a.filter.matcher === e && _p.isEqual(a.filter.criteria, n) && a.messageHandler(t)
					}))
				} else if (t && t.tokenExpiryTime) {
					this.setTokenExpiryTime(t);
					const e = 1e3 * (this.getTokenExpiryTime() - this.refreshB2SOffset);
					setTimeout((() => this.refreshB2STokenReInit()), e);
					let n = [];
					this.inProgressSubscriptions.forEach((({
						messageSubscriber: e,
						id: t
					}) => {
						n.includes(t) || (n.push(t), this.subscribeToSocket(e, t))
					})), this.inProgressSubscriptions = [], this.inProgressMessages.forEach((e => {
						this.publishMessage(e)
					})), this.inProgressMessages = [], n = null
				} else console.error("filter missing from recieved data from messaging service", e.data)
			}
		}
		static reInitialization(e) {
			this.reInitInterval || (Object.keys(this.subscribers).forEach((e => {
				this.inProgressSubscriptions.push({
					messageSubscriber: this.subscribers[e],
					id: e
				})
			})), e ? this.initConnection(this.connectionConfig) : this.reInitInterval = setInterval((() => {
				this.initConnection(this.connectionConfig)
			}), 5e3))
		}
		static checkLiveliness(e) {
			!1 === this.isServiceAlive ? this.reInitialization(!0) : this.isServiceAlive = !1, null !== this.serviceAliveHandler && clearTimeout(this.serviceAliveHandler), this.serviceAliveHandler = setTimeout((() => {
				this.checkLiveliness(e)
			}), e)
		}
		static setConnectionConfig(e) {
			this.connectionConfig = e
		}
		static cleanSocketListeners() {
			null !== this.webSocket && (this.webSocket.removeEventListener("open", this.handleOnOpen.bind(this)), this.webSocket.removeEventListener("message", this.handleOnMessage.bind(this)), this.webSocket.removeEventListener("error", this.handleOnError.bind(this)), this.webSocket.removeEventListener("close", this.handleOnClose.bind(this)))
		}
		static disconnect() {
			null !== this.webSocket && (this.cleanSocketListeners(), this.webSocket.close(), this.webSocket = null)
		}
		static subscribe(e, t, n, r) {
			this.connectionsCount += 1;
			const a = r || `${Date.now()}_${this.connectionsCount}`,
				s = new Bg(e, t, n);
			return null !== this.webSocket && 1 === this.webSocket.readyState ? (this.subscribeToSocket(s, a), a) : (this.inProgressSubscriptions.push({
				messageSubscriber: s,
				id: a
			}), null === this.webSocket && this.initConnection(this.connectionConfig), a)
		}
		static subscribeToSocket(e, t) {
			this.subscribers[t] = e;
			const n = {
				filter: e.filter,
				subscribe: {
					id: t
				}
			};
			this.webSocket.send(JSON.stringify(n))
		}
		static unsubscribe(e) {
			if (this.subscribers[e]) {
				delete this.subscribers[e];
				const t = {
					unsubscribe: {
						id: e
					}
				};
				null !== this.webSocket && 1 === this.webSocket.readyState && this.webSocket.send(JSON.stringify(t))
			}
		}
		static publishMessage(e) {
			null !== this.webSocket ? null === this.webSocket || 1 !== this.webSocket.readyState ? this.inProgressMessages.push(e) : this.webSocket.send(JSON.stringify(e)) : console.error("Web socket not initialized.")
		}
		static getUserPresence = () => this.userPresence;
		static getCaseSubscription = e => Yg.getOrCreateSubscription(e);
		static refreshB2STokenReInit = async () => {
			const e = {
				body: {
					B2SToken: oe.b2sJWT
				}
			};
			PCore.getRestClient().invokeRestApi("refreshB2S", e).then((e => {
				const {
					newB2SToken: t
				} = e.data;
				t && t.length > 30 ? (oe.b2sJWT = t, this.setTokenExpiryTime({
					tokenExpiryTime: Math.round(Date.now() / 1e3) + 60
				}), this.webSocket.close()) : console.log("refreshB2S: invalid b2s length")
			})).catch((e => {
				console.log(`refreshB2S: error occured while fetching: ${e}`)
			}))
		};
		static getTokenExpiryTime = () => {
			const e = Math.round(Date.now() / 1e3);
			return this.tokenExpiryTime - e
		};
		static setTokenExpiryTime = e => {
			this.tokenExpiryTime = e.tokenExpiryTime
		};
		static clearContext(e) {
			Object.keys(this.subscribers).forEach((t => {
				this.subscribers[t].contextName === e && this.unsubscribe(t)
			})), this.userPresence.clearContext(e)
		}
	}
	const Xg = Kg;
	const Jg = class {
		constructor() {
			this.records = [], this.maxRecords = 0, this.isDirty = !1
		}
		getRecords(e) {
			if (e) {
				const t = [],
					{
						pageNumber: n,
						pageSize: r
					} = e,
					a = n * r;
				let s = a - r;
				for (; s < a; s += 1) {
					if (!this.records[s]) return this.maxRecords === s ? t : [];
					t.push(this.records[s])
				}
				return t
			}
			return this.records
		}
		mergeRecords(e, t) {
			if (t) {
				const {
					pageNumber: n,
					pageSize: r
				} = t, a = n * r;
				let s = 0;
				for (let t = a - r + 1 - 1; t < a; t += 1) this.records[t] = e[s], s += 1;
				if (e.length < r) {
					const t = (n - 1) * r + e.length;
					this.setMaxRecordsCount(t)
				}
			} else e || (e = []), Array.isArray(this.records) && Array.isArray(e) && (this.records = yp(this.records, e, {
				isArrayDeepMerge: !1
			})), this.setMaxRecordsCount(this.records.length)
		}
		setMaxRecordsCount(e) {
			this.maxRecords = e
		}
		getMaxRecordsCount() {
			return this.maxRecords
		}
	};
	const Qg = new class {
			isCacheDisabled = !1;
			constructor() {
				this.datastore = {}, this.subscribers = {}, this.isCacheEnabled = !0, this.subscribedDataPageNames = new Set
			}
			getData(e, t = {}, n, r) {
				const a = this._generateHash(e, t, r);
				if (null === a) return [];
				if (this.datastore[e] && this.datastore[e][a]) {
					const t = this.datastore[e][a];
					return t.isDirty ? [] : t.getRecords(n)
				}
				return []
			}
			_generateHash(e, t, n) {
				const r = Vu(e);
				if (!r) return null;
				const a = r.parameters || [];
				let s = "",
					o = e;
				const i = [];
				return a.forEach((e => {
					t[e.name] ? i.push(t[e.name]) : i.push(e.defaultValue || W.NULL_STRING)
				})), n && i.push(JSON.stringify(n)), i.join(W.HASH_DELIMITER) && (s = _p.getHashedString(i.join(W.HASH_DELIMITER)), o = e + W.UNDERSCORE_STRING + s), o
			}
			async getDataAsync(e, t, n = {}, r, a, s = {}) {
				if (this._subscribeToMessageService(e), s.purgeDataPageCache && (this.datastore[e] = {}), !this._isCacheable(e, a) || s.invalidateCache) {
					const o = await this._fetchData(e, n, r, a, t, s),
						i = o?.data?.data ?? [];
					return {
						...o.data,
						data: i,
						pageNumber: o?.data?.pageNumber,
						pageSize: o?.data?.pageSize,
						queryStats: o?.data?.queryStats,
						status: o?.status
					}
				}
				const o = this.getData(e, n, r, a);
				if (o.length > 0) return {
					data: o
				};
				const i = await this._fetchData(e, n, r, a, t, s);
				return {
					...i.data,
					data: this._mergeDataStore(e, n, r, a, i),
					pageNumber: i?.data?.pageNumber,
					pageSize: i?.data?.pageSize,
					queryStats: i?.data?.queryStats,
					status: i?.status
				}
			}
			async getPageDataAsync(e, t, n = {}, r = {}) {
				const {
					restApi: a,
					reqType: s
				} = Eh(W.GET_PAGE_DATA, {
					dataViewName: e,
					dataViewParameters: encodeURIComponent(JSON.stringify(n))
				}), o = {
					method: s
				};
				if (r && r.invalidateCache && delete this.datastore[e], r && !r.invalidateCache && this.datastore[e]) return this.datastore[e];
				const i = a && 0 === Object.keys(n).length ? a.split("?")[0] : a;
				return yl(i, o, t).then((t => (this._isPerInteraction(e) || (this.datastore[e] = t.data || {}), t.data)))
			}
			updateDataPageStore(e = {}) {
				Object.keys(e).forEach((t => {
					this.datastore[t] || (this.datastore[t] = {});
					const n = e[t];
					Object.keys(n).forEach((n => {
						if (this.datastore[t][n]) {
							this.datastore[t][n].mergeRecords(e[t][n].pxResults)
						} else {
							const r = new Jg;
							this.datastore[t][n] = r, r.mergeRecords(e[t][n].pxResults)
						}
					}))
				}))
			}
			_mergeDataStore(e, t, n, r, a) {
				const s = this._generateHash(e, t, r),
					o = a?.data?.data;
				if (!o || 0 === o.length) return [];
				if (null === s) return o;
				this.datastore[e] || (this.datastore[e] = {}), this.datastore[e][s] || (this.datastore[e][s] = new Jg);
				const i = this.datastore[e][s];
				return i.mergeRecords(o, n), i.isDirty = !1, i.getRecords(n)
			}
			async _fetchData(e, t, n, r, a, s) {
				const {
					additionalApiParams: {
						useExtendedTimeout: o = !1,
						includeTotalCount: i = !1
					} = {},
					...c
				} = s, d = {
					dataViewParameters: t
				};
				return i && (d.includeTotalCount = !0), o && (d.useExtendedTimeout = !0), n && (d.paging = n), r && (d.query = r), Gg.getData(e, d, a, c)
			}
			isDataPage(e = "") {
				return e.startsWith("D_") || e.startsWith("Declare_")
			}
			_handleCascadeUpdate() {
				const {
					dataPageName: e,
					scope: t
				} = this;
				t._handleMessage({
					message: {
						datapage: e
					}
				})
			}
			subscribeToUpdate(e, t, n, r, a, s) {
				this.subscribers[e] = this.subscribers[e] || {}, this.subscribers[e].callback = this.subscribers[e].callback || {}, this.subscribers[e].callback[s] || (this.subscribers[e].callback[s] = a), this._subscribeToCascadeUpdates(e, t, n, r, s)
			}
			unsubscribe(e, t, n, r, a) {
				delete this.subscribers[e]?.callback[a], t && t.length > 0 && tp.unRegisterFields(n, r, t, a)
			}
			_subscribeToCascadeUpdates(e, t, n, r, a) {
				t && t.length > 0 && tp.registerFields(n, r, t, this._handleCascadeUpdate.bind({
					dataPageName: e,
					scope: this
				}), a)
			}
			_subscribeToMessageService(e) {
				if (e && this.subscribedDataPageNames.has(e)) return;
				const t = {
					matcher: "DATAPAGE_UPDATED",
					criteria: {
						datapage: e
					}
				};
				Xg.subscribe(t, this._handleMessage.bind(this)), this.subscribedDataPageNames.add(e)
			}
			_handleMessage(e) {
				const {
					msgId: t,
					message: n
				} = e, {
					datapage: r
				} = n, a = this.subscribers[r];
				this._markDataInstancsDirty(r), a && a.callback && Object.keys(a.callback).forEach((n => {
					a.callback[n](e.message, !!t)
				}))
			}
			_markDataInstancsDirty(e) {
				if (this.datastore[e]) {
					Object.keys(this.datastore[e]).forEach((t => {
						this.datastore[e][t].isDirty = !0
					}))
				}
			}
			_isPerInteraction(e) {
				const t = Vu(e);
				return t && t.refreshStrategy && "reloadOncePerInteraction" === t.refreshStrategy.type
			}
			_isCacheable(e, t) {
				return !(this._isPerInteraction(e) || !this.isCacheEnabled) && !(t && Object.keys(t).length > 1)
			}
			disableCache(e) {
				this.isCacheEnabled = !e
			}
		},
		Zg = (e, t) => {
			const {
				data: {
					shared: n = {}
				} = {},
				context: r
			} = t;
			((e, t) => {
				Qg.updateDataPageStore(t), Object.keys(t).forEach((n => {
					_p.getIn(e, [W.SHARED, n]) ? Object.keys(t[n]).forEach((r => {
						_p.setIn(e, [W.SHARED, n, r], t[n][r])
					})) : _p.setIn(e, [W.SHARED, n], t[n])
				}))
			})(e, n), r && _p.deleteIn(e, [r, "shared"])
		},
		ef = (e, t, n = !1) => {
			const {
				context: r,
				caseViewMode: a = (n ? void 0 : W.PERFORM_MODE),
				containerName: s
			} = t;
			s !== $s.WORKAREA && a && _p.setIn(e, [r, "context_data", "caseViewMode"], a)
		},
		tf = (e, t = []) => {
			t.forEach((t => _p.deleteIn(e, t)))
		},
		nf = (e, t = []) => {
			t.forEach((t => _p.deleteIn(e, t)))
		},
		rf = (e, t = []) => {
			t.forEach((t => {
				_p.deleteIn(e, t)
			}))
		},
		af = (e, t, n = {}) => {
			const {
				deleteAssignmentSpecificResources: r = !0,
				doDeleteConfirmationDetails: a = !0
			} = n;
			_p.deleteIn(e, [t, "nextAssignmentInfo"]), _p.deleteIn(e, [t, "caseInfo", "availableActions"]), _p.deleteIn(e, [t, "caseInfo", "availableProcesses"]), _p.deleteIn(e, [t, "caseInfo", "activeActionID"]), _p.deleteIn(e, [t, "caseInfo", "assignments"]), _p.deleteIn(e, [t, "caseInfo", "childCases"]), a && (_p.deleteIn(e, [t, "caseInfo", "confirmationLinks"]), _p.deleteIn(e, [t, "caseMessages"])), r && (_p.deleteIn(e, [t, "caseInfo", "actionButtons"]), _p.deleteIn(e, [t, "caseInfo", "navigation"]))
		},
		sf = (e = {}, t) => Vg(e, (e => {
			switch (t.type) {
				case Xe: {
					if (!t.payload.data || e[t.payload.context]) return e;
					t.payload.doDeleteCaseSummary && af(e, t.payload.context);
					const {
						target: n
					} = t.payload;
					return !n || -1 === n.indexOf(W.WORKAREA) && -1 === n.indexOf(W.MODAL) ? e[t.payload.containerItemID] = t.payload.data : e[t.payload.context] = t.payload.data, ef(e, t.payload), ((e, t) => {
						const {
							context: n
						} = t;
						_p.setIn(e, [n, "context_data", "actionType"], t.actionType), _p.setIn(e, [n, "context_data", "assignmentID"], t.assignmentID)
					})(e, t.payload), Zg(e, t.payload), ((e, t) => {
						const {
							context: n
						} = t;
						_p.deleteIn(e, [n, "context_data", "blocking_action_counter"]), _p.deleteIn(e, [n, "context_data", "deferred_action_queue"])
					})(e, t.payload), e
				}
				case st: {
					t.payload.doDeleteCaseSummary && af(e, t.payload.context, {
						deleteAssignmentSpecificResources: t.payload.deleteAssignmentSpecificResources
					});
					const {
						target: n
					} = t.payload;
					return !n || -1 === n.indexOf(W.WORKAREA) && -1 === n.indexOf(W.MODAL) ? e[t.payload.containerItemID] = yp(e[t.payload.containerItemID], t.payload.data) : e[t.payload.context] = yp(e[t.payload.context], t.payload.data), ef(e, t.payload), Zg(e, t.payload), nf(e, t.payload.suggestionContexts), e
				}
				case Je: {
					const {
						childContainersContexts: n = []
					} = t.payload;
					return ((e, t) => {
						const {
							containerItemID: n,
							context: r,
							deleteContext: a
						} = t;
						a && _p.deleteIn(e, [r]), _p.deleteIn(e, [n])
					})(e, t.payload), rf(e, n), tf(e, t.payload.transientItems), nf(e, t.payload.suggestionContexts), e
				}
				case Ke: {
					const {
						containerItems: n
					} = t.payload;
					return Array.isArray(n) ? n.forEach((t => {
						_p.deleteIn(e, [t])
					})) : _p.deleteIn(e, [n]), e
				}
				case ot: {
					const {
						context: n,
						contextToBeRemoved: r,
						data: a,
						childContainersContextsToBeRemoved: s
					} = t.payload;
					return af(e, t.payload.context), ef(e, t.payload), e[n] = yp(e[n], e[r]), e[n] = yp(e[n], a), _p.deleteIn(e, [r]), rf(e, s), Zg(e, t.payload), e
				}
				case it: {
					const {
						payload: {
							context: n,
							pulseReplace: r = !0,
							childContainersContexts: a = []
						}
					} = t;
					let {
						payload: {
							data: s
						}
					} = t;
					const o = _p.getIn(e[n], "pulse");
					let i = _p.getIn(e[n], "OperatorID"),
						c = _p.getIn(e[n], "pxRequestor");
					return c && s.pxRequestor && (c = _p.mergeDeep(c, s.pxRequestor)), i && s.OperatorID && (i = _p.mergeDeep(i, s.OperatorID)), !r && o && (s = mp(s, "pulse", o), s = mp(s, "OperatorID", i), s = mp(s, "pxRequestor", c)), _p.setIn(e, n, s), ef(e, t.payload), Zg(e, t.payload), rf(e, a), tf(e, t.payload.transientItems), nf(e, t.payload.suggestionContexts), e
				}
				case Nt: {
					const {
						context: n,
						doDeleteConfirmationDetails: r = !0
					} = t.payload;
					return af(e, n, {
						doDeleteConfirmationDetails: r
					}), e
				}
				case Qe: {
					const {
						transientItemID: n,
						data: r
					} = t.payload;
					return _p.setIn(e, n, r)
				}
				case et:
				case tt: {
					const {
						transientItems: n
					} = t.payload;
					return n.forEach((t => _p.deleteIn(e, t))), e
				}
				case Ze:
				case nt: {
					const {
						transientItemID: n,
						data: r
					} = t.payload;
					return yp(_p.getIn(e, n), r), e
				}
				case rt: {
					const {
						transientItemID: n,
						data: r
					} = t.payload;
					for (const t in r) Object.prototype.hasOwnProperty.call(r, t) && _p.deleteIn(e, [n, t]);
					return e
				}
				case Le: {
					const {
						key: n,
						value: r
					} = t.payload;
					return _p.setIn(e, `${W.SHARED}.${n}`, r), e
				}
				case lt: {
					const {
						context: n,
						data: r
					} = t.payload;
					return _p.setIn(e, n, r)
				}
				default:
					return e
			}
		})),
		of = (e, t) => Vg(e, (e => {
			switch (t.type) {
				case Be:
					return e[t.payload.context] = yp(e[t.payload.context], t.payload.data, {
						isArrayDeepMerge: t.payload.isArrayDeepMerge
					}), ef(e, t.payload, !0), Zg(e, t.payload), e;
				case Pe: {
					const {
						context: n,
						reference: r,
						value: a,
						isArrayDeepMerge: s
					} = t.payload;
					return mp(e[n], r, a, {
						isArrayDeepMerge: s
					}), e
				}
				case Oe: {
					const {
						context: n,
						reference: r,
						value: a
					} = t.payload;
					return Ip(e[n], r, a), e
				}
				case He:
					return gp(e[t.payload.context], t.payload.reference), e;
				case we:
					return _p.setIn(e[t.payload.context], "context_data.isLoading", !0), e;
				case Me:
					return _p.setIn(e[t.payload.context], "context_data.isLoading", !1), e;
				case Ot: {
					const {
						data: n
					} = t.payload;
					return Zg(e, {
						data: {
							shared: n
						}
					}), e
				}
				case Tt: {
					const {
						dataPagesToBeRemoved: n = []
					} = t.payload;
					return n.forEach((t => {
						const {
							dataPageName: n,
							dataPageNameWithHash: r
						} = t;
						_p.deleteIn(e.shared, [n, r]);
						const a = _p.getIn(e.shared, [n]);
						a && 0 === Object.keys(a).length && _p.deleteIn(e.shared, [n])
					})), e
				}
				case Rt: {
					const n = _p.getIn(e[t.payload.context].context_data, "blocking_action_counter", 0);
					return t.payload.isInitiateBlockingAction ? _p.setIn(e[t.payload.context].context_data, "blocking_action_counter", n + 1) : _p.setIn(e[t.payload.context].context_data, "blocking_action_counter", n - 1), e
				}
				default:
					return e
			}
		})),
		cf = /\[(\d+)\]$/gi,
		df = /(\d+)/gi,
		lf = /\[.\]$/gi,
		uf = (e, t, n, r = [W.CONTEXT_DATA, W.CASE_INFO.CASE_INFO, W.CONTENT]) => {
			const a = _p.getIn(t, r);
			if (a) {
				const t = er(a, [], []);
				for (const a of t) _p.setIn(e[n], [...r, ...a], {})
			}
		},
		pf = (e, t, n, r) => {
			const {
				property: a,
				pageReference: s,
				category: o,
				type: i
			} = r.payload, c = _p.getIn(e[t], n);
			if (c && o === W.CASEMESSAGES) _p.setIn(e[t], zn(a, s, o), "");
			else if (c && c.length > 0 && Array.isArray(c)) {
				const r = c.filter((e => e.type !== i));
				n && n.length > 0 && _p.setIn(e[t], zn(a, s, o), r)
			}
		};
	const hf = (e, t, n) => {
		n.forEach((n => {
			((e, t, n) => {
				const r = n[W.ERROR_FIELD_IN_PAGE].slice(1),
					a = n[W.ERROR_IN_PAGE_IDENTIFIER].slice(1);
				if (a) {
					let s = r ? `caseInfo.content.${r}` : "caseInfo.content";
					s = s.replace(/\(/g, "[").replace(/\)/g, "]");
					const o = zn(a, s, W.PROPERTY),
						i = _p.getIn(e[t], `${s}.classID`),
						c = wu(a, i),
						d = {
							type: H.MESSAGES.MESSAGES_TYPE_ERROR,
							message: n.localizedValue,
							fieldLabel: c?.label
						},
						l = _p.getIn(e[t], o, []);
					if (_p.isContains(l, d)) return;
					_p.setIn(e[t], o, [...l, d])
				}
			})(e, t, n)
		}))
	};

	function gf(e, t) {
		const {
			err: n,
			formFields: r
		} = t.payload;
		let {
			context: a
		} = t.payload;
		const {
			fieldErrors: s,
			pageErrors: o
		} = ss(n.errorDetails, r);
		if (_p.setIn(e, [a, ...qn.FIELD_MESSAGES_PATH], {}), _p.setIn(e, [a, ...qn.PAGE_MESSAGES_PATH], []), s.forEach((t => {
				if (t[W.ERROR_FIELD_IN_PAGE]) {
					const n = t[W.ERROR_FIELD_IN_PAGE].slice(1);
					if (n) {
						const t = function(e) {
							let t = null;
							const n = e.lastIndexOf(".");
							return n < 0 ? null : (t = e.substring(0, n), t ? `caseInfo.content.${t}`.replace(/\(/g, "[").replace(/\)/g, "]") : t)
						}(n);
						if (!t) return !1;
						const r = n.substring(n.lastIndexOf(".") + 1),
							s = zn(r, t, W.PROPERTY);
						_p.setIn(e, [a, ...s], [])
					}
				}
			})), s.length > 0 && hf(e, a, s), o.length > 0) {
			const t = (e => {
				const t = [];
				return e.forEach((e => {
					t.push({
						type: H.MESSAGES.MESSAGES_TYPE_ERROR,
						message: e.localizedValue
					})
				})), t
			})(o);
			e[a] || (a = W.APP.APP), _p.setIn(e, [a, ...qn.PAGE_MESSAGES_PATH], t)
		} else a.includes && a.includes($s.WORKAREA) && (a = Ie(a)), _p.deleteIn(e, [a, ...qn.PAGE_MESSAGES_PATH]);
		return e
	}
	const ff = (e = Cf().data, t) => Vg(e, (e => {
			switch (t.type) {
				case ze:
					return t.payload.err.errorDetails && "Validation fail" === t.payload.err.errorClassification ? gf(e, t) : e;
				case st: {
					const {
						context: n
					} = t.payload, r = [n, ...qn.FIELD_MESSAGES_PATH], a = [n, ...qn.PAGE_MESSAGES_PATH];
					if (_p.setIn(e, r, {}), _p.setIn(e, a, []), n && n.includes($s.WORKAREA)) {
						const t = [$e(n), ...qn.PAGE_MESSAGES_PATH];
						_p.setIn(e, t, [])
					}
					return e
				}
				case $t: {
					const {
						isListEntry: n
					} = t.payload;
					return n ? ((e, t) => {
						const {
							property: n,
							pageReference: r,
							category: a,
							isListEntry: s,
							deletingIndex: o,
							stateObj: i
						} = t.payload, {
							context: c
						} = t.payload;
						if (i) return uf(e, i, c), e;
						const d = zn(n, r, a, s);
						if (Number.isInteger(o)) {
							_p.deleteIn(e[c], d);
							const t = d.slice(0, d.length - 1);
							let n = _p.getIn(e[c], t) || {};
							const r = Object.keys(n);
							n = r.map((e => n[e])), n.forEach(((n, a) => {
								const s = r[a].match(cf);
								if (s?.length) {
									const i = parseInt(s[0].match(df)[0], 10);
									i > o && (_p.deleteIn(e[c], t.concat(r[a])), _p.setIn(e[c], t.concat(r[a].replace(lf, `[${i-1}]`)), n))
								}
							}))
						} else _p.setIn(e[c], d, {});
						return e
					})(e, t) : ((e, t) => {
						const {
							property: n,
							pageReference: r,
							category: a,
							isListEntry: s,
							stateObj: o
						} = t.payload, {
							context: i
						} = t.payload;
						let c = i;
						if (o) return uf(e, o, i), e;
						const d = zn(n, r, a, s);
						return a === W.PAGE && i?.includes($s.WORKAREA) && (c = Ie(i)), pf(e, c, d, t), pf(e, i, d, t), e
					})(e, t)
				}
				case Ct: {
					const {
						messages: n,
						property: r,
						pageReference: a,
						context: s,
						category: o
					} = t.payload, i = zn(r, a, o);
					return n && n.length > 0 && Array.isArray(n) && i && i.length > 0 && _p.setIn(e[s], zn(r, a, o), n), e
				}
				default:
					return e
			}
		})),
		yf = (e, t) => Vg(e, (e => {
			if (t.type === vt) {
				const {
					instruction: n,
					actions: r,
					context: a,
					referenceList: s,
					listIndex: o,
					listMoveToIndex: i,
					content: c = {}
				} = t.payload, d = rp(s);
				switch (n) {
					case W.LIST_ACTIONS.INSERT:
						((e, t, n, r, a) => {
							_p.setIn(e[t], [...n, r], a)
						})(e, a, d, o, c);
						break;
					case W.LIST_ACTIONS.UPDATE:
						((e, t, n, r, a) => {
							const s = yp(_p.getIn(e[t], [...n, r], {}), a);
							_p.setIn(e[t], [...n, r], s)
						})(e, a, d, o, c);
						break;
					case W.LIST_ACTIONS.DELETE:
						((e, t, n, r) => {
							const a = _p.getIn(e[t], n, []);
							a.splice(r, 1), _p.setIn(e[t], n, a)
						})(e, a, d, o);
						break;
					case W.LIST_ACTIONS.MOVE:
						((e, t, n, r, a) => {
							const s = _p.getIn(e[t], [...n, r], {}),
								o = _p.getIn(e[t], n, []);
							o.splice(r, 1), o.splice(a, 0, s), _p.setIn(e[t], n, o), Xn(e, t, n?.join("."), r, a)
						})(e, a, d, o, i);
						break;
					case W.LIST_ACTIONS_TYPE.SELECT_DESELECT:
						((e, t, n, r) => {
							const a = _p.getIn(e[t], n) || [];
							r.forEach((e => {
								const {
									instruction: r,
									content: s,
									listIndex: o
								} = e;
								if (r === W.LIST_ACTIONS.SELECT) {
									a[o] = s;
									const e = n?.join(".");
									Er(t, e)
								} else delete a[o]
							})), _p.setIn(e[t], n, a.filter(Boolean))
						})(e, a, d, r);
						break;
					case W.LIST_ACTIONS_TYPE.DESELECT_ALL:
						((e, t, n) => {
							_p.setIn(e[t], n, [])
						})(e, a, d)
				}
			}
			return e
		})),
		mf = [of, sf, ff, yf],
		If = (e = Cf().data, t) => t.type === bt ? Cf().data : (mf.forEach((n => {
			e = n(e, t)
		})), e),
		Ef = (e, t = []) => {
			t.forEach((t => {
				_p.deleteIn(e, [t])
			}))
		},
		Af = (e, t) => {
			const {
				type: n,
				payload: r
			} = t, a = n === st, {
				target: s,
				context: o,
				semanticURL: i = "",
				root: c,
				containerItemID: d,
				childContainers: l,
				flowName: u,
				resourceType: p = "",
				key: h = "",
				clearView: g = !1
			} = r;
			return c ? _p.setIn(e, [s, "items", d, "view"], c) : g && _p.deleteIn(e, [s, "items", d, "view"]), o && _p.setIn(e, [s, "items", d, "context"], o), u && _p.setIn(e, [s, "items", d, "flowName"], u), (!a || a && h) && _p.setIn(e, [s, "items", d, "key"], h.trim()), (!a || a && i) && _p.setIn(e, [s, "items", d, "semanticURL"], i), (!a || a && p) && _p.setIn(e, [s, "items", d, "resourceType"], p), Ef(e, l), e
		},
		_f = (e = Cf().containers, t) => t.type === bt ? Cf().containers : Vg(e, (e => {
			switch (t.type) {
				case Ye: {
					const {
						context: n,
						name: r,
						type: a,
						actionMgrID: s
					} = t.payload, o = `${n}/${r}`;
					let i = null;
					return vn.resolveActionByID(s, null, !1), e[o] ? e : (i = {
						type: a,
						accessedOrder: [],
						items: {}
					}, _p.setIn(e, [o], i), e)
				}
				case dt: {
					const {
						containerName: n,
						childContainers: r = []
					} = t.payload;
					return _p.deleteIn(e, [n]), r.forEach((t => {
						_p.deleteIn(e, [t])
					})), e
				}
				case Ke: {
					const {
						context: n,
						name: r,
						actionMgrID: a,
						childContainers: s
					} = t.payload, o = `${n}/${r}`;
					return vn.resolveActionByID(a, null, !1), _p.setIn(e, [o, "accessedOrder"], []), _p.setIn(e, [o, "items"], {}), Array.isArray(s) && s.forEach((t => {
						_p.deleteIn(e, [t])
					})), e
				}
				case Xe: {
					const {
						target: n,
						context: r,
						isInCreateStage: a,
						isBulkAction: s,
						semanticURL: o,
						root: i,
						containerItemID: c,
						actionMgrID: d,
						key: l,
						flowName: u,
						resourceType: p,
						actionName: h,
						isMinimizable: g,
						showProgress: f,
						progressMessage: y,
						modalOptions: m,
						resourceStatus: I,
						isMultiRecordData: E,
						acTertiary: A,
						parentContext: _
					} = t.payload, S = e[n], C = S && S.type, $ = S && S.accessedOrder || [], b = S && S.items || {};
					let P = null;
					return e[n] && "single" === C && $.length > 0 ? Af(e, t) : (P = {
						accessedOrder: [...$, c],
						items: {
							...b,
							[c]: {
								view: i,
								semanticURL: o,
								key: l,
								flowName: u,
								context: r,
								isInCreateStage: a,
								resourceType: p,
								actionName: h,
								isMinimizable: g,
								...s && {
									isBulkAction: s
								},
								showProgress: f,
								progressMessage: y,
								modalOptions: m,
								resourceStatus: I,
								...A && {
									acTertiary: A
								},
								...E && {
									isMultiRecordData: E
								},
								..._ && {
									parentContext: _
								}
							}
						}
					}, vn.resolveActionByID(d, null, !1), e[n] = w()(e[n], P), e)
				}
				case st: {
					const {
						actionMgrID: n,
						data: r
					} = t.payload;
					let a = e;
					try {
						a = Af(e, t), vn.resolveActionByID(n, r, !1)
					} catch {
						vn.rejectActionByID(n, !1)
					}
					return a
				}
				case it:
					return ((e, t) => {
						const {
							actionMgrID: n,
							data: r,
							target: a,
							containerItemID: s
						} = t.payload;
						let o = e;
						try {
							_p.setIn(e, [a, "items", s, "transientItems"], []), o = Af(e, t), vn.resolveActionByID(n, r, !1)
						} catch {
							vn.rejectActionByID(n, !1)
						}
						return o
					})(e, t);
				case at: {
					const {
						target: n,
						containerItemID: r,
						actionMgrID: a
					} = t.payload;
					try {
						const t = _p.getIn(e, [n, "accessedOrder"]).filter((e => e !== r));
						t.push(r), _p.setIn(e, [n, "accessedOrder"], t), vn.resolveActionByID(a, null, !1)
					} catch {
						vn.rejectActionByID(a, !1)
					}
					return e
				}
				case ot:
				case Je: {
					const {
						target: n,
						containerItemID: r,
						actionMgrID: a,
						childContainers: s
					} = t.payload;
					try {
						const t = _p.getIn(e, [n, "accessedOrder"]).filter((e => e !== r));
						_p.setIn(e, [n, "accessedOrder"], t), _p.deleteIn(e, [n, "items", r]), Ef(e, s), vn.resolveActionByID(a, null, !1)
					} catch {
						vn.rejectActionByID(a, !1)
					}
					return e
				}
				case Qe: {
					const {
						transientItemID: n,
						target: r,
						contextName: a
					} = t.payload, s = _p.getIn(e, [r, "items", a, "transientItems"]) ?? [];
					return _p.setIn(e, [r, "items", a, "transientItems"], [...s, n])
				}
				case tt: {
					const {
						target: n,
						containerItemID: r
					} = t.payload;
					return _p.deleteIn(e, [n, "items", r, "transientItems"]), e
				}
				case et: {
					const {
						target: n,
						transientItemID: r,
						containerItemID: a
					} = t.payload, s = (_p.getIn(e, [n, "items", a, "transientItems"]) ?? []).filter((e => e !== r));
					return _p.setIn(e, [n, "items", a, "transientItems"], s)
				}
				default:
					return e
			}
		}));
	let Sf = {};
	const Cf = () => Sf,
		$f = e => ((e => {
			const t = e.Data || e.data,
				{
					uiResources: n = {}
				} = e,
				r = n[W.CONTEXT_DATA] || e[W.CONTEXT_DATA];
			Sf = {
				data: {
					[W.APP.APP]: {
						...t,
						[W.CONTEXT_DATA]: r
					}
				},
				containers: {}
			}
		})(e), Uh({
			data: If,
			containers: _f
		}));

	function bf() {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		var n = kl(e),
			r = function(e, t) {
				return "number" == typeof Fl(e) ? e.pop() : t
			}(e, 1 / 0),
			a = e;
		return a.length ? 1 === a.length ? jd(a[0]) : function(e) {
			return void 0 === e && (e = 1 / 0), jl(Pd, e)
		}(r)(zd(a, n)) : Bl
	}
	const Pf = (e, t) => {
			if (e.confirmationLinks && (e.data.caseInfo.confirmationLinks = e.confirmationLinks), !e.uiResources && e.confirmationNote) {
				let t = e;
				const {
					confirmationNote: n
				} = t;
				return t = ((e, t) => {
					const n = [e];
					return t.data.caseMessages = n, t
				})(n, t), t
			}
			if (!e.uiResources || !e.data || !e?.uiResources?.root) return e;
			const n = e,
				{
					uiResources: {
						actionButtons: r,
						navigation: a
					},
					nextAssignmentInfo: s
				} = n;
			if (n.data && n.data.caseInfo) {
				r && (n.data.caseInfo.actionButtons = r), a && (n.data.caseInfo.navigation = a), t && t[H.ACTIONS.DELETEAVIALACTIONS] && delete n.data.caseInfo.availableActions;
				const {
					assignments: s,
					availableActions: o = []
				} = n.data.caseInfo;
				if (s && Array.isArray(s) && s.length > 0 && s[0].actions && Array.isArray(s[0].actions) && (!t || !t[H.STOPMERGEACTIONS])) {
					s[0].actions.forEach((e => {
						"Assignment" !== e.type && "LocalAction" !== e.type || o.push(e)
					})), n.data.caseInfo.availableActions = o
				}
				if (e.confirmationNote) {
					const {
						confirmationNote: e
					} = n, t = [e];
					n.data.caseMessages = t
				}
			}
			return t && t.isCreateDataObject && (n.data.dataInfo = {}, n.data.dataInfo.content = n.data.pyPortal, n.uiResources.root.config.context = "dataInfo.content", n.uiResources.context_data.dataInfo = n.uiResources.context_data.dataInfo ?? {}, n.uiResources.context_data.dataInfo.content = n.uiResources.context_data.dataInfo.content ?? {}, n.uiResources.context_data.dataInfo.content = n.uiResources.context_data?.pyPortal, delete n.data.pyPortal, delete n.key), s && (n.data.nextAssignmentInfo = s), n
		},
		Of = {},
		Tf = (e, t) => {
			const {
				context: n
			} = e;
			e.reqHeaders && e.reqHeaders.etag && (e.headers = {
				"if-match": e.reqHeaders.etag
			});
			const r = (e => {
				const {
					ID: t,
					actionID: n,
					context: r
				} = e;
				return `${t}.${r}.${n}`
			})(t);
			if ((e => dl[e])(r) > 0 && Of[r]) {
				const t = [];
				Of[r].forEach(((n, r) => {
					n.url === e.url && (t.push(r), n.cancelConfig.cancel())
				})), t.forEach((e => {
					Of[r].splice(e, 1)
				}))
			}
			const a = El();
			return e.signal = a.token, e.cancelConfig = a, Of[r] ? Of[r].push(e) : Of[r] = [e], yl(e.url, e, n, {
				cancelContext: r
			}).then((e => (delete Of[r], e))).catch((e => {
				throw e && "ERR_CANCELED" !== e.code && delete Of[r], e
			}))
		},
		vf = [(e, t) => e.pipe(wl(Nn.REFRESH_DATA, Ut), Ll((e => e.payload)), jl((e => {
			const {
				context: n,
				caseWideAction: r,
				contextData: a,
				caseViewAction: s,
				interestPage: o,
				options: i
			} = e;
			let c = {};
			const {
				propertyName: d = "",
				classID: l = ""
			} = i, u = es(n, {
				skipUUID: !1
			}), p = _p.getPropertyName(d), h = p ? p.split(".") : [], g = h.pop(), f = h.join("."), y = [];
			if (f) {
				const e = wu(f, l);
				if (e && "copy" === e.dataRetrievalType) {
					const e = _p.getIn(u, `content.content.${f}`) || {};
					if (Object.keys(e).length > 0) {
						Object.keys(e).filter((e => e !== g)).forEach((t => {
							delete e[t], y.push(`${f}`)
						}))
					}
				}
			}
			e.serverPrecedenceFields = y;
			let m = {
				...u.content,
				contextData: a
			};
			const I = Es(n);
			_p.isEmpty(I) || (m = Is(I, m)), r ? c = Eh("refreshCaseData", e) : s ? (c = Eh("refreshCaseView", e), m.interestPage = o) : c = Eh("refreshAssignmentData", e), Zl.registerBlockingAction(n).catch((() => {}));
			const {
				restApi: E
			} = c, {
				reqType: A
			} = c, _ = t.value.data[n]?.caseInfo?.headers, S = {
				body: m,
				reqHeaders: _,
				context: n,
				method: A,
				url: kn(e, E)
			};
			return zd(Tf(S, e)).pipe(Ll((t => ({
				response: {
					...t.data || {}
				},
				actionConfig: e,
				actionMgrID: e.options.actionMgrID,
				headers: Za(t.headers)
			}))), zl(": Error ocurred during fetch call at refreshData Epic : ", e.context, e?.options?.actionMgrID))
		})), jl((async e => {
			if (e && e.type === ze) return Zl.deRegisterBlockingAction(e.payload?.context).catch((() => {})), os(e);
			const {
				actionConfig: t,
				response: n,
				headers: r,
				actionMgrID: a
			} = e, {
				context: s,
				serverPrecedenceFields: o
			} = t, i = ba.getTargetViewContainerName(ut), c = Ft(i, s), d = {
				acName: c,
				context: s
			}, l = Pf(n, {
				[H.STOPMERGEACTIONS]: !0,
				[H.ACTIONS.DELETEAVIALACTIONS]: !0
			});
			l.directUrlUpdation = !1, await ns(l, t, d);
			const u = ts(l, {
				target: c,
				context: s
			});
			u.preserveClientChanges = void 0 === t.options.preserveClientChanges || t.options.preserveClientChanges;
			const p = eh(Np, u, {
				serverPrecedenceFields: o
			});
			return Fr.registerForServerChanges(), op(p), vn.resolveActionByID(a, u), Fr.unRegisterForServerChanges(), Zl.deRegisterBlockingAction(s).catch((() => {})), []
		})))],
		Nf = vf,
		Rf = [e => e.pipe(wl(Pt), jl((async e => {
			const {
				context: t
			} = e.payload, n = {}, r = {}, a = Object.keys(e.payload.datapages).map((a => {
				const s = e.payload.datapages[a];
				if (s.mode === W.READONLY && s?.refreshStrategy) {
					const {
						timeoutSecs: e = "",
						type: t = ""
					} = s?.refreshStrategy || {}, n = cp()[s.name];
					if (n && a in n) {
						const r = n[a],
							{
								loadTime: s
							} = r;
						if (!Gg.isTimeElapsed(s, e, t)) return
					}
				}
				return Gg.getData(s.name, {
					dataViewParameters: s.dataViewParameters
				}, t).then((e => {
					const t = s.mode === W.READONLY ? r : n;
					t[s.name] ? t[s.name][a] = {
						pxResults: e.data.data,
						parameters: s.dataViewParameters,
						loadTime: e.data?.fetchDateTime
					} : t[s.name] = {
						[a]: {
							pxResults: e.data.data,
							parameters: s.dataViewParameters,
							loadTime: e.data?.fetchDateTime
						}
					}
				})).catch((() => {}))
			}));
			await Promise.allSettled(a);
			const s = [];
			return Object.keys(n).length && s.push(Np({
				context: t,
				data: n
			})), Object.keys(r).length && s.push(nh({
				data: r,
				context: t
			})), op(s), []
		})))],
		Df = Rf;
	class xf {
		static OPEN_ASSIGNMENT_ACTION = "openAssignment";
		static DIRTY_POPUP_C11N = "displayDirtyPopupFromConstellation";
		static HANDLE_INFINITY_DISCARD = "handleDiscardInInfinity";
		static OPEN_ASSIGNMENT_MODAL = "openAssignmentInModal";
		static DISPLAY_DIRTY_POPUP = "displayDirtyPopup";
		static LOAD_PREVIEW = "loadPreview";
		static UPDATE_COEXISTENCE_DRILLDOWN_CASE = "updateCoexistenceDrilldownCase";
		static OPEN_WORK_ITEM = "openWorkItem";
		static OPEN_WORK_BY_HANDLE = "openWorkByHandle";
		static GET_NEXT_WORK_ACTION = "getNextWork";
		static CLOSE_CONTAINER_ACTION = "closeContainer";
		constructor() {
			this.broadcastChannel = null, this.callback = null, this.isReverseCoexistenceCase = !1, this.broadcastEventToIframe = !1, this.isDirtyDialogActive = !1, this.onCreateCallback = null, this.openAssignmentParams = null
		}
		getGlobalObject = () => n.g;
		getUniqueId = () => this.getGlobalObject().uniqueId;
		setUniqueId = () => {
			this.getGlobalObject().uniqueId = (new Date).getTime()
		};
		initBroadcastChannel = () => {
			this.setUniqueId(), this.broadcastChannel = new BroadcastChannel("coexistence"), this.broadcastChannel.onmessage = e => {
				switch (e.data.action) {
					case xf.DISPLAY_DIRTY_POPUP:
						this.broadcastEventToIframe = e.data.fromInfinity, this.isDirtyDialogActive || (e.data.isFormDirty ? (Ta.publish(W.PUB_SUB_EVENTS.EVENT_SHOW_CANCEL_ALERT, {
							isModalAction: !0,
							hideDelete: !0
						}), this.isDirtyDialogActive = !0) : this.callback?.call(this));
						break;
					case xf.LOAD_PREVIEW:
						this.loadPreview(e);
						break;
					case xf.UPDATE_COEXISTENCE_DRILLDOWN_CASE:
						this.updateCoexistenceDrilldownCase(e);
						break;
					case xf.OPEN_ASSIGNMENT_ACTION:
						this.openAssignment(e);
						break;
					case xf.GET_NEXT_WORK_ACTION:
						this.getNextWork(e);
						break;
					case xf.OPEN_WORK_BY_HANDLE:
						this.openWorkByHandle(e);
						break;
					case xf.CLOSE_CONTAINER_ACTION:
						this.closeContainer(e)
				}
			}
		};
		loadPreview = e => {
			const {
				pyID: t,
				caseClassName: n,
				uniqueId: r
			} = e.data;
			if (r === this.getUniqueId()) {
				yu({}).getPConnect().getActionsApi().showCasePreview(t, {
					caseClassName: n
				})
			}
		};
		closeContainer = e => {
			const {
				uniqueId: t
			} = e.data;
			if (t !== this.getUniqueId()) return;
			const n = yu({
					isRoot: !0
				}),
				r = PCore.getStore().getState().data.app?.pyPortal?.pyPrimaryNavPages;
			let a;
			Array.isArray(r) && r[0] && (a = r[0]);
			const s = a?.pyClassName || "Data-Portal",
				o = a?.pyRuleName || "pyHome";
			n.getPConnect().getActionsApi().showPage(o, s)
		};
		updateCoexistenceDrilldownCase = e => {
			const {
				key: t,
				caseClassName: n,
				actionApi: r,
				caseLabel: a
			} = e.data;
			let s = r;
			r === xf.OPEN_WORK_ITEM && (s = xf.OPEN_WORK_BY_HANDLE);
			const o = mh(s, {
					caseClassName: n
				}, void 0).replace(/{.+?}/, Ua(t)),
				i = `${H.APP.APP}${W.FORWARD_SLASH_STRING}${H.PRIMARY}`;
			(e => {
				Ch(e)
			})({
				semanticURL: o,
				directUrlUpdation: !0,
				options: {
					acName: i,
					context: Fs(i)
				}
			});
			const c = n.substring(n.lastIndexOf("-") + 1),
				d = t.substring(t.lastIndexOf(" ") + 1),
				l = PCore.getEnvironmentInfo().environmentInfoObject.pxApplication.pyLabel;
			Rh(`${c} (${d}) - ${l}`);
			yu({}).getPConnect().getActionsApi().updateRecents(n, d, a, t)
		};
		openAssignment = e => {
			const {
				pzInsKey: t,
				uniqueId: n
			} = e.data;
			n === this.getUniqueId() && (this.onCreateCallback && this.openAssignmentParams && (t ? this.openAssignmentParams[0].payload.data.caseInfo.assignments[0].ID = t : this.openAssignmentParams[0].payload.data.caseInfo.content.coexistenceAction = "openWorkByHandle", this.onCreateCallback.call(this, this.openAssignmentParams)), this.onCreateCallback = null, this.openAssignmentParams = null)
		};
		getNextWork = e => {
			const {
				uniqueId: t
			} = e.data;
			if (t === this.getUniqueId()) {
				const e = `${H.APP.APP}${W.FORWARD_SLASH_STRING}${H.PRIMARY}`;
				yu({
					meta: {},
					options: {
						context: Fs(e)
					}
				}).getPConnect().getActionsApi().getNextWork()
			}
		};
		openWorkByHandle = e => {
			const {
				key: t,
				caseClassName: n,
				uniqueId: r
			} = e.data;
			if (r === this.getUniqueId()) {
				const e = `${H.APP.APP}${W.FORWARD_SLASH_STRING}${H.PRIMARY}`;
				yu({
					meta: {},
					options: {
						context: Fs(e)
					}
				}).getPConnect().getActionsApi().openWorkByHandle(t, n)
			}
		};
		destroyBroadcastChannel = () => {
			this.getBroadCastChannel()?.close(), this.broadcastChannel = null
		};
		subscribeEvents = () => {
			this.setReverseCoexistenceCaseLoaded(!0), Ta.subscribe(H.PUB_SUB_EVENTS.REVERSE_COEXISTENCE_EVENTS.HANDLE_DISCARD, this.handleDiscard), Ta.subscribe(H.PUB_SUB_EVENTS.REVERSE_COEXISTENCE_EVENTS.CHECK_IS_FORM_DIRTY, this.postDirtyPopupMessage)
		};
		unsubscribeEvents = () => {
			Ta.unsubscribeAllWithEventType(H.PUB_SUB_EVENTS.REVERSE_COEXISTENCE_EVENTS.CHECK_IS_FORM_DIRTY), Ta.unsubscribeAllWithEventType(H.PUB_SUB_EVENTS.REVERSE_COEXISTENCE_EVENTS.HANDLE_DISCARD), this.setReverseCoexistenceCaseLoaded(!1), this.isDirtyDialogActive = !1
		};
		init = (e = !0) => {
			null === this.broadcastChannel && this.initBroadcastChannel(), e && this.subscribeEvents()
		};
		destroy = () => {
			this.destroyBroadcastChannel(), this.unsubscribeEvents()
		};
		setCallBackFunction = e => {
			this.callback = e
		};
		setReverseCoexistenceCaseLoaded = e => {
			this.isReverseCoexistenceCase = e
		};
		setIsDirtyDialogActive = e => {
			this.isDirtyDialogActive = e
		};
		getBroadCastChannel = () => this.broadcastChannel;
		getCallBackFunction = () => this.callback;
		isReverseCoexistenceCaseLoaded = () => this.isReverseCoexistenceCase;
		postDirtyPopupMessage = ({
			callBackFunction: e
		}) => {
			this.broadcastChannel?.postMessage({
				action: xf.DIRTY_POPUP_C11N,
				uniqueId: this.getUniqueId()
			}), this.setCallBackFunction(e)
		};
		handleDiscard = () => {
			this.broadcastEventToIframe ? (this.broadcastChannel?.postMessage({
				action: xf.HANDLE_INFINITY_DISCARD,
				uniqueId: this.getUniqueId()
			}), this.broadcastEventToIframe = !1) : (this.callback?.call(this), this.callback = null), this.isDirtyDialogActive = !1
		};
		postCreateCaseMessage = (e, t, n) => {
			null === this.broadcastChannel && this.init(!1), this.broadcastChannel?.postMessage({
				action: xf.OPEN_ASSIGNMENT_MODAL,
				uniqueId: this.getUniqueId(),
				key: e
			}), this.broadcastEventToIframe = !1, this.onCreateCallback = t, this.openAssignmentParams = n
		}
	}
	const wf = new xf,
		Mf = "nextAssignmentInfo",
		Lf = "nextAssignmentInfo.context",
		jf = e => {
			const {
				containerName: t,
				isInCreateStage: n
			} = e;
			return n ? W.MODAL : t || ba.getTargetViewContainerName(mt)
		},
		Uf = e => {
			const t = _p.getIn(e, [W.DATA, W.CASE_INFO.CASE_INFO]);
			return An(t) && _n(ae.getOperatorIdentifier(), t)
		},
		Ff = () => ({
			registerHeader: (...e) => il.registerHeader(...e),
			unRegisterHeader: (...e) => il.unRegisterHeader(...e),
			getRegisteredHeaders: () => il.getRegisteredHeaders()
		}),
		kf = (e, {
			body: t = {},
			queryPayload: n = {},
			cancelTokenSource: r,
			headers: a = {},
			responseType: s
		}, o) => {
			const {
				restApi: i,
				reqType: c
			} = Eh(e, n), d = {
				method: c,
				headers: a,
				body: t,
				...s && {
					responseType: s
				}
			};
			return r && (d.signal = r.token), yl(i, d, o)
		},
		Vf = (e, {
			method: t = "GET",
			body: n = {},
			headers: r = {},
			withoutDefaultHeaders: a = !1
		}, s) => {
			e.startsWith("http:") || e.startsWith("https:") || (e = A() + e);
			return yl(e, {
				method: t,
				headers: r,
				body: n,
				withoutDefaultHeaders: a
			}, s)
		},
		Gf = e => te.doesRestApiExist(e),
		Bf = () => El(),
		Hf = e => Al(e),
		Wf = e => {
			fl(e)
		},
		qf = () => zf;
	const zf = class {
			static createCase(e, t) {
				const {
					caseInfo: n,
					startingFields: r,
					flowType: a,
					viewType: s = Ja.PAGE,
					pageName: o,
					context: i = W.APP.APP,
					debugInfo: c,
					headers: d
				} = t;
				let l = {};
				n && n.content && (l = n.content);
				const u = {
					caseTypeID: e,
					content: {
						...l,
						...r
					},
					processID: a
				};
				return kf("createWork", {
					body: u,
					queryPayload: {
						caseClassName: e,
						viewType: s,
						params: {
							pageName: o
						}
					},
					headers: {
						...d,
						...c && {
							...il.addDebugHeaders(c)
						}
					}
				}, i).then((t => ({
					response: t.data,
					requestPayload: u,
					headers: Za(t.headers, e, d)
				})))
			}
		},
		Yf = (e, t) => {
			const {
				class: n,
				context: r,
				viewType: a = Ja.PAGE
			} = e, {
				removeActionPayload: s
			} = t;
			let o = e?.pageName ? e?.pageName : ae.getDefaultCasePage();
			return e.isTraditionalUICase && (o = "pyDetails"), zd(zf.createCase(n, {
				...e,
				pageName: o,
				viewType: a,
				context: r
			})).pipe(Ll((({
				response: t,
				headers: n
			}) => ({
				response: t,
				actionInPayload: e,
				headers: n,
				removeActionPayload: s
			}))), zl("Error ocurred during ajax call at createWork Epic : ", r))
		},
		Kf = e => {
			Ta.publish(W.PUB_SUB_EVENTS.DISPLAY_CASE_CREATED_TOASTER, e)
		},
		Xf = e => {
			Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CREATE_STAGE_DONE, e)
		},
		Jf = e => {
			let t = 0,
				n = [],
				r = "",
				a = !1;
			return e.pipe(wl(Op), Yl(100), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					context: n
				} = e, r = jf(e), s = Ft(r, n), {
					continueExecution: o,
					removeActionPayload: i
				} = (e => Hs(e) ? {
					continueExecution: !0,
					removeActionPayload: {}
				} : us(e))(s);
				return a = Ya(e.class), o ? (e.isTraditionalUICase = a, Yf(e, {
					removeActionPayload: i
				})) : (vn.rejectActionByID(t), Hl())
			})), jl((async e => {
				if (e && e.type === ze) return e.payload.context = ho(), n.push(os(e)), n;
				const {
					actionInPayload: s,
					response: o,
					headers: i,
					removeActionPayload: c
				} = e;
				let d;
				d = !(s.renderInline || ae.getDefaultCasePage() || a) && Uf(o), _p.setIn(o.data, "caseInfo.isFirstAssignment", !0);
				const l = jf({
						...s,
						isInCreateStage: d
					}),
					u = Ft(l, s.context),
					p = cs(u, l, s.context);
				if (!wa(l) && Hs(u)) {
					const {
						continueExecution: e
					} = us(u);
					if (!e) return vn.rejectActionByID(t), Hl()
				}
				if (!(s?.openCaseViewAfterCreate ?? !0) && !d) {
					const e = _p.getIn(o.data, "caseInfo.content");
					r = `${e.pyID} ${de.getLocaleValue("has been created.","Assignment")}`;
					const t = Ga(o),
						a = Fa(o);
					return Kf({
						toastMessage: r
					}), Xf({
						caseId: `${e.pyID}`,
						assignmentId: t,
						caseType: a
					}), n
				}
				const h = Pf(o);
				let g = mh("createWork", {
					caseClassName: Fa(h)
				});
				g = g.replace(/{.+?}/, Ua(Va(h))), h.semanticURL = g, ((e, t) => {
					const n = Uf(e),
						{
							skipBrowserSemanticUrlUpdate: r = !1,
							isTraditionalUICase: a
						} = t;
					_p.setIn(e, ["directUrlUpdation"], (!n || a) && !r)
				})(h, s);
				const f = {
					acName: u,
					context: p
				};
				await ns(h, s, f);
				const y = {
					target: u,
					context: p,
					containerItemID: p,
					headers: i,
					semanticURL: g,
					isInCreateStage: d,
					isMinimizable: d,
					caseViewMode: h.confirmationNote ? W.REVIEW_MODE : W.PERFORM_MODE,
					assignmentContext: _p.getIn(h, Lf),
					nextAssignmentInfo: _p.getIn(h, Mf),
					resourceType: H.CASE,
					openCaseViewAfterCreate: s.openCaseViewAfterCreate,
					modalOptions: s.modalOptions,
					debugInfo: s.debugInfo
				};
				Wa(y, h);
				const m = ts(h, y);
				a && (m.data.caseInfo.content.coexistenceAction = "openAssignment");
				const I = is(u, m);
				return ds(I) && Ba(n, {
					removeActionPayload: c,
					target: u
				}), n.push(I), gs(n), n
			})), Ll((() => {
				const e = Ka(),
					s = An(_p.getIn(n[0]?.payload, "data.caseInfo"));
				return a && e && s ? wf.postCreateCaseMessage(n[0]?.payload?.nextAssignmentInfo?.ID, ms, n) : ms(n), za(n, t), r = "", n = [], n
			})))
		},
		{
			RESOURCE_TYPES: Qf
		} = H,
		Zf = (e, t = []) => {
			const {
				viewType: n,
				containerName: r,
				targetContainerName: a,
				isChild: s
			} = e, o = ja(t);
			return (e => {
				if (e) {
					const {
						stageID: t,
						stages: n = []
					} = e, r = n.length;
					for (let e = 0; e < r; e += 1)
						if (n[e].ID === t) return "manual" === n[e].transitionType
				}
				return !1
			})(o) && e?.stageID === o.stageID ? Ja.PAGE : n || (!xa(r) && !xa(a) || s ? Ja.PAGE : Ja.FORM)
		},
		ey = (e, t, n, r, a) => {
			if (Ba(e, {
					removeActionPayload: t,
					target: n
				}), ((e, t) => {
					const n = Ms(t);
					let r = null;
					return n && (r = Os(t, n)), r?.key === e && Ws(t)
				})(r.key, n)) r.context = Fs(n), r.containerItemID = r.context, e.push(eh(Xp, r));
			else if ((a?.isChild || a?.isRemote) && a?.isMultiDoc) {
				const t = Zs(a.context);
				r.target = t, r.context = a.context, r.containerItemID = a.context, e.push(eh(Xp, r))
			} else {
				const t = Zs(r.context),
					n = Ds(t, r.key);
				n ? (r.target = t, r.context = n, r.containerItemID = n, e.push(eh(Xp, r))) : e.push(eh(Up, r))
			}
		},
		ty = (e, t, n, r, a, s, o) => {
			Hs(t) && qs(t) ? ((e, t, n, r, a) => {
				Zf(e, t) === Ja.FORM ? (n.caseViewMode = r || W.PERFORM_MODE, a.push(eh(Bp, n))) : a.push(eh(Xp, n))
			})(r, a, e, s, n) : ey(n, o, t, e, r)
		},
		ny = (e, t, n, r, a, s, o) => yl(e, {
			method: t,
			headers: {
				"if-match": n && n.etag,
				...n,
				...r && {
					...il.addDebugHeaders(r)
				}
			}
		}, a, {
			doNotMergeHttpMessagesForStatusCode: s ? o : ""
		}),
		ry = (e, t) => {
			const n = Zf(e),
				{
					headers: r,
					context: a,
					assignmentID: s,
					isGetNextWork: o,
					debugInfo: i,
					isOpenStage: c,
					stageID: d,
					caseID: l,
					jsActionQueryParams: u,
					isLastStepInCreateStage: p
				} = e,
				{
					restApi: h,
					reqType: g
				} = o ? Eh("getNextWork", {
					viewType: n
				}) : c ? Eh("openStage", {
					caseID: l,
					stageID: d
				}) : Eh(yt, {
					assignmentID: s,
					viewType: n
				}),
				{
					removeActionPayload: f
				} = t,
				y = ae.getDefaultCasePage();
			let m, I = e.pageName;
			e.isTraditionalUICase && (I = "pyDetails"), m = y ? `${h}?viewType=${n}&pageName=${y}` : I ? `${h}?viewType=${n}&pageName=${I}` : `${h}?viewType=${n}`, u && Object.keys(u).forEach((e => {
				m += `&${e}=${u[e]}`
			}));
			const E = (e => {
				let t = e?.headers ?? {};
				return e?.isRemote && (t = Za(t, e.remoteClassName)), t
			})(e);
			return zd(ny(m, g, E, i, a, o, "404")).pipe(Ll((e => {
				if (ae.isCoexistenceAppOfType(W.APP_TYPE.UIKIT) && !p) {
					return An(e.data.data.caseInfo) ? e : (m = m.replaceAll(I, "pyDetails"), ae.setDefaultCasePage("pyDetails"), {
						isReloadWithDifferentViewTypeRequired: !0,
						restUrl: m
					})
				}
				return e
			})), jl((e => e?.isReloadWithDifferentViewTypeRequired ? ny(m, g, E, i, a, o, "404") : Vl(e))), Ll((t => {
				const {
					key: a,
					flowName: o
				} = as(s);
				return {
					response: {
						...t.data,
						key: a,
						flowName: o
					},
					actionInPayload: e,
					viewType: n,
					removeActionPayload: f,
					headers: Za({
						...r,
						...t.headers
					})
				}
			})), zl("Error ocurred during ajax call at openAssignment Epic : ", a))
		},
		{
			RESOURCE_TYPES: ay
		} = H,
		sy = e => {
			let t = 0,
				n = [];
			const r = [];
			let a = !1,
				s = !1;
			return e.pipe(wl(Ol), Ll((e => (({
				actionMgrID: t
			} = e.payload), {
				...e.payload,
				insKey: e.payload.assignmentID
			}))), jl((e => {
				a = e.isGetNextWork;
				const {
					context: n
				} = e;
				let r;
				r = (e?.isChild || e?.isRemote) && e?.isMultiDoc ? Ja.FORM : Zf(e), e.viewType = r;
				const o = Ra(yt, e),
					i = Ft(o, n),
					{
						activate: c,
						activateContainerActionPayload: d
					} = hs(ay.ASSIGNMENT, i, e);
				if (c && !e.isParallelCall) return Vl({
					type: at,
					activateContainerActionPayload: d,
					actionInPayload: e
				});
				const {
					continueExecution: l,
					removeActionPayload: u
				} = d?.isParallelAssignment ? {
					continueExecution: !0,
					removeActionPayload: {}
				} : us(i);
				return l ? (s = Ya(e.className), e.isTraditionalUICase = s, ry(e, {
					removeActionPayload: u
				})) : (vn.rejectActionByID(t), Hl())
			})), jl((async e => {
				if (e?.type === ze) {
					if (a) {
						const {
							payload: t
						} = e, {
							err: n
						} = t, a = n.response.status;
						r.push({
							status: Number(a)
						})
					}
					return n.push(os(e)), n
				}
				const {
					type: t,
					actionInPayload: o,
					response: i,
					viewType: c,
					headers: d,
					removeActionPayload: l,
					activateContainerActionPayload: u
				} = e;
				if ("openStage" === i?.redirectInfo?.jsAction) {
					const e = i?.redirectInfo?.stageID,
						t = Ol,
						r = i?.data?.caseInfo?.ID;
					o.isOpenStage = !0, o.stageID = e, o.jsActionQueryParams = i?.redirectInfo?.jsActionQueryParams;
					const a = {
						type: t,
						payload: {
							...o,
							caseID: r,
							headers: d
						}
					};
					return n.push(a), n
				}
				const {
					context: p,
					caseViewMode: h,
					debugInfo: g
				} = o;
				let f = ((e, t) => {
					const n = ja(e);
					let r;
					r = !ae.getDefaultCasePage() && An(n);
					const {
						isChild: a,
						containerName: s
					} = t, o = a && r, i = r && !t.isActionFromToDoList;
					return o || i ? W.MODAL : s || Ra(yt, t)
				})(i, o);
				s = Ya(i?.data?.caseInfo?.caseTypeID), o.isTraditionalUICase = s, s && (f = o.containerName);
				const y = Ft(f, p);
				if (t === at) return await (async (e, t, n) => {
					const {
						semanticURL: r,
						containerItemID: a,
						isParallelAssignment: s,
						insKey: o
					} = t, {
						target: i,
						actionInPayload: c
					} = n, {
						skipBrowserSemanticUrlUpdate: d = !1
					} = c, l = Us(a);
					await ns({
						directUrlUpdation: !d,
						semanticURL: r
					}, c, {
						acName: i,
						target: i,
						context: l
					}), e.push(eh(Wp, {
						containerItemID: a,
						target: i,
						isParallelAssignment: s,
						insKey: o,
						resourceType: Qf.CASE,
						context: l,
						doDeleteCaseSummary: c.doDeleteCaseSummary
					}))
				})(n, u, {
					actionInPayload: o,
					target: y
				}), gs(n), n;
				const m = Pf(i);
				((e, t) => {
					const n = ja(e),
						r = Va(e),
						a = An(n),
						{
							skipBrowserSemanticUrlUpdate: s = !1,
							viewType: o,
							isTraditionalUICase: i
						} = t,
						c = o === Ja.PAGE && (!a || i) && !s,
						{
							caseTypeID: d
						} = n;
					if (c) {
						const t = mh(ft, {
							caseClassName: d
						}).replace(/{.+?}/, Ua(r));
						e.semanticURL = t, e.directUrlUpdation = !0
					}
				})(m, o);
				const I = cs(y, f, p),
					E = {
						acName: y,
						target: y,
						context: I
					};
				await ns(m, o, E);
				const A = {
					target: y,
					context: I,
					containerItemID: I,
					headers: d,
					isMinimizable: An(_p.getIn(m, "data.caseInfo")),
					doDeleteCaseSummary: o.doDeleteCaseSummary,
					acTertiary: o.acTertiary,
					resourceType: H.CASE,
					debugInfo: g
				};
				Wa(A, m, {
					skipFlowNameUpdate: o?.caseViewMode === W.REVIEW_MODE
				});
				const _ = ts(m, A);
				return o.isProcessAction && (_.data.isProcessAction = o.isProcessAction), s && (_.data.caseInfo.content.coexistenceAction = "openAssignment"), ((e, t) => {
					e.acTertiary && (t.data.caseInfo.isFirstAssignment = e.acTertiary)
				})(o, _), ty(_, y, n, o, i, h, l), c === Ja.FORM && Ha(_.containerItemID) && ys(_, n), gs(n), (e => {
					Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.ASSIGNMENT_OPENED, e)
				})({
					actionInContext: p,
					assignmentID: o.assignmentID,
					caseKey: _.key
				}), n
			})), Ll((() => {
				const e = t,
					a = Ka(),
					o = An(_p.getIn(n[0]?.payload, "data.caseInfo"));
				return s && a && o ? wf.postCreateCaseMessage(n[0]?.payload?.data?.caseInfo?.assignments?.[0]?.ID, op, n) : op(n), za(n, e, r), n[0]?.payload?.isParallelAssignment && op({
					type: Ol,
					payload: {
						...n[0].payload,
						isParallelCall: !0
					}
				}), n = [], n
			})))
		},
		oy = (e, t) => {
			const {
				insKey: n,
				headers: r,
				context: a,
				debugInfo: s,
				viewType: o
			} = e, {
				removeActionPayload: i
			} = t, c = e?.pageName ? e?.pageName : ae.getDefaultCasePage(), d = Eh(ft, {
				caseID: n,
				params: {
					pageName: c
				}
			});
			let {
				restApi: l
			} = d;
			const {
				reqType: u
			} = d;
			return "none" === o && (l = `${l.split("viewType")[0]}viewType=none`), zd(yl(l, {
				method: u,
				headers: {
					...r,
					...s && {
						...il.addDebugHeaders(s)
					}
				}
			}, a)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za({
					...r,
					...t.headers
				}),
				removeActionPayload: i
			}))), zl("Error ocurred during ajax call at openWorkByHandle Epic : ", a))
		},
		iy = "OPEN_WORK_BY_HANDLE",
		{
			RESOURCE_TYPES: cy
		} = H,
		dy = async (e, t, n) => {
			const {
				actionInPayload: r,
				activateContainerActionPayload: a,
				type: s,
				response: o,
				removeActionPayload: i,
				headers: c
			} = e, {
				context: d,
				skipBrowserSemanticUrlUpdate: l,
				debugInfo: u
			} = r, p = Ra(ft, r), h = Ft(p, d);
			if (s === at) await (async (e, t) => {
				const {
					activateContainerActionPayload: {
						semanticURL: n,
						containerItemID: r
					},
					actionInPayload: a,
					actionInPayload: {
						context: s,
						skipBrowserSemanticUrlUpdate: o,
						doDeleteCaseSummary: i
					}
				} = t, c = Ra(ft, a), d = Ft(c, s), l = Us(r);
				await ns({
					directUrlUpdation: !o,
					semanticURL: n
				}, a, {
					acName: d,
					containerName: c,
					target: d,
					context: l
				}), e.push(eh(Wp, {
					containerItemID: r,
					target: d,
					context: l,
					doDeleteCaseSummary: i
				}))
			})(t, {
				activateContainerActionPayload: a,
				actionInPayload: r
			});
			else {
				const e = cs(h, p, d, {
						buildNew: !0
					}),
					a = Pf(o),
					s = ((e, t) => {
						const {
							isRemoteCase: n,
							remoteCaseClass: r
						} = t, a = Va(e), s = n ? r : Fa(e);
						let o = mh(ft, {
							caseClassName: s
						});
						return o = o && o.replace("{workID}", Ua(a)), o
					})(a, r);
				a.semanticURL = s, a.directUrlUpdation = !l;
				const g = {
					acName: h,
					context: e
				};
				await ns(a, r, g);
				const f = ts(a, {
					target: h,
					context: e,
					containerItemID: e,
					semanticURL: s,
					headers: c,
					debugInfo: u
				});
				f.caseViewMode = W.REVIEW_MODE, f.resourceType = cy.CASE, n && (f.data.caseInfo.content.coexistenceAction = "openWorkByHandle"), Wa(f, a, {
					skipFlowNameUpdate: !0
				});
				const y = is(h, f);
				i.containerItemID && ds(y) && t.push(eh(zp, {
					containerItemID: i.containerItemID,
					target: h
				})), t.push(y)
			}
			gs(t);
			(e => {
				Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CASE_OPENED, e)
			})({
				caseKey: r.insKey,
				actionInContext: d
			})
		}, ly = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(iy), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					context: n,
					isChild: r,
					viewType: a
				} = e, s = Ra(ft, e), o = Ft(s, n);
				let i, c = !0;
				if ("none" !== a) {
					const e = us(o);
					c = e.continueExecution, i = e.removeActionPayload
				}
				if (!c) return vn.rejectActionByID(t), Hl();
				const {
					activate: d,
					activateContainerActionPayload: l
				} = hs(cy.CASE, o, e);
				return d && !r && "none" !== a ? Vl({
					type: at,
					activateContainerActionPayload: l,
					actionInPayload: e
				}) : oy(e, {
					removeActionPayload: i
				})
			})), jl((async e => {
				if (e && Ma(e.type)) return n.push(os(e)), n;
				const t = ip(e?.actionInPayload?.context),
					r = Ya(e?.actionInPayload.className);
				if ("none" === e?.actionInPayload?.viewType) {
					if ("perform" !== t?.context_data?.caseViewMode) {
						const t = Pf(e?.response),
							a = {
								data: {
									...t?.data
								},
								context: e?.actionInPayload?.context,
								isArrayDeepMerge: !0
							};
						n.push({
							type: Nt,
							payload: {
								context: a.context,
								doDeleteConfirmationDetails: !1
							}
						}), r && (a.data.caseInfo.content.coexistenceAction = "openWorkByHandle"), n.push(eh(Np, a));
						const s = Zs(e?.actionInPayload?.context),
							o = Da(e?.actionInPayload?.context),
							i = Object.freeze({
								target: s,
								containerItemID: e?.actionInPayload?.context,
								context: e?.actionInPayload?.context,
								containerName: o
							});
						if (Ha(e?.actionInPayload?.context)) {
							const t = ts(e?.response, {
								...i
							});
							ys({
								...t,
								isArrayDeepMerge: !0
							}, n)
						}
					}
				} else await dy(e, n, r);
				return n
			})), Ll((() => (op(n), za(n, t), n = [], n))))
		};
	class uy {
		constructor() {
			this.isInitialised = !1, this.isQueryable = !0, this.dataSourceMetaData = {}, this.nonQueryableData = [], this.fetchedNQData = !1, this.previousSearchText = null, this.totalRecordCount = 0, this.fetchedRecordCount = 0, this.cache = {}, this.pageNumber = 0
		}
		static _searchResultsCache = {};
		static init(e, t) {
			return new Promise(((n, r) => {
				const a = [...e.columns.map((e => e.value)), ...Object.entries(e.parameters).map((([e, t]) => `${e}+${t}`))].join(W.HASH_DELIMITER),
					s = _p.getHashedString(a),
					o = `${e.dataSource}_${s}`,
					i = Gg.getAppCacheKey(e.dataSource);
				if (window.sessionStorage.getItem(i)) {
					const a = JSON.parse(window.sessionStorage.getItem(i));
					if (t && uy._searchResultsCache?.[t]?.[o]) n(uy._searchResultsCache[t][o]);
					else if ("form" !== e.cacheLifeSpan && uy._searchResultsCache?.persisted?.[o]) n(uy._searchResultsCache.persisted[o]);
					else {
						const s = new uy;
						s.listType = e.listType, s.dataSource = e.dataSource, e.enablePagination ? (s.enablePagination = e.enablePagination, s.pageSize = e.pageSize) : s.maxResultsDisplay = e.maxResultsDisplay, s.parameters = e.parameters, s.columns = e.columns, s.matchPosition = e.matchPosition, s.context = t, JSON.stringify(a.associationFilter) === JSON.stringify(e.associationFilter) ? (s.dataSourceMetaData = a.dataSourceMetaData, s.isQueryable = a.isQueryable, s.isInitialised = a.isInitialised, s.associationFilter = a.associationFilter, uy.initializeCache(t, e, o, s), n(s)) : (s.associationFilter = e.associationFilter, s.fetchMetaData(t).then((r => {
							window.sessionStorage.setItem(i, JSON.stringify({
								isQueryable: r.data.isQueryable,
								dataSourceMetaData: r.data,
								isInitialised: !0,
								associationFilter: e.associationFilter
							})), s.isQueryable = r.data.isQueryable, s.dataSourceMetaData = r.data, s.isInitialised = !0, uy.initializeCache(t, e, o, s), n(s)
						})).catch((e => {
							s.isInitialised = !1, r(e)
						})))
					}
				} else if (e.deferDatasource) {
					const r = new uy;
					r.listType = e.listType, r.dataSource = e.dataSource, e.enablePagination ? (r.enablePagination = e.enablePagination, r.pageSize = e.pageSize) : r.maxResultsDisplay = e.maxResultsDisplay, r.dataSourceMetaData = e.dataSourceMetaData, r.parameters = e.parameters, r.columns = e.columns, r.matchPosition = e.matchPosition;
					const a = PCore.getMetadataUtils().getDataPageMetadata(e.dataSource);
					r.isQueryable = a.isQueryable, r.isInitialised = !0, r.dataSourceMetaData = a, window.sessionStorage.setItem(i, JSON.stringify({
						isQueryable: a.isQueryable,
						dataSourceMetaData: a,
						isInitialised: !0
					})), r.context = t, uy.initializeCache(t, e, o, r), n(r)
				} else {
					const a = new uy;
					a.listType = e.listType, a.dataSource = e.dataSource, e.enablePagination ? (a.enablePagination = e.enablePagination, a.pageSize = e.pageSize) : a.maxResultsDisplay = e.maxResultsDisplay, a.dataSourceMetaData = e.dataSourceMetaData, a.parameters = e.parameters, a.columns = e.columns, a.matchPosition = e.matchPosition, a.context = t, a.associationFilter = e.associationFilter, a.fetchMetaData(t).then((r => {
						window.sessionStorage.setItem(i, JSON.stringify({
							isQueryable: r.data.isQueryable,
							dataSourceMetaData: r.data,
							isInitialised: !0,
							associationFilter: e.associationFilter
						})), a.isQueryable = r.data.isQueryable, a.dataSourceMetaData = r.data, a.isInitialised = !0, uy.initializeCache(t, e, o, a), n(a)
					})).catch((e => {
						a.isInitialised = !1, r(e)
					}))
				}
			}))
		}
		static clearContextedCache(e) {
			delete uy._searchResultsCache[e]
		}
		static initializeCache(e, t, n, r) {
			e && "form" === t.cacheLifeSpan?.toLowerCase() ? (void 0 === uy._searchResultsCache[e] && (uy._searchResultsCache[e] = {}), uy._searchResultsCache[e][n] = r) : (void 0 === uy._searchResultsCache.persisted && (uy._searchResultsCache.persisted = {}), uy._searchResultsCache.persisted[n] = r)
		}
		fetchMetaData(e) {
			return Gg.getDataViewMetadata(this.dataSource, e, this.associationFilter)
		}
		getData(e) {
			if (this.isQueryable) {
				const t = this.buildSchemaForQueryableDP(e);
				return Qg.getDataAsync(this.dataSource, this.context, t.dataViewParameters, t.paging, t.query)
			}
			return this.fetchNonQueryableResults(e)
		}
		memoizedGetData(e) {
			const t = e?.toLowerCase();
			if (this.enablePagination ? t in this.cache && this.pageNumber in this.cache[t] : t in this.cache) return this.enablePagination ? this.cache[t][this.pageNumber] : this.cache[t];
			const n = this.getData(e);
			return this.enablePagination ? (this.cache[t] = this.cache[t] || {}, this.cache[t][this.pageNumber] = n) : this.cache[t] = n, n
		}
		fetchData(e, t) {
			return this.isValidDatasource() && this.isInitialised ? (this.pageNumber = t ? this.pageNumber : 1, this.memoizedGetData(e)) : Promise.reject()
		}
		fetchPaginatedData(e) {
			return this.pageNumber += 1, this.fetchData(e, !0)
		}
		fetchNonQueryableResults(e) {
			return this.fetchedNQData ? new Promise((t => t({
				data: this.filterNonQueryableData(e)
			}))) : this.dataSourceMetaData.structure && "list" === this.dataSourceMetaData.structure.toLowerCase() ? new Promise(((t, n) => {
				const r = this.buildSchemaForNonQueryableDP();
				Qg.getDataAsync(this.dataSource, this.context, r.dataViewParameters).then((n => (this.nonQueryableData = n.data ? [...n.data] : [], this.fetchedNQData = !0, t({
					data: this.filterNonQueryableData(e)
				})))).catch((e => n(e)))
			})) : null
		}
		filterNonQueryableData(e) {
			const t = this.columns.filter((e => e.useForSearch)).map((e => e.value));
			return this.nonQueryableData.reduce(((n, r) => (Object.keys(r).every((a => !(t.includes(a) && r[a] && this.positionMatches(r[a], e)) || (n.push({
				...r
			}), !1))), n)), [])
		}
		positionMatches(e, t) {
			switch (this.matchPosition) {
				case "start":
					return e.toLowerCase().startsWith(t.toLowerCase());
				case "contains":
					return e.toLowerCase().includes(t.toLowerCase());
				case "equals":
					return e.toLowerCase() === t.toLowerCase();
				default:
					return !1
			}
		}
		buildSelect() {
			const e = [],
				t = [];
			return this.columns.forEach((n => {
				if (!t.includes(n.value)) {
					t.push(n.value);
					const r = {
						field: n.value
					};
					e.push(r)
				}
			})), e
		}
		buildFilters(e) {
			let t = {};
			const n = {};
			this.columns.forEach(((t, r) => {
				if (t.useForSearch) {
					const a = `F${r}`,
						s = {
							field: t.value
						},
						o = {
							value: e
						};
					let i = "CONTAINS";
					"start" === this.matchPosition ? i = "STARTS_WITH" : "equals" === this.matchPosition && (i = "EQ");
					const c = {
						...!0 === Number.isNaN(parseFloat(e)) && {
							ignoreCase: "true"
						},
						lhs: s,
						rhs: o,
						comparator: i
					};
					n[a] = c
				}
			}));
			const r = Object.keys(n).join(" OR ");
			return t = {
				filterConditions: n,
				logic: r
			}, t
		}
		buildQuery(e) {
			return e ? {
				select: this.buildSelect(),
				filter: this.buildFilters(e),
				distinctResultsOnly: "true"
			} : {
				select: this.buildSelect(),
				distinctResultsOnly: "true"
			}
		}
		buildPageOptions() {
			return this.enablePagination ? {
				pageNumber: this.pageNumber,
				pageSize: this.pageSize
			} : {
				maxResultsToFetch: this.maxResultsDisplay
			}
		}
		buildSchemaForQueryableDP(e) {
			return {
				dataViewParameters: this.parameters,
				query: this.buildQuery(e),
				paging: this.buildPageOptions()
			}
		}
		buildSchemaForNonQueryableDP() {
			return {
				dataViewParameters: this.parameters
			}
		}
		isValidDatasource() {
			return !!this.dataSource
		}
	}
	const py = uy,
		hy = "FINISH_ASSIGNMENT",
		{
			RESOURCE_TYPES: gy
		} = H,
		fy = (e, t) => {
			const {
				containerItemID: n,
				skipReleaseLockRequest: r
			} = t, a = Us(n), s = `${a.includes("root")?W.APP.ROOT:W.APP.APP}/${$s.MODAL}`;
			e.push(eh(zp, {
				containerItemID: n,
				context: a,
				target: s,
				skipReleaseLockRequest: r
			}))
		},
		yy = e => lp(".openCaseViewAfterCreate", W.CONTEXT_DATA, e) ?? !0,
		my = async (e, {
			translatedDXAPIResponse: t,
			actionInPayload: n
		}, r) => {
			const {
				caseID: a
			} = n, s = (o = t, _p.getIn(o, Na.NEXT_ASSIGNMENT_INFO_ID, W.EMPTY_STRING));
			var o;
			const i = Fa(t),
				{
					caseViewMode: c,
					headers: d,
					semanticURL: l,
					actionMgrID: u,
					directUrlUpdation: p,
					key: h,
					flowName: g,
					resourceType: f
				} = r;
			(e => {
				Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CREATE_STAGE_DONE, e)
			})({
				caseId: a,
				assignmentId: s,
				caseType: i
			}), fy(e, {
				...n,
				skipReleaseLockRequest: !0
			});
			const y = `${n?.containerItemID.includes("root")?W.APP.ROOT:W.APP.APP}/${$s.PRIMARY}`,
				m = cs(y, $s.PRIMARY),
				I = il.getCoreHeadersFromContext(n.context) || !1,
				E = ts(t, {
					target: y,
					context: m,
					containerItemID: m,
					caseViewMode: c,
					headers: d,
					semanticURL: l,
					key: h,
					flowName: g,
					resourceType: f,
					directUrlUpdation: p,
					debugInfo: I && I.debugInfo && {
						debugId: I.debugInfo[W.COREHEADER_APP_DEBUG_ID]
					}
				});
			if (Hs(y)) {
				const t = ip(m),
					a = Va({
						data: t
					}),
					[, s] = a ? a.split(" ") : [],
					o = `You will lose unsaved changes for ${s}. Do you want to continue?`;
				if (!yy(n.context)) return e;
				{
					const {
						continueExecution: t
					} = us(y, {
						dirtyMessage: o
					});
					if (!t) return r.directUrlUpdation = !1, vn.rejectActionByID(u), Hl();
					e.push(eh(Xp, E))
				}
			} else e.push(eh(Up, E));
			return t.directUrlUpdation = p, t.semanticURL = l, await ns(t, {
				...E,
				acName: y
			}, {
				acName: y,
				context: m
			}), e
		}, Iy = e => /^app\/preview_[0-9]*/g.test(e), Ey = (e, t) => {
			const n = Ie(e);
			return !Iy(e) && (n === t || /^app\/primary_[0-9]*/g.test(n))
		}, Ay = async (e, t, n, r, a, s, o, i, c) => {
			const {
				headers: d
			} = c;
			if (e) {
				const l = Hs(Zs(e));
				let u = !1;
				const p = Zs(n),
					h = Ps(p),
					g = Ms(p);
				h?.items?.[g]?.key === c?.actionInPayload?.caseID && (u = !0), fy(a, {
					...r,
					skipReleaseLockRequest: !0
				});
				const f = Da(e),
					y = {
						target: Zs(e),
						containerItemID: e,
						context: e,
						containerName: f
					};
				t.doDeleteCaseSummary = r.doDeleteCaseSummary;
				const m = $e(n),
					I = ip(m),
					E = ip(r.context),
					A = I?.caseInfo?.ID,
					_ = E?.caseInfo?.ID;
				if (l && A === _ || !l && "" === o) a.push(eh(Bp, {
					...t,
					key: o,
					resourceType: "",
					...y
				}));
				else if (s) {
					const s = Zs(e),
						i = Ds(s, o);
					if (i) y.target = s, y.context = i, y.containerItemID = i, a.push(eh(Bp, {
						...t,
						key: o,
						resourceType: "",
						...y
					}));
					else {
						const e = Vs(n)[0];
						r.target = e, r.context = cs(e, W.WORKAREA, n), r.containerItemID = r.context, a.push(eh(Up, {
							...r,
							...t
						}));
						const s = r.containerItemID;
						a.push(eh(Wp, {
							parentContainerTarget: e,
							containerItemID: s
						}))
					}
				}
				if (r.target = Zs(e), r.containerName = Da(e), r.context = e, r.containerItemID = e, _p.setIn(t, "acName", y.target), await ns(i, t), u) {
					const {
						data: e,
						caseViewMode: r
					} = t;
					n.includes(W.WORKAREA) && Ha(n) && (n = $e(n));
					const s = {
						data: e,
						caseViewMode: r,
						context: n
					};
					_p.setIn(s.data, ["context_data", "caseViewMode"], r), a.push({
						type: Nt,
						payload: {
							context: n
						}
					}), a.push(eh(Np, s))
				}
				if (!s && t.caseViewMode === W.PERFORM_MODE) {
					const t = ((e, t) => {
							const n = Zs(e);
							return Ds(n, t)
						})(e, o),
						n = {
							data: {
								caseInfo: {
									headers: d
								}
							},
							context: t
						};
					a.push(eh(Np, n)), a.push(Rn(((e, t = !1, n = !1) => {
						const r = vn.getNextActionMgrId();
						return {
							ID: $p.getProperyValue(H.CASE_INFO.ASSIGNMENT_ID, "", e),
							actionID: $p.getProperyValue(H.CASE_INFO.ASSIGNMENTACTION_ID, "", e),
							context: e,
							caseWideAction: t,
							contextData: n,
							options: {
								actionMgrID: r
							}
						}
					})(t)))
				}
			} else {
				fy(a, r);
				let e = !1;
				const o = Zs(n),
					i = Ps(o),
					d = Ms(o);
				if (i?.items?.[d]?.key === c?.actionInPayload?.caseID && (e = !0), s) {
					const e = Vs(n)[0];
					r.target = e, r.context = cs(e, W.WORKAREA, n), r.containerItemID = r.context, a.push(eh(Up, {
						...r,
						...t
					}));
					const s = r.containerItemID;
					a.push(eh(Wp, {
						parentContainerTarget: e,
						containerItemID: s
					}))
				}
				if (e) {
					const {
						data: e,
						caseViewMode: r
					} = t, s = {
						data: e,
						caseViewMode: r,
						context: n
					};
					_p.setIn(s.data, ["context_data", "caseViewMode"], r), a.push({
						type: Nt,
						payload: {
							context: n
						}
					}), a.push(eh(Np, s))
				}
			}
		}, _y = async (e, t, n, r, a) => {
			((e, t, n) => {
				if (t.isProcessAction && (fy(n, {
						...t,
						skipReleaseLockRequest: !0
					}), e)) {
					const r = `${t?.containerItemID.includes("root")?W.APP.ROOT:W.APP.APP}/${$s.PRIMARY}`,
						a = cs(r, $s.PRIMARY),
						s = {
							insKey: e.ID,
							className: e.content.classID,
							context: a,
							acTargetName: W.PRIMARY,
							isChild: !0
						},
						o = {
							type: Ue,
							payload: {
								...s
							}
						};
					n.push(o)
				}
			})(e.data.caseInfo.parentCaseInfo, t, a), n.resourceType = gy.CASE, n.directUrlUpdation = !0, t.isProcessAction || await my(a, {
				translatedDXAPIResponse: r,
				actionInPayload: t
			}, n)
		}, Sy = async (e, t, n, r, a) => {
			e.doDeleteCaseSummary = t.doDeleteCaseSummary, e.caseViewMode === W.REVIEW_MODE && (e.flowName = " ", e.clearView = !0), a.push(eh(Bp, {
				...e,
				...r
			})), _p.setIn(e, "acName", r.target), await ns(n, e), ((e, t, {
				data: n,
				caseViewMode: r
			}) => {
				const {
					containerItemID: a
				} = t, s = Us(a);
				if (Ha(a)) {
					const t = $e(s),
						a = {
							data: n,
							caseViewMode: r,
							context: t
						};
					_p.setIn(a.data, ["context_data", "caseViewMode"], r), e.push({
						type: Nt,
						payload: {
							context: t
						}
					}), e.push(eh(Np, a))
				}
			})(a, t, e)
		}, Cy = async (e, t, n, r, a, s, o, i) => {
			const {
				isCaseWideAction: c,
				isInCreateStage: d,
				containerItemID: l
			} = e, u = Ie(e.context), p = ka(a), h = Fa(a), g = d && !p, f = Vs(u)[0], y = f ? Ms(f) : u, m = Da(l), I = Us(l), E = Object.freeze({
				target: e.target,
				containerItemID: l,
				context: I,
				containerName: m
			});
			g && !Iy(e.context) ? await _y(i, e, t, a, s) : Ey(e.context, y) ? await Ay(y, t, u, e, s, n, r, a, o) : c && !Ey(e.context, y) ? (fy(s, e), ((e, t, n) => {
				const {
					containerItemID: r,
					caseID: a
				} = t;
				if (r && /^app\/preview_[0-9]*/g.test(r)) {
					const {
						caseClassName: t
					} = n, s = Ie(r), o = Us(s);
					e.push(eh(Dp, {
						containerItemID: s,
						context: o,
						container: $s.PREVIEW,
						containerName: $s.PREVIEW,
						caseId: a,
						viewName: H.PREVIEW_VIEW_NAME,
						caseClassName: t,
						updateData: !0
					}))
				}
			})(s, e, {
				caseClassName: h
			})) : await Sy(t, e, a, E, s)
		}, $y = (e, t) => {
			const {
				assignmentID: n,
				actionID: r,
				caseID: a,
				context: s,
				additionalHeaders: o = {},
				isCaseWideAction: i,
				outcome: c
			} = e, {
				state$: d
			} = t, l = (e => {
				const {
					isModalAction: t,
					viewType: n,
					isInCreateStage: r
				} = e;
				return t && r ? Ja.PAGE : n || Ja.FORM
			})(e), u = (e => {
				const {
					isCaseWideAction: t
				} = e;
				return t ? _t : "finishAssignment"
			})(e), p = {
				assignmentID: n,
				actionID: r,
				caseID: a,
				viewType: l
			};
			let {
				restApi: h
			} = Eh(u, p), {
				reqType: g
			} = Eh(u, p);
			l && !h.includes("viewType=") && (h = h.includes("?") ? `${h}&viewType=${l}` : `${h}?viewType=${l}`), c && !h.includes("outcome") && (h = h.includes("?") ? `${h}&outcome=${c}` : `${h}?outcome=${c}`), i && (g = "PATCH"), e.viewType = l;
			const {
				content: f,
				attachmentsExist: y
			} = es(s);
			e.attachmentsExist = y;
			const m = d.value.data[s]?.caseInfo?.headers || {},
				{
					etag: I
				} = m,
				E = {
					"if-match": I,
					...o
				};
			return zd(yl(h, {
				method: g,
				body: f,
				headers: E
			}, s)).pipe(Ll((t => {
				const {
					data: n,
					headers: r
				} = t;
				return {
					response: n,
					actionInPayload: e,
					headers: Za({
						...E,
						...r
					})
				}
			})), zl("Error ocurred during ajax call at finishAssignment Epic : ", s))
		}, {
			RESOURCE_TYPES: by
		} = H, Py = (e, t) => {
			let n = 0,
				r = [],
				a = "",
				s = "";
			return e.pipe(wl(hy), Ml((e => {
				const o = ae.isCoexistenceAppOfType(W.APP_TYPE.UIKIT);
				if (({
						actionMgrID: n
					} = e.payload), s = e.payload.context, Qn({
						context: s,
						stateObj: ip(s),
						clearContextMessages: !0
					}), !ta(s)) {
					const t = {
						type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
					};
					return vn.rejectActionByID(n, !0, t), Zl.handleDeferredActionCompletion(e.payload.context), Vl([])
				}
				return Vl(e.payload).pipe(jl((e => {
					((e, t) => {
						const {
							containerItemID: n,
							context: r,
							actionMgrID: a,
							isInCreateStage: s,
							isModalAction: o
						} = t;
						if (s && o) {
							const t = Da(n),
								s = Ft(t, r);
							e.push(eh(Wp, {
								containerItemID: n,
								target: s,
								actionMgrID: a
							}))
						}
					})(r, e);
					const n = {
						...e
					};
					return $y(n, {
						state$: t
					})
				})), jl((async e => {
					if (e && e.type === ze) {
						const t = os(e);
						return r.push(t), r
					}
					py.clearContextedCache(s);
					const {
						headers: t,
						actionInPayload: i,
						response: c
					} = e, {
						containerItemID: d,
						context: l = Us(d),
						isModalAction: u,
						isInCreateStage: p
					} = i, h = Zs(d);
					i.target = h;
					const g = Da(d),
						f = Object.freeze({
							target: i.target,
							containerItemID: d,
							context: l,
							containerName: g
						});
					_p.setIn(c.data, "caseInfo.isFirstAssignment", !1), _p.setIn(c.data, W.CASE_INFO_IS_LOCAL_ACTION, !1), c?.uiResources?.root?.config?.name && "page" !== i.viewType && _p.setIn(c.data, "caseInfo.content.pyViewName", c?.uiResources?.root?.config?.name), (e => {
						Ta.publish(W.PUB_SUB_EVENTS.EVENT_EXPRESS_LOCALACTION, e)
					})({
						submitResponse: c
					});
					let y = Pf(c, {
						[H.STOPMERGEACTIONS]: !c.nextAssignmentInfo
					});
					const m = Fa(y),
						I = Ie(i.context),
						E = Vs(I)[0] ? Ms(Vs(I)[0]) : I,
						A = ka(y),
						_ = p && !A;
					!u || p || Ey(i.context, E) || (y = ((e, t) => (e?.data?.caseInfo && t?.caseInfo?.content && (e.data.caseInfo.content = t?.caseInfo?.content), e))(y, ip(d)));
					const S = ts(y, {
						headers: t,
						actionMgrID: n,
						directUrlUpdation: !1
					});
					let C, $;
					qa(S.data, i), S.caseClassName = m, S.resourceType = by.ASSIGNMENT, S.headers = t;
					const b = y?.data?.caseInfo?.assignments?.some((e => e.ID === i.assignmentID)),
						P = ((e, t) => {
							const {
								assignmentID: n
							} = t;
							return e?.data?.caseInfo?.assignments?.some((e => e.ID === n && "true" === e?.canPerform))
						})(y, i),
						O = ((e, t, n, r, a) => {
							let s;
							const o = Zs(t);
							return s = Ws(o) ? Ds(o, n.data.caseInfo.ID) : Ms(o), r && e && up(null, W.CASE_VIEW_MODE_PROP, s) === W.PERFORM_MODE && a
						})(b, E, y, u, P),
						T = i?.actionID === H.LOCAL_ACTIONS.TRANSFER_ASSIGNMENT;
					y?.data?.nextAssignmentInfo && !T ? (S.caseViewMode = W.PERFORM_MODE, C = Va(y), $ = !0) : O && !T ? (S.caseViewMode = W.PERFORM_MODE, C = Va(y), S.flowName = " ", S.deleteAssignmentSpecificResources = !1, $ = !1) : (S.caseViewMode = W.REVIEW_MODE, C = "", $ = !1);
					const v = Va(y);
					Wa(S, y, {
						skipFlowNameUpdate: S?.caseViewMode === W.REVIEW_MODE || O
					});
					const N = mh("createWork", {
						caseClassName: m
					}).replace(/{.+?}/, Ua(v));
					var R;
					if (y.semanticURL = N, S.semanticURL = N, u ? (await Cy(i, S, $, C, y, r, e, c), _ && (a = yy((R = i).context) ? "" : R.businessID ? `${R.businessID} ${de.getLocaleValue("has been created.","Assignment")}` : `${R.workID} ${de.getLocaleValue("has been created.","Assignment")}`)) : p && o && !A ? (ae.setDefaultCasePage("pyDetails"), await (async (e, t, n) => {
							const r = {
									assignmentID: e?.data?.caseInfo?.assignments[0]?.ID,
									className: e?.data?.caseInfo?.content?.classID,
									containerName: $s.PRIMARY,
									targetContainerName: $s.PRIMARY,
									viewType: Ja.PAGE,
									isLastStepInCreateStage: !0,
									context: n
								},
								a = {
									type: Ge,
									payload: {
										...r
									}
								};
							t.push(a)
						})(c, r, Ie(l))) : await Sy(S, i, y, f, r), Zl.handleDeferredActionCompletion(s), ((e, t, n) => {
							const {
								isModalAction: r,
								isCaseWideAction: a,
								caseID: s
							} = t, o = Ey(t.context, n);
							va({
								caseID: s,
								isModalAction: r,
								isModalLaunchedFromPrimaryValue: o,
								isCaseWideAction: a,
								stages: e?.data?.caseInfo?.stages || []
							})
						})(S, i, E), !y?.data?.nextAssignmentInfo) {
						const e = ((e, t) => {
							const {
								isCaseWideAction: n,
								assignmentID: r,
								actionID: a
							} = t;
							return {
								isCaseWideAction: n,
								caseID: Va(e),
								assignmentID: n ? null : r,
								actionID: n ? a : null
							}
						})(y, i);
						(e => {
							Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING, e)
						})({
							...e,
							containerItemID: d
						})
					}
					return ((e, {
						isModalAction: t,
						target: n,
						transientItemID: r
					}) => {
						if (t) {
							const t = e.find((({
								type: e
							}) => e === it));
							t?.payload && (n = t.payload.target, r = t.payload.containerItemID)
						}
						const a = Yp({
							target: n,
							containerItemID: r
						});
						a.payload.transientItems.length && e.push(a)
					})(r, {
						transientItemID: d,
						target: h,
						isModalAction: u
					}), r
				})), Ll((() => {
					const e = r.find((e => e.type === ze));
					return e ? (Zl.handleDeferredActionCompletion(s), (e => {
						const t = e?.payload?.err?.errorDetails,
							n = e?.payload?.context;
						t?.forEach((e => {
							e[W.ERROR_FIELD_IN_PAGE] = e[W.ERROR_FIELD_IN_PAGE].replace(/(\(\d\))/g, (e => `[${parseInt(e.substring(1,e.length-1),10)-1}]`));
							const t = e[W.ERROR_FIELD_IN_PAGE].slice(1),
								r = e[W.ERROR_IN_PAGE_IDENTIFIER].slice(1);
							if (r) {
								let a = t ? `caseInfo.content.${t}` : "caseInfo.content";
								a = a.replace(/\(/g, "[").replace(/\)/g, "]");
								const s = zn(r, a, W.PROPERTY),
									o = {
										type: H.MESSAGES.MESSAGES_TYPE_ERROR,
										message: e.localizedValue
									};
								Wn.mutateField(n, a, s[s.length - 1], {
									messages: [o],
									type: H.MESSAGES.MESSAGES_TYPE_ERROR,
									fieldName: s[s.length - 1]
								})
							}
						}))
					})(e), vn.rejectActionByID(n)) : vn.resolveActionByID(n, a), ms(r), r = [], a = "", r
				})))
			})))
		}, Oy = "CANCEL_ASSIGNMENT", Ty = e => {
			const t = {},
				{
					routeKey: n,
					isModalAction: r,
					caseID: a,
					context: s,
					RemoteSystemID: o
				} = e;
			o && (t.RemoteSystemID = o);
			const i = n || "releaseAssignmentLock",
				{
					restApi: c,
					reqType: d
				} = Eh(i, {
					ID: a,
					caseID: a,
					viewType: Ja.PAGE
				});
			return re.getPreviewMode() && (t[W.SKIPCOREHEADERS] = !0), zd(yl(c, {
				method: d,
				headers: t
			}, s, {
				includeRemoteSystemIdIfPresent: !!o
			})).pipe(Ll((t => r ? {
				actionInPayload: e
			} : {
				response: t.data,
				actionInPayload: e,
				headers: Za(t.headers)
			})), zl(": Error ocurred during ajax call at release lock request : ", s))
		}, vy = (e, t) => {
			const {
				isModalAction: n
			} = t;
			return Ty({
				routeKey: "cancelAssignment",
				isModalAction: n,
				...e
			})
		}, Ny = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(Oy), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					isModalAction: n
				} = e;
				e.context || (e.context = Us(e.containerItemID));
				const {
					context: r
				} = e, a = (e => {
					const {
						isModalAction: t,
						containerItemID: n
					} = e;
					return t ? $s.MODAL : Da(n)
				})(e), s = Ft(a, r), {
					continueExecution: o
				} = us(s);
				return o ? (e.RemoteSystemID = q.getRemoteHeaderByContext(e.context) ?? void 0, vy(e, {
					isModalAction: n
				})) : (vn.rejectActionByID(t), Hl())
			})), jl((async e => {
				if (e && e.type === ze) return n.push(os(e)), n;
				const {
					actionInPayload: r,
					response: a
				} = e, {
					containerItemID: s,
					isModalAction: o,
					isInCreateStage: i
				} = r, c = Zs(s), d = Us(s), l = {
					target: o ? `${W.APP.APP}/${W.MODAL}` : c,
					containerItemID: s,
					caseViewMode: o ? W.PERFORM_MODE : W.REVIEW_MODE,
					context: d,
					actionMgrID: t,
					key: Va(a)
				};
				return i && n.push(eh(Bp, l)), !o && Ha(s) && (async (e, t) => {
					const {
						childContainerItemID: n,
						caseViewMode: r,
						referencedUsers: a
					} = t, s = Ie(n), o = {
						context: Us(s),
						data: {
							referencedUsers: a,
							context_data: {
								caseViewMode: r
							}
						}
					};
					o.data = {
						...t?.response?.data,
						...o.data
					}, e.push(eh(Np, o))
				})(n, {
					childContainerItemID: s,
					caseViewMode: W.REVIEW_MODE,
					referencedUsers: a?.data.referencedUsers,
					response: a
				}), l.skipReleaseLockRequest = !0, n.push(eh(zp, l)), n
			})), Ll((() => (op(n), za(n, t), n = [], n))))
		}, Ry = "NAVIGATE_TO_STEP", Dy = (e, t) => {
			const {
				ID: n,
				stepID: r,
				containerItemID: a,
				context: s = Us(a),
				isInCreateStage: o
			} = e, {
				state$: i
			} = t, c = {
				ID: n,
				stepID: r,
				viewType: o ? Ja.PAGE : Ja.FORM
			}, {
				restApi: d,
				reqType: l
			} = Eh("navigateToStep", c), {
				content: u
			} = es(s), p = i.value.data[s].caseInfo.headers;
			return zd(yl(`${d}`, {
				method: l,
				body: u,
				headers: {
					"if-match": p && p.etag
				}
			}, s)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za({
					...p,
					...t.headers
				})
			}))), zl("Error ocurred during ajax call at navigateToStep Epic : ", s))
		}, {
			RESOURCE_TYPES: xy
		} = H, wy = (e, t) => {
			let n = 0,
				r = [];
			return e.pipe(wl(Ry), Ml((e => (({
				actionMgrID: n
			} = e.payload), Vl(e.payload).pipe(jl((e => (nr(e.context), Dy(e, {
				state$: t
			})))), jl((async e => {
				if (e && Ma(e.type)) return r.push(os(e)), r;
				const {
					actionInPayload: t,
					response: n,
					headers: a
				} = e, {
					containerItemID: s,
					context: o = Us(s),
					isModalAction: i
				} = t;
				py.clearContextedCache(t.context);
				const c = Zs(s),
					d = Da(s),
					l = Object.freeze({
						target: c,
						containerItemID: s,
						context: o,
						containerName: d
					}),
					u = Pf(n),
					p = {
						acName: c,
						...l
					};
				await ns(u, t, p);
				const h = ts(u, {
					...l,
					headers: a
				});
				h.doDeleteCaseSummary = t.doDeleteCaseSummary, h.resourceType = xy.ASSIGNMENT, Wa(h, u), qa(h.data, t);
				const g = u.data.caseInfo.stages;
				return va({
					caseID: Va(u),
					isModalAction: i,
					stages: g
				}), Ha(s) && ys(h, r), r.push(eh(Bp, h)), gs(r), r
			})), Ll((() => (op(r), za(r, n), r = [], r))))))))
		}, My = e => {
			const {
				caseID: t,
				context: n
			} = e, {
				restApi: r,
				reqType: a
			} = Eh("deleteCaseInCreateStage", {
				ID: t
			});
			return zd(yl(r, {
				method: a
			}, n)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za(t.headers)
			}))), zl(": Error ocurred during ajax call at deleteCaseInCreateStage Epic : ", n))
		}, Ly = e => {
			Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CREATE_STAGE_DELETED, e)
		}, jy = (e, t) => {
			let n, r = 0,
				a = [];
			return e.pipe(wl(Tl), Ll((e => (({
				actionMgrID: r,
				caseType: n
			} = e.payload), e.payload))), jl((e => e.ignoreCaseDeletion ? Vl({
				actionInPayload: e
			}) : My(e))), jl((async e => {
				if (e && Ma(e.type)) {
					const {
						payload: t
					} = e, n = os({
						...e,
						...t,
						actionMgrID: r
					});
					return a.push(n), a
				}
				const {
					actionInPayload: n
				} = e, {
					context: s,
					isModalAction: o
				} = n, i = o ? $s.MODAL : $s.PRIMARY, c = Ft(i, s);
				if (!o) {
					const e = {
							acName: c,
							target: c,
							context: s
						},
						r = t.value.containers[c],
						{
							semanticURL: a
						} = (e => {
							const {
								accessedOrder: t,
								items: n
							} = e;
							if (t && t.length > 1) {
								const e = n[t[t.length - 2]],
									{
										semanticURL: r
									} = e;
								if (r) return e
							}
							return {
								semanticURL: ""
							}
						})(r);
					await ns({
						directUrlUpdation: !0,
						semanticURL: a
					}, n, e)
				}
				if (n.isProcessAction && n.parentCaseInfo) {
					const e = {
							insKey: n.parentCaseInfo.ID,
							className: n.parentCaseInfo.content.classID,
							context: n.parentContext,
							acTargetName: W.PRIMARY,
							isChild: !0
						},
						t = {
							type: Ue,
							payload: {
								...e
							}
						};
					a.push(t)
				}
				const d = {
					target: c,
					containerItemID: s,
					context: s,
					caseDeleted: !0
				};
				return a.push(eh(zp, d)), a
			})), Ll((() => (op(a), za(a, r) === W.PROMISE_VALUE.RESOLVE && Ly({
				caseType: n
			}), a = [], a))))
		}, Uy = (e, t) => {
			const {
				assignmentID: n,
				actionID: r,
				context: a
			} = e, {
				restApi: s,
				reqType: o
			} = Eh("save", {
				assignmentID: n,
				actionID: r
			}), {
				content: i
			} = es(a), c = t.value.data[a]?.caseInfo?.headers;
			return zd(yl(s, {
				method: o,
				body: i,
				headers: {
					"if-match": c && c.etag
				}
			}, a)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za(t.headers)
			}))), zl(": Error ocurred during ajax call at saveAndCloseAssignment Epic at save action : ", a))
		}, Fy = (e, t = !1) => {
			const {
				action: n,
				state$: r,
				actionMgrID: a
			} = e;
			let s = [];
			return Vl(n.payload).pipe(jl((e => Uy(e, r))), jl((e => {
				if (e && Ma(e.type)) return Vl(e);
				if (e.actionInPayload.isProcessAction && e.response.data.caseInfo.parentCaseInfo) {
					const t = `${e.actionInPayload?.containerItemID.includes("root")?W.APP.ROOT:W.APP.APP}/${$s.PRIMARY}`,
						n = cs(t, $s.PRIMARY),
						r = {
							insKey: e.response.data.caseInfo.parentCaseInfo.ID,
							className: e.response.data.caseInfo.parentCaseInfo.content.classID,
							context: n,
							acTargetName: W.PRIMARY,
							isChild: !0
						},
						a = {
							type: Ue,
							payload: {
								...r
							}
						};
					s.push(a)
				}
				let t = !1;
				const {
					containerItemID: n
				} = e && e.actionInPayload, r = Ie(n), a = Zs(r), o = Ps(a), i = Ms(a);
				if (o?.items?.[i]?.key === e?.actionInPayload?.caseID && (t = !0), t) {
					const t = {
						context: r,
						data: {
							...e.response.data
						}
					};
					s.push(eh(Np, t)), s.push(eh(Bp, {
						context: n
					}));
					const a = {
						context: n,
						data: {
							caseInfo: {
								headers: e.headers
							}
						}
					};
					s.push(eh(Np, a))
				}
				return e.actionInPayload.RemoteSystemID = q.getRemoteHeaderByContext(e.actionInPayload.context) ?? void 0, Ty(e.actionInPayload)
			})), jl((async e => {
				if (e && Ma(e.type)) {
					const {
						payload: t
					} = e, n = os({
						...e,
						...t,
						actionMgrID: a
					});
					return s.push(n), s
				}
				const {
					actionInPayload: n
				} = e, {
					context: r,
					containerName: o
				} = n, i = {
					target: Ft(o, r),
					containerItemID: r,
					context: r
				};
				return t || s.push(eh(zp, i)), s
			})), Ll((() => (op(s), za(s, a), t || (s = []), s))))
		}, ky = (e, t) => {
			let n, r = 0;
			return e.pipe(wl(vl), Ml((e => {
				const {
					saveOnly: a
				} = e.payload;
				({
					actionMgrID: r,
					caseType: n
				} = e.payload);
				return Fy({
					action: e,
					state$: t,
					actionMgrID: r,
					caseType: n
				}, a)
			})))
		}, Vy = e => {
			const {
				callbacks: t
			} = e;
			if (t?.submit) {
				const e = e => {
					var n;
					t.submit(e), n = "expressLocalActionSubmit", Ta.unsubscribe(W.PUB_SUB_EVENTS.EVENT_EXPRESS_LOCALACTION, n)
				};
				n = e, r = "expressLocalActionSubmit", Ta.subscribe(W.PUB_SUB_EVENTS.EVENT_EXPRESS_LOCALACTION, n, r)
			}
			var n, r
		}, {
			LOCAL_ACTION_TYPE: Gy
		} = W, {
			RESOURCE_TYPES: By
		} = H, Hy = (e, t) => {
			const {
				actionID: n,
				assignmentID: r,
				caseID: a,
				context: s,
				openActionType: o
			} = e, {
				isProcessAction: i
			} = t, c = i ? At : (e => {
				const t = e.localActionType.toLowerCase();
				return t === Gy.CASE_WIDE || t === Gy.EXPRESS ? _t : Et
			})(e), d = Ja.FORM, {
				reqType: l
			} = Eh(c, {
				caseID: a,
				ID: r,
				actionID: n,
				viewType: d
			});
			let {
				restApi: u
			} = Eh(c, {
				caseID: a,
				ID: r,
				actionID: n,
				viewType: d
			});
			return e.actionType = c === _t ? W.CASE : W.ASSIGNMENT, u.includes("viewType=") || (u = u.includes("?") ? `${u}&viewType=${d}` : `${u}?viewType=${d}`), zd(yl(u, {
				method: l,
				headers: {}
			}, s)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za(t.headers)
			}))), zl(`: Error ocurred during ajax call at ${o} Epic : `, s))
		}, Wy = (e, t) => {
			const {
				isProcessAction: n
			} = t, r = n ? At : Et;
			e.openActionType = r;
			let a;
			if ("modal" === Ra(r, e)) {
				a = Vs(e.contextName)[0] ? Vs(e.contextName) : Zs(e.contextName);
				const n = a ? Ms(a) : e.contextName,
					r = Us(n);
				if (!Vs(e.contextName)[0]) return Hy(e, t);
				if (!e.continueExecution) return Hy(e, t);
				if (!fa(r)) return Hy(e, t);
				return zd([Nl(e.saveActionPayload)]).pipe(jl((e => (e => {
					let t, n = 0;
					const r = [],
						a = {
							value: sp().getState()
						};
					return Vl(e).pipe(wl(vl), Ml((e => {
						const {
							isFormValid: s
						} = e.payload;
						if (({
								actionMgrID: n,
								caseType: t
							} = e.payload), !s) {
							const e = {
								type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
							};
							return vn.rejectActionByID(n, !0, e), Vl([])
						}
						return Fy({
							action: e,
							state$: a,
							actionMgrID: n,
							caseType: t,
							actionsOut: r
						}, !0)
					})))
				})(e))), jl((n => {
					if (1 === n.length && Ma(n[0].type)) {
						const {
							continueExecution: n
						} = us(a);
						if (!n) return vn.rejectActionByID(e.actionMgrID), Bl.pipe(Yd((() => Hl()))).toPromise();
						if (n) return Hy(e, t)
					}
					return Hy(e, t)
				})), Ll((e => e)))
			}
			return Hy(e, t)
		}, qy = async (e, t, {
			headers: n,
			actionInPayload: r
		}) => {
			const {
				context: a,
				actionName: s,
				openActionType: o,
				doDeleteCaseSummary: i
			} = r, c = Pf(e), d = Ra(o, r), l = Ft(d, a);
			let u, p, h = !1;
			!qs(l) || Ws(l) && !Rs(l, e.data.caseInfo.ID) || wa(d) ? (p = Ee(d, a), wa(d) && (p = Ce(a, p)), u = p, h = !0) : (u = Ws(l) ? Ds(l, e.data.caseInfo.ID) : Ms(l), p = Us(u));
			const g = {
				acName: l,
				target: l,
				containerName: d,
				context: p
			};
			await ns(c, r, g);
			const f = c.uiResources?.root;
			let y;
			y = f ? W.PERFORM_MODE : W.REVIEW_MODE;
			const m = ts(c, {
				target: l,
				context: p,
				containerItemID: u,
				caseViewMode: y,
				doDeleteCaseSummary: i,
				headers: n,
				actionName: s,
				isMinimizable: !1,
				isInCreateStage: wa(d),
				resourceType: By.ASSIGNMENT,
				isProcessAction: r.isProcessAction,
				showProgress: r.showProgress,
				progressMessage: r.progressMessage,
				assignmentID: r.assignmentID,
				actionType: r.actionType
			});
			f && Wa(m, c), wa(d) && delete m.doDeleteCaseSummary, r.openActionType === St && (m.isBulkAction = !0, m.data.caseInfo.actionButtons.main[0].jsAction = "submitBulkAction", m.data.caseInfo.actionButtons.secondary[0].jsAction = "cancelBulkAction", m.data.caseInfo.cases = r.selectedList);
			const I = h ? Up : Bp;
			if (t.push(eh(I, m)), h) {
				const a = Vs(r.contextName),
					s = Ds(a, e.data.caseInfo.ID);
				if (s) {
					const e = {
						data: {
							caseInfo: {
								headers: n
							}
						},
						context: s
					};
					t.push(eh(Np, e))
				}
			}
			return u !== Ms(l) && t.push(eh(Wp, {
				target: l,
				containerItemID: u
			})), Ha(u) && ys(m, t), m.caseViewMode === W.REVIEW_MODE && t.push(eh(zp, m)), t
		}, zy = "OPEN_LOCAL_ACTION", Yy = (e, t) => Wy(e, t), Ky = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(zy), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => Yy(e, {
				actionMgrID: t
			}))), jl((async e => {
				if (!e) return Bl;
				if (Ma(e.type)) {
					const t = os(e);
					return n.push(t), n
				}
				const {
					actionInPayload: t,
					headers: r,
					response: a
				} = e, {
					actionID: s
				} = t;
				return _p.setIn(a, "data.caseInfo.activeActionID", s), _p.setIn(a.data, W.CASE_INFO_IS_LOCAL_ACTION, !0), t.refreshConditions && _p.setIn(a.data, W.CASE_INFO_REFRESH_CONDITIONS, t.refreshConditions), await qy(a, n, {
					headers: r,
					actionInPayload: t
				}), Vy(t), n
			})), Ll((() => (op(n), za(n, t), n = [], n))))
		}, Xy = e => {
			const {
				actionID: t,
				context: n,
				openActionType: r,
				caseTypeID: a,
				bulkContextID: s = "",
				bulkContextType: o = ""
			} = e, i = St, {
				reqType: c,
				restApi: d
			} = Eh(i, {
				caseTypeID: a,
				actionID: t,
				bulkContextID: s,
				bulkContextType: o
			});
			return zd(yl(d, {
				method: c
			}, n)).pipe(Ll((t => ({
				response: t.data,
				actionInPayload: e,
				headers: Za(t.headers)
			}))), zl(`: Error ocurred during ajax call at ${r} Epic : `, n))
		}, Jy = e => {
			const {
				callbacks: t
			} = e;
			if (t?.submit) {
				const e = e => {
					var n;
					t.submit(e), n = "bulkActionSubmit", Ta.unsubscribe(W.PUB_SUB_EVENTS.EVENT_BULKACTION, n)
				};
				n = e, r = "bulkActionSubmit", Ta.subscribe(W.PUB_SUB_EVENTS.EVENT_BULKACTION, n, r)
			}
			var n, r
		}, Qy = "OPEN_BULK_ACTION", Zy = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(Qy), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => ((e, t) => {
				const {
					context: n
				} = e, {
					actionMgrID: r
				} = t;
				e.openActionType = St;
				const a = Ra(St, e),
					s = Ft(a, n),
					{
						continueExecution: o
					} = us(s);
				return o ? Xy(e) : (vn.rejectActionByID(r), Hl())
			})(e, {
				actionMgrID: t
			}))), jl((async e => {
				if (e && Ma(e.type)) {
					const t = os(e);
					return n.push(t), n
				}
				const {
					actionInPayload: t,
					headers: r,
					response: a
				} = e, {
					actionID: s
				} = t;
				return _p.setIn(a, "data.caseInfo.activeActionID", s), await qy(a, n, {
					headers: r,
					actionInPayload: t
				}), Jy(t), n
			})), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], n))))
		};
	var em = Array.isArray,
		tm = Object.getPrototypeOf,
		nm = Object.prototype,
		rm = Object.keys;

	function am(e) {
		if (1 === e.length) {
			var t = e[0];
			if (em(t)) return {
				args: t,
				keys: null
			};
			if ((r = t) && "object" == typeof r && tm(r) === nm) {
				var n = rm(t);
				return {
					args: n.map((function(e) {
						return t[e]
					})),
					keys: n
				}
			}
		}
		var r;
		return {
			args: e,
			keys: null
		}
	}
	var sm = Array.isArray;

	function om(e) {
		return Ll((function(t) {
			return function(e, t) {
				return sm(t) ? e.apply(void 0, Kc([], Yc(t))) : e(t)
			}(e, t)
		}))
	}

	function im() {
		for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
		var n = function(e) {
				return ed(Fl(e)) ? e.pop() : void 0
			}(e),
			r = am(e),
			a = r.args,
			s = r.keys,
			o = new Td((function(e) {
				var t = a.length;
				if (t)
					for (var n = new Array(t), r = t, o = t, i = function(t) {
							var i = !1;
							jd(a[t]).subscribe(Vd(e, (function(e) {
								i || (i = !0, o--), n[t] = e
							}), (function() {
								return r--
							}), void 0, (function() {
								r && i || (o || e.next(s ? function(e, t) {
									return e.reduce((function(e, n, r) {
										return e[n] = t[r], e
									}), {})
								}(s, n) : n), e.complete())
							})))
						}, c = 0; c < t; c++) i(c);
				else e.complete()
			}));
		return n ? o.pipe(om(n)) : o
	}
	const cm = e => {
			const {
				actionID: t,
				context: n,
				cases: r,
				classID: a
			} = e, {
				content: s
			} = es(n, {
				nonEmptyAndChangedData: !0
			});
			let o = 5;
			try {
				const e = ou.getSharedState("D_pySingleExecutionBulkActionsMeta.D_pySingleExecutionBulkActionsMeta.pxResults");
				e?.find((e => e.pyClassName === a))?.pyList.split(",").includes(t) && (o = 1)
			} catch (e) {
				console.error('Failed to fetch to "D_pySingleExecutionBulkActionsMeta" DP response', e)
			}
			const i = r.map((e => ({
					ID: e
				}))),
				c = i.length / o,
				{
					reqType: d,
					restApi: l
				} = Eh("performBulkAction", {
					actionID: t
				}),
				u = [],
				p = i.length;
			for (let t = 0; t < p; t += c) s.cases = i.slice(t, t + c), s.cases.length && u.push(zd(yl(l, {
				method: d,
				body: s
			}, n)).pipe(Ll((t => {
				const {
					data: n,
					headers: r
				} = t;
				return {
					response: n,
					actionInPayload: e,
					headers: Za({
						...r
					})
				}
			})), zl("Error ocurred during ajax call at submitbulkaction Epic : ", n)));
			return im(u)
		},
		dm = e => {
			Ta.publish(W.PUB_SUB_EVENTS.EVENT_BULKACTION, e)
		},
		lm = "SUBMIT_BULK_ACTION",
		um = e => {
			let t, n = 0,
				r = [],
				a = "";
			return e.pipe(wl(lm), Ml((e => {
				const {
					isFormValid: s
				} = e.payload;
				if (({
						actionMgrID: n
					} = e.payload), !s) {
					const e = {
						type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
					};
					return vn.rejectActionByID(n, !0, e), Vl([])
				}
				return Vl(e.payload).pipe(jl((e => (t = e, cm(t)))), jl((e => {
					let n = 0,
						s = 0;
					const o = [],
						{
							containerItemID: i,
							context: c
						} = t;
					return e.map((e => {
						const {
							response: t
						} = e;
						n += Number(t.successCount), s += Number(t.failureCount), s && t.results.map((e => {
							"200" !== e.status && e.error && e.error.errorDetails && e.error.errorDetails.forEach((t => {
								o.push({
									ID: e.BusinessID,
									message: t.localizedValue
								})
							}))
						}))
					})), a = `${n} record(s) updated`, dm({
						submitResponse: e
					}), t.target = `${W.APP.APP}/${$s.MODAL}`, r.push(eh(zp, {
						containerItemID: i,
						context: c,
						target: t.target,
						skipReleaseLockRequest: !0
					})), s && r.push(eh(qp, {
						messages: [{
							type: "error",
							message: `${s} records failed to update`,
							errorDetails: o,
							showHeader: !1
						}],
						context: Ie(c) || c,
						category: "HTTP",
						showHeader: !1
					})), r
				})), Ll((() => (vn.resolveActionByID(n, a), op(r), r = [], r))))
			})))
		},
		pm = (e, t) => Wy(e, t),
		hm = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(Pl), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => (nr(e.context), pm(e, {
				actionMgrID: t,
				isProcessAction: !0
			})))), jl((async e => {
				if (e && Ma(e.type)) {
					const t = os(e);
					return n.push(t), n
				}
				const {
					actionInPayload: t,
					headers: r,
					response: a
				} = e;
				return await qy(a, n, {
					headers: r,
					actionInPayload: t
				}), n
			})), Ll((() => (ms(n), za(n, t), n = [], n))))
		},
		gm = e => {
			let t = 0,
				n = [];
			return e.pipe(wl(Je, it), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					containerItemID: t,
					caseID: n,
					context: r,
					caseDeleted: a,
					skipReleaseLockRequest: s
				} = e;
				return t !== r || !n || a || s ? Vl([]) : Ty(e)
			})), jl((e => (e && Ma(e.type) && n.push(os(e)), n))), Ll((() => (op(n), za(n, t), n = [], n))))
		};
	var fm = new qh(Gh),
		ym = fm;

	function mm(e, t, n) {
		void 0 === e && (e = 0), void 0 === n && (n = ym);
		var r = -1;
		return null != t && (Ul(t) ? n = t : r = t), new Td((function(t) {
			var a, s = (a = e) instanceof Date && !isNaN(a) ? +e - n.now() : e;
			s < 0 && (s = 0);
			var o = 0;
			return n.schedule((function() {
				t.closed || (t.next(o++), 0 <= r ? this.schedule(void 0, r) : t.complete())
			}), s)
		}))
	}

	function Im(e, t) {
		return void 0 === e && (e = 0), void 0 === t && (t = fm), e < 0 && (e = 0), mm(e, e, t)
	}

	function Em(e) {
		return kd((function(t, n) {
			var r = !1,
				a = null,
				s = null,
				o = function() {
					if (null == s || s.unsubscribe(), s = null, r) {
						r = !1;
						var e = a;
						a = null, n.next(e)
					}
				};
			t.subscribe(Vd(n, (function(t) {
				null == s || s.unsubscribe(), r = !0, a = t, s = Vd(n, o, pd), jd(e(t)).subscribe(s)
			}), (function() {
				o(), n.complete()
			}), void 0, (function() {
				a = s = null
			})))
		}))
	}
	const Am = (e, t, n, r, a) => {
			if (a !== W.RESOURCE_STATUS.CREATE) return;
			Fr.isStateMachineExist(e, t, n) || Fr.setStateMachine(e, n, t, new hr(n, t, e));
			Fr.getStateMachine(e, t, n).insert({}, r + 1, !0, {
				isDefault: !0
			})
		},
		_m = e => {
			const {
				context: t
			} = e;
			let n = {
				...es(t).content,
				contextData: !1
			};
			const r = Es(t);
			_p.isEmpty(r) || (n = Is(r, n));
			const {
				restApi: a,
				reqType: s
			} = Eh("refreshCaseView", e);
			return n.interestPage = e.interestPage, zd(yl(a, {
				method: s,
				body: n
			}, t)).pipe(Ll((t => ({
				actionInPayload: e,
				response: t.data,
				headers: Za(t.headers)
			}))), zl(": Error ocurred during ajax call : ", t))
		},
		Sm = e => {
			let t = 0,
				n = [],
				r = "";
			return e.pipe(wl(Lt), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => _m(e))), jl((async e => {
				if (e && e.type === ze) return n.push(os(e)), {
					actionsOut: n,
					actionInPayload: {
						skipPageInstructions: !0
					}
				};
				const {
					actionInPayload: t,
					response: a
				} = e, s = t.containerName, o = Ft(s, t.context);
				let i = cs(o, s, t.context);
				i = Ce(t.context, i);
				const c = Pf(a);
				c.key = t.ID, c.data.caseInfo.ID = t.ID;
				const d = {
					isMultiRecordData: !0,
					viewName: t.viewID,
					parentContext: t.context,
					interestPage: t.interestPage
				};
				c.uiResources.context_data.modalView = d;
				const l = ip(t.context)?.context_data?.caseInfo,
					u = Yn(l, t.targetProperty.slice(1), t.index);
				c.uiResources.context_data.caseInfo = u;
				const p = {
					acName: o,
					context: i
				};
				await ns(c, t, p);
				const h = ts(c, {
					target: o,
					context: i,
					containerItemID: i
				});
				h.resourceStatus = t.actionType, h.isMultiRecordData = !0, h.parentContext = t.context;
				const g = is(o, h);
				return r = i, n.push(g), gs(n), {
					actionsOut: n,
					actionInPayload: t
				}
			})), Ll((({
				actionInPayload: e
			}) => (La(n) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], e.skipPageInstructions || Am(r, e.pageReference, e.targetProperty, e.index, e.actionType), n))))
		},
		Cm = e => {
			let t, n = "",
				r = [];
			return e.pipe(wl(jt), Ml((e => {
				t = e.payload;
				const {
					isFormValid: a
				} = e.payload;
				if (({
						actionMgrID: n
					} = e.payload), !a) {
					const e = {
						type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
					};
					return vn.rejectActionByID(n, !0, e), Vl([])
				}
				return Vl(e.payload).pipe(jl((e => (t = e, _m(t)))), jl((async e => {
					if (e && e.type === ze) {
						const t = os(e);
						return r.push(t), r
					}
					const {
						containerItemID: n,
						context: a
					} = t;
					var s, o, i, c;
					return s = a, o = t.parentContext, i = H.CASE_INFO.CASE_INFO_CONTENT, c = !1, _r(s).forEach((e => {
						const t = _p.convertClipboardPageToPageRefNotation(e.target);
						Fr.isStateMachineExist(o, i, t) || Fr.setStateMachine(o, t, i, new hr(t, i, o));
						const n = Fr.getStateMachine(o, i, t);
						switch (e.instruction.toLowerCase()) {
							case "insert":
								n.insert(e.content, e.listIndex, c, {});
								break;
							case "update":
								n.update(e.content, e.listIndex, c, {});
								break;
							case "delete":
								e.listIndex ? n.delete(e.listIndex, c) : n.deletePage();
								break;
							case "replace":
								n.replacePage(e.content);
								break;
							case "move":
								n.move(e.listIndex, e.listMoveToIndex);
								break;
							case "delete all":
								n.deleteAll()
						}
					})), r.push(eh(zp, {
						containerItemID: n,
						context: a,
						target: t.target,
						skipReleaseLockRequest: !0
					})), r
				})), Ll((() => {
					if (La(r)) vn.rejectActionByID(n);
					else {
						vn.resolveActionByID(n);
						const {
							pageReference: r
						} = e.payload;
						if ($p.getProperyValue(W.CONTEXT_DATA_MODAL_VIEW.IS_MULTI_RECORD_DATA, r, t.parentContext)) {
							const e = $p.getProperyValue(H.CASE_INFO.CASE_INFO_ID, r, t.parentContext),
								n = $p.getProperyValue(W.CONTEXT_DATA_MODAL_VIEW.VIEW_NAME, r, t.parentContext),
								a = t.pageReference?.substring(0, t.pageReference?.lastIndexOf(".")),
								s = a.replace(W.CASE_INFO.CASE_INFO_CONTENT, "");
							wn(e, n, t.parentContext, s, {})
						} else Un(t.parentContext, "caseInfo.content", {})
					}
					return op(r), r = [], r
				})))
			})))
		},
		$m = [Jf, sy, ly, Ky, Zy, um, hm, Py, wy, Ny, gm, ky, jy, e => e.pipe(wl(It), Em((() => Im(100))), Ll((e => {
			const {
				actionMgrID: t,
				isChildCase: n,
				isModalAction: r,
				isProcessAction: a,
				isDataObject: s,
				skipReleaseLockRequest: o
			} = e.payload;
			return vn.resolveActionByID(t), Ta.publish(W.PUB_SUB_EVENTS.EVENT_SHOW_CANCEL_ALERT, {
				isModalAction: r,
				hideDelete: !a && n,
				isDataObject: s,
				skipReleaseLockRequest: o
			}), []
		}))), e => e.pipe(wl(ct), Em((() => Im(100))), Ll((e => {
			const {
				actionMgrID: t,
				context: n,
				containerName: r,
				containerItemID: a
			} = e.payload, s = Ft(r, n);
			return vn.resolveActionByID(t), op(eh(Wp, {
				containerItemID: a,
				target: s,
				doDeleteCaseSummary: !1
			})), []
		}))), Sm, Cm],
		bm = $m;

	function Pm() {
		return kd((function(e, t) {
			e.subscribe(Vd(t, pd))
		}))
	}
	const {
		RESOURCE_TYPES: Om
	} = H, Tm = [e => e.pipe(wl(ve), Ll((e => e.payload)), jl((e => {
		const t = {
				caseID: e.caseId,
				viewID: e.viewName,
				caseClassName: e.caseClassName,
				RemoteSystemID: e.RemoteSystemID
			},
			n = {};
		if (t.RemoteSystemID) n.RemoteSystemID = t.RemoteSystemID;
		else if (q.isRemoteCase(t.caseClassName)) {
			const {
				RemoteSystemID: e
			} = q.getRemoteCase(t.caseClassName);
			n.RemoteSystemID = e
		}
		let {
			restApi: r,
			reqType: a
		} = Eh("loadView", t);
		return e.viewContext === Om.PAGE && ({
			restApi: r,
			reqType: a
		} = Eh(ut, {
			page: e.viewName,
			pageClass: e.pageClass
		})), zd(yl(r, {
			method: a,
			headers: n
		}, e.context)).pipe(Ll((t => {
			const n = decodeURI(e.caseId);
			let r = "";
			return "string" == typeof t.data ? t.data ? r = JSON.parse(t.data) : (console.error("response data is empty!!"), r = {}) : r = t.data, {
				response: {
					...r,
					key: n
				},
				actionConfig: e,
				headers: Za(t.headers),
				rootView: _p.getIn(r, W.ROOT)
			}
		})), zl(": Error ocurred during ajax call at loadView Epic : ", e.context))
	})), jl((async e => {
		const t = {};
		if (e?.type === ze) return t.actionsOut = os(e), t;
		try {
			t.actionMgrID = e?.actionConfig?.actionMgrID, t.rootView = e?.rootView;
			const {
				actionConfig: n,
				response: r,
				headers: a
			} = e, {
				containerItemID: s,
				container: o,
				updateData: i
			} = n, c = o || ba.getTargetViewContainerName(ut), d = Ft(c, n.context), l = o === $s.PREVIEW && i ? n.context : cs(d, c, n.context, {
				buildNew: !!o
			});
			n.context = l;
			const u = {
				acName: d,
				context: l
			};
			let p = {};
			p = o === $s.PREVIEW ? Pf(r) : Pf(r, {
				[H.STOPMERGEACTIONS]: !0,
				[H.ACTIONS.DELETEAVIALACTIONS]: !0
			}), p.directUrlUpdation = !1, await ns(p, n, u);
			const h = {
					...n,
					target: d,
					context: l,
					containerItemID: s || l,
					headers: a
				},
				g = ts(p, h);
			if (g.resourceType = Om.CASE, o && !i) {
				g.caseViewMode = W.REVIEW_MODE, g.caseViewMode = W.REVIEW_MODE;
				const e = Zs(g?.context);
				((e, t, n, r, a) => {
					e ? (r.actionsOut = [], r.actionsOut.push(eh(Wp, {
						target: t,
						containerItemID: e
					}))) : r.actionsOut = eh(Up, {
						...n,
						container: a
					})
				})(Ds(e, g.key), e, g, t, o)
			} else g.preserveClientChanges = !0, t.actionsOut = [], t.actionsOut.push({
				type: Nt,
				payload: {
					context: l
				}
			}), t.actionsOut.push(eh(Np, g))
		} catch (e) {
			console.error(e), t.rootView = {
				type: "error",
				payload: e
			}
		}
		const {
			caseId: n,
			context: r,
			viewName: a
		} = e.actionConfig;
		return "pyCasePreview" === a && (e => {
			Ta.publish(W.PUB_SUB_EVENTS.CASE_EVENTS.CASE_PREVIEW, e)
		})({
			caseId: n,
			context: r
		}), t
	})), Ll((({
		rootView: e,
		actionsOut: t,
		actionMgrID: n = 0
	}) => (vn.resolveActionByID(n, e), t)))), e => {
		let t = 0,
			n = [];
		return e.pipe(wl(Ne), Ll((e => (({
			actionMgrID: t
		} = e.payload), e.payload))), jl((e => {
			const {
				debugInfo: n,
				context: r,
				viewName: a,
				className: s,
				skipSemanticUrl: o = !1,
				containerName: i = ba.getTargetViewContainerName(ut)
			} = e, c = n && {
				...il.addDebugHeaders(n)
			}, d = Ft(i, r);
			let l = "",
				u = {},
				p = !0;
			if (!o) {
				if (l = mh(ut, {
						page: a
					}), d && l) {
					const {
						activate: t,
						activateContainerActionPayload: n
					} = hs(Om.PAGE, d, {
						semanticURL: l
					});
					if (t) return Vl({
						type: at,
						activateContainerActionPayload: n,
						actionConfig: e
					})
				}
				if (Ms(d) && ({
						continueExecution: p,
						removeActionPayload: u
					} = us(d)), !p) return vn.rejectActionByID(t), Hl()
			}
			const {
				restApi: h,
				reqType: g
			} = Eh(ut, {
				page: a,
				pageClass: s
			});
			return zd(yl(h, {
				method: g,
				headers: c
			}, r)).pipe(Ll((t => {
				let n = {};
				return n = "string" == typeof t.data ? JSON.parse(t.data) : t.data, {
					response: {
						...n,
						key: l,
						semanticURL: l
					},
					actionConfig: e,
					headers: Za(t.headers),
					removeActionPayload: u,
					skipSemanticUrl: o
				}
			})), zl(": Error ocurred during ajax call at showPage Epic : ", e.context))
		})), jl((async e => {
			if (e && e.type === ze) return n.push(os(e)), n;
			const {
				type: t,
				actionConfig: r,
				skipSemanticUrl: a
			} = e, s = r.containerName || ba.getTargetViewContainerName(Ne), o = Ft(s, r.context);
			if (Ta.publish(H.PUB_SUB_EVENTS.UI_EVENTS.SHOW_PAGE_INIT, {
					pageName: e.actionConfig.viewName,
					pageClass: e.actionConfig.className
				}), t === at) {
				const {
					activateContainerActionPayload: {
						semanticURL: t,
						containerItemID: a
					}
				} = e, s = {
					acName: o,
					context: Us(a)
				};
				await ns({
					directUrlUpdation: !0,
					semanticURL: t
				}, r, s, !0), n.push(eh(Wp, {
					target: o,
					containerItemID: a
				}))
			} else {
				const t = cs(o, s, r.context),
					{
						response: i,
						headers: c = {},
						removeActionPayload: d
					} = e,
					l = Pf(i, {
						isCreateDataObject: r.isCreateDataObject
					});
				l.directUrlUpdation = !a;
				const u = {
					acName: o,
					context: t
				};
				await ns(l, r, u);
				const p = {
						target: o,
						context: t,
						containerItemID: t,
						headers: c,
						debugInfo: r.debugInfo
					},
					h = ts(l, p);
				h.resourceType = H.PAGE, r.isCreateDataObject && (h.resourceType = H.RESOURCE_TYPES.DATA, h.resourceStatus = H.RESOURCE_STATUS.CREATE, delete h.data.caseInfo);
				const g = is(o, h);
				d.containerItemID && ds(g) && n.push(eh(zp, {
					containerItemID: d.containerItemID,
					target: o
				})), n.push(g), gs(n)
			}
			return Ta.publish(H.PUB_SUB_EVENTS.UI_EVENTS.SHOW_PAGE_DONE, {
				target: o,
				pageName: e.actionConfig.viewName,
				pageClass: e.actionConfig.className
			}), n
		})), Ll((() => {
			vn.resolveActionByID(t), op(n), n = []
		})), Pm())
	}], vm = Tm, Nm = (e, t) => {
		const {
			context: n,
			pageName: r,
			dataContext: a,
			dataContextParameters: s,
			semanticURL: o,
			skipSemanticUrl: i
		} = e, {
			removeActionPayload: c
		} = t, {
			restApi: d,
			reqType: l,
			body: u
		} = Eh(pt, {
			pageName: r,
			dataContext: a,
			dataContextParameters: s
		});
		return zd(yl(d, {
			method: l,
			body: u
		}, n)).pipe(Ll((t => ({
			response: {
				...t.data,
				key: o,
				semanticURL: o
			},
			actionConfig: e,
			headers: Za(t.headers),
			removeActionPayload: c,
			skipSemanticUrl: i
		}))), zl("Error ocurred during ajax call at showData Epic : ", e.context))
	}, {
		RESOURCE_TYPES: Rm
	} = H, Dm = e => {
		let t, n = 0,
			r = [];
		return e.pipe(wl(Re), Ml((e => (({
			actionMgrID: n
		} = e.payload), Vl(e.payload).pipe(jl((e => ((e, t) => {
			const {
				context: n,
				pageName: r,
				dataContext: a,
				dataContextParameters: s,
				skipSemanticUrl: o = !1,
				isDeferLoaded: i = !1
			} = e;
			let {
				containerName: c
			} = e;
			c || (c = ba.getTargetViewContainerName(Ne));
			const d = Ft(c, n);
			let l = "",
				u = {},
				p = !1;
			if (!o) {
				l = mh(pt, {
					pageName: r,
					dataViewName: a
				}, s);
				const {
					activate: n,
					activateContainerActionPayload: o
				} = hs(Rm.PAGE, d, {
					semanticURL: l
				});
				if (n) return Vl({
					type: at,
					activateContainerActionPayload: o,
					actionConfig: e
				});
				if (({
						continueExecution: p,
						removeActionPayload: u
					} = us(d)), !p) return vn.rejectActionByID(t), Hl()
			}
			return Nm({
				context: n,
				pageName: r,
				dataContext: a,
				dataContextParameters: s,
				semanticURL: l,
				skipSemanticUrl: o,
				containerName: c,
				isDeferLoaded: i
			}, {
				removeActionPayload: u
			})
		})(e, n))), jl((async e => {
			if (e && e.type === ze) return r.push(os(e)), r;
			const {
				type: n,
				actionConfig: a,
				headers: s,
				response: o,
				skipSemanticUrl: i
			} = e;
			t = _p.getIn(o, W.ROOT);
			const {
				containerName: c
			} = a, d = Ft(c, a.context);
			let l;
			if (a.isDeferLoaded) {
				l = Pf(o), l.directUrlUpdation = !i;
				const t = {
					acName: d,
					context: a.context
				};
				await ns(l, a, t);
				const n = {
						target: d,
						headers: s,
						context: a.context,
						containerItemID: e.containerItemID
					},
					c = ts(l, n);
				return r = eh(Np, c), r
			}
			if (n === at) {
				const {
					activateContainerActionPayload: {
						semanticURL: t,
						containerItemID: n
					}
				} = e, s = {
					acName: d,
					context: Us(n)
				};
				await ns({
					directUrlUpdation: !0,
					semanticURL: t
				}, a, s, !0), r.push(eh(Wp, {
					target: d,
					containerItemID: n,
					resourceType: Rm.DATA
				}))
			} else {
				const t = cs(d, c, a.context),
					{
						removeActionPayload: n
					} = e;
				l = Pf(o), l.directUrlUpdation = !i;
				const u = {
					acName: d,
					context: t
				};
				await ns(l, a, u);
				const p = ts(l, {
					target: d,
					context: t,
					containerItemID: t,
					headers: s
				});
				p.resourceType = Rm.DATA;
				const h = is(d, p);
				n.containerItemID && ds(h) && r.push(eh(zp, {
					containerItemID: n.containerItemID,
					target: d
				})), r.push(h), gs(r)
			}
			return r
		})), Ll((() => (vn.resolveActionByID(n, t), op(r), r = [], r))))))))
	}, xm = e => {
		const {
			dataViewName: t,
			context: n,
			dataViewParameters: r
		} = e, a = {
			data_view_ID: t,
			dataViewParameters: encodeURIComponent(JSON.stringify(r))
		}, {
			restApi: s,
			reqType: o
		} = Eh("deleteDataObject", a);
		return zd(yl(s, {
			method: o
		}, n)).pipe(Ll((t => ({
			response: t.data,
			actionInPayload: e
		}))), zl("Error ocurred during ajax call at deleteDataObject Epic", n))
	}, wm = e => {
		let t = 0,
			n = [];
		return e.pipe(wl(xt), Yl(100), Ll((e => (({
			actionMgrID: t
		} = e.payload), e.payload))), jl((e => xm(e))), jl((async e => {
			if (e && e.type === ze) {
				const {
					payload: r
				} = e, a = os({
					...e,
					...r,
					actionMgrID: t
				});
				return n.push(a), n
			}
			return []
		})), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], n))))
	}, Mm = e => {
		const {
			dataViewID: t,
			dataViewParameters: n,
			context: r
		} = e, a = {
			data_view_ID: t
		}, {
			restApi: s,
			reqType: o
		} = Eh("getDataObjectActions", a);
		return zd(yl(s, {
			method: o,
			body: {
				dataViewParameters: n
			}
		}, r)).pipe(Ll((e => ({
			...e.data
		}))), zl("Error ocurred during ajax call at GET data object actions : ", e.context))
	}, Lm = e => {
		let t = 0,
			n = [];
		let r = {};
		return e.pipe(wl(We), Yl(100), Ll((e => (({
			actionMgrID: t
		} = e.payload), e.payload))), jl((e => Mm(e))), jl((async e => e && e.type === ze ? (n.push(os(e)), n) : (r = e, []))), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t, r), op(n), n = [], n))))
	}, jm = [Dm, e => {
		let t = 0,
			n = [];
		return e.pipe(wl(Dt), Yl(100), Ml((e => {
			const {
				isFormValid: r
			} = e.payload;
			if (({
					actionMgrID: t
				} = e.payload), !r) {
				const e = {
					type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
				};
				return vn.rejectActionByID(t, !0, e), Vl([])
			}
			return Vl(e.payload).pipe(jl((e => Kl(e))), jl((async e => {
				if (e && e.type === ze) {
					const {
						payload: r
					} = e, a = os({
						...e,
						...r,
						actionMgrID: t
					});
					return n.push(a), n
				}
				const {
					actionInPayload: r
				} = e, {
					containerItemID: a,
					isModalAction: s
				} = r, o = s ? $s.MODAL : $s.PRIMARY, i = {
					target: Ft(o, a),
					containerItemID: a,
					context: a
				};
				return n.push(eh(zp, i)), n
			})), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], n))))
		})))
	}, e => {
		let t = 0,
			n = [];
		return e.pipe(wl(wt), Yl(100), Ll((e => (({
			actionMgrID: t
		} = e.payload), e.payload))), jl((e => Xl(e))), jl((async e => {
			if (e && e.type === ze) {
				const {
					payload: r
				} = e, a = os({
					...e,
					...r,
					actionMgrID: t
				});
				return n.push(a), n
			}
			const {
				actionInPayload: r,
				response: a,
				headers: s = {}
			} = e, {
				containerName: o
			} = r, i = Ft(o, r.context), c = cs(i, o, r.context), d = {
				acName: i,
				context: c
			};
			await ns(a, r, d);
			const l = ts(a, {
				target: i,
				context: c,
				containerItemID: c,
				headers: s
			});
			return l.resourceType = H.RESOURCE_TYPES.DATA, l.resourceStatus = H.RESOURCE_STATUS.UPDATE, l.key = JSON.stringify(r.requestPayload), n.push(eh(Up, l)), n
		})), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], n))))
	}, e => {
		let t = 0,
			n = [];
		return e.pipe(wl(Mt), Yl(100), Ml((e => {
			const {
				isFormValid: r
			} = e.payload;
			if (({
					actionMgrID: t
				} = e.payload), !r) {
				const e = {
					type: H.SUBMISSION_FAILURE_TYPE.FORM_VALIDATION_ERROR
				};
				return vn.rejectActionByID(t, !0, e), Vl([])
			}
			return Vl(e.payload).pipe(jl((e => Jl(e))), jl((async e => {
				if (e && e.type === ze) {
					const {
						payload: r
					} = e, a = os({
						...e,
						...r,
						actionMgrID: t
					});
					return n.push(a), n
				}
				const {
					actionInPayload: r
				} = e, {
					containerItemID: a,
					isModalAction: s
				} = r, o = s ? $s.MODAL : $s.PRIMARY, i = {
					target: Ft(o, a),
					containerItemID: a,
					context: a
				};
				return n.push(eh(zp, i)), n
			})), Ll((() => (1 === n.length && Ma(n[0].type) ? vn.rejectActionByID(t) : vn.resolveActionByID(t), op(n), n = [], n))))
		})))
	}, wm, Lm], Um = jm;

	function Fm(e, t) {
		return void 0 === t && (t = fm), kd((function(n, r) {
			var a = null,
				s = null,
				o = null,
				i = function() {
					if (a) {
						a.unsubscribe(), a = null;
						var e = s;
						s = null, r.next(e)
					}
				};

			function c() {
				var n = o + e,
					s = t.now();
				if (s < n) return a = this.schedule(void 0, n - s), void r.add(a);
				i()
			}
			n.subscribe(Vd(r, (function(n) {
				s = n, o = t.now(), a || (a = t.schedule(c, e), r.add(a))
			}), (function() {
				i(), r.complete()
			}), void 0, (function() {
				s = a = null
			})))
		}))
	}
	const {
		RESOURCE_TYPES: {
			CASE: km,
			DATA: Vm
		}
	} = H;
	let Gm = [];
	const Bm = {},
		Hm = [e => e.pipe(wl(qe), Fm(200), Ll((e => e.payload)), jl((e => {
			const t = re.getPreviewMode() && il.addDebugHeaders({
				debugId: _p.generateUniqueID()
			});
			Bm.dataContext = e.payload.dataViewName, Bm.dataContextParameters = e.payload.dataViewKeys;
			const {
				context: n,
				requestType: r,
				routeKey: a
			} = e;
			let {
				routeEndpoint: s
			} = e;
			s = s && s.indexOf("viewType={viewType}") > 0 ? s.replace("{viewType}", "page") : s && s.indexOf('viewType=""') > 0 ? s.replace('viewType=""', 'viewType="page"') : s;
			const o = A() + s,
				i = e.options.context;
			let c;
			const d = {},
				l = e?.payload?.caseClassName;
			if (q.isRemoteCase(l)) {
				const {
					RemoteSystemID: e
				} = q.getRemoteCase(l);
				d.RemoteSystemID = e
			}
			if ("POST" === r) {
				c = e.payload, s.indexOf("viewType=") < 0 && (s = `${s}?viewType=page`);
				let i;
				switch (fs(a)) {
					case km:
						i = {
							caseTypeID: c.caseTypeID,
							processID: c.processID,
							content: {}
						};
						break;
					case Vm:
						i = Bm;
						break;
					default:
						i = c
				}
				return zd(yl(o, {
					method: r,
					body: i,
					headers: {
						...d,
						...t
					}
				}, n)).pipe(Ll((t => ({
					response: {
						...t.data
					},
					payload: e,
					headers: Za(t.headers)
				}))), zl(": Error ocurred during ajax call at historyEpic : ", e))
			}
			return zd(yl(o, {
				method: "GET",
				headers: {
					...d,
					...t
				}
			}, i.substring(0, i.lastIndexOf("/")))).pipe(Ll((n => ({
				response: n.data,
				payload: e,
				headers: {
					...Za(n.headers),
					...t
				}
			}))))
		})), jl((async e => {
			if (e && e.type === ze) return os(e);
			const {
				headers: t = {},
				response: n,
				payload: r
			} = e, a = Pf(n, {
				[H.STOPMERGEACTIONS]: !n.nextAssignmentInfo
			}), s = r.options.acName, o = Hs(s) && qs(s) ? Ms(s) : e.payload.options.context, i = o;
			t.RemoteSystemID = r?.payload?.RemoteSystemID;
			const c = {
				target: s,
				context: o,
				containerItemID: i,
				headers: t,
				debugInfo: {
					debugId: t[W.COREHEADER_APP_DEBUG_ID]
				}
			};
			let d = "";
			const l = r?.payload?.page;
			let u = r?.payload?.pageClass;
			r.payload && r.payload.caseName && r.payload.workID && (d = mh(ft, {
				caseName: e.payload.payload.caseName
			}), d = d && d.replace("{workID}", e.payload.payload.workID) || "", u = r?.payload?.caseClassName), Ta.publish(H.PUB_SUB_EVENTS.UI_EVENTS.SHOW_PAGE_INIT, {
				pageName: l,
				pageClass: u
			});
			const p = _p.getIn(a, W.LOCALE_REFERENCES);
			await de.loadLocaleResources(p);
			const h = _p.getIn(a, W.COMPONENTS);
			h && await Ca(h), Aa(a, r.options.actionConfig, !0), Ta.publish(H.PUB_SUB_EVENTS.UI_EVENTS.SHOW_PAGE_DONE, {
				target: s,
				pageName: l,
				pageClass: u
			});
			let g = ts(a, c);
			return g = ((e, t, n) => {
				if (e === Xa.CASE) {
					if (t?.caseInfo?.assignments) {
						const {
							key: e,
							flowName: r
						} = as(t.caseInfo.assignments[0].ID);
						n.key = e, n.flowName = r
					} else n.flowName = "", n.key = t?.caseInfo?.ID || t.semanticURL;
					n.resourceType = e, n.semanticURL = t.semanticURL, n.caseViewMode = W.REVIEW_MODE
				} else n.resourceType = e, n.semanticURL = t.semanticURL;
				return n
			})(fs(e.payload.routeKey), {
				...n.data,
				semanticURL: d,
				caseViewMode: W.REVIEW_MODE
			}, g), Gm.push(is(s, g)), gs(Gm), Gm
		})), Ll((() => (op(Gm), Gm = [], Gm))), zl("Error occured"))],
		Wm = [e => {
			let t = 0,
				n = [];
			return e.pipe(wl(De), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					context: t,
					skipSemanticUrl: n = !1,
					insightID: r
				} = e;
				let a = "";
				n || (a = mh(ht, {
					insightID: "{insightID}"
				}), a = a.replace("{insightID}", r));
				const {
					restApi: s,
					reqType: o
				} = Eh(ht, {
					insightID: r
				});
				return zd(yl(s, {
					method: o
				}, t)).pipe(Ll((t => {
					let r = {};
					return r = "string" == typeof t.data ? JSON.parse(t.data) : t.data, {
						response: {
							...r,
							key: a,
							semanticURL: a
						},
						actionConfig: e,
						skipSemanticUrl: n
					}
				})), zl(": Error ocurred during ajax call at showPage Epic : ", e.context))
			})), jl((async e => {
				if (e && e.type === ze) return n.push(os(e)), n;
				const {
					actionConfig: t,
					skipSemanticUrl: r
				} = e, a = ba.getTargetViewContainerName(Ne), s = Ft(a, t.context), o = cs(s, a, t.context), {
					response: i
				} = e, c = Pf(i);
				c.directUrlUpdation = !r;
				const d = {
						acName: s,
						context: o
					},
					l = !r,
					u = r;
				await ns(c, t, d, l, u);
				const p = ts(c, {
					target: s,
					context: o,
					containerItemID: o
				});
				p.resourceType = H.PAGE;
				const h = is(s, p);
				return n.push(h), gs(n), n
			})), Ll((() => {
				vn.resolveActionByID(t), op(n), n = []
			})), Pm())
		}],
		qm = [e => {
			let t = 0,
				n = [];
			return e.pipe(wl(xe), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), jl((e => {
				const {
					context: t,
					skipSemanticUrl: n = !1,
					dashboardID: r
				} = e;
				let a = "";
				n || (a = mh(gt, {
					dashboardID: r
				}), a = a.replace("{dashboardID}", r));
				const {
					restApi: s,
					reqType: o
				} = Eh(gt, {
					dashboardID: r
				});
				return zd(yl(s, {
					method: o
				}, t)).pipe(Ll((t => {
					let r = {};
					return r = "string" == typeof t.data ? JSON.parse(t.data) : t.data, {
						response: {
							...r,
							key: a,
							semanticURL: a
						},
						actionConfig: e,
						skipSemanticUrl: n
					}
				})), zl(": Error ocurred during ajax call at showPage Epic : ", e.context))
			})), jl((async e => {
				if (e && e.type === ze) return n.push(os(e)), n;
				const {
					actionConfig: t,
					skipSemanticUrl: r
				} = e, a = ba.getTargetViewContainerName(Ne), s = Ft(a, t.context), o = cs(s, a, t.context), {
					response: i
				} = e, c = Pf(i);
				c.directUrlUpdation = !r;
				const d = {
						acName: s,
						context: o
					},
					l = !r,
					u = r;
				await ns(c, t, d, l, u);
				const p = ts(c, {
					target: s,
					context: o,
					containerItemID: o
				});
				p.resourceType = H.PAGE;
				const h = is(s, p);
				return n.push(h)
			})), Ll((() => {
				vn.resolveActionByID(t), op(n), n = []
			})), Pm())
		}],
		zm = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			var n = function() {
				for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
				return bf.apply(void 0, e.map((function(e) {
					var n = e.apply(void 0, t);
					if (!n) throw new TypeError('combineEpics: one of the provided Epics "' + (e.name || "<anonymous>") + "\" does not return a stream. Double check you're not missing a return statement!");
					return n
				})))
			};
			try {
				Object.defineProperty(n, "name", {
					value: "combineEpics(" + e.map((function(e) {
						return e.name || "<anonymous>"
					})).join(", ") + ")"
				})
			} catch (e) {}
			return n
		}(...Nf, ...bm, ...vm, ...Hm, ...Um, ...Df, ...[e => {
			let t = 0;
			return e.pipe(wl(bt), Ll((e => (({
				actionMgrID: t
			} = e.payload), e.payload))), Ll((e => {
				const n = sp().getState(),
					r = Cf();
				return ql()(n, r) && t > 0 ? vn.resolveActionByID(t, {}) : vn.rejectActionByID(t), []
			})), Pm())
		}], ...Wm, ...qm),
		Ym = e => e.type || (e.messages && e.messages[0].type) === H.MESSAGES.MESSAGES_TYPE_ERROR,
		Km = e => e => t => {
			const {
				type: n = "",
				payload: r = {}
			} = t || {}, {
				category: a,
				property: s,
				pageReference: o,
				context: i,
				referenceList: c
			} = r;
			"HTTP" !== a && n === Ct && Ym(r) ? ((e, t, n) => {
				if (kr[e]) {
					const r = Br(Hr(t, n)),
						a = zr(e, kr[e].fieldOrder[r], r);
					a && (a.isError = !0)
				}
			})(i, s, o) : "HTTP" !== a && n === $t && Ym(r) && void 0 !== s ? Kr(i, s, o) : "HTTP" !== a && [Xe, st, Je, it].includes(n) ? Wr(i) : n === vt && Kr(i, s, c), e(t)
		},
		Xm = {},
		Jm = e => {
			const t = _p.getIn(Xm, [W.CONTEXT, e], []),
				n = [];
			t.forEach((t => {
				const r = t.substr(0, t.lastIndexOf("_")),
					a = _p.getIn(Xm, [r, t], []),
					s = a && a.length > 0 && a.indexOf(e);
				if (s > -1 && a.splice(s, 1), !a || a && 0 === a.length) {
					_p.deleteIn(Xm, [r, t]);
					const e = _p.getIn(Xm, [r]);
					e && 0 === Object.keys(e).length && _p.deleteIn(Xm, [r]), n.push({
						dataPageName: r,
						dataPageNameWithHash: t
					})
				}
			})), _p.deleteIn(Xm, [W.CONTEXT, e]);
			const r = _p.getIn(Xm, [W.CONTEXT]);
			(!r || r && 0 === Object.keys(r).length) && _p.deleteIn(Xm, [W.CONTEXT]), n.length > 0 && op(rh({
				dataPagesToBeRemoved: n
			}))
		},
		Qm = (e = {}, t) => {
			Object.keys(e).forEach((n => {
				const r = _p.getIn(e, [n], {});
				Object.keys(r).forEach((e => {
					((e, t, n) => {
						const r = _p.getIn(Xm, [W.CONTEXT, n]);
						if (_p.getIn(Xm, [e])) {
							const r = _p.getIn(Xm, [e, t], []);
							_p.setIn(Xm, [e, t], [...new Set([...r, n])])
						} else _p.setIn(Xm, [e, t], [n]);
						r ? _p.setIn(Xm, [W.CONTEXT, n], [...new Set([...r, t])]) : _p.setIn(Xm, [W.CONTEXT, n], [t])
					})(n, e, t)
				}))
			}))
		},
		Zm = e => e => t => {
			const {
				payload: {
					data: n = {},
					context: r = null,
					childContainersContexts: a = []
				} = {},
				type: s
			} = t;
			if (a && a.length > 0 && (s === it || s === Je) && a.forEach((e => {
					Jm(e)
				})), s === Xe || s === Be || s === Ot) {
				const e = s === Ot ? n : n.shared;
				Qm(e, r)
			} else s === it ? (Jm(r), Qm(n.shared, r)) : s === Je && Jm(r);
			e(t)
		};
	const eI = class {
			static cleanCaches(e) {
				tp.purgeCascadeFields(e), Zu.removeContext(e), py.clearContextedCache(e), Ta.cleanContextSubscribers(e), Wr(e), Wn.removeContextTreeNode(e), Xg.clearContext(e), oa.deRegisterForRefresh(e)
			}
		},
		tI = e => t => n => {
			const {
				type: r,
				payload: {
					target: a,
					containerItemID: s,
					context: o,
					childContainersContexts: i = [],
					containerInfo: {
						newAccessedOrder: c,
						containerType: d
					} = {}
				} = {}
			} = n, {
				PUB_SUB_EVENTS: l
			} = H;
			if (r === Je) {
				const {
					resourceType: t,
					key: n,
					context: r
				} = _p.getIn(e.getState(), ["containers", a, "items", s]) || {}, o = {
					resourceType: t,
					key: n,
					context: r,
					containerItemID: s
				};
				Ta.publish(l.CONTAINER_EVENTS.CLOSE_CONTAINER_ITEM, o), a === `${H.APP.APP}/${W.PRIMARY}` && d === W.CONTAINER_TYPE.MULTIPLE && Ta.publish(l.CONTAINER_EVENTS.CLOSE_MULTI_TYPE_PRIMARY_CONTAINER_ITEM, {
					key: n,
					newAccessedOrder: c
				})
			}
			i && i.length > 0 && (r === it || r === Je) && i.forEach((e => {
				eI.cleanCaches(e)
			})), r !== it && r !== Je || eI.cleanCaches(o), t(n)
		},
		nI = e => e => t => {
			const {
				payload: {
					context: n,
					transientItemID: r = null
				} = {},
				type: a
			} = t;
			!n || a !== Xe && a !== st && a !== it && a !== Je || (Cr(n), Ar(n)), r && a === nt && (Cr(r), Ar(r)), e(t)
		},
		rI = function(e) {
			void 0 === e && (e = {});
			var t, n = new(0, zh.constructor)(zh.schedulerActionCtor),
				r = new Kh,
				a = function(a) {
					t = a;
					var s = new Kh,
						o = new Kh,
						i = s.asObservable().pipe(Bd(n)),
						c = new Jh(o.pipe(Bd(n)), t.getState());
					return r.pipe(Ll((function(t) {
							var n = t(i, c, e.dependencies);
							if (!n) throw new TypeError('Your root Epic "' + (t.name || "<anonymous>") + "\" does not return a stream. Double check you're not missing a return statement!");
							return n
						})), jl((function(e) {
							return zd(e).pipe(Hd(n), Bd(n))
						}))).subscribe(t.dispatch),
						function(e) {
							return function(n) {
								var r = e(n);
								return o.next(t.getState()), s.next(n), r
							}
						}
				};
			return a.run = function(e) {
				r.next(e)
			}, a
		}(),
		aI = e => {
			const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Fh;
			if (null !== sp()) Ep();
			else {
				const n = jh($f(e), t(Qh.reduxBatch, function(...e) {
					return t => (n, r) => {
						const a = t(n, r);
						let s = () => {
							throw new Error(Dh(15))
						};
						const o = {
								getState: a.getState,
								dispatch: (e, ...t) => s(e, ...t)
							},
							i = e.map((e => e(o)));
						return s = Fh(...i)(a.dispatch), {
							...a,
							dispatch: s
						}
					}
				}(Ia, Km, Zm, nI, rI, tI), Qh.reduxBatch));
				rI.run(zm), ap(n)
			}
		};
	const sI = new class {
			constructor() {
				this.userSettings = {}
			}
			getNormalizedKey(e) {
				return e?.toString().replace(/\s/g, "-").toLowerCase()
			}
			setComponentState = (e, t) => {
				sessionStorage ? sessionStorage.setItem(this.getNormalizedKey(e), JSON.stringify(t)) : console.error("Session Storage not found")
			};
			getComponentState = e => {
				const t = sessionStorage.getItem(this.getNormalizedKey(e)),
					n = _p.isValidJson(t);
				return n || t
			};
			removeComponentState = e => {
				sessionStorage.removeItem(this.getNormalizedKey(e))
			};
			fetchUserSettings = async () => {
				const {
					restApi: e,
					reqType: t
				} = Eh("getUserSettings");
				yl(e, {
					method: t,
					headers: {}
				}).then((e => {
					if (200 !== e.status || !e.data) throw new Error("something went wrong while fetching getUserSettings");
					this.userSettings = e.data
				})).catch((e => console.error(e)))
			};
			init = () => {
				ae.getUserSettings() ? this.userSettings = ae.getUserSettings() : this.fetchUserSettings()
			};
			getUserSettings = e => {
				if (!e) throw new Error("path is required parameter");
				if ("string" != typeof e) throw new TypeError("path must be string");
				return _p.getIn(this.userSettings, e, {})
			};
			setUserSettings = async (e, t) => {
				if (!e) return Promise.reject(new Error("path is required parameter"));
				if ("string" != typeof e) return Promise.reject(new TypeError("path must be string"));
				if (null == t || "" === t) return Promise.reject(new Error("value is required parameter"));
				const n = Eh("updateUserSettings");
				if (!n) return Promise.reject(new Error("updateUserSettings route is not available"));
				const {
					restApi: r,
					reqType: a
				} = n;
				return yl(r, {
					method: a,
					body: _p.setIn({}, e, t)
				}).then((e => {
					if (200 !== e.status || !e.data) throw new Error("something went wrong");
					this.userSettings = e.data
				})).catch((e => {
					console.error(e)
				}))
			}
		},
		oI = {
			publishConstellationLoadedEvent: () => {
				Ta.publish(W.PUB_SUB_EVENTS.BOOTSTRAP_SHELL_EVENTS.CONSTELLATION_LOADED, {})
			}
		};
	const iI = new class {
		activateContainerItemOnSwitch(e) {
			const t = `${W.APP.APP}/${W.PRIMARY}`,
				n = {
					target: t,
					containerItemID: Ds(t, e)
				};
			yu({}).getPConnect().getContainerManager().activateContainerItem(n)
		}
		removeContainerItemOnClose(e) {
			const t = `${W.APP.APP}/${W.PRIMARY}`,
				n = {
					target: t,
					containerItemID: Ds(t, e)
				};
			yu({}).getPConnect().getContainerManager().removeContainerItem(n)
		}
		showCasePreview(e, t) {
			yu({}).getPConnect().getActionsApi().showCasePreview(e, {
				caseClassName: t
			})
		}
		closeCasePreview() {
			yu({}).getPConnect().getContainerManager().resetContainers({
				name: W.PREVIEW,
				context: W.APP.APP
			})
		}
		isFormDirty(e) {
			const t = `${W.APP.APP}/${W.PRIMARY}`,
				n = yo(t, e);
			return Ur.isStateModified(n)
		}
		getEventUtils() {
			return oI
		}
		getBroadcastUtils() {
			return wf
		}
		isTraditionalUICase(e) {
			return Ya(e)
		}
	};
	const cI = class {
		constructor(e) {
			this.appAlias = e.appAlias, this.appAliasWithoutServlet = e.appAliasWithoutServlet, this.googleMapKey = e.googleMapKey, this.staticContentServer = e.staticContentServer, this.appStaticContentServer = e.appStaticContentServer || null, this.contextPath = e.contextPath, this.messagingService = e.messagingService || null, this.reAuthUrl = e.reAuthUrl || null
		}
	};
	const dI = class {
		constructor(e) {
			this.routingInfo = e.routingInfo, this.actionModel = e.actionModel, this.additionalHeaders = e.additionalHeaders, this.tokens = e.tokens, this.semanticUrl = e.semanticUrl, this.queryParams = e.queryParams, this.noPortal = e.noPortal, this.timezone = e.timezone, this.noHistory = e.noHistory, this.viewName = e.viewName, this.theme = e.theme, this.fieldDefaults = e.fieldDefaults, this.restServerConfig = e.restServerConfig, this.dynamicLoadComponents = void 0 === e.dynamicLoadComponents || e.dynamicLoadComponents, this.dynamicSemanticUrl = void 0 === e.dynamicSemanticUrl || e.dynamicSemanticUrl, this.enableRouting = void 0 === e.enableRouting || e.enableRouting, this.locale = e.locale, this.environmentInfo = e.environmentInfo, this.renderingMode = e.renderingMode || "FULL_PORTAL", this.remoteCaseMapping = e.remoteCaseMapping || {}, this.envType = e.envType, this.serviceConfig = new cI(e.serviceConfig), this.behaviorOverrides = e.behaviorOverrides, this.initBroadcast = !!e.initBroadcast, this.cookieComplianceMethod = e.cookieComplianceMethod ?? "none"
		}
	};
	const lI = new class {
			#c(e, t, n) {
				Nh(e), ba.buildActionTargetMap(t), I(n)
			}
			init(e) {
				const t = new dI(e),
					n = {
						...t.environmentInfo,
						renderingMode: t.renderingMode
					};
				fh(t.enableRouting), aI({}), ae.setTheme(t.theme), ae.setCookieComplianceMethod(t.cookieComplianceMethod), wr.updateFieldDefaults(t.fieldDefaults), il.setDefaultHeaders(t.additionalHeaders), this.#c(t.routingInfo, t.actionModel, {
					server: t.restServerConfig,
					reAuthUrl: t.serviceConfig.reAuthUrl
				}), oe.setAppAlias(t.serviceConfig.appAliasWithoutServlet || t.serviceConfig.appAlias), S(t.serviceConfig.googleMapKey), oe.initServer(t.serviceConfig.staticContentServer, t.serviceConfig.appStaticContentServer, t.tokens.C11NB2S), de.setTimezone(t.timezone), ae.setEnvironmentInfo(n), ae.setLocale(t.locale), q.setRemoteCaseMapping(t.remoteCaseMapping), Xg.setConnectionConfig({
					messagingService: t.serviceConfig.messagingService
				}), sI.init(), t.initBroadcast && iI.getBroadcastUtils().init()
			}
			getBootstrapConfig = async (e, t) => {
				const n = `${t.token_type} ${t.access_token}`;
				return fetch(`${e}/api/application/v2/data_views/D_pxBootstrapConfig`, {
					method: "GET",
					headers: new Headers({
						Authorization: n
					})
				}).then((e => e.json()))
			};
			initCoreContainers = (e = {}) => {
				const {
					containerType: t = "single"
				} = e, n = yu({
					meta: {
						type: "RootContainer",
						config: {
							renderingMode: "noPortal"
						},
						children: [{
							type: "ViewContainer",
							config: {
								routingInfo: "@ROUTING_INFO",
								name: "primary"
							}
						}]
					},
					options: {
						context: "root",
						pageReference: "",
						target: "root"
					}
				});
				return n.getPConnect().getContainerManager().initializeContainers({
					type: t,
					name: "primary",
					context: "app"
				}), {
					props: {
						getPConnect: n.getPConnect
					}
				}
			}
		},
		uI = {
			createViewRule: (e, t) => {
				const {
					restApi: n,
					reqType: r
				} = Eh("createViewRuleByID");
				return yl(n, {
					method: r,
					body: e
				}, t).then((e => e.data))
			},
			getViewRule: (e, t) => {
				const {
					restApi: n,
					reqType: r
				} = Eh("getViewRuleByID", {
					ID: e
				});
				return yl(n, {
					method: r
				}, t).then((e => e.data))
			},
			updateViewRule: (e, t, n) => {
				const {
					restApi: r,
					reqType: a
				} = Eh("updateViewRuleByID", {
					ID: e
				});
				return yl(r, {
					method: a,
					body: t
				}, n).then((e => e.data))
			},
			deleteViewRule: (e, t) => {
				const {
					restApi: n,
					reqType: r
				} = Eh("deleteViewRuleByID", {
					ID: e
				});
				return yl(n, {
					method: r
				}, t).then((e => e.data))
			}
		},
		pI = {
			"Content-Type": "application/json"
		},
		hI = {
			addCaseFollower: (e, t, n) => {
				const r = {
						caseID: e
					},
					a = JSON.stringify({
						users: t.map((e => ({
							ID: e
						})))
					});
				return kf("addCaseFollower", {
					body: a,
					queryPayload: r,
					headers: pI
				}, n)
			},
			deleteCaseFollower: (e, t, n) => kf("deleteCaseFollower", {
				queryPayload: {
					caseID: e,
					followerID: t
				}
			}, n),
			getCaseFollowers: (e, t) => kf("getCaseFollowers", {
				queryPayload: {
					caseID: e
				}
			}, t).then((e => e.data.followers))
		},
		gI = {
			addRelatedCases: (e, t, n) => {
				const r = {
						caseID: e
					},
					a = JSON.stringify({
						cases: t
					});
				return kf("addRelatedCases", {
					body: a,
					queryPayload: r
				}, n)
			},
			removeRelatedCase: (e, t, n) => kf("removeRelatedCase", {
				queryPayload: {
					caseID: e,
					relatedCaseID: t
				}
			}, n),
			getRelatedCases: (e, t) => kf("getRelatedCases", {
				queryPayload: {
					caseID: e
				}
			}, t).then((e => e.data.relatedCases))
		},
		fI = "operatorDetails",
		yI = {
			getOperatorDetails: (e, t = !1) => {
				const {
					reqType: n
				} = Eh(fI, {});
				if ("GET" === n) {
					const t = {
						encodedOperatorId: encodeURIComponent(`{"opname":"${e}"}`)
					};
					return kf(fI, {
						queryPayload: t
					})
				}
				return t ? kf("operatorDetailsByBusinessID", {
					body: {
						dataViewParameters: {
							BusinessID: e
						}
					}
				}) : kf(fI, {
					body: {
						dataViewParameters: {
							ID: e
						}
					}
				})
			}
		},
		mI = async e => {
			const t = Pf(e),
				n = _p.getIn(t, W.COMPONENTS);
			Aa(t, {}, !0), await Ca(n)
		}, II = (e, t, n) => $p.resolveView(e, t, n), EI = {
			"Content-Type": "application/json"
		};
	const AI = new class {
			constructor() {
				this.mentionsTagsCancelTokenSource = [], this.mentions = []
			}
			getFeeds = (e, t, n, r, a, s, o) => {
				const {
					getLocaleValue: i
				} = de;
				o || (this.mentions = []);
				let c = "";
				r && Array.isArray(r) && r?.length > 0 && (r.forEach((e => {
					e.on && (c = `${c}${e.id},`)
				})), "" === c && (c = "ClearFilters"));
				let d = "";
				o && (d = s.getValue("pulse.nextPageFirstEntry"));
				const l = {
					filterForContext: e,
					feedID: t,
					feedClass: n,
					filterBy: c,
					pageSize: 9,
					olderThan: d
				};
				for (let e = 0; e < a.length; e += 1) a[e].cancel();
				const u = Bf();
				return a.push(u), kf("getFeedMessages", {
					queryPayload: l,
					cancelTokenSource: u
				}, s.getContextName()).then((async e => {
					if (200 === e.status && e.data) {
						a.pop();
						const t = [],
							n = {};
						let c = !1;
						if (e?.data) {
							if (e?.data?.data?.FeedList) {
								const r = e.data.data.FeedList?.pxResults;
								Array.isArray(r) && r?.length > 0 && r.forEach(((e, r) => {
									e.ID = "" !== e.pzInsKey ? e.pzInsKey : `message${r}`, t.push(e.ID), n[e.ID] = e, e?.mentions && Array.isArray(e?.mentions) && e.mentions?.length > 0 && this.mentions.push(e.mentions), e?.pxResults && Array.isArray(e?.pxResults) && e.pxResults?.length > 0 && e.pxResults.forEach((e => {
										e?.mentions && Array.isArray(e?.mentions) && e.mentions?.length > 0 && this.mentions.push(e.mentions)
									})), c || "pzPostDetails" === e.pyMessageViewReference || "pzPrivatePostDetails" === e.pyMessageViewReference || (c = !0)
								}))
							}
							if (c && await mI({
									uiResources: e.data.uiResources
								}), !r && (r = [{
									id: "All",
									label: i("All", "Pulse"),
									on: !0,
									disabled: !1
								}], e?.data?.data?.FeedFilters)) {
								const t = e.data.data.FeedFilters?.pxResults;
								let n = !0;
								t && Array.isArray(t) && t?.length > 0 && (t.forEach((e => {
									const t = {
										id: e.pyFeedSourceReference,
										label: i(e.pyLabel, "Pulse"),
										disabled: !1,
										on: "true" === e.pySelected
									};
									t.on || (n = !1), r.push(t)
								})), r.find((e => "All" === e.id)).on = n)
							}
						}
						if (o && s.getValue("pulse.messageIDs")) {
							let r = s.getValue("pulse.messageIDs"),
								a = s.getValue("pulse.messages");
							r = [...r, ...t], a = {
								...a,
								...n
							}, Object.values(a).forEach((e => {
								e?.mentions && Array.isArray(e?.mentions) && e.mentions?.length > 0 && this.mentions.push(e.mentions), e?.pxResults && Array.isArray(e?.pxResults) && e.pxResults?.length > 0 && e.pxResults.forEach((e => {
									e?.mentions && Array.isArray(e?.mentions) && e.mentions?.length > 0 && this.mentions.push(e.mentions)
								}))
							})), s.updateState({
								pulse: {
									messages: a,
									messageIDs: r,
									nextPageFirstEntry: e?.data?.nextPageFirstEntry || "",
									hideAttachment: e?.data?.hideAttachment || !1
								}
							})
						} else s.updateState({
							pulse: {
								messages: n,
								messageIDs: t,
								nextPageFirstEntry: e?.data?.nextPageFirstEntry || "",
								hideAttachment: e?.data?.hideAttachment || !1
							}
						});
						const d = [...new Map(this.mentions.flat()?.map((e => [e.mentionsID, e]))).values()]?.filter((e => Object.prototype.hasOwnProperty.call(e, "mentionsType")))?.filter((e => !e?.mentionsType?.toLowerCase().includes("user"))) || [];
						return {
							feedFilters: r,
							caseMentions: d
						}
					}
					return s.reportError(`getFeeds call failed ${e.status}`, e.data), ""
				})).catch((e => {
					Hf(e) || s.reportError(": Error ocurred during ajax call at getFeeds API : ", e.response)
				}))
			};
			postMessage = (e, t, n = [], r = !1, a) => {
				const s = JSON.stringify({
					context: e,
					parentMessageId: r ? e : "",
					message: t,
					attachments: n
				});
				return kf("postFeedMessages", {
					body: s,
					headers: EI
				}, a.getContextName()).then((t => {
					if ((201 === t.status || 200 === t.status) && t.data) {
						const s = t?.data;
						if (r) {
							s.parentMessageID = e;
							const {
								pxResults: t,
								caseMentions: o
							} = this.buildMessageObject(s, r, a, n.length > 0);
							return a.updateState({
								pulse: {
									messages: {
										[e]: {
											pxResults: t
										}
									}
								}
							}), o
						}
						const {
							messages: o,
							messageIDs: i,
							caseMentions: c
						} = this.buildMessageObject(s, r, a, n.length > 0);
						return a.updateState({
							pulse: {
								messages: o,
								messageIDs: i
							}
						}), c
					}
					return a.reportError(`postMessage call failed with status ${t.status}`, t), ""
				})).catch((e => {
					a.reportError(": Error ocurred during ajax call at postMessage API : ", e.response)
				}))
			};
			editMessage = ({
				messageID: e,
				parentMessageID: t,
				message: n,
				c11nEnv: r,
				isReply: a = !1
			}) => {
				const s = JSON.stringify({
					message: n
				});
				return kf("editFeedMessage", {
					queryPayload: {
						messageID: e
					},
					body: s,
					headers: EI
				}, r.getContextName()).then((e => {
					if (200 === e?.status && e?.data) {
						const n = e?.data;
						if (a) {
							n.parentMessageID = t;
							const {
								pxResults: e,
								caseMentions: s
							} = this.buildMessageObject(n, a, r, !1);
							return r.updateState({
								pulse: {
									messages: {
										[t]: {
											pxResults: e
										}
									}
								}
							}), s
						}
						const {
							messages: s,
							caseMentions: o
						} = this.buildMessageObject(n, a, r, !1);
						return r.updateState({
							pulse: {
								messages: s
							}
						}), o
					}
					return r.reportError(`editMessage call failed with status ${e.status}`, e), ""
				})).catch((e => {
					r.reportError(": Error ocurred during ajax call at editMessage API : ", e.response)
				}))
			};
			buildMessageObject = (e, t, n, r = !1) => {
				const a = {
						ID: e?.ID || "",
						tags: e?.tags || [],
						pyHasAttachment: r,
						pzInsKey: e?.ID || "",
						pyMessage: e?.message || "",
						mentions: e?.mentions || [],
						postedByUser: e?.postedByUser,
						pxCreateDateTime: e?.postedTime || "",
						pxUpdateDateTime: e?.updatedTime || "",
						parentMessageID: e?.parentMessageID || "",
						pyIsEdited: "string" == typeof e?.isEdited ? "true" === e?.isEdited : e?.isEdited || !1,
						pyFeed: {
							pyPostedOn: e?.postedTime || "",
							pyFeedTitle: e?.postedByUser?.name || "",
							pyIconType: "user",
							pyCommentContext: "pzInsKey",
							pyIconReference: "pi pi-case"
						},
						pyContext: "",
						pxIcon: "globe",
						pyMessageViewReference: "pzPostDetails"
					},
					s = n.getValue("pulse.messages");
				if (t) {
					let {
						pxResults: e = []
					} = Object.values(s)?.find((e => e?.ID === a?.parentMessageID)) || {};
					const t = e?.findIndex((e => e?.pzInsKey === a?.ID));
					if (-1 !== t) {
						const n = [...e];
						n[t] = {
							...n[t],
							...a
						}, e = n
					} else e = [...e, a];
					return {
						pxResults: e,
						messages: {},
						messageIDs: [],
						caseMentions: this.getCaseMentions(e)
					}
				}
				const o = n.getValue("pulse.messageIDs");
				if (o) {
					const e = o.includes(a.ID) ? {
							...s[a.ID],
							...a
						} : a,
						t = {
							...s,
							[a.ID]: e
						};
					return {
						messages: t,
						messageIDs: o.includes(a.ID) ? o : [a.ID, ...o],
						caseMentions: this.getCaseMentions(Object.values(t))
					}
				}
			};
			getCaseMentions = e => {
				const t = e?.filter((e => e?.mentions && Array.isArray(e?.mentions) && e.mentions?.length > 0))?.map((e => e.mentions))?.concat(this.mentions);
				return [...new Map(t.flat()?.map((e => [e.mentionsID, e]))).values()]?.filter((e => Object.prototype.hasOwnProperty.call(e, "mentionsType")))?.filter((e => !e?.mentionsType?.toLowerCase().includes("user"))) || []
			};
			likeMessage = ({
				pulseContext: e,
				likedBy: t,
				messageID: n,
				isReply: r,
				c11nEnv: a
			}) => {
				const s = t ? "unlikeFeedMessages" : "likeFeedMessages",
					o = JSON.stringify({
						ContextClass: e
					});
				kf(s, {
					body: o,
					queryPayload: {
						pulseContext: e
					},
					headers: EI
				}, a.getContextName()).then((s => {
					if (200 === s.status)
						if (r) {
							const r = a.getValue(`pulse.messages.${n}`),
								s = r?.pxResults && Array.isArray(r?.pxResults) && r.pxResults?.length > 0 && r.pxResults?.map((n => {
									if ((n = {
											...n
										}).pzInsKey === e) {
										let e = 0,
											r = !1;
										const a = n.pyLikes ? n?.pyLikes?.pxLikeCount : 0;
										t ? (e = a - 1, r = !1) : (e = a + 1, r = !0), n.pyLikes = {
											pxLikeCount: e,
											pxIsLiked: r
										}
									}
									return n
								}));
							a.updateState({
								pulse: {
									messages: {
										[n]: {
											pxResults: s
										}
									}
								}
							})
						} else {
							const r = {
									...a.getValue(`pulse.messages.${n}`)
								},
								s = r.pyLikes ? r.pyLikes.pxLikeCount : 0;
							let o = 0,
								i = !1;
							t ? (o = s - 1, i = !1) : (o = s + 1, i = !0), r.pyLikes = {
								pxLikeCount: o,
								pxIsLiked: i
							}, a.updateState({
								pulse: {
									messages: {
										[e]: r
									}
								}
							})
						}
					else a.reportError(`likeMessage call failed with status ${s.status}`, s)
				})).catch((e => {
					a.reportError(": Error ocurred during ajax call at likeMessage API : ", e.response.data)
				}))
			};
			deleteMessage = (e, t, n, r) => {
				let a = e;
				t && (a = n);
				kf("deleteFeedMessage", {
					queryPayload: {
						messageID: a
					}
				}, r.getContextName()).then((a => {
					if (200 === a.status)
						if (t) {
							const t = r.getValue(`pulse.messages.${e}`),
								a = t?.pxResults && Array.isArray(t?.pxResults) && t.pxResults?.length > 0 && t.pxResults?.filter((e => e.pzInsKey !== n));
							r.updateState({
								pulse: {
									messages: {
										[e]: {
											pxResults: a
										}
									}
								}
							})
						} else {
							const t = r.getValue("pulse.messageIDs"),
								n = t && Array.isArray(t) && t?.length > 0 && t?.filter((t => t !== e)),
								a = {
									...r.getValue("pulse.messages")
								};
							delete a[e], r.updateState({
								pulse: {
									messageIDs: n,
									messages: a
								}
							})
						}
					else r.reportError(`deleteMessage call failed with status ${a.status}`, a)
				})).catch((e => {
					r.reportError(": Error ocurred during ajax call at deleteMessage API : ", e.response)
				}))
			};
			getLikedUsers = (e, t) => kf("getFeedMessageLikes", {
				queryPayload: {
					messageID: e
				}
			}, t.getContextName()).then((e => e?.data?.users)).catch((e => {
				t.reportError(": Error ocurred during ajax call at getLikedUsers API : ", e.response)
			}));
			getMentionSuggestions = (e, t) => {
				const {
					pulseContext: n,
					searchFor: r,
					mentionsType: a,
					listSize: s = 5
				} = e, o = {
					pulseContext: n,
					searchFor: r,
					mentionsType: a,
					listSize: s
				};
				for (let e = 0; e < this.mentionsTagsCancelTokenSource.length; e += 1) this.mentionsTagsCancelTokenSource[e].cancel();
				const i = Bf();
				return this.mentionsTagsCancelTokenSource.push(i), kf("getMentionSuggestions", {
					queryPayload: o,
					cancelTokenSource: i
				}, t.getContextName()).then((e => (this.mentionsTagsCancelTokenSource = [], 200 === e.status && e.data ? e?.data : (t.reportError(`Get mention suggestions call failed ${e.status}`, e.data), [])))).catch((e => {
					Hf(e) || t.reportError(": Error ocurred during ajax call at getMentionSuggestions API : ", e.response.data)
				}))
			};
			getMentionTypes = e => kf("getMentionTypes", {}, e.getContextName()).then((e => e?.data)).catch((t => {
				e.reportError(": Error ocurred during ajax call at getMentionTypes API : ", t.response.data)
			}));
			getTagSuggestions = (e, t) => {
				const {
					searchFor: n,
					listSize: r = 5
				} = e, a = {
					searchFor: n,
					listSize: r
				};
				for (let e = 0; e < this.mentionsTagsCancelTokenSource.length; e += 1) this.mentionsTagsCancelTokenSource[e].cancel();
				const s = Bf();
				return this.mentionsTagsCancelTokenSource.push(s), kf("getTagSuggestions", {
					queryPayload: a,
					cancelTokenSource: s
				}, t.getContextName()).then((e => {
					this.mentionsTagsCancelTokenSource = [];
					let n = [];
					return 200 === e.status && e?.data ? n = e?.data?.tags && Array.isArray(e?.data?.tags) && e.data.tags.length > 0 && e.data.tags?.map((e => `#${e}`)) : t.reportError(`Get tag suggestions call failed ${e.status}`, e.data), n
				})).catch((e => {
					Hf(e) || t.reportError(": Error ocurred during ajax call at getTagSuggestions API : ", e.response.data)
				}))
			}
		},
		_I = {
			getTaggedCases: (e, t) => kf("loadView", {
				queryPayload: {
					caseID: e,
					viewID: "pyTaggedCases"
				}
			}, t.getContextName()).then((e => e?.data)).catch((e => {
				t.reportError(": Error ocurred during ajax call at fetchTaggedcases API : ", e.response)
			})),
			getTags: (e, t) => kf("getCaseTags", {
				queryPayload: {
					caseID: e
				}
			}, t.getContextName()).then((e => e?.data?.tagsList)).catch((e => {
				t.reportError(": Error ocurred during ajax call at fetchTags API : ", e.response)
			})),
			postTags: (e, t, n) => {
				const r = {
						caseID: e
					},
					a = JSON.stringify({
						tags: t
					});
				return kf("addTagsToCase", {
					body: a,
					queryPayload: r
				}, n.getContextName()).then((e => e?.data?.results)).catch((e => {
					n.reportError(": Error ocurred during ajax call at postTags API : ", e.response)
				}))
			},
			removeTag: (e, t, n) => kf("deleteCaseTag", {
				queryPayload: {
					caseID: e,
					tagID: t
				}
			}, n.getContextName()).catch((e => {
				n.reportError(": Error ocurred during ajax call at removeTag API : ", e.response)
			})),
			getTagsLandingPageURL: e => Qg.getPageDataAsync("D_pxGetTagsLandingPageURL", e.getContextName(), {}, {
				invalidateCache: !0
			}).catch((t => {
				e.reportError(": Error ocurred during ajax call getTagsLandingPageURL API : ", t.response)
			}))
		},
		SI = (e, t) => {
			uo(t.getContextName(), e.etag), po(t.getContextName(), e.etag)
		},
		CI = {
			getParticipants: (e, t) => kf("getAllParticipants", {
				queryPayload: {
					caseID: e
				}
			}, t.getContextName()).then((e => e?.data?.data.content.pyParticipants)).catch((e => {
				t.reportError(": Error ocurred during ajax call at getParticipants API : ", e.response)
			})),
			getRoleView: (e, t, n) => kf("getParticipantRoleView", {
				queryPayload: {
					caseID: e,
					participant_roleID: t
				}
			}, n.getContextName()).then((e => e?.data)).catch((e => {
				n.reportError(": Error ocurred during ajax call at fetchTaggedcases API : ", e.response)
			})),
			getParticipantRoles: (e, t) => kf("getParticipantRoles", {
				queryPayload: {
					caseID: e
				}
			}, t.getContextName()).then((e => e?.data?.participant_roles)).catch((e => {
				t.reportError(": Error ocurred during ajax call at getParticipantRoles API : ", e.response)
			})),
			getParticipant: (e, t, n) => kf("getParticipant", {
				queryPayload: {
					caseID: e,
					participantID: t
				}
			}, n.getContextName()).then((e => e?.data)).catch((e => {
				n.reportError(": Error ocurred during ajax call at getParticipant API : ", e.response)
			})),
			createParticipant: (e, t, n, r) => {
				const a = {
						caseID: e
					},
					s = {
						...n,
						participantRoleID: t
					},
					o = {
						"if-match": r.getCaseSummary().headers.etag
					};
				return kf("createParticipant", {
					body: s,
					queryPayload: a,
					headers: o
				}, r.getContextName()).then((e => {
					SI(e.headers, r)
				})).catch((e => {
					r.reportError(": Error ocurred during ajax call at createParticipant API : ", e.response)
				}))
			},
			updateParticipant: (e, t, n, r) => {
				const a = {
						caseID: e,
						participantID: t
					},
					s = {
						"if-match": r.getCaseSummary().headers.etag
					};
				return kf("updateParticipant", {
					body: n,
					queryPayload: a,
					headers: s
				}, r.getContextName()).then((e => {
					SI(e.headers, r)
				})).catch((e => {
					r.reportError(": Error ocurred during ajax call at updateParticipant API : ", e.response)
				}))
			},
			deleteParticipant: (e, t, n) => {
				const r = {
						caseID: e,
						participantID: t
					},
					a = {
						"if-match": n.getCaseSummary().headers.etag
					};
				return kf("deleteParticipant", {
					queryPayload: r,
					headers: a
				}, n.getContextName()).then((e => {
					SI(e.headers, n)
				})).catch((e => {
					n.reportError(": Error ocurred during ajax call at deleteParticipant API : ", e.response)
				}))
			}
		};
	const $I = new class {
		constructor() {
			this.runtimeParams = {}, this.runtimeParamsMap = {}
		}
		setRuntimeParams(e) {
			this.runtimeParams = e
		}
		getRuntimeParams() {
			return this.runtimeParams
		}
		setRuntimeParam(e, t) {
			this.runtimeParamsMap[e] = t
		}
		getRuntimeParam(e) {
			return this.runtimeParamsMap[e]
		}
	};

	function bI(e = []) {
		return e.reduce(((e, t) => (e[t.personalizationID] = {
			name: t.name,
			personalizationState: JSON.parse(t.personalizationState || "{}")
		}, e)), {})
	}
	const PI = "create",
		OI = "update",
		TI = "delete";

	function vI(e, t, n, r) {
		const a = Gu(t);
		if (a) {
			switch (e) {
				case PI:
				case OI: {
					const {
						markAsDefault: e,
						...t
					} = r;
					Object.entries(t).length > 0 && (a.allPersonalizations[n] = t), e && (a.defaultPersonalization = n);
					break
				}
				case TI:
					delete a.allPersonalizations[n], a.defaultPersonalization === n && (a.defaultPersonalization = "");
					break;
				default:
					return null
			}
			return a
		}
		return null
	}
	const NI = {},
		RI = e => {
			const t = Gu(e);
			if (t) return Array.isArray(t.allPersonalizations) && (t.allPersonalizations = bI(t.allPersonalizations)), Promise.resolve(t);
			const {
				restApi: n,
				reqType: r
			} = Eh("getUIListPersonalizations", {
				listID: e
			});
			return yl(n, {
				method: r,
				body: {}
			}).then((e => {
				const {
					data: t
				} = e;
				return {
					allPersonalizations: bI(t.allPersonalizations),
					defaultPersonalization: t.defaultPersonalization
				}
			}))
		},
		DI = (e, t, n) => {
			const {
				restApi: r,
				reqType: a
			} = Eh("createListPersonalization", {
				listID: e
			});
			return vI(PI, e, t, n), yl(r, {
				method: a,
				body: {
					...n,
					personalizationState: JSON.stringify(n.personalizationState)
				}
			}).then((e => {
				const n = e.data;
				return NI[t] = n, e
			}))
		},
		xI = (e, t, n) => {
			const r = NI[t] || t;
			vI(OI, e, t, n);
			const {
				restApi: a,
				reqType: s
			} = Eh("updateListPersonalization", {
				listID: e,
				personalizationID: r
			}) || {};
			return yl(a, {
				method: s,
				body: {
					...n,
					personalizationState: JSON.stringify(n.personalizationState)
				}
			})
		},
		wI = (e, t) => {
			const n = NI[t] || t;
			vI(TI, e, t);
			const {
				restApi: r,
				reqType: a
			} = Eh("deleteListPersonalization", {
				listID: e,
				personalizationID: n
			});
			return yl(r, {
				method: a,
				body: {}
			}).then((e => (NI[t] && delete NI[t], e)))
		};
	const MI = function(e) {
			return e ? {
				createPersonalization: DI.bind(null, e),
				updatePersonalization: xI.bind(null, e),
				deletePersonalization: wI.bind(null, e),
				fetchPersonalizations: RI.bind(null, e)
			} : {
				createPersonalization: () => Promise.resolve(""),
				updatePersonalization: () => Promise.resolve(),
				deletePersonalization: () => Promise.resolve(),
				fetchPersonalizations: () => Promise.resolve({})
			}
		},
		LI = "getDataObjects",
		jI = ["LocalList", "RemoteList", "PromptList", "DataPage"];
	let UI = null;

	function FI(e) {
		let t;
		return e[1].category ? t = e[1].category : e[0].indexOf(":") > 0 && (t = e[0].substring(0, e[0].indexOf(":"))), t
	}
	const kI = {
		getDataObjects: function() {
			const e = Gg.getAppCacheKey(LI);
			if (window.sessionStorage.getItem(e)) return Promise.resolve(JSON.parse(window.sessionStorage.getItem(e)));
			const {
				restApi: t,
				reqType: n
			} = Eh(LI, {}), r = yl(t, {
				method: n
			});
			return r.then((t => {
				window.sessionStorage.setItem(e, JSON.stringify(t))
			})), r
		},
		getDataPageObjects: function(e = !0) {
			if (UI) return UI;
			const t = Gg.getAppCacheKey("getDataPageObjects");
			if (e && window.sessionStorage.getItem(t)) return Promise.resolve(JSON.parse(window.sessionStorage.getItem(t)));
			const {
				restApi: n,
				reqType: r
			} = Eh("getDataPages", {
				datapageRequestType: "explorable"
			});
			return UI = yl(n, {
				method: r,
				datapageRequestType: "explorable"
			}), UI.then((e => {
				UI = null, window.sessionStorage.setItem(t, JSON.stringify(e))
			})), UI
		},
		getDataViewMetadata: function(e, t, n) {
			if (!t) {
				const {
					sourceMetadata: t,
					sourceFields: n
				} = function(e) {
					const t = Vu(e);
					if (t && t.classID) {
						let e = Hu(t.classID);
						const n = new Set(t.primaryFields),
							r = t.rdFields?.fields?.filter((e => e.indexOf(".") > 0));
						if (r && !_p.isEmpty(r)) {
							const n = r.reduce(((e, n) => {
								const r = Mu(n, t.classID);
								return e[n] = r, e
							}), {});
							e = {
								...e,
								...n
							}
						}
						if (e && Object.keys(e).length > 0) {
							const r = new Set(t.rdFields?.fields ?? t.rdFields),
								a = r.size > 0 || n.size > 0;
							for (const t in e) e[t].type.startsWith("Page") || a && !(r.size > 0 && r.has(t) || n.size > 0 && n.has(t)) ? delete e[t] : e[t]?.datasource && jI.includes(e[t].datasource.tableType) && (e[t].fieldType = "Picklist");
							return {
								sourceFields: e,
								sourceMetadata: t
							}
						}
					}
					return {}
				}(e);
				if (t && n && Object.keys(n).length > 0) {
					const e = {
						data: {
							...t,
							fields: Object.entries(n).map((e => ({
								...e[1],
								fieldID: e[0],
								fieldType: e[1].fieldType ? e[1].fieldType : e[1].isUserReference ? "User reference" : void 0,
								category: FI(e),
								classID: e[1].associationClassID ? e[1].associationClassID : e[1].classID
							})))
						}
					};
					return Promise.resolve(e)
				}
			}
			const r = {
				dataSource: e,
				columns: [],
				parameters: {},
				associationFilter: n
			};
			return py.init(r).then((({
				dataSourceMetaData: e
			}) => Promise.resolve({
				data: e
			})))
		},
		getDefaultColumns: function(e) {
			const t = Gg.getAppCacheKey(`DefaultColumns_${Object.values(e).join("_")}`);
			if (window.sessionStorage.getItem(t)) return Promise.resolve(JSON.parse(window.sessionStorage.getItem(t)));
			const {
				restApi: n,
				reqType: r
			} = Eh("getListData", {
				dataViewName: "D_pzGetDefaultColumns"
			}), a = yl(n, {
				method: r,
				body: {
					dataViewParameters: e
				}
			});
			return a.then((e => {
				window.sessionStorage.setItem(t, JSON.stringify(e))
			})), a
		},
		getFieldsForDataSource: function(e, t, n) {
			if (!t) {
				const t = Vu(e),
					n = t?.rdFields?.fields ?? t?.rdFields;
				return n ? Promise.resolve({
					data: {
						data: n.map((e => ({
							pyFieldName: e
						})))
					}
				}) : Promise.resolve({
					data: {
						data: []
					}
				})
			}
			const r = Gg.getAppCacheKey(`RDColumns-${e}`);
			if (window.sessionStorage.getItem(r)) return Promise.resolve(JSON.parse(window.sessionStorage.getItem(r)));
			const a = Gg.getData("D_pxFieldsForDataSource", {
				dataViewParameters: {
					DataPageName: e
				}
			}, n);
			return a.then((e => {
				window.sessionStorage.setItem(r, JSON.stringify(e))
			})), a
		},
		getPrimaryFieldsForDataSource: function(e = "", t = "") {
			const n = Gg.getAppCacheKey(`PFColumns-${e}${t}`);
			if (window.sessionStorage.getItem(n)) return Promise.resolve(JSON.parse(window.sessionStorage.getItem(n)));
			const r = Gg.getData("D_pxGetInitialFieldsForDataSource", {
				dataViewParameters: {
					DataPageName: e,
					ClassName: t
				}
			});
			return r.then((e => {
				window.sessionStorage.setItem(n, JSON.stringify(e))
			})), r
		},
		getInsightIDs: function() {
			const {
				restApi: e,
				reqType: t
			} = Eh("getInsightIDs");
			return yl(e, {
				method: t
			})
		},
		getInsightByID: function(e) {
			const t = Bu(e);
			if (t) return Promise.resolve({
				data: {
					pyInsights: [t]
				}
			});
			const n = {
					insightID: e
				},
				{
					restApi: r,
					reqType: a
				} = Eh("getInsightByID", n);
			return yl(r, {
				method: a
			})
		},
		createInsight: function(e) {
			const {
				restApi: t,
				reqType: n
			} = Eh("createInsight");
			return yl(t, {
				method: n,
				body: JSON.stringify(e),
				headers: {
					"Content-Type": "application/json"
				}
			})
		},
		updateInsight: function(e, t) {
			const n = {
					insightID: e
				},
				{
					restApi: r,
					reqType: a
				} = Eh("updateInsight", n);
			return yl(r, {
				method: a,
				body: JSON.stringify(t),
				headers: {
					"Content-Type": "application/json"
				}
			})
		},
		deleteInsight: function(e) {
			const t = {
					insightID: e
				},
				{
					restApi: n,
					reqType: r
				} = Eh("deleteInsight", t);
			return yl(n, {
				method: r
			})
		},
		exportToExcel: function(e) {
			const {
				restApi: t,
				reqType: n
			} = Eh("exportToExcel");
			return yl(t, {
				method: n,
				body: JSON.stringify(e)
			})
		},
		scheduleInsight: (e, t) => {
			const n = {
					insightID: e
				},
				{
					restApi: r,
					reqType: a
				} = Eh("scheduleInsight", n);
			return yl(r, {
				method: a,
				body: JSON.stringify(t)
			})
		},
		updateScheduledInsight: (e, t, n) => {
			const r = {
					insightID: e,
					scheduleID: t
				},
				{
					restApi: a,
					reqType: s
				} = Eh("updateScheduledInsight", r);
			return yl(a, {
				method: s,
				body: JSON.stringify(n)
			})
		},
		deleteScheduledInsight: (e, t) => {
			const n = {
					insightID: e,
					scheduleID: t
				},
				{
					restApi: r,
					reqType: a
				} = Eh("deleteScheduledInsight", n);
			return yl(r, {
				method: a
			})
		},
		translateStrings: function(e) {
			const {
				restApi: t,
				reqType: n
			} = Eh("translateStrings");
			return yl(t, {
				method: n,
				body: JSON.stringify(e)
			})
		}
	};
	const VI = new class {
		addRoutes = e => {
			return t = e, void te.addRoutes(t);
			var t
		}
	};
	const GI = class {
		static registerModule(e, t, n) {
			n[e] = () => t
		}
	};
	const BI = class {
		static openCase(e, t = H.APP.APP, n = {}) {
			return n.renderInline = !0, n.pageName ? ae.setDefaultCasePage(n.pageName) : (ae.setDefaultCasePage(W.PY_DETAILS), n.pageName = W.PY_DETAILS), n?.disableAssignmentHeader ? ae.disableAssignmentHeader(n.disableAssignmentHeader) : ae.disableAssignmentHeader(!1), ru.openCase(e, t, W.PRIMARY, n)
		}
		static createCase(e, t = H.APP.APP, n = {}) {
			return n.renderInline = !0, n.pageName ? ae.setDefaultCasePage(n.pageName) : (ae.setDefaultCasePage(W.PY_DETAILS), n.pageName = W.PY_DETAILS), n?.disableAssignmentHeader ? ae.disableAssignmentHeader(n.disableAssignmentHeader) : ae.disableAssignmentHeader(!1), ru.createCase(e, t, W.PRIMARY, n)
		}
		static getNextWork(e = H.APP.APP, t = {}) {
			return t.renderInline = !0, t.pageName ? ae.setDefaultCasePage(t.pageName) : (ae.setDefaultCasePage(W.PY_DETAILS), t.pageName = W.PY_DETAILS), t?.disableAssignmentHeader ? ae.disableAssignmentHeader(t.disableAssignmentHeader) : ae.disableAssignmentHeader(!1), ru.getNextWork(e, W.PRIMARY, t)
		}
		static openAssignment(e, t = H.APP.APP, n = {}) {
			return n.renderInline = !0, n.pageName ? ae.setDefaultCasePage(n.pageName) : (ae.setDefaultCasePage(W.PY_DETAILS), n.pageName = W.PY_DETAILS), n?.disableAssignmentHeader ? ae.disableAssignmentHeader(n.disableAssignmentHeader) : ae.disableAssignmentHeader(!1), ru.openAssignment(e, t, W.PRIMARY, n)
		}
		static openPage(e, t, n = H.APP.APP, r = {}) {
			const a = Ne;
			r?.defaultCasePage ? ae.setDefaultCasePage(r.defaultCasePage) : ae.setDefaultCasePage(W.PY_DETAILS), r?.disableAssignmentHeader ? ae.disableAssignmentHeader(r.disableAssignmentHeader) : ae.disableAssignmentHeader(!1);
			const s = {
					viewName: e,
					className: t,
					acTargetName: W.PRIMARY,
					actionMgrID: vn.getNextActionMgrId(),
					context: n
				},
				{
					promise: o
				} = vn.actionManagerPromise(a, s.actionMgrID);
			return op({
				type: a,
				payload: {
					...s
				}
			}), o
		}
		static getCurrentContextAPI(e, t = H.APP.APP) {
			return yu({
				meta: {
					config: {}
				},
				options: {
					context: t,
					pageReference: e,
					containerName: W.PRIMARY
				}
			}).getPConnect()
		}
	};
	const HI = class {
			static getCaseEvent = () => Object.freeze(H.PUB_SUB_EVENTS.CASE_EVENTS);
			static getDataEvent = () => Object.freeze(H.PUB_SUB_EVENTS.DATA_EVENTS);
			static getTransientEvent = () => Object.freeze(H.PUB_SUB_EVENTS.EVENT_TRANSIENT_ITEMS);
			static getBootstrapShellEvent = () => Object.freeze(H.PUB_SUB_EVENTS.BOOTSTRAP_SHELL_EVENTS)
		},
		WI = {
			getResolvedSemanticURL: (e, t, n) => te.getResolvedSemanticURL(e, t, n),
			getActions: () => ({
				ACTION_OPENWORKBYHANDLE: ft,
				ACTION_SHOWDATA: pt,
				ACTION_SHOWVIEW: ut
			})
		};
	const qI = new class {
			constructor() {
				this.genericFailedMessage = "Failed to display content. Contact the application administrator."
			}
			getGenericFailedMessage() {
				return this.genericFailedMessage
			}
			setGenericFailedMessage(e) {
				this.genericFailedMessage = e
			}
		},
		zI = {
			setTokens: e => {
				Sl({
					tokenInfo: e
				}), _l({
					Authorization: `${e?.token_type} ${e?.access_token}`
				}), setTimeout((() => Ta.publish("updateSession", {
					updateStatus: "success"
				})), 0)
			},
			revokeTokens: async () => Jd(),
			getAuthInstance: e => Xd.init(e),
			setAuthorizationHeader: e => {
				_l({
					Authorization: e
				}), setTimeout((() => Ta.publish("updateSession", {
					updateStatus: "success"
				})), 0)
			}
		};
	const YI = new class {
		getDebouncedSubject(e) {
			return (new Kh).pipe(Fm(e))
		}
	};
	Lr.register("email", (e => {
		let t = null;
		return e && ! function(e) {
			const t = "[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+",
				n = "\\x5c[\\x00-\\x7f]",
				r = `(${t}|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|${n})*\\x5d)`,
				a = `(${t}|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|${n})*\\x22)`;
			return new RegExp(`^${a}(\\x2e${a})*\\x40${r}(\\x2e${r})*$`).test(e)
		}(e) && (t = de.getLocaleValue("Enter a valid email address", "Messages")), t
	})), Lr.register("integer", (e => {
		let t = null;
		return e && !/^(-)?\d+$/.test(e) && (t = de.getLocaleValue("Invalid number", "Messages")), t
	})), Lr.register("required", (e => Array.isArray(e) && 0 === e.length || null == e || "" === e ? de.getLocaleValue("Cannot be blank", "Messages") : null)), Lr.register("url", (e => {
		let t = null;
		return e && ! function(e) {
			let t;
			try {
				t = new URL(e)
			} catch {
				return !1
			}
			return "http:" === t.protocol || "https:" === t.protocol || "ftp:" === t.protocol
		}(e) && (t = de.getLocaleValue("Enter a valid url", "Messages")), t
	}));
	const KI = {
		version: 4,
		country_calling_codes: {
			1: ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"],
			7: ["RU", "KZ"],
			20: ["EG"],
			27: ["ZA"],
			30: ["GR"],
			31: ["NL"],
			32: ["BE"],
			33: ["FR"],
			34: ["ES"],
			36: ["HU"],
			39: ["IT", "VA"],
			40: ["RO"],
			41: ["CH"],
			43: ["AT"],
			44: ["GB", "GG", "IM", "JE"],
			45: ["DK"],
			46: ["SE"],
			47: ["NO", "SJ"],
			48: ["PL"],
			49: ["DE"],
			51: ["PE"],
			52: ["MX"],
			53: ["CU"],
			54: ["AR"],
			55: ["BR"],
			56: ["CL"],
			57: ["CO"],
			58: ["VE"],
			60: ["MY"],
			61: ["AU", "CC", "CX"],
			62: ["ID"],
			63: ["PH"],
			64: ["NZ"],
			65: ["SG"],
			66: ["TH"],
			81: ["JP"],
			82: ["KR"],
			84: ["VN"],
			86: ["CN"],
			90: ["TR"],
			91: ["IN"],
			92: ["PK"],
			93: ["AF"],
			94: ["LK"],
			95: ["MM"],
			98: ["IR"],
			211: ["SS"],
			212: ["MA", "EH"],
			213: ["DZ"],
			216: ["TN"],
			218: ["LY"],
			220: ["GM"],
			221: ["SN"],
			222: ["MR"],
			223: ["ML"],
			224: ["GN"],
			225: ["CI"],
			226: ["BF"],
			227: ["NE"],
			228: ["TG"],
			229: ["BJ"],
			230: ["MU"],
			231: ["LR"],
			232: ["SL"],
			233: ["GH"],
			234: ["NG"],
			235: ["TD"],
			236: ["CF"],
			237: ["CM"],
			238: ["CV"],
			239: ["ST"],
			240: ["GQ"],
			241: ["GA"],
			242: ["CG"],
			243: ["CD"],
			244: ["AO"],
			245: ["GW"],
			246: ["IO"],
			247: ["AC"],
			248: ["SC"],
			249: ["SD"],
			250: ["RW"],
			251: ["ET"],
			252: ["SO"],
			253: ["DJ"],
			254: ["KE"],
			255: ["TZ"],
			256: ["UG"],
			257: ["BI"],
			258: ["MZ"],
			260: ["ZM"],
			261: ["MG"],
			262: ["RE", "YT"],
			263: ["ZW"],
			264: ["NA"],
			265: ["MW"],
			266: ["LS"],
			267: ["BW"],
			268: ["SZ"],
			269: ["KM"],
			290: ["SH", "TA"],
			291: ["ER"],
			297: ["AW"],
			298: ["FO"],
			299: ["GL"],
			350: ["GI"],
			351: ["PT"],
			352: ["LU"],
			353: ["IE"],
			354: ["IS"],
			355: ["AL"],
			356: ["MT"],
			357: ["CY"],
			358: ["FI", "AX"],
			359: ["BG"],
			370: ["LT"],
			371: ["LV"],
			372: ["EE"],
			373: ["MD"],
			374: ["AM"],
			375: ["BY"],
			376: ["AD"],
			377: ["MC"],
			378: ["SM"],
			380: ["UA"],
			381: ["RS"],
			382: ["ME"],
			383: ["XK"],
			385: ["HR"],
			386: ["SI"],
			387: ["BA"],
			389: ["MK"],
			420: ["CZ"],
			421: ["SK"],
			423: ["LI"],
			500: ["FK"],
			501: ["BZ"],
			502: ["GT"],
			503: ["SV"],
			504: ["HN"],
			505: ["NI"],
			506: ["CR"],
			507: ["PA"],
			508: ["PM"],
			509: ["HT"],
			590: ["GP", "BL", "MF"],
			591: ["BO"],
			592: ["GY"],
			593: ["EC"],
			594: ["GF"],
			595: ["PY"],
			596: ["MQ"],
			597: ["SR"],
			598: ["UY"],
			599: ["CW", "BQ"],
			670: ["TL"],
			672: ["NF"],
			673: ["BN"],
			674: ["NR"],
			675: ["PG"],
			676: ["TO"],
			677: ["SB"],
			678: ["VU"],
			679: ["FJ"],
			680: ["PW"],
			681: ["WF"],
			682: ["CK"],
			683: ["NU"],
			685: ["WS"],
			686: ["KI"],
			687: ["NC"],
			688: ["TV"],
			689: ["PF"],
			690: ["TK"],
			691: ["FM"],
			692: ["MH"],
			850: ["KP"],
			852: ["HK"],
			853: ["MO"],
			855: ["KH"],
			856: ["LA"],
			880: ["BD"],
			886: ["TW"],
			960: ["MV"],
			961: ["LB"],
			962: ["JO"],
			963: ["SY"],
			964: ["IQ"],
			965: ["KW"],
			966: ["SA"],
			967: ["YE"],
			968: ["OM"],
			970: ["PS"],
			971: ["AE"],
			972: ["IL"],
			973: ["BH"],
			974: ["QA"],
			975: ["BT"],
			976: ["MN"],
			977: ["NP"],
			992: ["TJ"],
			993: ["TM"],
			994: ["AZ"],
			995: ["GE"],
			996: ["KG"],
			998: ["UZ"]
		},
		countries: {
			AC: ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]],
			AD: ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9],
				[
					["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["1"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]
				]
			],
			AE: ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12],
				[
					["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]],
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"],
					["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]
				], "0"
			],
			AF: ["93", "00", "[2-7]\\d{8}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]
				], "0"
			],
			AG: ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([457]\\d{6})$|1", "268$1", 0, "268"],
			AI: ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2457]\\d{6})$|1", "264$1", 0, "264"],
			AL: ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9],
				[
					["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"],
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"],
					["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]
				], "0"
			],
			AM: ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8],
				[
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"],
					["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"],
					["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"],
					["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]
				], "0"
			],
			AO: ["244", "00", "[29]\\d{8}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]
				]
			],
			AR: ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11],
				[
					["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1],
					["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"],
					["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"],
					["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"],
					["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]
				], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"
			],
			AS: ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "([267]\\d{6})$|1", "684$1", 0, "684"],
			AT: ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				[
					["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"],
					["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"],
					["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
					["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"],
					["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]
				], "0"
			],
			AU: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12],
				[
					["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]
				], "0", 0, "(183[12])|0", 0, 0, 0, [
					["(?:(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|7(?:[013-57-9]\\d|2[0-8]))\\d|3(?:(?:[0-3589]\\d|6[1-9]|7[0-35-9])\\d|4(?:[0-578]\\d|90)))\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|3\\d\\d)|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}", [9]],
					["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]],
					["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
					["190[0-26]\\d{6}", [10]], 0, 0, 0, ["163\\d{2,6}", [5, 6, 7, 8, 9]],
					["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
					["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]
				], "0011"
			],
			AW: ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]
				]
			],
			AX: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"],
			AZ: ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]
				], "0"
			],
			BA: ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]
				], "0"
			],
			BB: ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "246$1", 0, "246"],
			BD: ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10],
				[
					["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"],
					["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"],
					["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|2[23]"], "0$1"],
					["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]
				], "0"
			],
			BE: ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9],
				[
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"],
					["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]
				], "0"
			],
			BF: ["226", "00", "[025-7]\\d{7}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]
				]
			],
			BG: ["359", "00", "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9, 12],
				[
					["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"],
					["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"],
					["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]
				], "0"
			],
			BH: ["973", "00", "[136-9]\\d{7}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]
				]
			],
			BI: ["257", "00", "(?:[267]\\d|31)\\d{6}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]
				]
			],
			BJ: ["229", "00", "(?:01\\d|[24-689])\\d{7}", [8, 10],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["0"]]
				]
			],
			BL: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [
				["590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-5])\\d{4}"]
			]],
			BM: ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "441$1", 0, "441"],
			BN: ["673", "00", "[2-578]\\d{6}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]
				]
			],
			BO: ["591", "00(?:1\\d)?", "8001\\d{5}|(?:[2-467]\\d|50)\\d{6}", [8, 9],
				[
					["(\\d)(\\d{7})", "$1 $2", ["[235]|4[46]"]],
					["(\\d{8})", "$1", ["[67]"]],
					["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]
				], "0", 0, "0(1\\d)?"
			],
			BQ: ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"],
			BR: ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11],
				[
					["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]],
					["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"],
					["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]
				], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"
			],
			BS: ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([3-8]\\d{6})$|1", "242$1", 0, "242"],
			BT: ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]
				]
			],
			BW: ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10],
				[
					["(\\d{2})(\\d{5})", "$1 $2", ["90"]],
					["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]],
					["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]
				]
			],
			BY: ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11],
				[
					["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"],
					["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"],
					["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"],
					["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]
				], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"
			],
			BZ: ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11],
				[
					["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]],
					["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]
				]
			],
			CA: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [
				["(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]],
				["", [10]],
				["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]],
				["900[2-9]\\d{6}", [10]],
				["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|33|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]], 0, ["310\\d{4}", [7]], 0, ["600[2-9]\\d{6}", [10]]
			]],
			CC: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [
				["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]],
				["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]
			], "0011"],
			CD: ["243", "00", "(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}", [7, 8, 9, 10],
				[
					["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
					["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["5"], "0$1"]
				], "0"
			],
			CF: ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]
				]
			],
			CG: ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9],
				[
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]
				]
			],
			CH: ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9, 12],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]
				], "0"
			],
			CI: ["225", "00", "[02]\\d{9}", [10],
				[
					["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]
				]
			],
			CK: ["682", "00", "[2-578]\\d{4}", [5],
				[
					["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]
				]
			],
			CL: ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11],
				[
					["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
					["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]
				]
			],
			CM: ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]],
					["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]
				]
			],
			CN: ["86", "00|1(?:[12]\\d|79)\\d\\d00", "(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}", [7, 8, 9, 10, 11, 12],
				[
					["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]", "(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"], "0$1"],
					["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1],
					["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1],
					["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1],
					["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]],
					["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]
				], "0", 0, "(1(?:[12]\\d|79)\\d\\d)|0", 0, 0, 0, 0, "00"
			],
			CO: ["57", "00(?:4(?:[14]4|56)|[579])", "(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}", [8, 10, 11],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["46"]],
					["(\\d{3})(\\d{7})", "$1 $2", ["6|90"], "($1)"],
					["(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|91"]],
					["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]
				], "0", 0, "0([3579]|4(?:[14]4|56))?"
			],
			CR: ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]
				], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"
			],
			CU: ["53", "119", "(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}", [6, 7, 8, 10],
				[
					["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"],
					["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"],
					["(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"],
					["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]
				], "0"
			],
			CV: ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7],
				[
					["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]
				]
			],
			CW: ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]],
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]
				], 0, 0, 0, 0, 0, "[69]"
			],
			CX: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [
				["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]],
				["4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]
			], "0011"],
			CY: ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8],
				[
					["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]
				]
			],
			CZ: ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9, 10, 11, 12],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]],
					["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]],
					["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
					["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]
				]
			],
			DE: ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				[
					["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"],
					["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"],
					["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"],
					["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"],
					["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"],
					["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"],
					["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"],
					["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"],
					["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"],
					["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"],
					["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
					["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"],
					["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"],
					["(\\d{5})(\\d{6})", "$1 $2", ["15[03568]", "15(?:[0568]|31)"], "0$1"],
					["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"],
					["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]
				], "0"
			],
			DJ: ["253", "00", "(?:2\\d|77)\\d{6}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]
				]
			],
			DK: ["45", "00", "[2-9]\\d{7}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]
				]
			],
			DM: ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "767$1", 0, "767"],
			DO: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"],
			DZ: ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]
				], "0"
			],
			EC: ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]
				], "0"
			],
			EE: ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],
					["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]],
					["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]
				]
			],
			EG: ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10],
				[
					["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"],
					["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
					["(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]
				], "0"
			],
			EH: ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"],
			ER: ["291", "00", "[178]\\d{6}", [7],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]
				], "0"
			],
			ES: ["34", "00", "[5-9]\\d{8}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]
				]
			],
			ET: ["251", "00", "(?:11|[2-579]\\d)\\d{7}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]
				], "0"
			],
			FI: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12],
				[
					["(\\d{5})", "$1", ["20[2-59]"], "0$1"],
					["(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[68])0|70[07-9]"], "0$1"],
					["(\\d{2})(\\d{4,8})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"],
					["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"],
					["(\\d)(\\d{4,9})", "$1 $2", ["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"]
				], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"
			],
			FJ: ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			FK: ["500", "00", "[2-7]\\d{4}", [5]],
			FM: ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]
				]
			],
			FO: ["298", "00", "[2-9]\\d{5}", [6],
				[
					["(\\d{6})", "$1", ["[2-9]"]]
				], 0, 0, "(10(?:01|[12]0|88))"
			],
			FR: ["33", "00", "[1-9]\\d{8}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"],
					["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]
				], "0"
			],
			GA: ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8],
				[
					["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]
				], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1"
			],
			GB: ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"],
					["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"],
					["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"],
					["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"],
					["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]
				], "0", 0, 0, 0, 0, 0, [
					["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-35])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]],
					["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]],
					["80[08]\\d{7}|800\\d{6}|8001111"],
					["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]],
					["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]],
					["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
					["56\\d{8}", [10]]
				], 0, " x"
			],
			GD: ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "473$1", 0, "473"],
			GE: ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]
				], "0"
			],
			GF: ["594", "00", "(?:[56]94\\d|7093)\\d{5}|(?:80|9\\d)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]|9[47]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]
				], "0"
			],
			GG: ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "([25-9]\\d{5})$|0", "1481$1", 0, 0, [
				["1481[25-9]\\d{5}", [10]],
				["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]],
				["80[08]\\d{7}|800\\d{6}|8001111"],
				["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]],
				["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
				["56\\d{8}", [10]]
			]],
			GH: ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9],
				[
					["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]
				], "0"
			],
			GI: ["350", "00", "(?:[25]\\d|60)\\d{6}", [8],
				[
					["(\\d{3})(\\d{5})", "$1 $2", ["2"]]
				]
			],
			GL: ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]
				]
			],
			GM: ["220", "00", "[2-9]\\d{6}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]
				]
			],
			GN: ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]
				]
			],
			GP: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]
				], "0", 0, 0, 0, 0, 0, [
					["590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}"],
					["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
					["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-5])\\d{4}"]
				]
			],
			GQ: ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]],
					["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]
				]
			],
			GR: ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12],
				[
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]],
					["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]],
					["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]
				]
			],
			GT: ["502", "00", "80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}", [8, 11],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[2-8]"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]
				]
			],
			GU: ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "671$1", 0, "671"],
			GW: ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["40"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]
				]
			],
			GY: ["592", "001", "(?:[2-8]\\d{3}|9008)\\d{3}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]
				]
			],
			HK: ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11],
				[
					["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
					["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			HN: ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11],
				[
					["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]
				]
			],
			HR: ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"],
					["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6|7[245]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
				], "0"
			],
			HT: ["509", "00", "(?:[2-489]\\d|55)\\d{6}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]
				]
			],
			HU: ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]
				], "06"
			],
			ID: ["62", "00[89]", "00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]],
					["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"],
					["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"],
					["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"],
					["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"],
					["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"],
					["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"],
					["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]
				], "0"
			],
			IE: ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10],
				[
					["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"],
					["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"],
					["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"],
					["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]
				], "0"
			],
			IL: ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12],
				[
					["(\\d{4})(\\d{3})", "$1-$2", ["125"]],
					["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]],
					["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]],
					["(\\d{4})(\\d{6})", "$1-$2", ["159"]],
					["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]],
					["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]
				], "0"
			],
			IM: ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([25-8]\\d{5})$|0", "1624$1", 0, "74576|(?:16|7[56])24"],
			IN: ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13],
				[
					["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1],
					["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1],
					["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1],
					["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1],
					["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]
				], "0"
			],
			IO: ["246", "00", "3\\d{6}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["3"]]
				]
			],
			IQ: ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
				], "0"
			],
			IR: ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10],
				[
					["(\\d{4,5})", "$1", ["96"], "0$1"],
					["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]
				], "0"
			],
			IS: ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			IT: ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11, 12],
				[
					["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]],
					["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]],
					["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["894"]],
					["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]|43"]],
					["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]],
					["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
					["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]
				], 0, 0, 0, 0, 0, 0, [
					["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}", [6, 7, 8, 9, 10, 11]],
					["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]],
					["80(?:0\\d{3}|3)\\d{3}", [6, 9]],
					["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [6, 8, 9, 10]],
					["1(?:78\\d|99)\\d{6}", [9, 10]],
					["3[2-8]\\d{9,10}", [11, 12]], 0, 0, ["55\\d{8}", [10]],
					["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]
				]
			],
			JE: ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([0-24-8]\\d{5})$|0", "1534$1", 0, 0, [
				["1534[0-24-8]\\d{5}"],
				["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"],
				["80(?:07(?:35|81)|8901)\\d{4}"],
				["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],
				["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"],
				["56\\d{8}"]
			]],
			JM: ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"],
			JO: ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"],
					["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
				], "0"
			],
			JP: ["81", "010", "00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
					["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"],
					["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]", "3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[25-9]"], "0$1"]
				], "0", 0, "(000[259]\\d{6})$|(?:(?:003768)0?)|0", "$1"
			],
			KE: ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10],
				[
					["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"],
					["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]
				], "0"
			],
			KG: ["996", "00", "8\\d{9}|[235-9]\\d{8}", [9, 10],
				[
					["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"],
					["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]
				], "0"
			],
			KH: ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10],
				[
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]
				], "0"
			],
			KI: ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"],
			KM: ["269", "00", "[3478]\\d{6}", [7],
				[
					["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]
				]
			],
			KN: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "869$1", 0, "869"],
			KP: ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"],
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]
				], "0"
			],
			KR: ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14],
				[
					["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"],
					["(\\d{4})(\\d{4})", "$1-$2", ["1"]],
					["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[36]0|8"], "0$1"],
					["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
					["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]
				], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"
			],
			KW: ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8],
				[
					["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]],
					["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]
				]
			],
			KY: ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "345$1", 0, "345"],
			KZ: ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", 0, "8~10"],
			LA: ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[0135-9]"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]
				], "0"
			],
			LB: ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]
				], "0"
			],
			LC: ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "([2-8]\\d{6})$|1", "758$1", 0, "758"],
			LI: ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9],
				[
					["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]
				], "0", 0, "(1001)|0"
			],
			LK: ["94", "00", "[1-9]\\d{8}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]
				], "0"
			],
			LR: ["231", "00", "(?:[245]\\d|33|77|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", [7, 8, 9],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|[56]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-578]"], "0$1"]
				], "0"
			],
			LS: ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]
				]
			],
			LT: ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(0-$1)", 1],
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0 $1", 1],
					["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(0-$1)", 1],
					["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(0-$1)", 1]
				], "0", 0, "[08]"
			],
			LU: ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11],
				[
					["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],
					["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],
					["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]],
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]
				], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"
			],
			LV: ["371", "00", "(?:[268]\\d|90)\\d{6}", [8],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]
				]
			],
			LY: ["218", "00", "[2-9]\\d{8}", [9],
				[
					["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]
				], "0"
			],
			MA: ["212", "00", "[5-8]\\d{8}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"],
					["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"], "0$1"],
					["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"],
					["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]
				], "0", 0, 0, 0, 0, 0, [
					["5(?:2(?:[0-25-79]\\d|3[1-578]|4[02-46-8]|8[0235-7])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[014-9]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"],
					["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-467]|5[0-3]|8[0-5]))\\d{6}"],
					["80[0-7]\\d{6}"],
					["89\\d{7}"], 0, 0, 0, 0, ["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]
				]
			],
			MC: ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]],
					["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]
				], "0"
			],
			MD: ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8],
				[
					["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]
				], "0"
			],
			ME: ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]
				], "0"
			],
			MF: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [
				["590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-5])\\d{4}"]
			]],
			MG: ["261", "00", "[23]\\d{8}", [9],
				[
					["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]
				], "0", 0, "([24-9]\\d{6})$|0", "20$1"
			],
			MH: ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7],
				[
					["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]
				], "1"
			],
			MK: ["389", "00", "[2-578]\\d{7}", [8],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"],
					["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]
				], "0"
			],
			ML: ["223", "00", "[24-9]\\d{7}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]
				]
			],
			MM: ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10],
				[
					["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"], "0$1"],
					["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|452|678|86", "[12]|452|6788|86"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"],
					["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
					["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"],
					["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]
				], "0"
			],
			MN: ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10],
				[
					["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"],
					["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]],
					["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"],
					["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"],
					["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]
				], "0"
			],
			MO: ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8],
				[
					["(\\d{4})(\\d{3})", "$1 $2", ["0"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]
				]
			],
			MP: ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "670$1", 0, "670"],
			MQ: ["596", "00", "(?:596\\d|7091)\\d{5}|(?:69|[89]\\d)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]|8(?:0[6-9]|[36])"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]
				], "0"
			],
			MR: ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]
				]
			],
			MS: ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "([34]\\d{6})$|1", "664$1", 0, "664"],
			MT: ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]
				]
			],
			MU: ["230", "0(?:0|[24-7]0|3[03])", "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[57]"]],
					["(\\d{5})(\\d{5})", "$1 $2", ["8"]]
				], 0, 0, 0, 0, 0, 0, 0, "020"
			],
			MV: ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10],
				[
					["(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			MW: ["265", "00", "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", [7, 9],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]
				], "0"
			],
			MX: ["52", "0[09]", "[2-9]\\d{9}", [10],
				[
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			MY: ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"],
					["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
					["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]
				], "0"
			],
			MZ: ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]
				]
			],
			NA: ["264", "00", "[68]\\d{7,8}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]
				], "0"
			],
			NC: ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]
				]
			],
			NE: ["227", "00", "[027-9]\\d{7}", [8],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[0467]"]]
				]
			],
			NF: ["672", "00", "[13]\\d{5}", [6],
				[
					["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]],
					["(\\d)(\\d{5})", "$1 $2", ["[13]"]]
				], 0, 0, "([0-258]\\d{4})$", "3$1"
			],
			NG: ["234", "009", "38\\d{6}|[78]\\d{9,13}|(?:20|9\\d)\\d{8}", [8, 10, 11, 12, 13, 14],
				[
					["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["3"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["20[129]"], "0$1"],
					["(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"],
					["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]
				], "0"
			],
			NI: ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]
				]
			],
			NL: ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11],
				[
					["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"],
					["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]
				], "0"
			],
			NO: ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8],
				[
					["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]
				], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"
			],
			NP: ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11],
				[
					["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"],
					["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"],
					["(\\d{3})(\\d{7})", "$1-$2", ["9"]]
				], "0"
			],
			NR: ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]
				]
			],
			NU: ["683", "00", "(?:[4-7]|888\\d)\\d{3}", [4, 7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["8"]]
				]
			],
			NZ: ["64", "0(?:0|161)", "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", [5, 6, 7, 8, 9, 10],
				[
					["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"],
					["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"],
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"],
					["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]
				], "0", 0, 0, 0, 0, 0, 0, "00"
			],
			OM: ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9],
				[
					["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]],
					["(\\d{2})(\\d{6})", "$1 $2", ["2"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]
				]
			],
			PA: ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11],
				[
					["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]],
					["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]
				]
			],
			PE: ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9],
				[
					["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"],
					["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"],
					["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]
				], "0", 0, 0, 0, 0, 0, 0, "00", " Anexo "
			],
			PF: ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]],
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]
				]
			],
			PG: ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			PH: ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13],
				[
					["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"],
					["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"],
					["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"],
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
					["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]
				], "0"
			],
			PK: ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12],
				[
					["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"],
					["(\\d{4})(\\d{5})", "$1 $2", ["1"]],
					["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"],
					["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"],
					["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"],
					["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"],
					["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]
				], "0"
			],
			PL: ["48", "00", "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", [6, 7, 8, 9, 10],
				[
					["(\\d{5})", "$1", ["19"]],
					["(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]],
					["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],
					["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]
				]
			],
			PM: ["508", "00", "[45]\\d{5}|(?:708|8\\d\\d)\\d{6}", [6, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]
				], "0"
			],
			PR: ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"],
			PS: ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]
				], "0"
			],
			PT: ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]
				]
			],
			PW: ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]
				]
			],
			PY: ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11],
				[
					["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
					["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"],
					["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]],
					["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-7])"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]
				], "0"
			],
			QA: ["974", "00", "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", [7, 8, 9, 11],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["2[16]|8"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]
				]
			],
			RE: ["262", "00", "709\\d{6}|(?:26|[689]\\d)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"], "0$1"]
				], "0", 0, 0, 0, 0, 0, [
					["26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}"],
					["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"],
					["80\\d{7}"],
					["89[1-37-9]\\d{6}"], 0, 0, 0, 0, ["9(?:399[0-3]|479[0-5]|76(?:2[278]|3[0-37]))\\d{4}"],
					["8(?:1[019]|2[0156]|84|90)\\d{6}"]
				]
			],
			RO: ["40", "00", "(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}", [6, 9],
				[
					["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"],
					["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"], "0$1"]
				], "0", 0, 0, 0, 0, 0, 0, 0, " int "
			],
			RS: ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12],
				[
					["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"],
					["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]
				], "0"
			],
			RU: ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14],
				[
					["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1],
					["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1],
					["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1],
					["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]
				], "8", 0, 0, 0, 0, "3[04-689]|[489]", 0, "8~10"
			],
			RW: ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]
				], "0"
			],
			SA: ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10],
				[
					["(\\d{4})(\\d{5})", "$1 $2", ["9"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]
				], "0"
			],
			SB: ["677", "0[01]", "[6-9]\\d{6}|[1-6]\\d{4}", [5, 7],
				[
					["(\\d{2})(\\d{5})", "$1 $2", ["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]]
				]
			],
			SC: ["248", "010|0[0-2]", "(?:[2489]\\d|64)\\d{5}", [7],
				[
					["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			SD: ["249", "00", "[19]\\d{8}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]
				], "0"
			],
			SE: ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10, 12],
				[
					["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"],
					["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"],
					["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"],
					["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"],
					["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"],
					["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"],
					["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]
				], "0"
			],
			SG: ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-9]|[1-9])"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
					["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]],
					["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]
				]
			],
			SH: ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"],
			SI: ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8],
				[
					["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"],
					["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"],
					["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]
				], "0", 0, 0, 0, 0, 0, 0, "00"
			],
			SJ: ["47", "00", "0\\d{4}|(?:[489]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"],
			SK: ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9],
				[
					["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"],
					["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"],
					["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]
				], "0"
			],
			SL: ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8],
				[
					["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]
				], "0"
			],
			SM: ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
					["(\\d{4})(\\d{6})", "$1 $2", ["0"]]
				], 0, 0, "([89]\\d{5})$", "0549$1"
			],
			SN: ["221", "00", "(?:[378]\\d|93)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]
				]
			],
			SO: ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9],
				[
					["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]],
					["(\\d{6})", "$1", ["[134]"]],
					["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],
					["(\\d)(\\d{7})", "$1 $2", ["(?:2|90)4|[67]"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79|90"]],
					["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[0-35-9]|7[67]|9[2-9]"]]
				], "0"
			],
			SR: ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]],
					["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]],
					["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]
				]
			],
			SS: ["211", "00", "[19]\\d{8}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]
				], "0"
			],
			ST: ["239", "00", "(?:22|9\\d)\\d{5}", [7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]
				]
			],
			SV: ["503", "00", "[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?", [7, 8, 11],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
					["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]
				]
			],
			SX: ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "(5\\d{6})$|1", "721$1", 0, "721"],
			SY: ["963", "00", "[1-359]\\d{8}|[1-5]\\d{7}", [8, 9],
				[
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-4]|5[1-3]"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[59]"], "0$1", 1]
				], "0"
			],
			SZ: ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]],
					["(\\d{5})(\\d{4})", "$1 $2", ["9"]]
				]
			],
			TA: ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"],
			TC: ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "([2-479]\\d{6})$|1", "649$1", 0, "649"],
			TD: ["235", "00|16", "(?:22|[689]\\d|77)\\d{6}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"]]
				], 0, 0, 0, 0, 0, 0, 0, "00"
			],
			TG: ["228", "00", "[279]\\d{7}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]
				]
			],
			TH: ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13],
				[
					["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"],
					["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]
				], "0"
			],
			TJ: ["992", "810", "[0-57-9]\\d{8}", [9],
				[
					["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]],
					["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[02-479]|[34]7"]],
					["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3(?:[1245]|3[12])"]],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]
				], 0, 0, 0, 0, 0, 0, 0, "8~10"
			],
			TK: ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]],
			TL: ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]],
					["(\\d{4})(\\d{4})", "$1 $2", ["7"]]
				]
			],
			TM: ["993", "810", "(?:[1-6]\\d|71)\\d{6}", [8],
				[
					["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"],
					["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"],
					["(\\d{2})(\\d{6})", "$1 $2", ["[67]"], "8 $1"]
				], "8", 0, 0, 0, 0, 0, 0, "8~10"
			],
			TN: ["216", "00", "[2-57-9]\\d{7}", [8],
				[
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]
				]
			],
			TO: ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7],
				[
					["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],
					["(\\d{4})(\\d{3})", "$1 $2", ["0"]],
					["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]
				]
			],
			TR: ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13],
				[
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|61[06])", "5(?:[0-59]|61[06]1)"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1],
					["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]
				], "0"
			],
			TT: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-46-8]\\d{6})$|1", "868$1", 0, "868"],
			TV: ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7],
				[
					["(\\d{2})(\\d{3})", "$1 $2", ["2"]],
					["(\\d{2})(\\d{4})", "$1 $2", ["90"]],
					["(\\d{2})(\\d{5})", "$1 $2", ["7"]]
				]
			],
			TW: ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11],
				[
					["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"],
					["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"],
					["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]
				], "0", 0, 0, 0, 0, 0, 0, 0, "#"
			],
			TZ: ["255", "00[056]", "(?:[25-8]\\d|41|90)\\d{7}", [9],
				[
					["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["5"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]
				], "0"
			],
			UA: ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"],
					["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]
				], "0", 0, 0, 0, 0, 0, 0, "0~0"
			],
			UG: ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9],
				[
					["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"],
					["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]
				], "0"
			],
			US: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10],
				[
					["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1],
					["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]
				], "1", 0, 0, 0, 0, 0, [
					["(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[468]))\\d{4}|(?:2742|305[3-9]|472[247-9]|505[2-57-9]|983[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"],
					[""],
					["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],
					["900[2-9]\\d{6}"],
					["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}"], 0, 0, 0, ["305209\\d{4}"]
				]
			],
			UY: ["598", "0(?:0|1[3-9]\\d)", "0004\\d{2,9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", [6, 7, 8, 9, 10, 11, 12, 13],
				[
					["(\\d{3})(\\d{3,4})", "$1 $2", ["0"]],
					["(\\d{3})(\\d{4})", "$1 $2", ["[49]0|8"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
					["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]],
					["(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]],
					["(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]
				], "0", 0, 0, 0, 0, 0, 0, "00", " int. "
			],
			UZ: ["998", "00", "(?:20|33|[5-9]\\d)\\d{7}", [9],
				[
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"]]
				]
			],
			VA: ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11, 12], 0, 0, 0, 0, 0, 0, "06698"],
			VC: ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "784$1", 0, "784"],
			VE: ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10],
				[
					["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]
				], "0"
			],
			VG: ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-578]\\d{6})$|1", "284$1", 0, "284"],
			VI: ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "340$1", 0, "340"],
			VN: ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10],
				[
					["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1],
					["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1],
					["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", 1],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", 1],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1],
					["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]
				], "0"
			],
			VU: ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7],
				[
					["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]
				]
			],
			WF: ["681", "00", "(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}", [6, 9],
				[
					["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[47-9]"]],
					["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]
				]
			],
			WS: ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10],
				[
					["(\\d{5})", "$1", ["[2-5]|6[1-9]"]],
					["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]],
					["(\\d{2})(\\d{5})", "$1 $2", ["7"]]
				]
			],
			XK: ["383", "00", "2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9, 10, 11, 12],
				[
					["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2|39"], "0$1"],
					["(\\d{2})(\\d{7,10})", "$1 $2", ["3"], "0$1"]
				], "0"
			],
			YE: ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9],
				[
					["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]
				], "0"
			],
			YT: ["262", "00", "7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [
				["269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}"],
				["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"],
				["80\\d{7}"], 0, 0, 0, 0, 0, ["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]
			]],
			ZA: ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10],
				[
					["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]
				], "0"
			],
			ZM: ["260", "00", "800\\d{6}|(?:21|63|[79]\\d)\\d{7}", [9],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]
				], "0"
			],
			ZW: ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10],
				[
					["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"],
					["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"],
					["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"],
					["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"],
					["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
					["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"],
					["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"],
					["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"],
					["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"],
					["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]
				], "0"
			]
		},
		nonGeographic: {
			800: ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]
				], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]
			],
			808: ["808", 0, "[1-9]\\d{7}", [8],
				[
					["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]
				], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]
			],
			870: ["870", 0, "7\\d{11}|[235-7]\\d{8}", [9, 12],
				[
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-7]"]]
				], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"], 0, 0, 0, 0, 0, 0, ["2\\d{8}", [9]]]
			],
			878: ["878", 0, "10\\d{10}", [12],
				[
					["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]
				], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]
			],
			881: ["881", 0, "6\\d{9}|[0-36-9]\\d{8}", [9, 10],
				[
					["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-37-9]"]],
					["(\\d)(\\d{3})(\\d{5,6})", "$1 $2 $3", ["6"]]
				], 0, 0, 0, 0, 0, 0, [0, ["6\\d{9}|[0-36-9]\\d{8}"]]
			],
			882: ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", [7, 8, 9, 10, 11, 12],
				[
					["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
					["(\\d{2})(\\d{6})", "$1 $2", ["49"]],
					["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]],
					["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
					["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]],
					["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|51"]],
					["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]],
					["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]
				], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, ["348[57]\\d{7}", [11]], 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]]
			],
			883: ["883", 0, "(?:[1-4]\\d|51)\\d{6,10}", [8, 9, 10, 11, 12],
				[
					["(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]],
					["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]],
					["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]],
					["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]],
					["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]
				], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]]
			],
			888: ["888", 0, "\\d{11}", [11],
				[
					["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]
				], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]
			],
			979: ["979", 0, "[1359]\\d{8}", [9],
				[
					["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]
				], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]
			]
		}
	};
	var XI = {}.constructor;

	function JI(e) {
		return null != e && e.constructor === XI
	}

	function QI(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function ZI(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function eE(e, t) {
		return function(e) {
			if (Array.isArray(e)) return e
		}(e) || function(e, t) {
			var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
			if (null == n) return;
			var r, a, s = [],
				o = !0,
				i = !1;
			try {
				for (n = n.call(e); !(o = (r = n.next()).done) && (s.push(r.value), !t || s.length !== t); o = !0);
			} catch (e) {
				i = !0, a = e
			} finally {
				try {
					o || null == n.return || n.return()
				} finally {
					if (i) throw a
				}
			}
			return s
		}(e, t) || function(e, t) {
			if (!e) return;
			if ("string" == typeof e) return tE(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			"Object" === n && e.constructor && (n = e.constructor.name);
			if ("Map" === n || "Set" === n) return Array.from(e);
			if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tE(e, t)
		}(e, t) || function() {
			throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
		}()
	}

	function tE(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}

	function nE(e) {
		var t, n, r, a = eE(Array.prototype.slice.call(e), 4),
			s = a[0],
			o = a[1],
			i = a[2],
			c = a[3];
		if ("string" != typeof s) throw new TypeError("A text for parsing must be a string.");
		if (t = s, o && "string" != typeof o) {
			if (!JI(o)) throw new Error("Invalid second argument: ".concat(o));
			i ? (n = o, r = i) : r = o
		} else c ? (n = i, r = c) : (n = void 0, r = i), o && (n = function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = null != arguments[t] ? arguments[t] : {};
				t % 2 ? QI(Object(n), !0).forEach((function(t) {
					ZI(e, t, n[t])
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : QI(Object(n)).forEach((function(t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
				}))
			}
			return e
		}({
			defaultCountry: o
		}, n));
		return {
			text: t,
			options: n,
			metadata: r
		}
	}
	var rE = 2,
		aE = 17,
		sE = 3,
		oE = "0-9０-９٠-٩۰-۹",
		iE = "".concat("-‐-―−ー－").concat("／/").concat("．.").concat("  ­​⁠ ").concat("()（）［］\\[\\]").concat("~⁓∼～");

	function cE(e) {
		return cE = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		}, cE(e)
	}

	function dE(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
		}
	}

	function lE(e) {
		var t = gE();
		return function() {
			var n, r = yE(e);
			if (t) {
				var a = yE(this).constructor;
				n = Reflect.construct(r, arguments, a)
			} else n = r.apply(this, arguments);
			return function(e, t) {
				if (t && ("object" === cE(t) || "function" == typeof t)) return t;
				if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
				return uE(e)
			}(this, n)
		}
	}

	function uE(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e
	}

	function pE(e) {
		var t = "function" == typeof Map ? new Map : void 0;
		return pE = function(e) {
			if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
			var n;
			if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
			if (void 0 !== t) {
				if (t.has(e)) return t.get(e);
				t.set(e, r)
			}

			function r() {
				return hE(e, arguments, yE(this).constructor)
			}
			return r.prototype = Object.create(e.prototype, {
				constructor: {
					value: r,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), fE(r, e)
		}, pE(e)
	}

	function hE(e, t, n) {
		return hE = gE() ? Reflect.construct : function(e, t, n) {
			var r = [null];
			r.push.apply(r, t);
			var a = new(Function.bind.apply(e, r));
			return n && fE(a, n.prototype), a
		}, hE.apply(null, arguments)
	}

	function gE() {
		if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
		if (Reflect.construct.sham) return !1;
		if ("function" == typeof Proxy) return !0;
		try {
			return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
		} catch (e) {
			return !1
		}
	}

	function fE(e, t) {
		return fE = Object.setPrototypeOf || function(e, t) {
			return e.__proto__ = t, e
		}, fE(e, t)
	}

	function yE(e) {
		return yE = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
			return e.__proto__ || Object.getPrototypeOf(e)
		}, yE(e)
	}
	var mE = function(e) {
		! function(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					writable: !0,
					configurable: !0
				}
			}), Object.defineProperty(e, "prototype", {
				writable: !1
			}), t && fE(e, t)
		}(s, e);
		var t, n, r, a = lE(s);

		function s(e) {
			var t;
			return function(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}(this, s), t = a.call(this, e), Object.setPrototypeOf(uE(t), s.prototype), t.name = t.constructor.name, t
		}
		return t = s, n && dE(t.prototype, n), r && dE(t, r), Object.defineProperty(t, "prototype", {
			writable: !1
		}), t
	}(pE(Error));

	function IE(e, t) {
		e = e.split("-"), t = t.split("-");
		for (var n = e[0].split("."), r = t[0].split("."), a = 0; a < 3; a++) {
			var s = Number(n[a]),
				o = Number(r[a]);
			if (s > o) return 1;
			if (o > s) return -1;
			if (!isNaN(s) && isNaN(o)) return 1;
			if (isNaN(s) && !isNaN(o)) return -1
		}
		return e[1] && t[1] ? e[1] > t[1] ? 1 : e[1] < t[1] ? -1 : 0 : !e[1] && t[1] ? 1 : e[1] && !t[1] ? -1 : 0
	}

	function EE(e) {
		return EE = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		}, EE(e)
	}

	function AE(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function _E(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
		}
	}

	function SE(e, t, n) {
		return t && _E(e.prototype, t), n && _E(e, n), Object.defineProperty(e, "prototype", {
			writable: !1
		}), e
	}
	var CE = " ext. ",
		$E = /^\d+$/,
		bE = function() {
			function e(t) {
				AE(this, e),
					function(e) {
						if (!e) throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
						if (!JI(e) || !JI(e.countries)) throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(JI(e) ? "an object of shape: { " + Object.keys(e).join(", ") + " }" : "a " + RE(e) + ": " + e, "."))
					}(t), this.metadata = t, xE.call(this, t)
			}
			return SE(e, [{
				key: "getCountries",
				value: function() {
					return Object.keys(this.metadata.countries).filter((function(e) {
						return "001" !== e
					}))
				}
			}, {
				key: "getCountryMetadata",
				value: function(e) {
					return this.metadata.countries[e]
				}
			}, {
				key: "nonGeographic",
				value: function() {
					if (!(this.v1 || this.v2 || this.v3)) return this.metadata.nonGeographic || this.metadata.nonGeographical
				}
			}, {
				key: "hasCountry",
				value: function(e) {
					return void 0 !== this.getCountryMetadata(e)
				}
			}, {
				key: "hasCallingCode",
				value: function(e) {
					if (this.getCountryCodesForCallingCode(e)) return !0;
					if (this.nonGeographic()) {
						if (this.nonGeographic()[e]) return !0
					} else {
						var t = this.countryCallingCodes()[e];
						if (t && 1 === t.length && "001" === t[0]) return !0
					}
				}
			}, {
				key: "isNonGeographicCallingCode",
				value: function(e) {
					return this.nonGeographic() ? !!this.nonGeographic()[e] : !this.getCountryCodesForCallingCode(e)
				}
			}, {
				key: "country",
				value: function(e) {
					return this.selectNumberingPlan(e)
				}
			}, {
				key: "selectNumberingPlan",
				value: function(e, t) {
					if (e && $E.test(e) && (t = e, e = null), e && "001" !== e) {
						if (!this.hasCountry(e)) throw new Error("Unknown country: ".concat(e));
						this.numberingPlan = new PE(this.getCountryMetadata(e), this)
					} else if (t) {
						if (!this.hasCallingCode(t)) throw new Error("Unknown calling code: ".concat(t));
						this.numberingPlan = new PE(this.getNumberingPlanMetadata(t), this)
					} else this.numberingPlan = void 0;
					return this
				}
			}, {
				key: "getCountryCodesForCallingCode",
				value: function(e) {
					var t = this.countryCallingCodes()[e];
					if (t) {
						if (1 === t.length && 3 === t[0].length) return;
						return t
					}
				}
			}, {
				key: "getCountryCodeForCallingCode",
				value: function(e) {
					var t = this.getCountryCodesForCallingCode(e);
					if (t) return t[0]
				}
			}, {
				key: "getNumberingPlanMetadata",
				value: function(e) {
					var t = this.getCountryCodeForCallingCode(e);
					if (t) return this.getCountryMetadata(t);
					if (this.nonGeographic()) {
						var n = this.nonGeographic()[e];
						if (n) return n
					} else {
						var r = this.countryCallingCodes()[e];
						if (r && 1 === r.length && "001" === r[0]) return this.metadata.countries["001"]
					}
				}
			}, {
				key: "countryCallingCode",
				value: function() {
					return this.numberingPlan.callingCode()
				}
			}, {
				key: "IDDPrefix",
				value: function() {
					return this.numberingPlan.IDDPrefix()
				}
			}, {
				key: "defaultIDDPrefix",
				value: function() {
					return this.numberingPlan.defaultIDDPrefix()
				}
			}, {
				key: "nationalNumberPattern",
				value: function() {
					return this.numberingPlan.nationalNumberPattern()
				}
			}, {
				key: "possibleLengths",
				value: function() {
					return this.numberingPlan.possibleLengths()
				}
			}, {
				key: "formats",
				value: function() {
					return this.numberingPlan.formats()
				}
			}, {
				key: "nationalPrefixForParsing",
				value: function() {
					return this.numberingPlan.nationalPrefixForParsing()
				}
			}, {
				key: "nationalPrefixTransformRule",
				value: function() {
					return this.numberingPlan.nationalPrefixTransformRule()
				}
			}, {
				key: "leadingDigits",
				value: function() {
					return this.numberingPlan.leadingDigits()
				}
			}, {
				key: "hasTypes",
				value: function() {
					return this.numberingPlan.hasTypes()
				}
			}, {
				key: "type",
				value: function(e) {
					return this.numberingPlan.type(e)
				}
			}, {
				key: "ext",
				value: function() {
					return this.numberingPlan.ext()
				}
			}, {
				key: "countryCallingCodes",
				value: function() {
					return this.v1 ? this.metadata.country_phone_code_to_countries : this.metadata.country_calling_codes
				}
			}, {
				key: "chooseCountryByCountryCallingCode",
				value: function(e) {
					return this.selectNumberingPlan(e)
				}
			}, {
				key: "hasSelectedNumberingPlan",
				value: function() {
					return void 0 !== this.numberingPlan
				}
			}]), e
		}(),
		PE = function() {
			function e(t, n) {
				AE(this, e), this.globalMetadataObject = n, this.metadata = t, xE.call(this, n.metadata)
			}
			return SE(e, [{
				key: "callingCode",
				value: function() {
					return this.metadata[0]
				}
			}, {
				key: "getDefaultCountryMetadataForRegion",
				value: function() {
					return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode())
				}
			}, {
				key: "IDDPrefix",
				value: function() {
					if (!this.v1 && !this.v2) return this.metadata[1]
				}
			}, {
				key: "defaultIDDPrefix",
				value: function() {
					if (!this.v1 && !this.v2) return this.metadata[12]
				}
			}, {
				key: "nationalNumberPattern",
				value: function() {
					return this.v1 || this.v2 ? this.metadata[1] : this.metadata[2]
				}
			}, {
				key: "possibleLengths",
				value: function() {
					if (!this.v1) return this.metadata[this.v2 ? 2 : 3]
				}
			}, {
				key: "_getFormats",
				value: function(e) {
					return e[this.v1 ? 2 : this.v2 ? 3 : 4]
				}
			}, {
				key: "formats",
				value: function() {
					var e = this,
						t = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
					return t.map((function(t) {
						return new OE(t, e)
					}))
				}
			}, {
				key: "nationalPrefix",
				value: function() {
					return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5]
				}
			}, {
				key: "_getNationalPrefixFormattingRule",
				value: function(e) {
					return e[this.v1 ? 4 : this.v2 ? 5 : 6]
				}
			}, {
				key: "nationalPrefixFormattingRule",
				value: function() {
					return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion())
				}
			}, {
				key: "_nationalPrefixForParsing",
				value: function() {
					return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7]
				}
			}, {
				key: "nationalPrefixForParsing",
				value: function() {
					return this._nationalPrefixForParsing() || this.nationalPrefix()
				}
			}, {
				key: "nationalPrefixTransformRule",
				value: function() {
					return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8]
				}
			}, {
				key: "_getNationalPrefixIsOptionalWhenFormatting",
				value: function() {
					return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9]
				}
			}, {
				key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
				value: function() {
					return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion())
				}
			}, {
				key: "leadingDigits",
				value: function() {
					return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10]
				}
			}, {
				key: "types",
				value: function() {
					return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11]
				}
			}, {
				key: "hasTypes",
				value: function() {
					return (!this.types() || 0 !== this.types().length) && !!this.types()
				}
			}, {
				key: "type",
				value: function(e) {
					if (this.hasTypes() && NE(this.types(), e)) return new vE(NE(this.types(), e), this)
				}
			}, {
				key: "ext",
				value: function() {
					return this.v1 || this.v2 ? CE : this.metadata[13] || CE
				}
			}]), e
		}(),
		OE = function() {
			function e(t, n) {
				AE(this, e), this._format = t, this.metadata = n
			}
			return SE(e, [{
				key: "pattern",
				value: function() {
					return this._format[0]
				}
			}, {
				key: "format",
				value: function() {
					return this._format[1]
				}
			}, {
				key: "leadingDigitsPatterns",
				value: function() {
					return this._format[2] || []
				}
			}, {
				key: "nationalPrefixFormattingRule",
				value: function() {
					return this._format[3] || this.metadata.nationalPrefixFormattingRule()
				}
			}, {
				key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
				value: function() {
					return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat()
				}
			}, {
				key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
				value: function() {
					return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat()
				}
			}, {
				key: "usesNationalPrefix",
				value: function() {
					return !(!this.nationalPrefixFormattingRule() || TE.test(this.nationalPrefixFormattingRule()))
				}
			}, {
				key: "internationalFormat",
				value: function() {
					return this._format[5] || this.format()
				}
			}]), e
		}(),
		TE = /^\(?\$1\)?$/,
		vE = function() {
			function e(t, n) {
				AE(this, e), this.type = t, this.metadata = n
			}
			return SE(e, [{
				key: "pattern",
				value: function() {
					return this.metadata.v1 ? this.type : this.type[0]
				}
			}, {
				key: "possibleLengths",
				value: function() {
					if (!this.metadata.v1) return this.type[1] || this.metadata.possibleLengths()
				}
			}]), e
		}();

	function NE(e, t) {
		switch (t) {
			case "FIXED_LINE":
				return e[0];
			case "MOBILE":
				return e[1];
			case "TOLL_FREE":
				return e[2];
			case "PREMIUM_RATE":
				return e[3];
			case "PERSONAL_NUMBER":
				return e[4];
			case "VOICEMAIL":
				return e[5];
			case "UAN":
				return e[6];
			case "PAGER":
				return e[7];
			case "VOIP":
				return e[8];
			case "SHARED_COST":
				return e[9]
		}
	}
	var RE = function(e) {
		return EE(e)
	};

	function DE(e, t) {
		if ((t = new bE(t)).hasCountry(e)) return t.country(e).countryCallingCode();
		throw new Error("Unknown country: ".concat(e))
	}

	function xE(e) {
		var t = e.version;
		"number" == typeof t ? (this.v1 = 1 === t, this.v2 = 2 === t, this.v3 = 3 === t, this.v4 = 4 === t) : t ? -1 === IE(t, "1.2.0") ? this.v2 = !0 : -1 === IE(t, "1.7.35") ? this.v3 = !0 : this.v4 = !0 : this.v1 = !0
	}
	var wE = function(e) {
		return "([".concat(oE, "]{1,").concat(e, "})")
	};

	function ME(e) {
		var t = "[  \\t,]*",
			n = "[:\\.．]?[  \\t,-]*",
			r = "#?",
			a = "[  \\t]*";
		return ";ext=" + wE("20") + "|" + (t + "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)" + n + wE("20") + r) + "|" + (t + "(?:[xｘ#＃~～]|int|ｉｎｔ)" + n + wE("9") + r) + "|" + ("[- ]+" + wE("6") + "#") + "|" + (a + "(?:,{2}|;)" + n + wE("15") + r) + "|" + (a + "(?:,)+" + n + wE("9") + r)
	}
	var LE = "[" + oE + "]{" + rE + "}",
		jE = "[+＋]{0,1}(?:[" + iE + "]*[" + oE + "]){3,}[" + iE + oE + "]*",
		UE = new RegExp("^[+＋]{0,1}(?:[" + iE + "]*[" + oE + "]){1,2}$", "i"),
		FE = jE + "(?:" + ME() + ")?",
		kE = new RegExp("^" + LE + "$|^" + FE + "$", "i");
	var VE = new RegExp("(?:" + ME() + ")$", "i");
	var GE = {
		0: "0",
		1: "1",
		2: "2",
		3: "3",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		8: "8",
		9: "9",
		"０": "0",
		"１": "1",
		"２": "2",
		"３": "3",
		"４": "4",
		"５": "5",
		"６": "6",
		"７": "7",
		"８": "8",
		"９": "9",
		"٠": "0",
		"١": "1",
		"٢": "2",
		"٣": "3",
		"٤": "4",
		"٥": "5",
		"٦": "6",
		"٧": "7",
		"٨": "8",
		"٩": "9",
		"۰": "0",
		"۱": "1",
		"۲": "2",
		"۳": "3",
		"۴": "4",
		"۵": "5",
		"۶": "6",
		"۷": "7",
		"۸": "8",
		"۹": "9"
	};

	function BE(e) {
		return GE[e]
	}

	function HE(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (n) return (n = n.call(e)).next.bind(n);
		if (Array.isArray(e) || (n = function(e, t) {
				if (!e) return;
				if ("string" == typeof e) return WE(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return WE(e, t)
			}(e)) || t && e && "number" == typeof e.length) {
			n && (e = n);
			var r = 0;
			return function() {
				return r >= e.length ? {
					done: !0
				} : {
					done: !1,
					value: e[r++]
				}
			}
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function WE(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}

	function qE(e) {
		for (var t, n = "", r = HE(e.split("")); !(t = r()).done;) {
			n += zE(t.value, n) || ""
		}
		return n
	}

	function zE(e, t, n) {
		return "+" === e ? t ? void("function" == typeof n && n("end")) : "+" : BE(e)
	}

	function YE(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (n) return (n = n.call(e)).next.bind(n);
		if (Array.isArray(e) || (n = function(e, t) {
				if (!e) return;
				if ("string" == typeof e) return KE(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return KE(e, t)
			}(e)) || t && e && "number" == typeof e.length) {
			n && (e = n);
			var r = 0;
			return function() {
				return r >= e.length ? {
					done: !0
				} : {
					done: !1,
					value: e[r++]
				}
			}
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function KE(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}

	function XE(e, t) {
		return JE(e, void 0, t)
	}

	function JE(e, t, n) {
		var r = n.type(t),
			a = r && r.possibleLengths() || n.possibleLengths();
		if (!a) return "IS_POSSIBLE";
		if ("FIXED_LINE_OR_MOBILE" === t) {
			if (!n.type("FIXED_LINE")) return JE(e, "MOBILE", n);
			var s = n.type("MOBILE");
			s && (a = function(e, t) {
				for (var n, r = e.slice(), a = YE(t); !(n = a()).done;) {
					var s = n.value;
					e.indexOf(s) < 0 && r.push(s)
				}
				return r.sort((function(e, t) {
					return e - t
				}))
			}(a, s.possibleLengths()))
		} else if (t && !r) return "INVALID_LENGTH";
		var o = e.length,
			i = a[0];
		return i === o ? "IS_POSSIBLE" : i > o ? "TOO_SHORT" : a[a.length - 1] < o ? "TOO_LONG" : a.indexOf(o, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH"
	}

	function QE(e, t) {
		return "IS_POSSIBLE" === XE(e, t)
	}

	function ZE(e, t) {
		return e = e || "", new RegExp("^(?:" + t + ")$").test(e)
	}

	function eA(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (n) return (n = n.call(e)).next.bind(n);
		if (Array.isArray(e) || (n = function(e, t) {
				if (!e) return;
				if ("string" == typeof e) return tA(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return tA(e, t)
			}(e)) || t && e && "number" == typeof e.length) {
			n && (e = n);
			var r = 0;
			return function() {
				return r >= e.length ? {
					done: !0
				} : {
					done: !1,
					value: e[r++]
				}
			}
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function tA(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}
	var nA = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];

	function rA(e, t, n) {
		if (t = t || {}, e.country || e.countryCallingCode) {
			(n = new bE(n)).selectNumberingPlan(e.country, e.countryCallingCode);
			var r = t.v2 ? e.nationalNumber : e.phone;
			if (ZE(r, n.nationalNumberPattern())) {
				if (aA(r, "FIXED_LINE", n)) return n.type("MOBILE") && "" === n.type("MOBILE").pattern() ? "FIXED_LINE_OR_MOBILE" : n.type("MOBILE") ? aA(r, "MOBILE", n) ? "FIXED_LINE_OR_MOBILE" : "FIXED_LINE" : "FIXED_LINE_OR_MOBILE";
				for (var a, s = eA(nA); !(a = s()).done;) {
					var o = a.value;
					if (aA(r, o, n)) return o
				}
			}
		}
	}

	function aA(e, t, n) {
		return !(!(t = n.type(t)) || !t.pattern()) && (!(t.possibleLengths() && t.possibleLengths().indexOf(e.length) < 0) && ZE(e, t.pattern()))
	}

	function sA(e, t, n) {
		var r = new bE(n).getCountryCodesForCallingCode(e);
		return r ? r.filter((function(e) {
			return function(e, t, n) {
				var r = new bE(n);
				if (r.selectNumberingPlan(t), r.numberingPlan.possibleLengths().indexOf(e.length) >= 0) return !0;
				return !1
			}(t, e, n)
		})) : []
	}
	var oA = /(\$\d)/;

	function iA(e, t, n) {
		var r = n.useInternationalFormat,
			a = n.withNationalPrefix,
			s = (n.carrierCode, n.metadata, e.replace(new RegExp(t.pattern()), r ? t.internationalFormat() : a && t.nationalPrefixFormattingRule() ? t.format().replace(oA, t.nationalPrefixFormattingRule()) : t.format()));
		return r ? function(e) {
			return e.replace(new RegExp("[".concat(iE, "]+"), "g"), " ").trim()
		}(s) : s
	}
	var cA = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;

	function dA(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (n) return (n = n.call(e)).next.bind(n);
		if (Array.isArray(e) || (n = function(e, t) {
				if (!e) return;
				if ("string" == typeof e) return lA(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lA(e, t)
			}(e)) || t && e && "number" == typeof e.length) {
			n && (e = n);
			var r = 0;
			return function() {
				return r >= e.length ? {
					done: !0
				} : {
					done: !1,
					value: e[r++]
				}
			}
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function lA(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}

	function uA(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function pA(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? uA(Object(n), !0).forEach((function(t) {
				hA(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : uA(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}

	function hA(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}
	var gA = {
		formatExtension: function(e, t, n) {
			return "".concat(e).concat(n.ext()).concat(t)
		}
	};

	function fA(e, t, n, r) {
		if (n = n ? pA(pA({}, gA), n) : gA, r = new bE(r), e.country && "001" !== e.country) {
			if (!r.hasCountry(e.country)) throw new Error("Unknown country: ".concat(e.country));
			r.country(e.country)
		} else {
			if (!e.countryCallingCode) return e.phone || "";
			r.selectNumberingPlan(e.countryCallingCode)
		}
		var a, s = r.countryCallingCode(),
			o = n.v2 ? e.nationalNumber : e.phone;
		switch (t) {
			case "NATIONAL":
				return o ? mA(a = yA(o, e.carrierCode, "NATIONAL", r, n), e.ext, r, n.formatExtension) : "";
			case "INTERNATIONAL":
				return o ? (a = yA(o, null, "INTERNATIONAL", r, n), mA(a = "+".concat(s, " ").concat(a), e.ext, r, n.formatExtension)) : "+".concat(s);
			case "E.164":
				return "+".concat(s).concat(o);
			case "RFC3966":
				return function(e) {
					var t = e.number,
						n = e.ext;
					if (!t) return "";
					if ("+" !== t[0]) throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
					return "tel:".concat(t).concat(n ? ";ext=" + n : "")
				}({
					number: "+".concat(s).concat(o),
					ext: e.ext
				});
			case "IDD":
				if (!n.fromCountry) return;
				var i = function(e, t, n, r, a) {
					var s = DE(r, a.metadata);
					if (s === n) {
						var o = yA(e, t, "NATIONAL", a);
						return "1" === n ? n + " " + o : o
					}
					var i = function(e, t, n) {
						var r = new bE(n);
						return r.selectNumberingPlan(e, t), r.defaultIDDPrefix() ? r.defaultIDDPrefix() : cA.test(r.IDDPrefix()) ? r.IDDPrefix() : void 0
					}(r, void 0, a.metadata);
					if (i) return "".concat(i, " ").concat(n, " ").concat(yA(e, null, "INTERNATIONAL", a))
				}(o, e.carrierCode, s, n.fromCountry, r);
				return mA(i, e.ext, r, n.formatExtension);
			default:
				throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(t, '"'))
		}
	}

	function yA(e, t, n, r, a) {
		var s = function(e, t) {
			for (var n, r = dA(e); !(n = r()).done;) {
				var a = n.value;
				if (a.leadingDigitsPatterns().length > 0) {
					var s = a.leadingDigitsPatterns()[a.leadingDigitsPatterns().length - 1];
					if (0 !== t.search(s)) continue
				}
				if (ZE(t, a.pattern())) return a
			}
		}(r.formats(), e);
		return s ? iA(e, s, {
			useInternationalFormat: "INTERNATIONAL" === n,
			withNationalPrefix: !s.nationalPrefixIsOptionalWhenFormattingInNationalFormat() || !a || !1 !== a.nationalPrefix,
			carrierCode: t,
			metadata: r
		}) : e
	}

	function mA(e, t, n, r) {
		return t ? r(e, t, n) : e
	}

	function IA(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function EA(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? IA(Object(n), !0).forEach((function(t) {
				AA(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : IA(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}

	function AA(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function _A(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
		}
	}
	var SA = function() {
			function e(t, n, r) {
				if (function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), !t) throw new TypeError("`country` or `countryCallingCode` not passed");
				if (!n) throw new TypeError("`nationalNumber` not passed");
				if (!r) throw new TypeError("`metadata` not passed");
				var a = function(e, t) {
						var n, r, a = new bE(t);
						CA(e) ? (n = e, a.selectNumberingPlan(n), r = a.countryCallingCode()) : r = e;
						return {
							country: n,
							countryCallingCode: r
						}
					}(t, r),
					s = a.country,
					o = a.countryCallingCode;
				this.country = s, this.countryCallingCode = o, this.nationalNumber = n, this.number = "+" + this.countryCallingCode + this.nationalNumber, this.getMetadata = function() {
					return r
				}
			}
			var t, n, r;
			return t = e, (n = [{
				key: "setExt",
				value: function(e) {
					this.ext = e
				}
			}, {
				key: "getPossibleCountries",
				value: function() {
					return this.country ? [this.country] : sA(this.countryCallingCode, this.nationalNumber, this.getMetadata())
				}
			}, {
				key: "isPossible",
				value: function() {
					return function(e, t, n) {
						if (void 0 === t && (t = {}), n = new bE(n), t.v2) {
							if (!e.countryCallingCode) throw new Error("Invalid phone number object passed");
							n.selectNumberingPlan(e.countryCallingCode)
						} else {
							if (!e.phone) return !1;
							if (e.country) {
								if (!n.hasCountry(e.country)) throw new Error("Unknown country: ".concat(e.country));
								n.country(e.country)
							} else {
								if (!e.countryCallingCode) throw new Error("Invalid phone number object passed");
								n.selectNumberingPlan(e.countryCallingCode)
							}
						}
						if (n.possibleLengths()) return QE(e.phone || e.nationalNumber, n);
						if (e.countryCallingCode && n.isNonGeographicCallingCode(e.countryCallingCode)) return !0;
						throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.')
					}(this, {
						v2: !0
					}, this.getMetadata())
				}
			}, {
				key: "isValid",
				value: function() {
					return e = this, t = {
						v2: !0
					}, n = this.getMetadata(), t = t || {}, (n = new bE(n)).selectNumberingPlan(e.country, e.countryCallingCode), n.hasTypes() ? void 0 !== rA(e, t, n.metadata) : ZE(t.v2 ? e.nationalNumber : e.phone, n.nationalNumberPattern());
					var e, t, n
				}
			}, {
				key: "isNonGeographic",
				value: function() {
					return new bE(this.getMetadata()).isNonGeographicCallingCode(this.countryCallingCode)
				}
			}, {
				key: "isEqual",
				value: function(e) {
					return this.number === e.number && this.ext === e.ext
				}
			}, {
				key: "getType",
				value: function() {
					return rA(this, {
						v2: !0
					}, this.getMetadata())
				}
			}, {
				key: "format",
				value: function(e, t) {
					return fA(this, e, t ? EA(EA({}, t), {}, {
						v2: !0
					}) : {
						v2: !0
					}, this.getMetadata())
				}
			}, {
				key: "formatNational",
				value: function(e) {
					return this.format("NATIONAL", e)
				}
			}, {
				key: "formatInternational",
				value: function(e) {
					return this.format("INTERNATIONAL", e)
				}
			}, {
				key: "getURI",
				value: function(e) {
					return this.format("RFC3966", e)
				}
			}]) && _A(t.prototype, n), r && _A(t, r), Object.defineProperty(t, "prototype", {
				writable: !1
			}), e
		}(),
		CA = function(e) {
			return /^[A-Z]{2}$/.test(e)
		};
	var $A = new RegExp("([" + oE + "])");

	function bA(e, t) {
		var n = function(e, t) {
				if (e && t.numberingPlan.nationalPrefixForParsing()) {
					var n = new RegExp("^(?:" + t.numberingPlan.nationalPrefixForParsing() + ")"),
						r = n.exec(e);
					if (r) {
						var a, s, o, i = r.length - 1,
							c = i > 0 && r[i];
						if (t.nationalPrefixTransformRule() && c) a = e.replace(n, t.nationalPrefixTransformRule()), i > 1 && (s = r[1]);
						else {
							var d = r[0];
							a = e.slice(d.length), c && (s = r[1])
						}
						if (c) {
							var l = e.indexOf(r[1]);
							e.slice(0, l) === t.numberingPlan.nationalPrefix() && (o = t.numberingPlan.nationalPrefix())
						} else o = r[0];
						return {
							nationalNumber: a,
							nationalPrefix: o,
							carrierCode: s
						}
					}
				}
				return {
					nationalNumber: e
				}
			}(e, t),
			r = n.carrierCode,
			a = n.nationalNumber;
		if (a !== e) {
			if (! function(e, t, n) {
					if (ZE(e, n.nationalNumberPattern()) && !ZE(t, n.nationalNumberPattern())) return !1;
					return !0
				}(e, a, t)) return {
				nationalNumber: e
			};
			if (t.possibleLengths() && ! function(e, t) {
					switch (XE(e, t)) {
						case "TOO_SHORT":
						case "INVALID_LENGTH":
							return !1;
						default:
							return !0
					}
				}(a, t)) return {
				nationalNumber: e
			}
		}
		return {
			nationalNumber: a,
			carrierCode: r
		}
	}

	function PA(e, t, n, r) {
		if (!e) return {};
		var a;
		if ("+" !== e[0]) {
			var s = function(e, t, n, r) {
				if (t) {
					var a = new bE(r);
					a.selectNumberingPlan(t, n);
					var s = new RegExp(a.IDDPrefix());
					if (0 === e.search(s)) {
						var o = (e = e.slice(e.match(s)[0].length)).match($A);
						if (!(o && null != o[1] && o[1].length > 0 && "0" === o[1])) return e
					}
				}
			}(e, t, n, r);
			if (!s || s === e) {
				if (t || n) {
					var o = function(e, t, n, r) {
							var a = t ? DE(t, r) : n;
							if (0 === e.indexOf(a)) {
								(r = new bE(r)).selectNumberingPlan(t, n);
								var s = e.slice(a.length),
									o = bA(s, r).nationalNumber,
									i = bA(e, r).nationalNumber;
								if (!ZE(i, r.nationalNumberPattern()) && ZE(o, r.nationalNumberPattern()) || "TOO_LONG" === XE(i, r)) return {
									countryCallingCode: a,
									number: s
								}
							}
							return {
								number: e
							}
						}(e, t, n, r),
						i = o.countryCallingCode,
						c = o.number;
					if (i) return {
						countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
						countryCallingCode: i,
						number: c
					}
				}
				return {
					number: e
				}
			}
			a = !0, e = "+" + s
		}
		if ("0" === e[1]) return {};
		r = new bE(r);
		for (var d = 2; d - 1 <= sE && d <= e.length;) {
			var l = e.slice(1, d);
			if (r.hasCallingCode(l)) return r.selectNumberingPlan(l), {
				countryCallingCodeSource: a ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
				countryCallingCode: l,
				number: e.slice(d)
			};
			d++
		}
		return {}
	}

	function OA(e, t) {
		var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
		if (n) return (n = n.call(e)).next.bind(n);
		if (Array.isArray(e) || (n = function(e, t) {
				if (!e) return;
				if ("string" == typeof e) return TA(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TA(e, t)
			}(e)) || t && e && "number" == typeof e.length) {
			n && (e = n);
			var r = 0;
			return function() {
				return r >= e.length ? {
					done: !0
				} : {
					done: !1,
					value: e[r++]
				}
			}
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function TA(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
		return r
	}
	var vA = !1;

	function NA(e, t) {
		var n = t.nationalNumber,
			r = t.defaultCountry,
			a = t.metadata;
		if (vA && a.isNonGeographicCallingCode(e)) return "001";
		var s = a.getCountryCodesForCallingCode(e);
		return s ? 1 === s.length ? s[0] : function(e, t) {
			var n = t.countries,
				r = (t.defaultCountry, t.metadata);
			r = new bE(r);
			for (var a, s = OA(n); !(a = s()).done;) {
				var o = a.value;
				if (r.country(o), r.leadingDigits()) {
					if (e && 0 === e.search(r.leadingDigits())) return o
				} else if (rA({
						phone: e,
						country: o
					}, void 0, r.metadata)) return o
			}
		}(n, {
			countries: s,
			defaultCountry: r,
			metadata: a.metadata
		}) : void 0
	}
	var RA = "+",
		DA = "([" + oE + "]|[\\-\\.\\(\\)]?)",
		xA = new RegExp("^\\" + RA + DA + "*[" + oE + "]" + DA + "*$", "g"),
		wA = new RegExp("^(" + ("[" + oE + "]+((\\-)*[" + oE + "])*") + "\\.)*" + ("[a-zA-Z]+((\\-)*[" + oE + "])*") + "\\.?$", "g"),
		MA = "tel:",
		LA = ";phone-context=",
		jA = ";isub=";

	function UA(e, t) {
		var n, r = t.extractFormattedPhoneNumber,
			a = function(e) {
				var t = e.indexOf(LA);
				if (t < 0) return null;
				var n = t + LA.length;
				if (n >= e.length) return "";
				var r = e.indexOf(";", n);
				return r >= 0 ? e.substring(n, r) : e.substring(n)
			}(e);
		if (! function(e) {
				return null === e || 0 !== e.length && (xA.test(e) || wA.test(e))
			}(a)) throw new mE("NOT_A_NUMBER");
		if (null === a) n = r(e) || "";
		else {
			n = "", a.charAt(0) === RA && (n += a);
			var s, o = e.indexOf(MA);
			s = o >= 0 ? o + MA.length : 0;
			var i = e.indexOf(LA);
			n += e.substring(s, i)
		}
		var c = n.indexOf(jA);
		if (c > 0 && (n = n.substring(0, c)), "" !== n) return n
	}
	var FA = 250,
		kA = new RegExp("[+＋" + oE + "]"),
		VA = new RegExp("[^" + oE + "#]+$"),
		GA = !1;

	function BA(e, t, n) {
		if (t = t || {}, n = new bE(n), t.defaultCountry && !n.hasCountry(t.defaultCountry)) {
			if (t.v2) throw new mE("INVALID_COUNTRY");
			throw new Error("Unknown country: ".concat(t.defaultCountry))
		}
		var r = function(e, t, n) {
				var r = UA(e, {
					extractFormattedPhoneNumber: function(e) {
						return function(e, t, n) {
							if (!e) return;
							if (e.length > FA) {
								if (n) throw new mE("TOO_LONG");
								return
							}
							if (!1 === t) return e;
							var r = e.search(kA);
							if (r < 0) return;
							return e.slice(r).replace(VA, "")
						}(e, n, t)
					}
				});
				if (!r) return {};
				if (! function(e) {
						return e.length >= rE && kE.test(e)
					}(r)) return function(e) {
					return UE.test(e)
				}(r) ? {
					error: "TOO_SHORT"
				} : {};
				var a = function(e) {
					var t = e.search(VE);
					if (t < 0) return {};
					for (var n = e.slice(0, t), r = e.match(VE), a = 1; a < r.length;) {
						if (r[a]) return {
							number: n,
							ext: r[a]
						};
						a++
					}
				}(r);
				if (a.ext) return a;
				return {
					number: r
				}
			}(e, t.v2, t.extract),
			a = r.number,
			s = r.ext,
			o = r.error;
		if (!a) {
			if (t.v2) {
				if ("TOO_SHORT" === o) throw new mE("TOO_SHORT");
				throw new mE("NOT_A_NUMBER")
			}
			return {}
		}
		var i = function(e, t, n, r) {
				var a, s = PA(qE(e), t, n, r.metadata),
					o = s.countryCallingCodeSource,
					i = s.countryCallingCode,
					c = s.number;
				if (i) r.selectNumberingPlan(i);
				else {
					if (!c || !t && !n) return {};
					r.selectNumberingPlan(t, n), t ? a = t : GA && r.isNonGeographicCallingCode(n) && (a = "001"), i = n || DE(t, r.metadata)
				}
				if (!c) return {
					countryCallingCodeSource: o,
					countryCallingCode: i
				};
				var d = bA(qE(c), r),
					l = d.nationalNumber,
					u = d.carrierCode,
					p = NA(i, {
						nationalNumber: l,
						defaultCountry: t,
						metadata: r
					});
				p && (a = p, "001" === p || r.country(a));
				return {
					country: a,
					countryCallingCode: i,
					countryCallingCodeSource: o,
					nationalNumber: l,
					carrierCode: u
				}
			}(a, t.defaultCountry, t.defaultCallingCode, n),
			c = i.country,
			d = i.nationalNumber,
			l = i.countryCallingCode,
			u = i.countryCallingCodeSource,
			p = i.carrierCode;
		if (!n.hasSelectedNumberingPlan()) {
			if (t.v2) throw new mE("INVALID_COUNTRY");
			return {}
		}
		if (!d || d.length < rE) {
			if (t.v2) throw new mE("TOO_SHORT");
			return {}
		}
		if (d.length > aE) {
			if (t.v2) throw new mE("TOO_LONG");
			return {}
		}
		if (t.v2) {
			var h = new SA(l, d, n.metadata);
			return c && (h.country = c), p && (h.carrierCode = p), s && (h.ext = s), h.__countryCallingCodeSource = u, h
		}
		var g = !!(t.extended ? n.hasSelectedNumberingPlan() : c) && ZE(d, n.nationalNumberPattern());
		return t.extended ? {
			country: c,
			countryCallingCode: l,
			carrierCode: p,
			valid: g,
			possible: !!g || !(!0 !== t.extended || !n.possibleLengths() || !QE(d, n)),
			phone: d,
			ext: s
		} : g ? function(e, t, n) {
			var r = {
				country: e,
				phone: t
			};
			n && (r.ext = n);
			return r
		}(c, d, s) : {}
	}

	function HA(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function WA(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? HA(Object(n), !0).forEach((function(t) {
				qA(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : HA(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}

	function qA(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function zA(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function YA(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? zA(Object(n), !0).forEach((function(t) {
				KA(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zA(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}

	function KA(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function XA(e, t, n) {
		t && t.defaultCountry && ! function(e, t) {
			return t.countries.hasOwnProperty(e)
		}(t.defaultCountry, n) && (t = YA(YA({}, t), {}, {
			defaultCountry: void 0
		}));
		try {
			return function(e, t, n) {
				return BA(e, WA(WA({}, t), {}, {
					v2: !0
				}), n)
			}(e, t, n)
		} catch (e) {
			if (!(e instanceof mE)) throw e
		}
	}

	function JA(e, t) {
		var n = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var r = Object.getOwnPropertySymbols(e);
			t && (r = r.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), n.push.apply(n, r)
		}
		return n
	}

	function QA(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? JA(Object(n), !0).forEach((function(t) {
				ZA(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : JA(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}

	function ZA(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e
	}

	function e_() {
		var e = nE(arguments),
			t = e.text,
			n = e.options,
			r = e.metadata,
			a = XA(t, n = QA(QA({}, n), {}, {
				extract: !1
			}), r);
		return a && a.isPossible() || !1
	}

	function t_() {
		return function(e, t) {
			var n = Array.prototype.slice.call(t);
			return n.push(KI), e.apply(this, n)
		}(e_, arguments)
	}
	Lr.register("phone", (e => {
		let t = null;
		e && !/^\+?\d+$/.test(e) && (t = de.getLocaleValue("Enter a valid phone number", "Messages"));
		const n = e?.startsWith("+");
		if (e && n) {
			t_(e) || (t = de.getLocaleValue("Enter a valid phone number", "Messages"))
		}
		return t
	}));
	const n_ = (e, t) => {
		switch (t) {
			case "invalid":
				return de.getLocaleValue(`Incorrect ${e}`, "Messages");
			case "incomplete":
				return de.getLocaleValue(`Incomplete ${e}`, "Messages");
			default:
				return null
		}
	};
	Lr.register("datetime", (e => n_("DateTime", e))), Lr.register("date", (e => n_("Date", e))), Lr.register("time", (e => n_("Time", e)));
	const r_ = new class {
		createC11nEnv = e => yu(e);
		getContextUtils = () => e;
		getRoutingManager = () => t;
		getComponentsRegistry = () => he;
		getStateManager = () => d;
		getActionCreators = () => l;
		getStreamObservable = () => s;
		getActionProcessor = () => Pp;
		getActionHandler = () => bp;
		renderApp = (e, t) => {
			const n = {
					context: W.APP.APP
				},
				r = {
					..._p.getIn(e, W.ROOT),
					options: n
				};
			aI(e), Aa(e, n, !0);
			const a = this.createC11nEnv({
				meta: r,
				isRoot: !0
			});
			Ta.publish(H.PUB_SUB_EVENTS.EVENT_RENDER_APP, {
				props: a,
				domContainerID: t
			})
		};
		updateStoreWithUiRoot = async (e, t, n) => {
			const r = Pf(e),
				{
					data: a,
					uiResources: s = {}
				} = e,
				o = _p.getIn(s, W.CONTEXT_DATA);
			await ns(r, {}, {}, !1, !0);
			const i = {
					...a,
					[W.CONTEXT_DATA]: o
				},
				{
					root: c
				} = s;
			to(c, t, i, n)
		};
		fetchEndPointResource = (e, t, n) => {
			yl(e, {
				method: "GET"
			}, W.APP.ROOT).then((async e => {
				const {
					data: r,
					status: a
				} = e;
				200 === a && this.updateStoreWithUiRoot(r, t, n)
			}))
		};
		loadComponent = async (e, t, n) => Ca(n).then((() => {
			const n = this.createC11nEnv({
				meta: e,
				isRoot: !0
			});
			sp() || aI({}), Ta.publish(H.PUB_SUB_EVENTS.EVENT_RENDER_APP, {
				props: n,
				domContainerID: t
			})
		}));
		setStaticServerUrl = (e, t, n) => {
			oe.initServer(e, t, n)
		};
		loadView = async (e, t, n = []) => {
			I();
			const r = Pf(e),
				a = _p.getIn(r, W.VIEWS),
				s = _p.getIn(r, W.NAVIGATIONS),
				o = _p.getIn(r, W.COMPONENTS) || [];
			o.push(...n);
			const i = _p.getIn(r, W.STATIC_SERVER_URL),
				c = _p.getIn(r, W.APPLICATION_DATA);
			a && Lu(a), s && ju(s), (e => {
				e && (hh = e.pyLabel)
			})(c), i && oe.initServer(i), await Ca(o, i).then((() => this.renderApp(r, t)))
		};
		initAppShell = (e, t, n) => {
			Nh(e), ba.buildActionTargetMap(t), I(n)
		};
		initRoutingTable = (e, t) => {
			Nh(e, !0), I(t)
		};
		setAppAlias = e => {
			oe.setAppAlias(e)
		};
		getHomeRestApi = e => {
			const {
				restApi: t
			} = Ih("home", {
				portalName: e
			});
			return A() + t
		};
		getViewRestApi = (e, t) => {
			const {
				restApi: n
			} = ((e, t) => {
				let n = {
					restApi: ""
				};
				try {
					if (Th() && !t) {
						const t = Q(),
							r = te.processUrl(t, !0),
							a = te._getMatchedRouteInRoutingTable(r) || "",
							s = te.getRoutingInfo(),
							o = te.processUrl(t, !1).split("/"),
							i = o[o.length - 1];
						let {
							caseID: c
						} = s.routes[a].payload;
						c = c.replace("{workID}", i), n = te.getRestEndPoint("loadView", {
							caseID: c,
							viewID: e
						}) || {}
					} else n = te.getRestEndPoint("showView", {
						page: e,
						pageClass: t
					}) || {}
				} catch (e) {}
				return n
			})(e, t);
			return A() + n
		};
		loadRootComponent = async (e, t, n = [], r, a, s) => {
			const {
				config: {
					name: o
				} = {}
			} = t;
			sp() || aI({}), s && (lo(`${W.APP.ROOT}/${o}`), co().deleteContainerItem(`${W.APP.ROOT}/${o}`)), co().getContainerItems()?.length > 1 && !o?.startsWith("hybrid_") && "authoring-preview" !== o && Ep(), op(Np({
				data: {},
				context: W.APP.ROOT
			}));
			const i = this.createC11nEnv({
					meta: t,
					options: {
						context: W.APP.ROOT,
						pageReference: "",
						target: `${W.APP.ROOT}/${o}`
					}
				}),
				c = i.getPConnect(),
				d = c.getContextName(),
				l = c.getContainerName(),
				u = c.getContainerManager();
			Ms(`${d}/${l}`) || "noPortal" === t.config?.renderingMode || u.initializeContainers({
				type: "single"
			});
			const p = ["RootContainer", "Region", "ModalViewContainer", "PreviewViewContainer", "reference", ...n];
			return Ca(p).then((() => {
				Ta.publish(H.PUB_SUB_EVENTS.EVENT_RENDER_APP, {
					props: i,
					domContainerID: e,
					componentName: "RootContainer",
					portalTarget: r,
					styleSheetTarget: a
				})
			}))
		};
		loadViewByName = (e, t, n, r) => {
			let a = this.getViewRestApi(e, n);
			a === A() && (a = this.getHomeRestApi(t)), this.fetchEndPointResource(a, r)
		};
		loadPortalView = (e, t) => {
			const n = this.getHomeRestApi(e);
			this.fetchEndPointResource(n, t, !0)
		};
		configureForBrowserBookmark = e => {
			vh(e)
		};
		checkIfSemanticURL = () => Th();
		onPCoreReady = e => {
			Ta.subscribe(H.PUB_SUB_EVENTS.EVENT_RENDER_APP, e, "renderAppCallback")
		};
		setFieldsDefaultConfigs = e => {
			wr.updateFieldDefaults(e)
		};
		setGoogleMapsAPIKey = e => {
			S(e)
		};
		setFetchDefaultHeaders = e => {
			_l(e)
		};
		setFetchAuthInfo = e => {
			Sl(e)
		};
		getCaseApi = () => ru;
		getMashupApi = () => BI;
		enableAppRouting = e => {
			fh(e)
		};
		initStore = () => aI({});
		getBootstrapConfig = async (e, t) => {
			const n = `${t.token_type} ${t.access_token}`;
			return fetch(`${e}/api/application/v2/data_views/D_pxBootstrapConfig`, {
				method: "GET",
				headers: new Headers({
					Authorization: n
				})
			}).then((e => e.json()))
		};
		initCoreContainers = (e = {}) => {
			const {
				containerType: t = "single"
			} = e, n = yu({
				meta: {
					type: "RootContainer",
					config: {
						renderingMode: "noPortal"
					},
					children: [{
						type: "ViewContainer",
						config: {
							routingInfo: "@ROUTING_INFO",
							name: "primary"
						}
					}]
				},
				options: {
					context: "root",
					pageReference: "",
					target: "root"
				}
			});
			return n.getPConnect().getContainerManager().initializeContainers({
				type: t,
				name: "primary",
				context: "app"
			}), {
				props: {
					getPConnect: n.getPConnect
				}
			}
		}
	};
	class a_ {
		constructor() {
			a_.behaviorOverrides = {}
		}
		static behaviorOverrides = {};
		getPCoreVersion = () => "24.1.2";
		onPCoreReady = e => r_.onPCoreReady(e);
		getComponentsRegistry = () => r_.getComponentsRegistry();
		checkIfSemanticURL = () => r_.checkIfSemanticURL();
		isValidSemanticURL = () => (() => {
			if (Th()) {
				const e = te.processUrl(Q(), !0);
				return !!te._getMatchedRouteInRoutingTable(e)
			}
			return !1
		})();
		getRoutingUtils = () => VI;
		getViewResources = () => p;
		configureForBrowserBookmark = e => r_.configureForBrowserBookmark(e);
		getStore = () => sp();
		resetStore = () => Ep();
		getMessageManager = () => ar;
		getCoexistenceManager = () => iI;
		getStoreValue = (e, t, n) => lp(e, t, n);
		getContainerUtils = () => o;
		getAnnotationUtils = () => ra;
		getFieldUtils = () => Vn;
		getFieldDefaultUtils = () => wr;
		getAssetLoader = () => oe;
		getAttachmentUtils = () => Cu;
		getViewRuleApi = () => uI;
		getFeedUtils = () => AI;
		getTagUtils = () => _I;
		getStakeholderUtils = () => CI;
		getUserApi = () => yI;
		getCaseFollowerApi = () => hI;
		getCaseUtils = () => Ql;
		getStateUtils = () => ou;
		getRelatedCasesApi = () => gI;
		getPersonalizationUtils = MI;
		getDataApi = () => py;
		getDataApiUtils = () => Gg;
		getAnalyticsUtils = () => kI;
		getLocaleUtils = () => de;
		registerLocaleManager = e => {
			const t = this.getLocaleUtils();
			Object.keys(e).forEach((n => {
				t[n] = e[n]
			}))
		};
		setBehaviorOverrides = e => {
			a_.behaviorOverrides = e
		};
		setBehaviorOverride = (e, t) => {
			a_.behaviorOverrides[e] = t
		};
		getBehaviorOverrides = () => a_.behaviorOverrides;
		getBehaviorOverride = e => a_.behaviorOverrides[e];
		getAsynchronousUtils = () => YI;
		createPConnect = e => yu(e);
		getPubSubUtils = () => Ta;
		registerComponentCreator = e => {
			mu(e)
		};
		getConstants = () => Object.freeze(H);
		getEvents = () => HI;
		getRestClient = () => u;
		getMashupApi = () => BI;
		getEnvironmentInfo = () => ae;
		getRuntimeParamsAPI = () => $I;
		getSemanticUrlUtils = () => WI;
		getRemoteCaseUtils = () => q;
		getNavigationUtils = () => sI;
		registerModule = (e, t) => GI.registerModule(e, t, this);
		getErrorHandler = () => qI;
		getFormUtils = () => Ur;
		getMessagingServiceManager = () => Xg;
		getMetadataUtils = () => c;
		getDataPageUtils = () => Qg;
		getDataTypeUtils = () => Rl;
		getCascadeManager = () => tp;
		isDeepEqual = (e, t) => g()(e, t);
		getAuthUtils = () => zI;
		getDebugger = () => re;
		getDeferLoadManager = () => Zu;
		getExpressionEngine = () => a;
		getActionsSequencer = () => Zl;
		getRefreshManager = () => oa;
		getInitialiser = () => lI;
		getBootstrapUtils = () => r_;
		getContextTreeManager = () => Wn
	}
	const s_ = new a_;
	n.g.PCore = s_;
	const o_ = s_
})();
var a = r.Z;
export {
	a as
	default
}; //# sourceMappingURL=constellation-core.ca97ba62.js.map