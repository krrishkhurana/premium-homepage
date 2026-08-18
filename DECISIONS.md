# DECISIONS.md

## 1. Why this ingestion strategy over the obvious alternative?

I chose **source-aware routing + checkpointing** over a generic “retry until it works” ingestion model.

The obvious alternative is simpler: wrap every connector in retries with exponential backoff and send everything through the same path. That works for transient network errors, but it is the wrong abstraction for sources that actively rate-limit, change behavior, or block a client. Retrying blindly can amplify the failure and makes operators wait for a run to time out.

Switchboard instead treats source behavior as a routing signal. A run can checkpoint before the failure boundary, move to an allowed mirror/fallback path, and later reconcile when the primary source recovers. The important design decision is that downstream data contracts stay stable while source-specific handling stays upstream.

The page intentionally presents this as a **product concept** rather than pretending these are production metrics.

## 2. One trade-off under the time limit

I built the experience as a static HTML/CSS/JS prototype instead of adding a real backend, authentication, or ingestion worker. That let me spend the time on the actual graded surface: hierarchy, responsive behavior, product visualization, and a small interaction that demonstrates the core idea.

With a real week, I would replace the simulated run data with a small working ingestion service, persist checkpoints, add source adapters, and test failure recovery against rate limits and mid-run source blocking.

## 3. Where did you use AI tools, and what did you personally verify or change?

I used AI assistance for ideation, copy exploration, and implementation acceleration. I personally made the product direction and reviewed the final structure, copy, interaction, responsive breakpoints, and honesty constraints.

I specifically removed any invented testimonials, customer logos, “users” numbers, or unsupported performance claims. I also kept the demo interaction local and clearly framed the product as a concept, so the page does not imply that the displayed run data is real production telemetry.
