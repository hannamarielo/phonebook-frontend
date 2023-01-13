import App from "../App"

const Person = ({ person, deletePerson }) => (
  <div className="person">
    <span className="person">{person.name + " "}</span>
    <span className="person">{person.number + " "}</span>
    <button className='deletebutton' onClick={() => deletePerson(person.id)}>Delete</button>
  </div>
);
  export default Person