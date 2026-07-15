export const week1 = `
# Week 1: Secure Git Workflow & Threat Modeling

## Overview
This week focuses on establishing a secure foundation. As a senior engineer, you already know Git and CI basics. We will focus on enforcing security at the repository level, setting up the DevSecOps structural framework, and modeling threats for the applications we will build.

### Goals
- Implement pre-commit hooks and branch protections.
- Conduct a Threat Model using STRIDE and map to OWASP ASVS.
- Baseline the DevSecOps maturity using DSOMM.
- Establish the foundational GitLab Enterprise repository structure.

### Deliverables
- A hardened GitLab repository with branch protection rules.
- A documented Threat Model (JSON/YAML format) for a sample microservice.
- A DSOMM assessment baseline report.

---

## Day 1: DevSecOps Maturity & Threat Modeling

### Objective
Establish the security baseline and identify architectural risks before writing any code.

### Theory (20 min)
- **DSOMM (DevSecOps Maturity Model)**: How to assess and plan DevSecOps capabilities across dimensions (Build, Test, Deploy, Culture).
- **Threat Modeling (STRIDE)**: Moving from whiteboard to Code. Using tools like OWASP Threat Dragon or Python-based Threatspec.
- **OWASP ASVS**: Using Application Security Verification Standard as our security requirements baseline.

### Hands-on (3 hours)
**Lab 1: Baseline Assessment**
1. Review the DSOMM framework.
2. Create a markdown baseline report evaluating a hypothetical (but realistic) legacy platform.
3. Identify the target level for the end of this 10-week roadmap.

**Lab 2: Threat Modeling as Code**
1. Architecture: A simple Python Flask API interacting with a PostgreSQL database and an S3 bucket.
2. Write a threat model using YAML. Map the components, data flows, and trust boundaries.
3. Apply STRIDE to identify at least 3 critical threats (e.g., SQL Injection on the DB, Insecure Direct Object Reference on the API, Unencrypted Data at Rest in S3).
4. Map mitigations to specific OWASP ASVS v4.0 controls.

### Validation
- Ensure every identified threat has a corresponding mitigation and ASVS reference.

### Senior Engineer Tips
> "Don't treat Threat Modeling as a compliance checkbox. Store the threat model in the repository alongside the code (Threat Modeling as Code) so it evolves with pull requests."

---

## Day 2: Hardening the Git Workflow

### Objective
Enforce security at the developer endpoint and Git repository level before code even reaches CI.

### Theory (15 min)
- Cryptographic verification of commits (GPG/SSH signing).
- Pre-commit frameworks and shifting left to the developer's laptop.
- GitLab branch protection and merge request approvals.

### Hands-on (3 hours)
**Lab 1: Commit Signing & Pre-commit Hooks**
1. Generate an SSH key or GPG key and configure Git to sign all commits locally.
2. Install the Python \`pre-commit\` framework (\`pip install pre-commit\`).
3. Create a \`.pre-commit-config.yaml\` file.
4. Configure hooks: \`trailing-whitespace\`, \`check-yaml\`, \`check-added-large-files\`, and a basic secrets regex check.
5. Attempt to commit a file with a fake AWS key and verify the hook blocks it.

**Lab 2: GitLab Repository Hardening**
1. Create a new project in GitLab.
2. Navigate to Settings -> Repository -> Branch Rules.
3. Protect the \`main\` branch: Require signed commits (if using Premium) or enforce merge request approvals.
4. Set up rules requiring at least 1 approval, rejecting unsigned commits, and preventing pushing secrets (if using GitLab Push Rules).

### Extra Challenge
Write a custom Bash pre-commit hook that checks if any Python file contains the string \`os.system\` and blocks the commit.

---

## Day 3: Designing the Enterprise Pipeline Architecture

### Objective
Design the modular GitLab CI/CD architecture using \`include\` and \`extends\` for reusability.

### Theory (20 min)
- DRY (Don't Repeat Yourself) in CI/CD.
- GitLab CI \`include:local\`, \`include:file\`, \`include:remote\`.
- Hidden jobs (starting with \`.\`) and \`extends\`.
- Security pipelines as separate, centrally managed repositories.

### Hands-on (3 hours)
**Lab: Reusable Pipeline Templates**
1. Create a repository named \`devsecops-templates\`.
2. Create a folder structure:
   - \`/templates/sast.yml\`
   - \`/templates/sca.yml\`
   - \`/templates/container-scan.yml\`
3. In \`sast.yml\`, create a generic dummy job:
   \`\`\`yaml
   .sast-base:
     stage: test
     script:
       - echo "Running SAST on \${TARGET_DIR}"
     artifacts:
       reports:
         sast: gl-sast-report.json
   \`\`\`
4. Create a target application repository (\`demo-app\`).
5. In \`demo-app/.gitlab-ci.yml\`, use \`include\` to fetch \`sast.yml\` from the \`devsecops-templates\` repository and extend it.

### Validation
- Trigger a pipeline in \`demo-app\` and verify it successfully runs the job defined in the templates repository.

### Senior Engineer Tips
> "Enterprise pipelines must be centrally managed. Developers should only include templates, not write security scanning logic themselves. This ensures compliance across 1000+ microservices."

---

## Day 4 & 5: Capstone Mini-Project & Review

### Mini Project: Secure Developer Onboarding
Create a \`README.md\` and a bootstrap script (\`setup.sh\`) that automatically configures a new developer's machine:
- Installs \`pre-commit\`.
- Sets up Git commit signing.
- Clones the \`demo-app\` repository.
- Initializes the local hooks.

### End-of-week challenge
Misconfiguration hunt: I will provide a \`.gitlab-ci.yml\` file with 5 security flaws (e.g., caching secrets, exposing tokens in logs, using mutable tags like \`latest\`). You must find and fix them.

### Checklist
- [ ] Threat model completed and mapped to ASVS.
- [ ] Commits are cryptographically signed.
- [ ] Pre-commit hooks are blocking bad commits locally.
- [ ] GitLab branch protections are active.
- [ ] Modular CI/CD architecture established.
`;
