pipeline {
  agent {
    label 'master'
  }
  stages {
    stage('Get version') {
      agent {
        docker {
          image 'node:10-alpine'
        }

      }
      steps {
        sh 'node --version'
      }
    }
    stage('Build') {
      agent {
        label 'docker'
      }
      steps {
        readProperties(file: 'application.properties')
      }
    }
  }
}