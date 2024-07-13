context one 
--user should be login before posting job
--making use of json verify token   (flow : middleware => router)
--adding middleware check into post api 
--taking token when generated user as login (here manually passing further into authrization)
--adding the authorization and passing the token in thundeCLient
--middleware has 3 params (req,res,next means total cotrol it)

context two

validate token
first request the token genreated
validated via 
--current userId is not passed as parameter it is upated via request object
--currentuserid is refId which intiaalt created as mongoose.objectId in schema
--payload used to store value value and token and that token helps to getData but need to be decoded


context three (creating update API)
--in order the update job post we need send jobid from front end
--all the field should be updated rather than the filtering which fields needs to be updated (sending the complete paylload rather than selected ones)
--making use of updateOne with _id and set operator
--api can be put or patch --using put   
--while api testing => method put and id should be passed {here id is object id from db which we made using refID}


context four API getAllJobs
--getting all jobs using find({})
--find accepts second para called projection used to project desired field only (where field : 1 , 1 represe presentatn )