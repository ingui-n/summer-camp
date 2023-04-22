'use client';

import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className='admin-body'>
        <nav className="navbar navbar-top">
          <h1 className="navbar-brand">
            Táborovač
          </h1>
          <div className="navbar-right">
            <button className="btn">Detail</button>
            <button className="btn btn-logout">Log Out</button>
          </div>
        </nav>
        <div className="container">
          <div className="sidebar">
            <ul>
              <li><Link href='/administration/1'>pohled1</Link></li>
              <li><Link href='/administration/2'>pohled2</Link></li>
              <li><Link href='/administration/3'>pohled3</Link></li>
            </ul>
          </div>
          <div className="content">

            <button className="btn-create btn">CREATE NEW</button>
            <table>
              <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
                <th>Column 5</th>
                <th>Column 6</th>
                <th>Column 7</th>
                <th>UPRAVIT</th>
                <th>SMAZAT</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
                <td>EB</td>
                <td>DB</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
