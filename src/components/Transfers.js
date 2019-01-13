import React, { Component } from 'react';
import { 
  Box, 
  Layer, 
  Heading, 
  Form,
  FormField,
  Select, 
  Button, 
  Table, 
  TableHeader, 
  TableRow, 
  TableBody, 
  TableCell, 
  Text 
} from 'grommet';
import Currency from 'react-currency-formatter';
import moment from 'moment';

import AddCreditCardModal from './AddCreditCardModal';
import Notification from './Notification';

import { connect } from 'react-redux';
import { fetchAllTransfers, createTransfer } from '../actions/transfers';
import { fetchAllContacts } from '../actions/contacts';
import { fetchAllCreditCards, addCreditCard } from '../actions/creditCards';
import { getData as getUserData } from '../actions/user';

const COLUMNS = [
  { name: 'createdAt', label: 'Date'},
  { name: 'from', label: 'From'},
  { name: 'to', label: 'To'},
  { name: 'value', label: 'Amount'},
];

const maskCardNumber = (number) => {
  return number.replace(/\d(?=\d{4})/g, "*");
}

class Transfers extends Component {
  state = {
    modalOpen: false,
    needPassword: false,
    transfer: {},
    notificationOpen: false,
    notificationMessage: '',
    notificationError: false,
    amount: '1',
    needCreditCard: false,
    addCreditCard: false,
  }

  componentWillMount = async () => {
    await this.props.fetchAllTransfers();
    await this.props.fetchAllContacts();
    await this.props.fetchAllCreditCards();
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  closeModalPassword = () => {
    this.setState({ needPassword: false });
  }

  openAddCreditCard = () => {
    this.setState({ addCreditCard: true });
  }

  closeAddCreditCard = () => {
    this.setState({ addCreditCard: false });
  }

  makeTransfer = async (event) => {
    const { to, creditCard } = event.value;
    let { amount } = this.state;
    
    if (!amount) {
      amount = '1';
    }

    const convertedValue = parseInt(amount, 10);

    const body = {
      to: to._id,
      value: amount,
      usedCreditCard: !!creditCard 
    };

    if (!this.state.needPassword && convertedValue >= 1000) {
      this.setState({ needPassword: true, transfer: body });
    }
    else {
      await this.props.createTransfer(body).then(
        async (res) => {
          await this.props.fetchAllTransfers();
          await this.props.getUserData();
          this.closeModal.bind(this)();
          this.showNotification.bind(this)('Transfer ok');
        }
      ).catch(err => this.showNotification.bind(this)(err.response.data.error, true));
    }    
  }

  makeTransferWithPassword = async (event) => {
    const { password } = event.value;
    const { transfer } = this.state;

    transfer.password = password;

    await this.props.createTransfer(transfer).then(
      async (res) => {
        await this.props.fetchAllTransfers();
        await this.props.getUserData();
        this.closeModal.bind(this)();
        this.closeModalPassword.bind(this)();
        this.showNotification.bind(this)('Transfer ok');
      }
    ).catch(err => this.showNotification.bind(this)(err.response.data.error, true));
  }

  handleAmountChange = (event) => {
    let amount = event.target.value.replace(/\D/g, '');

    this.setState({ amount, needCreditCard: (amount > this.props.balance) });
  }

  addCreditCard = async (event) => {
    await this.props.addCreditCard(event.value).then(
      async (res) => {
        await this.props.fetchAllCreditCards();
        this.closeAddCreditCard.bind(this)();
        this.showNotification.bind(this)('Credit Card added');
      },
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
    const { 
      modalOpen,
      needPassword,
      amount,
      needCreditCard,
      addCreditCard,
      notificationOpen,
      notificationMessage,
      notificationError
    } = this.state;

    const { contacts, creditCards, transfers } = this.props;
    
    return (
      <Box margin={{ top: '20px' }}>
        <Box width='small'>
          <Button label='Make Transfer' primary onClick={this.openModal.bind(this)} />
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
              {transfers.length > 0 && transfers.map(transfer => (
                <TableRow key={transfer._id}>
                   <TableCell key='createdAt'>
                      <Text>{moment(transfer.createdAt).format('YYYY/MM/DD hh:mm:ss')}</Text>
                  </TableCell>
                  <TableCell key='from'>
                      <Text>{transfer.from.name}</Text>
                  </TableCell>
                  <TableCell key='to'>
                      <Text>{transfer.to.name}</Text>
                  </TableCell>
                  <TableCell key='value'>
                      <Text><Currency quantity={transfer.value} /></Text>
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
                Make Transfer
              </Heading>
              <Form onSubmit={this.makeTransfer.bind(this)}>
                <FormField
                  label='To'
                  name='to'
                  required
                  component={Select}
                  options={contacts}
                  placeholder='Select a contact'
                  labelKey='name'
                  valueKey='_id'
                />
                <FormField
                  label='Amount'
                  name='value'
                  type='number'
                  step='any'
                  value={amount}
                  onChange={this.handleAmountChange.bind(this)}
                />
                {needCreditCard && 
                  <FormField
                    label='Credit Card'
                    name='creditCard'
                    required
                    component={Select}
                    options={creditCards.map(cc => {
                      cc.number = maskCardNumber(cc.number);
                      return cc;
                    })}
                    placeholder='Select a credit card'
                    labelKey='number'
                    valueKey='_id'
                  />
                }
                {needCreditCard && creditCards.length === 0 &&
                  <Box>
                    <Text color='status-critical'>Please, add a credit card</Text>
                    <Button label='Add Credit Card' onClick={this.openAddCreditCard.bind(this)} color='brand' />
                  </Box>
                }
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
                        <strong>Send</strong>
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
        {needPassword && 
          <Layer
            position='center'
            modal
          >
            <Box pad='medium' gap='small' width='medium'>
              <Form onSubmit={this.makeTransferWithPassword.bind(this)}>
                  <Heading level={3} margin='none'>
                    Enter password
                  </Heading>
                  <FormField
                    label='Password'
                    name='password'
                    type='password'
                    required
                  />
                  <Box
                    as='footer'
                    gap='small'
                    direction='row'
                    align='center'
                    justify='end'
                    pad={{ top: 'medium', bottom: 'small' }}
                    >
                    <Button label='Cancel' onClick={this.closeModalPassword.bind(this)} color='dark-2' />
                    <Button
                      type='submit'
                      label={
                        <Text color='white'>
                          <strong>Submit</strong>
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
        {addCreditCard &&
          <AddCreditCardModal onSubmit={this.addCreditCard.bind(this)} onCancel={this.closeAddCreditCard.bind(this)} />
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
    transfers: state.transfers,
    contacts: state.contacts,
    creditCards: state.creditCards,
    balance: state.user.balance
  }
}

export default connect(mapStateToProps, { 
  fetchAllTransfers,
  createTransfer,
  fetchAllContacts,
  fetchAllCreditCards,
  addCreditCard,
  getUserData
})(Transfers);