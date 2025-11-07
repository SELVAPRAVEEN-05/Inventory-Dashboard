# Frontend — Inventory Dashboard

This folder (`frontend-web`) contains the React frontend for the Inventory Dashboard project. This README documents the frontend stack, development and build scripts, environment variables, deployment notes, and common troubleshooting steps.

## Quick facts

- Framework: React (v19)
- Bundler / dev server: Vite (v7)
- UI & styling: Tailwind CSS (v4) + PostCSS + Autoprefixer
- State / data fetching: @tanstack/react-query (React Query v5)
- HTTP client: axios
- Icons: lucide-react
- Notifications: react-hot-toast
- Linting: ESLint
- Type hints: TypeScript typings via `@types/*` packages (project is JS, types are included for editor support)

Files of interest
- `package.json` — scripts & dependencies
- `vite.config.js` — Vite configuration
- `postcss.config.js` — PostCSS plugins (Tailwind adapter + autoprefixer)
- `tailwind.config.js` — Tailwind configuration
- `src/` — application source code (components, pages, layouts, assets)
- `.env` — local Vite environment variables (not committed to remote secrets)

## Local development

Prerequisites
- Node.js (16+ recommended, use your project's Node version manager if needed)
- npm (or yarn/pnpm if you prefer; package.json uses npm scripts)

Install dependencies:

```powershell
cd "frontend-web"
npm install
```

Start development server:

```powershell
npm run dev
```

Vite will start a fast dev server and show the local URL. Open that URL in your browser. The dev server supports HMR.

Note on environment variables
- Vite exposes env variables via `import.meta.env`. Only variables prefixed with `VITE_` are exposed to client code.
- This project uses `VITE_API_BASE_URL` to configure the backend API base URL. Put it into `frontend-web/.env` (root of the frontend folder) like:

```text
VITE_API_BASE_URL=https://sample-task-management.vercel.app/api
```

- Use `import.meta.env.VITE_API_BASE_URL` in code. Example (already used in `src/pages/ProductsPage.jsx`):

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://sample-task-management.vercel.app/api';
```

- Important: changes to `.env` require restarting the dev server to take effect.

## Build & preview

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

The production build outputs to the `dist/` directory by default (Vite default).

## Linting

Run ESLint:

```powershell
npm run lint
```

ESLint configuration lives in `eslint.config.js`.

## Styling details (Tailwind & PostCSS)

- Tailwind CSS is configured in `tailwind.config.js`.
- PostCSS plugins are configured in `postcss.config.js`. Recent Tailwind/PostCSS versions moved the PostCSS adapter into a separate package; this project uses `@tailwindcss/postcss` as the PostCSS plugin adapter.

If you hit an error like:

```
[vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

Then ensure you have `@tailwindcss/postcss` installed and `postcss.config.js` uses `@tailwindcss/postcss` (this repository already includes that update).

## Code organization

- `src/components/` — shared UI components and enhanced variants
- `src/layouts/` — application-level layout components (`Header`, `Sidebar`)
- `src/pages/` — page components (example: `ProductsPage.jsx`)
- `src/assets/` — static assets

The project uses React Query to fetch and cache data. `axios` is used as the HTTP client with the base URL taken from `import.meta.env.VITE_API_BASE_URL`.

## Deployment notes

- Vercel is a recommended host for Vite apps — Vercel auto-detects Vite projects and runs `npm run build`.
- If deploying to Vercel, add the environment variable `VITE_API_BASE_URL` in the Vercel project settings (so the build has the correct backend URL), and confirm the build command is `npm run build`.

## Troubleshooting

- Dev server won't pick up `.env` changes: restart the dev server.
- PostCSS / Tailwind plugin error: ensure `@tailwindcss/postcss` is installed and `postcss.config.js` uses it. Run `npm install --save-dev @tailwindcss/postcss` if missing.
- Missing icons or components: verify `lucide-react` and other packages are installed and check for case-sensitive import paths on non-Windows systems.

## Helpful commands summary

```powershell
cd "frontend-web"
npm install          # install deps
npm run dev          # start dev server (hot reload)
npm run build        # create production build (dist/)
npm run preview      # preview production build locally
npm run lint         # run ESLint
```

## Contributing

1. Create a branch from `dev` for your work.
2. Run the app locally and test your changes.
3. Keep changes focused and open a PR against `dev`.

If you want, I can also generate a `CONTRIBUTING.md` with a checklist and branch naming rules.

## License

See repository root for license information.

---

If you want this README to include additional details (for example, exact snippets showing how `axios` is configured, more troubleshooting logs, or CI/CD steps for Vercel/GitHub Actions), tell me what to add and I will update the file.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
