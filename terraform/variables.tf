variable "project_name" {
  type        = string
  description = "Name of the site deployment project"
}

variable "CLOUDFLARE_ACCOUNT_ID" {
  type        = string
  description = "Cloudflare Account ID"
}

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API Token with necessary permissions"
}

variable "domain_name" {
  type        = string
  description = "The domain name for the Cloudflare zone"
}

variable "environment" {
  type        = string
  description = "Deployment environment (e.g., prod, staging)"
  default     = "prod"
}