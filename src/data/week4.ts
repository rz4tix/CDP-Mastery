export const week4 = `
# Week 4: Software Composition Analysis (SCA) & SBOM

## Overview
Modern applications are 80% open-source libraries. If you don't secure your dependencies, your SAST efforts are useless. This week covers SCA, Software Bill of Materials (SBOM), and License compliance.

### Goals
- Implement OWASP Dependency Check and Trivy for dependencies.
- Generate and parse CycloneDX and SPDX SBOMs using Syft.
- Implement License compliance checking.

### Deliverables
- CI pipeline generating an SBOM.
- Automated vulnerability scanning of the SBOM.
- License compliance gate.

---

## Day 1: SCA Fundamentals & Trivy

### Objective
Scan application dependencies for CVEs using Trivy.

### Theory (15 min)
- Transitive vs Direct dependencies.
- CVE databases (NVD, GitHub Advisories).
- Trivy architecture (filesystem vs image scanning).

### Hands-on (2 hours)
**Lab: Filesystem Scanning**
1. Create a Python project with a \`requirements.txt\` containing an old version of \`requests\` and \`Jinja2\`.
2. Add Trivy to your GitLab pipeline: \`trivy fs . --scanners vuln\`.
3. Configure Trivy to fail the build on CRITICAL vulnerabilities: \`trivy fs . --severity CRITICAL --exit-code 1\`.
4. Fix the vulnerabilities by updating \`requirements.txt\` and observe the pipeline pass.

---

## Day 2: OWASP Dependency Check & RetireJS

### Objective
Integrate specialized SCA tools.

### Theory (15 min)
- OWASP Dependency Check (Java/Maven focus).
- RetireJS (Frontend JavaScript).

### Hands-on (3 hours)
**Lab: Dependency Check**
1. Create a basic Maven project (\`pom.xml\`) with a vulnerable version of \`log4j\`.
2. Integrate OWASP Dependency Check CLI into the pipeline.
3. Review the HTML report generated as an artifact.
4. *Troubleshooting*: Handle the NVD API rate limits by configuring a local NVD mirror or using API keys.

### Senior Engineer Tips
> "OWASP Dependency Check is notoriously slow and rate-limited. In enterprise environments, you MUST run a central NVD mirror database, or use a commercial tool. For the exam, know how to configure the API key."

---

## Day 3: SBOM Generation (Syft)

### Objective
Generate a cryptographic inventory of what is in your software.

### Theory (20 min)
- What is an SBOM?
- CycloneDX vs SPDX formats.
- US Executive Order 14028.

### Hands-on (2 hours)
**Lab: Generating SBOMs**
1. Install Anchore \`syft\`.
2. Run Syft against your project directory: \`syft dir:. -o cyclonedx-json > sbom.json\`.
3. Open \`sbom.json\` and inspect the components, purls (Package URLs), and hashes.
4. Add the SBOM generation as a pipeline job that runs *before* scanning. Store the SBOM as an artifact.

---

## Day 4: SBOM Scanning (Grype) & License Checks

### Objective
Scan the generated SBOM for vulnerabilities and enforce license policies.

### Theory (15 min)
- Why scan the SBOM instead of the source code? (Artifact portability).
- Copyleft vs Permissive licenses (GPL vs MIT/Apache).

### Hands-on (3 hours)
**Lab 1: Grype**
1. Install \`grype\`.
2. Feed the SBOM from Day 3 into Grype: \`grype sbom:sbom.json\`.
3. Integrate this into the CI pipeline.

**Lab 2: License Compliance**
1. Use Trivy to scan for licenses: \`trivy fs . --scanners license\`.
2. Write an OPA (Open Policy Agent) Rego policy or use Trivy's built-in filtering to FAIL the build if a \`GPL-3.0\` license is detected in a proprietary project.

---

## Day 5: Mini-Project

### The Dependency Firewall
Build a pipeline stage that:
1. Generates a CycloneDX SBOM using Syft.
2. Scans the SBOM using Grype (Failing on Critical CVEs).
3. Scans the SBOM for licenses, failing if any \`AGPL\` or \`GPL\` licenses are found.
4. Packages the application and the SBOM into a zip file as a release artifact.
`;
