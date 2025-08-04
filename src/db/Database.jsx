import SQLight from '@types/react-native-sqlite-storage';

// db creation

const db = SQLight.openDatabase(
  {
    name: 'studentaap.db',
    location: 'default',
  },
  () => {
    console.log('database created');
  },
  error => {
    console.log('error occured: ', error);
  },
);

// table creation

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
        CREATE TABLE IF NOT EXIST courses (
            id INTEGER PRIMARY KEY AUTO INCREMENT,
            name TEXT NOT NULL,
            fees INTEGER
        );
    `);
    tx.executeSql(`
        CREATE TABLE IF NOT EXIST subjects (
            id INTEGER PRIMARY KEY AUTO INCREMENT,
            name TEXT NOT NULL,
            course_id INTEGER,
            FOREIGN KEY(course_id) REFERENCES courses(id)
        );
    `);
  });
};

//CRUD

export const insertCourse = (name, fees, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO courses (name,fees) VALUES (?,?)',
      [name, fees],
      (_, res) => {
        success(res);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};
