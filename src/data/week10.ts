export const week10 = `
# Week 10: Exam Simulation & Capstone

## Overview
This is the final week. No new tools. Pure execution. You will undergo 4 mock practical exams designed to simulate the CDP environment.

### Goals
- Pass the 4 mock exams under time constraints.
- Review weaknesses.
- Final Capstone delivery.

### Deliverables
- Fully functioning pipelines solving the mock scenarios.

---

## Day 1: Mock Exam 1 (The Broken Pipeline)

### Scenario (2 Hours)
You are given a repository with a broken GitLab CI pipeline.
**Tasks:**
1. Fix the syntax errors preventing the pipeline from running.
2. The SAST job (Semgrep) is producing 500 false positives because it's scanning the \`node_modules\` folder. Fix the command to exclude it.
3. The Docker build job is running as root and failing the Trivy scan. Modify the \`Dockerfile\` to run as a non-root user.
4. Ensure the pipeline passes completely.

---

## Day 2: Mock Exam 2 (The Security Gate)

### Scenario (2 Hours)
You are given a Python application.
**Tasks:**
1. Implement Bandit and output to JSON.
2. Write a custom bash script using \`jq\` that parses the Bandit JSON.
3. The script MUST fail the pipeline if there is >= 1 HIGH severity issue.
4. The script MUST NOT fail for LOW severity issues.
5. Create a custom Bandit profile (\`bandit.yaml\`) to ignore the \`B101: assert_used\` rule.

---

## Day 3: Mock Exam 3 (The Supply Chain)

### Scenario (2 Hours)
You are given an application ready for release.
**Tasks:**
1. Generate an SPDX JSON SBOM using Syft.
2. Upload the SBOM as a GitLab artifact.
3. Scan the SBOM using Grype and save the output.
4. Sign the SBOM file using Cosign (generate a temporary keypair in the pipeline).
5. Output the verification result to the CI logs.

---

## Day 4: Mock Exam 4 (The DAST Integration)

### Scenario (2 Hours)
You are given a dockerized web app.
**Tasks:**
1. Start the application in a background CI service/job.
2. Run OWASP ZAP Baseline against the local service.
3. ZAP will find a "Missing Anti-clickjacking Header".
4. Modify the application code (Node.js/Python) to include the \`X-Frame-Options: DENY\` header.
5. Re-run the pipeline and prove the vulnerability is gone.

---

## Day 5: Final Review & Capstone

### Capstone Presentation
Review the enterprise pipeline built in Week 9.
Perform a self-assessment against the DSOMM baseline created in Week 1.
Identify the maturity level reached.

### Senior Engineer Final Advice
> "Certifications get you past the HR filter. The ability to debug a failing pipeline at 2 AM, explain risk to a product manager without using jargon, and build tools that developers actually *like* using... that's what makes you a Principal Engineer. Good luck on the exam."
`;
