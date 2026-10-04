# Third-party code

Code under `upstream/` is mirrored from the repositories below by `sync/pull.mjs`. Each
file is kept byte-for-byte except for the transforms listed in `sync/manifest.json`, and
`upstream.lock.json` records the exact commit and file hashes.

| Directory | Source | License | Status |
|---|---|---|---|
| `upstream/unredacted/` | [jyr-ai/UNREDACTED](https://github.com/jyr-ai/UNREDACTED) | AGPL-3.0-or-later, © Data Diplomats for Nonprofits, Inc. ([upstream/unredacted/LICENSE](upstream/unredacted/LICENSE)) | synced |
| `upstream/ade/` | [adayo22-byte/ADE-INVESTMENTS](https://github.com/adayo22-byte/ADE-INVESTMENTS) | none published, so all rights reserved by the owner | **not synced until the owner grants permission** |
| `upstream/jians/` | [jyr-ai/Jians_finance](https://github.com/jyr-ai/Jians_finance) | none published (same owner as this repo) | phase 3 |
| `upstream/facai/` | [jyr-ai/facai](https://github.com/jyr-ai/facai) (fork of [ValueCell](https://github.com/ValueCell-ai/valuecell)) | Apache-2.0; its LICENSE and NOTICE are mirrored with the code | phase 4 |

Because UNREDACTED is AGPL, this whole app is distributed under AGPL-3.0-or-later. Anyone
who uses the deployed app over a network is entitled to its source. The footer links to
this repository for that reason.
