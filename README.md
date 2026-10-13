# Michael Rizzo — interactive engineering portfolio

[Public portfolio](https://michaelrizzo2.github.io/#projects) · [Interactive demos](https://michaelrizzo2.github.io/#automation)

Four public Python case studies are connected to browser demonstrations on GitHub Pages:

| Case study | Python source | Public browser demonstration |
| --- | --- | --- |
| Repair shop operations | [Repository](https://github.com/michaelrizzo2/ai-repair-shop-operations-demo) | [Repair desk](https://michaelrizzo2.github.io/#demo-repair) |
| Marketplace listing intelligence | [Repository](https://github.com/michaelrizzo2/ai-listing-scorer) | [Listings](https://michaelrizzo2.github.io/#demo-listings) |
| Job opportunity ranking | [Repository](https://github.com/michaelrizzo2/ai-job-hunt-app) | [Job fit](https://michaelrizzo2.github.io/#demo-jobs) |
| Strategy evaluation gate | [Repository](https://github.com/michaelrizzo2/eth17-trading-gate) | [Trading gate](https://michaelrizzo2.github.io/#demo-trading) |

The public demonstrations run entirely in the browser with fictional data and deterministic logic. No model is called and no real appointments, applications, customer records or orders are accessed. Python backends are runnable from their respective repositories. Browser approval illustrates the review step; the Python repair implementation owns session and proposal validation.

## Verify

Tested with Node 24.21.0:

```bash
node --test --test-isolation=none demo-engine.test.cjs
node --check script.js
```

Five tests cover repair calculations and review paths, listing cost arithmetic and ranking, job filtering and weighting, causal trading signals, fees and evidence gates. During integration, 32 scenario/parameter combinations were compared with the sibling Python implementations; the calculations, rankings and gate outcomes matched. The Python projects separately have 20 passing tests.

Desktop and 390px mobile checks cover project selection, repair clarification/approval, ranking weights, filters, trading scenarios, direct demo links and horizontal overflow.

## Preview

```bash
python3 -m http.server 8020 --bind 127.0.0.1
```

Open http://127.0.0.1:8020. GitHub Pages serves the same buildless HTML, CSS and JavaScript from the `master` branch.
