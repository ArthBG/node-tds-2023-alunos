import { StudentsRepository } from "../models/students/StudentsRepository.js";
import { Student } from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
  const students = await studentsRepository.getStudents();
  if (students.length) {
    return res.status(200).json(students);
  }
  return res.status(200).json({ message: "Não há estudantes cadastrados" });
} catch (error) {
  console.log("Failed to get students", error);
  return res.status(500).send({ message: "Erro ao buscar estudantes", error: error.message });
}
};

export const getStudent = async (req, res) => {
  try {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  return res.send(student);
} catch (error) {
  console.log("Failed to get student by id", error);
  return res.status(500).send({ message: "Erro ao buscar estudante por ID", error: error.message });
}
};

export const createStudent = async (req, res) => {
  try {
  const { name, age, email, code, grade } = req.body;

  const emailAlreadyExists = await studentsRepository.getStudentByEmail(email);
  const codeAlreadyExists = await studentsRepository.getStudentByCode(code);

  if (emailAlreadyExists) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }
  if (codeAlreadyExists) {
    return res.status(409).send({ message: "Código já cadastrado" });
  }
  const student = new Student(name, age, email, code, grade);

  await await studentsRepository.addStudent(student);

  return res.status(201).send(student);
} catch (error) {
  console.log("Failed to create student", error);
  return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
}
};

export const updateStudent = async (req, res) => {
  try {
  const { id } = req.params;
  const { name, age, email, code, grade } = req.body;

  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  await studentsRepository.updateStudent(id, name, age, email, code, grade);

  return res.send(student);
} catch (error) {
  console.log("Failed to update student", error);
  return res.status(500).send({ message: "Erro ao atualizar estudante", error: error.message });
}
};

export const deleteStudent = async (req, res) => {
  try {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  await studentsRepository.deleteStudent(id);

  return res.send(student);
} catch (error) {
  console.log("Failed to delete student", error);
  return res.status(500).send({ message: "Erro ao deletar estudante", error: error.message });
}
};
