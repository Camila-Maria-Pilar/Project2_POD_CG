DROP DATABASE IF EXISTS pod_db;
CREATE DATABASE pod_db;
USE pod_db;

-- Table definition for the Pod model
CREATE TABLE pod (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  client VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

-- Table definition for the User model
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
