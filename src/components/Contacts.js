import React, { Component } from 'react';
import { 
  Box, 
  Layer, 
  Heading, 
  Form,
  FormField,
  TextInput, 
  Button, 
  Table, 
  TableHeader, 
  TableRow, 
  TableBody, 
  TableCell, 
  Text 
} from 'grommet';
import { Trash } from 'grommet-icons';

import { connect } from 'react-redux';
import { fetchAllContacts, addContact, removeContact } from '../actions/contacts';

const COLUMNS = [
  { name: 'name', label: 'Name'},
  { name: 'email', label: 'E-mail'},
  { name: 'remove', label: 'Remove'},
];

class Contacts extends Component {
  state = {
    modalOpen: false
  }

  componentWillMount = async () => {
    await this.props.fetchAllContacts();
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  addContact = async (event) => {
    await this.props.addContact({ 
      email: event.value.email,
    }).then(
      async (res) => {
        await this.props.fetchAllContacts();
        this.closeModal.bind(this)();
      },
    ).catch(err => alert(err.response.data.error));
  }

  removeContact = async (id) => {
    await this.props.removeContact(id).then(
      async (res) => {
        await this.props.fetchAllContacts();
      }
    ).catch(err => alert(err.response.data.error));
  }

  render() {
    const { modalOpen } = this.state;
    
    return (
      <Box margin={{ top: '20px' }}>
        <Box width='small'>
          <Button label='Add Contact' primary onClick={this.openModal.bind(this)} />
        </Box>
        <Box margin={{ top: '20px' }}>
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.map(c => (
                  <TableCell key={c.name}>
                    <Text>{c.label}</Text>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.contacts.length > 0 && this.props.contacts.map(contact => (
                <TableRow key={contact._id}>
                  <TableCell key='name'>
                      <Text>{contact.name}</Text>
                  </TableCell>
                  <TableCell key='email'>
                      <Text>{contact.email}</Text>
                  </TableCell>
                  <TableCell key='remove'>
                    <Button icon={<Trash/>} label='' onClick={this.removeContact.bind(this, contact._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {modalOpen && 
          <Layer
            position='center'
            modal
          >
          <Box pad='medium' gap='small' width='medium'>
              <Heading level={3} margin='none'>
                Add Contact
              </Heading>
              <Form onSubmit={this.addContact.bind(this)}>
                <FormField
                  label='E-mail'
                  name='email'
                  type='email'
                  required
                  component={TextInput}
                  placeholder='Enter contact e-mail'
                  labelKey='name'
                  valueKey='_id'
                />
                <Box
                  as='footer'
                  gap='small'
                  direction='row'
                  align='center'
                  justify='end'
                  pad={{ top: 'medium', bottom: 'small' }}
                  >
                  <Button label='Cancel' onClick={this.closeModal.bind(this)} color='dark-2' />
                  <Button
                    type='submit'
                    label={
                      <Text color='white'>
                        <strong>Add</strong>
                      </Text>
                    }
                    primary
                    color='status-ok'
                  />
                </Box>
              </Form>
            </Box>
          </Layer>
        }
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps, { 
  fetchAllContacts,
  addContact,
  removeContact
})(Contacts);