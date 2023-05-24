export default function errorMessage(ex){
    let errorMessage = ex.message;
    if(ex?.response && ex.response?.data?.message){
        errorMessage = ex.response.data.message;
    }
    return errorMessage
}