export interface RelayPolicy { authorized: boolean; openRelay: boolean; spoofFrom: boolean; privacyMode: boolean; }

export function validateRelay(policy: RelayPolicy): void {
  if (policy.openRelay || policy.spoofFrom) throw new Error('Open relays and From spoofing are disabled');
  if (!policy.authorized) throw new Error('Relay authorization is required');
}
