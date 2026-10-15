This directory contains responses used in tests with mocked server.

**Both** iOS and Android projects are using this dir.

Please run `download_js_files.sh` script from this directory, to download required dependencies for tests.

DX response fixtures with a known Pega version are stored under `dx/<version>/<endpoint>/`, for example:

```text
dx/24.1/assignments/
dx/24.2/cases/
dx/25.1/data_views/
dx/26.1/cases/
```

The version is represented by the directory, so filenames inside a versioned directory must not repeat the
version. Existing fixtures in the top-level `dx/assignments`, `dx/cases`, and `dx/data_views` directories are
legacy/shared fixtures and should remain there when they are used by multiple versions, by SwiftUI tests, or
when their source version is not established. New version-specific fixtures should use the versioned layout.
