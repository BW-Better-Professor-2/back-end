define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "/Users/lambda_school_loaner_198/Desktop/Lambda/Web API Node/buildweek4/back-end/docs/main.js",
    "groupTitle": "/Users/lambda_school_loaner_198/Desktop/Lambda/Web API Node/buildweek4/back-end/docs/main.js",
    "name": ""
  },
  {
    "type": "login",
    "url": "/api/auth/login",
    "title": "Login",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body: ",
          "content": "{\n\t\"username\": \"username\",\n\t\"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n{\n\"message\": \"Welcome back, username!\",\n \"user\": {\n   \"id\": number,\n   \"username\": \"username\",\n   \"password\": \"hashed password, long string, not actual password\"\n },\n \"token\": \"long string, token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/auth-router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "register",
    "url": "/api/auth/register",
    "title": "Register",
    "name": "Register",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body: ",
          "content": "{\n\t\"username\": \"username\",\n\t\"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n{\n\"message\": \"Thanks for registering, username!\",\n \"user\": {\n   \"id\": 3,\n   \"username\": \"username\",\n   \"password\": \"hashed password, long string, not actual password\"\n },\n \"token\": \"long string, token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./auth/auth-router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "GetMessages",
    "url": "/messages/",
    "title": "Get All  Messages",
    "name": "GetMessages",
    "group": "Messages_}",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n{\n \"message\": \"There are no messages for student with the specified id\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./messages/messages-router.js",
    "groupTitle": "Messages_}"
  },
  {
    "type": "GetMessagesByStudentId",
    "url": "/messages/students/:id",
    "title": "Get Messages By Student ID",
    "name": "GetMessagesByStudentId",
    "group": "Messages_}",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n{\n \"message\": \"There are no messages for student with the specified id\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./messages/messages-router.js",
    "groupTitle": "Messages_}"
  },
  {
    "type": "AddAStudent",
    "url": "/api/students",
    "title": "Add a Student",
    "name": "Add_A_Student",
    "group": "Students",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Student's Name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 201 OK \n{\n \"message\": \"Successfully created student!\",\n \"student\": {\n   \"id\": 3,\n   \"name\": \"Student Name\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./students/students-router.js",
    "groupTitle": "Students"
  },
  {
    "type": "DeleteAStudent",
    "url": "/api/students/:id",
    "title": "Delete a Student",
    "name": "Delete_A_Student",
    "group": "Students",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 201 OK \n{\n \"message\": \"Successfully deleted student with id of 3!\",\n \"student\": {\n   \"id\": 3,\n   \"name\": \"Student Name\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./students/students-router.js",
    "groupTitle": "Students"
  },
  {
    "type": "findAllStudents",
    "url": "/api/students",
    "title": "Find All Students",
    "name": "FindAllStudents",
    "group": "Students",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n[\n {\n   \"id\": 1,\n   \"name\": \"student name\"\n }\n {\n   \"id\": 2,\n   \"name\": \"second student name\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./students/students-router.js",
    "groupTitle": "Students"
  },
  {
    "type": "findastudentbyid",
    "url": "/api/students/:id",
    "title": "Find A Student By ID",
    "name": "FindAtudentById",
    "group": "Students",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n[\n {\n   \"id\": 1,\n   \"name\": \"student name\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./students/students-router.js",
    "groupTitle": "Students"
  },
  {
    "type": "findStudentsProjects",
    "url": "/api/students/:id/projects",
    "title": "Find A Student's Project",
    "name": "FindProjects_for_a_Student",
    "group": "Students",
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "  HTTP/1.1 200 OK \n[ Need to fix this one once i add a project\n {\n   \"id\": 1,\n   \"name\": \"student name\"\n }\n {\n   \"id\": 2,\n   \"name\": \"second student name\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./students/students-router.js",
    "groupTitle": "Students"
  }
] });
