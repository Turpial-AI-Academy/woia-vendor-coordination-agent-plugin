# woia-vendor-coordination

Portable Agent Plugin for Generic Vendor Management department coordination with scoped vendor qualification and commitments..

## Capability

~~~text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
~~~

The plugin adapts to the repository it operates on without requiring the consumer to adopt WOIA's authoring toolchain.

## Portable package

~~~text
plugin.json
README.md
LICENSE
skills/**
# optional source diagnostic when retained by the repository
CHECKSUMS.sha256
~~~

`CHECKSUMS.sha256` is optional source evidence, not a required portable/release artifact.

Add `mcp.json` only if the capability genuinely requires MCP.

## Consumer requirements

Document only genuine capability/runtime requirements here. Do not list maintenance Node/pnpm/Mise/Docker unless the portable capability itself truly needs them.

## Development

~~~text
mise install
mise run bootstrap
mise run doctor
mise run ci:fast
mise run ci:extended
mise run release:check
~~~

## Vendor Management methodology

Generic department root for Vendor Management. Core v0.5.7 is a hard dependency declared in dev.woia/manifest.json. See [method contract](skills/woia-vendor-coordination/references/vendor-coordination.md) and [coordination guard](skills/woia-vendor-coordination/scripts/coordinate.mjs).

Coordinates accepted need, scope-backed qualification, original quotes, exact-authority selection/commitments and attributable fulfillment/performance. Vendor Management provider retains deterministic vendor operations; Identity, Documents, Knowledge, Data, Customer Service, Finance and Operations keep their own facts and effects. Negotiation remains human-led; external dispatch and money posting require their qualified owners. Consume the owners' accepted references instead of duplicating their masters.
