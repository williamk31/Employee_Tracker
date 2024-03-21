\c employee_db;


INSERT INTO department
 (name) 
    VALUES 
        ('Sales'),
        ('Accounting'), 
        ('Development');

INSERT INTO role (title, salary, department)
    VALUES ('manager', 40000, 1), ('accountant', 35000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('john', 'doe', 2, 1);