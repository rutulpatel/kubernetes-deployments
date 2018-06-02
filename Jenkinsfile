pipeline {
    agent {
        label "master"
    }
    stages {
        stage ('Get version') {
            agent {
                docker { image 'node:10-alpine'}
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
                props = readProperties file: './application.properties'
                echo "props"
                echo $props
                echo "version"
                // echo $VERSION
                
            }
        }
    }

    // environment {
        
    //     // def VERSION = props['VERSION']
    // }
}