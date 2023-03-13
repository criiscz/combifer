
 pipeline {
     agent any
     stages {
//          stage('Package') {
//              steps {
//                  sh 'cd crm_backend;sbt assembly'
//              }
//          }
//         stage('Deploy') {
//                steps {                   
//                    sh 'scp -i "back-scala.pem" target/scala-3.2.2/back.jar ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com:~/backend'
//                }
//          }
         stage('RunApp') {
               steps {
                   sh 'pwd'
                   sh 'ssh -i "back-scala.pem" ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com;cd ~/backend;java -jar back.jar'
               }
         }
     }
 }
