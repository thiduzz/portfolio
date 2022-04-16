PROFILE = portfolio

init:
	aws-vault exec $(PROFILE) -- terraform init

apply:
	aws-vault exec $(PROFILE) -- terraform apply

refresh:
	aws-vault exec $(PROFILE) -- terraform refresh

plan:
	aws-vault exec $(PROFILE) -- terraform plan

destroy:
	aws-vault exec $(PROFILE) -- terraform destroy