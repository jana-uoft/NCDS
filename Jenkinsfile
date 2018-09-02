#!groovy

def errorMessage = "" // Used to check buildStatus during any stage

def isDeploymentBranch(){
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==PRODUCTION_BRANCH || currentBranch==DEVELOPMENT_BRANCH;
}

def getPrefix() {
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==DEVELOPMENT_BRANCH ? 'dev.' : '';
}

pipeline {
  // construct global env variables
  environment {
    SITE_NAME = 'nainativucds.org' // Name will be used for archive file (with prefix 'dev.' if DEVELOPMENT_BRANCH)
    PRODUCTION_BRANCH = 'master' // Source branch used for production
    DEVELOPMENT_BRANCH = 'new' // Source branch used for development
    SLACK_CHANNEL = '#builds' // Slack channel to send build notifications
  }
  agent any
  stages {
    stage('Start') {
      steps {
        notifySlack status: 'STARTED', channel: SLACK_CHANNEL // Send 'Build Started' notification
      }
    }
    stage ('Install Packages') {
      steps {
        script {
          try {
            // Install required node packages
            nodejs(nodeJSInstallationName: '10.6.0') {
              sh 'yarn 2>commandResult'
            }
          } catch (e) {
            if (!errorMessage) {
              errorMessage = "Failed while installing node packages.\n\n${readFile('commandResult').trim()}\n\n${e.message}"
            }
            currentBuild.currentResult = 'FAILURE'
          }
        }
      }
    }
    stage ('Build') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorMessage && isDeploymentBranch(); } }
      steps {
        script {
          try {
            nodejs(nodeJSInstallationName: '10.6.0') {
              withCredentials([file(credentialsId: "${getPrefix()}${SITE_NAME}", variable: 'env')]) {
                sh "cp \$env .env 2>commandResult"
              }
              sh 'yarn build 2>commandResult'
            }
          } catch (e) {
            if (!errorMessage) {
              errorMessage = "Failed while building.\n\n${readFile('commandResult').trim()}\n\n${e.message}"
            }
            currentBuild.currentResult = 'FAILURE'
          }
        }
      }
    }
    stage ('Upload Archive') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorMessage && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // Create archive
            sh 'mkdir -p ./ARCHIVE 2>commandResult'
            sh 'mkdir -p ./ARCHIVE/server 2>commandResult'
            sh 'mkdir -p ./ARCHIVE/server/client 2>commandResult'
            sh 'mv node_modules/ ARCHIVE/ 2>commandResult'
            sh 'mv dist/* ARCHIVE/server/ 2>commandResult'
            sh 'mv build/* ARCHIVE/server/client/ 2>commandResult'
            sh 'mv .env ARCHIVE/ 2>commandResult'
          } catch (e) {
            if (!errorMessage) {
              errorMessage = "Failed while uploading archive.\n\n${readFile('commandResult').trim()}\n\n${e.message}"
            }
            currentBuild.currentResult = 'FAILURE'
          }
        }
      }
    }
    stage ('Deploy') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorMessage && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // Deploy app
            def SITE = "${getPrefix()}${SITE_NAME}"
            sh "rsync -azP ARCHIVE/ root@jana19.org:/var/www/$SITE/"
            try {
              sh "ssh root@jana19.org 'pm2 stop $SITE'"
              sh "ssh root@jana19.org 'env \$(cat /var/www/$SITE/.env) pm2 reload $SITE --update-env'"
              sh "ssh root@jana19.org 'pm2 restart $SITE'"
            } catch (e) {
              sh "ssh root@jana19.org 'env \$(cat /var/www/$SITE/.env) pm2 start /var/www/$SITE/server/server.js --name $SITE'"
            }
          } catch (e) {
            if (!errorMessage) {
              errorMessage = "Failed while deploying.\n\n${readFile('commandResult').trim()}\n\n${e.message}"
            }
            currentBuild.currentResult = 'FAILURE'
          }
        }
      }
    }
  }
  post {
    always {
      notifySlack message: errorMessage, channel: SLACK_CHANNEL
      cleanWs() // Recursively clean workspace
    }
  }
}