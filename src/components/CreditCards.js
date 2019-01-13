import React, { Component } from 'react';
import { 
  Box, 
  Button, 
  Table, 
  TableHeader, 
  TableRow, 
  TableBody, 
  TableCell, 
  Text 
} from 'grommet';
import { Trash } from 'grommet-icons';

import AddCreditCardModal from './AddCreditCardModal';
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
          <AddCreditCardModal onSubmit={this.addCreditCard.bind(this)} onCancel={this.closeModal.bind(this)} />
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