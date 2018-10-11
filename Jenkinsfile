#!groovy

@Library('notifySlack') _

def errorMessage = "" // Used to check buildStatus during any stage

def isDeploymentBranch(){
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==env.PRODUCTION_BRANCH || currentBranch==env.DEVELOPMENT_BRANCH;
}

def getBuildTag() {
  def currentBranch = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1))
  return currentBranch==env.DEVELOPMENT_BRANCH ? ':development' : ':production';
}

pipeline {
  // construct global env variables
  environment {
    SITE_NAME = 'ncds' // Name will be used for archive file (with prefix 'dev.' if DEVELOPMENT_BRANCH)
    PRODUCTION_BRANCH = 'master' // Source branch used for production
    DEVELOPMENT_BRANCH = 'dev' // Source branch used for development
    SLACK_CHANNEL = '#builds' // Slack channel to send build notifications
  }
  agent any
  stages {
    stage ('Environment') {
      steps {
        sh 'git --version'
        echo "Branch: ${env.GIT_BRANCH}"
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
            sh "docker build -t ${env.SITE_NAME}${getBuildTag()} --no-cache ."
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
        sh "docker image tag ${env.SITE_NAME}${getBuildTag()} registry.jana19.org/${env.SITE_NAME}${getBuildTag()}"
        sh "docker push registry.jana19.org/${env.SITE_NAME}${getBuildTag()}"
        sh "docker rmi ${env.SITE_NAME}${getBuildTag()}"
        sh "docker rmi registry.jana19.org/${env.SITE_NAME}${getBuildTag()}"
      }
    }
  }
  post {
    always {
      notifySlack message: errorMessage, channel: env.SLACK_CHANNEL
      cleanWs() // Recursively clean workspace
      sh 'docker container prune -f'
      sh 'docker image prune -af'
      sh 'docker volume prune -f'
      sh 'docker network prune -f'
    }
  }
}