import React,{ useState } from "react";
import Header from "../components/Header/Header";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { message, Alert } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/myClass.module.css";
import { useSession, getSession } from "next-auth/react"

export default function profileForm() {
  const { data: session, status } = useSession()
  const db = getFirestore();
  const [showAlert, setShowAlert] = useState(false);
 
  const [data, setData] = useState({
    fisrtName: "",
    lastName: "",
    email: "",
    jobTitle:"",
    github: "",
    cv: "",
   
  });

  const handleSubmits = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "job_application"), data)
      .then((docRef) => {
        console.log("Jobapplication added", docRef.id);
        setData({ 
            fisrtName: "",
            lastName: "",
            email: "",
            jobTitle:"",
            github: "",
            cv: "",
        
    })
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error occurred while adding profile", error);
      });
      console.log(data)
     
  };


  const handleChange = (e) =>
  setData({ ...data, [e.target.name]: e.target.value });

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <>
<div>
        {showAlert && (
          <Alert
            type="success"
            message="Successful"
            description="Job Application has been sent"
            style={{ backgroundColor: "#5cb85c" }}
            closable
          />
        )}
      </div>
<div className="d-flex justify-content-center flex-column  m-5">
      <Header title="Job application form" />

      {/* Form */}
      <form className="mb-2 "
       onSubmit={handleSubmits}
       autoComplete="off"
      >
        <div className="mb-2">
          <label className="form-label" >First Name</label>
          <input type="text" className="form-control" 
           value={data.fisrtName}
           name="fisrtName"
           onChange={handleChange}
          required />
        </div>


        <div className="mb-2">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" 
           value={data.lastName}
           name="lastName"
           onChange={handleChange}
          required />
        </div>


        <div className="mb-2">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" 
          name="email"
          value={data.email}  
          onChange={handleChange}
          required />
        </div>

        <div className="mb-2">
          <label className="form-label">Github Handle</label>
          <input type="text" className="form-control" 
          value={data.github}
          name="github"
          onChange={handleChange}
          required />
        </div>

        <div className="mb-2">
          <label className="form-label">CV link</label>
          <input type="text" className="form-control" 
          value={data.cv}
          name="cv"
          onChange={handleChange}
          required />
        </div>


        <div className="mb-2 d-flex flex-wrap">
          <label className="form-label">JobTitle</label>
          <select
            className="form-select form-select-sm "
            aria-label=".form-select-sm example"
            name="jobTitle"
            value={data.jobTitle} 
             onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              JobTitle
            </option>
            <option value='Frontend developer'>Frontend Developer</option>
            <option value='Backend developer'>Backend Developer</option>
            <option value='Fullstack developer'>Full Stack Developer</option>
            <option value='Devops'>Dev Ops</option>
          </select>
        </div>   
       
         
                      <button
                        className={styles.applyBtn}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Apply
                      </button>
      </form>
    </div>
    </>
  )
}


  