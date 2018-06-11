pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.ci'
      args '-v /etc/group:/etc/group:ro ' +
           '-v /etc/passwd:/etc/passwd:ro ' +
           '-v /var/lib/jenkins:/var/lib/jenkins '

    }
  }

  stages {
    stage('Build') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'github-jsnewby-userpass',
          usernameVariable: 'GIT_USERNAME',
          passwordVariable: 'GIT_PASSWORD')]) {
            sh 'scripts/build-android.sh'
        }
      }
    }
    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'platforms/android/build/outputs/apk/debug/android-debug.apk', fingerprint: true
      }
    }
  }
}
