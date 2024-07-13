
--- json to be converted into the mongoDB (goood approach)  as we used add hashed password
--- passing id into the payload  : we have problem we dont know who is creating the job .
-- we can solve it by passing vua front end but we have already token generated which gave us 
   option to request and  store data in db and we can directly get the id from the backedn  which hepls in saving the efforts of  first req data and thein store 
--as we can see in authverification doesneed userid but we need in the create post so .
how we passed it into create post route

-- as we now middleware has complete access to req,res,next   so we added new field in the req object obj and it access anywhere then we gettin the id
   

-- create search and filtering  
-- implemenetin the searchQuery for passing queryParameter 
--problem only exact match wiht queryParameter.
--solving using $rexex and options (where i = case insentive)
--comma seprated string into new array => split
--combines array into string => join
--some problems during array searching - iif QueParam is not properly in order , partial is not possible ..
--now again we will converted over filtered array into $regex
--now problem we solved => ordering => using "$in" clause'
--now if filter is not there (skills ) it should result other ones => using 3rd var as obj
 

