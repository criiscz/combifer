
 pipeline {
     agent any
     stages {
//          stage('Package') {
//              steps {
//                  sh 'cd crm_backend;sbt assembly'
//              }
//          }
         stage('GivePrivileges') {
               steps {   
                   sh 'pwd'
                   // 'ssh-keygen'
                   
                   // 'scp -i "back-scala.pem" crm_backend/target/scala-3.2.2/back.jar ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com:~/'
                   //sh 'scp -o StrictHostKeyChecking=no -i "back-scala.pem" crm_backend/backk.jar  ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com:~/backk.jar'
                   //sh 'scp -o StrictHostKeyChecking=no crm_backend/back.jar  ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com:~/back.jar'
                sh 'cat ~/.ssh/id_rsa.pub'
               }
         }
        stage('Deploy') {
               steps {   
                   sh 'pwd'
                   // 'scp -i "back-scala.pem" crm_backend/target/scala-3.2.2/back.jar ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com:~/'
                   //sh 'scp -o StrictHostKeyChecking=no -i "back-scala.pem" crm_backend/backk.jar  ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com:~/backk.jar'
                   sh 'scp -o StrictHostKeyChecking=no crm_backend/back.jar  ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com:~/back.jar'
                // 'cat ~/.ssh/id_rsa.pub'
               }
         }
         stage('RunApp') {
               steps {
                   sh 'pwd'
                   // 'ssh -i "back-scala.pem" ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com;cd ~/;java -jar back.jar'
                   //sh 'ssh -i "back-scala.pem" ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com'
                   sh 'ssh -tt ec2-user@ec2-34-229-72-83.compute-1.amazonaws.com;java -jar back.jar &'
                   sh 'pwd'
                   //sh 'java -jar back.jar &'
               }
         }
     }
 }
