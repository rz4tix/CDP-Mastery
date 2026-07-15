export const week8 = `
# Week 8: Vulnerability Management & DefectDojo

## Overview
We now have SAST, DAST, SCA, and IaC scanners generating thousands of alerts. A DevSecOps pipeline without vulnerability management is just a spam generator. We will centralize findings using DefectDojo.

### Goals
- Deploy and configure OWASP DefectDojo.
- Automate report ingestion via API.
- Deduplicate findings.
- Create security dashboards.

### Deliverables
- A running DefectDojo instance.
- GitLab CI scripts that upload Semgrep, Trivy, and ZAP reports to Dojo.

---

## Day 1: DefectDojo Architecture & Deployment

### Objective
Establish the single pane of glass for security findings.

### Theory (15 min)
- Vulnerability Management lifecycle.
- Deduplication, false positive tracking, and risk acceptance.
- Products vs Engagements vs Tests in DefectDojo.

### Hands-on (2 hours)
**Lab: Deploying Dojo**
1. Clone the \`django-DefectDojo\` repository.
2. Run \`docker-compose up -d\`.
3. Login as admin.
4. Create a "Product Type" (e.g., Microservices).
5. Create a "Product" (e.g., Demo App).
6. Create an "Engagement" (e.g., CI/CD Pipeline Q3).

---

## Day 2: API Ingestion

### Objective
Automate the upload of security reports.

### Theory (15 min)
- DefectDojo REST API (v2).
- API Tokens and authentication.
- Importers vs Re-importers (handling subsequent scans).

### Hands-on (3 hours)
**Lab: GitLab to Dojo Script**
1. Generate an API v2 Key in DefectDojo.
2. Write a Python script (\`upload_to_dojo.py\`) or use \`curl\`.
3. The script must take arguments: \`--file\`, \`--scanner\`, \`--product_id\`.
4. Use the \`/api/v2/import-scan/\` endpoint to upload a Trivy JSON report.
5. Verify the findings appear in the Dojo UI.

---

## Day 3: Deduplication and Triage

### Objective
Manage the noise.

### Theory (15 min)
- How Dojo hashes findings for deduplication.
- Statuses: Active, Verified, False Positive, Out of Scope, Risk Accepted.

### Hands-on (2 hours)
**Lab: Managing Findings**
1. Run a Semgrep scan, upload it.
2. Mark one finding as a "False Positive" in Dojo.
3. Run the exact same Semgrep scan again, and use the \`/api/v2/reimport-scan/\` endpoint.
4. Verify that the finding remains marked as "False Positive" and no duplicate was created.

---

## Day 4: Metrics and Alerting

### Objective
Notify developers and management effectively.

### Theory (15 min)
- Security Metrics (MTTR - Mean Time To Remediate).
- Webhooks vs Email vs Slack.

### Hands-on (2 hours)
**Lab: Slack/Webhook Integration**
1. Configure DefectDojo to send a webhook or Slack notification when a new *Critical* vulnerability is ingested.
2. Trigger the alert by uploading a malicious report.
3. Explore the "Metrics" dashboard in Dojo to view risk trends.

---

## Day 5: Mini-Project

### The Unified Feedback Loop
Integrate the Python upload script directly into your GitLab templates.
Modify the pipeline so that:
1. SAST runs -> generates JSON -> Uploads to Dojo (Scanner: Semgrep).
2. SCA runs -> generates JSON -> Uploads to Dojo (Scanner: Trivy).
3. The script checks the Dojo API. If there are > 0 Critical findings in the current Engagement, it fails the GitLab CI job, providing a direct URL to the Dojo Product page in the terminal output.
`;
