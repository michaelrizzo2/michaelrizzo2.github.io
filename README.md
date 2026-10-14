# Michael Rizzo engineering portfolio

GitHub Pages portfolio with four interactive case studies. Repair intake includes actual recorded TypeSafe judgments, a measured synthetic evaluation and an optional bounded live backend. Listing costs are fictional and transparent. Jobs and historical ETH data are sourced snapshots; those two experiences use explicit rules rather than AI inference.

Run `python3 -m http.server 8020 --bind 127.0.0.1`, then open localhost:8020. Run `node --test --test-isolation=none demo-engine.test.cjs evidence.test.cjs` (8 tests). Shared Python/browser evidence outputs were checked across 45 input combinations. Source project links and scopes are visible on the page.

Live backend hosting is enabled through Tailscale Funnel on port 10000. Both public relay addresses pass certificate hostname/chain validation and TLS1.3; public-relay inference and approval checks pass. A phone screenshot confirms the health response and browser padlock. The desktop Edge profile still reports a client-side address block, and the phone’s VPN status means this screenshot alone does not establish a non-tailnet route. Saved model results remain functional without the backend. Keep API keys server-side and never publish local runtime SQLite state.

Backups live separately under the owner’s portfolio-backups directory. This repository contains public source/evidence only. No measured customer impact or production-ready claim is made.
