import React, { useState, useEffect } from 'react';
import pino from 'pino'
import { Link } from 'react-router-dom';

const logger = pino({
  prettyPrint: { colorize: true }
});

function Profile() {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        fetch("/user")
            .then(res => res.json())
            .then(res => setDataUser(res))
            .catch(err => {
                logger.info(`error: ${err}`);
            });
      }, []);  

    return (
        <div>
    <div className="table-responsive">
        <table className="table table-striped table-dark text-white table-hover">
            <thead>
                <tr>
                    <th colSpan="2">Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Adress</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <h6>{dataUser.fname}</h6>
                    </td>
                    <td colSpan="2">
                        <h6>{dataUser.lastname}</h6>
                    </td>
                    <td>{dataUser.age}<br/></td>
                    <td className="font-weight-bold">{dataUser.email}</td>
                    <td>{dataUser.adress}</td>
                    <td>{dataUser.phone}<i className="fa fa-external-link external-link"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    <Link to='/order'><button type="button" className="btn btn-warning">Go to orders</button></Link>
</div>
    )
}
export default Profile