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
        script {
            props=readProperties file:'application.properties';
            env['VERSION']=props['VERSION'];
        }
        // props = readProperties(file: 'application.properties')
        echo env.VERSION
      }
    }
    stage('Deploy') {
      agent {
        label 'docker'
      }
      steps {
        echo env.VERSION
      }
    }
  }
}