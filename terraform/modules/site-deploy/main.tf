resource "cloudflare_pages_project" "site" {
  account_id        = var.cf_account_id
  name              = var.project_name
  production_branch = "main"
}
