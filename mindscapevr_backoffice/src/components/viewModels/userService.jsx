// userService.js

import axios from 'axios';

export async function getUsers() {
  try {
    const response = await axios.get('http://localhost:6969/users');
    return response.data.list; // Assuming the response has a property called "list" containing the user list
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
}
