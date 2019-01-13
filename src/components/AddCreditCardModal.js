import React from 'react';
import { 
  Box, 
  Layer, 
  Heading, 
  Form,
  FormField,
  TextInput, 
  MaskedInput,
  Button, 
  Text 
} from 'grommet';

const addCreditCardModal = (props) => (
  <Layer
    position='center'
    modal
  >
  <Box pad='medium' gap='small' width='medium'>
      <Heading level={3} margin='none'>
        Add Credit Card
      </Heading>
      <Form onSubmit={props.onSubmit}>
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
          <Button label='Cancel' onClick={props.onCancel} color='dark-2' />
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
)

export default addCreditCardModal;