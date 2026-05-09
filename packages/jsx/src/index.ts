// ─────────────────────────────────────────────────────
// @termuijs/jsx — Public API
// ─────────────────────────────────────────────────────

// ── JSX Factory ──
export { createElement, jsx, jsxs } from './createElement.js';
export { Fragment } from './vnode.js';

// ── Types ──
export type { VNode, VElement, VFragment, FC, IntrinsicProps } from './vnode.js';
export { isVElement, isVFragment, flattenChildren } from './vnode.js';

// ── Hooks ──
export {
    useState,
    useEffect,
    useInput,
    useInterval,
    useMemo,
    useRef,
    useCallback,
    useAsync,
    useKeymap,
    useMotion,
} from './hooks.js';
export type { AsyncState, KeyBinding, MotionPreferences } from './hooks.js';

// ── Error Boundary ──
export { ErrorBoundary } from './error-boundary.js';
export type { ErrorBoundaryProps } from './error-boundary.js';

// ── Context ──
export { createContext, useContext } from './context.js';
export type { Context } from './context.js';

// ── Memoization ──
export { memo } from './memo.js';

// ── Render ──
export { render, renderApp } from './render.js';
export type { RenderOptions } from './render.js';

// ── Reconciler (internal, but useful for testing) ──
export { reconcile, reRenderComponent, unmountAll } from './reconciler.js';

// ── Internal — used by @termuijs/testing ──
export { setRequestRender, collectInputHandlers } from './hooks.js';

// ── Convenience alias ──
/** h() — shorthand for createElement */
export { createElement as h } from './createElement.js';
