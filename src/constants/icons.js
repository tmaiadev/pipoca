function parse(string) {
	const domParser = new DOMParser();
	const parsedDocument = domParser.parseFromString(`<span>${string}</span>`, 'text/html');
	return parsedDocument.body.children[0];
}

/**
 * Icons found at
 * https://github.com/iconic/open-iconic
 */

export const PLAY = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
	<path d="M0 0v6l6-3-6-3z" transform="translate(1 1)" />
</svg>`);

export const PAUSE = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
  <path d="M0 0v6h2v-6h-2zm4 0v6h2v-6h-2z" transform="translate(1 1)" />
</svg>`);

export const VOLUME_HIGH = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
  <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66zm1.66 1v1c.17 0 .34.02.5.06.86.22 1.5 1 1.5 1.94s-.63 1.72-1.5 1.94c-.16.04-.33.06-.5.06v1c.25 0 .48-.04.72-.09h.03c1.3-.33 2.25-1.51 2.25-2.91 0-1.4-.95-2.58-2.25-2.91-.23-.06-.49-.09-.75-.09zm0 2v2c.09 0 .18-.01.25-.03.43-.11.75-.51.75-.97 0-.46-.31-.86-.75-.97-.08-.02-.17-.03-.25-.03z"
  />
</svg>`);

export const VOLUME_LOW = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
  <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66zm1.66 3v2c.09 0 .18-.01.25-.03.43-.11.75-.51.75-.97 0-.46-.31-.86-.75-.97-.08-.02-.17-.03-.25-.03z" transform="translate(1)" />
</svg>`);

export const VOLUME_OFF = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
  <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66z" transform="translate(2)" />
</svg>`);

export const COG = parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
  <path d="M3.5 0l-.5 1.19c-.1.03-.19.08-.28.13l-1.19-.5-.72.72.5 1.19c-.05.1-.09.18-.13.28l-1.19.5v1l1.19.5c.04.1.08.18.13.28l-.5 1.19.72.72 1.19-.5c.09.04.18.09.28.13l.5 1.19h1l.5-1.19c.09-.04.19-.08.28-.13l1.19.5.72-.72-.5-1.19c.04-.09.09-.19.13-.28l1.19-.5v-1l-1.19-.5c-.03-.09-.08-.19-.13-.28l.5-1.19-.72-.72-1.19.5c-.09-.04-.19-.09-.28-.13l-.5-1.19h-1zm.5 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"
  />
</svg>`);