import conf from "./appwrite/conf";


export default function middleware(request) {
    
    // console.log("request", request)
    // const authToken = request.cookies.get(`a_session_${conf.appwrite_project_id}`)?.value;
    // console.log("proid : ", conf.appwrite_project_id)
    // console.log("authToken:", authToken);
    // console.log("Cookies:", request.cookies);

}

export const config = {
    // matcher: ["/login", "/user-dashboard", "/admin-dashboard"],
}
