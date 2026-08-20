# Releasing NextCommit

1. Confirm the `nextcommit` package name remains available and configure this repository as its npm Trusted Publisher.
2. Create and push a version tag such as `v0.1.0`.
3. GitHub Actions validates the packed package and publishes through OIDC; no npm automation token is stored in the repository.
