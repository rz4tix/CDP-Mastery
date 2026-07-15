export const week3 = `
# Week 3: SAST Pipeline & Code Security

## Overview
Static Application Security Testing (SAST) is the first line of automated defense. We will integrate multiple tools, handle false positives, and unify the output.

### Goals
- Integrate SonarQube, Semgrep, and Bandit.
- Write custom Semgrep rules.
- Consolidate results using SARIF.

### Deliverables
- A pipeline running Semgrep and Bandit.
- Custom Semgrep rules for business-logic vulnerabilities.
- SonarQube quality gate integration.

---

## Day 1: SonarQube Deployment & Quality Gates

### Objective
Deploy SonarQube and configure Quality Gates.

### Theory (15 min)
- SonarQube architecture.
- Technical Debt and Security Hotspots vs Vulnerabilities.
- SonarQube Quality Gates.

### Hands-on (3 hours)
**Lab: SonarQube in Docker**
1. Write a \`docker-compose.yml\` to deploy SonarQube and PostgreSQL.
2. Log in and generate a Project Token.
3. In GitLab, add the token as a CI/CD variable.
4. Add the \`sonar-scanner-cli\` job to your pipeline.
5. Define a Quality Gate in SonarQube: "Fail if Security Rating is worse than A".
6. Introduce vulnerable code (e.g., hardcoded credentials in Java/Python) and watch the pipeline fail via the SonarQube gate.

---

## Day 2: Semgrep & Custom Rules

### Objective
Implement Semgrep, the modern, fast SAST tool, and write custom rules.

### Theory (20 min)
- Semgrep syntax (ellipses \`...\` and metavariables \`$X\`).
- Why regex is terrible for SAST (Abstract Syntax Trees are better).

### Hands-on (3 hours)
**Lab 1: Semgrep Integration**
1. Add a Semgrep job to your pipeline template using the official Semgrep Docker image.
2. Configure it to run the \`p/ci\` ruleset and output in JSON format.

**Lab 2: Writing Custom Rules**
1. Scenario: Your developers keep using an insecure internal hashing function \`util.md5_hash()\`.
2. Write a custom Semgrep rule (\`custom-rules.yaml\`) to detect this specific pattern.
   \`\`\`yaml
   rules:
     - id: detect-insecure-internal-hash
       patterns:
         - pattern: util.md5_hash(...)
       message: "Use util.sha256_hash() instead."
       severity: ERROR
       languages: [python]
   \`\`\`
3. Run Semgrep locally against a test file to verify the rule works.
4. Add the custom rule to your CI pipeline.

### Senior Engineer Tips
> "Off-the-shelf SAST rules generate noise. The real value of DevSecOps is writing custom rules for your specific internal libraries and business logic. Semgrep makes this trivial."

---

## Day 3: Language-Specific Scanners (Bandit & SpotBugs)

### Objective
Use specialized tools to catch what generic tools miss.

### Theory (15 min)
- Bandit (Python AST scanner).
- SpotBugs / FindSecBugs (Java bytecode scanner).

### Hands-on (2 hours)
**Lab: Bandit Integration**
1. Create a vulnerable Python script (e.g., using \`yaml.load()\` instead of \`yaml.safe_load()\`, and \`subprocess.Popen\` with \`shell=True\`).
2. Add a Bandit job to the pipeline: \`bandit -r . -f json -o bandit.json\`.
3. Use your universal security gate (from Week 2) to parse \`bandit.json\` and fail the build if High severity issues exist.

---

## Day 4: Unifying Output with SARIF

### Objective
Standardize security reports using SARIF (Static Analysis Results Interchange Format).

### Theory (15 min)
- Why SARIF is the industry standard.
- How GitLab and GitHub consume SARIF for UI integration.

### Hands-on (2 hours)
**Lab: SARIF Generation**
1. Modify Semgrep to output SARIF: \`semgrep ci --sarif -o semgrep.sarif\`.
2. Upload the \`semgrep.sarif\` as an artifact in GitLab.
3. (If using GitLab Ultimate) Observe the vulnerabilities populated in the Security Dashboard.
4. If not Ultimate, write a quick Python script to convert Bandit JSON to a basic SARIF structure.

---

## Day 5: Mini-Project

### SAST Orchestrator
Create a master SAST template that:
1. Detects the language of the repository (if \`requirements.txt\` exists -> run Bandit, if \`pom.xml\` -> run SpotBugs).
2. Always runs Semgrep.
3. Aggregates all reports into a single directory.
4. Fails the pipeline if any tool finds a Critical vulnerability.
`;
