# Issue #29: Order same-day purchases by time, then by when they were recorded

<!-- Runner only. Copied from the real pull request or issue. Figures, times and item names from the household's real receipts are replaced by the case's synthetic receipts, so totals here match the case data, not the real delivery. -->

## Problem

A purchase recorded by hand (#12) has no time. `list_purchases` orders purchases by date, then time, then id, so:

- a hand purchase lands below a purchase with a time on the same day, even when it was recorded later;
- two hand purchases on the same day appear in an arbitrary order, because the id is random.

After saving a hand purchase, the member expects to see it at the top of the list. Its detail opens anyway, so they always see what they saved, but the list order looks wrong on days with more than one purchase.

Found while delivering #12 (PR #27). The owner chose on 2026-11-02 to merge #12 as it is and to handle the order here.

## Outcome

Within one day, purchases are listed by printed time when they have one, and by when they were recorded otherwise. The rule is the same for the app and for agents.

## Notes

- `list_purchases` paginates with a cursor based on the current order. A new order needs a cursor that stays compatible with a tab or agent from the previous deployment (ADR-0001).
- Mixing timed and untimed purchases on the same day needs a rule. Settle it while shaping.

