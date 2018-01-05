# Online Code Executer
An online cloud storage application that allows you store and run Java, C and C++ programs. It can be easily extended to run other type of files. Simply host it somewhere and run your lab experiements on the cloud or even from your phone.

## Getting Started

* Go to root of the project in terminal
```
node bin/www
```

### Prerequisites

* Install Nodejs.
* Install mongodb.
* Install npm.
* Install all the modules which the node server using 
```
> $npm install 
```
run this in the root of project

### Installing


1. navigate to root of the project in terminal and enter  
```
npm install 
```

### Running
These are the 3 major steps you'll have to follow everytime

1. Setting storage path for Mongodb Server. Be sure you set the same path everytime else it will create a new Database which will be very large in size.
```
># mongod --dbpath "<path-to-project>"
```

2. Running the Node Backend Server.
```
># <path-to-project>/Server> node app.js
```

3. Use Xampp or some other webserver to access the webpages in the frontend folder. (Using a server is recommended as some browsers act wierdly when directly opening HTML files and won't allow the pages to communicate to the server)

### Deployment

* To deploy this application on the live system, simply create a Heroku app and upload the file to the heroku server.
* Use some free MongoDB online Server like Mlab.

## Authors

* **Aasim Khan**






















 
