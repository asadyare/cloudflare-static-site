# System scope

Deploy a Node application using Docker.
Infrastructure uses Terraform.
CI CD runs in GitHub Actions.
DNS and edge services run on Cloudflare.

Assets protecting
Source code.
Terraform state.
Cloudflare account access.
Application availability.
User trust in domain.

Trust boundaries
Developer laptop to GitHub.
GitHub Actions runner to Cloudflare API.
Public internet to Cloudflare edge.
Cloudflare edge to the application.

## Threats and controls

Threat 1.
 Secrets committed to git
Risk. API tokens or keys exposed publicly.
Controls.
Gitleaks runs on every pull request and main push.
GitHub secrets store Cloudflare token.
No secrets baked into Docker images.

Threat 2.
Vulnerable dependencies
Risk. Known CVEs lead to compromise.
Controls.
npm audit blocks high severity issues.
Trivy scans OS and Node packages inside the image.
PR and main pipelines both enforce checks.

Threat 3.
Insecure application code
Risk. Injection or unsafe patterns.
Controls.
Semgrep scans JavaScript on every change.
PR gate blocks risky code before merge.

Threat 4.
Insecure container image
Risk. Root user or vulnerable base image.
Controls.
Multi stage Docker build.
Non root runtime user.
Trivy image scan blocks high and critical CVEs.

Threat 5.
Misconfigured infrastructure
Risk. Weak TLS, public exposure, missing security settings.
Controls.
Terraform validate and fmt enforce correctness.
Checkov enforces security rules.
Custom Checkov policies enforce HTTPS and TLS standards.
Terraform apply blocked if policies fail.

Threat 6.
Unauthorized changes to main
Risk. Bypassing security checks.
Controls.
Branch protection requires PR approval.
Security workflows required before merge.
No direct pushes to main.

Threat 7.
Supply chain attack via CI
Risk. Malicious workflow changes.
Controls.
Minimal GitHub permissions.
Scoped Cloudflare API token.
No long lived credentials in repo.

Residual risk
Zero risk does not exist.
Remaining risk comes from zero day vulnerabilities and third party outages.
Scheduled scans reduce exposure window.
