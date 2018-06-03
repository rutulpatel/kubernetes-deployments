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
            def properties = readJSON file:'./properties.json';
            env['PROPERTIES'] = properties;
        }
      }
    }

    stage('Build image') {
      agent {
        label 'docker'
      }
      steps {
        // converting env string variable to json
        properties = readJSON text: env.properties
        sh "echo 'Building docker image for ' ${properties.VERSION} ' version.'"
        echo properties
        sh "docker build -t ${properties.IMAGE_NAME}:${properties.VERSION} -t ${properties.IMAGE_NAME}:latest ."
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