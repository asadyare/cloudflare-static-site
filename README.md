# Frontend Portfolio

[![CI Security](https://github.com/asadyare/portfolio-ci-cd-security/actions/workflows/ci-security.yml/badge.svg)](https://github.com/asadyare/portfolio-ci-cd-security/actions/workflows/ci-security.yml)

[![Daily Security](https://github.com/asadyare/portfolio-daily-security/actions/workflows/security-alerting-and-reporting.yml/badge.svg)](https://github.com/asadyare/portfolio-daily-security/actions/workflows/security-alerting-and-reporting.yml)

[![Runtime Security Falco](https://img.shields.io/badge/Runtime%20Security-Falco%20Enabled-brightgreen)](https://falco.org/)

## Summary

### Overview

This repository hosts the Cloudflare Pages frontend portfolio application. The repository focuses on application code and deployment. Shared security logic lives in separate repositories to keep this repository minimal and clear.

## Dependency security (npm audit)

CI runs **`npm audit`** via the shared security workflow. If it fails on critical/high findings, run **`npm audit fix`** locally, verify **`npm run build`**, and commit the updated **`package-lock.json`**.

**Remediation log:** [docs/npm-audit-remediation.md](docs/npm-audit-remediation.md) (protobufjs / Grafana Faro transitive chain, resolved with `npm audit fix`).

## Tech Stack

Aligned with **`BlueprintSkillsSection`** (home “Core Technologies”) and tools across linked repos (portfolio CI, banking, healthcare):

- **CI/CD:** GitHub Actions (reusable workflows, cron), OIDC to AWS where configured  
- **App:** Node.js, React, Vite, TypeScript (banking), Tailwind; Express + workspaces (healthcare demo)  
- **Edge / DNS:** Cloudflare Pages, Wrangler, Pages Functions; Terraform (Cloudflare provider)  
- **Cloud / IaC:** AWS (S3/CloudFront/WAF; EKS/VPC/KMS/ECR patterns in Healthcare_Apps), Terraform, Checkov / Trivy IaC  
- **Containers & K8s:** Docker, GHCR/ECR; Kubernetes (Ingress, NetworkPolicy, Falco, Grafana/Prometheus patterns)  
- **DevSecOps:** Gitleaks, TruffleHog, Semgrep, npm audit, Trivy, ZAP, CodeQL, Dependency Review, Dependabot, SBOM (CycloneDX)  
- **Design evidence:** STRIDE threat models, markdown case studies, Husky + secret hooks (banking)  

### Project case studies (by domain)

- **`/projects`** — hub: pick a vertical (portfolio, bank, healthcare, …).
- **`/projects/portfolio-projects`** — case studies for this portfolio’s repos (CI/CD, frontend, K8s, etc.).
- **`/projects/bank-app-projects`** — **secure-banking-app** (AWS deploy + in-repo threat model / case study docs). **`/projects/healthcare-app-projects`** — **healthcare-apps** (`Healthcare_Apps`: EKS/Terraform, hardened CI/CD, threat model + case study).
- **`/projects/:categoryId/:slug`** — full case study (e.g. `/projects/portfolio-projects/portfolio-ci-cd-security`). Data in **`src/data/caseStudies.js`** (`category` + `slug`); categories in **`projectCategories`**.
- Old one-segment URLs like **`/projects/portfolio-ci-cd-security`** redirect to the new path.

`public/_redirects` ensures Cloudflare Pages serves `index.html` for client-side routes.

## Repository Scope

This repository contains only frontend source code and deployment workflows.

All reusable security workflows run from connected repositories and are consumed through workflow calls:

1. [CI CD and security pipelines](https://github.com/asadyare/portfolio-ci-cd-security)
2. [Threat modeling and risk analysis](https://github.com/asadyare/portfolio-threat-model)
3. [Kubernetes Deployment and security](https://github.com/asadyare/portfolio-k8s-security)
4. [Daily security automation](https://github.com/asadyare/portfolio-daily-security)

### Central Portfolio Reference

Primary portfolio index and documentation
[Central repository](https://github.com/asadyare/devsecops-portfolio-asad)

## Cloudflare Pages Setup

Before CI can deploy to Cloudflare Pages, do the following **once**:

### 1. Create a Cloudflare Pages project

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages**.
2. Choose **Connect to Git**.
3. Connect GitHub and select the **portfolio-frontend** repository.
4. Create the project with build settings:
   - **Framework preset:** None (or Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Name the project **portfolio-frontend** (or note the name for step 3).

### 2. Get Cloudflare credentials

- **Account ID:** In the dashboard, open any page; the URL is `https://dash.cloudflare.com/<ACCOUNT_ID>/...`. Use that `<ACCOUNT_ID>`.
- **API token:** Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → use the “Edit Cloudflare Workers” template (or custom token with **Account** → **Cloudflare Pages** → **Edit**). Copy the token.

### 3. Add GitHub Actions secrets

In the **portfolio-frontend** repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

| Secret name | Value |
|-------------|--------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | *(optional)* Only if the Pages project name is **not** `portfolio-frontend` |

After saving, the next push to `main` (or the next run of the frontend CI workflow) will deploy to Cloudflare Pages.

### Deploy from your machine (without Git push)

1. Build and deploy in one step from the `portfolio-frontend` folder:

   ```bash
   npm run deploy
   ```

2. Set your Cloudflare credentials first (required for Wrangler):

   - **PowerShell:**  
     `$env:CLOUDFLARE_ACCOUNT_ID="your-account-id"`  
     `$env:CLOUDFLARE_API_TOKEN="your-api-token"`
   - **Bash:**  
     `export CLOUDFLARE_ACCOUNT_ID=your-account-id`  
     `export CLOUDFLARE_API_TOKEN=your-api-token`

   Use the same Account ID and API token as in “Get Cloudflare credentials” above.  
   If your Pages project name is not `portfolio-frontend`, run:

   ```bash
   npx wrangler pages deploy dist --project-name=YOUR_PROJECT_NAME
   ```

   instead of `npm run deploy`.

### `/metrics` on production (Cloudflare Pages Functions)

The site serves **`GET /metrics`** (Prometheus text) via a **Pages Function** at [`functions/metrics.js`](functions/metrics.js). It runs on Cloudflare’s edge—**not** the same as nginx metrics from the Kubernetes container. Counters increment when `/metrics` is scraped (e.g. from the Monitoring section or `/dashboard`).

**Requirements:**

- Deploy with **Wrangler from the repository root** so `./functions` is bundled with `./dist` (CI uses `npx wrangler pages deploy dist`, not an upload of `dist` alone).
- If you use **Connect to Git** in the Cloudflare dashboard, keep `functions/` at the repo root; Pages picks it up automatically with the normal build.

After deploy, open `https://asads-portfolio.uk/metrics` (or your custom domain). The `#monitoring` section only scrolls to the UI; the browser still requests **`/metrics`** on the same host.

## Architecture diagram

[![Frontend Architecture](diagrams/architecture.png)](diagrams/architecture.png)  

### Pull Request Flow

On every pull request, GitHub Actions triggers shared security workflows from the connected repositories.

Checks include:

- Secret scanning  
- Static analysis  
- Dependency auditing  
- Docker build  
- Container image scanning  

When all checks pass, Cloudflare Pages creates a preview deployment. GitHub posts the preview URL as a pull request comment.

### Main Branch Flow

On every push to the main branch, the same shared security workflows run again.

When checks pass, the site builds and deploys to Cloudflare Pages production.

## Contact

You can contact me via [walasaqo@gmail.com](mailto:walasaqo@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/asad-hassan-20b540313/).

## License

This portfolio is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
