import React, { useReducer } from 'react';
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
    reducer: {
        user: useReducer
    },
  })



