import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { search } from '../utils/lists';

export const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`explore-scents/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex w-50">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Scents..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        size="sm"
        className="p-2 mx-2"
      >
        Search
      </Button>
    </Form>
  );
};
