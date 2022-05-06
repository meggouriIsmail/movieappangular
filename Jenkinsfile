pipeline {
    agent any
    
    stages {
        stage('install') {
           steps {
               sh 'npm -version'
               sh 'npm install'
           }
        }
        stage('start') {
           steps {
               sh 'npm run-script dev'
           }
        }
    }
    
}
