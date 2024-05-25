import React, {useEffect, useState } from 'react';
import axios from 'axios'

function App() {
    const [message, setMessage] = useState('');
    const [postResponse, setPostResponse] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error fetching the data !', error);
            });
    }, []);

const sendData = () => {
    const data = { content : "Hello from the frontend !!"};
    axios.post('http://localhost:5000/api/data', data)
        .then(response => {
            setPostResponse(response.data.received);
        })
        .catch(error => {
            console.error('There was an error sending the data!', error);
        });
};

return (
    <div className="App">
        <h1>{message}</h1>
        <button onClick={sendData}>Send Data</button>
        {postResponse && <pre>{JSON.stringify(postResponse, null, 2)}</pre>}
    </div>
);
}

export default App;

