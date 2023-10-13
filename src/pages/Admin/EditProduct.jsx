import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ProfileHeader } from '../../components/ProfileHeader';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
} from '../../services/slices/productsApiSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { toast } from 'react-toastify';

export const EditProduct = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [longevity, setLongevity] = useState(1);
  const [isFeatured, setIsFeatured] = useState(false);
  const [gender, setGender] = useState('');
  const [season, setSeason] = useState('');
  const [concentration, setConcentration] = useState('');
  const [vibe, setVibe] = useState('');
  const [topNotes, setTopNotes] = useState([]);
  const [middleNotes, setMiddleNotes] = useState([]);
  const [baseNotes, setBaseNotes] = useState([]);
  const [occasion, setOccasion] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadImage, { isLoading: loadingImageUpload }] =
    useUploadSingleImageMutation();

  const [uploadMultipleImages, { isLoading: loadingMultipleImageUpload }] =
    useUploadMultipleImagesMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.product) {
      setName(product.product.name || '');
      setDescription(product.product.description || '');
      setRichDescription(product.product.richDescription || '');
      setImage(product.product.image || '');
      setImages(product.product.images || []);
      setBrand(product.product.brand || '');
      setPrice(product.product.price || 0);
      setCategory(product.product.category || '');
      setCountInStock(product.product.countInStock || 0);
      setRating(product.product.rating || 0);
      setNumReviews(product.product.numReviews || 0);
      setIsFeatured(product.product.isFeatured || false);
      setGender(product.product.gender || '');
      setSeason(product.product.season || '');
      setConcentration(product.product.concentration || '');
      setVibe(product.product.vibe || '');
      setTopNotes(product.product.topNotes || []);
      setMiddleNotes(product.product.middleNotes || []);
      setBaseNotes(product.product.baseNotes || []);
      setOccasion(product.product.occasion || '');
      setLongevity(product.product.longevity || 1);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        gender,
        season,
        concentration,
        vibe,
        topNotes,
        middleNotes,
        baseNotes,
        occasion,
        longevity,
      }).unwrap();
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadImage(formData).unwrap();
      toast.success('Image uploaded');
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const uploadMultipleFilesHandler = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    files.forEach((file) => formData.append('images', file));

    try {
      const res = await uploadMultipleImages(formData).unwrap();
      toast.success('Images uploaded successfully!');
      setImages(res.images);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <ProfileHeader headerText="Edit Product" />
      <Link
        to="/admin/productlist"
        vairant="secondary"
        className="btn btn-light my-3"
      >
        Go Back
      </Link>
      <Container>
        {loadingUpdate && <Loader />}
        {loadingImageUpload && <Loader />}
        {loadingMultipleImageUpload && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row className="my-1 mx-1 align-items-end">
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="isFeatured">
                  <Form.Check
                    type="checkbox"
                    label="Is Featured?"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4 mx-1 align-items-center">
              <Col>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="longevity">
                  <Form.Label>longevity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter longevity 1-5"
                    value={longevity}
                    onChange={(e) => setLongevity(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="season">
                  <Form.Label>Season</Form.Label>
                  <Form.Control
                    as="select"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a season
                    </option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4 mx-1 align-items-center">
              <Col>
                <Form.Group controlId="countInStock">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter count in stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="concentration">
                  <Form.Label>Concentration</Form.Label>
                  <Form.Control
                    as="select"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a concentration
                    </option>
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Eau de Toilette">Eau de Toilette</option>
                    <option value="Eau de Cologne">Eau de Cologne</option>
                    <option value="Parfum">Parfum</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="numReviews">
                  <Form.Label>Number of Reviews</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter number of reviews"
                    value={numReviews}
                    onChange={(e) => setNumReviews(Number(e.target.value))}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="vibe">
                  <Form.Label>Vibe</Form.Label>
                  <Form.Control
                    as="select"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a vibe
                    </option>
                    <option value="Floral">Floral</option>
                    <option value="Oriental">Oriental</option>
                    <option value="Woody">Woody</option>
                    <option value="Fresh">Fresh</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="occasion">
                  <Form.Label>Occasion</Form.Label>
                  <Form.Control
                    as="select"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                  >
                    <option value="" disabled>
                      Select occasion
                    </option>
                    <option value="Night-Out">Night-Out</option>
                    <option value="Everyday-Essentials">
                      Everyday-Essentials
                    </option>
                    <option value="Elegant-Occasions">Elegant-Occasions</option>
                    <option value="Professional-Aura">Professional-Aura</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4 mx-1 align-items-center">
              <Col>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="richDescription">
                  <Form.Label>Rich Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter rich description"
                    value={richDescription}
                    onChange={(e) => setRichDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4 mx-1 align-items-center">
              <Col>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control> */}

                  <Form.Control
                    type="file"
                    label="chooseFile"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="images">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={uploadMultipleFilesHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4 mx-1 align-items-center">
              <Col>
                <Form.Group controlId="topNotes">
                  <Form.Label>Top Notes</Form.Label>
                  {topNotes.map((note, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder={`Top Note ${index + 1}`}
                        value={note}
                        onChange={(e) => {
                          const newNotes = [...topNotes];
                          newNotes[index] = e.target.value;
                          setTopNotes(newNotes);
                        }}
                        className="mr-2" // Add some margin to the right of the input
                      />
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          const newNotes = [...topNotes];
                          newNotes.splice(index, 1);
                          setTopNotes(newNotes);
                        }}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Button
                      type="button"
                      variant="success"
                      onClick={() => {
                        setTopNotes([...topNotes, '']);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="middleNotes">
                  <Form.Label>Middle Notes</Form.Label>
                  {middleNotes.map((note, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder={`Middle Note ${index + 1}`}
                        value={note}
                        onChange={(e) => {
                          const newNotes = [...middleNotes];
                          newNotes[index] = e.target.value;
                          setMiddleNotes(newNotes);
                        }}
                        className="mr-2"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          const newNotes = [...middleNotes];
                          newNotes.splice(index, 1);
                          setMiddleNotes(newNotes);
                        }}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => {
                      setMiddleNotes([...middleNotes, '']);
                    }}
                  >
                    +
                  </Button>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="baseNotes">
                  <Form.Label>Base Notes</Form.Label>
                  {baseNotes.map((note, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder={`Base Note ${index + 1}`}
                        value={note}
                        onChange={(e) => {
                          const newNotes = [...baseNotes];
                          newNotes[index] = e.target.value;
                          setBaseNotes(newNotes);
                        }}
                        className="mr-2"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          const newNotes = [...baseNotes];
                          newNotes.splice(index, 1);
                          setBaseNotes(newNotes);
                        }}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => {
                      setBaseNotes([...baseNotes, '']);
                    }}
                  >
                    +
                  </Button>
                </Form.Group>
              </Col>
            </Row>
            <div className=" my-4 d-flex align-items-center justify-content-center">
              <Button
                type="submit"
                vairant="primary"
                className="third-button w-30 my-2"
                size="sm"
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};
