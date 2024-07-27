import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
                // If the deletion was successful, update the data state to remove the deleted facility
                setData(prevData => prevData.filter(item => item.id !== id));
            })
            .catch(err => console.log(err));
    };
    
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Facility List</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/create" className="btn btn-success">Create +</Link>
                </div>
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
                        {data && data.map((facility, index) => { 
                            return (
                                <tr key={index}>
                                    <td>{facility.id}</td>
                                    <td>{facility.schedule}</td>
                                    <td>{facility.equipment_inventory}</td>
                                    <td>{facility.facilities}</td>
                                    <td>
                                        <Link to={`/read/${facility.id}`} className="btn btn-sm btn-info">Read</Link>
                                        <Link to={`/edit/${facility.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                        <button onClick={() => handleDelete(facility.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
