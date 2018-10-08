#!groovy

@Library('notifySlack') _

def errorMessage = "" // Used to check buildStatus during any stage

def isDeploymentBranch(){
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==env.PRODUCTION_BRANCH || currentBranch==env.DEVELOPMENT_BRANCH;
}

def getPrefix() {
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==env.DEVELOPMENT_BRANCH ? 'dev.' : '';
}

pipeline {
  // construct global env variables
  environment {
    SITE_NAME = 'nainativucds.org' // Name will be used for archive file (with prefix 'dev.' if DEVELOPMENT_BRANCH)
    PRODUCTION_BRANCH = 'master' // Source branch used for production
    DEVELOPMENT_BRANCH = 'dev' // Source branch used for development
    SLACK_CHANNEL = '#builds' // Slack channel to send build notifications
  }
  agent any
  stages {
    stage ('Environment') {
      steps {
        sh 'git --version'
        echo "Branch: ${env.BRANCH_NAME}"
        sh 'docker -v'
        sh 'printenv'
      }
    }

    stage('Test'){
      steps {
        echo 'No tests yet.'
      }
    }

    stage ('Build') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorMessage && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // withCredentials([file(credentialsId: "${getPrefix()}${env.SITE_NAME}", variable: 'env')]) {
            //   sh "cp \$env .env"
            // }
            // sh "echo name=${getPrefix()}${env.SITE_NAME} >> .env"
            // sh 'env $(cat .env) envsubst < pm2.config.js > pm2.config.js.replaced'
            // sh 'rm pm2.config.js && mv pm2.config.js.replaced pm2.config.js'
            // sh 'cat pm2.config.js'
            sh "docker build -t ${getPrefix()}${env.SITE_NAME} --no-cache --rm ."
          } catch (e) {
            if (!errorMessage) {
              errorMessage = "Failed while building.\n\n${readFile('commandResult').trim()}\n\n${e.message}"
            }
            currentBuild.currentResult = 'FAILURE'
          }
        }
      }
    }

    stage('Deploy') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorMessage && isDeploymentBranch(); } }
      steps {
        sh "docker image tag ${getPrefix()}${env.SITE_NAME} registry.jana19.org/${getPrefix()}${env.SITE_NAME}"
        sh "docker push registry.jana19.org/${getPrefix()}${env.SITE_NAME}"
        sh "docker rmi ${getPrefix()}${env.SITE_NAME}"
        sh "docker rmi registry.jana19.org/${getPrefix()}${env.SITE_NAME}"
      }
    }
  }
  post {
    always {
      notifySlack message: errorMessage, channel: env.SLACK_CHANNEL
      cleanWs() // Recursively clean workspace
      sh 'docker container prune -f'
      sh 'docker image prune -f'
      sh 'docker volume prune -f'
    }
  }
}