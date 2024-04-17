import pg from "../../database/index.js";

export class StudentsRepository {
  constructor() {
    this.pg = pg;
  }

  async getStudents() {
    try{
      const allStudents = await this.pg.manyOrNone("SELECT * FROM students");
      return allStudents;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE id = $1", [id]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByEmail(email) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE email = $1", [email]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByCode(code) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE code = $1", [code]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async addStudent(student) {
    try {
      await this.pg.none("INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [
        student.id,
        student.name,
        student.age,
        student.email,
        student.code,
        student.grade,
      ]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
    const student = this.getStudentById(id);

    if (student) {
      student.name = name;
      student.age = age;
      student.email = email;
      student.code = code;
      student.grade = grade;
    }

    return student;
  } catch (error) {
    throw error;
  }
};

  async deleteStudent(id) {
    try {
      const student = this.getStudentById(id);
      if (student) {
        await this.pg.none("DELETE FROM students WHERE id = $1", [id]);
      }
    } catch (error) {
      throw error;
    }
  }
}
