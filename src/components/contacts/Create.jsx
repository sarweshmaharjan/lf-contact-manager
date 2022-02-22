import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../services/contactService";
import { storage } from "../../config/firebase/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Create() {
  const [image, setImage] = useState({});
  const [form, setForm] = useState({
    name: null,
    phone: [
      {
        home: null,
        work: null,
        mobile: null,
      },
    ],
    profile_photo: null,
    email: null,
    organization: null,
    address: null,
    created_at: Date.now,
  });

  const [err, setErr] = useState({});
  let navigate = useNavigate();

  const uploadImage = () => {
    console.log(image)
    if (!image) {
      setErr({
        ...err,
        profile_photo: "Couldnot upload it",
      });
      return;
    };
    console.log(image.name);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setErr({
          ...err,
          profile_photo: error,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setForm({ ...form, profile_photo: downloadURL });
        });
      }
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await uploadImage();
      await createContact(form);
      navigate("/contacts");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        await setErr(error.response.data.err);
      }
    }
  };
const imageSet = (e) =>{

  if(e.target.files[0]){
    setImage(e.target.files[0]);
  }
}

  return (
    <div className="form-wraper">
      <div className="form-inner">
        <form onSubmit={handleAdd}>
          <h3>Add new Contact Detail</h3>
          <div className="form-group pb-3">
            <label>Full name</label>
            <input
              type="text"
              className={`form-control ${err.name ? "is-invalid" : ""}`}
              placeholder="Full name"
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.name}</div>
          </div>
          <div className="form-group pb-5">
            <h5>Contact</h5>
            <label>Home</label>
            <input
              type="text"
              className={`form-control mb-3 ${err.home ? "is-invalid" : ""}`}
              placeholder="Enter home, eg: 014700564"
              onChange={(event) =>
                setForm({
                  ...form,
                  phone: [{ ...form.phone[0], home: event.target.value }],
                })
              }
            />
            <div className="invalid-feedback">{err.home}</div>
            <label>Work</label>
            <input
              type="text"
              className={`form-control mb-3 ${err.work ? "is-invalid" : ""}`}
              placeholder="Enter work, eg: 9854354145"
              onChange={(event) =>
                setForm({
                  ...form,
                  phone: [{ ...form.phone[0], work: event.target.value }],
                })
              }
            />
            <div className="invalid-feedback">{err.work}</div>
            <label>Phone</label>
            <input
              type="text"
              className={`form-control mb-3 ${err.mobile ? "is-invalid" : ""}`}
              placeholder="Enter phone, eg: 3548354247"
              onChange={(event) =>
                setForm({
                  ...form,
                  phone: [{ ...form.phone[0], mobile: event.target.value }],
                })
              }
            />
            <div className="invalid-feedback">{err.mobile}</div>
          </div>
          <div className="form-group pb-3">
            <label>Photo</label>
            <input
              type="file"
              className={`form-control mb-3 ${
                err.profile_photo ? "is-invalid" : ""
              }`}
              onChange={imageSet}
            />
            <button type="button" className="btn btn-secondary" onClick={uploadImage} >Upload</button>
            <div className="invalid-feedback">{err.profile_photo}</div>
            <div className="invalid-feedback">{err.profile_photo}</div>
          </div>
          <div className="form-group pb-3">
            <label>Email address (Optional)</label>
            <input
              type="email"
              className={`form-control mb-3 ${err.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.email}</div>
          </div>
          <div className="form-group pb-3">
            <label>Organization (Optional)</label>
            <input
              type="text"
              className={`form-control mb-3 ${
                err.organization ? "is-invalid" : ""
              }`}
              placeholder="Enter your organization"
              onChange={(event) =>
                setForm({ ...form, organization: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.organization}</div>
          </div>
          <div className="form-group pb-3">
            <label>Address (Optional)</label>
            <input
              type="text"
              className={`form-control mb-3 ${err.address ? "is-invalid" : ""}`}
              placeholder="Enter your address"
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.address}</div>
          </div>
          <button
            className="btn btn-outline-dark btn-block mx-3"
            onClick={() => navigate("/contacts")}
          >
            Cancel
          </button>
          <button type="submit" disabled={!form.profile_photo} className="btn btn-primary btn-block">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
