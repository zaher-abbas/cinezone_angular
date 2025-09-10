```markdown
# 🎬 CineZone App — Angular Front‑End

CineZone is a sleek and responsive front‑end built with Angular for discovering and managing movies.
It connects to a Node.js + Express.js backend with a MySQL database.

🔗 Backend API repository:  
https://github.com/zaher-abbas/cinezone_api_express

---

## 🧭 Table of Contents

- Introduction
- Features
- Tech Stack
- Architecture
- Prerequisites
- Getting Started
- Configuration (Environment)
- Authentication & Route Protection
- Development
- API Proxy (Dev, optional)
- Testing
- Build & Deployment
- Project Structure
- Troubleshooting
- Contributing
- License

---

## 📖 Introduction

CineZone delivers a modern movie browsing experience, featuring fast client‑side routing, clean UX, and integration with a RESTful API. Use it locally during development or deploy it to any static hosting provider while pointing it at your API.

---

## ✨ Features

- 🎯 Modern Angular 20 application
- 📱 Responsive UI with Bootstrap 5
- 🔎 Movie discovery: search, filter by genre/category
- 📰 Detailed movie pages
- 🔐 User accounts:
  - 👤 Registration (sign‑up)
  - 🔑 Authentication (login/logout)
  - 🧭 Session‑aware UI (show/hide actions based on auth state)
- 🛠️ Authenticated movie management:
  - ➕ Add new movies
  - ✏️ Edit existing movies
  - 🗑️ Delete movies
  - 🔒 Protected routes backed by an Angular AuthGuard (only authenticated users can access create/edit/delete)
- 🧭 Client‑side routing (Angular Router)
- ✅ Forms with validation (Angular Forms)
- 🔔 Toast notifications (ngx‑toastr) — https://www.npmjs.com/package/ngx-toastr
- ⚡ Reactive flows (RxJS)
- 🚀 Production‑ready builds

Note: Feature availability depends on the backend endpoints you enable.
See the API repository for details.

---

## 🧰 Tech Stack

- Angular: 20.2.x
- TypeScript: 5.9.2
- RxJS: 7.8.0
- Angular packages: @angular/core, router, forms, common, animations
- Styles: Bootstrap 5.3.8 + Bootstrap Icons 1.13.1 (installed with npm, and imported in styles.css & main.ts 'for the js')
- Notifications: ngx‑toastr 19.0.0 — https://www.npmjs.com/package/ngx-toastr
- Zone.js: 0.15.0
- Tooling: @angular/cli 20.2.2, @angular/build
- Testing: Karma + Jasmine
- Package manager: npm

---

## 🏗️ Architecture

- Front‑end: Angular SPA (served at build time by any static server)
- Back‑end: Node.js + Express.js REST API
- Database: MySQL
- Communication: HTTP via REST (configure base URL in environment files)

---

## ✅ Prerequisites

- Node.js: 20.x or newer (recommended for Angular 20)
- npm: 10.x or newer (bundled with Node.js)
- Angular CLI (optional global install): 20.2.2
```

bash
npm install -g @angular/cli@20.2.2

```
---

## 🚀 Getting Started

1) Clone this front‑end repository
```

bash
git clone https://github.com/zaher-abbas/cinezone_angular.git
cd cinezone_angular

```
2) Install dependencies
```

bash
npm install

```
3) Start the backend API (local)
```

bash <br>
git clone https://github.com/zaher-abbas/cinezone_api_express.git <br>
cd cinezone_api_express <br>
npm install <br>
🚀 npm start

```
- Note the API base URL once running (e.g., http://localhost:3000).

4) Configure the front‑end API URL (see “Configuration” below)

5) Run the dev server
```

bash
npx ng serve

# or (if CLI installed globally)

ng serve

```
- App will be available at: http://localhost:4200

---

## 🛠️ Configuration (Environment)

Set your API base URL in Angular environment files:

- src/environments/environment.ts (development)
- src/environments/environment.prod.ts (production)
```

typescript
// src/environments/environment.ts
export const environment = {
production: false,
apiBaseUrl: 'http://localhost:3000/api' // Update to your local API URL
};

```

```

typescript
// src/environments/environment.prod.ts
export const environment = {
production: true,
apiBaseUrl: 'https://<YOUR_PRODUCTION_API_HOST>/api' // Update for production
};

```
Tips:
- Do not commit secrets.
- Use placeholders for any private values.

---

## 🔐 Authentication & Route Protection

CineZone supports user registration and authentication and restricts movie management features to authenticated users.

- Registration: Users can create an account (name, email, password).
- Login/Logout: Sessions are established with the API (JWT is created by the server, and stored in a HttpOnly cookie); 
- The UI updates to reflect the current user.
- Session handling: API calls can be made with credentials when needed (Setting credentials/withCredentials in Angular makes the browser include your HttpOnly JWT cookie with the request,
  and accept Set-Cookie responses), enabling the Node API to authenticate the user via that cookie)
- Protected actions and routes:
  - Add a movie (e.g., /movies/new)
  - Edit a movie (e.g., /movies/:id/edit)
  - Delete a movie
- AuthGuard:
  - An Angular route guard ensures only authenticated users can access protected routes.
  - Unauthenticated users attempting to access protected pages are redirected to the login page.

Backend note:
- If you rely on cookies for sessions, ensure the API is configured with proper CORS headers and allow‑credentials. The front‑end can send credentials where appropriate.

---

## 🧑‍💻 Development

- Start dev server with live reload:
```

bash
npx ng serve

```
- Lint (if configured):
```

bash
npx ng lint

```
- Format (if you use Prettier):
```

bash
npx prettier --write .

```
---

## 🔁 API Proxy (Dev, optional)

To avoid CORS during local development, you can use Angular’s proxy:

1) Create a proxy config file (e.g., proxy.conf.json):
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
2) Start dev server with proxy:
```

bash
npx ng serve --proxy-config proxy.conf.json

```
With this, your front‑end can call /api/... directly while Angular forwards requests to the backend. If your API uses cookies for authentication, the proxy approach helps keep calls same‑origin from the browser’s perspective.

---

## 🧪 Testing

- Run unit tests in watch mode:
```

bash
npx ng test

```
- Run unit tests once (CI):
```

bash
npx ng test --watch=false

```
Coverage (if enabled in karma.conf):
```

bash
npx ng test --code-coverage

```
---

## 📦 Build & Deployment

- Production build:
```

bash
npx ng build --configuration production

# or

npx ng build --prod

```
- Output directory:
```

plaintext
dist/<YOUR_PROJECT_NAME>/

```
You can deploy the build output to any static host:

- Static servers (Nginx/Apache)
- Cloud (Vercel, Netlify, Firebase Hosting)
- GitHub Pages (ensure SPA fallback)

SPA routing note:
- Configure a fallback to index.html for unknown routes to avoid 404s on browser refresh.

Base href:
- If deploying under a sub‑path, set the base href:
```

bash
npx ng build --prod --base-href /your-sub-path/

```
---

## 🗂️ Project Structure (typical)
```

plaintext
src/
app/
... Angular components/services/modules ...
assets/
environments/
environment.ts
environment.prod.ts
index.html
main.ts
styles.scss

```
---

## 🧩 Troubleshooting

- Port already in use (4200):
  - Change port: `npx ng serve --port 4201`

- CORS errors:
  - Use the proxy config (see above), or configure CORS on the backend.
  - If using cookies/sessions, ensure credentials and allowed origins are properly set on the API.

- API not reachable:
  - Verify apiBaseUrl in environment files.
  - Confirm the backend is running and accessible.

- 404 on page refresh:
  - Configure your hosting to redirect all routes to index.html (SPA fallback).

- Node/npm version mismatch:
  - Use Node 20+ and npm 10+, then reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

---

## 🤝 Contributing

- Fork the repo and create a feature branch: `git checkout -b feat/awesome`
- Commit with clear messages
- Open a Pull Request with a concise description and screenshots (if applicable)

---

## 📄 License

This project is licensed under the MIT License.  
Please update this section if your repository uses a different license.

---

## 🙌 Acknowledgements

- Angular Team
- ngx‑toastr — https://www.npmjs.com/package/ngx-toastr
- Bootstrap & Bootstrap Icons
- The CineZone API project maintainers

Happy hacking! 🍿
```
