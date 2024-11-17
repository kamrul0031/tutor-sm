const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    adminDocStatus : false,
    adminDocumentData : null,
    userDocStatus : false,
    userDocumentData : null 
}

const documentSlice = createSlice({
    name : "documentSlice",
    initialState, 
    reducers:{
       getAdminDocuments : (state , action) => {
        state.adminDocStatus = true;
        state.adminDocumentData = action.payload
       }, 
       notGetAdminDocuments : (state ) => {
        state.adminDocStatus = false;
        state.adminDocumentData = null
       },
       getUserDocuments : (state , action) => {
        state.userDocStatus = true;
        state.userDocumentData = action.payload
       }, 
       notGetUserDocuments : (state ) => {
        state.userDocStatus = false;
        state.userDocumentData = null
       }

    }
})

export const {getAdminDocuments , notGetAdminDocuments , getUserDocuments, notGetUserDocuments } = documentSlice.actions
export default documentSlice.reducer