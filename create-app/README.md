# @comet/create-app

This is a command-line interface to create a new Comet application.
It sets up a project with the necessary configuration and files to get started quickly.

## Usage

To create a new Comet app, run the following command:

```bash
npx @comet/create-app <project-name>
```

### Arguments

The following arguments can be passed to customize the project setup:

-   `project-name` (required): Specifies the name of the project. It will be used as the directory name for the project.
-   `-ni` or `--no-install`: Disables the automatic installation of dependencies.
-   `-r` or `--repository <repository>`: Repository to clone from. Defaults to `https://github.com/vivid-planet/comet-starter.git`.
-   `-b` or `--branch <branch>`: Branch to checkout. Defaults to `main`.
-   `-v` or `--verbose`: Enables extra console logs for verbose output.
-   `-V` or `--version`: Outputs the version number.
-   `-h` or `--help`: Display help for the command.

#### Example usage with arguments

Create a new Comet app with the name "my-project" and enable verbose logging:

```bash
npx @comet/create-app my-project -v
```

Create a new Comet app with a different repository and branch:

```bash
npx @comet/create-app my-project -r https://github.com/my-company/comet-starter.git -b next
```

## For developers

### Development

To test the script locally, run the following commands:

1. Start the development process:
    ```bash
    npm start
    ```
2. Run the script:
    ```bash
    node ./bin/index.js
    ```

Testing a close to production usage of the CLI can be done by calling `npm link` in the create-app/ directory. Then `npx @comet/create-app` can be used.
