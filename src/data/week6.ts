export const week6 = `
# Week 6: Infrastructure as Code (IaC) & Hardening

## Overview
We transition from application code to Infrastructure as Code (IaC). We will secure Terraform/Kubernetes manifests and implement automated server hardening.

### Goals
- Scan Terraform and Kubernetes YAML using Checkov/Trivy.
- Implement server hardening using Ansible.
- Verify hardening using InSpec/OpenSCAP.

### Deliverables
- IaC scanning pipeline.
- Ansible playbook for OS hardening.
- InSpec compliance report.

---

## Day 1: IaC Scanning (Checkov & Trivy)

### Objective
Detect misconfigurations in cloud infrastructure before deployment.

### Theory (15 min)
- Shift-left cloud security.
- Common IaC flaws (Public S3, open security groups, privileged pods).

### Hands-on (3 hours)
**Lab: Scanning Terraform**
1. Create a vulnerable Terraform file (e.g., an AWS S3 bucket with \`acl = "public-read"\`).
2. Run Checkov locally: \`checkov -f main.tf\`.
3. Run Trivy locally: \`trivy config main.tf\`.
4. Add Checkov to your CI pipeline. Configure it to output JUnit XML.
5. Write a custom Checkov policy in Python to enforce that all AWS resources have a \`Owner\` tag.

---

## Day 2: Infrastructure Hardening (Ansible)

### Objective
Automate the secure configuration of operating systems.

### Theory (15 min)
- CIS Benchmarks (Center for Internet Security).
- Configuration Management vs Immutable Infrastructure.
- Principle of Least Privilege.

### Hands-on (3 hours)
**Lab: Hardening an Ubuntu Server**
1. Spin up an Ubuntu VM or Docker container (running systemd/ssh).
2. Create an Ansible playbook.
3. Write tasks to:
   - Disable SSH root login (\`PermitRootLogin no\`).
   - Change SSH port.
   - Install and enable UFW (firewall), allowing only SSH.
   - Disable unused filesystems (e.g., \`cramfs\`).
4. Apply the playbook: \`ansible-playbook -i inventory hardening.yml\`.

---

## Day 3: Compliance as Code (InSpec)

### Objective
Audit the infrastructure to prove it meets security standards.

### Theory (20 min)
- Chef InSpec vs OpenSCAP.
- Writing compliance rules as code (Ruby DSL).

### Hands-on (3 hours)
**Lab: Auditing with InSpec**
1. Install Chef InSpec.
2. Initialize a new profile: \`inspec init profile linux-baseline\`.
3. Write controls in \`controls/example.rb\`:
   \`\`\`ruby
   control 'ssh-1' do
     impact 1.0
     title 'SSH Root Login must be disabled'
     describe sshd_config do
       its('PermitRootLogin') { should cmp 'no' }
     end
   end
   \`\`\`
4. Run InSpec against your Ansible-hardened machine: \`inspec exec linux-baseline -t ssh://user@ip\`.
5. Verify the control passes.

---

## Day 4: OpenSCAP & STIGs

### Objective
Understand government/enterprise compliance scanning.

### Theory (15 min)
- Security Technical Implementation Guides (STIGs).
- OVAL (Open Vulnerability and Assessment Language).

### Hands-on (2 hours)
**Lab: OpenSCAP Scanning**
1. Install \`oscap\` on a Linux machine.
2. Download a SCAP datastream (e.g., for Ubuntu or CentOS).
3. Run an evaluation: \`oscap xccdf eval --profile standard --report report.html ssg-ubuntu2004-ds.xml\`.
4. Review the HTML report and identify 3 remediation steps.

---

## Day 5: Mini-Project

### The Golden Image Pipeline
Create a pipeline using Packer and Ansible:
1. Packer spins up a base Docker image or VM.
2. Packer runs your Ansible Hardening playbook as a provisioner.
3. Packer runs Chef InSpec to verify the hardening.
4. If InSpec passes, the image is saved/pushed as the new "Golden Image".
5. If InSpec fails, the build breaks.
`;
