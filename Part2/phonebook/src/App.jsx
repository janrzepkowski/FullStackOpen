import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Person from "./components/Person";
import Notification from "./components/Notification";

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} />
  </div>
);

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ personsToShow, removePerson }) => (
  <div>
    {personsToShow.map((person) => (
      <div key={person.id}>
        <Person person={person} deletePerson={() => removePerson(person.id)} />
      </div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("notification");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      updatePerson(existingPerson);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebookService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotification(`Added ${returnedPerson.name}`);
          setNotificationType("notification");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          if (
            error.response.data.includes(
              "is shorter than the minimum allowed length"
            )
          ) {
            setNotification(
              `Person validation failed: name: Path \`name\` (\`${newName}\`) is shorter than the minimum allowed length (3).`
            );
          } else if (
            error.response.data.includes("is not a valid phone number")
          ) {
            setNotification(
              `Person validation failed: number: Path \`number\` (\`${newNumber}\`) is not a valid phone number.`
            );
          }
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const updatePerson = (existingPerson) => {
    const updatedPerson = { ...existingPerson, number: newNumber };

    if (
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      phonebookService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          setNotification(`Updated ${returnedPerson.name}`);
          setNotificationType("notification");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setNotificationType("error");
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
