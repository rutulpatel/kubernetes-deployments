pipeline {
  agent {
    label 'master'
  }

  environment {
    DOCKER_CREDS = credentials("docker-hub-credentials");
    PROPERTIES = {};
  }

  stages {
    stage('Load configurations') {
      agent {
        label 'master'
      }
      steps {
        script {
            def properties = readJSON file:'./properties.json';
            PROPERTIES = properties;
            env['properties'] = properties;
        }
        echo env.properties
        echo PROPERTIES
        echo PROPERTIES.VERSION
        // echo env.properties.VERSION
      }
    }

    stage('Build image') {
      agent {
        label 'docker'
      }
      steps {
        echo PROPERTIES
        echo PROPERTIES.VERSION
        sh "echo 'Building docker image for ' ${env.properties.VERSION} ' version.'"
        echo env.properties
        sh "docker build -t ${env.properties.IMAGE_NAME}:${env.properties.VERSION} -t ${env.properties.IMAGE_NAME}:latest ."
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
        sh "docker push ${env.properties.IMAGE_NAME}:${env.properties.VERSION}"
        sh "docker push ${env.properties.IMAGE_NAME}:latest"
        echo "Successfully pushed docker images..."
      }
    }

    stage('Deploy app') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Deploying version:' ${env.properties.VERSION}"
        echo env.properties
      }
    }
  }
}