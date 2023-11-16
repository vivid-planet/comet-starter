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

- `project-name` (required): Specifies the name of the project. It will be used as the directory name for the project.
- `-v` or `--verbose`: Enables extra console logs for verbose output.
- `-V` or `--version`: Outputs the version number.
- `-h` or `--help`: Display help for the command.

Example usage with arguments:

```
npx @comet/create-app my-project -v
```

Example output:
```
Creating a new Comet app in /Users/maximilianpelka/Documents/Development

Cloning into './my-project'
Cloned git repository.

Successfully replaced content in 15 files

Success! Created 'test-project' at '/<installation-path>/test-project'

```

This command will create a new Comet app with the name "my-project" and enable verbose output in the console logs.

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

Testing a close to production usage of the tool can be done by calling `npm link` in the create-app/ directory. Then `npx @comet/create-app` can be used.