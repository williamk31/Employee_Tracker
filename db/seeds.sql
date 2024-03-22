\c employee_db;

INSERT INTO department
 (name) 
    VALUES 
        ('Sales'),
        ('Accounting'), 
        ('Engineering'),
        ('Legal');

INSERT INTO role (title, salary, department)
    VALUES 
        ('Sales Lead', 70000, 1), 
        ('Salesperson', 55000, 1),
        ('Lead Accountant', 60000, 2),
        ('Accountant', 55000, 2),
        ('Engineer', 75000, 3),
        ('Head Lawyer', 70000, 4),
        ('Lawyer', 68000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
        ('John', 'Doe', 1, null),
        ('Alex', 'Johnson', 2, 1),
        ('Jamie', 'Smith', 3, null),
        ('Taylor', 'Davis', 4, 3),
        ('Casey', 'Martinez', 5, null),
        ('Morgan', 'White', 6, null),
        ('Jordan', 'Brown', 7, 6),
        ('Riley', 'Thomas', 4, 3);