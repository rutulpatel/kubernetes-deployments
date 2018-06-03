pipeline {
  agent {
    label 'master'
  }

  environment {
    DOCKER_CREDS = credentials("docker-hub-credentials");
  }

  stages {
    stage('Load configurations') {
      agent {
        label 'master'
      }
      steps {
        script {
            def config = readJSON file:'properties.JSON';
            env['config'] = config;
        }
        echo env.config
        echo env.config["VERSION"]
      }
    }

    stage('Build image') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Building docker image for ' ${env.config.VERSION} ' version.'"
        echo env.config
        sh "docker build -t ${env.config.IMAGE_NAME}:${env.config.VERSION} -t ${env.config.IMAGE_NAME}:latest ."
        echo "Successfully built docker images..."
      }
    }

    stage('Push image') {
      agent {
        label 'docker'
      }
      steps {
        echo "Pushing docker images to docker hub registry"
        sh "docker login -u ${DOCKER_CREDS_USR} -p ${DOCKER_CREDS_PSW}"
        sh "docker push ${env.config.IMAGE_NAME}:${env.config.VERSION}"
        sh "docker push ${env.config.IMAGE_NAME}:latest"
        echo "Successfully pushed docker images..."
      }
    }

    stage('Deploy app') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Deploying version:' ${env.config.VERSION}"
        echo env.config
      }
    }
  }
}