export const week9 = `
# Week 9: Complete Enterprise DevSecOps Pipeline

## Overview
This week we put everything together into a massive, production-grade enterprise pipeline. We will also touch upon continuous monitoring and runtime security.

### Goals
- Assemble the ultimate CI/CD pipeline combining Weeks 1-8.
- Implement Runtime Security (Falco).
- Document compliance tracing.

### Deliverables
- A complete, documented \`.gitlab-ci.yml\` architecture.
- Falco running in Kubernetes detecting anomalous behavior.

---

## Day 1: Assembling the Ultimate Pipeline (Part 1)

### Objective
Stitch together the build and test stages.

### Hands-on (4 hours)
**Lab: The Build Stages**
Create a master repository. The pipeline must execute in this order:
1. **Pre-requisite**: Commit pushed.
2. **Stage: Lint**: Gitleaks (Secrets), Checkov (IaC), Prettier/Black (Code formatting).
3. **Stage: SAST**: Semgrep, Bandit.
4. **Stage: SCA**: Syft (Generate SBOM), Grype (Scan SBOM), Trivy (License).
5. **Stage: Build**: Build Docker image using multi-stage Alpine.

---

## Day 2: Assembling the Ultimate Pipeline (Part 2)

### Objective
Stitch together deployment and dynamic testing.

### Hands-on (4 hours)
**Lab: Deploy and DAST**
Continuing the pipeline:
6. **Stage: Sign**: Cosign signs the Docker image and SBOM.
7. **Stage: Deploy-Staging**: Push image to Harbor, deploy to K8s staging namespace.
8. **Stage: DAST**: ZAP Baseline scan against staging.
9. **Stage: Reporting**: Upload ALL reports (SAST, SCA, DAST, IaC) to DefectDojo via Re-import API.
10. **Stage: Gate**: Query DefectDojo API; fail pipeline if Criticals > 0.
11. **Stage: Deploy-Prod**: (Manual trigger) Deploy to Prod namespace. Kyverno verifies signature.

---

## Day 3: Runtime Security (Falco)

### Objective
Detect attacks that bypass the pipeline (Zero-days).

### Theory (20 min)
- eBPF and syscall monitoring.
- Falco architecture.

### Hands-on (3 hours)
**Lab: Falco in K8s**
1. Install Falco in your cluster via Helm.
2. Deploy a vulnerable pod (e.g., Nginx).
3. \`kubectl exec -it <pod> -- /bin/bash\`.
4. Run \`cat /etc/shadow\` or \`apt-get install nmap\`.
5. Check Falco logs (\`kubectl logs -l app=falco\`). Observe the security alerts for "Terminal shell in container" and "Read sensitive file".

---

## Day 4: Compliance Mapping

### Objective
Prove to auditors that the pipeline meets standards.

### Theory (20 min)
- SOC2, ISO27001, PCI-DSS.
- Traceability matrix.

### Hands-on (2 hours)
**Lab: Documentation**
Create a markdown table mapping pipeline jobs to compliance requirements.
Example:
- SOC2 CC7.1 -> Gitleaks & IAM restrictions.
- PCI-DSS Req 6.6 -> OWASP ZAP DAST scan.
- US EO 14028 -> Syft SBOM Generation & Cosign.

---

## Day 5: Mini-Project

### Disaster Recovery & Pipeline Breakage
1. Intentionally break 3 things in your pipeline (e.g., revoke the Cosign key, change the DefectDojo API token, inject a critical CVE into the base image).
2. Document the exact error messages that occur.
3. Write a runbook/SOP on how a DevSecOps engineer should troubleshoot and resolve these specific failures in a production environment.
`;
