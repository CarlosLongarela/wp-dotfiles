# WordPress dotfiles and other usefull files for development and configuration

Dotfiles usefull in WordPress plugins and Themes development to configure development envinronment.

For themes use the *theme.json* file (delete it on plugin development)

## Instructions for development

1. Configure the editor with [EditorConfig](https://editorconfig.org/)
2. Install [phpcs](https://github.com/squizlabs/PHP_CodeSniffer) and the rules [WordPress Coding Standards](https://github.com/WordPress/WordPress-Coding-Standards)
3. Install and configure [npm](https://www.npmjs.com/)
4. Or update [npm](https://www.npmjs.com/) to latest version with `$ npm update -g`
5. Execute `$ npm install` in the root of the directory to install the dependencies
6. For the Git flow we will use [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and work on the 'develop' branch
7. To *deploy* this repository has been set up in [Gitlab](https://gitlab.com) with CI/CD using the `.gitlab-ci.yml` file and to *deploy* the Staging server has been aliased **deploy** *(it is created in the repo config file, in .git/)*; so if we run `$ git deploy` the following sequence will run:

``git push && git checkout main && git pull && git merge develop && git push && git checkout develop``

* We send the current changes in the *develop* branch to the Git repo
* We're moving to the *main* branch
* We bring you the possible changes in the *main* branch (there should be no change)
* We merged the *develop* branch into the current *main* branch
* We send the current changes in the *main* branch to the Git repo (this is where the '.gitlab-ci.yml' action comes in and sends the changes via SFTP/FTP to the staging server)
* We are switching back to the *develop* branch to continue working on the development branch.
