pipeline {  
    agent any  
    stages {  
        stage('Build') {  
            steps {  
                sh 'npm install'  
                sh 'CI=false npm run build'  
            }  
        }  
        stage('Docker Build') {  
            steps {  
                sh 'docker build -t shop-react-demo .'  
            }  
        }  
        stage('Deploy') {  
            steps {  
                sh 'docker stop shop-react-demo || true'  
                sh 'docker rm shop-react-demo || true'  
                sh 'docker run -d -p 80:80 -p 443:443 --name shop-react-demo shop-react-demo'  
            }  
        }  
    }  
}