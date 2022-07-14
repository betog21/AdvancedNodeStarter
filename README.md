# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy

## Start the project
1. Clone the repo and move to the AdvancedNodeStarted folder
2. Install the back end dependencies runing the command
```console
npm install
```
3. Install the client dependencies running the next lines
```console
cd client
npm install
```
4. Configure the mongodb conetion string inside the */config/dev.js* file. (A default connection to local host is already configured)
5. Run the project with the line
```console
npm run dev
```
6. Visit http://localhost:3000/ to view the running project

## Install redis.
It's necesary that you install redis. Redis is installed depending on the OS your computer is running.
### Install redis on mac
1. Verify you alredy have installed brew
```console
which brew
```
This comand will show a path incase brew has already installed.
- If you haven't installed brew install it whit this command:
```console
export HOMEBREW_BREW_GIT_REMOTE="..."  # put your Git mirror of Homebrew/brew here
export HOMEBREW_CORE_GIT_REMOTE="..."  # put your Git mirror of Homebrew/homebrew-core here
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
2. Install redis
```console
brew install redis
```