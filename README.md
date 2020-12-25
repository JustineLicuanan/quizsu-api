# Quizsu API

a practical quiz app API made using TypeScript, Node, Express, MongoDB/Mongoose.

## Usage

### Endpoints

```http
# Create quiz endpoint
POST {{host}}/quiz/create
Content-Type: application/json

{
   "title": "True or False",
   "password": "{{quizPassword}}",
   "questions": [
      {
         "text": "Are you a developer?",
         "answers": ["true", "t"]
      },
      {
         "text": "Do you have a girlfriend?",
         "answers": ["false", "f"]
      }
   ]
}

###

# Get quiz results endpoint
POST {{host}}/quiz/results/{{quizId}}
Content-Type: application/json

{
   "password": "{{quizPassword}}"
}

###

# Take quiz endpoint
GET {{host}}/quiz/take/{{quizId}}

###

# Pass quiz endpoint
POST {{host}}/quiz/pass/{{quizId}}
Content-Type: application/json

{
   "name": "John Doe",
   "answers": [
      {
         "questionId": "fromTakeQuizEndpoint1",
         "answer": "t"
      },
      {
         "questionId": "fromTakeQuizEndpoint2",
         "answer": "false"
      }
   ]
}

###

# Disable quiz endpoint
PATCH {{host}}/quiz/disable/{{quizId}}
Content-Type: application/json

{
   "password": "{{quizPassword}}"
}
```
