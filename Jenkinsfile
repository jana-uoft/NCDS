pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh 'yarn build'
      }
    }
    stage('Sync Files') {
      steps {
        sh 'rsync -a ./ /var/www/nainativucds'
      }
    }
  }
}