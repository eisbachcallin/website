# /camp

The `/camp` route has two states:

- **`page.tsx`** — the live route. It's currently a **placeholder** (event over).
- **`page.event.tsx.bak`** — the **full event page** The `.bak` extension keeps it out of the build.

## Swapping back in for the next CAMP event

When the next event is planned, restore the full page:

```sh
cp src/app/camp/page.event.tsx.bak src/app/camp/page.tsx
```

Then update the event-specific details (dates, crews, etc.) as needed.

## Going back to the placeholder after an event

Save the current event page, then re-create the placeholder:

```sh
cp src/app/camp/page.tsx src/app/camp/page.event.tsx.bak
```

...and edit `page.tsx` down to the thank-you placeholder (see git history for the
last placeholder version).
