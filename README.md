# DevSecOps Portfolio Summary

## Tech Stack

- Node.js 20 + npm  
- Docker containers (multi-stage, non-root)  
- Terraform for infrastructure as code  
- GitHub Actions for CI CD  
- Cloudflare for DNS and edge security  

## CI CD Security Workflows

### Pull Request Workflow

- Gitleaks for secrets scanning  
- Semgrep for static code analysis  
- npm audit for dependency vulnerabilities  
- Docker build & Trivy image scan  

### Main Branch Workflow

- Re-run all PR security checks  
- Terraform fmt & validate  
- Checkov + Custom Policies (HTTPS, TLS)  
- Terraform apply only if all security checks pass  

### Weekly Scheduled Security Scan

- Continuous scanning of code, dependencies, containers, and Terraform policies  
- Detects newly discovered vulnerabilities  

## Evidence & Badges

![PR Security](https://github.com/OWNER/REPO/actions/workflows/pr-security.yml/badge.svg)  
![Main Deploy](https://github.com/OWNER/REPO/actions/workflows/main-deploy.yml/badge.svg)  
![Weekly Scan](https://github.com/OWNER/REPO/actions/workflows/weekly-security.yml/badge.svg)  

## Architecture Overview

```mermaid
flowchart TD
    A[Developer Workstation] -->|Push / PR| B[GitHub Repository (Source Code)]
    
    B --> C[GitHub Actions CI CD]

    subgraph PR_Workflow["PR Security Workflow"]
        C --> D1[Gitleaks (Secrets)]
        C --> D2[Semgrep (Code)]
        C --> D3[npm audit (Dependencies)]
        C --> D4[Docker Build & Trivy Scan]
    end

    subgraph Main_Workflow["Main Branch Workflow"]
        C --> M1[Re-run all PR security checks]
        C --> M2[Terraform fmt & validate]
        C --> M3[Checkov + Custom Policies]
        C --> M4[Terraform apply (if all pass)]
    end

    M4 --> E[Cloudflare DNS & Edge (HTTPS/TLS Only)]
    E --> F[Node Application in Docker]

    %% Trust Boundaries
    classDef tb fill:#fef3c7,stroke:#f59e0b,stroke-width:2px;
    class A,B,C,E,F tb;
```

## Incident Response Summary

- PR or main branch security failures block merges or deployments  
- Developers notified automatically, must fix issues before re-run  
- Weekly scans highlight residual risk or newly discovered vulnerabilities  
- All logs available in GitHub Actions for auditing  

## Residual Risk & Limitations

- Zero risk does not exist; remaining risk comes from zero-day vulnerabilities and third-party dependencies  
- Cloudflare outages or misconfigurations may temporarily impact availability  
- Scheduled scans reduce exposure window but cannot prevent all supply-chain attacks  
- Portfolio enforces policies in CI CD, but runtime application security (business logic vulnerabilities) remains the developer’s responsibility  
