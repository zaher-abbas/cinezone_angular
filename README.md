```markdown
# CineZone App (Angular Front‑End)

CineZone is a modern, responsive Angular front‑end for browsing and managing movies, connecting to a Node.js + Express.js + MySQL backend API.

Backend repository:
https://github.com/zaher-abbas/cinezone_api_express

This README covers setup, configuration, development workflow, and deployment for the front‑end application.

## Contents

- Overview
- Features
- Tech Stack
- Prerequisites
- Getting Started
- Configuration (Environment)
- Development
- Build and Deployment
- Testing
- Optional: Local API proxy for dev
- Troubleshooting
- Contributing
- License

## Overview

CineZone’s front‑end provides an intuitive UI to explore movies, view details, search and filter content, and interact with the CineZone API. It is optimized for performance and a smooth UX, leveraging Angular’s latest tooling.

If you’re setting up both front‑end and back‑end locally, follow the instructions below to configure the API URL in the Angular environment files.

## Features

- Modern Angular 20 UI with responsive layout (Bootstrap 5)
- Movie discovery:
  - Browse lists (e.g., popular, top rated, etc.)
  - Search by title and filter by category/genre
  - Movie details pages
- Notifications and toasts via ngx-toastr:
  - Package: https://www.npmjs.com/package/ngx-toastr
- Client‑side routing (Angular Router)
- Form handling and validation (Angular Forms)
- Optimized change detection and RxJS data flows
- Production build optimizations

Notes:

- Exact feature availability depends on the backend endpoints you enable and configure. See the API repo for details.

## Tech Stack

- Angular: 20.2.x
- TypeScript: 5.9.x
- RxJS: 7.8.x
- Angular Router, Forms, Common, Animations
- Bootstrap: 5.3.x and Bootstrap Icons
- ngx‑toastr: 19.x (https://www.npmjs.com/package/ngx-toastr)
- Zone.js
- Build tooling via @angular/cli and @angular/build

Package manager: npm

## Prerequisites

- Node.js: 20.x (recommended by Angular 20) or newer
- npm: 10.x or newer
- Angular CLI: 20.2.2 (install globally or use npx)

Install Angular CLI globally (optional):
```

bash
npm install -g @angular/cli@20.2.2

```
## Getting Started

1) Clone this front‑end repository
```

bash
git clone <YOUR_FRONTEND_REPO_URL>
cd <YOUR_FRONTEND_REPO_FOLDER>

```
2) Install dependencies
```

bash
npm install

```
3) Set up and run the backend API

Follow the instructions in the API repository:
https://github.com/zaher-abbas/cinezone_api_express

Example (local development):
```

bash
git clone https://github.com/zaher-abbas/cinezone_api_express.git
cd cinezone_api_express
npm install
npm start

```
Make note of the API base URL once it’s running (e.g., http://localhost:3000).

4) Configure the front‑end environment to point to your API (see Configuration below).

5) Start the dev server
```

bash
npx ng serve

# or if you installed the CLI globally:

ng serve

```
By default the app is served at http://localhost:4200

## Configuration (Environment)

Set the API base URL in your Angular environment files:

- src/environments/environment.ts (development)
- src/environments/environment.prod.ts (production)

Example:
```

ts
// src/environments/environment.ts
export const environment = {
production: false,
apiBaseUrl: 'http://localhost:3000/api' // Update to your local API URL
};

```

```

ts
// src/environments/environment.prod.ts
export const environment = {
production: true,
apiBaseUrl: 'https://<YOUR_PRODUCTION_API_HOST>/api' // Update for production
};

```
Replace placeholders with your actual values. Avoid committing secrets to the repository.

## Development

Run a local development server with live reload:
```

bash
npx ng serve

```
Build and watch during development:
```

bash
npx ng build --watch

```
Generate components/services/modules with schematics:
```

bash
npx ng generate component <feature/your-component-name>
npx ng generate service <core/your-service-name>
npx ng generate module <feature/your-module-name> --route <route> --module app

```
## Build and Deployment

Create an optimized production build:
```

bash
npx ng build --configuration=production

```
The output will be generated under dist/ and can be deployed to any static host (e.g., Nginx, Apache, cloud storage with CDN).

Typical static hosting steps:
- Upload the contents of dist/<project-name>/ to your hosting provider
- Configure SPA fallback to index.html for client‑side routes

Example Nginx snippet (conceptual):
```

nginx
location / {
try_files $uri $uri/ /index.html;
}

```
Ensure environment.prod.ts points to your production API base URL before building.

## Testing

Run unit tests with Karma + Jasmine:
```

bash
npx ng test

```
Generate coverage:
```

bash
npx ng test --code-coverage

```
Coverage reports are typically emitted to coverage/.

## Optional: Local API proxy for dev

To avoid CORS and keep code using relative paths (e.g., /api), you can use Angular’s dev‑server proxy.

1) Create proxy.conf.json at the project root:
```

json
{
"/api": {
"target": "http://localhost:3000",
"secure": false,
"changeOrigin": true,
"logLevel": "info"
}
}

```
2) Update your serve command to use the proxy:
```

bash
npx ng serve --proxy-config proxy.conf.json

```
3) In your app services, call /api/... instead of an absolute URL. For production, still set environment.apiBaseUrl accordingly.

## Troubleshooting

- Dev server runs but API calls fail:
  - Verify backend is running and reachable at the configured apiBaseUrl.
  - If running locally, ensure the Node server is started with:
    ```bash
    npm start
    ```
  - Check CORS settings on the backend if calling it directly from the browser.
  - If using a proxy, confirm proxy.conf.json path and target.

- Angular CLI version mismatch:
  - Use npx ng ... to avoid global version conflicts, or install the matching CLI globally.

- 404s on page refresh in production:
  - Ensure your host rewrites unknown routes to index.html (SPA fallback).

- Styles or icons not loading:
  - Confirm Bootstrap and Bootstrap Icons are included and paths are correct.

## Contributing

- Open issues or feature requests in your repository.
- Use conventional commit messages if a standard is defined in your project.
- For larger changes, discuss via an issue before opening a PR.

## License

Add your project’s license information here (e.g., MIT). If unspecified, consider including a LICENSE file and referencing it in this section.
```
