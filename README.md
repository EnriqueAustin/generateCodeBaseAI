#  Codebase Snapshot Generator

A small Node.js utility that generates a **single, AI-friendly snapshot
of your entire codebase** by consolidating all Git-tracked source files
into one text file.

This tool is designed for developers who want to: - Share full project
context with AI tools - Create deterministic, regenerable code
snapshots - Avoid manual copy-pasting of files - Keep snapshots aligned
with `.gitignore`

The output is a single file (`codeBase.txt`) containing all relevant
source files in a structured, readable format.

------------------------------------------------------------------------

##  What It Does

-   Scans your Git repository using `git ls-files`
-   Automatically respects `.gitignore`
-   Excludes `.txt` files to avoid recursive snapshots
-   Sorts files for stable, repeatable output
-   Regenerates the snapshot from scratch every run
-   Produces an AI-optimized format with clear file boundaries

No diffing. No caching. No hidden state.

------------------------------------------------------------------------

##  Example Output

    PROJECT SNAPSHOT
    Generated: 2026-01-26T19:03:04.992Z
    Files: 11

    ===== FILE: src/server.js =====
    ```js
    // file contents

===== FILE: src/routes/auth.js =====

``` js
// file contents
```


    This format is intentionally simple and deterministic so AI tools can reliably understand project structure and relationships.

    ---

    ## 🛠 Requirements

    - Node.js (v18+ recommended)
    - Git (repository must be initialized)

    ---

    ##  Setup

    ### 1. Add the script to your project root

    Create a file called:

generateCodeBase.js


    Paste in the snapshot generator code.

    ---

    ### 2. Initialize Node (if not already done)

    ```bash
    npm init -y

Enable ES modules:

``` bash
npm pkg set type=module
```

------------------------------------------------------------------------

### 3. (Optional) Add an npm script

In `package.json`:

``` json
{
  "scripts": {
    "snapshot": "node generateCodeBase.js"
  }
}
```

------------------------------------------------------------------------

##  Usage

From the project root:

``` bash
npm run snapshot
```

or directly:

``` bash
node generateCodeBase.js
```

This will generate or overwrite:

    codeBase.txt

------------------------------------------------------------------------

##  Design Philosophy

-   **Git is the source of truth**\
    Only tracked files are included.

-   **Full regeneration \> incremental updates**\
    Simpler, safer, and impossible to desync.

-   **Small, transparent code**\
    Easy to audit, easy to modify.

-   **AI-first output format**\
    Optimized for large language models, not humans.

------------------------------------------------------------------------

##  What It Does *Not* Do

-   No file watching
-   No incremental diffs
-   No token optimization
-   No parsing or transformation of code

This is intentional.

------------------------------------------------------------------------

##  Typical Use Cases

-   Feeding full project context into ChatGPT or other LLMs
-   Creating deterministic snapshots for debugging
-   Sharing project state with collaborators or tools
-   Archiving project structure at specific moments

------------------------------------------------------------------------

##  Future Enhancements (Optional)

-   Watch mode (auto-regenerate on save)
-   Configurable file filters
-   Token-aware chunking
-   Commit hash / branch metadata
-   Minified or comment-stripped modes

------------------------------------------------------------------------

##  License

MIT --- do whatever you want.
