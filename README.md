# Frontend Portfolio

## Summary

### Overview

This repository hosts the Cloudflare Pages frontend portfolio application. The repository focuses on application code and deployment. Shared security logic lives in separate repositories to keep this repository minimal and clear.

## Tech Stack

- Node.js 20 with npm  
- React with Vite and Tailwind CSS  
- Cloudflare Pages for hosting and preview deployments  
- Docker for local builds and security scanning  
- GitHub Actions for CI and deployment  

## Repository Scope

This repository contains only frontend source code and deployment workflows.

All reusable security workflows run from connected repositories and are consumed through workflow calls:

- portfolio-ci-cd-security  
- portfolio-daily-security  
- portfolio-threat-model  
- portfolio-k8s-security  

## CI and Deployment Flow

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

### Manual Infrastructure Flow

A manual workflow supports Terraform formatting, validation, and apply. This workflow exists only for controlled infrastructure changes.

## Security Tooling Source

Security tools run from shared workflow repositories:

- Gitleaks  
- Semgrep  
- npm audit  
- Trivy  

This repository does not duplicate security logic.

## Evidence and Status

- Pull request security workflow badge reflects shared security checks  
- Production deploy badge reflects Cloudflare Pages deployment from the main branch  

## Architecture Summary

1. Developer pushes code to GitHub  
2. GitHub Actions triggers shared security workflows  
3. Successful runs deploy preview or production builds to Cloudflare Pages  
4. Cloudflare provides HTTPS, TLS enforcement, and edge delivery  

## Incident Handling

Failed security checks block preview and production deployments. Developers resolve findings before reruns. All evidence stays in GitHub Actions logs.

## Residual Risk

- Zero day vulnerabilities in third party dependencies  
- Cloudflare service disruption risk  
- Application logic flaws outside CI scope  
