const Header = (props) => {
  return <h2>{props.name}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  const content = props.parts.map((part) => (
    <Part key={part.id} part={part.name} exercise={part.exercises} />
  ));

  return <div>{content}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return <h4>total of {total} exercises</h4>;
};

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
