import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserFirearmSelect from "../components/UserFirearmSelect";
import UserFirearmList from "../components/UserFirearmList";
import AuthForm from "../components/AuthForm";

// const UserCollection = () => {
//     // const { user } = useContext(AuthContext);  
//      const { isAuthenticated, user, logout } = useContext(AuthContext);
//     return (
//         <div>
//             <h6>
//                 User Role: {user.role} | User ID: {user.id}
//             </h6>
     


//     {isAuthenticated ? (
//         // ------------------------------LOGGED IN
//           <>         
//            <div>
//             <UserFirearmList />
//             <UserFirearmSelect />
//         </div>
//    </>
//    ):(

    
//                 //  ------------------------------NOT LOGGED IN
//     <>   
//     <div>
//     <AuthForm /> 
//     </div>
//     </>
//     )}




  
  
//         </div>
//     );
// };





const UserCollection = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
console.log("isAuthenticated:", isAuthenticated);
console.log("user:", user);
  return (
    <div>

      {isAuthenticated ? (
        <>
          <h6>
            User Role: {user.role} | User ID: {user.id}
          </h6>

          <UserFirearmList />
          <UserFirearmSelect />
        </>
      ) : (
        <AuthForm />
      )}

    </div>
  );
};











export default UserCollection;
