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
        "data": "example-file.txt"
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

