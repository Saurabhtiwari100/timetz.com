import { describe, expect, it } from 'vitest';
import {
  BUG_REPORT_EMAIL,
  CONTACT_EMAIL,
  buildContactEmailBody,
  buildContactMailto,
  getContactRecipient,
} from '../contactMail';

describe('contact mail helpers', () => {
  it('routes bug reports to the bug inbox', () => {
    expect(getContactRecipient('bug')).toBe(BUG_REPORT_EMAIL);
    expect(getContactRecipient('feedback')).toBe(CONTACT_EMAIL);
  });

  it('builds an encoded mailto draft', () => {
    const href = buildContactMailto({
      name: 'Saurabh',
      email: 'saurabh@example.com',
      type: 'bug',
      message: 'The send button did not open email.',
    });

    expect(href.startsWith(`mailto:${BUG_REPORT_EMAIL}?`)).toBe(true);
    expect(decodeURIComponent(href)).toContain('[timetz] Bug report: Saurabh');
    expect(decodeURIComponent(href)).toContain('Email: saurabh@example.com');
  });

  it('keeps copied fallback text readable', () => {
    expect(buildContactEmailBody({
      name: 'Saurabh',
      email: 'saurabh@example.com',
      type: 'feedback',
      message: 'Nice converter.',
    })).toBe([
      'Name: Saurabh',
      'Email: saurabh@example.com',
      'Type: General feedback',
      '',
      'Nice converter.',
    ].join('\n'));
  });
});
