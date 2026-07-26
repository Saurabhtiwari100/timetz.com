export const CONTACT_EMAIL = 'hello@timetz.com';
export const BUG_REPORT_EMAIL = 'bugs@timetz.com';

export type ContactMessageType = 'feedback' | 'bug' | 'feature' | 'other';

export interface ContactMailPayload {
  name: string;
  email: string;
  type: ContactMessageType;
  message: string;
}

const TYPE_LABELS: Record<ContactMessageType, string> = {
  feedback: 'General feedback',
  bug: 'Bug report',
  feature: 'Feature request',
  other: 'Other',
};

export function getContactTypeLabel(type: ContactMessageType): string {
  return TYPE_LABELS[type] ?? TYPE_LABELS.feedback;
}

export function getContactRecipient(type: ContactMessageType): string {
  return type === 'bug' ? BUG_REPORT_EMAIL : CONTACT_EMAIL;
}

export function buildContactEmailBody(payload: ContactMailPayload): string {
  return [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Type: ${getContactTypeLabel(payload.type)}`,
    '',
    payload.message.trim(),
  ].join('\n');
}

export function buildContactMailto(payload: ContactMailPayload): string {
  const recipient = getContactRecipient(payload.type);
  const subject = `[timetz] ${getContactTypeLabel(payload.type)}: ${payload.name.trim()}`;
  const body = buildContactEmailBody(payload);

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
