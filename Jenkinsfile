pipeline {
    agent none
    stages {
        stage ('Get version') {
            agent {
                docker { image 'node:9.11.alpine'}
            }
            steps {
                sh 'node --version'
            }
        }
        stage ('Build') {
            agent {
                label "docker"
            }
            steps {
                //sh 'docker build -t '
                echo "props"
                echo $props
                echo "version"
                echo $VERSION
                
            }
        }
    }

    environment {
        def props = readProperties file:'./application.properties'
        def VERSION = props['VERSION']
    }
}