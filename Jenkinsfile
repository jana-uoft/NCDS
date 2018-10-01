#!groovy
import groovy.text.StreamingTemplateEngine


def errorMessage = "" // Used to check buildStatus during any stage

def isDeploymentBranch(){
  def currentBranch = env.BRANCH_NAME.getAt((env.BRANCH_NAME.indexOf('/')+1..-1))
  return currentBranch==env.PRODUCTION_BRANCH || currentBranch==env.DEVELOPMENT_BRANCH;
}

def getPrefix() {
  def currentBranch = env.BRANCH_NAME.getAt((env.BRANCH_NAME.indexOf('/')+1..-1))
  return currentBranch==env.DEVELOPMENT_BRANCH ? 'dev.' : '';
}

node {
  try {
    withEnv([
      'SITE_NAME=nainativucds.org',
      'PRODUCTION_BRANCH=master',
      'DEVELOPMENT_BRANCH=dev',
      'SLACK_CHANNEL=#builds'
    ]) {
      stage('Checkout') {
        checkout scm
      }

      stage('Environment') {
        sh 'git --version'
        echo "Branch: ${env.BRANCH_NAME}"
        sh 'docker -v'
        sh 'printenv'
      }

      stage('Test'){
        echo 'No tests yet.'
      }

      stage('Deploy'){
        if(isDeploymentBranch()){
          withCredentials([file(credentialsId: "${getPrefix()}${env.SITE_NAME}", variable: 'env')]) {
            sh "cp \$env .env 2>commandResult"
          }
          variables = [ "name": "WOOHOO_TESTING" ]
          // template = libraryResource('pm2.config.js.groovy')
          def template = new File('pm2.config.js.groovy').text
          output = helpers.renderTemplate(template, variables)

          echo "$output"

          // sh "docker build -t ${getPrefix()}${env.SITE_NAME} --no-cache ."
          // sh 'docker tag react-app localhost:5000/react-app'
          // sh 'docker push localhost:5000/react-app'
          // sh 'docker rmi -f react-app localhost:5000/react-app'
        }
      }
    }
  }
  catch (Exception ex) {
    throw ex
  }
}
