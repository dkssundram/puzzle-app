const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
// const session = require('cookie-session');
const path = require('path');
let alert = require('alert');
// var popup = require('popups');



const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
const app = express();

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const { error } = require('console');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});


app.use(express.static(__dirname + '/public'));

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});


app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});



app.post('/admin', function(request, response) {
	let email = request.body.email;
	let password = request.body.password;
	if (email && password) {
		connection.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/admind');
			} else {
				response.send('Incorrect Emailid and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Emailid and Password!');
		response.end();
	}
});

app.get('/admind', function(request, response) {
    if (request.session.loggedin) { 

        connection.query('SELECT * FROM accounts', function(error, results, fields) {
           if (error) throw error;
        response.render(__dirname + '/admind.ejs', { accounts: results });
    });
    }
    else{
        response.send('Error 404<br>Page Not Found')
    }
});


app.post('/register', function(request, response) {
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    if (username && email && password) {
      connection.query('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
        if (error) throw error;
        
        if (results.length > 0) {
          response.send('Username or email already exists!');
          response.end();
        } else {
          connection.query('INSERT INTO accounts (username, email, password, score, incorrect, accuracy) VALUES (?, ?, ?, 0, 0, 0)', [username, email, password], function(error, results, fields) {
            if (error) throw error;
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
          });
        }
      });
    } else {
      response.send('Please enter all fields!');
      response.end();
    }
  });



let count = 1;
let correct = 0;
let incorrect = 0;
let id = 0;

app.get('/play', (req, res) => {
    
    let question1='';
    if (req.session.loggedin) { 
        
        var sql = 'SELECT question FROM questionbank where qno='+ count;
        connection.query(sql, function(error, result){
            if (error) throw error;
            question1 = (result[0].question);
        const ques = {
            name : req.session.username,
            quesNo : count,
            correctCount : correct,
            ques : question1
            

        };
        res.render(__dirname + '/play.ejs', ques);});
    };
}
);
let answer1;
app.post('/play', function(request, response) {
    let answ = request.body.ans;
    var sql = 'SELECT answer FROM questionbank where qno='+count;
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        

        answer1 = results[0].answer;
        if(answer1==answ){
            count++;
            correct++;
            let accuracy = correct/(correct+incorrect)*100;
            var sql ='UPDATE accounts SET score = '+correct+ ', accuracy = '+accuracy+' where username = '+"'"+request.session.username+"'";
            connection.query(sql, function(error, results, fields){
                if(error) throw error;
            });
            if(correct == 5){
                const summary = {
                    name : request.session.username,
                    correct : correct,
                    incorrect : incorrect,
                    accuracy : accuracy
                }
                response.render(__dirname + '/result.ejs', summary);
            }
            else{
                response.redirect('/play');
            }
        }
        else{
            alert('Incorrect Answer');
            // popup.alert({
            //   content : 'Incorrect Answer'
            // });
            incorrect++;
            let accuracy = correct/(correct+incorrect)*100;
            var sql ='UPDATE accounts SET incorrect = '+incorrect+ ', accuracy = '+accuracy+' where username = '+"'"+request.session.username+"'";
            connection.query(sql, function(error, results, fields){
                if(error) throw error;
            });

        }
    console.log(answ);
    });

});

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;

				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/restart', (req, res) => {
    {
        count=1;
        correct=0;
        incorrect=0;
        res.redirect('/dashboard');
    }
      
});


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
      } else {
        count=1;
        correct=0;
        incorrect=0;
        res.redirect('/');
      }
    });
  });

  app.post('/restart', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
      } else {
        count=1;
        correct=0;
        incorrect=0;
        res.redirect('/dashboard');
      }
    });
  });
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.redirect('/dashboard');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});



app.get('/dashboard', function(request, response) {
    if (request.session.loggedin) { 
        var sql = 'SELECT * FROM accounts where username = '+ "'" +request.session.username+ "'";
        connection.query(sql, function(error, results, fields){
        if (error) throw error;
        response.render(__dirname + '/dashboard.ejs', { accounts: results });

    });
    }
    else{
        response.send('Error 404<br>Page Not Found')
    }
});

app.listen(3000);