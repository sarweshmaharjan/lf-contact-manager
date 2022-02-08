import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContact, editContact } from "../../services/contactService";

export default function Edit() {
  let { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    phone: [
      {
        home: "",
        work: "",
        mobile: "",
      },
    ],
    profile_photo: "",
    email: "",
    organization: "",
    address: "",
    updated_at: Date.now,
  });

  useEffect(() => {
    async function fetch() {
      let { data: contact } = await getContact(id);
      setForm({
        name: contact.data.name,
        phone: contact.data.phone,
        profile_photo: contact.data.profile_photo,
        email: contact.data.email,
        organization: contact.data.organization,
        address: contact.data.address,
      });
    }
    fetch();
  }, [id]);

  const [err, setErr] = useState({});
  let navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await editContact(id,form);
      navigate("/contacts");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        await setErr(error.response.data.err);
      }
    }
  };
  return (
    <div className="form-wraper">
      <div className="form-inner">
        <form onSubmit={handleUpdate}>
          <h3>Update Existing Contact Detail</h3>
          <div className="form-group pb-3">
            <label>Full name</label>
            <input
              type="text"
              value={form.name}
              className={`form-control ${err.name ? "is-invalid" : ""}`}
              placeholder="Last name"
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
              value={form.phone[0].home}
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
              value={form.phone[0].work}
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
              value={form.phone[0].mobile}
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
              type="text"
              value={form.profile_photo}
              className={`form-control mb-3 ${
                err.profile_photo ? "is-invalid" : ""
              }`}
              placeholder="Enter image URI"
              onChange={(event) =>
                setForm({ ...form, profile_photo: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.profile_photo}</div>
          </div>
          <div className="form-group pb-3">
            <label>Email address</label>
            <input
              type="email"
              value={form.email}
              className={`form-control mb-3 ${err.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
            <div className="invalid-feedback">{err.email}</div>
          </div>
          <div className="form-group pb-3">
            <label>Organization</label>
            <input
              type="text"
              value={form.organization}
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
            <label>Address</label>
            <input
              type="text"
              value={form.address}
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
          <button type="submit" className="btn btn-primary btn-block">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
