"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];

//The prototype for the students
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  image: "",
  house: ""
};

function start() {
  //console.log("ready");
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("students.json");
  const jsonData = await response.json();
  prepareObjects(jsonData);
  console.log(jsonData);
}
function prepareObjects(jsonData) {
  allStudents = jsonData.map(prepareObject);
  displayList(allStudents);
}

function prepareObject(jsonObject) {
  const student = Object.create(Student);
  //Get Full Name and Trim
  const fullName = jsonObject.fullname;
  const trimmedName = fullName.trim();
  //Get First Nanme and Capitalize
  const names = trimmedName.split(" ");
  student.firstName = names[0];
  const firstName = student.firstName.charAt(0).toUpperCase() + student.firstName.slice(1).toLowerCase();
  student.firstName = firstName;

  // Set Middle Name
  if (names.length === 3) {
    student.middleName = names[1];
    const middleName = student.middleName.charAt(0).toUpperCase() + student.middleName.slice(1).toLowerCase();
    student.middleName = middleName;
  } else if (names.length === 2) {
    delete student.middleName;
  }
  //Set last Name
  if (names.length === 3) {
    student.lastName = names[2];
  } else if (names.length === 2) {
    student.lastName = names[1];
  }

  const lastName = student.lastName.charAt(0).toUpperCase() + student.lastName.slice(1).toLowerCase();
  student.lastName = lastName;

  //Find Nickname and Remove Quotes
  if (student.middleName.startsWith(`"`)) {
    student.nickName = names[1];
    const newNick = student.nickName.substring(1, student.nickName.length - 1);
    const upperNick = newNick.charAt(0).toUpperCase() + newNick.slice(1).toLowerCase();
    student.nickName = upperNick;
    delete student.middleName;
  } else {
    delete student.nickName;
  }
  //Set House and Capitalize
  const studentHouse = jsonObject.house;
  const trimmedHouse = studentHouse.trim();
  const upperHouse = trimmedHouse.charAt(0).toUpperCase() + trimmedHouse.slice(1).toLowerCase();
  student.house = upperHouse;
  return student;
}

// build a new list
function displayList(students) {
  students.forEach(displayStudent);
}

function displayStudent(student) {
  //console.log(student);
  const clone = document.querySelector("template.student").content.cloneNode(true);

  clone.querySelector(".student-name span").textContent = student.firstName;
  clone.querySelector(".student-middle-name span ").textContent = student.middleName;
  clone.querySelector(".student-last-name span").textContent = student.lastName;
  clone.querySelector(".student-nick-name span").textContent = student.nickName;
  clone.querySelector(".house span").textContent = student.house;
  console.log(student);

  document.querySelector(".students").appendChild(clone);
}
