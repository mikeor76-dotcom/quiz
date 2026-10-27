# Attachment Style Quiz

A 12-question self-reflection quiz exploring adult attachment patterns (secure, anxious, avoidant, fearful-avoidant), inspired by *Polysecure* by Jessica Fern.

Single HTML file — no build step.

## Saving results

When `SHEET_URL` in `index.html` is set, each completed quiz is sent to a Google Sheet: timestamp, approximate location (city/region/country, looked up from the visitor's IP via ipapi.co), overall result, per-style scores, and all 12 answers. Takers are told this on the intro screen.

The receiving script is in `apps-script/Code.gs`.

**Disclaimer:** This is an educational tool, not a clinical diagnosis.
