export const week2 = `
# Week 2: Enterprise GitLab Pipeline & Security Gates

## Overview
This week we build the skeleton of the enterprise pipeline and enforce Security Gates. A pipeline is useless if it doesn't fail when a critical vulnerability is found.

### Goals
- Implement strict Security Gates (Fail the build on Critical/High).
- Configure CI/CD variables securely.
- Setup custom GitLab runners.
- Implement conditional pipeline execution (Rules/Workflow).

### Deliverables
- A working GitLab pipeline with a functional security gate using \`jq\`.
- Securely configured GitLab Runner using Docker executor.

---

## Day 1: Secure Variable Management

### Objective
Stop leaking secrets in CI/CD.

### Theory (15 min)
- GitLab CI/CD Variables (Protected vs Masked).
- Environment scopes.
- Why you should never use \`echo $SECRET\` in a pipeline.
- HashiCorp Vault integration overview (JWT authentication).

### Hands-on (3 hours)
**Lab: Variable Security**
1. In your \`demo-app\`, add a masked and protected variable \`API_KEY\`.
2. Write a pipeline job that attempts to print the variable to the console (verify GitLab masks it as \`[MASKED]\`).
3. *Vulnerability Simulation*: Write a script that writes the variable to a file, and then prints the file in base64. Observe how masking is easily bypassed.
4. **Fix**: Implement a policy where secrets are only loaded into memory during execution, or pulled dynamically via HashiCorp Vault (simulated for now by using JWT tokens: \`id_tokens\` in GitLab CI).

### Senior Engineer Tips
> "Masking is a UI trick, not encryption. If a developer can execute code in your pipeline, they can exfiltrate the secret. This is why Protected Branches and Code Review are your actual security controls."

---

## Day 2: Custom Runners and Isolation

### Objective
Understand runner isolation and prevent cross-pipeline contamination.

### Theory (20 min)
- GitLab Runner Executors (Shell vs Docker vs K8s).
- The dangers of the Shell executor.
- Docker-in-Docker (DinD) vs Kaniko for building images securely.

### Hands-on (3 hours)
**Lab: Deploying a Secure Runner**
1. Provision a local VM or use your local machine.
2. Install GitLab Runner.
3. Register the runner to your GitLab project using the Docker executor (\`--docker-image alpine:latest\`).
4. Configure the runner to NOT run untagged jobs (\`Run untagged jobs = false\`).
5. Ensure \`privileged = false\` in \`config.toml\` to prevent container escapes.
6. Run a pipeline using your new runner.

---

## Day 3: Implementing Security Gates

### Objective
Automatically fail the pipeline if security conditions are not met.

### Theory (15 min)
- What is a Security Gate?
- Parsing JSON security reports.
- Non-blocking (Audit) vs Blocking (Enforce) modes.

### Hands-on (3 hours)
**Lab: The JSON Gate**
1. Create a dummy JSON file representing a scanner output (\`trivy-results.json\`).
2. Write a bash script \`security-gate.sh\` using \`jq\`.
3. The script must parse the JSON. If \`CRITICAL > 0\` or \`HIGH > 0\`, the script must \`exit 1\`. If not, \`exit 0\`.
4. Integrate this script into your GitLab pipeline as a \`.post\` stage job.

### Common Mistakes
- **Grepping JSON**: Never use \`grep\` to parse JSON outputs. Always use \`jq\` or a Python script to ensure accuracy and handle nested structures.

---

## Day 4: Workflow Rules and Pipeline Optimization

### Objective
Run security scans only when necessary to save compute resources and time.

### Theory (15 min)
- GitLab \`rules:if\` and \`workflow:rules\`.
- \`changes\` keyword to detect modified files.

### Hands-on (2 hours)
**Lab: Smart Scanning**
1. Update your templates.
2. Configure your SAST job to ONLY run if \`*.py\`, \`*.go\`, or \`*.js\` files are modified in the commit.
3. Configure your IaC scanning job to ONLY run if \`Dockerfile\` or \`*.tf\` files are modified.
4. Test by pushing a change to \`README.md\` (no scans should run).
5. Test by pushing a change to \`app.py\` (SAST should run).

---

## Day 5: Mini-Project

### The Gatekeeper
Build a universal security gate Docker image.
1. Write a Python script that accepts a standard generic vulnerability format (like SARIF).
2. The script takes arguments: \`--fail-on high,critical\` and \`--file report.sarif\`.
3. Dockerize this Python script.
4. Publish it to your local registry.
5. Use this custom Docker image in your GitLab pipeline to enforce gates across all future tools.
`;
