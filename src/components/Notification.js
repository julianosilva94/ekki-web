import React, { Component } from 'react';
import { Box, Layer, Button, Text } from 'grommet';
import { StatusGood, StatusCritical, FormClose } from 'grommet-icons';

class Notification extends Component {
  render() {
    const { onClose, message, error } = this.props;
    return (
      <Layer
        position="bottom"
        full="horizontal"
        modal={false}
        responsive={false}
        onEsc={onClose}
        plain
      >
        <Box
          align="start"
          pad={{ vertical: "medium", horizontal: "small" }}
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            round="medium"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
            background={ error ? 'status-error' : 'status-ok' }
          >
            <Box align="center" direction="row" gap="xsmall">
              { error ? <StatusCritical /> : <StatusGood /> }
              <Text>{message}</Text>
            </Box>
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Box>
      </Layer>
    );
  }
};

export default Notification;