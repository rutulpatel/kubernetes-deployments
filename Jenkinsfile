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
                script {
                    sh "ls"
                    d = [test: 'Default', something: 'Default', other: 'Default']
                    props = readProperties defaults: ${d}, file: 'dir/my.properties', text: 'other=Override'
                    //props = readProperties file: './application.properties'
                    echo "props"
                    sh "echo ${props}"
                    echo "version"
                    
                }
                // echo $VERSION
                
            }
        }
    }

    // environment {
        
    //     // def VERSION = props['VERSION']
    // }
}