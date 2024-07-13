
const job = require("../models/job");

const createJobPost = async (req, res, next) => {
    try {

        const currentUserId = req.currentUserId;
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            jobType,
            skills,
            information,    
        } = req.body;

        
    
        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills ||
            !jobType ||
            !information
        ) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const jobDetails = new job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            jobType,
            information,
            refUserId : currentUserId,  // 
        });

        await jobDetails.save();
        res.json({ message: "job created successfully " });
    } catch (error) {
        // console.log(error)
        // res.status(500).json({ errorMessage: "Something went Wrong" });
        next(error);
    }
};

//creating getJobDetails API

const getJobDetailsById = async(req ,res , next) => {
    try {
        const {jobId} = req.params;

        if(!jobId){
            return res.status(400).json({errorMessage :  "Bad request"});
        }

        const jobDetails = await job.findById(jobId);
        if(!jobDetails) {
            res.status(400).json({errorMessage : "Bad request"});
        }

        res.json({jobDetails});
    } catch (error) {
        next(error)
    }
}



//creating updateJobDetailsById API

const updateJobDetailsById = async (req , res , next) => {
  
    try {
        const jobId = req.params.jobId;
        
        if(!jobId) {
            return res.status(400).json({ errorMessage :  "Bad request"});
        }

        //checking does job exists

        const isJobExists = await job.findOne({ _id : jobId});
        if (!isJobExists) {
            return res.status(400).json({errorMessage : "Bad request"});    
        }


        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            jobType,
            skills,
            information,    
        } = req.body;

        
    
        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills ||
            !jobType ||
            !information
        ) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await job.updateOne({ _id :  jobId}, {$set  : {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            jobType,
            skills,
            information, 
        }})

        res.json({message : "Job updated successfully"});

    } catch (error) {
        next(error);
    }
}


const getAllJobs = async (req , res , next) => {

    try {
        
        //passing the query 
        const searchQuery = req.query.searchQuery || "";
        const  skills = req.query.skills;
        
        console.log(searchQuery)
        //converting into array
        let filterSkills;
        let filter = {}
        if(skills && skills.length> 0){
            filterSkills = skills.split(",");
        const caseInsensitiveFilteredSkills  = filterSkills.map( (element) => new RegExp(element , ("i")));

        filterSkills = caseInsensitiveFilteredSkills;
            
             filter = { skills : {$in : filterSkills}, }
        };

        // //now above array inot reqex
        // console.log(caseInsensitiveFilteredSkills);

        // console.log(caseInsensitiveFilteredSkills);

        // upto here case and senstive its solved but 
        // filter = {skills : {$in :filterSkills}};

        const jobList =  await job.find(
            {title : {$regex : searchQuery, $options: "i"},
            ...filter
        },
             {companyName: 1 , description : 1 , title : 1});
        res.json({data : jobList})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createJobPost,
    getJobDetailsById,
    updateJobDetailsById,
    getAllJobs,
};
