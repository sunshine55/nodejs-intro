## Cloud9 CLI Instruction

###Cloning and pulling project from GitHub to your Cloud9 workspace

In your Cloud9 terminal:

  * When create new workspace, choose "Clone From URL", use this URL:
    `https://github.com/sunshine55/nodejs-sample.git` [CREATE]
  * Setup node modules:
    `npm install` [Enter]
  * In order to update project, add a remote:
    `git remote add [remote name] [remote url]` [Enter]
  * Pull the remote into workspace
    `git pull [remote name] master` [Enter]


###Pushing project from Cloud9 workspace to your GitHub repository

There are a couple of things you should do first, before you can use all of Git's power:

  * Add a remote to this project: in the Cloud9 IDE terminal, execute the following command
    `git remote add [remote name] [remote url (eg. 'git@github.com:/ajaxorg/node_chat')]` [Enter]
  * Create new files inside your project
  * Add them to git by executing the following command
    `git add [file1, file2, file3, ...]` [Enter]
  * Create a commit which can be pushed to the remote you just added
    `git commit -m 'added new files'` [Enter]
  * Push the commit the remote
    `git push [remote name] master` [Enter]

###Deploy on Heroku

There are 2 ways to deploy on Heroku:
  
  * Local git project:
    - [Pushing an app to Heroku using git](https://devcenter.heroku.com/articles/git)
    - [Using Heroku toolbelt](https://toolbelt.heroku.com/)
  * Deploy via Cloud9:
    - Create new app on Heroku.
    - Open deploy tab (balloon icon) on Cloud9 workspace.
    - Create a deploy server (following the instructions of Cloud9)

Don't forget the Procfile in your project so that Heroku can be aware of your deployment. Happy coding!
