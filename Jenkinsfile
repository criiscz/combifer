def STAGING_USER = "ec2-user@ec2-3-237-95-49.compute-1.amazonaws.com"
def DEPLOYMENT_USER =  " ec2-user@ec2-23-20-80-13.compute-1.amazonaws.com"

pipeline {
     agent any
     stages {
         stage('Run unit test') {
             steps {
                 sh 'cd crm_backend;sbt test'
             }
         }
         stage('Run sonarqube') {
            agent {
                label "test"
            }
            steps {
                withSonarQubeEnv("sonarqube-9.9.1"){
                    sh "cat sonar-project.properties"
                    sh "/home/ec2-user/install_scanner/sonar-scanner-4.8.0.2856-linux/bin/sonar-scanner"
                }
            }
        }
        stage('Build & Package') {
             steps {
                 sh 'cd crm_backend;sbt assembly'
             }
         }

        stage('Deploy to staging') {
               steps {                                     
                   sh 'scp -o StrictHostKeyChecking=no crm_backend/back.jar ${STAGING_USER}:~/backjar/back.jar'  
               }
         }
        stage('Deploy to production') {
               steps {                                     
                   sh 'scp -o StrictHostKeyChecking=no crm_backend/back.jar ${DEPLOYMENT_USER}:~/backjar/back.jar'  
               }
        }
     }
 }
