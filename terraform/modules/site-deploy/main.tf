resource "cloudflare_pages_project" "site" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = var.project_name
  production_branch = "main"
}
