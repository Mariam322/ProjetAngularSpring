pipeline {
    agent any
    tools {
        jdk 'jdk-17'
    }
    
    stages{
        stage('code'){
            steps {
                git url: 'https://github.com/Mariam322/ProjetAngularSpring.git', branch: 'main'
            }
        }
      stage('Install Stage') {
            steps {
                withMaven(maven: 'maven-3.6.3') {
                    dir('BankProject') {  
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }
        stage('Build imageFront'){
            steps {
                sh 'docker build ./BankprojetFront/ -t mariammseddi12/angular-cicd'
            }
        }
             stage('Build imageBack'){
            steps {
                sh 'docker build ./BankProject/ -t mariammseddi12/spring-cicd'
            }
        }
        stage('Login and Push Image') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'
                withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'DockerHubPassword', usernameVariable: 'DockerHubUsername')]) {
                    sh 'echo $DockerHubPassword | docker login -u $DockerHubUsername --password-stdin'
                    sh 'docker push mariammseddi12/angular-cicd:latest'
                    sh 'docker push mariammseddi12/spring-cicd:latest'
                }
            }
}
        stage('Deploy'){
            steps {
                sh 'docker-compose down && docker-compose up -d'
            }
        }
    }
}
