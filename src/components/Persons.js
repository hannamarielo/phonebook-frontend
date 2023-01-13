import App from "../App"
import Person from "./Person";
import '../index.css';

const Persons = ({ filter, persons, filteredPersons, deletePerson }) => (
    <div className="persons">
      {filter === null
        ? persons?.map(person => (
          <Person
            key={person.name}
            person={person}
            deletePerson={deletePerson}
          />
        ))
        : filteredPersons?.map(filteredPerson => (
          <Person
            key={filteredPerson.name}
            person={filteredPerson}
            deletePerson={deletePerson}
          />
        ))}
    </div>
  );

  export default Persons