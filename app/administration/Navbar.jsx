'use client';

import Link from "next/link";
import {Button} from "@mui/material";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-top">
        <h1 className="navbar-brand">Táborovač</h1>
        <div className="navbar-right">
          <Link href='/'><Button variant='contained'>Zpět na domovskou stránku</Button></Link>
          <Link href='/sign-out'><Button variant='contained' color='error'>Odhlásit se</Button></Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
