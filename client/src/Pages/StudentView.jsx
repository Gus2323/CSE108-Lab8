import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentView = () => {
  const [myClasses, setMyClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [studentsInClass, setStudentsInClass] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyClasses();
    fetchAllClasses();
  }, []);

  const fetchMyClasses = async () => {
    const data = [
      { id: 1, name: 'Math 101', students: 25, capacity: 30 },
      { id: 2, name: 'History 202', students: 18, capacity: 20 },
    ];
    setMyClasses(data);
  };

  const fetchAllClasses = async () => {
    const data = [
      { id: 1, name: 'Math 101', students: 25, capacity: 30 },
      { id: 2, name: 'History 202', students: 18, capacity: 20 },
      { id: 3, name: 'Physics 303', students: 30, capacity: 30 },
      { id: 4, name: 'Biology 404', students: 12, capacity: 25 },
    ];
    setAllClasses(data);
  };

  const handleClassClick = async (classId) => {
    setSelectedClassId(classId);
    const studentList = [
      { name: 'Alice Smith' },
      { name: 'Bob Johnson' },
      { name: 'Charlie Lee' },
    ];
    setStudentsInClass(studentList);
  };

  const handleEnroll = (classId) => {
    alert(`Enrolled in class ID ${classId}`);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar userName="Gustavo" onLogout={handleLogout} />

      <div className="container mt-4">
        {/* My Classes */}
        <section className="mb-5">
          <h3>My Classes</h3>
          <div className="row">
            {myClasses.map((cls) => (
              <div key={cls.id} className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{cls.name}</h5>
                    <p className="card-text">
                      {cls.students}/{cls.capacity} students
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Classes */}
        <section>
          <h3>All Available Classes</h3>
          <div className="row">
            {allClasses.map((cls) => (
              <div
                key={cls.id}
                className="col-md-6 col-lg-4 mb-4"
                onClick={() => handleClassClick(cls.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{cls.name}</h5>
                      <p className="card-text">
                        {cls.students}/{cls.capacity} students
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {cls.students < cls.capacity ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnroll(cls.id);
                          }}
                        >
                          Enroll
                        </button>
                      ) : (
                        <span className="text-danger fw-bold">Full</span>
                      )}
                    </div>
                  </div>

                  {/* Show student list if selected */}
                  {selectedClassId === cls.id && (
                    <div className="card-footer bg-white">
                      <h6>Enrolled Students:</h6>
                      <ul className="list-unstyled mb-0">
                        {studentsInClass.map((student, idx) => (
                          <li
                            key={idx}
                            className="d-flex align-items-center gap-2"
                          >
                            <i
                              className="bi bi-person-circle"
                              style={{ fontSize: '1.2rem' }}
                            ></i>
                            {student.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentView;
