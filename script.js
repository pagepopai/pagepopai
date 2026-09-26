const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#inquiry-form');
const result = document.querySelector('#inquiry-result');
const draftBox = document.querySelector('#draft-text');
const copyButton = document.querySelector('#copy-draft');
const copyStatus = document.querySelector('#copy-status');
const downloadLink = document.querySelector('#download-draft');
const emailDraftLink = document.querySelector('#open-email-draft');
let draftUrl;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const storeUrl = String(data.get('store-url')).trim();
  const visitorMessage = String(data.get('visitor-message')).trim();
  const message = [
    'Hello PagePopAi,',
    '',
    'I am interested in the public storefront clarity review pilot.',
    `Storefront: ${storeUrl}`,
    visitorMessage ? `Message: ${visitorMessage}` : '',
    '',
    'This message was prepared locally and has not been sent.'
  ].join('\n');
  draftBox.value = message;
  result.hidden = false;
  copyStatus.textContent = '';
  if (draftUrl) URL.revokeObjectURL(draftUrl);
  draftUrl = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' }));
  downloadLink.href = draftUrl;
  emailDraftLink.href = 'mailto:PagePopAi@gmail.com?subject=' + encodeURIComponent('PagePopAi storefront review inquiry') + '&body=' + encodeURIComponent(message);
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draftBox.value);
    copyStatus.textContent = 'Copied. Nothing was sent.';
  } catch {
    draftBox.focus();
    draftBox.select();
    copyStatus.textContent = 'Select and copy the highlighted draft. Nothing was sent.';
  }
});
