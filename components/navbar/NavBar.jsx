import React from 'react'

function NavBar({token, onLogout }) {
  return (
   <>
   {token?(
<>
<link to="/lists">My lists</link>
<link to="/search">Search</link>
<button onClick={onLogout}>Logout</button>
</>
   )
:(
    <>
    <link to="/signup">Sign up</link>
    <link to="/login">Log in</link>
    </>
)
   }
   </> 
  )
}

export default NavBar