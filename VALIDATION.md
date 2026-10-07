# Validation obligations

The scaffold supplies generic package/release validation and regression fixtures. Add domain-specific tests and regressions.

Capability regressions should prove bounded amendments of healthy authoritative artifacts, deep-path escalation, preservation of unrelated valid artifacts/evidence, targeted invalidation/revalidation, and independent gate ownership. Assert semantic obligations or observable behavior rather than rigid prose sentences unless exact wording is the contract. Adapt these cases to the capability; do not embed provider-specific policy in generic package validation.

Report reusable durable execution/observation evidence, invalidated evidence, freshly established evidence, and assumptions/inferences that are not evidence. Independently inspect reused evidence and rerun affected checks plus mandatory invariants when changes invalidate it. This refinement does not reduce the formal gates below.

Before first release:

~~~text
# after README.plugin.md -> README.md and placeholder replacement
mise install
mise run bootstrap
# optional source diagnostic; not a release gate
pnpm run checksums:generate
mise run doctor
mise run validate
mise run test
mise run ci:fast
mise run ci:extended
mise run jobs:local
# commit candidate
mise run release:check
~~~

Also run `skills-ref validate` for each skill when available.

No placeholder token or scaffold-only `README.plugin.md` may remain in the release candidate.

## Vendor methodology regression

Run `mise exec -- node --test tests/vendor-coordination.test.mjs` for deterministic negative guard cases (source/freshness/conflict, contact routing, recipient qualification, exact authority/version, unknown-effect reconciliation, quote evidence and competent outcome acceptance). Run `mise run ci:fast`, commit exact candidate, then `mise run release:check` and Ecosystem `plugin:certify-thin`.

These checks evaluate local coordination contracts; provider adapters, actual machine activation and Operator E2E are NOT_RUN. Production Ready is false.
