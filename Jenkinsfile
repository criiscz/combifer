
//pipeline {
//  agent any
//  stages {
//    stage('hello') {
//      steps {
//        sh 'echo "Hello World"'
//      }
//    }
//  }
//}
//-------------


 pipeline {
     agent any
     stages {
         stage('Compile') {
             steps {
                 sh 'sbt compile'
             }
         }
//         stage('Test') {
//             steps {
//                 sh 'sbt test'
//             }
//         }
         stage('Package') {
             steps {
                 sh 'sbt assembly'
             }
         }
//         stage('Deploy') {
//             steps {
//                 sh 'ssh usuario@servidor "mkdir /ruta/de/destino"'
//                 sh 'scp target/myproject-assembly-1.0.jar usuario@servidor:/ruta/de/destino'
//             }
//         }
     }
 }
