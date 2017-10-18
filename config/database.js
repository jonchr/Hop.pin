// config/database.js

var dbconfig;
    
if(process.env.JAWSDB_URL) { 
    // Heroku database
    dbconfig = {
    	'connection': {
	        'host': "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	        'user': "z91snw0fn36y0hw0",
	        'password': "ntkvx01jri0wxmy2"
	    },
    	'database': "vlu97ud0tq19pc5u",
    	'users_table': 'users'
    }
}
else {
    //Local database
    dbconfig = {
    	'connection': {
	        'host': "localhost",
	        'user': "root",
	        'password': ""
	    },
		'database': "hopin_db",
	    'users_table': 'users'
	}
}

module.exports = dbconfig;
