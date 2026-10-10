---
name: woia-vendor-coordination
description: Coordinate vendor demand, qualification, traceable quotes, scoped selection and fulfillment; use for Vendor Management work without duplicating provider facts or granting contact/payment authority.
license: MIT
---

# Vendor coordination

One generic Vendor Management department root, not a vendor capability provider or master. Requires WOIA Core v0.5.7 or later. Load [accepted method and boundaries](references/vendor-coordination.md) when planning demand, vendor alternatives, quote comparison, selection, commitments or delivery/performance.

## Operating flow

1. Recover accepted need, exact scope, outcome owner, Source Authority Map and existing Core work.
2. Resolve identity and scoped qualification through shared Identity/Vendor Management providers; preferred status does not grant authority.
3. Preserve original quote Documents, versions and unknowns. Prepare comparable evidence under accepted criteria, never invented prices/weights/quote counts. Customer Service executes external requests and appointments; direct internal staff contact requires authentication and authority.
4. Prepare selection/commitment under exact current competent decision, scope and terms. Human-led negotiation stays human-led. Financial consequences route to Finance; physical acceptance to the competent outcome owner.
5. Follow fulfillment and performance with evidence, competent acceptance and residual owners. Close only fulfilled vendor contribution, never erase external commitments via Task cancellation.

Use [coordinate.mjs](scripts/coordinate.mjs) for pure preflight decisions; it executes no provider command and persists no business facts. BLOCKED retains owner/next contribution; UNKNOWN remote result requires reconciliation before retry. Core owns correlated receiver-owned work, Effects/receipts, Due Work and machine collaboration. Delivery does not imply acceptance or inherited authority.

Qualified providers own vendor facts, financial posting and external dispatch. Organization owners supply private policies and source assignments; this root coordinates their accepted contributions. Actual adapters, Source Authority Map, organization grants and runtime conformance remain qualification inputs. Report engineering gates separately from Operator E2E and Production Ready.
