import React from 'react';
import { TextField } from '@material-ui/core';

function ChatInput() {
  const [message, setMessage] = React.useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle message submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type your message here..."
        value={message}
        onChange={handleChange}
      />
    </form>
  );
}

export default ChatInput;
