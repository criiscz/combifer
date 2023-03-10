
 pipeline {
     agent any
     stages {
         stage('Compile') {
             steps {
                 sh 'sbt compile'
             }
         }
         stage('Package') {
             steps {
                 sh 'sbt assembly'
             }
         }
     }
 }
