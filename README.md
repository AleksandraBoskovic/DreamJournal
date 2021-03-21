# DreamJournal

Start app:

nodemon server.js


Routes :

http://localhost:3000/dream/allDreams     --> get all elem

http://localhost:3000/dream/allDreamType  --> get all type dream elem

http://localhost:3000/dream/filtered      --> get all who meet the conditions given by list like this ["filterName":"filterValue"]

http://localhost:3000/dream/addDream      --> post new dream 

http://localhost:3000/dream/:dreamId      --> get by id

http://localhost:3000/dream/:dreamId      -->patch el by id, body have el we want to change   ["fieldName":"fieldValue"]

http://localhost:3000/dream/:dreamId      -->delete el by id
