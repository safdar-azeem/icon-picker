import { defineComponent as he, ref as k, shallowRef as Ce, onMounted as je, watch as ge, onUnmounted as me, h as ee, nextTick as Fe, computed as O, createElementBlock as j, openBlock as F, createElementVNode as T, withModifiers as Ee, withDirectives as Oe, vModelText as Le, createVNode as L, unref as A, createCommentVNode as te, Fragment as Ae, renderList as Me, normalizeClass as Ne, toDisplayString as Re } from "vue";
const ve = /^[a-z0-9]+(-[a-z0-9]+)*$/, $ = (e, o, t, i = "") => {
  const n = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (n.length < 2 || n.length > 3)
      return null;
    i = n.shift().slice(1);
  }
  if (n.length > 3 || !n.length)
    return null;
  if (n.length > 1) {
    const l = n.pop(), a = n.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: n.length > 0 ? n[0] : i,
      prefix: a,
      name: l
    };
    return o && !V(c) ? null : c;
  }
  const s = n[0], r = s.split("-");
  if (r.length > 1) {
    const l = {
      provider: i,
      prefix: r.shift(),
      name: r.join("-")
    };
    return o && !V(l) ? null : l;
  }
  if (t && i === "") {
    const l = {
      provider: i,
      prefix: "",
      name: s
    };
    return o && !V(l, t) ? null : l;
  }
  return null;
}, V = (e, o) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((o && e.prefix === "" || e.prefix) && e.name) : !1, ye = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Q = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), q = Object.freeze({
  ...ye,
  ...Q
}), G = Object.freeze({
  ...q,
  body: "",
  hidden: !1
});
function De(e, o) {
  const t = {};
  !e.hFlip != !o.hFlip && (t.hFlip = !0), !e.vFlip != !o.vFlip && (t.vFlip = !0);
  const i = ((e.rotate || 0) + (o.rotate || 0)) % 4;
  return i && (t.rotate = i), t;
}
function ne(e, o) {
  const t = De(e, o);
  for (const i in G)
    i in Q ? i in e && !(i in t) && (t[i] = Q[i]) : i in o ? t[i] = o[i] : i in e && (t[i] = e[i]);
  return t;
}
function Ve(e, o) {
  const t = e.icons, i = e.aliases || /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  function s(r) {
    if (t[r])
      return n[r] = [];
    if (!(r in n)) {
      n[r] = null;
      const l = i[r] && i[r].parent, a = l && s(l);
      a && (n[r] = [l].concat(a));
    }
    return n[r];
  }
  return Object.keys(t).concat(Object.keys(i)).forEach(s), n;
}
function ze(e, o, t) {
  const i = e.icons, n = e.aliases || /* @__PURE__ */ Object.create(null);
  let s = {};
  function r(l) {
    s = ne(
      i[l] || n[l],
      s
    );
  }
  return r(o), t.forEach(r), ne(e, s);
}
function be(e, o) {
  const t = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return t;
  e.not_found instanceof Array && e.not_found.forEach((n) => {
    o(n, null), t.push(n);
  });
  const i = Ve(e);
  for (const n in i) {
    const s = i[n];
    s && (o(n, ze(e, n, s)), t.push(n));
  }
  return t;
}
const Ue = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ye
};
function H(e, o) {
  for (const t in o)
    if (t in e && typeof e[t] != typeof o[t])
      return !1;
  return !0;
}
function xe(e) {
  if (typeof e != "object" || e === null)
    return null;
  const o = e;
  if (typeof o.prefix != "string" || !e.icons || typeof e.icons != "object" || !H(e, Ue))
    return null;
  const t = o.icons;
  for (const n in t) {
    const s = t[n];
    if (
      // Name cannot be empty
      !n || // Must have body
      typeof s.body != "string" || // Check other props
      !H(
        s,
        G
      )
    )
      return null;
  }
  const i = o.aliases || /* @__PURE__ */ Object.create(null);
  for (const n in i) {
    const s = i[n], r = s.parent;
    if (
      // Name cannot be empty
      !n || // Parent must be set and point to existing icon
      typeof r != "string" || !t[r] && !i[r] || // Check other props
      !H(
        s,
        G
      )
    )
      return null;
  }
  return o;
}
const oe = /* @__PURE__ */ Object.create(null);
function Qe(e, o) {
  return {
    provider: e,
    prefix: o,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function E(e, o) {
  const t = oe[e] || (oe[e] = /* @__PURE__ */ Object.create(null));
  return t[o] || (t[o] = Qe(e, o));
}
function Ie(e, o) {
  return xe(o) ? be(o, (t, i) => {
    i ? e.icons[t] = i : e.missing.add(t);
  }) : [];
}
function $e(e, o, t) {
  try {
    if (typeof t.body == "string")
      return e.icons[o] = { ...t }, !0;
  } catch {
  }
  return !1;
}
let D = !1;
function we(e) {
  return typeof e == "boolean" && (D = e), D;
}
function qe(e) {
  const o = typeof e == "string" ? $(e, !0, D) : e;
  if (o) {
    const t = E(o.provider, o.prefix), i = o.name;
    return t.icons[i] || (t.missing.has(i) ? null : void 0);
  }
}
function He(e, o) {
  const t = $(e, !0, D);
  if (!t)
    return !1;
  const i = E(t.provider, t.prefix);
  return o ? $e(i, t.name, o) : (i.missing.add(t.name), !0);
}
function Be(e, o) {
  if (typeof e != "object")
    return !1;
  if (typeof o != "string" && (o = e.provider || ""), D && !o && !e.prefix) {
    let n = !1;
    return xe(e) && (e.prefix = "", be(e, (s, r) => {
      He(s, r) && (n = !0);
    })), n;
  }
  const t = e.prefix;
  if (!V({
    prefix: t,
    name: "a"
  }))
    return !1;
  const i = E(o, t);
  return !!Ie(i, e);
}
const ke = Object.freeze({
  width: null,
  height: null
}), _e = Object.freeze({
  // Dimensions
  ...ke,
  // Transformations
  ...Q
}), Ge = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ke = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ie(e, o, t) {
  if (o === 1)
    return e;
  if (t = t || 100, typeof e == "number")
    return Math.ceil(e * o * t) / t;
  if (typeof e != "string")
    return e;
  const i = e.split(Ge);
  if (i === null || !i.length)
    return e;
  const n = [];
  let s = i.shift(), r = Ke.test(s);
  for (; ; ) {
    if (r) {
      const l = parseFloat(s);
      isNaN(l) ? n.push(s) : n.push(Math.ceil(l * o * t) / t);
    } else
      n.push(s);
    if (s = i.shift(), s === void 0)
      return n.join("");
    r = !r;
  }
}
function We(e, o = "defs") {
  let t = "";
  const i = e.indexOf("<" + o);
  for (; i >= 0; ) {
    const n = e.indexOf(">", i), s = e.indexOf("</" + o);
    if (n === -1 || s === -1)
      break;
    const r = e.indexOf(">", s);
    if (r === -1)
      break;
    t += e.slice(n + 1, s).trim(), e = e.slice(0, i).trim() + e.slice(r + 1);
  }
  return {
    defs: t,
    content: e
  };
}
function Je(e, o) {
  return e ? "<defs>" + e + "</defs>" + o : o;
}
function Xe(e, o, t) {
  const i = We(e);
  return Je(i.defs, o + i.content + t);
}
const Ye = (e) => e === "unset" || e === "undefined" || e === "none";
function Ze(e, o) {
  const t = {
    ...q,
    ...e
  }, i = {
    ..._e,
    ...o
  }, n = {
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
  let s = t.body;
  [t, i].forEach((m) => {
    const d = [], P = m.hFlip, _ = m.vFlip;
    let I = m.rotate;
    P ? _ ? I += 2 : (d.push(
      "translate(" + (n.width + n.left).toString() + " " + (0 - n.top).toString() + ")"
    ), d.push("scale(-1 1)"), n.top = n.left = 0) : _ && (d.push(
      "translate(" + (0 - n.left).toString() + " " + (n.height + n.top).toString() + ")"
    ), d.push("scale(1 -1)"), n.top = n.left = 0);
    let x;
    switch (I < 0 && (I -= Math.floor(I / 4) * 4), I = I % 4, I) {
      case 1:
        x = n.height / 2 + n.top, d.unshift(
          "rotate(90 " + x.toString() + " " + x.toString() + ")"
        );
        break;
      case 2:
        d.unshift(
          "rotate(180 " + (n.width / 2 + n.left).toString() + " " + (n.height / 2 + n.top).toString() + ")"
        );
        break;
      case 3:
        x = n.width / 2 + n.left, d.unshift(
          "rotate(-90 " + x.toString() + " " + x.toString() + ")"
        );
        break;
    }
    I % 2 === 1 && (n.left !== n.top && (x = n.left, n.left = n.top, n.top = x), n.width !== n.height && (x = n.width, n.width = n.height, n.height = x)), d.length && (s = Xe(
      s,
      '<g transform="' + d.join(" ") + '">',
      "</g>"
    ));
  });
  const r = i.width, l = i.height, a = n.width, c = n.height;
  let u, f;
  r === null ? (f = l === null ? "1em" : l === "auto" ? c : l, u = ie(f, a / c)) : (u = r === "auto" ? a : r, f = l === null ? ie(u, c / a) : l === "auto" ? c : l);
  const h = {}, g = (m, d) => {
    Ye(d) || (h[m] = d.toString());
  };
  g("width", u), g("height", f);
  const y = [n.left, n.top, a, c];
  return h.viewBox = y.join(" "), {
    attributes: h,
    viewBox: y,
    body: s
  };
}
const et = /\sid="(\S+)"/g, tt = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let nt = 0;
function ot(e, o = tt) {
  const t = [];
  let i;
  for (; i = et.exec(e); )
    t.push(i[1]);
  if (!t.length)
    return e;
  const n = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return t.forEach((s) => {
    const r = typeof o == "function" ? o(s) : o + (nt++).toString(), l = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + l + ')([")]|\\.[a-z])', "g"),
      "$1" + r + n + "$3"
    );
  }), e = e.replace(new RegExp(n, "g"), ""), e;
}
const K = /* @__PURE__ */ Object.create(null);
function it(e, o) {
  K[e] = o;
}
function W(e) {
  return K[e] || K[""];
}
function X(e) {
  let o;
  if (typeof e.resources == "string")
    o = [e.resources];
  else if (o = e.resources, !(o instanceof Array) || !o.length)
    return null;
  return {
    // API hosts
    resources: o,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const Y = /* @__PURE__ */ Object.create(null), M = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], z = [];
for (; M.length > 0; )
  M.length === 1 || Math.random() > 0.5 ? z.push(M.shift()) : z.push(M.pop());
Y[""] = X({
  resources: ["https://api.iconify.design"].concat(z)
});
function st(e, o) {
  const t = X(o);
  return t === null ? !1 : (Y[e] = t, !0);
}
function Z(e) {
  return Y[e];
}
const rt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let se = rt();
function ct(e, o) {
  const t = Z(e);
  if (!t)
    return 0;
  let i;
  if (!t.maxURL)
    i = 0;
  else {
    let n = 0;
    t.resources.forEach((r) => {
      n = Math.max(n, r.length);
    });
    const s = o + ".json?icons=";
    i = t.maxURL - n - t.path.length - s.length;
  }
  return i;
}
function lt(e) {
  return e === 404;
}
const at = (e, o, t) => {
  const i = [], n = ct(e, o), s = "icons";
  let r = {
    type: s,
    provider: e,
    prefix: o,
    icons: []
  }, l = 0;
  return t.forEach((a, c) => {
    l += a.length + 1, l >= n && c > 0 && (i.push(r), r = {
      type: s,
      provider: e,
      prefix: o,
      icons: []
    }, l = a.length), r.icons.push(a);
  }), i.push(r), i;
};
function ut(e) {
  if (typeof e == "string") {
    const o = Z(e);
    if (o)
      return o.path;
  }
  return "/";
}
const ft = (e, o, t) => {
  if (!se) {
    t("abort", 424);
    return;
  }
  let i = ut(o.provider);
  switch (o.type) {
    case "icons": {
      const s = o.prefix, l = o.icons.join(","), a = new URLSearchParams({
        icons: l
      });
      i += s + ".json?" + a.toString();
      break;
    }
    case "custom": {
      const s = o.uri;
      i += s.slice(0, 1) === "/" ? s.slice(1) : s;
      break;
    }
    default:
      t("abort", 400);
      return;
  }
  let n = 503;
  se(e + i).then((s) => {
    const r = s.status;
    if (r !== 200) {
      setTimeout(() => {
        t(lt(r) ? "abort" : "next", r);
      });
      return;
    }
    return n = 501, s.json();
  }).then((s) => {
    if (typeof s != "object" || s === null) {
      setTimeout(() => {
        s === 404 ? t("abort", s) : t("next", n);
      });
      return;
    }
    setTimeout(() => {
      t("success", s);
    });
  }).catch(() => {
    t("next", n);
  });
}, dt = {
  prepare: at,
  send: ft
};
function pt(e) {
  const o = {
    loaded: [],
    missing: [],
    pending: []
  }, t = /* @__PURE__ */ Object.create(null);
  e.sort((n, s) => n.provider !== s.provider ? n.provider.localeCompare(s.provider) : n.prefix !== s.prefix ? n.prefix.localeCompare(s.prefix) : n.name.localeCompare(s.name));
  let i = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((n) => {
    if (i.name === n.name && i.prefix === n.prefix && i.provider === n.provider)
      return;
    i = n;
    const s = n.provider, r = n.prefix, l = n.name, a = t[s] || (t[s] = /* @__PURE__ */ Object.create(null)), c = a[r] || (a[r] = E(s, r));
    let u;
    l in c.icons ? u = o.loaded : r === "" || c.missing.has(l) ? u = o.missing : u = o.pending;
    const f = {
      provider: s,
      prefix: r,
      name: l
    };
    u.push(f);
  }), o;
}
function Se(e, o) {
  e.forEach((t) => {
    const i = t.loaderCallbacks;
    i && (t.loaderCallbacks = i.filter((n) => n.id !== o));
  });
}
function ht(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const o = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!o.length)
      return;
    let t = !1;
    const i = e.provider, n = e.prefix;
    o.forEach((s) => {
      const r = s.icons, l = r.pending.length;
      r.pending = r.pending.filter((a) => {
        if (a.prefix !== n)
          return !0;
        const c = a.name;
        if (e.icons[c])
          r.loaded.push({
            provider: i,
            prefix: n,
            name: c
          });
        else if (e.missing.has(c))
          r.missing.push({
            provider: i,
            prefix: n,
            name: c
          });
        else
          return t = !0, !0;
        return !1;
      }), r.pending.length !== l && (t || Se([e], s.id), s.callback(
        r.loaded.slice(0),
        r.missing.slice(0),
        r.pending.slice(0),
        s.abort
      ));
    });
  }));
}
let gt = 0;
function mt(e, o, t) {
  const i = gt++, n = Se.bind(null, t, i);
  if (!o.pending.length)
    return n;
  const s = {
    id: i,
    icons: o,
    callback: e,
    abort: n
  };
  return t.forEach((r) => {
    (r.loaderCallbacks || (r.loaderCallbacks = [])).push(s);
  }), n;
}
function vt(e, o = !0, t = !1) {
  const i = [];
  return e.forEach((n) => {
    const s = typeof n == "string" ? $(n, o, t) : n;
    s && i.push(s);
  }), i;
}
var yt = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function bt(e, o, t, i) {
  const n = e.resources.length, s = e.random ? Math.floor(Math.random() * n) : e.index;
  let r;
  if (e.random) {
    let p = e.resources.slice(0);
    for (r = []; p.length > 1; ) {
      const v = Math.floor(Math.random() * p.length);
      r.push(p[v]), p = p.slice(0, v).concat(p.slice(v + 1));
    }
    r = r.concat(p);
  } else
    r = e.resources.slice(s).concat(e.resources.slice(0, s));
  const l = Date.now();
  let a = "pending", c = 0, u, f = null, h = [], g = [];
  typeof i == "function" && g.push(i);
  function y() {
    f && (clearTimeout(f), f = null);
  }
  function m() {
    a === "pending" && (a = "aborted"), y(), h.forEach((p) => {
      p.status === "pending" && (p.status = "aborted");
    }), h = [];
  }
  function d(p, v) {
    v && (g = []), typeof p == "function" && g.push(p);
  }
  function P() {
    return {
      startTime: l,
      payload: o,
      status: a,
      queriesSent: c,
      queriesPending: h.length,
      subscribe: d,
      abort: m
    };
  }
  function _() {
    a = "failed", g.forEach((p) => {
      p(void 0, u);
    });
  }
  function I() {
    h.forEach((p) => {
      p.status === "pending" && (p.status = "aborted");
    }), h = [];
  }
  function x(p, v, b) {
    const S = v !== "success";
    switch (h = h.filter((w) => w !== p), a) {
      case "pending":
        break;
      case "failed":
        if (S || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (v === "abort") {
      u = b, _();
      return;
    }
    if (S) {
      u = b, h.length || (r.length ? C() : _());
      return;
    }
    if (y(), I(), !e.random) {
      const w = e.resources.indexOf(p.resource);
      w !== -1 && w !== e.index && (e.index = w);
    }
    a = "completed", g.forEach((w) => {
      w(b);
    });
  }
  function C() {
    if (a !== "pending")
      return;
    y();
    const p = r.shift();
    if (p === void 0) {
      if (h.length) {
        f = setTimeout(() => {
          y(), a === "pending" && (I(), _());
        }, e.timeout);
        return;
      }
      _();
      return;
    }
    const v = {
      status: "pending",
      resource: p,
      callback: (b, S) => {
        x(v, b, S);
      }
    };
    h.push(v), c++, f = setTimeout(C, e.rotate), t(p, o, v.callback);
  }
  return setTimeout(C), P;
}
function Pe(e) {
  const o = {
    ...yt,
    ...e
  };
  let t = [];
  function i() {
    t = t.filter((l) => l().status === "pending");
  }
  function n(l, a, c) {
    const u = bt(
      o,
      l,
      a,
      (f, h) => {
        i(), c && c(f, h);
      }
    );
    return t.push(u), u;
  }
  function s(l) {
    return t.find((a) => l(a)) || null;
  }
  return {
    query: n,
    find: s,
    setIndex: (l) => {
      o.index = l;
    },
    getIndex: () => o.index,
    cleanup: i
  };
}
function re() {
}
const B = /* @__PURE__ */ Object.create(null);
function xt(e) {
  if (!B[e]) {
    const o = Z(e);
    if (!o)
      return;
    const t = Pe(o), i = {
      config: o,
      redundancy: t
    };
    B[e] = i;
  }
  return B[e];
}
function It(e, o, t) {
  let i, n;
  if (typeof e == "string") {
    const s = W(e);
    if (!s)
      return t(void 0, 424), re;
    n = s.send;
    const r = xt(e);
    r && (i = r.redundancy);
  } else {
    const s = X(e);
    if (s) {
      i = Pe(s);
      const r = e.resources ? e.resources[0] : "", l = W(r);
      l && (n = l.send);
    }
  }
  return !i || !n ? (t(void 0, 424), re) : i.query(o, n, t)().abort;
}
function ce() {
}
function wt(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ht(e);
  }));
}
function kt(e) {
  const o = [], t = [];
  return e.forEach((i) => {
    (i.match(ve) ? o : t).push(i);
  }), {
    valid: o,
    invalid: t
  };
}
function N(e, o, t) {
  function i() {
    const n = e.pendingIcons;
    o.forEach((s) => {
      n && n.delete(s), e.icons[s] || e.missing.add(s);
    });
  }
  if (t && typeof t == "object")
    try {
      if (!Ie(e, t).length) {
        i();
        return;
      }
    } catch (n) {
      console.error(n);
    }
  i(), wt(e);
}
function le(e, o) {
  e instanceof Promise ? e.then((t) => {
    o(t);
  }).catch(() => {
    o(null);
  }) : o(e);
}
function _t(e, o) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(o).sort() : e.iconsToLoad = o, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: t, prefix: i } = e, n = e.iconsToLoad;
    if (delete e.iconsToLoad, !n || !n.length)
      return;
    const s = e.loadIcon;
    if (e.loadIcons && (n.length > 1 || !s)) {
      le(
        e.loadIcons(n, i, t),
        (u) => {
          N(e, n, u);
        }
      );
      return;
    }
    if (s) {
      n.forEach((u) => {
        const f = s(u, i, t);
        le(f, (h) => {
          const g = h ? {
            prefix: i,
            icons: {
              [u]: h
            }
          } : null;
          N(e, [u], g);
        });
      });
      return;
    }
    const { valid: r, invalid: l } = kt(n);
    if (l.length && N(e, l, null), !r.length)
      return;
    const a = i.match(ve) ? W(t) : null;
    if (!a) {
      N(e, r, null);
      return;
    }
    a.prepare(t, i, r).forEach((u) => {
      It(t, u, (f) => {
        N(e, u.icons, f);
      });
    });
  }));
}
const St = (e, o) => {
  const t = vt(e, !0, we()), i = pt(t);
  if (!i.pending.length) {
    let a = !0;
    return o && setTimeout(() => {
      a && o(
        i.loaded,
        i.missing,
        i.pending,
        ce
      );
    }), () => {
      a = !1;
    };
  }
  const n = /* @__PURE__ */ Object.create(null), s = [];
  let r, l;
  return i.pending.forEach((a) => {
    const { provider: c, prefix: u } = a;
    if (u === l && c === r)
      return;
    r = c, l = u, s.push(E(c, u));
    const f = n[c] || (n[c] = /* @__PURE__ */ Object.create(null));
    f[u] || (f[u] = []);
  }), i.pending.forEach((a) => {
    const { provider: c, prefix: u, name: f } = a, h = E(c, u), g = h.pendingIcons || (h.pendingIcons = /* @__PURE__ */ new Set());
    g.has(f) || (g.add(f), n[c][u].push(f));
  }), s.forEach((a) => {
    const c = n[a.provider][a.prefix];
    c.length && _t(a, c);
  }), o ? mt(o, i, s) : ce;
};
function Pt(e, o) {
  const t = {
    ...e
  };
  for (const i in o) {
    const n = o[i], s = typeof n;
    i in ke ? (n === null || n && (s === "string" || s === "number")) && (t[i] = n) : s === typeof t[i] && (t[i] = i === "rotate" ? n % 4 : n);
  }
  return t;
}
const Tt = /[\s,]+/;
function Ct(e, o) {
  o.split(Tt).forEach((t) => {
    switch (t.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function jt(e, o = 0) {
  const t = e.replace(/^-?[0-9.]*/, "");
  function i(n) {
    for (; n < 0; )
      n += 4;
    return n % 4;
  }
  if (t === "") {
    const n = parseInt(e);
    return isNaN(n) ? 0 : i(n);
  } else if (t !== e) {
    let n = 0;
    switch (t) {
      case "%":
        n = 25;
        break;
      case "deg":
        n = 90;
    }
    if (n) {
      let s = parseFloat(e.slice(0, e.length - t.length));
      return isNaN(s) ? 0 : (s = s / n, s % 1 === 0 ? i(s) : 0);
    }
  }
  return o;
}
function Ft(e, o) {
  let t = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const i in o)
    t += " " + i + '="' + o[i] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + t + ">" + e + "</svg>";
}
function Et(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ot(e) {
  return "data:image/svg+xml," + Et(e);
}
function Lt(e) {
  return 'url("' + Ot(e) + '")';
}
const ae = {
  ..._e,
  inline: !1
}, At = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Mt = {
  display: "inline-block"
}, J = {
  backgroundColor: "currentColor"
}, Te = {
  backgroundColor: "transparent"
}, ue = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, fe = {
  webkitMask: J,
  mask: J,
  background: Te
};
for (const e in fe) {
  const o = fe[e];
  for (const t in ue)
    o[e + t] = ue[t];
}
const U = {};
["horizontal", "vertical"].forEach((e) => {
  const o = e.slice(0, 1) + "Flip";
  U[e + "-flip"] = o, U[e.slice(0, 1) + "-flip"] = o, U[e + "Flip"] = o;
});
function de(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const pe = (e, o) => {
  const t = Pt(ae, o), i = { ...At }, n = o.mode || "svg", s = {}, r = o.style, l = typeof r == "object" && !(r instanceof Array) ? r : {};
  for (let m in o) {
    const d = o[m];
    if (d !== void 0)
      switch (m) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          t[m] = d === !0 || d === "true" || d === 1;
          break;
        case "flip":
          typeof d == "string" && Ct(t, d);
          break;
        case "color":
          s.color = d;
          break;
        case "rotate":
          typeof d == "string" ? t[m] = jt(d) : typeof d == "number" && (t[m] = d);
          break;
        case "ariaHidden":
        case "aria-hidden":
          d !== !0 && d !== "true" && delete i["aria-hidden"];
          break;
        default: {
          const P = U[m];
          P ? (d === !0 || d === "true" || d === 1) && (t[P] = !0) : ae[m] === void 0 && (i[m] = d);
        }
      }
  }
  const a = Ze(e, t), c = a.attributes;
  if (t.inline && (s.verticalAlign = "-0.125em"), n === "svg") {
    i.style = {
      ...s,
      ...l
    }, Object.assign(i, c);
    let m = 0, d = o.id;
    return typeof d == "string" && (d = d.replace(/-/g, "_")), i.innerHTML = ot(a.body, d ? () => d + "ID" + m++ : "iconifyVue"), ee("svg", i);
  }
  const { body: u, width: f, height: h } = e, g = n === "mask" || (n === "bg" ? !1 : u.indexOf("currentColor") !== -1), y = Ft(u, {
    ...c,
    width: f + "",
    height: h + ""
  });
  return i.style = {
    ...s,
    "--svg": Lt(y),
    width: de(c.width),
    height: de(c.height),
    ...Mt,
    ...g ? J : Te,
    ...l
  }, ee("span", i);
};
we(!0);
it("", dt);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const o = e.IconifyPreload, t = "Invalid IconifyPreload syntax.";
    typeof o == "object" && o !== null && (o instanceof Array ? o : [o]).forEach((i) => {
      try {
        // Check if item is an object and not null/array
        (typeof i != "object" || i === null || i instanceof Array || // Check for 'icons' and 'prefix'
        typeof i.icons != "object" || typeof i.prefix != "string" || // Add icon set
        !Be(i)) && console.error(t);
      } catch {
        console.error(t);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const o = e.IconifyProviders;
    if (typeof o == "object" && o !== null)
      for (let t in o) {
        const i = "IconifyProviders[" + t + "] is invalid.";
        try {
          const n = o[t];
          if (typeof n != "object" || !n || n.resources === void 0)
            continue;
          st(t, n) || console.error(i);
        } catch {
          console.error(i);
        }
      }
  }
}
const Nt = {
  ...q,
  body: ""
}, R = he((e, { emit: o }) => {
  const t = k(null);
  function i() {
    var c, u;
    t.value && ((u = (c = t.value).abort) == null || u.call(c), t.value = null);
  }
  const n = k(!!e.ssr), s = k(""), r = Ce(null);
  function l() {
    const c = e.icon;
    if (typeof c == "object" && c !== null && typeof c.body == "string")
      return s.value = "", {
        data: c
      };
    let u;
    if (typeof c != "string" || (u = $(c, !1, !0)) === null)
      return null;
    let f = qe(u);
    if (!f) {
      const y = t.value;
      return (!y || y.name !== c) && (f === null ? t.value = {
        name: c
      } : t.value = {
        name: c,
        abort: St([u], a)
      }), null;
    }
    i(), s.value !== c && (s.value = c, Fe(() => {
      o("load", c);
    }));
    const h = e.customise;
    if (h) {
      f = Object.assign({}, f);
      const y = h(f.body, u.name, u.prefix, u.provider);
      typeof y == "string" && (f.body = y);
    }
    const g = ["iconify"];
    return u.prefix !== "" && g.push("iconify--" + u.prefix), u.provider !== "" && g.push("iconify--" + u.provider), { data: f, classes: g };
  }
  function a() {
    var u;
    const c = l();
    c ? c.data !== ((u = r.value) == null ? void 0 : u.data) && (r.value = c) : r.value = null;
  }
  return n.value ? a() : je(() => {
    n.value = !0, a();
  }), ge(() => e.icon, a), me(i), () => {
    const c = r.value;
    if (!c)
      return pe(Nt, e);
    let u = e;
    return c.classes && (u = {
      ...e,
      class: c.classes.join(" ")
    }), pe({
      ...q,
      ...c.data
    }, u);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
}), Rt = { class: "icon-picker" }, Dt = { class: "icon-picker__input-wrapper" }, Vt = ["placeholder"], zt = ["disabled"], Ut = { class: "icon-picker__content" }, Qt = {
  key: 0,
  class: "icon-picker__loading"
}, $t = {
  key: 1,
  class: "icon-picker__grid"
}, qt = ["title", "onClick"], Ht = {
  key: 2,
  class: "icon-picker__pagination"
}, Bt = ["disabled"], Gt = { class: "icon-picker__pagination-info" }, Kt = ["disabled"], Wt = /* @__PURE__ */ he({
  __name: "IconPicker",
  props: {
    modelValue: {},
    value: {},
    placeholder: { default: "Search icons..." },
    debounce: { default: 300 },
    itemsPerPage: { default: 20 },
    paginationText: { default: "Page {0} of {1}" }
  },
  emits: ["update:modelValue", "onSelect"],
  setup(e, { emit: o }) {
    const t = e, i = o, n = k(""), s = k([]), r = k(!1), l = k([]), a = k((t == null ? void 0 : t.value) || t.modelValue), c = k({});
    let u;
    const f = k(1), h = O(() => s.value.length), g = O(
      () => Math.ceil(h.value / t.itemsPerPage)
    ), y = O(() => {
      const p = (f.value - 1) * t.itemsPerPage, v = p + t.itemsPerPage;
      return s.value.slice(p, v);
    }), m = O(() => s.value.length > 0), d = O(() => t.paginationText.replace("{0}", String(f.value)).replace("{1}", String(g.value))), P = (p, v) => {
      var S, w;
      a.value = p;
      const b = (w = (S = l == null ? void 0 : l.value) == null ? void 0 : S[v]) == null ? void 0 : w.innerHTML;
      i("update:modelValue", p), i("onSelect", p, b);
    }, _ = async () => {
      if (!n.value.trim()) {
        s.value = [];
        return;
      }
      if (c.value[n.value]) {
        s.value = c.value[n.value], f.value = 1;
        return;
      }
      r.value = !0;
      const v = await (await fetch(
        `https://api.iconify.design/search?query=${encodeURIComponent(
          n.value
        )}&limit=200`
      )).json();
      s.value = v.icons || [], c.value[n.value] = s.value, r.value = !1, f.value = 1;
    }, I = () => {
      f.value > 1 && f.value--;
    }, x = () => {
      f.value < g.value && f.value++;
    }, C = () => {
      clearTimeout(u), u = setTimeout(() => {
        _();
      }, t.debounce);
    };
    return ge(
      () => t.modelValue,
      (p) => {
        p !== a.value && (a.value = p);
      }
    ), me(() => {
      clearTimeout(u);
    }), (p, v) => (F(), j("div", Rt, [
      T("form", {
        class: "icon-picker__form",
        onSubmit: Ee(C, ["prevent"]),
        role: "search"
      }, [
        T("div", Dt, [
          Oe(T("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (b) => n.value = b),
            type: "text",
            placeholder: p.placeholder,
            class: "icon-picker__input",
            "aria-label": "Search icons",
            onInput: C
          }, null, 40, Vt), [
            [Le, n.value]
          ]),
          T("button", {
            type: "submit",
            class: "icon-picker__search-btn",
            "aria-label": "Search",
            disabled: r.value
          }, [
            L(A(R), {
              icon: "fluent:search-20-filled",
              class: "icon-picker__search-icon"
            })
          ], 8, zt)
        ])
      ], 32),
      T("div", Ut, [
        r.value ? (F(), j("div", Qt, [
          L(A(R), { icon: "svg-spinners:270-ring" })
        ])) : m.value ? (F(), j("div", $t, [
          (F(!0), j(Ae, null, Me(y.value, (b, S) => (F(), j("button", {
            key: b,
            ref_for: !0,
            ref_key: "iconRef",
            ref: l,
            class: Ne(["icon-picker__icon-btn", {
              "icon-picker__icon-btn--selected": b === a.value
            }]),
            title: b,
            onClick: (w) => P(b, S),
            type: "button"
          }, [
            L(A(R), {
              icon: b,
              class: "icon-picker__icon"
            }, null, 8, ["icon"])
          ], 10, qt))), 128))
        ])) : te("", !0),
        m.value && g.value > 1 ? (F(), j("div", Ht, [
          T("button", {
            class: "icon-picker__pagination-btn",
            disabled: f.value === 1,
            onClick: I,
            type: "button",
            "aria-label": "Previous page"
          }, [
            L(A(R), { icon: "ep:arrow-left-bold" })
          ], 8, Bt),
          T("div", Gt, Re(d.value), 1),
          T("button", {
            class: "icon-picker__pagination-btn",
            disabled: f.value === g.value,
            onClick: x,
            type: "button",
            "aria-label": "Next page"
          }, [
            L(A(R), { icon: "ep:arrow-right-bold" })
          ], 8, Kt)
        ])) : te("", !0)
      ])
    ]));
  }
}), Jt = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [i, n] of o)
    t[i] = n;
  return t;
}, Yt = /* @__PURE__ */ Jt(Wt, [["__scopeId", "data-v-00e1cb5b"]]);
export {
  Yt as default
};
