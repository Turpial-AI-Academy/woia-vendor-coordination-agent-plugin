// Pure coordination guard: no persistence, provider command, channel dispatch or financial effect.
const stages = new Set(['scope', 'qualification', 'quotation', 'selection', 'commitment', 'fulfillment', 'performance', 'close']);
const required = ['org_id', 'purpose', 'need_id', 'scope_version', 'outcome_owner', 'correlation_id'];
const present = value => typeof value === 'string' && value.trim().length > 0;

export function coordinate(input) {
  const blocked = (reason, owner = 'Vendor Management') => ({ result: 'BLOCKED', reason, owner, external_effect: false });
  if (!input || !stages.has(input.stage)) return blocked('unsupported-stage');
  if (required.some(key => !present(input[key]))) return blocked('missing-owned-scope');
  const actor = input.actor;
  if (!actor || actor.authenticated !== true || actor.authorized !== true || !present(actor.id) || actor.org_id !== input.org_id || actor.need_id !== input.need_id || actor.scope_version !== input.scope_version || actor.purpose !== input.purpose) return blocked('actor-scope-not-authorized');
  if (input.need_accepted !== true) return blocked('need-not-accepted', input.outcome_owner);
  const source = input.source_authority;
  if (!source || source.org_id !== input.org_id || source.need_id !== input.need_id || source.scope_version !== input.scope_version || source.status !== 'ACCEPTED' || source.fresh !== true || source.conflict !== false || !present(source.version) || !present(source.source_ref)) return blocked('source-authority-unresolved', 'Data/source owner');
  if (input.remote_outcome === 'UNKNOWN') return { result: 'RECONCILE', owner: 'effect owner', correlation_id: input.correlation_id, external_effect: false };
  if (input.remote_outcome && !['NOT_ATTEMPTED', 'CONFIRMED'].includes(input.remote_outcome)) return blocked('invalid-remote-outcome');
  if (input.requested_effect === 'negotiate') return blocked('human-led-negotiation', 'competent human');
  if (input.requested_effect === 'external-contact' || input.requested_effect === 'appointment') return { result: 'HANDOFF', owner: 'Customer Service', provider: 'woia-communications', correlation_id: input.correlation_id, external_effect: false };
  if (input.requested_effect === 'payment' || input.requested_effect === 'financial-posting') return { result: 'HANDOFF', owner: 'Finance', correlation_id: input.correlation_id, external_effect: false };
  if (input.requested_effect === 'internal-contact') {
    if (input.recipient?.kind !== 'internal-staff' || input.recipient.authenticated !== true || input.recipient.authorized !== true) return blocked('internal-recipient-not-qualified', 'Customer Service');
    return { result: 'HANDOFF', owner: 'Communications/internal', correlation_id: input.correlation_id, external_effect: false };
  }
  if (input.requested_effect !== undefined && input.requested_effect !== 'coordinate') return blocked('unsupported-effect');
  if (input.stage === 'quotation' && (input.quote?.original_preserved !== true || !present(input.quote.version) || input.quote.comparable !== true || input.quote.unknowns_resolved !== true)) return blocked('quote-not-comparable', 'Vendor Management provider');
  if (['selection', 'commitment'].includes(input.stage)) {
    const decision = input.authority;
    if (!decision || decision.valid !== true || decision.competent !== true || decision.decision !== 'ACCEPTED' || !present(decision.principal) || !present(decision.decision_ref) || decision.scope_version !== input.scope_version || decision.need_id !== input.need_id || !present(input.terms_version) || decision.terms_version !== input.terms_version || input.aggregate_limit_verified !== true) return blocked('exact-authority-required', 'competent decision owner');
  }
  if (['fulfillment', 'performance', 'close'].includes(input.stage)) {
    const evidence = input.evidence;
    if (!evidence || evidence.original_preserved !== true || evidence.competent_acceptance !== true || !present(evidence.source_ref) || !present(evidence.acceptance_ref) || evidence.owner !== input.outcome_owner || evidence.org_id !== input.org_id || evidence.need_id !== input.need_id || evidence.scope_version !== input.scope_version) return blocked('competent-outcome-acceptance-required', input.outcome_owner);
  }
  if (input.stage === 'close' && input.residuals_resolved !== true) return blocked('owned-residuals-open', input.outcome_owner);
  return { result: 'COORDINATION_READY', stage: input.stage, provider: 'woia-vendor-management', need_id: input.need_id, correlation_id: input.correlation_id, external_effect: false };
}
