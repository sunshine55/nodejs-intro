# README for a newly created project.


Cloning and pulling project from Git to your Cloud9 workspace
-------------------------------------------------------------

  * When create new workspace, choose "Clone From URL", use this URL:
    `https://github.com/sunshine55/nodejs-sample.git` [CREATE]
  * Setup node modules:
    `npm install` [Enter]
  * In order to update project, add a remote:
    `git remote add [remote name] [remote url]` [Enter]
  * Pull the remote into workspace
    `git pull [remote name] master` [Enter]


Pushing your project from your Cloud9 workspace to your Git repo
----------------------------------------------------------------

There are a couple of things you should do first, before you can use all of Git's power:

  * Add a remote to this project: in the Cloud9 IDE command line, you can execute the following commands
    `git remote add [remote name] [remote url (eg. 'git@github.com:/ajaxorg/node_chat')]` [Enter]
  * Create new files inside your project
  * Add them to Git by executing the following command
    `git add [file1, file2, file3, ...]` [Enter]
  * Create a commit which can be pushed to the remote you just added
    `git commit -m 'added new files'` [Enter]
  * Push the commit the remote
    `git push [remote name] master` [Enter]

That's it! If this doesn't work for you, please visit the excellent resources from [Github.com](http://help.github.com) and the [Pro Git](http://http://progit.org/book/) book.
If you can't find your answers there, feel free to ask us via Twitter (@cloud9ide), [mailing list](groups.google.com/group/cloud9-ide) or IRC (#cloud9ide on freenode).

Happy coding!
