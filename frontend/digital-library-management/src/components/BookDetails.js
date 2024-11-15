import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BookDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/books/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setBook(response.data);
          // console.log(response.data);
        });
    };
    fetchData();
  }, [id]);
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:8080/books/${id}/secure-endpoint`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.status);
        navigate("/books");
      });
  };
  const updateQty = async (action) => {
    try {
        const response = await axios.put(`http://localhost:8080/books/${id}/quantity/${action}`, action, {
            withCredentials: true
        });
        if (response.status === 200) {
            console.log("Quantity changed");
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
}

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{book?.title}</h1>
      <h3 style={styles.author}>by {book?.author}</h3>
      <p>
        <strong>Publication Year:</strong> {book?.publicationYear}
      </p>
      <p>
        <strong>Genre:</strong> {book?.genre}
      </p>
      <p>
        <strong>Quantity in Stock:</strong> {book?.quantity}
      </p>
      <p>
        <strong>Price:</strong> {book?.price}
      </p>
      <p>
        <strong>Created At:</strong> {book?.createdAt}
      </p>
      <p>
        <strong>Last Updated:</strong> {book?.updatedAt}
      </p>
      <div className="d-flex flex-wrap pt-3 pb-2 justify-content-center">
        <button
          onClick={() => navigate(`/books/${id}/issue`)}
          className="btn m-1 py-3 btn-outline-success flex-grow-1"
          style={{ flexBasis: "40%" }} disabled={book?.quantity===0?true:false}

        >
          IssueBook
        </button>
        <button
          onClick={async () => {
            
            const memberId = window.prompt("Enter member Id: ");
            if (memberId)
              await axios.put(`http://localhost:8080/books/${id}/issues/return?memberId=${memberId}`, null, { withCredentials: true }).then((response) => {
                alert("Status code: " + response.status + ", Book successfully returned!");
                updateQty("increase");
                navigate("/books");
              })
                .catch((err) => window.alert("Status code: " + err.status + ", No issues found for the book with member ID: "+memberId));
          }}
          className="btn  btn-outline-secondary m-1 py-3  flex-grow-1"
          style={{ flexBasis: "40%" }}
        >
          ReturnBook
        </button>

        {user?.username === "admin" ? (
          <>
            <button
              onClick={() => navigate("edit")}
              className="btn m-1 py-3 btn-outline-success flex-grow-1"
              style={{ flexBasis: "40%" }}
            >
              EditBook
            </button>
            <button
              onClick={() => navigate("issueHistory")}
              className="btn  btn-outline-secondary m-1 py-3  flex-grow-1"
              style={{ flexBasis: "40%" }}
            >
              IssueHistory
            </button>
            <button
              onClick={handleDelete}
              className="btn  btn-outline-danger m-1 py-3 flex-grow-1"
              style={{ flexBasis: "40%" }}
            >
              DeleteBook
            </button>
          </>
        ) : (
          ""
        )}
        <button
          onClick={() => navigate("/books")}
          className="btn btn-outline-primary m-1 py-3 flex-grow-1"
          style={{ flexBasis: "40%" }}
        >
          BackToMenu
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    maxWidth: "500px",
    margin: "20px auto",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  author: {
    fontSize: "18px",
    marginBottom: "10px",
    fontStyle: "italic",
  },
};

export default BookDetails;
