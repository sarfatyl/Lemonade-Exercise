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

# Assumptions

      Due to the lack of time I assume that the number of repetitive words are many and it is possible 
      to read the entire file where we store the words-count
      If I had time I would look up the words in the buffer and not read the file once



# Algorithm
    I chose Object-oriented programming (OOP) for my project with the concept of classes and objects. It is used to structure a software program into simple,
    reusable pieces of code blueprints
    
    When we need to read a file you typically read a chunk of bytes called "buffer" to avoid multiple calls to the underlying I/O layer,
    so instead of reading directly from the disk, we read from the previous filled buffer. 
    By doing this we win performance.
   
    I chose the library : buffered-reader that allows you to read files without worry about the buffers.
    There are two ways to read the files. The first can only read binary data and has a pointer to move along the file (seek, skip, read). 
    The second performs a read from the beginning to the end of the file and emits different events (byte, character, line, buffer...).
    I chose the second approach.
   
    I decided to read the file line by line in from the buffer to avoid cutting lines at the end of the chunk
    and save the word counts on file for caching the results (the number of appearances of each word) will be persisted between runs,
    and save the word counts on file for caching the results (the number of appearances of each word) will be persisted between runs,
    to be used by the 'word statistics' service.
    if we shut down the server and restart it, results will be saved on the 'words' file 

# Improvements if I had more time
    0. I would look up the words in the buffer and not read the file once on the constructor.
    1. Upload ms to cloud like aws (add docker file)
    2. Save the intermediate results to s3 and not to a file that is restricted in memory
      (Amazon Simple Storage Service (Amazon S3) is storage for the Internet. 
      It is designed to make web-scale computing easier for developers.)
    3. Saves the results of the getCleanWord function in a map to create dynamic programming 
      and not to recalculate the results each time.
    4. Write e2e, unit, integration tests.
