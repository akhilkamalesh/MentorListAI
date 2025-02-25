import React, {ChangeEvent, FormEvent, useState} from "react"
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import '../assets/css/search.css'
import axios from "axios";

function Search(){

    const [inputData, setInputData] = useState({industry: "", role: "", location: "", company: "", gen_desc:""});
    const [errors, setErrors] = useState({ industry: false, role: false, location: false });
    const navigate = useNavigate()


    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
        const {name, value} = event.target;

        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
        
        if (name in errors) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: value.trim() === ""}));
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault()
        console.log("handleSubmit is called")

        const newErrors = {
            industry: inputData.industry.trim() === "",
            role: inputData.role.trim() === "",
            location: inputData.location.trim() === ""
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            alert("Please fill out all required fields.");
            return;
        }

        try{
            const response = await axios.post('http://127.0.0.1:5000/search', {
                industry: inputData.industry,
                role: inputData.role,
                location: inputData.location,
                company: inputData.company,
                gen_desc: inputData.gen_desc
            });

            console.log('Response: ', response.data);

            if (response.data.success) {
                console.log('Mentor List Retrieved successfully')
                navigate("/list")
              } else {
                alert('Invalid credentials');
              }
        } catch (error) {
            alert(error + 'An error occurred when retreiving results based on search');
        }
    }



    return (
        <Layout>
             <div className="outreach-search-container">
                <h1 className="search-title">Outreach Search</h1>
                <form className="search-form">
                <div className="form-row">
                    <div className="form-group">
                    <label htmlFor="industry">Industry*:</label>
                    <input type="text" id="industry" name="industry" onChange={handleInputChange}/>
                    {errors.industry && <span className="error">Industry is required.</span>}
                    </div>
                    <div className="form-group">
                    <label htmlFor="role">Role*:</label>
                    <input type="text" id="role" name="role" onChange={handleInputChange}/>
                    {errors.role && <span className="error">Role is required.</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                    <label htmlFor="location">Location*:</label>
                    <input type="text" id="location" name="location" onChange={handleInputChange}/>
                    {errors.location && <span className="error">Location is required.</span>}
                    </div>
                    <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input type="text" id="experience" name="company" onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">General Description:</label>
                    <textarea id="description" name="gen_desc" onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="search-button" onClick={handleSubmit}>Search</button>
                </form>
            </div>
        </Layout>
    )
}


export default Search;