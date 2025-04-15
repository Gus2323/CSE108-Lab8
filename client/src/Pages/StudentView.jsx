import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebase';
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

  const fetchAllClasses = async () => {
    const querySnapshot = await getDocs(collection(db, 'classes'));
    const classList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setAllClasses(classList);
  };

  const fetchMyClasses = async () => {
    const userId = auth.currentUser.uid;
    const querySnapshot = await getDocs(collection(db, 'classes'));
    const filtered = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((cls) => cls.students.includes(userId));
    setMyClasses(filtered);
  };

  const handleEnroll = async (classId) => {
    const userId = auth.currentUser.uid;
    const classRef = doc(db, 'classes', classId);

    try {
      await updateDoc(classRef, {
        students: arrayUnion(userId),
      });
      alert(`Successfully enrolled in class ${classId}`);
      fetchAllClasses();
      fetchMyClasses();
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleClassClick = async (classId) => {
    // Collapse if already expanded
    if (selectedClassId === classId) {
      setSelectedClassId(null);
      setStudentsInClass([]);
      return;
    }
  
    setSelectedClassId(classId);
  
    const classDoc = await getDoc(doc(db, 'classes', classId));
    const classData = classDoc.data();
  
    const studentProfiles = await Promise.all(
      (classData.students || []).map(async (uid) => {
        const userSnap = await getDoc(doc(db, 'users', uid));
        return userSnap.exists() ? userSnap.data() : null;
      })
    );
  
    setStudentsInClass(studentProfiles.filter(Boolean));
  };
  

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar onLogout={handleLogout} />

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
                      {cls.students.length}/{cls.capacity} students
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
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{cls.name}</h5>
                      <p className="card-text">
                        {cls.students.length}/{cls.capacity} students
                      </p>
                    </div>

                    {/*Enroll Button */}
                    {cls.students.length < cls.capacity && !cls.students.includes(auth.currentUser?.uid) && (
                      <button
                        className="btn btn-sm btn-primary mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(cls.id);
                        }}
                      >
                        Enroll
                      </button>
                    )}

                    {/*Toggle student list */}
                    <button
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => handleClassClick(cls.id)}
                    >
                      {selectedClassId === cls.id ? 'Hide Students' : 'View Students'}
                    </button>
                  </div>

                  {/* Expandable Section */}
                  {selectedClassId === cls.id && (
                    <div className="card-footer bg-white">
                      <h6>Enrolled Students:</h6>
                      <ul className="list-unstyled mb-0">
                        {studentsInClass.map((student, idx) => (
                          <li key={idx} className="d-flex align-items-center gap-2">
                            <i className="bi bi-person-circle" style={{ fontSize: '1.2rem' }}></i>
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
