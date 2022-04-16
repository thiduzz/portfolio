terraform {
  required_version = "1.1.5"
  backend "s3" {
    bucket     = "projects-terraform-state"
    key        = "terraform/portfolio.tfstate"
    region     = "eu-central-1"
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.0.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}