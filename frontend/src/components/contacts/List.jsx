import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getContacts, deleteContact, setFavorite } from "../../services/contactService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart} from "react-icons/ai";;

export default function List() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetch() {
      let { data: contact } = await getContacts();
      setContacts(contact.data);
    }
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const originalContacts = contacts;
    setContacts(contacts.filter((c) => c._id !== id));
    try {
      await deleteContact(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast("This post has been already been deleted.");
      }
      setContacts({ contacts: originalContacts });
    }
  };

  const isFavorite= async(val,id)=>{
    await setFavorite(id,val);
    let { data: contact } = await getContacts();
    setContacts(contact.data);
  }

  let navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/contacts/create")}
      >
        Add
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-wrapper">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Favorite</th>
              <th scope="col">Avator</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Organization</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => {
              return (
                <tr key={contact._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <button className="btn btn-outline-dark" onClick={() => isFavorite({isFavorite:!contact.isFavorite}, contact._id)}>
                    {contact.isFavorite?<AiFillHeart />:<AiOutlineHeart />}
                    </button>
                    </td>
                  <td><img src={contact.profile_photo || "../../assets/images/default_avatar.png"} alt="pf" className="avatar" /></td>
                  <td>{contact.name}</td>
                  <td>
                    {contact.phone.map((no, index) => {
                      return (
                        <span key={contact._id + index}>
                          <p>Home: {no.home}</p>
                          <p>Work: {no.work}</p>
                          <p>Mobile: {no.mobile}</p>
                        </span>
                      );
                    })}
                  </td>
                  <td>{contact.email}</td>
                  <td>{contact.organization}</td>
                  <td>{contact.address}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/contacts/edit/${contact._id}`)}
                      className="btn btn-secondary mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
