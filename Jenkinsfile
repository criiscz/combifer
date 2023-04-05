 pipeline {
     agent any
     stages {
         stage('Test') {
             steps {
                 sh 'cd crm_backend;sbt test'
             }
         }
         stage('Package') {
             steps {
                 sh 'cd crm_backend;sbt assembly'
             }
         }

        stage('Deploy') {
               steps {                                     
                   sh 'scp -o StrictHostKeyChecking=no crm_backend/back.jar  ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com:~/backjar/back.jar'                   
               }
         }
     }
 }
