## 2025-05-15 - Double Context XSS Bypass in Event Handlers
**Vulnerability:** Reflected XSS in `/youtube/callback` via `code` and `error` parameters.
**Learning:** Escaping HTML entities in event handler attributes (like `onclick`) is insufficient because browsers decode these entities before executing the JavaScript. An attacker can use `&#39;` to represent a single quote, which will be decoded to `'` and can break out of a JS string literal.
**Prevention:** When injecting data into a JavaScript context within an HTML attribute, first escape the data for JavaScript (e.g., using `JSON.stringify`), then escape the resulting string for HTML.
