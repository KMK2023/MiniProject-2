import { useState } from "react";
import { useEffect } from "react";
// import './BigPlace.css'

const Place = [
  {
    id: 1,
    name: "Location1",
    DateMonthYear: "00-00-2023",
    image:
      'Image by <a href="https://www.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_19894677.htm#query=traveling%20day&position=0&from_view=search&track=ais&uuid=2c7e778d-c0ce-4455-85d2-93252f27a5c3">Freepik</a>',
  },
  {
    id: 2,
    name: "Location2",
    DateMonthYear: "06-08-2022",
    image:
      "https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153262.jpg?2&w=1380&t=st=1700720481~exp=1700721081~hmac=d43aa2166fd0a7b7a3b3982c6086b9703a86da0cd5ab9e71e423646f6b38f7c4",
  },
  {
    id: 3,
    name: "Location3",
    DateMonthYear: "09-07-2012",
    image:
      "https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg?w=1800&t=st=1700720525~exp=1700721125~hmac=d038839c13f64aab4033079f3a9e03630b3b90a46ffefde53066aae68c9b5a20",
  },
  {
    id: 4,
    name: "Location4",
    DateMonthYear: "12-08-2023",
    image:
      "https://img.freepik.com/free-photo/holiday-travel-icon-vacation-concept_53876-120873.jpg?w=1480&t=st=1700720549~exp=1700721149~hmac=891a68de38d620aa86fa20606ade00a39169e54a4b6091c8eb2687d31a4a0cbd",
  },
  {
    id: 5,
    name: "Location5",
    DateMonthYear: "11-01-2000",
    image:
      "https://img.freepik.com/free-photo/travelling-concept-with-group-travelers-miniature_1150-17844.jpg?w=1480&t=st=1700720566~exp=1700721166~hmac=5b9eada1f0d009c5d2f4903c972b9ce1b5199204867d321d065fdd253caba9d9",
  },
  {
    id: 6,
    name: "Location6",
    DateMonthYear: "30-06-2012",
    image:
      "https://img.freepik.com/free-photo/top-view-traveling-items-wooden-background_23-2148971050.jpg?w=1480&t=st=1700720620~exp=1700721220~hmac=7f61ba285f269541b5246cc42d41e6f508d9c01c197eb3df3823825671c03b33",
  },
  {
    id: 7,
    name: "Location7",
    DateMonthYear: "03-03-2011",
    image:
      "https://img.freepik.com/free-photo/planning-traveling-trip-notes-wanderkust_53876-127488.jpg?w=1480&t=st=1700720642~exp=1700721242~hmac=9134eb763cc2eeb977e80ebdab5ec8c2003021906b1b72734263e92df6130304",
  },
];

function SinglePlaces({ id, title, description, image, onRemovePlace }) {
  return (
    <li>
      <img src={image} width="400" alt={name} />
      <h3>{title}</h3>
      <em>({description})</em>&nbsp;
      <a onClick={() => onRemovePlace(id)}>Delete</a>
    </li>
  );
}

function AddPlaceForm({ onAddplace }) {
  const [name, setName] = useState("");
  const [DateMonthYear, setDateMonthYear] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleAddplace = (e) => {
    e.preventDefault();
    onAddplace({ name, DateMonthYear, image: imageURL });
  };

  return (
    <div
      style={{ backgroundColor: "#a3a38f", color: "black", border: "solid" }}
    >
      <form onSubmit={handleAddplace}>
        <h3>Add New Memory</h3>
        <label>
          Name:
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            name="DateMonthYear"
            value={DateMonthYear}
            onChange={(e) => setDateMonthYear(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            name="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image File:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
        <br />

        <button>Add Place</button>
      </form>
    </div>
  );
}

function Cardslots() {
  const serverUrl = "http://localhost:8080/api/posts/";

  const [currentPlace, setcurrentPlace] = useState([]);
  const [allPlaces,setAllPlaces] = useState([])

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch(serverUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log({data});

        setAllPlaces(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // The empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  const handleSortPlace = () => {
    let newPlace = [...currentPlace];
    newPlace.sort((place1, place2) => (place1.name < place2.name ? -1 : 1));
    setcurrentPlace(newPlace);
  };

  const handleReversePlace = () => {
    let newPlace = [...currentPlace];
    newPlace.reverse();
    setcurrentPlace(newPlace);
  };

  const handleFilterPlace = () => {
    let newPlace = currentPlace.filter((place) =>
      place.DateMonthYear.startsWith("Panthera")
    );
    setcurrentPlace(newPlace);
  };

  const handleResetPlace = () => {
    setcurrentPlace(Place);
  };

  const handleAddplace = (newplace) => {
    //newplace.id = currentPlace.length + 1; // not reliable, especially when deleting
    newplace.id =
      currentPlace.reduce((maxId, place) => Math.max(maxId, place.id), 0) + 1; // more reliable
    setcurrentPlace([...currentPlace, newplace]);
  };

  // const handleRemoveplace = (deleteId) => {
  //     let newPlace = currentPlace.filter(place => place.id != deleteId);
  //     setcurrentPlace(newPlace);
  // }

  const handleRemoveplace = (deleteId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this place?"
    );

    if (shouldDelete) {
      let newPlace = currentPlace.filter((place) => place.id !== deleteId);
      setcurrentPlace(newPlace);
    }
  };

  const placeList = allPlaces.map((place) => (
    <SinglePlaces
      title={place.title}
      description={place.description}
      key={place.id}
      image={place.image}
      id={place.id}
      onRemovePlace={handleRemoveplace}
    />
  ));

  return (
    <>
      <div
        style={{
          backgroundColor: "#747464",
          color: "black",
          border: "solid",
          padding: "20px",
        }}
      >
        <h2>Places I have visited</h2>
        <ul>{placeList}</ul>

        <div>
          <button onClick={handleSortPlace}>Sort Alphabetically</button>
          <button onClick={handleReversePlace}>Reverse List</button>
        </div>
        <div>
          <button onClick={handleFilterPlace}>Filter Places</button>
          <button onClick={handleResetPlace}>Reset List</button>
        </div>
        <AddPlaceForm onAddplace={handleAddplace} />
      </div>
    </>
  );
}

export default Cardslots;
