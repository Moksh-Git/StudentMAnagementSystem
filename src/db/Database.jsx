import SQLite from 'react-native-sqlite-storage';

// db creation

const db = SQLite.openDatabase(
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
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            fees INTEGER
        );
    `);
    tx.executeSql(`
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            course_id INTEGER,
            FOREIGN KEY(course_id) REFERENCES courses(id)
        );
    `);

    tx.executeSql(`
        CREATE TABLE IF NOT EXISTS students(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          course_id INTEGER,
          FOREIGN KEY(course_id) REFERENCES courses(id)
        );
    `)

    tx.executeSql(`
        CREATE TABLE IF NOT EXISTS attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER,
          date TEXT,
          status TEXT,
          FOREIGN KEY (student_id) REFERENCES students(id)
        );
    `)

    // db.transaction(tx => {
    //   tx.executeSql('DROP TABLE IF EXISTS students');
    // });
  });
};

//CRUD
// 1. Insert Operation
export const insertCourse = (name, fees, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM courses WHERE name=?',
      [name],
      (_, { rows }) => {
        if (rows.length > 0) {
          error('course already exist');
        } else {
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
        }
      },
      (_, err) => error(err),
    );
  });
};

// 2.Reading Operation
export const getCourses = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM courses', [], (_, { rows }) => {
      const result = [];
      for (let i = 0; i < rows.length; i++) {
        result.push(rows.item(i));
      }
      callback(result);
    });
  });
};

// 3.Deleting operation
export const deleteCourse = (id, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM courses WHERE id=?',
      [id],
      res => {
        success(res);
      },
      err => {
        error(err);
      },
    );
  });
};

// Update operation
export const updateCourse = (id, newName, newFees, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM courses WHERE name=? AND id!=?',
      [newName, id],
      (_, { rows }) => {
        if (rows.length > 0) {
          error('course with this name already exist');
        } else {
          tx.executeSql(
            'UPDATE courses SET name =?, fees=? Where id=?',
            [newName, newFees, id],
            (_, res) => {
              success(res);
            },
            (_, er) => {
              error(er);
            },
          );
        }
      },
      (_, err) => {},
    );
  });
};

export const insertSubject = (name, courseId, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE name=? AND course_id=?',
      [name, courseId],
      (_, { rows }) => {
        if (rows.length > 0) {
          error('Subject Already exists');
        } else {
          tx.executeSql(
            'INSERT INTO subjects (name,course_id) VALUES (?,?)',
            [name, courseId],
            (_, res) => {
              success(res);
            },
            (_, err) => {
              error(err);
            },
          );
        }
      },
      err => {
        error(err);
      },
    );
  });
};

export const getSubjects = (success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT subjects.id, subjects.name AS subject_name,courses.name AS course_name FROM subjects INNER JOIN courses ON subjects.course_id=courses.id',
      [],
      (_, { rows }) => {
        const items = [];
        for (let i = 0; i < rows.length; i++) {
          items.push(rows.item(i));
        }
        success(items);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};

export const getSubjectbyCourseId = (courseId, callback, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE course_id = ?',
      [courseId],
      (_, { rows }) => {
        if (rows.length > 0) {
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
          }
          callback(items);
        } else {
          error('no subjects exist in this course');
        }
      },
    );
  });
};

export const insertStudent = (
  name,
  email,
  password,
  courseId,
  success,
  error,
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO students(name,email,password,course_id) VALUES (?,?,?,?)',
      [name, email, password, courseId],
      (_, res) => {
        success(res);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};

export const loginStudent = (email,password,callback,error) => {
  db.transaction(
    tx=>{
      tx.executeSql(
        'SELECT * FROM students WHERE email=? AND password=?',
        [email,password],
        (_,{rows})=>{
          if(rows.length>0){
            callback(rows.item(0))
          }else{
            error("no user found")
          }
        },
        (_,err)=>{
          error("no user found")          
        }
      )
    }
  )
}

export const markAttendance = (date,student_id,status,success,error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM attendance WHERE date=? AND student_id=?',
        [date,student_id],
        (_,{rows})=>{
          if(rows.length>0){
            error("Already Marked Attendence")
          }
          else{
            tx.executeSql(
              'INSERT INTO attendance (student_id,date,status) VALUES (?,?,?)',
              [student_id,date,status],
              (_,res)=>{
                success(res)
              },
              (_,err)=>{
                error(err)
              }
            )
          }
        }
      )
    }
  )
}

export const getAttendanceByMonth = (studentId,month,year,callback,error) => {
  const mMonth = month.toString().padStart(2,'0')
  db.transaction(
    tx => {
      tx.executeSql(
        "SELECT * FROM attendance WHERE student_id=? AND strftime('%m',date)=? AND strftime('%Y',date)=? ORDER BY date ASC",
        [studentId,mMonth,year.toString()],
        (_,{rows})=>{
          const data=[]
          for(let i=0;i<rows.length;i++){
            data.push(rows.item(i))
          }
          callback(data)
        },
        (_,err)=>{
          error(err)
        }
      )
    }
  )
}

export const getCourseDetail = (courseId,callback,error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM courses WHERE id=?',
        [courseId],
        (_,{rows})=>{
          if(rows.length>0){
            callback(rows.item(0))
          }
          else{
            error("course not found")
          }
        },
        (_,err)=>{
          error(err)
        }
      )
    }
  )
}

export const getStudentSubject = (courseId,callback,error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM subjects WHERE course_id=?',
        [courseId],
        (_,{rows})=>{
          if(rows.length>0){
            let data = []
            for(let i=0;i<rows.length;i++){
              data.push(rows.item(i))
            }
            callback(data)
          }
          else{
            error("subjects not found")
          }
        },
        (_,err)=>{
          error(err)
        }
      )
    }
  )
}