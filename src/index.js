import React from 'react';
import ReactDOM from 'react-dom/client';

class Task1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const inputStyle = {
      border: value.length >= 4 && value.length <= 9 ? '2px solid green' : '2px solid red',
      padding: '5px',
      borderRadius: '5px',
      fontSize: '16px',
    };

    return (
      <div>
        <p>Task 1</p>
        <input type="text" value={value} onChange={this.handleChange} style={inputStyle} />
      </div>
    );
  }
}

class Task2 extends React.Component {
  constructor() {
    super();

    this.state = {
      employees:  [
        {firstName: 'John', lastName: 'Doe', salary: 50000, gender: 'male'},
        {firstName: 'Jane', lastName: 'Doe', salary: 60000, gender: 'female'},
        {firstName: 'Bob', lastName: 'Smith', salary: 70000, gender: 'male'},
        {firstName: 'Alice', lastName: 'Johnson', salary: 55000, gender: 'female'},
      ],
      newEmployee: {
        firstName: '',
        lastName: '',
        salary: '',
        gender: 'male'
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState((prevState) => ({
      newEmployee: {
        ...prevState.newEmployee,
        [name]: value
      }
    }));
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState((prevState) => ({
      newEmployee: {
        ...prevState.newEmployee,
        gender: value
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const newEmployee = this.state.newEmployee;

    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.salary) {
      alert('Please fill in all fields');
      return;
    }

    this.setState((prevState) => ({
      employees: [...prevState.employees, newEmployee],
      newEmployee: {
        firstName: '',
        lastName: '',
        salary: '',
        gender: 'male'
      }
    }));
  }

  render() {
    const employees = this.state.employees.map((employee, index) => (
      <tr key={index}>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.salary}</td>
        <td>{employee.gender}</td>
      </tr>
    ));

    return (
      <div>
        <p>Task 2</p>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salary</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {employees}
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={this.state.newEmployee.firstName} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" value={this.state.newEmployee.lastName} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Salary:
            <input type="text" name="salary" value={this.state.newEmployee.salary} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Gender:
            <select name="gender" value={this.state.newEmployee.gender} onChange={this.handleSelectChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <button type="submit">Add Employee</button>
        </form>
      </div>
    );
  }
}

class Task3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: props.employees.slice(0, 10),
      currentPage: 1,
      totalPages: Math.ceil(props.employees.length / 10)
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(event) {
    const pageNumber = Number(event.target.dataset.page);
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = startIndex + 10;

    this.setState({
      employees: this.props.employees.slice(startIndex, endIndex),
      currentPage: pageNumber
    });
  }

  render() {
    const { employees, currentPage, totalPages } = this.state;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div>
        <p>Task 3</p>
        <table>
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Прізвище</th>
              <th>Зарплата</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {pages.map(pageNumber => (
            <a
              key={pageNumber}
              href="/"
              data-page={pageNumber}
              onClick={this.handlePageClick}
              style={{ fontWeight: pageNumber === currentPage ? 'bold' : 'normal' }}
            >
              {pageNumber}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

const employees = [
  { id: 1, firstName: 'John', lastName: 'Doe', salary: 50000 },
  { id: 2, firstName: 'Jane', lastName: 'Doe', salary: 60000 },
  { id: 3, firstName: 'John', lastName: 'Doe', salary: 50000 },
  { id: 4, firstName: 'Jane', lastName: 'Doe', salary:4343000 },
  { id: 5, firstName: 'John', lastName: 'Doe', salary: 53434000 },
  { id: 6, firstName: 'Jane', lastName: 'Doe', salary: 60000 },
  { id: 7, firstName: 'John', lastName: 'Doe', salary: 34300 },
  { id: 8, firstName: 'Jane', lastName: 'Doe', salary: 434300 },
  { id: 9, firstName: 'John', lastName: 'Doe', salary: 12100 },
  { id: 10, firstName: 'Jane', lastName: 'Doe', salary: 23000 },
  { id: 11, firstName: 'John', lastName: 'Doe', salary: 51000 },
  { id: 12, firstName: 'Jane', lastName: 'Doe', salary: 440000 },
  { id: 13, firstName: 'John', lastName: 'Doe', salary: 5343000 },
  { id: 14, firstName: 'Jane', lastName: 'Doe', salary: 6034000 },
  { id: 15, firstName: 'John', lastName: 'Doe', salary: 50000 },
  { id: 16, firstName: 'Jane', lastName: 'Doe', salary: 6003400 },
  { id: 17, firstName: 'John', lastName: 'Doe', salary: 50000 },
  { id: 18, firstName: 'Jane', lastName: 'Doe', salary: 60000 },
  { id: 19, firstName: 'John', lastName: 'Doe', salary: 50000 },
  { id: 20, firstName: 'Jane', lastName: 'Doe', salary: 60000 },
];

class Task4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cities: []
    };
  }

  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  }

  handleAddCity = () => {
    const { city, cities } = this.state;

    if (city) {
      this.setState({ cities: [...cities, city], city: '' });
    }
  }

  handleSelectCity = (event) => {
    const selectedCity = event.target.value;
    const { cities } = this.state;

    this.setState({ selectedCity });

    const selectedCityName = cities.find(city => city === selectedCity);
    const result = document.getElementById('result');

    if (selectedCityName) {
      result.innerHTML = `Вибране місто: ${selectedCityName}`;
    }
  }

  render() {
    const { city, cities, selectedCity } = this.state;

    return (
      <div>
        <p>Task 4</p>
        <input type="text" value={city} onChange={this.handleCityChange} />
        <button onClick={this.handleAddCity}>Додати місто</button>
        <br />
        <select value={selectedCity} onChange={this.handleSelectCity}>
          <option value="">Оберіть місто</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <br />
        <p id="result"></p>
      </div>
    );
  }
}

class Task5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 0,
      exchangeRates: {
        USD: { EUR: 0.84, GBP: 0.73 },
        EUR: { USD: 1.19, GBP: 0.87 },
        GBP: { USD: 1.38, EUR: 1.15 }
      }
    };
  }

  handleFromCurrencyChange = (event) => {
    this.setState({ fromCurrency: event.target.value });
  };

  handleToCurrencyChange = (event) => {
    this.setState({ toCurrency: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  convertCurrency = () => {
    const { fromCurrency, toCurrency, amount, exchangeRates } = this.state;
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    return convertedAmount.toFixed(2);
  };

  render() {
    const { fromCurrency, toCurrency, amount } = this.state;
    return (
      <div>
        <p>Task 5</p>
        <h1>Currency Calculator</h1>
        <div>
          <label htmlFor="from-currency">From:</label>
          <select id="from-currency" value={fromCurrency} onChange={this.handleFromCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label htmlFor="to-currency">To:</label>
          <select id="to-currency" value={toCurrency} onChange={this.handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={this.handleAmountChange} />
        </div>
        <p>{this.convertCurrency()}</p>
      </div>
    );
  }
}

class Task6 extends React.Component {
  state = {
    test: [
      {
        question: 'Питання 1',
        answers: [
          'Відповідь 1',
          'Відповідь 2',
          'Відповідь 3',
          'Відповідь 4',
          'Відповідь 5',
        ],
        right: 3, //номер правильної відповіді
      },
      {
        question: 'Питання 2',
        answers: [
          'Відповідь 1',
          'Відповідь 2',
          'Відповідь 3',
          'Відповідь 4',
          'Відповідь 5',
        ],
        right: 1, //номер правильної відповіді
      },
      {
        question: 'Питання 3',
        answers: [
          'Відповідь 1',
          'Відповідь 2',
          'Відповідь 3',
          'Відповідь 4',
          'Відповідь 5',
        ],
        right: 0, //номер правильної відповіді
      },
    ],
    selectedAnswers: Array(3).fill(null),
  };

  handleAnswerSelect = (questionIndex, answerIndex) => {
    const { selectedAnswers } = this.state;
    selectedAnswers[questionIndex] = answerIndex;
    this.setState({ selectedAnswers });
  };

  renderQuestion = (question, index) => {
    const { selectedAnswers } = this.state;
    const { question: questionText, answers, right } = question;
    const isAnswered = selectedAnswers[index] !== null;
    const isCorrect = isAnswered && selectedAnswers[index] === right;

    return (
      <div key={index}>
        <p>{questionText}</p>
        {answers.map((answer, i) => (
          <div key={i}>
            <input
              type="radio"
              name={`question${index}`}
              id={`answer${i}`}
              value={i}
              checked={selectedAnswers[index] === i}
              onChange={() => this.handleAnswerSelect(index, i)}
            />
            <label htmlFor={`answer${i}`}>{answer}</label>
          </div>
        ))}
        {isAnswered && (
          <div style={{ color: isCorrect ? 'green' : 'red' }}>
            {isCorrect ? 'Відповідь правильна' : 'Відповідь неправильна'}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { test } = this.state;
    return <div>{test.map(this.renderQuestion)}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Task1/>
    <Task2/>
    <Task3 employees = {employees}/>
    <Task4/>
    <Task5/>
    <Task6/>
  </React.StrictMode>
);