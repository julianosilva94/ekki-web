import React, { Component } from 'react';
import { 
  Box, 
  Layer, 
  Heading, 
  Form,
  FormField,
  TextInput, 
  MaskedInput,
  Button, 
  Table, 
  TableHeader, 
  TableRow, 
  TableBody, 
  TableCell, 
  Text 
} from 'grommet';
import { Trash } from 'grommet-icons';

import Notification from './Notification';

import { connect } from 'react-redux';
import { fetchAllCreditCards, addCreditCard, removeCreditCard } from '../actions/creditCards';

const COLUMNS = [
  { name: 'number', label: 'Card Number'},
  { name: 'expirationDate', label: 'Expiration'},
  { name: 'remove', label: 'Remove'},
];

const maskCardNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*");
}

class CreditCards extends Component {
  state = {
    modalOpen: false,
    notificationOpen: false,
    notificationMessage: '',
    notificationError: false,
  }

  componentWillMount = async () => {
    await this.props.fetchAllCreditCards();
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  addCreditCard = async (event) => {
    await this.props.addCreditCard(event.value).then(
      async (res) => {
        await this.props.fetchAllCreditCards();
        this.closeModal.bind(this)();
        this.showNotification.bind(this)('Credit Card added');
      },
    ).catch(err => this.showNotification.bind(this)(err.response.data.error, true));
  }

  removeCreditCard = async (id) => {
    await this.props.removeCreditCard(id).then(
      async (res) => {
        await this.props.fetchAllCreditCards();
        this.showNotification.bind(this)('Credit Card removed');
      }
    ).catch(err => this.showNotification.bind(this)(err.response.data.error, true));
  }

  showNotification = (notificationMessage, error = false) => {
    this.setState({ 
      notificationMessage,
      notificationOpen: true,
      notificationError: error
    });
    
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  closeNotification = () => {
    this.setState({ notificationOpen: false });
  }

  render() {
    const { modalOpen, notificationOpen, notificationMessage, notificationError } = this.state;
    
    return (
      <Box margin={{ top: '20px' }}>
        <Box width='small'>
          <Button label='Add Credit Card' primary onClick={this.openModal.bind(this)} />
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
              {this.props.creditCards.length > 0 && this.props.creditCards.map(creditCard => (
                <TableRow key={creditCard._id}>
                  <TableCell key='number'>
                      <Text>{maskCardNumber(creditCard.number)}</Text>
                  </TableCell>
                  <TableCell key='expirationDate'>
                      <Text>{creditCard.expirationDate}</Text>
                  </TableCell>
                  <TableCell key='remove'>
                    <Button icon={<Trash/>} label='' onClick={this.removeCreditCard.bind(this, creditCard._id)} />
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
                Add Credit Card
              </Heading>
              <Form onSubmit={this.addCreditCard.bind(this)}>
                <FormField
                  label='Card Number'
                  name='number'
                  type='text'
                  required
                  component={MaskedInput}
                  placeholder=''
                  mask={[
                    {
                      regexp: /^[0-9]*$/,
                    },
                  ]}
                  maxLength='16'
                />
                <FormField
                  label='Expiration'
                  name='expirationDate'
                  type='text'
                  required
                  component={MaskedInput}
                  placeholder=''
                  mask={[
                    {
                      length: [1, 2],
                      regexp: /^[0-9][0-9]$|^[0-9]$/,
                      placeholder: "YY"
                    },
                    { fixed: "/" },
                    {
                      length: [1, 2],
                      options: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12"
                      ],
                      regexp: /^1[1-2]$|^[0-9]$/,
                      placeholder: "MM"
                    },
                  ]}
                />
                <FormField
                  label='Holder Name'
                  name='holderName'
                  type='text'
                  required
                  component={TextInput}
                  placeholder=''
                />
                <FormField
                  label='Security Code'
                  name='securityCode'
                  type='text'
                  required
                  component={MaskedInput}
                  placeholder=''
                  mask={[
                    {
                      regexp: /^[0-9]*$/,
                    },
                  ]}
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
        {notificationOpen && 
          <Notification 
            message={notificationMessage}
            error={notificationError}
            onClose={this.closeNotification.bind(this)} />
        }
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    creditCards: state.creditCards
  }
}

export default connect(mapStateToProps, { 
  fetchAllCreditCards,
  addCreditCard,
  removeCreditCard
})(CreditCards);