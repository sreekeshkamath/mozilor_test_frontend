import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function HomePage() {
    const [productsData, setProductsData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    const handleLogout = () => {
        Cookies.remove('authToken');
        navigate('/login');
    }

    const fetchData = async () => {
        try {
            const getProductsAPI = process.env.REACT_APP_MOZILOR_API_URL + 'api/products';
            const response = await fetch(getProductsAPI, {
                headers: {
                    'Authorization' : 'Bearer ' + Cookies.get('authToken')
                }
            }); 

            if (response.ok) {
                const productsData = await response.json();
                setProductsData(productsData);
            }

        } catch (error) {
            console.log("Fetch products API Error: ", error);
        }
    } 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if(!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const productsCSVUploadAPI = process.env.REACT_APP_MOZILOR_API_URL + 'api/products/import';
            const response = await fetch(productsCSVUploadAPI, {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + Cookies.get('authToken')
                },
                body: formData
            })
            if (response.status === 201) {
                const jsonResponse = await response.json();
                console.log('File uploaded successfully: ', jsonResponse);
                setRefreshKey(prevKey => prevKey + 1);
            } else {
                console.error('Upload failed: ', response.status);
            }
        } catch (error) {
            console.error('File upload error: ', error);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Homepage</h1>
            <button className="btn btn-danger float-end" onClick={handleLogout}>Logout</button>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.sku}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <input type="file" onChange={handleFileChange} />
                <button 
                    className="btn btn-primary mt-3"
                    onClick={handleFileUpload}
                >
                    Upload CSV
                </button>
            </div>
        </div>
    );

}

export default HomePage;