import { batch } from "react-redux";


export default function TempComp() {







  const adminData = {
    clientName :"John Doe",
    ccName :"binay point",
    contact :"1234567890",
    address :"123 Main St, Anytown, USA",
    clientImgId :"1234567890",
    blgGrp:"O+",
    routineShedule :[
      {
        id:1,
        date :"01/01/2023",
        time :"10:00 AM",
        work :"add todo type"
      }
    ],
    batches: [
      {
        id:1,
        startTime :"01/01/2023",
        batchName :"Batch 1",
        duration :"3 months",
        perStudentFee :"1000",
        studentsId : [],//selected students uId will be stored here
        location: "Location 1",
        routine: {
          days: ["Monday", "Tuesday", "Wednesday"],
          classTime: "10:00 AM",
        }
        //show the due payments in every batches usign those batches sutdentsId->duePayment->sumAll
      }
    ]


  }
























  return (
    <> 
 
    </>
    
  );
}