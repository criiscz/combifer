
 pipeline {
     agent any
     stages {
//          stage('Package') {
//              steps {
//                  sh 'cd crm_backend;sbt assembly'
//              }
//          }
        stage('Deploy') {
               steps {   
                   sh 'pwd'
                   sh 'scp -i "back-scala.pem" crm_backend/target/scala-3.2.2/back.jar ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com:~/'
               }
         }
         stage('RunApp') {
               steps {
                   sh 'pwd'
                   sh 'ssh -i "back-scala.pem" ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com;cd ~/;java -jar back.jar'
               }
         }
     }
 }
