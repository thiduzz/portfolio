variable "project_id" {
  type        = string
  description = "The project Identifier"
}

variable "project_name" {
  type        = string
  description = "The project name"
}

variable "environment" {
  type        = string
  description = "Current environment"
}

variable "dns_zone_id" {
  type        = string
  description = "Pre-existing Zone ID utilized"
}

variable "main_domain" {
  type        = string
  description = "Main domain for the application"
}