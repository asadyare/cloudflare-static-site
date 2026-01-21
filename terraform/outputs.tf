output "pages_project_name" {
  value = module.site_deploy.pages_project_name
}

output "dns_record_name" {
  value = cloudflare_dns_record.pages.name
}