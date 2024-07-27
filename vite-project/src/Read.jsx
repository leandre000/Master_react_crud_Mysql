import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import axios from "axios";

function Read() {
    const { id } = useParams();
    const [facility, setFacility] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setFacility(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); 

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Facility List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Schedule</th>
                            <th>Equipment</th>
                            <th>Facility</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facility.map((fac) => ( 
                            <tr key={fac.id}>
                                <td>{fac.id}</td>
                                <td>{fac.schedule}</td>
                                <td>{fac.equipment_inventory}</td>
                                <td>{fac.facilities}</td>
                                <td>
                                    <Link to={`/edit/${fac.id}`} className="btn btn-primary mx-1">Edit</Link>
                                    <Link to="/" className="btn btn-secondary mx-1">Back</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Read;
