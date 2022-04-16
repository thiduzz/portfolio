resource "aws_route53_record" "root" {
  name = var.main_domain
  zone_id = var.dns_zone_id
  type = "A"
  records = ["76.76.21.21"]
  ttl = 60
}

resource "aws_route53_record" "www" {
  name = "www"
  zone_id = var.dns_zone_id
  type = "CNAME"
  records = ["cname.vercel-dns.com"]
  ttl = 60
}