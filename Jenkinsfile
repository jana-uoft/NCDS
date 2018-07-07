pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh 'cd ncds && yarn client-build'
      }
    }
    stage('Sync Files') {
      steps {
        sh 'rsync -a ./ncds/ /var/www/nainativucds'
      }
    }
  }
}