import auth from "./authAPI";
import contact from "./contactsAPI"; 

/**
 * Every router API present in the project. 
 * @function - router
 * @param app 
 */
const router = (app)=>{ 
    app.use('/api/auth',auth);
    app.use('/api/contacts',contact);
}

export default router;