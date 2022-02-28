import http from "./httpService";

const apiEndPoint = "http://localhost:3000/api/contacts";

export function getContacts() {
  return http.get(apiEndPoint);
}

export function getContact(id){
 return http.get(apiEndPoint+"/"+id);
}

export function createContact(form) {
  return http.post(apiEndPoint, form);
}

export function editContact(id,form) {
  return http.put(apiEndPoint + "/" + id, form);
}

export function deleteContact(id) {
  return http.delete(apiEndPoint + "/" + id);
}

export function setFavorite(id,val) {
    return http.post(apiEndPoint+ "/" + id+"/set-favorite",val);
}
