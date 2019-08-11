/** 
* Name : Low Zi Jian
*Reg . No . : 16UEB03295
*/

import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);


export default class Database {

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
    } else {
      console.log("Database was not OPENED");
    }
  };

  errorCB(err) {
    console.log('SQL Error: ' + err);
  }

  getAllMovie() {
    return new Promise((resolve) => {
        SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM movies ORDER BY release_date DESC' , []).then(([tx,results]) => {
              movies=results.rows.raw()
              console.log(movies)
              resolve(movies);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }

  listOneMovie(id){
    return new Promise((resolve) => {
        SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM movies WHERE id = ?' , [id]).then(([tx,results]) => {
              movie =results.rows.item(0)
              console.log(movie)
              resolve(movie);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });  
  }


  addMovie(newMovie){
    return new Promise((resolve) => {
        SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}).then((DB) => {
        db = DB;
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO movies (title,language,release_date) VALUES(?,?,?)', [
            newMovie.title,
            newMovie.language,
            newMovie.release_date,
          ])
          .then(([tx, results]) => {
            resolve(results);
          });
        })
    });   
  })
  }
}