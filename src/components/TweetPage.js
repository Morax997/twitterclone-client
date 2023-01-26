import {useParams} from "react-router-dom";
import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const TweetPage = props => {
  let { tweetId } = useParams();
  const [tweetData, setTweetData] = useState({textContent:""});

  useEffect(() => {
    axios.get("http://localhost:1337/tweets/" + tweetId)
      .then((response) => {
        setTweetData(response.data)
      })
  }, [tweetId])


  return <>
    <div className="cardContainer">
      <Card>
        <Card.Body>
          <Card.Text>
            {tweetData.textContent}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

  </>
}

export {TweetPage}
