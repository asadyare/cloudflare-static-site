module "site_deploy" {
  source        = "./modules/site-deploy"
  cf_account_id = var.cf_account_id
  project_name  = var.project_name
}

resource "cloudflare_zone" "dns" {
  name = var.domain_name
  account = {
    id = var.cf_account_id
  }
}

locals {
  env_subdomain = var.environment == "prod" ? "@" : var.environment
}

resource "cloudflare_dns_record" "pages" {
  zone_id = cloudflare_zone.dns.id
  name    = local.env_subdomain
  type    = "CNAME"
  content = "${var.project_name}.pages.dev"
  ttl     = 1
  proxied = true
}

resource "cloudflare_zone_dnssec" "dnssec" {
  zone_id = cloudflare_zone.dns.id
}
