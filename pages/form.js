import React from 'react'
import {storage} from "../firebase/firebase"
import Button from "@material-ui/core/Button";
import styles from "../styles/application.module.css";
import Link from "next/link";
import { useState } from "react";
import { db} from "../firebase/firebase";
import { collection, addDoc, getDocs, getFirestore  } from "firebase/firestore";
import {
    ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { message, Alert } from "antd";
import "antd/dist/antd.css";


function form() {
    const db = getFirestore();
    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
  
    const [data, setData] = useState({
      fisrtName: "",
      email: "",
      github: "",
      imageUrl:"",
    });
    
    const handleSubmits = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "profileApplications"), data)
          .then((docRef) => {
            console.log("Profile added", docRef.id);
            setInterval(() => {
              setShowAlert(true);
            });
          })
          .catch((error) => {
            console.error("Error occurred while adding profile", error);
          });
      };

      const handleChange = (e) =>
      setData({ ...data, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storageRef = ref(storage, `image/${file.name}`);
    await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    setUrl(downloadURL);
    setFile(null);
    setLoading(false);
  };
    return (
        <div>
        <div>
        {showAlert && (
          <Alert
            type="success"
            message="Successful"
            description="Profile has been sent"
            style={{ backgroundColor: "#5cb85c" }}
            closable
          />
        )}
      </div>
            <form onSubmit={handleSubmits} className={styles.form}>
            <input type="text" placeholder="Name" value={data.fisrtName} name="fisrtName" onChange={handleChange}/>
            <input type="text" placeholder="Email"  value={data.email} name="email" onChange={handleChange}/>
            <input type="text" placeholder="Github"  value={data.github} name="github" onChange={handleChange}/><br/>
            <Button color="primary" type="submit">
            Create Form
          </Button>
            </form>
            {!url && (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div>
                    <input
                      type="file"
                      className="form-control-file"
                      name="imageUrl"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </form>
              )}
              {url &&
                <Link href={url}>
                <a target="_blank">
                <input className={styles.url} type="text" value={url} readOnly />
                </a>
                </Link>
            }
            <Button color="primary" type="submit">
            Create
          </Button>
        </div>
    )
}

export default form
