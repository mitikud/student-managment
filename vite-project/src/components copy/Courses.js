import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  getCourses,
  createCourse,
  enrollStudent,
  getStudents,
  getTeachers,
} from "../api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", teacherId: "" });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [enrollment, setEnrollment] = useState({ courseId: "", studentId: "" });

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      alert("Failed to fetch courses");
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      alert("Failed to fetch students");
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      alert("Failed to fetch teachers");
    }
  };

  const handleCreateCourse = async () => {
    try {
      const course = await createCourse(newCourse);
      setCourses([...courses, course]);
      setNewCourse({ name: "", teacherId: "" });
    } catch (error) {
      alert("Failed to create course");
    }
  };

  const handleEnroll = async () => {
    try {
      await enrollStudent(enrollment.courseId, enrollment.studentId);
      fetchCourses(); // Refresh course list
      setEnrollment({ courseId: "", studentId: "" });
    } catch (error) {
      alert("Failed to enroll student");
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id}>
            <ListItemText
              primary={course.name}
              secondary={`Teacher ID: ${
                course.teacherId
              }, Students: ${course.studentIds.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Course Name"
        value={newCourse.name}
        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Select
        value={newCourse.teacherId}
        onChange={(e) =>
          setNewCourse({ ...newCourse, teacherId: e.target.value })
        }
        fullWidth
        displayEmpty
        margin="normal"
      >
        <MenuItem value="">Select Teacher</MenuItem>
        {teachers.map((teacher) => (
          <MenuItem key={teacher.id} value={teacher.id}>
            {teacher.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleCreateCourse}>
        Add Course
      </Button>

      <h2>Enroll Student</h2>
      <Select
        value={enrollment.courseId}
        onChange={(e) =>
          setEnrollment({ ...enrollment, courseId: e.target.value })
        }
        fullWidth
        displayEmpty
        margin="normal"
      >
        <MenuItem value="">Select Course</MenuItem>
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.id}>
            {course.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={enrollment.studentId}
        onChange={(e) =>
          setEnrollment({ ...enrollment, studentId: e.target.value })
        }
        fullWidth
        displayEmpty
        margin="normal"
      >
        <MenuItem value="">Select Student</MenuItem>
        {students.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {student.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleEnroll}>
        Enroll
      </Button>
    </div>
  );
}

export default Courses;
