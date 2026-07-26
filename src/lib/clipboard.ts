export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that expose Clipboard API but reject the call.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  const legacyCopy = (document as unknown as Record<string, unknown>)['execCommand'];
  const copied = typeof legacyCopy === 'function'
    ? legacyCopy.call(document, 'copy') === true
    : false;
  textarea.remove();

  if (!copied) {
    throw new Error('Clipboard copy failed');
  }
}
