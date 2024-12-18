import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



const App = () => {
  const navigate = useNavigate();
  const [tweetsList, setTweetsList] = useState([]);
  const [newTweetInput, setNewTweetInput] = useState("");
  const handleTweetSubmit = () => {
    axios.post("http://localhost:1337/tweets/create", {textContent: newTweetInput})
      .then((response) => {
        setTweetsList(response.data)
      })
  }

  const handleReplyClick = event => {
    event.stopPropagation();
    
  }
    
  useEffect(() => {
   axios.get("http://localhost:1337/tweets")
     .then((response) => {
       setTweetsList(response.data)
     })
  }, []);


  return (
    <div>
      <div className="cardContainer">
        <Card>
          <Card.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Express Yourself</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTweetInput}
                onChange={(event) => {setNewTweetInput(event.target.value)}}
              />
            </Form.Group>
            <div className={"tweetButton"}>
              <Button variant="primary" onClick={handleTweetSubmit}>Tweet</Button>
            </div>
          </Card.Body>
        </Card>

        {
          tweetsList.map((tweetData, index) => {
            return <Card key={index} onClick={() => {navigate("/tweet/" + tweetData._id)}}>
              <Card.Body>
                <Card.Title>{tweetData._id}</Card.Title>
                <Card.Text>{tweetData.textContent}</Card.Text>
                <Button onClick={handleReplyClick} variant="primary">Reply</Button>
              </Card.Body>
            </Card>
          })
        }

      </div>

    </div>
  );
}

export default App;
