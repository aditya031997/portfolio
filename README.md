# Aditya Singh — Portfolio

Next.js 16 + TypeScript, statically exported (`out/`) and deployed to Netlify (or nginx via the Dockerfile).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes static site to out/
```

## Editing content

All copy lives in `src/content/` — no component changes needed:

- `profile.ts` — headline, intro, contact links, skills (set `github` to show your GitHub)
- `experience.ts` — jobs
- `projects.ts` — case studies. Add screenshots under `public/projects/<slug>/` and list them in `screenshots`; add a Loom/YouTube embed URL as `videoUrl`.

## Contact form

Optional. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (Netlify → Site settings → Environment variables). Without it the form is hidden and only the email/LinkedIn links show.
