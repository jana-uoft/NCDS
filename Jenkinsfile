#!groovy

def errorOccured = false // Used to check buildStatus during any stage

def isDeploymentBranch(){
  return CURRENT_BRANCH==PRODUCTION_BRANCH || CURRENT_BRANCH==DEVELOPMENT_BRANCH;
}

def getPrefix() {
  return CURRENT_BRANCH==DEVELOPMENT_BRANCH ? 'dev.' : '';
}

pipeline {
  // construct global env variables
  environment {
    SITE_NAME = 'nainativucds.org' // Name will be used for archive file (with prefix 'dev.' if DEVELOPMENT_BRANCH)
    PRODUCTION_BRANCH = 'master' // Source branch used for production
    DEVELOPMENT_BRANCH = 'new' // Source branch used for development
    SLACK_CHANNEL = '#builds' // Slack channel to send build notifications
    CURRENT_BRANCH = env.GIT_BRANCH.getAt((env.GIT_BRANCH.indexOf('/')+1..-1)) // (eg) origin/master: get string after '/'
    COMMIT_MESSAGE = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim() // Auto generated
    COMMIT_AUTHOR = sh(returnStdout: true, script: 'git --no-pager show -s --format=%an').trim() // Auto generated
  }
  agent any
  stages {
    stage('Start') {
      steps {
        notifySlack() // Send 'Build Started' notification
        sh 'printenv'
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
          } catch (e) { if (!errorOccured) { errorOccured = "Failed while installing node packages.\n\n${readFile('commandResult').trim()}\n\n${e.message}"} }
        }
      }
    }
    stage ('Test') {
      // Skip stage if an error has occured in previous stages
      when { expression { return !errorOccured; } }
      steps {
        // Test
        script {
          try {
            nodejs(nodeJSInstallationName: '10.6.0') {
              // sh 'yarn test 2>commandResult'
            }
          } catch (e) { if (!errorOccured) {errorOccured = "Failed while testing.\n\n${readFile('commandResult').trim()}\n\n${e.message}"} }
        }
      }
      post {
        always {
          // Publish junit test results
          junit testResults: 'junit.xml', allowEmptyResults: true
          // Publish clover.xml and html(if generated) test coverge report
          // step([
          //   $class: 'CloverPublisher',
          //   cloverReportDir: 'coverage',
          //   cloverReportFileName: 'clover.xml',
          //   failingTarget: [methodCoverage: 75, conditionalCoverage: 75, statementCoverage: 75]
          // ])
          // script {
          //   if (!errorOccured && currentBuild.resultIsWorseOrEqualTo('UNSTABLE')) {
          //     errorOccured = "Insufficent Test Coverage."
          //   }
          // }
        }
      }
    }
    stage ('Build') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorOccured && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // Build
            nodejs(nodeJSInstallationName: '10.6.0') {
              sh 'yarn client-build 2>commandResult'
              sh 'yarn server-build 2>commandResult'
            }
          } catch (e) { if (!errorOccured) {errorOccured = "Failed while building.\n\n${readFile('commandResult').trim()}\n\n${e.message}"} }
        }
      }
    }
    stage ('Upload Archive') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorOccured && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // Create archive
            sh 'mkdir -p ./ARCHIVE 2>commandResult'
            sh 'mkdir -p ./ARCHIVE/server 2>commandResult'
            sh 'mkdir -p ./ARCHIVE/client 2>commandResult'
            sh 'mv node_modules/ ARCHIVE/ 2>commandResult'
            sh 'mv dist/* ARCHIVE/server/ 2>commandResult'
            sh 'mv build/* ARCHIVE/client/ 2>commandResult'
            withCredentials([file(credentialsId: "${getPrefix()}${SITE_NAME}", variable: 'env')]) {
              sh "cp \$env ARCHIVE/.env 2>commandResult"
            }
            // sh "cd ARCHIVE && tar zcf ${getPrefix()}${SITE_NAME}.tar.gz * --transform \"s,^,${getPrefix()}${SITE_NAME}/,S\" --exclude=${getPrefix()}${SITE_NAME}.tar.gz --overwrite --warning=none && cd .. 2>commandResult"
            // Upload archive to server
            // sh "scp ARCHIVE/${getPrefix()}${SITE_NAME}.tar.gz root@jana19.org:/root/ 2>commandResult"
          } catch (e) { if (!errorOccured) {errorOccured = "Failed while uploading archive.\n\n${readFile('commandResult').trim()}\n\n${e.message}"} }
        }
      }
    }
    stage ('Deploy') {
      // Skip stage if an error has occured in previous stages or if not isDeploymentBranch
      when { expression { return !errorOccured && isDeploymentBranch(); } }
      steps {
        script {
          try {
            // Deploy app
            def SITE = "${getPrefix()}${SITE_NAME}"
            sh "rsync -azP ARCHIVE/ root@jana19.org:/var/www/$SITE/"
            sh "ssh root@jana19.org pm2 stop $SITE"
            sh "ssh root@jana19.org env \$(cat /var/www/$SITE/.env) pm2 start /var/www/$SITE/server/server.js --name $SITE"
            sh "ssh root@jana19.org env \$(cat /var/www/$SITE/.env) pm2 reload $SITE --update-env"
            sh "ssh root@jana19.org pm2 restart $SITE"
          } catch (e) { if (!errorOccured) {errorOccured = "Failed while deploying.\n\n${readFile('commandResult').trim()}\n\n${e.message}"} }
        }
      }
    }
  }
  post {
    always {
      cleanWs() // Recursively clean workspace
      notifySlack(errorOccured) // Send final 'Success/Failed' message based on errorOccured.
    }
  }
}