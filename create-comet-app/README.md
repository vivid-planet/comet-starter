# @comet/create-app

This is a command-line tool to create a new Comet app. It sets up a project with the necessary configuration and files
to get started quickly.

## Usage

To create a new Comet app, run the following command:

```
npx @comet/create-app
```

### Arguments

The following arguments can be passed to customize the project setup:

- `project-name` (required*): Specifies the name of the project. It will be used as the directory name for the project.
- `--no-showcase` (required*): Disables the addition of showcase content in the project.
- `--showcase` (required*): Adds showcase content to the project.
- `-v` or `--verbose`: Enables extra console logs for verbose output.
- `-V` or `--version`: Outputs the version number.
- `-h` or `--help`: Display help for the command.

*If you choose not to provide a required argument, you will be prompted to enter it during the setup process.

Example usage with arguments:

```
npx @comet/create-app my-project --showcase -v
```

This command will create a new Comet app with the name "my-project", include showcase content, and enable verbose output
in the console logs.
