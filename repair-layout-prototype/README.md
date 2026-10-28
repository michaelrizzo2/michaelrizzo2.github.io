# Repair site layout prototype

Local layout-only prototype for [michaelscomputerrepairservice.com](https://michaelscomputerrepairservice.com/). Copy matches the live site; structure adds integrated **Contact Us** access.

## Run

```bash
cd repair-layout-prototype
python3 -m http.server 8030 --bind 127.0.0.1
```

Open http://127.0.0.1:8030/

## Layout changes vs live site

1. **Header** — Contact Us as a filled primary nav button; Call + Message shortcuts on desktop.
2. **Hero** — “Reach Michael” lane: Text, Call, Book, **Contact Us (message form)**.
3. **After problem cards** — Dark quick-contact strip with Call, Text, Contact Us.
4. **What happens next / service area / offices** — Contact Us button alongside existing actions.
5. **Final band** — Unified Call, Text, Book, Contact form, WhatsApp + link to form in hours column.
6. **Mobile** — Fixed bottom bar: Call | Text | **Contact Us**.
7. **Contact page** — Phone, hours, and call/text/book **above** the form (two-column on desktop).

Form is not wired to Squarespace; it demonstrates layout only.
