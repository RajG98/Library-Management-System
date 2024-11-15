import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookForm = () => {
  const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        quantity: '',
        price: ''
    });
    const navigate = useNavigate();
    const genres = ["FICTION",
        "NON_FICTION",
        "FANTASY",
        "MYSTERY",
        "SCIENCE_FICTION",
        "BIOGRAPHY",
        "HISTORY",
        "ROMANCE",
        "HORROR",
        "THRILLER"];

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Number(book.publicationYear) < 1800 || Number(book.publicationYear)>Number(new Date().getFullYear())) {
            alert("Enter a valid publication Year!");
            return;
        }
        axios.put(`http://localhost:8080/books/${id}/secure-endpoint`, { ...book,updatedAt:new Date().toLocaleDateString }, {
            withCredentials: true, headers: {
            "Content-Type":"application/json"
            }
        }).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                alert('Book updated successfully!');
            }
        }).catch((err) => {
            
        alert("Something went wrong");
            console.error("Something went wrong", err);
        })
        
        navigate("/books");
  };
  useEffect(() => {
    const fetchBookData = async () => {
      await axios.get(`http://localhost:8080/books/${id}`, { withCredentials: true })
        .then((response) => {
          setBook(response.data);
        }).catch((err) => console.error("Something went wrong", err));
    }
    fetchBookData();
  },[])

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="title">Book Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Enter book title"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="genre">Genre</label>
                    <select name="genre" id="genre" className='form-control' value={book.genre} required onChange={handleChange}>
                        <option value="" disabled>Select a Genre</option>
                        {genres.map((genre) => {
                            return(<option key={genre} value={genre}>{genre }</option>)
                        })}
                    </select>
                    
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="publicationYear">Publication Year</label>
                    <input
                        type="number"
                        className="form-control"
                        id="publicationYear"
                        name="publicationYear"
                        value={book.publicationYear}
                        onChange={handleChange}
                        placeholder="Enter publication year"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="quantity">Quantity in Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity in stock"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Book</button>
            </form>
        </div>
    );
};

export default EditBookForm;
