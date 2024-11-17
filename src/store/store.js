

import {configureStore} from '@reduxjs/toolkit';
import authSlice from '@/store/features/authSlice';
import documentSlice from '@/store/features/documentSlice';

const store = configureStore({
    reducer:{
        auth: authSlice,
        document: documentSlice
    }
})

export default store