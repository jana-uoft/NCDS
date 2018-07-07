pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh 'ls -al'
      }
    }
    stage('Sync Files') {
      steps {
        sh 'sudo rsync -a ./ /var/www/nainativucds/'
      }
    }
  }
}