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
            env['VERSION'] = properties.VERSION;
            env['IMAGE_NAME'] = properties.IMAGE_NAME;
        }
      }
    }

    stage('Build image') {
      agent {
        label 'docker'
      }
      steps {
        sh "echo 'Building docker image for ' ${env.VERSION} ' version.'"
        sh "docker build -t ${env.IMAGE_NAME}:${env.VERSION} -t ${env.IMAGE_NAME}:latest ."
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
        sh "docker push ${env.IMAGE_NAME}:${env.VERSION}"
        sh "docker push ${env.IMAGE_NAME}:latest"
        echo "Successfully pushed docker images..."
      }
    }

    stage('Deploy app') {
      agent {
        label 'kubernetes'
      }
      steps {
        parallel (
        "Deployment version" {
          sh "echo 'Deploying version:' ${env.VERSION}"
        }
        "Get Nodes" {
          echo "get nodes"
          sh "kubectl get nodes"
        },
        "Get pods" {
          echo "get pods"
          sh "kubectl get pods"
        }
      )
      }
    }
  }
}