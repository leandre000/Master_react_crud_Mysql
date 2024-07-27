import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
    const [values, setValues] = useState({
        schedule: '',
        equipment_inventory: '',
        facilities: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/facility', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form>
                    <h2>Facility List</h2>
                    <div className="mb-2">
                        <label htmlFor="">Schedules</label>
                        <input type="date" className="form-control" onChange={e => setValues({ ...values, schedule: e.target.value })}></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Equipments</label>
                        <input type="text" placeholder="Enter equipment" className="form-control" onChange={e => setValues({ ...values, equipment_inventory: e.target.value })}></input>

                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Facility</label>
                        <input type="text" placeholder="Enter facility" className="form-control" onChange={e => setValues({ ...values, facilities: e.target.value })}></input>

                    </div>
                    <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Create() {
//     const [values, setValues] = useState({
//         schedules: '',
//         equipment_inventory: '',
//         facilities: ''
//     });

//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:8081/facility', values)
//             .then(res => {
//                 console.log(res);
//                 navigate('/');
//             })
//             .catch(err => console.log(err));
//     };

//     const handleDateChange = (e) => {
//         const rawDate = e.target.value;
//         const formattedDate = rawDate.split('-').reverse().join('-'); // Reformat date
//         setValues({ ...values, schedules: formattedDate });
//     };

//     return (
//         <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
//             <div className="w-50 bg-white rounded p-3">
//                 <form>
//                     <h2>Facility List</h2>
//                     <div className="mb-2">
//                         <label htmlFor="">Schedules</label>
//                         <input type="date" className="form-control" onChange={handleDateChange}></input>
//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="">Equipments</label>
//                         <input type="text" placeholder="Enter equipment" className="form-control" onChange={e => setValues({ ...values, equipment_inventory: e.target.value })}></input>

//                     </div>
//                     <div className="mb-2">
//                         <label htmlFor="">Facility</label>
//                         <input type="text" placeholder="Enter facility" className="form-control" onChange={e => setValues({ ...values, facilities: e.target.value })}></input>

//                     </div>
//                     <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Create;
