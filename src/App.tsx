import React, { Component } from "react";
import users from "./users.json";
import styled from "styled-components";
import { User } from "./User";

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: Transparent;
  border-collapse: collapse;
`;
const Th = styled.th`
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  text-align: inherit;
`;
const Td = styled.td`
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
`;
const Tr = styled.tr`
  &:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
`;
function formatDate(date: string) {
  let d = new Date(date);
  return (
    paddingZero(d.getUTCDate()) +
    "/" +
    paddingZero(d.getUTCMonth() + 1) +
    "/" +
    d.getFullYear()
  );
}

function paddingZero(n: number) {
  return n < 10 ? "0" + n : n;
}

function formatPhone(p: string) {
  return "+84" + p.replace(/-/g, "");
}

class App extends React.Component<
  any,
  { users: User[]; field: string; sort: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      sort: true,
      field: "id",
      users: users,
    };
  }
  handeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const field = event.target.value;

    if (this.state.sort) {
      (users as User[]).sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        return 1;
      });
    } else {
      (users as User[]).sort((a, b) => {
        if (a[field] > b[field]) {
          return -1;
        }
        return 1;
      });
    }
    this.setState({ users, field: field, sort: this.state.sort });
  };

  handeChangeSort = () => {
    const myField = this.state.field;
    const mySort = this.state.sort;
    if (mySort) {
      (users as User[]).sort((a, b) => {
        if (a[myField] > b[myField]) {
          return -1;
        }
        return 1;
      });
      this.setState({ users: users, field: myField, sort: !mySort });
    } else {
      (users as User[]).sort((a, b) => {
        if (a[myField] < b[myField]) {
          return -1;
        }
        return 1;
      });
      this.setState({ users: users, field: myField, sort: !mySort });
    }
  };

  render() {
    return (
      <div>
        <select onChange={this.handeChange}>
          <option value="id">id</option>
          <option value="firstName">firstname</option>
          <option value="email">email</option>
          <option value="phone">phone</option>
          <option value="salary">salary</option>
        </select>
        <button onClick={this.handeChangeSort}>~</button>

        {this.state.users.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Table>
              <thead>
                <Tr>
                  <Th scope="col">Id</Th>
                  <Th scope="col">First Name</Th>
                  <Th scope="col">Last Name</Th>
                  <Th scope="col">Email</Th>
                  <Th scope="col">Gender</Th>
                  <Th scope="col">Birthday</Th>
                  <Th scope="col">Salary</Th>
                  <Th scope="col">Phone</Th>
                </Tr>
              </thead>
              <tbody>
                {(this.state.users as User[]).map((user, index) => {
                  return <UserComponent key={index} user={user} />;
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>
    );
  }
}

class UserComponent extends Component<any> {
  render() {
    let { user } = this.props;
    // console.log(user);

    return (
      <Tr>
        <Th scope="row">{user.id}</Th>
        <Td>{user.firstName}</Td>
        <Td>{user.lastName}</Td>
        <Td>{user.email}</Td>
        <Td>{user.gender}</Td>
        <Td>{formatDate(user.birthday)}</Td>
        <Td>{user.salary}</Td>
        <Td>{formatPhone(user.phone)}</Td>
      </Tr>
    );
  }
}

export default App;
