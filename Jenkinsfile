pipeline {
  agent {
    label 'master'
  }
  stages {
    stage('Load configurations') {
      agent {
        label 'master'
      }
      steps {
        script {
            def props = readProperties file:'application.properties';
            env['VERSION'] = props['VERSION'];
        }
        echo env.VERSION
      }
    }
    stage('Build') {
      agent {
        label 'docker'
      }
      steps {
        sh 'echo "Building version:" env.VERSION'
      }
    }
    stage('Deploy') {
      agent {
        label 'docker'
      }
      steps {
        sh 'echo "Deploying version:" env.VERSION'
      }
    }
  }
}