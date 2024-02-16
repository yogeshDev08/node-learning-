# Todo App API Documentation

This is a simple Todo app API that allows you to manage tasks.

### use npm i command to install all the packages for this project

### Do add the clustor id and password in the config.env for the mongodb connection

### use npm start command to run the project successfully


## Endpoints

### 1. Get the List of Todos

#### Request

- **URL:** `/todos`
- **Method:** `GET`
- **Description:** Get the list of all todos.

#### Response

- **Status Code:** `200 OK`
- **Content:**
  ```json
 {
    "message": "Task list retrieved successfully",
    "data": [
      {
        "_id": "6592bb9b5daefb872d32d4e3",
        "title": "Complete assignment 04",
        "status": "pending",
        "__v": 0
      },
    ]
  }

### 2. Create New Task for Todos

#### Request

- **URL:** `/todos`
- **Method:** `POST`
- **Description:** Create a new task.

#### Response

- **Status Code:** `201 OK`
- **Content:**
  ```json
 {
    "message": "Task list retrieved successfully",
    "data": [
      {
        "_id": "6592bb9b5daefb872d32d4e3",
        "title": "Complete assignment 04",
        "status": "pending",
        "__v": 0
      },
    ]
  }


### 3. Update the Old task status or the task name

#### Request

- **URL:** `/todos?id=""`
- **Method:** `PUT`
- **Description:** Update an existing task by ID..

#### Content
```json
{
  "title": "Updated Task",
  "status": "completed"
}

#### Response

- **Status Code:** `200 OK`
- **Content:**
    ```json
    {
    "message": "Task updated successfully",
    "data": {
        "_id": "updated_task_id",
        "title": "Updated Task",
        "status": "completed",
    }
    }


### 4. Deletion of the task from the Todos lsit

#### Request

- **URL:** `/todos?id=""`
- **Method:** `DELETE`
- **Description:** Delete a task by ID.

#### Response

- **Status Code:** `200 OK`
- **Content:**
  ```json
{
  "message": "Task deleted successfully",
  "data": []
}