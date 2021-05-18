# Lemonade-Exercise

# Requirements
    
    node.js version 12 or above
    npm

# How to install

    npm install

# How to start

    npm start

# Requests - Word count

URL
    
    method: POST
    url: localhost:9101/word/counter
    body(row - JSON): {
        "inputType": "url",
        "data": "https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt"
    }
File path
    
    method: POST
    url: localhost:9101/word/counter
    body(row - JSON): {
        "inputType": "filePath",
        "data": "assets/example-file.txt"
    }
Text
    
    method: POST
    url: localhost:9101/word/counter
    body(row - JSON): {
        "inputType": "text",
        "data": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }

# Requests - Word statistics
 
    method: GET
    url: localhost:9101/word/statistics
    Query: 
        word: "Lorem"
# Tests

    I wrote an infrastructure for writing e2e tests
    You can run the tests by command: npm run e2e
    Unfortunately I did not have time to finish writing all the tests

# Assumptions

    * Input type (string, url, file name) send as a parameter in the request (query params)
    * Due to the lack of time I assume that the number of repetitive words are large and it is possible 
      to read the file where we store the words-count to project memory
      If I had time I would look up the words in the buffer and not read the file once
    * I cleared dots and commas from the words.

# Algorithm

    I chose Object-oriented programming (OOP) for my project with the concept of classes(Routers, controllers, services) and objects. 
    It is used to structure a software program into simple, reusable pieces of code blueprints.
    
    When we need to read a file you typically read a chunk of bytes called "buffer" to avoid multiple calls to the underlying I/O layer,
    so instead of reading directly from the disk, we read from the previous filled buffer. 
    By doing this we win performance.
    I save the word counts on file(assets/words-count.json) for storing the results (the number of appearances of each word) will be persisted between runs,
    to be used by the 'word statistics' service.
    In addition, in each iteration (chunk) I did not analyze the last word to avoid cutting words at the end of the chunk,
    I added that word to the next chunk.
    if we shut down the server and restart it, results will be saved on the 'words' file 
    * I wrote bash script(big-file.sh) to create file > 1GB for self test

# Improvements if I had more time

    0. I would look up the words-counts in the buffer and not read the file once on the constructor -
    I would index the file that contains the number of repetitions of the words and according to that pull it out in each iteration, 
    or save the words in files by letters (each letter in a different file)
    1. Upload the MS to cloud like AWS (add docker file)
    2. Save the intermediate results to S3 and not to a file that is restricted in memory
       S3 - Amazon Simple Storage Service is storage for the Internet. 
       It is designed to make web-scale computing easier for developers.
    3. Saves the results of the getCleanWord function in a map to create dynamic programming 
       and not to recalculate the results each time.
    4. Write e2e, unit, integration tests.
