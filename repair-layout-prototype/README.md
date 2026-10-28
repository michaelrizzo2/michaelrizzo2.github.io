# Repair site layout prototype

Local layout-only prototype for [michaelscomputerrepairservice.com](https://michaelscomputerrepairservice.com/). Copy matches the live site; structure adds integrated **Contact Us** without repeated bottom bars.

## Run

```bash
cd repair-layout-prototype
python3 -m http.server 8030 --bind 127.0.0.1
```

- **With header:** http://127.0.0.1:8030/index.html  
- **No header:** http://127.0.0.1:8030/index-no-header.html  
- **Contact pages:** `contact.html` / `contact-no-header.html`

## Contact layout (current)

1. **Hero** — One contact lane: Text, Call, Book, WhatsApp, Contact Us (Font Awesome icons).
2. **Header** (header variant) — Contact Us nav button; no duplicate Call/Message chips.
3. **Mid-page** — No extra contact strips or button rows (steps, service area are text only).
4. **Offices** — Single “Book an on-site visit” button only.
5. **Closing “Let’s talk”** — Big phone + **Call** and **Text** only (matches live site tone; no second pile of five buttons).
6. **Footer** — Copyright line only (no footer button row).
7. **No fixed bottom sticky bar.**

Contact page: clickable phone + icon links (Call, Text, WhatsApp); form beside/below.

Form is not wired to Squarespace.
