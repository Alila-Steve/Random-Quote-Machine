import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import randomcolor from 'randomcolor';
import { FaTwitter } from 'react-icons/fa';

function QuoteBox() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState(randomcolor());

  const fetchQuote = async () => {
    const res = await axios.get('https://api.quotable.io/random');
    setQuote(res.data.content);
    setAuthor(res.data.author);
    setColor(randomcolor());  // generate a new random color
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div 
      id="quote-box" 
      className="d-flex flex-column align-items-center justify-content-center" 
      style={{ minHeight: '100vh', backgroundColor: color }}
    >
      <Card style={{ width: '50rem', color }} className="mb-3">
        <Card.Body>
          <Card.Text id="text">{quote}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted" id="author">{author}</Card.Subtitle>
          <Row className="mt-4">
            <Col>
              <a 
                id="tweet-quote" 
                href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
                className="btn btn-link text-secondary"
              >
                <FaTwitter size={28} />
              </a>
            </Col>
            <Col className="text-right">
              <Button id="new-quote" variant="primary" onClick={fetchQuote}>New Quote</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default QuoteBox;
