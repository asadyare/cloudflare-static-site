locals {
  r2_bucket_name = "${var.bucket_name}-${var.environment}"
  env_subdomain  = var.environment == "prod" ? "@" : "${var.environment}"
  purge_extensions = ["html", "htm"]
}

resource "cloudflare_r2_bucket" "site" {
account_id = var.cf_account_id
name = local.r2_bucket_name
}

resource "cloudflare_r2_bucket_object" "site_files" {
  for_each = fileset(var.local_path, "**/*")

  bucket       = cloudflare_r2_bucket.site.id
  key          = each.value
  source       = "${var.local_path}/${each.value}"
  content_type = lookup(var.mime_types, split(".", each.value)[-1], "application/octet-stream")

  metadata = {
    "Cache-Control" = "max-age=3600"
  }
}

resource "cloudflare_zone" "dns" {
account = var.cf_account_id
name = var.domain_name
}


resource "cloudflare_dns_record" "env" {
zone_id = cloudflare_zone.dns.id
name = local.env_subdomain
type = "CNAME"
content = var.domain_name
ttl = 1
proxied = true
}

resource "cloudflare_zone_dnssec" "dnssec" {
  zone_id = cloudflare_zone.dns.id
}

locals {
  purge_urls = [
    for file in fileset(var.local_path, "**/*") :
    "https://${local.env_subdomain}.${var.domain_name}/${file}"
    if contains(local.purge_extensions, split(".", file)[-1])
  ]
}



