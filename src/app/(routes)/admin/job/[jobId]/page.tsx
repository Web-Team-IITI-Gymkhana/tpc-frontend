import {Jobs} from '../../../../../dummyData/job'

interface Props{
    params :{
        jobId:String,
    }
}


const EachJobPage = async ({params}:Props) =>{
    const EachJob = fetchEachJob(params.jobId);
    return (
        <div>
            {params.jobId}
        </div>
    )
}

const fetchEachJob = (id:String) =>{
    // const res = await fetch('')
    // const json = res.json()
    // return json

    return Jobs.find((x)=>x.id === id)
}

export default EachJobPage;


