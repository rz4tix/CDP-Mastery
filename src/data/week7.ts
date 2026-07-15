export const week7 = `
# Week 7: Container Security & Supply Chain

## Overview
Containers run the modern web. We will secure the build process, sign our artifacts to prevent supply chain attacks, and enforce policies in Kubernetes.

### Goals
- Secure Dockerfile construction (Trivy/Hadolint).
- Setup Harbor as a secure container registry.
- Sign images using Sigstore Cosign.
- Enforce admission control in Kubernetes using Kyverno/OPA.

### Deliverables
- CI pipeline building and signing a secure image.
- Kubernetes rejecting unsigned images.

---

## Day 1: Secure Docker Builds (Hadolint & Trivy)

### Objective
Write secure Dockerfiles and scan the resulting images.

### Theory (15 min)
- Docker attack surface (Root user, excessive privileges).
- Multi-stage builds for minimizing attack surface.
- Distroless images.

### Hands-on (3 hours)
**Lab: Fixing a terrible Dockerfile**
1. Create a bad Dockerfile (uses \`FROM node:latest\`, runs as \`root\`, leaves apt caches, exposes secrets in ENV).
2. Run \`hadolint Dockerfile\`. Observe the failures.
3. Build the image and scan with \`trivy image\`.
4. Rewrite the Dockerfile:
   - Use Alpine or Distroless.
   - Add a non-root user (\`USER appuser\`).
   - Use multi-stage builds.
5. Rescan and achieve 0 High/Critical findings.

---

## Day 2: Secure Registries (Harbor)

### Objective
Store images securely with built-in vulnerability scanning.

### Theory (15 min)
- Role of the container registry in DevSecOps.
- Image signing, CVE scanning on push, and retention policies.

### Hands-on (3 hours)
**Lab: Harbor Deployment**
1. Deploy Harbor locally using \`docker-compose\`.
2. Configure a project in Harbor.
3. Enable "Prevent vulnerable images from running" (set threshold to High).
4. Push the secure image from Day 1 to Harbor.
5. Push the bad image from Day 1 to Harbor. Observe Harbor blocking the pull/push of the vulnerable image.

---

## Day 3: Image Signing (Cosign)

### Objective
Ensure cryptographic integrity of the container images (Supply Chain Security).

### Theory (20 min)
- Supply-chain attacks (SolarWinds).
- Sigstore, Cosign, and Keyless signing (OIDC).
- SBOM attestation.

### Hands-on (2 hours)
**Lab: Signing with Cosign**
1. Install Cosign.
2. Generate a keypair: \`cosign generate-key-pair\`.
3. Tag and push an image to your registry.
4. Sign the image: \`cosign sign --key cosign.key <image-uri>\`.
5. Verify the signature: \`cosign verify --key cosign.pub <image-uri>\`.
6. Integrate signing into your GitLab pipeline (store the private key as a secure CI variable).

---

## Day 4: Kubernetes Admission Controllers (Kyverno)

### Objective
Block insecure or unsigned containers from running in production.

### Theory (20 min)
- Mutating vs Validating Admission Webhooks.
- OPA Gatekeeper vs Kyverno.

### Hands-on (3 hours)
**Lab: Enforcing Image Signatures in K8s**
1. Spin up a local Kubernetes cluster (Minikube / Kind).
2. Install Kyverno via Helm: \`helm install kyverno kyverno/kyverno -n kyverno --create-namespace\`.
3. Write a Kyverno \`ClusterPolicy\` that requires all images in the \`prod\` namespace to be signed by your Cosign public key.
4. Attempt to deploy an unsigned image (Should be blocked).
5. Attempt to deploy the signed image (Should succeed).

### Senior Engineer Tips
> "Do not use 'latest' tags. Signatures are attached to image digests (sha256). Always deploy to Kubernetes using the digest, or use a Mutating webhook to resolve tags to digests automatically."

---

## Day 5: Mini-Project

### The Untamperable Pipeline
1. GitLab CI builds a Docker image.
2. Generates an SBOM (Syft).
3. Attaches the SBOM to the image using Cosign.
4. Signs the image using Cosign.
5. Pushes to Harbor.
6. A Kubernetes deployment manifest is applied.
7. Kyverno verifies the signature before allowing the Pod to start.
`;
