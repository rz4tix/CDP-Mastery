import { week1 } from './week1';
import { week2 } from './week2';
import { week3 } from './week3';
import { week4 } from './week4';
import { week5 } from './week5';
import { week6 } from './week6';
import { week7 } from './week7';
import { week8 } from './week8';
import { week9 } from './week9';
import { week10 } from './week10';

export const overview = `
# CDP Mastery Roadmap Overview

Welcome to the Certified DevSecOps Professional (CDP) preparation roadmap.
As a senior engineer, this roadmap skips the basics (Docker, Git, K8s) and focuses 90% on hands-on DevSecOps implementation, pipeline architecture, and security tooling.

## Objectives
1. Build an Enterprise-Grade DevSecOps Pipeline from scratch.
2. Master SAST, DAST, SCA, Secrets Detection, and IaC Security.
3. Understand Container Security, Image Signing, and Admission Control.
4. Centralize Vulnerability Management using DefectDojo.
5. Pass the CDP Practical Exam.

## Recommended GitHub/GitLab Structure
Create a dedicated group/organization for this roadmap:
\`\`\`text
cdp-mastery/
├── devsecops-templates/      # Reusable CI/CD YAML templates
├── custom-security-rules/    # Semgrep, Gitleaks, Checkov rules
├── golden-images/            # Packer, Ansible, InSpec configs
├── defectdojo-scripts/       # Automation for API ingestion
├── demo-microservice-api/    # The target application for scans
└── infrastructure-manifests/ # K8s YAMLs, Terraform, Kyverno policies
\`\`\`

## Evaluation Rubric
- **Functionality**: Does the pipeline run without manual intervention?
- **Security Gates**: Do builds accurately fail on Critical/High vulnerabilities?
- **False Positives**: Are false positives managed via code (configurations) rather than ignored?
- **Speed**: Does the pipeline optimize execution (using rules/changes) to provide fast feedback?

Use the sidebar to navigate through the 10 weeks of rigorous training.
`;

export const bestPractices = `
# Production Best Practices

As a Senior/Principal DevSecOps Engineer, you must adhere to these enterprise standards:

## 1. Pipeline Architecture
- **Never hardcode secrets** in pipelines. Use ephemeral tokens (OIDC/JWT) to fetch secrets from Vault or cloud providers.
- **Centralize templates**. Developers should \`include\` security templates, not write them. This allows the security team to update tooling globally.
- **Use pinned versions**. Never use \`image: trivy:latest\`. Use \`image: trivy:0.48.0\`.

## 2. Managing False Positives
- **Do not ignore them**. An ignored false positive trains developers to ignore the tool.
- **Suppress via code**. Use \`.semgrepignore\`, \`.gitleaksignore\`, or inline comments (e.g., \`# nosec\`) so the suppression is version-controlled and auditable.

## 3. Performance
- **Run tools concurrently**. SAST, SCA, and IaC scanning should run in parallel in the pipeline.
- **Delta scanning**. Use rules to only run SAST if source code changed, and only run IaC scanning if Terraform/Dockerfiles changed.
- **Separate DAST**. Active DAST scans take hours. Run Baseline DAST in CI, and schedule Active DAST asynchronously.

## 4. Supply Chain
- **SBOMs are mandatory**. Generate an SBOM for every build, sign it, and attach it to the registry.
- **Distroless Images**. Use \`gcr.io/distroless/static\` or Alpine to reduce the attack surface. If there is no shell, the attacker cannot execute \`curl\` or \`bash\`.
`;

export const roadmapData: Record<string, string> = {
  overview,
  'week-1': week1,
  'week-2': week2,
  'week-3': week3,
  'week-4': week4,
  'week-5': week5,
  'week-6': week6,
  'week-7': week7,
  'week-8': week8,
  'week-9': week9,
  'week-10': week10,
  'best-practices': bestPractices,
};
