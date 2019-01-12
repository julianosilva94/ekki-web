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

import { connect } from 'react-redux';
import { fetchAllTransfers, createTransfer } from '../actions/transfers';
import { fetchAllContacts } from '../actions/contacts';

const COLUMNS = [
  { name: 'from', label: 'From'},
  { name: 'to', label: 'To'},
  { name: 'value', label: 'Value'},
];

class Transfers extends Component {
  state = {
    modalOpen: false
  }

  componentWillMount = async () => {
    await this.props.fetchAllTransfers();
    await this.props.fetchAllContacts();
  }

  componentDidMount = () => {
    console.log(this.props.contacts);
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  sendMoney = async (event) => {
    await this.props.createTransfer({ 
      to: event.value.to._id,
      value: event.value.value,
      usedCreditCard: false 
    }).then(
      (res) => {
        this.props.fetchAllTransfers();
        this.closeModal.bind(this)();
      }
    );
  }

  render() {
    const { modalOpen } = this.state;
    
    return (
      <Box margin={{ top: '20px' }}>
        <Box width='small'>
          <Button label='Send Money' primary onClick={this.openModal.bind(this)} />
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
              {this.props.transfers.length > 0 && this.props.transfers.map(transfer => (
                <TableRow key={transfer._id}>
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
                Send Money
              </Heading>
              <Form onSubmit={this.sendMoney.bind(this)}>
                <FormField
                  label='To'
                  name='to'
                  required
                  component={Select}
                  options={this.props.contacts}
                  placeholder='Select a contact'
                  labelKey='name'
                  valueKey='_id'
                />
                <FormField
                  label='Amount'
                  name='value'
                  type='number'
                  step='any'
                  min='0'
                  max={this.props.balance}
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
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    transfers: state.transfers,
    contacts: state.contacts,
    balance: state.user.balance
  }
}

export default connect(mapStateToProps, { 
  fetchAllTransfers, 
  createTransfer, 
  fetchAllContacts, 
})(Transfers);