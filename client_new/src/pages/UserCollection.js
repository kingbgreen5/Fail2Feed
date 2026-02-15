import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserFirearmSelect from "../components/UserFirearmSelect";
import UserFirearmList from "../components/UserFirearmList";
import AuthForm from "../components/AuthForm";


//----------------------------------------------------------------
//----------------------------------------------------------------THIS IS THE USER FAVORITES/DASHBOARD PAGE
//----------------------------------------------------------------

// const UserCollection = () => {
//   const { isAuthenticated, user } = useContext(AuthContext);
// console.log("isAuthenticated:", isAuthenticated);
// console.log("user:", user);






// //-------------------------------------------------------RETURN-------------------------------------------------------




//   return (
//     <div>

//       {isAuthenticated ? (
//         <>
//           <h6>
//             User Role: {user.role} | User ID: {user.id}
//           </h6>

//           <UserFirearmList />
//           <UserFirearmSelect />
//         </>
//       ) : (
//         <div>
//             <p>Please log in to view and add favorites.</p>     
//         <AuthForm />
//         </div>
//       )}

//     </div>
//   );
// };


const UserCollection = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [refreshList, setRefreshList] = useState(false);

  const triggerRefresh = () => {
    setRefreshList(prev => !prev);
  };
//-------------------------------------------------------RETURN-------------------------------------------------------
  return (
    <div>
      {isAuthenticated ? (
        <>
          <h6>
            User Role: {user.role} | User ID: {user.id}
          </h6>

          <UserFirearmList refreshList={refreshList} />
          <UserFirearmSelect onFirearmAdded={triggerRefresh} />
        </>
      ) : (
        <div>
          <p>Please log in to view and add favorites.</p>
          <AuthForm />
        </div>
      )}
    </div>
  );
};









export default UserCollection;
