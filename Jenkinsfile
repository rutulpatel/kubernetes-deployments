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
            def config = readProperties file:'application.properties';
            env['config'] = config;
            env['VERSION'] = config['VERSION'];
        }
        echo env.VERSION
        echo env.config
      }
    }
    stage('Build') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Building version:' ${env.VERSION}"
        echo env.config
        // sh "docker build -t "
      }
    }
    stage('Deploy') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Deploying version:' ${env.VERSION}"
      }
    }
  }
}