
 pipeline {
     agent any
     stages {
         stage('Package') {
             steps {
                 sh 'sbt assembly'
             }
         }
        stage('Deploy') {
               steps {                   
                   sh 'scp -i "back-scala.pem" target/scala-3.2.2/back.jar ec2-user@ec2-100-26-170-8.compute-1.amazonaws.com:~/backend'
               }
           }
     }
 }
